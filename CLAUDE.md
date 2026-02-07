# PROGETTO: Design System Next.js + Figma AI
Stack: Next.js App Router, TS, Tailwind CSS, Storybook
Architettura: Atomic Design

## REGOLE FONDAMENTALI
Contesto VIVO: ogni nuova componente → aggiorna automaticamente:
1. `CLAUDE.md` (nuova sezione componenti)
2. `.context/design-system.md` (descrizione + props)
3. Storybook story + play function

## Figma MCP Workflow
Figma Dev Mode → Claude Code → React component → auto-update docs

## Storybook
- Ogni componente = story con varianti principali
- Play function per interazioni + assertions
- Test runner in CI

## Claude Skills
- `skills/figma-workflow`: Figma → Code + auto-update docs
- `skills/design-rules`: design system conventions

## SVILUPPO
- Comando dev: `npm run dev`
- Storybook: `npm run storybook`
- Lint: `npm run lint`
- Test: `npm run test` (quando configurato)

## DESIGN TOKENS

### Colors (UI Kit Italia)
Fonte: [Figma UI Kit Italia](https://www.figma.com/design/qMgiC0CQiPCSGo8B03CiC0/UI-Kit-Italia--Community-)

| Palette | Base Token | Valore |
|---------|------------|--------|
| Primary | `primary-500` | `#0066CC` |
| Accent | `accent-500` | `#00A3A3` |
| Success | `success-500` | `#008758` |
| Warning | `warning-500` | `#A66300` |
| Error | `error-500` | `#D32F2F` |
| Info | `info-500` | `#1976D2` |
| Neutral | `neutral-500` | `#5C6470` |

File: `src/design-system/tokens/colors.ts`

### Typography (UI Kit Italia)
Font: **Titillium Web** (Google Fonts)

| Categoria | Token | Valore |
|-----------|-------|--------|
| Font | `--font-sans` | Titillium Web |
| H1 | `--font-size-6xl` | 3rem (48px) |
| H2 | `--font-size-5xl` | 2.5rem (40px) |
| H3 | `--font-size-4xl` | 2rem (32px) |
| Body | `--font-size-base` | 1rem (16px) |
| Small | `--font-size-sm` | 0.875rem (14px) |
| Weight Bold | `--font-weight-bold` | 700 |
| Weight Semibold | `--font-weight-semibold` | 600 |

File: `src/design-system/tokens/typography.ts`

### Spacing (UI Kit Italia)
Base unit: 4px (0.25rem)

| Categoria | Token | Valore |
|-----------|-------|--------|
| Gap xs | `--gap-xs` | 4px |
| Gap sm | `--gap-sm` | 8px |
| Gap md | `--gap-md` | 12px |
| Gap lg | `--gap-lg` | 16px |
| Gap xl | `--gap-xl` | 24px |
| Radius default | `--radius-default` | 4px |
| Radius lg | `--radius-lg` | 8px |
| Container | `--container-7xl` | 1280px |

File: `src/design-system/tokens/spacing.ts`
CSS: `src/app/globals.css`

## COMPONENTI

### Atoms

#### Button
`src/design-system/atoms/Button/`

| Prop | Tipo | Default |
|------|------|---------|
| `variant` | `primary \| secondary \| tertiary \| danger \| link` | `primary` |
| `size` | `sm \| md \| lg` | `md` |
| `iconLeft` | `ReactNode` | - |
| `iconRight` | `ReactNode` | - |
| `isLoading` | `boolean` | `false` |
| `fullWidth` | `boolean` | `false` |

```tsx
import { Button } from '@/design-system/atoms';
<Button variant="primary">Azione</Button>
```

### Organisms

#### Hero
`src/design-system/organisms/Hero/`

| Prop | Tipo | Default |
|------|------|---------|
| `variant` | `default \| left \| withImage \| fullImage` | `default` |
| `size` | `sm \| md \| lg` | `md` |
| `background` | `primary \| neutral \| dark \| light` | `primary` |
| `kicker` | `string` | - |
| `title` | `string` | **required** |
| `subtitle` | `string` | - |
| `actions` | `HeroAction[]` | - |
| `imageUrl` | `string` | - |

```tsx
import { Hero } from '@/design-system/organisms';
<Hero
  variant="default"
  background="primary"
  title="Titolo"
  subtitle="Descrizione"
  actions={[{ label: 'CTA', href: '#' }]}
/>
```
