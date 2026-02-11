#!/usr/bin/env node

/**
 * OpenAI Auto-Fix Agent v4
 * Usa edit_file (search/replace) invece di write_file per preservare l'encoding originale.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurazione
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o';
const MAX_ITERATIONS = 10;

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY non configurata');
  process.exit(1);
}

// ============================================================================
// TOOLS DISPONIBILI PER L'AGENTE
// ============================================================================

const tools = [
  {
    type: 'function',
    function: {
      name: 'read_file',
      description: 'Legge il contenuto di un file. Usa questo per vedere il codice sorgente.',
      parameters: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Percorso relativo del file (es: src/components/Hero.tsx)'
          }
        },
        required: ['path']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'edit_file',
      description: `Modifica un file sostituendo una stringa con un'altra.
IMPORTANTE: Usa questo invece di riscrivere l'intero file.
Specifica ESATTAMENTE la stringa da cercare (old_string) e quella nuova (new_string).
Il resto del file rimane invariato, preservando encoding e caratteri speciali.`,
      parameters: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Percorso relativo del file'
          },
          old_string: {
            type: 'string',
            description: 'Stringa esatta da cercare e sostituire (deve essere unica nel file)'
          },
          new_string: {
            type: 'string',
            description: 'Nuova stringa che sostituirà old_string'
          }
        },
        required: ['path', 'old_string', 'new_string']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'list_files',
      description: 'Elenca i file in una directory.',
      parameters: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Percorso della directory (es: src/components)'
          },
          recursive: {
            type: 'boolean',
            description: 'Se true, elenca ricorsivamente. Default: false'
          }
        },
        required: ['path']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'run_command',
      description: 'Esegue un comando shell (build, lint, test).',
      parameters: {
        type: 'object',
        properties: {
          command: {
            type: 'string',
            description: 'Comando da eseguire (es: yarn build, yarn lint)'
          }
        },
        required: ['command']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'search_code',
      description: 'Cerca un pattern nel codice sorgente.',
      parameters: {
        type: 'object',
        properties: {
          pattern: {
            type: 'string',
            description: 'Pattern da cercare'
          },
          directory: {
            type: 'string',
            description: 'Directory in cui cercare. Default: src'
          }
        },
        required: ['pattern']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'task_complete',
      description: 'Chiama quando hai finito di applicare tutte le fix.',
      parameters: {
        type: 'object',
        properties: {
          summary: {
            type: 'string',
            description: 'Riepilogo delle fix applicate'
          },
          files_modified: {
            type: 'array',
            items: { type: 'string' },
            description: 'Lista dei file modificati'
          }
        },
        required: ['summary', 'files_modified']
      }
    }
  }
];

// ============================================================================
// IMPLEMENTAZIONE DEI TOOLS
// ============================================================================

const modifiedFiles = new Set();

function executeReadFile(args) {
  const filePath = join(process.cwd(), args.path);
  if (!existsSync(filePath)) {
    return { error: `File non trovato: ${args.path}` };
  }
  try {
    const content = readFileSync(filePath, 'utf8');
    return { content, lines: content.split('\n').length };
  } catch (e) {
    return { error: e.message };
  }
}

function executeEditFile(args) {
  const filePath = join(process.cwd(), args.path);

  if (!existsSync(filePath)) {
    return { error: `File non trovato: ${args.path}` };
  }

  try {
    // Leggi il file originale preservando l'encoding
    const originalContent = readFileSync(filePath, 'utf8');

    // Verifica che old_string esista nel file
    if (!originalContent.includes(args.old_string)) {
      // Prova a cercare con normalizzazione line endings
      const normalizedContent = originalContent.replace(/\r\n/g, '\n');
      const normalizedOld = args.old_string.replace(/\r\n/g, '\n');

      if (!normalizedContent.includes(normalizedOld)) {
        return {
          error: `Stringa non trovata nel file. Assicurati che old_string sia esattamente come nel file originale.`,
          hint: 'Usa read_file per vedere il contenuto esatto del file.'
        };
      }

      // Applica la sostituzione sul contenuto normalizzato
      const newContent = normalizedContent.replace(normalizedOld, args.new_string);
      writeFileSync(filePath, newContent, 'utf8');
    } else {
      // Sostituzione diretta
      const newContent = originalContent.replace(args.old_string, args.new_string);
      writeFileSync(filePath, newContent, 'utf8');
    }

    modifiedFiles.add(args.path);
    console.log(`✏️  Modificato: ${args.path}`);
    return { success: true, path: args.path };
  } catch (e) {
    return { error: e.message };
  }
}

function executeListFiles(args) {
  const dirPath = join(process.cwd(), args.path);
  if (!existsSync(dirPath)) {
    return { error: `Directory non trovata: ${args.path}` };
  }

  function listRecursive(dir, baseDir) {
    const results = [];
    const items = readdirSync(dir);
    for (const item of items) {
      const fullPath = join(dir, item);
      const relativePath = relative(baseDir, fullPath);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        results.push({ path: relativePath, type: 'directory' });
        if (args.recursive) {
          results.push(...listRecursive(fullPath, baseDir));
        }
      } else {
        results.push({ path: relativePath, type: 'file' });
      }
    }
    return results;
  }

  try {
    const files = listRecursive(dirPath, dirPath);
    return { files: files.slice(0, 100) };
  } catch (e) {
    return { error: e.message };
  }
}

function executeRunCommand(args) {
  const allowedCommands = ['yarn build', 'yarn lint', 'yarn test', 'yarn build-storybook', 'yarn tsc --noEmit'];
  const isAllowed = allowedCommands.some(cmd => args.command.startsWith(cmd));

  if (!isAllowed) {
    return { error: `Comando non permesso. Comandi consentiti: ${allowedCommands.join(', ')}` };
  }

  console.log(`🔧 Eseguo: ${args.command}`);
  try {
    const output = execSync(args.command, {
      encoding: 'utf8',
      timeout: 120000,
      stdio: 'pipe'
    });
    return { success: true, output: output.slice(0, 2000) };
  } catch (e) {
    const stderr = e.stderr?.toString() || e.message;
    return { success: false, error: stderr.slice(0, 2000) };
  }
}

function executeSearchCode(args) {
  const dir = args.directory || 'src';
  const dirPath = join(process.cwd(), dir);

  if (!existsSync(dirPath)) {
    return { error: `Directory non trovata: ${dir}` };
  }

  const results = [];

  function searchRecursive(currentDir) {
    const items = readdirSync(currentDir);
    for (const item of items) {
      const fullPath = join(currentDir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        searchRecursive(fullPath);
      } else if (stat.isFile() && /\.(tsx?|jsx?|css|scss)$/.test(item)) {
        try {
          const content = readFileSync(fullPath, 'utf8');
          if (content.includes(args.pattern)) {
            const relativePath = relative(process.cwd(), fullPath);
            const lines = content.split('\n');
            const matchingLines = lines
              .map((line, i) => ({ line: i + 1, content: line }))
              .filter(l => l.content.includes(args.pattern))
              .slice(0, 5);
            results.push({ file: relativePath, matches: matchingLines });
          }
        } catch (e) { /* ignora errori di lettura */ }
      }
    }
  }

  searchRecursive(dirPath);
  return { results: results.slice(0, 20) };
}

