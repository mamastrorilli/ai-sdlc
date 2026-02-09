/**
 * Lighthouse User Flow Script
 *
 * Questo script esegue un audit automatizzato di Lighthouse simulando
 * il comportamento di un utente reale che naviga e interagisce con il sito.
 *
 * A differenza di un audit Lighthouse standard (che misura solo il caricamento),
 * un User Flow permette di misurare anche le interazioni (click, scroll, navigazioni).
 *
 * Dipendenze:
 * - puppeteer: browser headless per automatizzare la navigazione
 * - lighthouse: tool Google per audit performance/accessibilità
 *
 * Utilizzo:
 *   1. Avviare l'app: yarn dev (deve essere su http://localhost:3000)
 *   2. Eseguire: node scripts/lighthouse-flow.mjs
 *
 * Output:
 * - Report HTML in lighthouse-report/user-flow.html
 * - Exit code 1 se le soglie non sono rispettate (utile per CI)
 */

import fs from 'fs';
import puppeteer from 'puppeteer';
import { startFlow } from 'lighthouse';

/**
 * Soglie minime per superare il test.
 * Valori da 0 a 1 (es: 0.9 = 90%)
 */
const THRESHOLDS = {
  performance: 0.9,    // 90% minimo
  accessibility: 0.9,  // 90% minimo
};

/**
 * URL base dell'applicazione da testare.
 * In CI viene avviata prima di eseguire questo script.
 */
const BASE_URL = 'http://localhost:3000';

/**
 * Funzione principale che esegue il User Flow.
 */
async function runFlow() {
  console.log(`🔄 Avvio Lighthouse User Flow su ${BASE_URL}...`);

  // ============================================
  // FASE 1: Avvio del browser con Puppeteer
  // ============================================
  // Puppeteer controlla un'istanza di Chrome/Chromium.
  // 'headless: new' usa la nuova modalità headless di Chrome.
  // Gli args sono necessari per funzionare in ambienti CI (Docker, GitHub Actions).
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',           // Necessario per eseguire come root in Docker
      '--disable-setuid-sandbox' // Disabilita sandbox per compatibilità CI
    ],
  });

  // Apriamo una nuova pagina (tab) nel browser
  const page = await browser.newPage();

  // ============================================
  // FASE 2: Configurazione del Lighthouse Flow
  // ============================================
  // startFlow() inizializza una sessione di audit che può includere
  // multiple navigazioni e interazioni (timespan).
  const flow = await startFlow(page, {
    name: 'User Flow Navigation',
    configContext: {
      settings: {
        // Simuliamo un dispositivo desktop
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        // Categorie da analizzare (escludiamo SEO per velocizzare)
        onlyCategories: ['performance', 'accessibility', 'best-practices'],
      },
    },
  });

  // ============================================
  // FASE 3: Esecuzione degli Step di Test
  // ============================================

  // --- STEP 1: Navigation ---
  // flow.navigate() misura il caricamento completo di una pagina.
  // Include: First Contentful Paint, Largest Contentful Paint,
  // Time to Interactive, Cumulative Layout Shift, ecc.
  console.log('📄 Step 1: Navigazione verso Home Page...');
  await flow.navigate(BASE_URL, {
    stepName: 'Home Page Load',
  });

  // --- STEP 2: Timespan ---
  // flow.startTimespan() / flow.endTimespan() misurano le performance
  // durante un'interazione utente (non una navigazione completa).
  // Utile per: scroll, animazioni, caricamenti lazy, interazioni JS.
  console.log('🖱️ Step 2: Simulazione interazione (scroll)...');
  await flow.startTimespan({ stepName: 'Scroll Interaction' });

  // Simuliamo uno scroll dell'utente: giù di 500px, poi torna su
  await page.evaluate(async () => {
    // Scroll verso il basso con animazione smooth
    window.scrollTo({ top: 500, behavior: 'smooth' });
    // Attendiamo che l'animazione completi
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Torniamo in cima
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  await flow.endTimespan();

  // --- STEP 3 (futuro): Navigazione secondaria ---
  // Qui si possono aggiungere altri step, es:
  // await flow.navigate(`${BASE_URL}/about`, { stepName: 'About Page' });

  // ============================================
  // FASE 4: Generazione dei Report (HTML + JSON)
  // ============================================
  console.log('📊 Generazione Report...');

  // HTML report per ispezione visuale
  const htmlReport = await flow.generateReport();

  // JSON result per parsing programmatico (auto-fix system)
  const flowResult = await flow.createFlowResult();

  // Creiamo la directory se non esiste
  const reportDir = 'lighthouse-report';
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }

  // Salviamo HTML report (apribile nel browser per visualizzare i dettagli)
  const htmlPath = `${reportDir}/user-flow.html`;
  fs.writeFileSync(htmlPath, htmlReport);
  console.log(`📁 HTML Report: ${htmlPath}`);

  // Salviamo JSON report (per auto-fix system)
  const jsonPath = `${reportDir}/user-flow.json`;
  fs.writeFileSync(jsonPath, JSON.stringify(flowResult, null, 2));
  console.log(`📁 JSON Report: ${jsonPath}`);

  // ============================================
  // FASE 5: Analisi dei Risultati per CI
  // ============================================
  // createFlowResult() restituisce i dati strutturati (non HTML)
  // per poter verificare programmaticamente i punteggi.
  const result = await flow.createFlowResult();

  let failed = false;

  // Iteriamo su ogni step del flow per verificare le soglie
  result.steps.forEach((step, index) => {
    const scores = step.lhr.categories; // lhr = Lighthouse Result
    console.log(`\n--- Step ${index + 1}: ${step.name} ---`);

    // Verifica Performance (se presente nello step)
    if (scores.performance) {
      const perfScore = scores.performance.score;
      const perfPercent = Math.round(perfScore * 100);
      console.log(`Performance: ${perfPercent}/100`);

      if (perfScore < THRESHOLDS.performance) {
        console.error(`❌ Performance sotto soglia (minimo: ${THRESHOLDS.performance * 100}%)`);
        failed = true;
      }
    }

    // Verifica Accessibility (se presente nello step)
    if (scores.accessibility) {
      const a11yScore = scores.accessibility.score;
      const a11yPercent = Math.round(a11yScore * 100);
      console.log(`Accessibility: ${a11yPercent}/100`);

      if (a11yScore < THRESHOLDS.accessibility) {
        console.error(`❌ Accessibility sotto soglia (minimo: ${THRESHOLDS.accessibility * 100}%)`);
        failed = true;
      }
    }
  });

  // ============================================
  // FASE 6: Cleanup e Exit Code
  // ============================================
  await browser.close();

  // Exit code per integrazione CI:
  // - 0 = successo (tutti i test passati)
  // - 1 = fallimento (almeno una soglia non rispettata)
  if (failed) {
    console.error('\n❌ Test falliti: performance o accessibilità insufficienti.');
    process.exit(1);
  } else {
    console.log('\n✅ Tutti i test passati con successo!');
    process.exit(0);
  }
}

// ============================================
// Entry Point
// ============================================
// Eseguiamo la funzione principale e gestiamo eventuali errori
runFlow().catch((err) => {
  console.error('Errore durante l\'esecuzione del flow:', err);
  process.exit(1);
});
