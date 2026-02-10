#!/usr/bin/env node

/**
 * OpenAI Auto-Fix Script
 * Analizza i report Lighthouse e applica fix automatiche usando OpenAI API
 */

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurazione
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o'; // gpt-4o è il modello più recente e performante
const MAX_TOKENS = 4000;
const TEMPERATURE = 0.2; // Bassa temperatura per risposte più deterministiche

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
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS
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
 * Analizza il report e genera un piano di fix
 */
async function analyzeReport(reportPath, reportType) {
  console.log(`📊 Analisi report: ${reportPath}`);
  
  const reportContent = readFileSync(reportPath, 'utf8');
  
  const systemPrompt = `Sei un esperto di accessibilità web e performance (Core Web Vitals). 
Analizza report Lighthouse e genera fix concrete seguendo le best practice WCAG 2.1 AA e Core Web Vitals.

ATTENZIONE SPECIALE AL CLS (Cumulative Layout Shift):
- Identifica elementi che causano shift (immagini senza width/height, font che caricano tardi, contenuti dinamici).
- Proponi fix come: aspect-ratio CSS, dimensioni esplicite, min-height per i wrapper.

Rispondi SOLO con un JSON valido nel formato:
{
  "issues": [
    {
      "id": "issue-1",
      "type": "accessibility|performance|best-practice",
      "severity": "critical|high|medium|low",
      "description": "descrizione del problema",
      "file": "percorso/del/file.tsx",
      "fix": {
        "type": "replace|add|remove",
        "target": "codice da cercare (per replace)",
        "replacement": "codice sostitutivo",
        "explanation": "spiegazione della fix"
      }
    }
  ]
}`;

  const userPrompt = reportType === 'flow' 
    ? `Analizza questo report Lighthouse User Flow e identifica i problemi da fixare.
PRIORITÀ ASSOLUTA: Risolvi il CLS (Cumulative Layout Shift) se presente.
Per ogni problema, identifica il file sorgente in src/ e proponi una fix concreta e robusta.

REPORT:
${reportContent}

Rispondi con JSON valido.`
    : `Analizza questo report Lighthouse CI per Storybook e identifica i problemi da fixare.
Identifica problemi di accessibilità e shift di layout.
Per ogni problema, identifica il componente in src/design-system/ e proponi una fix concreta.
Usa SOLO i token definiti in tokens/ (mai hardcodare colori).

REPORT:
${reportContent}

Rispondi con JSON valido.`;

  const response = await callOpenAI(userPrompt, systemPrompt);
  
  // Parse JSON dalla risposta
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('OpenAI non ha restituito un JSON valido');
  }
  
  return JSON.parse(jsonMatch[0]);
}

/**
 * Applica una singola fix a un file
 */
