import fs from 'fs';
import puppeteer from 'puppeteer';
import { startFlow } from 'lighthouse';

async function runFlow() {
  console.log('🔄 Avvio Lighthouse User Flow su http://localhost:3000...');

  // 1. Lanciamo Puppeteer
  const browser = await puppeteer.launch({
    headless: 'new',
    // Args per CI environments
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  
  const page = await browser.newPage();
  
  // 2. Setup del flusso con Lighthouse
  const flow = await startFlow(page, {
    name: 'User Flow Navigation',
    configContext: {
      settings: {
        // Desktop config (performance, accessibility, best-practices, seo)
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        onlyCategories: ['performance', 'accessibility', 'best-practices'],
      },
    },
  });

  // --- Step 1: Caricamento Home Page ---
  console.log('📄 Navigazione verso Home Page...');
  await flow.navigate('http://localhost:3000', {
    stepName: 'Home Page Load',
  });

  // --- Step 2: Interazione (esempio: scroll o click) ---
  console.log('🖱️ Simulazione interazione...');
  await flow.startTimespan({ stepName: 'Scroll Interaction' });
  
  // Eseguiamo uno scroll semplice
  await page.evaluate(async () => {
    window.scrollTo({ top: 500, behavior: 'smooth' });
    await new Promise((r) => setTimeout(r, 1000));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  await flow.endTimespan();

  // --- Step 3: Navigazione seconda pagina (se esiste, es: /about o link footer) ---
  // Qui possiamo aggiungere navigazioni future.
  // Per ora navighiamo di nuovo in home per simulare un refresh o ricaricamento
  // await flow.navigate('http://localhost:3000', { stepName: 'Reload Home' });

  // 3. Generazione Report
  console.log('📊 Generazione Report...');
  const report = await flow.generateReport();
  
  // Salviamo il report HTML
  if (!fs.existsSync('lighthouse-report')) {
    fs.mkdirSync('lighthouse-report');
  }
  fs.writeFileSync('lighthouse-report/user-flow.html', report);

  // 4. Analisi Risultati per CI
  const result = await flow.createFlowResult();
  
  // Estraiamo i punteggi dei vari step
  let failed = false;
  const thresholds = {
    performance: 0.9,
    accessibility: 0.9,
  };

  result.steps.forEach((step, index) => {
    const scores = step.lhr.categories;
    console.log(`\n--- Step ${index + 1}: ${step.name} ---`);
    
    if (scores.performance) {
      const perfScore = scores.performance.score;
      console.log(`Performance: ${perfScore * 100}/100`);
      if (perfScore < thresholds.performance) {
        console.error(`❌ Performance sotto soglia (${thresholds.performance * 100})`);
        failed = true;
      }
    }

    if (scores.accessibility) {
      const a11yScore = scores.accessibility.score;
      console.log(`Accessibility: ${a11yScore * 100}/100`);
      if (a11yScore < thresholds.accessibility) {
        console.error(`❌ Accessibility sotto soglia (${thresholds.accessibility * 100})`);
        failed = true;
      }
    }
  });

  await browser.close();

  if (failed) {
    console.error('\n❌ Test falliti: performance o accessibilità insufficienti.');
    process.exit(1);
  } else {
    console.log('\n✅ Tutti i test passati con successo!');
  }
}

runFlow().catch((err) => {
  console.error('Errore durante l\'esecuzione del flow:', err);
  process.exit(1);
});
