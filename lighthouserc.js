/** @type {import('@lhci/cli').LighthouseConfig} */
module.exports = {
  ci: {
    collect: {
      // Usa la build statica di Storybook come sorgente
      staticDistDir: './storybook-static',
      // URL pattern per testare le story di tutti i componenti
      // Ogni iframe.html?id=... corrisponde a una story renderizzata
      // IMPORTANTE: Aggiornare questa lista quando si aggiunge un nuovo componente!
      // Pattern: {livello}-{componente}--{story} in kebab-case
      url: [
        // Atoms
        'http://localhost/iframe.html?id=atoms-accordion--basic',
        'http://localhost/iframe.html?id=atoms-button--primary',
        'http://localhost/iframe.html?id=atoms-button--secondary',
        'http://localhost/iframe.html?id=atoms-divider--default',
        'http://localhost/iframe.html?id=atoms-icon--size-md',
        'http://localhost/iframe.html?id=atoms-link--standalone',
        'http://localhost/iframe.html?id=atoms-logo--default',
        // Molecules
        'http://localhost/iframe.html?id=molecules-link-group--default',
        'http://localhost/iframe.html?id=molecules-social-links--default',
        // Organisms
        'http://localhost/iframe.html?id=organisms-footer--default',
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
