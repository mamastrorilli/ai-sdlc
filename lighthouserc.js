/** @type {import('@lhci/cli').LighthouseConfig} */
module.exports = {
  ci: {
    collect: {
      // Usa la build statica di Storybook come sorgente
      staticDistDir: './storybook-static',
      // URL pattern per testare le story degli atoms e organisms
      // Ogni iframe.html?id=... corrisponde a una story renderizzata
      url: [
        'http://localhost/iframe.html?id=atoms-button--primary',
        'http://localhost/iframe.html?id=atoms-button--secondary',
        'http://localhost/iframe.html?id=organisms-hero--default',
      ],
      // Un solo run per URL: sufficiente per componenti statici
      numberOfRuns: 1,
      settings: {
        // Preset desktop: piu rappresentativo per componenti UI
        preset: 'desktop',
        // Output JSON per parsing automatico (auto-fix system)
        output: ['html', 'json'],
      },
    },
    assert: {
      assertions: {
        // Performance: score minimo 0.9 (warning, non blocca il merge)
        'categories:performance': ['warn', { minScore: 0.9 }],
        // Accessibility: score minimo 0.95 (error, blocca se critico)
        'categories:accessibility': ['error', { minScore: 0.95 }],
        // Best practices: warning per awareness
        'categories:best-practices': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      // Storage temporaneo pubblico: report accessibili via URL per 7 giorni
      // Utile per review PR senza infrastruttura aggiuntiva
      target: 'temporary-public-storage',
    },
  },
};