function applyFix(issue) {
  const { file, fix } = issue;
  const filePath = join(process.cwd(), file);
  
  console.log(`🔧 Applicazione fix a: ${file}`);
  
  try {
    let content = readFileSync(filePath, 'utf8');
    
    switch (fix.type) {
      case 'replace':
        if (!content.includes(fix.target)) {
          console.warn(`⚠️  Target non trovato in ${file}, skip`);
          return false;
        }
        content = content.replace(fix.target, fix.replacement);
        break;
        
      case 'add':
        content += '\n' + fix.replacement;
        break;
        
      case 'remove':
        content = content.replace(fix.target, '');
        break;
        
      default:
        console.warn(`⚠️  Tipo di fix sconosciuto: ${fix.type}`);
        return false;
    }
    
    writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fix applicata con successo`);
    return true;
    
  } catch (error) {
    console.error(`❌ Errore applicando fix a ${file}:`, error.message);
    return false;
  }
}

/**
 * Applica tutte le fix in ordine di priorità
 */
async function applyFixes(fixPlan) {
  const { issues } = fixPlan;
  
  // Ordina per severità
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const sortedIssues = issues.sort((a, b) => 
    severityOrder[a.severity] - severityOrder[b.severity]
  );
  
  console.log(`\n📝 Piano di fix: ${sortedIssues.length} issue da risolvere\n`);
  
  let appliedCount = 0;
  const appliedFixes = [];
  const modifiedFiles = new Set();
  
  for (const issue of sortedIssues) {
    console.log(`\n[${issue.severity.toUpperCase()}] ${issue.description}`);
    
    if (applyFix(issue)) {
      appliedCount++;
      appliedFixes.push({
        file: issue.file,
        description: issue.description,
        explanation: issue.fix.explanation
      });
      modifiedFiles.add(issue.file);
    }
  }
  
  console.log(`\n✨ Fix applicate: ${appliedCount}/${sortedIssues.length}`);
  
  return { appliedCount, appliedFixes, modifiedFiles: Array.from(modifiedFiles) };
}

/**
 * Genera il messaggio di commit
 */
function generateCommitMessage(reportType, result) {
  const { appliedCount, appliedFixes } = result;
  
  const prefix = reportType === 'flow' ? 'fix' : 'fix(a11y)';
  const scope = reportType === 'flow' ? 'lighthouse user flow' : 'lighthouse accessibility';
  
  let message = `${prefix}: auto-fix ${scope} issues\n\n`;
  message += `Applied ${appliedCount} automated fix(es) based on Lighthouse report.\n\n`;
  
  // Raggruppa per file
  const byFile = {};
  for (const fix of appliedFixes) {
    if (!byFile[fix.file]) byFile[fix.file] = [];
    byFile[fix.file].push(fix);
  }
  
  for (const [file, fixes] of Object.entries(byFile)) {
    message += `${file}:\n`;
    for (const fix of fixes) {
      message += `  - ${fix.description}\n`;
    }
  }
  
  message += `\nCo-Authored-By: OpenAI GPT-4 <openai[bot]@users.noreply.github.com>`;
  
  return message;
}

/**
 * Main
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('Usage: node openai-autofix.mjs <report-file> <report-type>');
    console.error('  report-type: "flow" or "storybook"');
    process.exit(1);
  }
  
  const [reportPath, reportType] = args;
  
  if (!['flow', 'storybook'].includes(reportType)) {
    console.error('❌ report-type deve essere "flow" o "storybook"');
    process.exit(1);
  }
  
  try {
    console.log('🤖 OpenAI Auto-Fix System');
    console.log(`📄 Report: ${reportPath}`);
    console.log(`🔍 Tipo: ${reportType}`);
    console.log(`🧠 Modello: ${MODEL}\n`);
    
    // Analizza il report
    const fixPlan = await analyzeReport(reportPath, reportType);
    
    if (!fixPlan.issues || fixPlan.issues.length === 0) {
      console.log('✅ Nessun problema da fixare');
      process.exit(0);
    }
    
    // Applica le fix
    const result = await applyFixes(fixPlan);
    
    if (result.appliedCount === 0) {
      console.log('⚠️  Nessuna fix applicata');
      process.exit(0);
    }
    
    // Configura git
    try {
      execSync('git config user.name "openai[bot]"');
      execSync('git config user.email "openai[bot]@users.noreply.github.com"');
    } catch (e) {
      console.warn('⚠️  Impossibile configurare git user');
    }
    
    // Committa SOLO i file sorgente modificati, non i report!
    console.log('\n📦 Preparazione commit selettivo...');
    for (const file of result.modifiedFiles) {
      execSync(`git add "${file}"`);
    }
    
    // Messaggio di commit
    const commitMessage = generateCommitMessage(reportType, result);
    execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);
    
    console.log('\n✅ Fix committate con successo!');
    console.log('has_fixes=true');
    
  } catch (error) {
    console.error('\n❌ Errore durante l\'auto-fix:', error.message);
    console.log('has_fixes=false');
    process.exit(1);
  }
}

main();
