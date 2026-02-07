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
- Package manager: **Yarn** (non usare npm)
- Comando dev: `yarn dev`
- Storybook: `yarn storybook`
- Lint: `yarn lint`
- Test: `yarn test`
- Build Storybook: `yarn build-storybook`
- Test Storybook (CI): `yarn test-storybook:ci`
- Lighthouse CI: `yarn lhci`

## CI/CD (GitHub Actions)

Workflow: `.github/workflows/storybook-tests.yml`

### Pipeline (su push/PR verso main)
1. **Install** — `yarn install --frozen-lockfile` (Node 20)
2. **Build Storybook** — genera build statico
3. **Test a11y** — test-runner con axe-core (WCAG 2.1 AA)
4. **Lighthouse CI** — performance + accessibility score
5. **Deploy** — GitHub Pages (solo push su main, dopo test ok)

### Notifiche
Se Lighthouse CI fallisce, viene aggiunto automaticamente un **commento sul commit** con:
- Link ai report Lighthouse (temporary-public-storage, 7 giorni)
- Link al workflow run
- L'autore del commit riceve notifica GitHub

### Soglie Lighthouse (lighthouserc.js)
| Metrica | Soglia | Livello |
|---------|--------|---------|
| Performance | >= 0.9 | warning |
| Accessibility | >= 0.95 | **error** (blocca) |
| Best Practices | >= 0.9 | warning |

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

#### Icon
`src/design-system/atoms/Icon/`

Wrapper per icone **Lucide React** con sizing e accessibilità standardizzati.

| Prop | Tipo | Default |
|------|------|---------|
| `icon` | `LucideIcon` | **required** |
| `size` | `xs \| sm \| md \| lg \| xl` | `md` |
| `label` | `string` | - |

**Dimensioni**: xs=12px, sm=16px, md=20px, lg=24px, xl=32px

```tsx
import { Icon } from '@/design-system/atoms';
import { ArrowRight, Search, Download } from 'lucide-react';

<Icon icon={ArrowRight} size="md" />
<Icon icon={Search} size="lg" label="Cerca" />
<Icon icon={Download} className="text-primary-500" />
```

Catalogo icone: [lucide.dev/icons](https://lucide.dev/icons)

#### Link
`src/design-system/atoms/Link/`

| Prop | Tipo | Default |
|------|------|---------|
| `variant` | `standalone \| withArrow \| withDownload` | `standalone` |
| `size` | `sm \| md \| lg` | `md` |
| `background` | `light \| dark` | `light` |
| `icon` | `ReactNode` | - |

```tsx
import { Link } from '@/design-system/atoms';
<Link variant="withArrow" href="/pagina">Scopri di più</Link>
<Link variant="withDownload" href="/file.pdf">Scarica PDF</Link>
```

#### Accordion
`src/design-system/atoms/Accordion/`

Componente per mostrare/nascondere contenuti in sezioni espandibili.

| Prop | Tipo | Default |
|------|------|---------|
| `items` | `AccordionItemData[]` | **required** |
| `variant` | `basic \| leftIcon \| activeBackground` | `basic` |
| `defaultExpandedIds` | `string[]` | `[]` |
| `allowMultiple` | `boolean` | `false` |

**AccordionItemData**:
- `id`: string (required)
- `title`: string (required)
- `content`: ReactNode (required)
- `disabled`: boolean

```tsx
import { Accordion } from '@/design-system/atoms';

<Accordion
  variant="basic"
  items={[
    { id: '1', title: 'Sezione 1', content: <p>Contenuto</p> },
    { id: '2', title: 'Sezione 2', content: <p>Contenuto</p> },
  ]}
/>

// Con sfondo attivo
<Accordion variant="activeBackground" items={items} defaultExpandedIds={['1']} />

// Apertura multipla
<Accordion variant="leftIcon" items={items} allowMultiple />
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
