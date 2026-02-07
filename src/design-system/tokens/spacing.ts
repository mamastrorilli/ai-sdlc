/**
 * Design Tokens - Spacing
 * UI Kit Italia - Design System
 * Fonte: https://www.figma.com/design/qMgiC0CQiPCSGo8B03CiC0/UI-Kit-Italia--Community-
 *
 * Sistema di spaziatura basato su scala 4px (0.25rem)
 * Coerente con Tailwind CSS default spacing scale
 */

/**
 * Base Spacing Scale
 * Unità base: 4px (0.25rem)
 * Formato: rem per scalabilità
 */
export const spacing = {
  /** 0px */
  0: '0',
  /** 1px */
  px: '1px',
  /** 2px - 0.125rem */
  0.5: '0.125rem',
  /** 4px - 0.25rem */
  1: '0.25rem',
  /** 6px - 0.375rem */
  1.5: '0.375rem',
  /** 8px - 0.5rem */
  2: '0.5rem',
  /** 10px - 0.625rem */
  2.5: '0.625rem',
  /** 12px - 0.75rem */
  3: '0.75rem',
  /** 14px - 0.875rem */
  3.5: '0.875rem',
  /** 16px - 1rem */
  4: '1rem',
  /** 20px - 1.25rem */
  5: '1.25rem',
  /** 24px - 1.5rem */
  6: '1.5rem',
  /** 28px - 1.75rem */
  7: '1.75rem',
  /** 32px - 2rem */
  8: '2rem',
  /** 36px - 2.25rem */
  9: '2.25rem',
  /** 40px - 2.5rem */
  10: '2.5rem',
  /** 44px - 2.75rem */
  11: '2.75rem',
  /** 48px - 3rem */
  12: '3rem',
  /** 56px - 3.5rem */
  14: '3.5rem',
  /** 64px - 4rem */
  16: '4rem',
  /** 80px - 5rem */
  20: '5rem',
  /** 96px - 6rem */
  24: '6rem',
  /** 112px - 7rem */
  28: '7rem',
  /** 128px - 8rem */
  32: '8rem',
  /** 144px - 9rem */
  36: '9rem',
  /** 160px - 10rem */
  40: '10rem',
  /** 176px - 11rem */
  44: '11rem',
  /** 192px - 12rem */
  48: '12rem',
  /** 208px - 13rem */
  52: '13rem',
  /** 224px - 14rem */
  56: '14rem',
  /** 240px - 15rem */
  60: '15rem',
  /** 256px - 16rem */
  64: '16rem',
  /** 288px - 18rem */
  72: '18rem',
  /** 320px - 20rem */
  80: '20rem',
  /** 384px - 24rem */
  96: '24rem',
} as const;

/**
 * Semantic Spacing - Gap tra elementi
 * Nomi semantici per uso consistente
 */
export const gap = {
  /** Nessuno spazio */
  none: spacing[0],
  /** 4px - Spazio minimo tra elementi inline */
  xs: spacing[1],
  /** 8px - Spazio tra elementi compatti */
  sm: spacing[2],
  /** 12px - Spazio standard tra elementi */
  md: spacing[3],
  /** 16px - Spazio tra gruppi di elementi */
  lg: spacing[4],
  /** 24px - Spazio tra sezioni */
  xl: spacing[6],
  /** 32px - Spazio tra sezioni maggiori */
  '2xl': spacing[8],
  /** 48px - Spazio tra blocchi */
  '3xl': spacing[12],
  /** 64px - Spazio tra sezioni di pagina */
  '4xl': spacing[16],
} as const;

/**
 * Padding - Spaziatura interna componenti
 */
export const padding = {
  /** Nessun padding */
  none: spacing[0],
  /** 4px - Padding minimo (badge, tag) */
  xs: spacing[1],
  /** 8px - Padding compatto (chip, small button) */
  sm: spacing[2],
  /** 12px - Padding standard (input, button) */
  md: spacing[3],
  /** 16px - Padding confortevole (card content) */
  lg: spacing[4],
  /** 24px - Padding ampio (card, modal) */
  xl: spacing[6],
  /** 32px - Padding sezione */
  '2xl': spacing[8],
  /** 48px - Padding container */
  '3xl': spacing[12],
  /** 64px - Padding hero section */
  '4xl': spacing[16],
} as const;

/**
 * Margin - Spaziatura esterna
 */
