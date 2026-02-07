# Design System Context

Questo file mantiene lo stato e il mapping tra Figma e il codice del Design System.
**Fonte Figma**: [UI Kit Italia Community](https://www.figma.com/design/qMgiC0CQiPCSGo8B03CiC0/UI-Kit-Italia--Community-)

## Design Tokens

Mapping dei token Tailwind v4 con le variabili Figma.

| Categoria | File Token | Stato |
|-----------|------------|-------|
| Colors    | `tokens/colors.ts` | Completato |
| Typography| `tokens/typography.ts`| Completato |
| Spacing   | `tokens/spacing.ts`| Completato |

---

## Color Tokens

### Primary - Blu Italia
Colore primario del design system italiano, utilizzato per elementi principali e CTA.

| Token | Valore HEX | CSS Variable | Tailwind Class |
|-------|------------|--------------|----------------|
| primary-50 | `#E6F0FA` | `--color-primary-50` | `bg-primary-50` |
| primary-100 | `#B3D4F1` | `--color-primary-100` | `bg-primary-100` |
| primary-200 | `#80B8E8` | `--color-primary-200` | `bg-primary-200` |
| primary-300 | `#4D9CDF` | `--color-primary-300` | `bg-primary-300` |
| primary-400 | `#1A80D6` | `--color-primary-400` | `bg-primary-400` |
| **primary-500** | `#0066CC` | `--color-primary-500` | `bg-primary-500` |
| primary-600 | `#0059B3` | `--color-primary-600` | `bg-primary-600` |
| primary-700 | `#004D99` | `--color-primary-700` | `bg-primary-700` |
| primary-800 | `#004080` | `--color-primary-800` | `bg-primary-800` |
| primary-900 | `#003366` | `--color-primary-900` | `bg-primary-900` |
| primary-950 | `#001A33` | `--color-primary-950` | `bg-primary-950` |

**Uso**: Background pulsanti primari, link, focus states, header.

### Accent - Teal
Colore di accento per elementi interattivi secondari.

| Token | Valore HEX | CSS Variable | Tailwind Class |
|-------|------------|--------------|----------------|
| accent-50 | `#E6F7F7` | `--color-accent-50` | `bg-accent-50` |
| accent-100 | `#B3E8E8` | `--color-accent-100` | `bg-accent-100` |
| accent-200 | `#80D9D9` | `--color-accent-200` | `bg-accent-200` |
| accent-300 | `#4DCACA` | `--color-accent-300` | `bg-accent-300` |
| accent-400 | `#1ABBBB` | `--color-accent-400` | `bg-accent-400` |
| **accent-500** | `#00A3A3` | `--color-accent-500` | `bg-accent-500` |
| accent-600 | `#008F8F` | `--color-accent-600` | `bg-accent-600` |
| accent-700 | `#007A7A` | `--color-accent-700` | `bg-accent-700` |
| accent-800 | `#006666` | `--color-accent-800` | `bg-accent-800` |
| accent-900 | `#005252` | `--color-accent-900` | `bg-accent-900` |
| accent-950 | `#002929` | `--color-accent-950` | `bg-accent-950` |

**Uso**: Pulsanti secondari, badge, elementi decorativi.

### System Colors - Feedback States

#### Success (Verde)
| Token | Valore HEX | CSS Variable |
|-------|------------|--------------|
| success-500 | `#008758` | `--color-success-500` |

**Uso**: Messaggi di conferma, validazione form, stati completati.

#### Warning (Ocra)
| Token | Valore HEX | CSS Variable |
|-------|------------|--------------|
| warning-500 | `#A66300` | `--color-warning-500` |

**Uso**: Avvisi, alert non critici, attenzione richiesta.

#### Error (Rosso)
| Token | Valore HEX | CSS Variable |
|-------|------------|--------------|
| error-500 | `#D32F2F` | `--color-error-500` |

**Uso**: Errori, validazione fallita, azioni distruttive.

#### Info (Blu chiaro)
| Token | Valore HEX | CSS Variable |
|-------|------------|--------------|
| info-500 | `#1976D2` | `--color-info-500` |

**Uso**: Informazioni, tooltip, messaggi informativi.

### Neutral - Gray Scale
Scala di grigi per testi, bordi e sfondi.

| Token | Valore HEX | Uso |
|-------|------------|-----|
| neutral-white | `#FFFFFF` | Background principale |
| neutral-50 | `#F5F6F7` | Background subtle |
| neutral-100 | `#E8EAEC` | Bordi light |
| neutral-200 | `#D4D7DB` | Bordi default |
| neutral-300 | `#ADB2B8` | Testo disabled |
| neutral-400 | `#858C94` | Testo muted |
| neutral-500 | `#5C6470` | Testo secondario |
| neutral-600 | `#495057` | Gray base |
| neutral-700 | `#3D434A` | Dark gray |
| neutral-800 | `#30353B` | Darker |
| neutral-900 | `#1F2328` | Testo primario |
| neutral-950 | `#17191C` | Dark mode bg |
| neutral-black | `#000000` | Pure black |

---

## Typography Tokens

### Font Family
Font ufficiale UI Kit Italia: **Titillium Web** (Google Fonts)

| Token | Valore | CSS Variable |
|-------|--------|--------------|
| sans | `"Titillium Web", -apple-system, ...` | `--font-sans` |
| mono | `"Roboto Mono", ui-monospace, ...` | `--font-mono` |
| serif | `"Lora", Georgia, ...` | `--font-serif` |

**Installazione Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700&family=Roboto+Mono&display=swap" rel="stylesheet">
```

### Font Weights

| Token | Valore | CSS Variable | Uso |
|-------|--------|--------------|-----|
| light | `300` | `--font-weight-light` | Lead text, citazioni |
| normal | `400` | `--font-weight-normal` | Body text |
| medium | `500` | `--font-weight-medium` | Enfasi leggera |
| semibold | `600` | `--font-weight-semibold` | Headings, labels |
| bold | `700` | `--font-weight-bold` | H1, H2, CTA |

### Font Sizes

| Token | Valore | Pixel | CSS Variable | Uso |
|-------|--------|-------|--------------|-----|
| xs | `0.75rem` | 12px | `--font-size-xs` | Caption, note |
| sm | `0.875rem` | 14px | `--font-size-sm` | Helper text, labels |
| base | `1rem` | 16px | `--font-size-base` | Body text |
| lg | `1.125rem` | 18px | `--font-size-lg` | Body large |
| xl | `1.25rem` | 20px | `--font-size-xl` | Lead, H6 |
| 2xl | `1.5rem` | 24px | `--font-size-2xl` | H5 |
| 3xl | `1.75rem` | 28px | `--font-size-3xl` | H4 |
| 4xl | `2rem` | 32px | `--font-size-4xl` | H3 |
| 5xl | `2.5rem` | 40px | `--font-size-5xl` | H2 |
| 6xl | `3rem` | 48px | `--font-size-6xl` | H1 |
| 7xl | `3.5rem` | 56px | `--font-size-7xl` | Display sm |
| 8xl | `4rem` | 64px | `--font-size-8xl` | Display md |
| 9xl | `4.5rem` | 72px | `--font-size-9xl` | Display lg |

### Line Heights

| Token | Valore | CSS Variable | Uso |
|-------|--------|--------------|-----|
| none | `1` | `--line-height-none` | Display, numeri grandi |
| tight | `1.1` | `--line-height-tight` | Display headings |
| snug | `1.2` | `--line-height-snug` | Headings |
| normal | `1.35` | `--line-height-normal` | H4-H6 |
| relaxed | `1.5` | `--line-height-relaxed` | Body text |
| loose | `1.75` | `--line-height-loose` | Testo piccolo |

### Letter Spacing

| Token | Valore | CSS Variable |
|-------|--------|--------------|
| tighter | `-0.05em` | `--letter-spacing-tighter` |
| tight | `-0.025em` | `--letter-spacing-tight` |
| normal | `0` | `--letter-spacing-normal` |
| wide | `0.025em` | `--letter-spacing-wide` |
| wider | `0.05em` | `--letter-spacing-wider` |
| widest | `0.1em` | `--letter-spacing-widest` |

### Text Styles Predefiniti

#### Headings
```css
h1 { font-size: 3rem; line-height: 1.2; font-weight: 700; letter-spacing: -0.025em; }
h2 { font-size: 2.5rem; line-height: 1.2; font-weight: 700; letter-spacing: -0.025em; }
h3 { font-size: 2rem; line-height: 1.2; font-weight: 600; }
h4 { font-size: 1.75rem; line-height: 1.35; font-weight: 600; }
h5 { font-size: 1.5rem; line-height: 1.35; font-weight: 600; }
h6 { font-size: 1.25rem; line-height: 1.35; font-weight: 600; }
```

#### Body & Special
```css
body { font-size: 1rem; line-height: 1.5; font-weight: 400; }
.lead { font-size: 1.25rem; line-height: 1.5; font-weight: 300; }
.caption { font-size: 0.75rem; line-height: 1.75; }
.label { font-size: 0.875rem; line-height: 1.35; font-weight: 600; }
```

---

## Spacing Tokens

Sistema di spaziatura basato su scala 4px (0.25rem), coerente con Tailwind CSS.

### Base Spacing Scale

| Token | Valore | Pixel | CSS Variable | Uso |
|-------|--------|-------|--------------|-----|
| 0 | `0` | 0px | `--spacing-0` | Reset |
| 1 | `0.25rem` | 4px | `--spacing-1` | Gap minimo |
| 2 | `0.5rem` | 8px | `--spacing-2` | Gap compatto |
| 3 | `0.75rem` | 12px | `--spacing-3` | Gap standard |
| 4 | `1rem` | 16px | `--spacing-4` | Padding base |
| 5 | `1.25rem` | 20px | `--spacing-5` | Padding medio |
| 6 | `1.5rem` | 24px | `--spacing-6` | Gap sezioni |
| 8 | `2rem` | 32px | `--spacing-8` | Padding ampio |
| 10 | `2.5rem` | 40px | `--spacing-10` | Margin sezione |
| 12 | `3rem` | 48px | `--spacing-12` | Spacing blocchi |
| 16 | `4rem` | 64px | `--spacing-16` | Spacing pagina |
| 20 | `5rem` | 80px | `--spacing-20` | Hero spacing |
| 24 | `6rem` | 96px | `--spacing-24` | Section spacing |

### Semantic Gap

| Token | Valore | CSS Variable | Uso |
|-------|--------|--------------|-----|
| xs | 4px | `--gap-xs` | Inline elements |
| sm | 8px | `--gap-sm` | Elementi compatti |
| md | 12px | `--gap-md` | Standard |
| lg | 16px | `--gap-lg` | Gruppi elementi |
| xl | 24px | `--gap-xl` | Sezioni |
| 2xl | 32px | `--gap-2xl` | Sezioni maggiori |
| 3xl | 48px | `--gap-3xl` | Blocchi |
| 4xl | 64px | `--gap-4xl` | Pagina |

### Border Radius

| Token | Valore | CSS Variable | Uso |
|-------|--------|--------------|-----|
| none | `0` | `--radius-none` | Nessun raggio |
| sm | `0.125rem` | `--radius-sm` | 2px - Minimo |
| default | `0.25rem` | `--radius-default` | 4px - Standard |
| md | `0.375rem` | `--radius-md` | 6px - Medio |
| lg | `0.5rem` | `--radius-lg` | 8px - Confortevole |
| xl | `0.75rem` | `--radius-xl` | 12px - Ampio |
| 2xl | `1rem` | `--radius-2xl` | 16px - Grande |
| 3xl | `1.5rem` | `--radius-3xl` | 24px - Extra |
| full | `9999px` | `--radius-full` | Pill/Circle |

### Container Widths

| Token | Valore | CSS Variable | Uso |
|-------|--------|--------------|-----|
| sm | 384px | `--container-sm` | Mobile |
| md | 448px | `--container-md` | Mobile large |
| lg | 512px | `--container-lg` | Tablet small |
| xl | 576px | `--container-xl` | Tablet |
| 2xl | 672px | `--container-2xl` | Tablet large |
| 3xl | 768px | `--container-3xl` | Desktop small |
| 4xl | 896px | `--container-4xl` | Desktop |
| 5xl | 1024px | `--container-5xl` | Desktop large |
| 6xl | 1152px | `--container-6xl` | Wide |
| **7xl** | 1280px | `--container-7xl` | **UI Kit Italia standard** |

### Z-Index Scale

| Token | Valore | CSS Variable | Uso |
|-------|--------|--------------|-----|
| behind | `-1` | `--z-behind` | Sotto tutto |
| base | `0` | `--z-base` | Livello base |
| raised | `10` | `--z-raised` | Elevato |
| dropdown | `20` | `--z-dropdown` | Dropdown, popover |
| sticky | `30` | `--z-sticky` | Sticky elements |
| fixed | `40` | `--z-fixed` | Header/footer fixed |
| overlay | `50` | `--z-overlay` | Backdrop |
| modal | `60` | `--z-modal` | Modal, dialog |
| tooltip | `70` | `--z-tooltip` | Tooltip |
| toast | `80` | `--z-toast` | Notifiche |
| max | `9999` | `--z-max` | Sopra tutto |

### Breakpoints (Responsive)

| Token | Valore | Media Query |
|-------|--------|-------------|
| sm | 640px | `@media (min-width: 640px)` |
| md | 768px | `@media (min-width: 768px)` |
| lg | 1024px | `@media (min-width: 1024px)` |
| xl | 1280px | `@media (min-width: 1280px)` |
| 2xl | 1536px | `@media (min-width: 1536px)` |

---

## Semantic Tokens

### Text Colors
```css
--text-primary: var(--color-neutral-900);
--text-secondary: var(--color-neutral-500);
--text-muted: var(--color-neutral-400);
--text-disabled: var(--color-neutral-300);
--text-inverse: var(--color-neutral-white);
--text-link: var(--color-primary-500);
--text-link-hover: var(--color-primary-700);
```

### Border Colors
```css
--border-light: var(--color-neutral-100);
--border-default: var(--color-neutral-200);
--border-dark: var(--color-neutral-300);
--border-focus: var(--color-primary-500);
```

### Background Colors
```css
--background: var(--color-neutral-white);
--foreground: var(--color-neutral-900);
```

---

## Mapping Componenti
Registro dei componenti migrati da Figma.

### Atoms

#### Button
Componente bottone conforme UI Kit Italia.

**File**: `src/design-system/atoms/Button/Button.tsx`
**Storybook**: `Atoms/Button`

**Props**:
| Prop | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'danger' \| 'link'` | `'primary'` | Variante visiva |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Dimensione |
| `iconLeft` | `ReactNode` | - | Icona a sinistra |
| `iconRight` | `ReactNode` | - | Icona a destra |
| `isLoading` | `boolean` | `false` | Stato caricamento |
| `fullWidth` | `boolean` | `false` | Larghezza piena |
| `disabled` | `boolean` | `false` | Stato disabilitato |

**Varianti**:
- `primary`: Blu (#0066CC) - Azione principale
- `secondary`: Outline blu - Azione secondaria
- `tertiary`: Ghost/trasparente - Azione terziaria
- `danger`: Rosso (#D32F2F) - Azione distruttiva
- `link`: Stile link testuale

**Utilizzo**:
```tsx
import { Button } from '@/design-system/atoms';

<Button variant="primary" size="md">
  Azione principale
</Button>

<Button variant="secondary" iconLeft={<PlusIcon />}>
  Aggiungi
</Button>

<Button variant="danger" isLoading>
  Eliminazione...
</Button>
```

#### Icon
Wrapper standardizzato per icone Lucide React.

**File**: `src/design-system/atoms/Icon/Icon.tsx`
**Storybook**: `Atoms/Icon`
**Libreria**: [Lucide React](https://lucide.dev/icons) - 1500+ icone tree-shakeable

**Props**:
| Prop | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `icon` | `LucideIcon` | **required** | Componente icona Lucide |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Dimensione |
| `label` | `string` | - | Label accessibilità (se omesso, icona decorativa) |

**Dimensioni**:
| Size | Pixel | Classe Tailwind |
|------|-------|-----------------|
| xs | 12px | `w-3 h-3` |
| sm | 16px | `w-4 h-4` |
| md | 20px | `w-5 h-5` |
| lg | 24px | `w-6 h-6` |
| xl | 32px | `w-8 h-8` |

**Utilizzo**:
```tsx
import { Icon } from '@/design-system/atoms';
import { ArrowRight, Search, CheckCircle } from 'lucide-react';

// Icona decorativa (nascosta a screen reader)
<Icon icon={ArrowRight} size="md" />

// Icona con significato semantico
<Icon icon={Search} size="lg" label="Cerca" />

// Con colore personalizzato
<Icon icon={CheckCircle} className="text-[var(--color-success-500)]" />
```

#### Link
Componente link conforme UI Kit Italia.

**File**: `src/design-system/atoms/Link/Link.tsx`
**Storybook**: `Atoms/Link`
**Figma**: [Link Component](https://www.figma.com/design/INVyTbc0CHHBiY8KPlcTR0/UI-Kit-Italia--Community-?node-id=1732-166401)

**Props**:
| Prop | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `variant` | `'standalone' \| 'withArrow' \| 'withDownload'` | `'standalone'` | Variante visiva |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Dimensione |
| `background` | `'light' \| 'dark'` | `'light'` | Sfondo su cui appare |
| `icon` | `ReactNode` | - | Icona personalizzata |

**Varianti**:
- `standalone`: Solo testo, senza icona
- `withArrow`: Con icona freccia a destra (→) - navigazione
- `withDownload`: Con icona download a sinistra (↓) - scarica file

**Background**:
- `light`: Testo blu (#0066CC) su sfondo chiaro
- `dark`: Testo bianco su sfondo scuro

**Utilizzo**:
```tsx
import { Link } from '@/design-system/atoms';

// Link standalone
<Link href="/pagina">Testo del link</Link>

// Link con freccia
<Link variant="withArrow" href="/pagina">Scopri di più</Link>

// Link download
<Link variant="withDownload" href="/file.pdf">Scarica PDF</Link>

// Link su sfondo scuro
<Link background="dark" href="/pagina">Link chiaro</Link>
```

#### Accordion
Componente per mostrare/nascondere contenuti in sezioni espandibili.

**File**: `src/design-system/atoms/Accordion/Accordion.tsx`
**Storybook**: `Atoms/Accordion`
**Figma**: [Accordion Component](https://www.figma.com/design/INVyTbc0CHHBiY8KPlcTR0/UI-Kit-Italia--Community-?node-id=1205-68590)

**Props**:
| Prop | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `items` | `AccordionItemData[]` | **required** | Array di items |
| `variant` | `'basic' \| 'leftIcon' \| 'activeBackground'` | `'basic'` | Variante visiva |
| `defaultExpandedIds` | `string[]` | `[]` | IDs items espansi inizialmente |
| `allowMultiple` | `boolean` | `false` | Permette apertura multipla |

**AccordionItemData**:
| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | `string` | ID univoco (required) |
| `title` | `string` | Titolo header (required) |
| `content` | `ReactNode` | Contenuto espandibile (required) |
| `disabled` | `boolean` | Item disabilitato |

**Varianti**:
- `basic`: Header con testo neutro e chevron a destra
- `leftIcon`: Icona +/- a sinistra con testo primary blu
- `activeBackground`: Header con sfondo primary quando espanso

**Utilizzo**:
```tsx
import { Accordion } from '@/design-system/atoms';

// Basic
<Accordion
  variant="basic"
  items={[
    { id: '1', title: 'Sezione 1', content: <p>Contenuto</p> },
    { id: '2', title: 'Sezione 2', content: <p>Contenuto</p> },
  ]}
/>

// Con sfondo attivo
<Accordion
  variant="activeBackground"
  items={items}
  defaultExpandedIds={['1']}
/>

// Apertura multipla con icona sinistra
<Accordion
  variant="leftIcon"
  items={items}
  allowMultiple
/>
```

#### Divider
Linea separatrice per dividere sezioni di contenuto.

**File**: `src/design-system/atoms/Divider/Divider.tsx`
**Storybook**: `Atoms/Divider`

**Props**:
| Prop | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientamento |
| `variant` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | Stile linea |
| `spacing` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Spazio attorno |
| `color` | `'light' \| 'medium' \| 'dark'` | `'light'` | Colore linea |

**Utilizzo**:
```tsx
import { Divider } from '@/design-system/atoms';

<Divider />
<Divider variant="dashed" spacing="lg" />
<Divider orientation="vertical" />
```

#### Logo
Brand identity per il Design System.

**File**: `src/design-system/atoms/Logo/Logo.tsx`
**Storybook**: `Atoms/Logo`

**Props**:
| Prop | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `variant` | `'full' \| 'compact' \| 'mono'` | `'full'` | Variante logo |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Dimensione |
| `color` | `'light' \| 'dark'` | - | Colore forzato |

**Varianti**:
- `full`: Logo completo con simbolo + testo "SDLC"
- `compact`: Solo simbolo "AI"
- `mono`: Versione monocromatica

**Utilizzo**:
```tsx
import { Logo } from '@/design-system/atoms';

<Logo variant="full" size="md" />
<Logo variant="compact" color="light" /> // Su sfondo scuro
```

### Molecules

#### LinkGroup
Gruppo di link con titolo opzionale, usato tipicamente nei footer.

**File**: `src/design-system/molecules/LinkGroup/LinkGroup.tsx`
**Storybook**: `Molecules/LinkGroup`

**Props**:
| Prop | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `title` | `string` | - | Titolo gruppo |
| `links` | `LinkGroupItem[]` | **required** | Array di link |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout |
| `variant` | `'light' \| 'dark'` | `'light'` | Sfondo |

**LinkGroupItem**:
| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `label` | `string` | Testo link (required) |
| `href` | `string` | URL (required) |
| `external` | `boolean` | Link esterno |
| `icon` | `ReactNode` | Icona opzionale |

**Utilizzo**:
```tsx
import { LinkGroup } from '@/design-system/molecules';

<LinkGroup
  title="Risorse"
  links={[
    { label: 'Docs', href: '/docs' },
    { label: 'GitHub', href: 'https://github.com', external: true },
  ]}
/>
```

#### SocialLinks
Icone social con link, usato tipicamente nei footer.

**File**: `src/design-system/molecules/SocialLinks/SocialLinks.tsx`
**Storybook**: `Molecules/SocialLinks`

**Props**:
| Prop | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `links` | `SocialLinkItem[]` | **required** | Array di social |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Dimensione icone |
| `variant` | `'light' \| 'dark'` | `'light'` | Sfondo |

**SocialLinkItem**:
| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `name` | `string` | Nome per aria-label (required) |
| `href` | `string` | URL (required) |
| `icon` | `LucideIcon` | Icona Lucide (required) |

**Utilizzo**:
```tsx
import { SocialLinks } from '@/design-system/molecules';
import { Github, Linkedin } from 'lucide-react';

<SocialLinks
  links={[
    { name: 'GitHub', href: 'https://github.com', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  ]}
/>
```

### Organisms

#### Footer
Footer responsive con logo, gruppi di link, social e copyright.

**File**: `src/design-system/organisms/Footer/Footer.tsx`
**Storybook**: `Organisms/Footer`

**Props**:
| Prop | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `logo` | `LogoProps` | - | Configurazione logo |
| `description` | `string` | - | Descrizione sotto logo |
| `columns` | `FooterColumn[]` | `[]` | Colonne di link |
| `socialLinks` | `SocialLinkItem[]` | `[]` | Link social |
| `copyright` | `string` | - | Testo copyright |
| `bottomContent` | `ReactNode` | - | Contenuto aggiuntivo |
| `variant` | `'light' \| 'dark'` | `'dark'` | Colore sfondo |

**FooterColumn**:
| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `title` | `string` | Titolo colonna (required) |
| `links` | `LinkGroupItem[]` | Array di link (required) |

**Utilizzo**:
```tsx
import { Footer } from '@/design-system/organisms';
import { Github, Linkedin } from 'lucide-react';

<Footer
  description="Design System moderno"
  columns={[
    { title: 'Risorse', links: [{ label: 'Docs', href: '/docs' }] },
    { title: 'Progetto', links: [{ label: 'GitHub', href: 'https://github.com', external: true }] },
  ]}
  socialLinks={[
    { name: 'GitHub', href: 'https://github.com', icon: Github },
  ]}
  copyright="© 2024 AI SDLC"
/>
```

#### Hero
Sezione hero per landing page e pagine principali.

**File**: `src/design-system/organisms/Hero/Hero.tsx`
**Storybook**: `Organisms/Hero`

**Props**:
| Prop | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `variant` | `'default' \| 'left' \| 'withImage' \| 'fullImage'` | `'default'` | Layout |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Dimensione padding |
| `background` | `'primary' \| 'neutral' \| 'dark' \| 'light'` | `'primary'` | Sfondo |
| `kicker` | `string` | - | Testo sopra titolo |
| `title` | `string` | **required** | Titolo h1 |
| `subtitle` | `string` | - | Descrizione |
| `actions` | `HeroAction[]` | - | Bottoni CTA (max 2) |
| `imageUrl` | `string` | - | URL immagine |
| `imageAlt` | `string` | - | Alt immagine |
| `imagePosition` | `'left' \| 'right'` | `'right'` | Posizione img |

**Varianti**:
- `default`: Testo centrato su sfondo colorato
- `left`: Testo allineato a sinistra
- `withImage`: Due colonne (testo + immagine)
- `fullImage`: Immagine background con overlay

**Utilizzo**:
```tsx
import { Hero } from '@/design-system/organisms';

<Hero
  variant="default"
  background="primary"
  kicker="Benvenuto"
  title="Titolo principale"
  subtitle="Descrizione della pagina"
  actions={[
    { label: 'Azione principale', href: '/action' },
    { label: 'Scopri di più', href: '/info' }
  ]}
/>

// Con immagine
<Hero
  variant="withImage"
  background="light"
  title="Con immagine"
  imageUrl="/hero.jpg"
  imageAlt="Descrizione"
/>
```

### Templates
*Nessuno*

---

## Regole di Implementazione

1. **Utilizzare esclusivamente i token definiti** - Non hardcodare valori HEX.
2. **Seguire pattern di accessibilita ARIA** - Contrasto minimo WCAG AA.
3. **Ogni componente deve avere una Story dedicata** con varianti e play function.
4. **Dark mode automatico** - Usare i token semantici che si adattano.
5. **Landmark accessibili** - Ogni `<section>` deve avere `aria-labelledby` che punta al suo heading.
6. **Contrasto testo** - Non usare opacita ridotte (`text-white/80`, `text-white/90`) su sfondi colorati. Usare `text-white` pieno per garantire contrasto WCAG AA.
7. **Lighthouse CI** - Ogni componente deve superare accessibility score >= 0.95 (configurato in `lighthouserc.js`).

## Utilizzo in Codice

### TypeScript Import
```typescript
import { colors, primary, accent, system, neutral } from '@/design-system/tokens';

// Uso diretto
const bgColor = primary[500]; // '#0066CC'
const errorColor = system.error.DEFAULT; // '#D32F2F'
```

### Tailwind Classes
```jsx
// Primary button
<button className="bg-primary-500 hover:bg-primary-600 text-white">
  Azione principale
</button>

// Success message
<div className="bg-success-50 border-success-500 text-success-700">
  Operazione completata
</div>

// Neutral text
<p className="text-neutral-500">Testo secondario</p>
```
