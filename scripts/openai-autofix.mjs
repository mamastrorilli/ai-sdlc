#!/usr/bin/env node

/**
 * OpenAI Auto-Fix Script v2
 * Analizza i report Lighthouse E i file sorgente reali per applicare fix precise.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurazione
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o';
const MAX_TOKENS = 4000;

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY non configurata');
  process.exit(1);
}

/**
 * Chiama l'API di OpenAI
 */
async function callOpenAI(prompt, systemPrompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0, // Determinismo massimo
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Estrae i possibili file menzionati nel report
 */
function extractFilesFromReport(reportContent) {
  // Cerca pattern come src/... o components/...
  const fileRegex = /(src\/[a-zA-Z0-9\/\-_\.]+)/g;
  const matches = reportContent.match(fileRegex) || [];
  return [...new Set(matches)].filter(f => existsSync(join(process.cwd(), f)));
}

/**
 * Analizza il report e i file reali
 */
async function analyzeAndFix(reportPath, reportType) {
  console.log(`📊 Analisi report: ${reportPath}`);
  const reportContent = readFileSync(reportPath, 'utf8');
  
  // Trova i file coinvolti
  const identifiedFiles = extractFilesFromReport(reportContent);
  console.log(`📂 File identificati dal report: ${identifiedFiles.join(', ') || 'Nessuno trovato automaticamente'}`);

  // Leggi il contenuto dei file identificati (o prova a cercarli se il report è vago)
  const fileContexts = identifiedFiles.map(file => {
    return `FILE: ${file}\nCONTENT:\n${readFileSync(join(process.cwd(), file), 'utf8')}\n---`;
  }).join('\n\n');

  const systemPrompt = `Sei un esperto di accessibilità web e performance (Core Web Vitals). 
Ti verranno forniti un report Lighthouse e il contenuto dei file sorgente coinvolti.
Il tuo compito è generare fix precise per risolvere i problemi (A11y e CLS).

ATTENZIONE AL CLS:
- Usa dimensioni esplicite per immagini/video.
- Usa aspect-ratio CSS.
- Se un elemento appare dopo, riserva lo spazio con un min-height.

Rispondi SOLO con un JSON valido:
{
  "issues": [
    {
      "description": "descrizione breve",
      "file": "percorso/relativo/file.tsx",
      "fix": {
        "type": "replace",
        "target": "esatta porzione di codice originale da sostituire",
        "replacement": "nuovo codice",
        "explanation": "perché questa fix risolve il problema"
      }
    }
  ]
}`;

  const userPrompt = `REPORT LIGHTHOUSE:
${reportContent}

CODICE SORGENTE ATTUALE:
${fileContexts || "Nessun file trovato automaticamente. Cerca di suggerire in quale file src/ intervenire basandoti solo sul report."}

Analizza il report e applica le fix ai file forniti. Assicurati che il 'target' sia una stringa ESATTAMENTE presente nel file.`;

  const response = await callOpenAI(userPrompt, systemPrompt);
  return JSON.parse(response);
}

/**
 * Applica le fix
 */
function applyFixes(fixPlan) {
  const { issues } = fixPlan;
  let appliedCount = 0;
  const modifiedFiles = new Set();
  const summary = [];

  for (const issue of issues) {
    const filePath = join(process.cwd(), issue.file);
    if (!existsSync(filePath)) continue;

    let content = readFileSync(filePath, 'utf8');
    const { target, replacement } = issue.fix;

    if (content.includes(target)) {
      content = content.replace(target, replacement);
      writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Applicata fix a ${issue.file}: ${issue.description}`);
      appliedCount++;
      modifiedFiles.add(issue.file);
      summary.push({ file: issue.file, desc: issue.description });
    } else {
      console.warn(`⚠️  Target non trovato in ${issue.file} per la fix: ${issue.description}`);
    }
  }

  return { appliedCount, modifiedFiles: Array.from(modifiedFiles), summary };
}

async function main() {
  const [reportPath, reportType] = process.argv.slice(2);
  
  try {
    const fixPlan = await analyzeAndFix(reportPath, reportType);
    
    if (!fixPlan.issues || fixPlan.issues.length === 0) {
      console.log('✅ Nessun problema da fixare o OpenAI non ha trovato fix sicure.');
      process.exit(0);
    }

    const { appliedCount, modifiedFiles, summary } = applyFixes(fixPlan);

    if (appliedCount > 0) {
      // Configura git
      execSync('git config user.name "openai[bot]"');
      execSync('git config user.email "openai[bot]@users.noreply.github.com"');
      
      // Add selettivo
      modifiedFiles.forEach(f => execSync(`git add "${f}"`));
      
      // Messaggio commit
      const msg = `fix: auto-fix lighthouse issues\n\n${summary.map(s => `- ${s.file}: ${s.desc}`).join('\n')}`;
      execSync(`git commit -m "${msg.replace(/"/g, '\\"')}"`);
      
      console.log('has_fixes=true');
    } else {
      console.log('has_fixes=false');
    }
    
  } catch (error) {
    console.error('❌ Errore:', error.message);
    process.exit(1);
  }
}

main();