export const margin = {
  /** Nessun margine */
  none: spacing[0],
  /** 4px */
  xs: spacing[1],
  /** 8px */
  sm: spacing[2],
  /** 12px */
  md: spacing[3],
  /** 16px */
  lg: spacing[4],
  /** 24px */
  xl: spacing[6],
  /** 32px */
  '2xl': spacing[8],
  /** 48px */
  '3xl': spacing[12],
  /** 64px */
  '4xl': spacing[16],
  /** Auto - per centratura */
  auto: 'auto',
} as const;

/**
 * Container Widths - Larghezze massime container
 */
export const containerWidth = {
  /** 320px - Mobile small */
  xs: '20rem',
  /** 384px - Mobile */
  sm: '24rem',
  /** 448px - Mobile large */
  md: '28rem',
  /** 512px - Tablet small */
  lg: '32rem',
  /** 576px - Tablet */
  xl: '36rem',
  /** 672px - Tablet large */
  '2xl': '42rem',
  /** 768px - Desktop small */
  '3xl': '48rem',
  /** 896px - Desktop */
  '4xl': '56rem',
  /** 1024px - Desktop large */
  '5xl': '64rem',
  /** 1152px - Wide */
  '6xl': '72rem',
  /** 1280px - Container standard UI Kit Italia */
  '7xl': '80rem',
  /** 1440px - Full width */
  '8xl': '90rem',
  /** 100% */
  full: '100%',
} as const;

/**
 * Border Radius - Raggi degli angoli
 */
export const borderRadius = {
  /** Nessun raggio */
  none: '0',
  /** 2px - Raggio minimo */
  sm: '0.125rem',
  /** 4px - Raggio standard */
  DEFAULT: '0.25rem',
  /** 6px - Raggio medio */
  md: '0.375rem',
  /** 8px - Raggio confortevole */
  lg: '0.5rem',
  /** 12px - Raggio ampio */
  xl: '0.75rem',
  /** 16px - Raggio grande */
  '2xl': '1rem',
  /** 24px - Raggio extra */
  '3xl': '1.5rem',
  /** 9999px - Completamente arrotondato */
  full: '9999px',
} as const;

/**
 * Border Width - Spessori bordi
 */
export const borderWidth = {
  /** Nessun bordo */
  0: '0',
  /** 1px - Bordo standard */
  DEFAULT: '1px',
  /** 2px - Bordo medio */
  2: '2px',
  /** 4px - Bordo spesso */
  4: '4px',
  /** 8px - Bordo decorativo */
  8: '8px',
} as const;

/**
 * Z-Index Scale - Livelli di sovrapposizione
 */
export const zIndex = {
  /** Sotto tutto */
  behind: '-1',
  /** Livello base */
  base: '0',
  /** Elementi leggermente elevati */
  raised: '10',
  /** Dropdown, popover */
  dropdown: '20',
  /** Sticky elements */
  sticky: '30',
  /** Fixed header/footer */
  fixed: '40',
  /** Overlay, backdrop */
  overlay: '50',
  /** Modal, dialog */
  modal: '60',
  /** Tooltip */
  tooltip: '70',
  /** Toast, notification */
  toast: '80',
  /** Sopra tutto */
  max: '9999',
} as const;

/**
 * Breakpoints - Responsive design
 * Coerenti con Tailwind CSS
 */
export const breakpoints = {
  /** 640px - Mobile landscape / Tablet portrait */
  sm: '640px',
  /** 768px - Tablet */
  md: '768px',
  /** 1024px - Desktop small */
  lg: '1024px',
  /** 1280px - Desktop */
  xl: '1280px',
  /** 1536px - Desktop large */
  '2xl': '1536px',
} as const;

/**
 * Aspect Ratios
 */
export const aspectRatio = {
  auto: 'auto',
  square: '1 / 1',
  video: '16 / 9',
  portrait: '3 / 4',
  landscape: '4 / 3',
  wide: '21 / 9',
} as const;

/**
 * Spacing object completo
 */
export const spacingTokens = {
  spacing,
  gap,
  padding,
  margin,
  containerWidth,
  borderRadius,
  borderWidth,
  zIndex,
  breakpoints,
  aspectRatio,
} as const;

export type Spacing = keyof typeof spacing;
export type Gap = keyof typeof gap;
export type Padding = keyof typeof padding;
export type Margin = keyof typeof margin;
export type ContainerWidth = keyof typeof containerWidth;
export type BorderRadius = keyof typeof borderRadius;
export type BorderWidth = keyof typeof borderWidth;
export type ZIndex = keyof typeof zIndex;
export type Breakpoint = keyof typeof breakpoints;
