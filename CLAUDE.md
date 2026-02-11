# PROGETTO: Design System Next.js + Figma AI

Stack: Next.js App Router, TS, Tailwind CSS, Storybook
Architettura: Atomic Design (Atoms → Molecules → Organisms → Templates)

## REGOLE FONDAMENTALI

**Contesto VIVO**: ogni nuova componente → aggiorna automaticamente:
1. `.context/design-system.md` (fonte principale: token + props + esempi)
2. Storybook story + play function
3. Pipeline CI/CD se necessario

**Folder `.context/`**: contesto condiviso per AI IDE (Cursor, Windsurf, Copilot, ecc.)
- Aggiorna sempre `.context/design-system.md` quando modifichi componenti/token

**Per dettagli completi su token e componenti**: leggi `.context/design-system.md`

## SVILUPPO

```bash
yarn dev              # Next.js dev server
yarn storybook        # Storybook dev
yarn lint             # ESLint
yarn test             # Jest
yarn build-storybook  # Build statico Storybook
yarn test-storybook:ci # Test Storybook CI
yarn lhci             # Lighthouse CI
```

**Package manager**: Yarn (non npm)

## CI/CD

### Branches protetti
I workflow girano su push/PR verso: `main`, `dev`, `test`

### Pipeline Design System (`.github/workflows/storybook-tests.yml`)
```
Install → Build Storybook → Test a11y (axe-core)
  ↓ (se fallisce)
  Claude Code Auto-Fix → Push fix sulla branch PR
  ↓ (se push diretto, auto-fix non disponibile)
  Crea GitHub Issue per fix manuale
  ↓ (se passa, solo su main)
  Deploy GitHub Pages
```

### Pipeline Web App (`.github/workflows/app-tests.yml`)
```
Build → Lighthouse User Flow
  ↓ (se fallisce)
  Claude Code Auto-Fix → Push fix sulla branch PR / Crea PR di fix
  ↓ (se auto-fix fallisce)
  Crea GitHub Issue per fix manuale
  ↓ (se passa, solo su main)
  Deploy Vercel
```

### Auto-Fix Agent
Quando i test di accessibilità falliscono, un agente Claude Code:
1. Analizza il report generato (axe-core per Storybook, Lighthouse per Web App)
2. Trova i file coinvolti nel codebase
3. Applica fix di accessibilità
4. Committa e pusha sulla branch PR

**Requisito**: Secret `ANTHROPIC_API_KEY` configurato nel repository.

### Soglie (Web App - Lighthouse)
| Metrica | Soglia | Blocca? |
|---------|--------|---------|
| Accessibility | >= 0.95 | Si |
| Performance | >= 0.9 | Warning |
| Best Practices | >= 0.9 | Warning |

### Test Accessibilità (Design System - axe-core)
- Tutti i test axe-core devono passare
- WCAG 2.1 AA compliance obbligatoria

## DESIGN TOKENS (quick reference)

Fonte: [UI Kit Italia](https://www.figma.com/design/qMgiC0CQiPCSGo8B03CiC0/UI-Kit-Italia--Community-)

| Categoria | File | Valori chiave |
|-----------|------|---------------|
| Colors | `tokens/colors.ts` | primary-500: #0066CC, error-500: #D32F2F |
| Typography | `tokens/typography.ts` | Font: Titillium Web, H1: 3rem |
| Spacing | `tokens/spacing.ts` | Base: 4px, Container: 1280px |

**Dettagli completi**: `.context/design-system.md` → sezioni Color/Typography/Spacing Tokens

## COMPONENTI (indice)

| Livello | Componenti | Path |
|---------|------------|------|
| Atoms | Accordion, BackToTop, Button, Divider, Icon, Link, Logo | `src/design-system/atoms/` |
| Molecules | LinkGroup, SocialLinks | `src/design-system/molecules/` |
| Organisms | Footer, Hero | `src/design-system/organisms/` |

**Props, varianti, esempi**: `.context/design-system.md` → sezione Mapping Componenti

## REGOLE DI IMPLEMENTAZIONE

1. **Usa solo token definiti** - Mai hardcodare valori HEX
2. **Accessibilità WCAG AA** - Contrasto minimo, ARIA labels
3. **Ogni componente = Story** - Con varianti e play function
4. **Contrasto testo** - Usa `text-white` pieno, no opacità ridotte
5. **Test axe-core** - Tutti i test di accessibilità devono passare
6. **Aggiorna .context/** - Documenta props/varianti in `.context/design-system.md`
