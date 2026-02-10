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

## Lighthouse Auto-Fix System

Sistema automatizzato per rilevare e risolvere problemi di accessibilità/performance.

### Flusso

```
┌─────────────────────────────────┐
│ GitHub Actions (Detection)      │
│ • Lighthouse User Flow          │
│ • Performance/A11y scoring      │
│ • Failure detection             │
└───────────────┬─────────────────┘
                │ (se fallimento)
                ▼
┌─────────────────────────────────┐
│ Auto-Create Issue               │
│ + Context Package               │
└───────────────┬─────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│ Issue contiene:                 │
│ • JSON report errors            │
│ • File paths affected           │
│ • Codice rilevante              │
│ • Comandi per Claude / Antigravity │
└───────────────┬─────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│ Tu (locale):                    │
│ 1. Click link nell'issue        │
│ 2. `claude code` con contesto   │
│ 3. Revisione fix                │
│ 4. Push PR                      │
└─────────────────────────────────┘
```

### Componenti

| File | Scopo |
|------|-------|
| `scripts/lighthouse-report-generator.mjs` | Parsa LHCI results, mappa Story → File, genera JSON/MD |
| `scripts/lighthouse-flow-report.mjs` | Parsa User Flow results per web app |
| `.github/workflows/storybook-tests.yml` | Pipeline Design System + Issue creation |
| `.github/workflows/app-tests.yml` | Pipeline Web App + Issue creation |
| `lighthouserc.js` | Config LHCI con output JSON |

### Mapping Story ID → File Sorgente

```
atoms-{component}--{variant}     → src/design-system/atoms/{Component}/{Component}.tsx
molecules-{component}--{variant} → src/design-system/molecules/{Component}/{Component}.tsx
organisms-{component}--{variant} → src/design-system/organisms/{Component}/{Component}.tsx
```

**Esempi:**
- `atoms-button--primary` → `src/design-system/atoms/Button/Button.tsx`
- `organisms-hero--default` → `src/design-system/organisms/Hero/Hero.tsx`

### Formato Issue GitHub

L'issue creata automaticamente contiene:

1. **Summary** - Tabella componenti/audit con conteggio errori
2. **Detailed Failures** - Per ogni componente:
   - Audit ID e score
   - Selettori CSS e snippet HTML
   - Suggerimenti fix WCAG
3. **AI Instructions** - Comandi pronti per fix automatico:
   ```bash
   claude
   ```
   Con contesto: file da modificare, regole WCAG, comandi verifica

### Labels Issue

- `accessibility` - Problemi di accessibilità
- `lighthouse` - Rilevato da Lighthouse CI
- `auto-fix` - Pronto per fix automatico
- `ai-assistant` - Contiene istruzioni per Claude/Antigravity

### Notifiche

L'issue viene automaticamente assegnata a chi ha fatto il commit (`context.actor`).
GitHub invia email di notifica all'assignee se le notifiche sono abilitate in Settings > Notifications.

### Soglie CI/CD

| Metrica | Soglia | Azione |
|---------|--------|--------|
| Accessibility | >= 0.95 | Error (blocca merge) |
| Performance | >= 0.90 | Warning |
| Best Practices | >= 0.90 | Warning |

### Utilizzo Locale

```bash
# Test Lighthouse localmente
yarn build-storybook && yarn lhci

# User Flow su web app
yarn build && yarn start &
node scripts/lighthouse-flow.mjs
```