function executeTool(name, args) {
  switch (name) {
    case 'read_file': return executeReadFile(args);
    case 'edit_file': return executeEditFile(args);
    case 'list_files': return executeListFiles(args);
    case 'run_command': return executeRunCommand(args);
    case 'search_code': return executeSearchCode(args);
    case 'task_complete': return { done: true, ...args };
    default: return { error: `Tool sconosciuto: ${name}` };
  }
}

// ============================================================================
// AGENT LOOP
// ============================================================================

async function callOpenAI(messages) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      tools,
      tool_choice: 'auto',
      temperature: 0
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

async function runAgent(reportContent, reportType) {
  const systemPrompt = `Sei un agente che corregge problemi di accessibilità e performance.

## TOOLS DISPONIBILI

- read_file: leggi un file sorgente
- edit_file: modifica un file con search/replace (USA QUESTO per le modifiche!)
- list_files: elenca file in una directory
- run_command: esegui comandi (yarn build, yarn lint)
- search_code: cerca pattern nel codice
- task_complete: chiama quando hai finito

## IMPORTANTE: USA edit_file, NON riscrivere file interi!

Per modificare un file, usa edit_file con:
- old_string: la stringa ESATTA da sostituire (copia dal file letto)
- new_string: la nuova stringa

Esempio - aggiungere alt a un'immagine:
1. read_file per vedere il codice
2. edit_file con:
   - old_string: '<img src="/hero.jpg" />'
   - new_string: '<img src="/hero.jpg" alt="Descrizione immagine" />'

## WORKFLOW

1. Leggi il report per capire i problemi
2. Usa search_code o list_files per trovare i file
3. Usa read_file per vedere il codice
4. Usa edit_file per applicare FIX MINIMALI (solo ciò che serve)
5. Usa run_command con "yarn build" per verificare
6. Chiama task_complete quando hai finito

## FIX COMUNI

- Immagini senza alt → aggiungi alt descrittivo
- Link vuoti → aggiungi aria-label
- Layout shift → aggiungi width/height alle immagini`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Report Lighthouse (${reportType}):\n\n${reportContent}` }
  ];

  let iteration = 0;
  let taskResult = null;

  while (iteration < MAX_ITERATIONS) {
    iteration++;
    console.log(`\n🔄 Iterazione ${iteration}/${MAX_ITERATIONS}`);

    const response = await callOpenAI(messages);
    const choice = response.choices[0];
    const assistantMessage = choice.message;

    messages.push(assistantMessage);

    if (!assistantMessage.tool_calls || assistantMessage.tool_calls.length === 0) {
      console.log('💬 Agente:', assistantMessage.content || '(nessun messaggio)');
      if (choice.finish_reason === 'stop') break;
      continue;
    }

    for (const toolCall of assistantMessage.tool_calls) {
      const { name, arguments: argsString } = toolCall.function;
      let args;

      try {
        args = JSON.parse(argsString);
      } catch (e) {
        args = {};
      }

      console.log(`🔧 Tool: ${name}`, name === 'edit_file' ? { path: args.path } : args);

      const result = executeTool(name, args);

      if (result.done) {
        taskResult = result;
        console.log('\n✅ Task completato!');
        console.log('📋 Summary:', result.summary);
        break;
      }

      messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(result)
      });
    }

    if (taskResult) break;
  }

  return {
    completed: !!taskResult,
    summary: taskResult?.summary || 'Nessun riepilogo',
    filesModified: Array.from(modifiedFiles)
  };
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const [reportPath, reportType] = process.argv.slice(2);

  if (!reportPath) {
    console.error('Usage: node openai-autofix.mjs <report-path> <report-type>');
    process.exit(1);
  }

  if (!existsSync(reportPath)) {
    console.error(`❌ Report non trovato: ${reportPath}`);
    process.exit(1);
  }

  console.log('');
  console.log('═══════════════════════════════════════════════');
  console.log('🤖 OpenAI Auto-Fix Agent v4 (edit mode)');
  console.log('═══════════════════════════════════════════════');
  console.log(`📊 Report: ${reportPath}`);
  console.log(`🤖 Model: ${MODEL}`);
  console.log('═══════════════════════════════════════════════');

  const reportContent = readFileSync(reportPath, 'utf8');

  try {
    const result = await runAgent(reportContent, reportType || 'lighthouse');

    if (result.filesModified.length > 0) {
      console.log('\n📦 Creazione commit...');
      execSync('git config user.name "openai-agent[bot]"');
      execSync('git config user.email "openai-agent[bot]@users.noreply.github.com"');

      result.filesModified.forEach(f => {
        execSync(`git add "${f}"`);
      });

      const commitMsg = `fix: auto-fix lighthouse issues (agent)\n\n${result.summary}\n\nFiles: ${result.filesModified.join(', ')}`;
      execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`);

      console.log('✅ Commit creato');
      console.log('has_fixes=true');
    } else {
      console.log('\n⚠️ Nessun file modificato');
      console.log('has_fixes=false');
    }

  } catch (error) {
    console.error('❌ Errore:', error.message);
    console.error('has_fixes=false');
    process.exit(1);
  }
}

main();
