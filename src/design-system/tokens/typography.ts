/**
 * Design Tokens - Typography
 * UI Kit Italia - Design System
 * Fonte: https://www.figma.com/design/qMgiC0CQiPCSGo8B03CiC0/UI-Kit-Italia--Community-
 *
 * Font ufficiale: Titillium Web (Google Fonts)
 * Alternativa system: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
 */

/**
 * Font Families
 */
export const fontFamily = {
  /** Font principale - Titillium Web */
  sans: '"Titillium Web", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  /** Font monospace per codice */
  mono: '"Roboto Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  /** Font serif per citazioni (opzionale) */
  serif: '"Lora", Georgia, Cambria, "Times New Roman", Times, serif',
} as const;

/**
 * Font Weights
 * UI Kit Italia utilizza principalmente: Light, Regular, Semibold, Bold
 */
export const fontWeight = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

/**
 * Font Sizes
 * Scala tipografica UI Kit Italia (in rem, base 16px)
 */
export const fontSize = {
  /** 12px - Caption, label piccole */
  xs: '0.75rem',
  /** 14px - Testo secondario, helper text */
  sm: '0.875rem',
  /** 16px - Testo base, paragrafi */
  base: '1rem',
  /** 18px - Testo enfatizzato */
  lg: '1.125rem',
  /** 20px - Lead text, intro */
  xl: '1.25rem',
  /** 24px - Heading 5 */
  '2xl': '1.5rem',
  /** 28px - Heading 4 */
  '3xl': '1.75rem',
  /** 32px - Heading 3 */
  '4xl': '2rem',
  /** 40px - Heading 2 */
  '5xl': '2.5rem',
  /** 48px - Heading 1 */
  '6xl': '3rem',
  /** 56px - Display small */
  '7xl': '3.5rem',
  /** 64px - Display medium */
  '8xl': '4rem',
  /** 72px - Display large */
  '9xl': '4.5rem',
} as const;

/**
 * Line Heights
 * Corrispondenti alle dimensioni font
 */
export const lineHeight = {
  /** Tight - per headings grandi */
  none: '1',
  tight: '1.1',
  snug: '1.2',
  /** Normal - per headings */
  normal: '1.35',
  /** Relaxed - per body text */
  relaxed: '1.5',
  /** Loose - per testo piccolo */
  loose: '1.75',
} as const;

/**
 * Letter Spacing
 */
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

/**
 * Text Styles Predefiniti
 * Combinazioni pronte all'uso secondo UI Kit Italia
 */
export const textStyles = {
  /** Display - Titoli hero e grandi */
  display: {
    lg: {
      fontSize: fontSize['9xl'],
      lineHeight: lineHeight.tight,
      fontWeight: fontWeight.bold,
      letterSpacing: letterSpacing.tight,
    },
    md: {
      fontSize: fontSize['8xl'],
      lineHeight: lineHeight.tight,
      fontWeight: fontWeight.bold,
      letterSpacing: letterSpacing.tight,
    },
    sm: {
      fontSize: fontSize['7xl'],
      lineHeight: lineHeight.tight,
      fontWeight: fontWeight.bold,
      letterSpacing: letterSpacing.tight,
    },
  },

  /** Headings */
  h1: {
    fontSize: fontSize['6xl'],
    lineHeight: lineHeight.snug,
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontSize: fontSize['5xl'],
    lineHeight: lineHeight.snug,
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontSize: fontSize['4xl'],
    lineHeight: lineHeight.snug,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.normal,
  },
  h4: {
    fontSize: fontSize['3xl'],
    lineHeight: lineHeight.normal,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.normal,
  },
  h5: {
    fontSize: fontSize['2xl'],
    lineHeight: lineHeight.normal,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.normal,
  },
  h6: {
    fontSize: fontSize.xl,
    lineHeight: lineHeight.normal,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.normal,
  },

  /** Body Text */
  body: {
    lg: {
      fontSize: fontSize.lg,
      lineHeight: lineHeight.relaxed,
      fontWeight: fontWeight.normal,
      letterSpacing: letterSpacing.normal,
    },
    md: {
      fontSize: fontSize.base,
      lineHeight: lineHeight.relaxed,
      fontWeight: fontWeight.normal,
      letterSpacing: letterSpacing.normal,
    },
    sm: {
      fontSize: fontSize.sm,
      lineHeight: lineHeight.relaxed,
      fontWeight: fontWeight.normal,
      letterSpacing: letterSpacing.normal,
    },
  },

  /** Lead - Testo introduttivo */
  lead: {
    fontSize: fontSize.xl,
    lineHeight: lineHeight.relaxed,
    fontWeight: fontWeight.light,
    letterSpacing: letterSpacing.normal,
  },

  /** Caption - Testo piccolo */
  caption: {
    fontSize: fontSize.xs,
    lineHeight: lineHeight.loose,
    fontWeight: fontWeight.normal,
    letterSpacing: letterSpacing.wide,
  },

  /** Label - Form labels */
  label: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.normal,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.normal,
  },

  /** Button text */
  button: {
    lg: {
      fontSize: fontSize.lg,
      lineHeight: lineHeight.normal,
      fontWeight: fontWeight.semibold,
      letterSpacing: letterSpacing.wide,
    },
    md: {
      fontSize: fontSize.base,
      lineHeight: lineHeight.normal,
      fontWeight: fontWeight.semibold,
      letterSpacing: letterSpacing.wide,
    },
    sm: {
      fontSize: fontSize.sm,
      lineHeight: lineHeight.normal,
      fontWeight: fontWeight.semibold,
      letterSpacing: letterSpacing.wide,
    },
  },

  /** Link */
  link: {
    fontSize: fontSize.base,
    lineHeight: lineHeight.relaxed,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.normal,
  },

  /** Code - Testo monospace */
  code: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.relaxed,
    fontWeight: fontWeight.normal,
    letterSpacing: letterSpacing.normal,
  },
} as const;

/**
 * Typography object completo
 */
export const typography = {
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
  textStyles,
} as const;

export type FontFamily = keyof typeof fontFamily;
export type FontWeight = keyof typeof fontWeight;
export type FontSize = keyof typeof fontSize;
export type LineHeight = keyof typeof lineHeight;
export type LetterSpacing = keyof typeof letterSpacing;
