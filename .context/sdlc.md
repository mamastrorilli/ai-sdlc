# SDLC Workflow

Ciclo di vita dello sviluppo per il Design System guidato da AI.

## Workflow: Figma to Code
1. **Analisi Figma**: Utilizzare l'MCP di Figma per leggere le proprietà CSS, i token e la gerarchia del componente.
2. **Generazione Codice**: Creazione del componente React utilizzando Tailwind CSS v4.
3. **Documentazione**:
    - Creazione Storybook `.stories.tsx`.
    - Aggiornamento `design-system.md`.
    - Inserimento nel barrel `index.ts` della cartella di competenza.
4. **Validazione**:
    - Linting & Typescript check.
    - Test visuale (Storybook).
    - Test funzionale (Play functions).

## Quality Gates
- Nessun log in console.
- Zero errori di linting.
- Copertura accessibilità di base (role, aria-label, tabIndex).
- Storybook build pass.
