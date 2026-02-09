# PROGETTO: Design System Next.js + Figma AI

Stack: Next.js App Router, TS, Tailwind CSS, Storybook
Architettura: Atomic Design (Atoms → Molecules → Organisms → Templates)

## REGOLE FONDAMENTALI

**Contesto VIVO**: ogni nuova componente → aggiorna automaticamente:
1. `.context/design-system.md` (fonte principale: token + props + esempi)
2. Storybook story + play function
3. Pipeline CI/CD se necessario

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

### Pipeline Design System (`.github/workflows/storybook-tests.yml`)
Install → Build Storybook → Test a11y (axe-core) → Lighthouse CI → Deploy GitHub Pages

### Pipeline Web App (`.github/workflows/app-tests.yml`)
Lighthouse User Flow → Deploy Vercel

### Soglie Lighthouse
| Metrica | Soglia | Blocca? |
|---------|--------|---------|
| Accessibility | >= 0.95 | Si |
| Performance | >= 0.9 | Warning |
| Best Practices | >= 0.9 | Warning |

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
| Atoms | Button, Icon, Link, Accordion, Divider, Logo | `src/design-system/atoms/` |
| Molecules | LinkGroup, SocialLinks | `src/design-system/molecules/` |
| Organisms | Footer, Hero | `src/design-system/organisms/` |

**Props, varianti, esempi**: `.context/design-system.md` → sezione Mapping Componenti

## REGOLE DI IMPLEMENTAZIONE

1. **Usa solo token definiti** - Mai hardcodare valori HEX
2. **Accessibilità WCAG AA** - Contrasto minimo, ARIA labels
3. **Ogni componente = Story** - Con varianti e play function
4. **Contrasto testo** - Usa `text-white` pieno, no opacità ridotte
5. **Lighthouse CI** - Accessibility >= 0.95 obbligatorio
