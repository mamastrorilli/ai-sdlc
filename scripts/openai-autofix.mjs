#!/usr/bin/env node

/**
 * OpenAI Auto-Fix Agent v3
 * Approccio agentico con Function Calling - l'AI può leggere, scrivere e testare in autonomia.
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
const MAX_ITERATIONS = 10; // Limite per evitare loop infiniti

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
      name: 'write_file',
      description: 'Scrive/sovrascrive un file con nuovo contenuto. Usa questo per applicare fix.',
      parameters: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Percorso relativo del file'
          },
          content: {
            type: 'string',
            description: 'Nuovo contenuto completo del file'
          }
        },
        required: ['path', 'content']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'list_files',
      description: 'Elenca i file in una directory. Utile per esplorare la struttura del progetto.',
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
      description: 'Esegue un comando shell (build, lint, test). Usa per verificare che le fix funzionino.',
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
      description: 'Cerca un pattern nel codice sorgente. Ritorna i file che contengono il match.',
      parameters: {
        type: 'object',
        properties: {
          pattern: {
            type: 'string',
            description: 'Pattern da cercare (stringa o regex semplice)'
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
      description: 'Chiama quando hai finito di applicare tutte le fix necessarie.',
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

function executeWriteFile(args) {
  const filePath = join(process.cwd(), args.path);
  try {
    // Verifica che la directory esista
    const dir = dirname(filePath);
    if (!existsSync(dir)) {
      return { error: `Directory non esiste: ${dirname(args.path)}` };
    }
    writeFileSync(filePath, args.content, 'utf8');
    modifiedFiles.add(args.path);
    console.log(`📝 Scritto: ${args.path}`);
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
    return { files: files.slice(0, 100) }; // Limita a 100 risultati
  } catch (e) {
    return { error: e.message };
  }
}

function executeRunCommand(args) {
  // Whitelist di comandi sicuri
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
    case 'write_file': return executeWriteFile(args);
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
  console.log(`📡 Chiamata API OpenAI (model: ${MODEL})...`);

  const requestBody = {
    model: MODEL,
    messages,
    tools,
    tool_choice: 'auto',
    temperature: 0
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    console.log(`📡 Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API Error Response: ${errorText}`);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const json = await response.json();

    // Verifica struttura risposta
    if (!json.choices || !json.choices[0]) {
      console.error('❌ Risposta API inaspettata:', JSON.stringify(json, null, 2));
      throw new Error('Risposta API senza choices');
    }

    console.log(`✅ API OK - finish_reason: ${json.choices[0].finish_reason}`);
    return json;
  } catch (error) {
    if (error.message.includes('fetch')) {
      console.error('❌ Errore di rete:', error.message);
    }
    throw error;
  }
}

async function runAgent(reportContent, reportType) {
  const systemPrompt = `Sei un agente che corregge problemi di accessibilità e performance nei progetti web.

Hai a disposizione questi tool:
- read_file: leggi un file sorgente
- write_file: scrivi/modifica un file
- list_files: elenca file in una directory
- run_command: esegui comandi (yarn build, yarn lint, yarn test)
- search_code: cerca pattern nel codice
- task_complete: chiama quando hai finito

## WORKFLOW

1. Leggi il report Lighthouse per capire i problemi
2. Usa search_code o list_files per trovare i file coinvolti
3. Usa read_file per vedere il codice attuale
4. Usa write_file per applicare le fix (scrivi il file COMPLETO)
5. Usa run_command con "yarn build" per verificare che compili
6. Se la build fallisce, leggi l'errore e correggi
7. Chiama task_complete quando hai finito

## REGOLE

- Scrivi sempre file COMPLETI con write_file, non frammenti
- Verifica sempre con yarn build dopo le modifiche
- Se la build fallisce, analizza l'errore e correggi
- Non inventare file che non esistono - usa list_files per esplorare
- Fai fix MINIMALI - non riscrivere tutto il componente se basta aggiungere un alt

## FIX COMUNI

**Accessibilità:**
- Immagini senza alt → aggiungi alt descrittivo
- Link vuoti → aggiungi aria-label
- Contrasto basso → usa colori con contrasto >= 4.5:1

**Performance/CLS:**
- Immagini senza dimensioni → aggiungi width/height
- Layout shift → riserva spazio con aspect-ratio o min-height`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Ecco il report Lighthouse (${reportType}). Analizza e applica le fix necessarie:\n\n${reportContent}` }
  ];

  let iteration = 0;
  let taskResult = null;

  while (iteration < MAX_ITERATIONS) {
    iteration++;
    console.log(`\n🔄 Iterazione ${iteration}/${MAX_ITERATIONS}`);

    const response = await callOpenAI(messages);
    const choice = response.choices[0];
    const assistantMessage = choice.message;

    // Aggiungi la risposta dell'assistente alla conversazione
    messages.push(assistantMessage);

    // Se non ci sono tool calls, l'agente ha finito di "pensare"
    if (!assistantMessage.tool_calls || assistantMessage.tool_calls.length === 0) {
      console.log('💬 Agente:', assistantMessage.content || '(nessun messaggio)');

      if (choice.finish_reason === 'stop') {
        console.log('⚠️  Agente terminato senza chiamare task_complete');
        break;
      }
      continue;
    }

    // Esegui tutti i tool calls
    for (const toolCall of assistantMessage.tool_calls) {
      const { name, arguments: argsString } = toolCall.function;
      let args;

      try {
        args = JSON.parse(argsString);
      } catch (e) {
        args = {};
      }

      console.log(`🔧 Tool: ${name}`, name !== 'write_file' ? args : { path: args.path });

      const result = executeTool(name, args);

      // Se task_complete, usciamo
      if (result.done) {
        taskResult = result;
        console.log('\n✅ Task completato!');
        console.log('📋 Summary:', result.summary);
        break;
      }

      // Aggiungi il risultato del tool
      messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(result)
      });
    }

    if (taskResult) break;
  }

  if (!taskResult && iteration >= MAX_ITERATIONS) {
    console.log(`\n⚠️  Raggiunto limite di ${MAX_ITERATIONS} iterazioni`);
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
  console.log('🤖 OpenAI Auto-Fix Agent v3');
  console.log('═══════════════════════════════════════════════');
  console.log(`📊 Report: ${reportPath}`);
  console.log(`📁 Tipo: ${reportType || 'generic'}`);
  console.log(`🔑 API Key: ${OPENAI_API_KEY ? `...${OPENAI_API_KEY.slice(-4)}` : 'MANCANTE'}`);
  console.log(`🤖 Model: ${MODEL}`);
  console.log('═══════════════════════════════════════════════');
  console.log('');

  const reportContent = readFileSync(reportPath, 'utf8');

  try {
    const result = await runAgent(reportContent, reportType || 'lighthouse');

    if (result.filesModified.length > 0) {
      // Git commit
      console.log('📦 Creazione commit...');
      execSync('git config user.name "openai-agent[bot]"');
      execSync('git config user.email "openai-agent[bot]@users.noreply.github.com"');

      result.filesModified.forEach(f => {
        console.log(`  git add "${f}"`);
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
    console.error('');
    console.error('═══════════════════════════════════════════════');
    console.error('❌ ERRORE CRITICO');
    console.error('═══════════════════════════════════════════════');
    console.error('Messaggio:', error.message);
    if (error.stack) {
      console.error('Stack:', error.stack.split('\n').slice(0, 5).join('\n'));
    }
    console.error('═══════════════════════════════════════════════');
    console.error('');
    console.error('has_fixes=false');
    process.exit(1);
  }
}

main();
