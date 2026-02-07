/**
 * Design Tokens - Colors
 * UI Kit Italia - Design System
 * Fonte: https://www.figma.com/design/qMgiC0CQiPCSGo8B03CiC0/UI-Kit-Italia--Community-
 */

/**
 * Primary Color - Blu Italia
 * Colore primario del design system italiano
 */
export const primary = {
  50: '#E6F0FA',
  100: '#B3D4F1',
  200: '#80B8E8',
  300: '#4D9CDF',
  400: '#1A80D6',
  500: '#0066CC', // Primary base - Italia Blue
  600: '#0059B3',
  700: '#004D99',
  800: '#004080',
  900: '#003366',
  950: '#001A33',
  DEFAULT: '#0066CC',
} as const;

/**
 * Accent Color - Teal/Cyan
 * Colore di accento per elementi interattivi
 */
export const accent = {
  50: '#E6F7F7',
  100: '#B3E8E8',
  200: '#80D9D9',
  300: '#4DCACA',
  400: '#1ABBBB',
  500: '#00A3A3', // Accent base
  600: '#008F8F',
  700: '#007A7A',
  800: '#006666',
  900: '#005252',
  950: '#002929',
  DEFAULT: '#00A3A3',
} as const;

/**
 * System Colors - Feedback States
 * Colori per stati di sistema e feedback utente
 */
export const system = {
  /** Success - Verde */
  success: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#008758', // Success base - Verde Italia
    600: '#007A4D',
    700: '#006D42',
    800: '#005F37',
    900: '#00522C',
    DEFAULT: '#008758',
  },
  /** Warning - Giallo/Arancio */
  warning: {
    50: '#FFF8E1',
    100: '#FFECB3',
    200: '#FFE082',
    300: '#FFD54F',
    400: '#FFCA28',
    500: '#A66300', // Warning base - Ocra Italia
    600: '#8F5600',
    700: '#784900',
    800: '#613C00',
    900: '#4A2F00',
    DEFAULT: '#A66300',
  },
  /** Error - Rosso */
  error: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#D32F2F', // Error base - Rosso
    600: '#C62828',
    700: '#B71C1C',
    800: '#A31515',
    900: '#8B0000',
    DEFAULT: '#D32F2F',
  },
  /** Info - Blu chiaro */
  info: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#1976D2', // Info base
    600: '#1565C0',
    700: '#0D47A1',
    800: '#0A3D8F',
    900: '#07337D',
    DEFAULT: '#1976D2',
  },
} as const;

/**
 * Neutral Colors - Gray Scale
 * Scala di grigi per testi, bordi e sfondi
 */
export const neutral = {
  white: '#FFFFFF',
  50: '#F5F6F7',
  100: '#E8EAEC',
  200: '#D4D7DB',
  300: '#ADB2B8',
  400: '#858C94',
  500: '#5C6470',
  600: '#495057', // Gray base - Italia
  700: '#3D434A',
  800: '#30353B',
  900: '#1F2328',
  950: '#17191C',
  black: '#000000',
  DEFAULT: '#5C6470',
} as const;

/**
 * Background Colors
 * Colori per sfondi di sezione
 */
export const background = {
  light: '#FFFFFF',
  subtle: '#F5F6F7',
  muted: '#E8EAEC',
  dark: '#17191C',
  primary: '#0066CC',
  accent: '#00A3A3',
} as const;

/**
 * Text Colors
 * Colori per il testo
 */
export const text = {
  primary: '#1F2328',
  secondary: '#5C6470',
  muted: '#858C94',
  disabled: '#ADB2B8',
  inverse: '#FFFFFF',
  link: '#0066CC',
  linkHover: '#004D99',
} as const;

/**
 * Border Colors
 * Colori per bordi e divisori
 */
export const border = {
  light: '#E8EAEC',
  DEFAULT: '#D4D7DB',
  dark: '#ADB2B8',
  focus: '#0066CC',
  error: '#D32F2F',
  success: '#008758',
} as const;

/**
 * Colori completi esportati
 */
export const colors = {
  primary,
  accent,
  system,
  neutral,
  background,
  text,
  border,
  // Alias semantici
  success: system.success,
  warning: system.warning,
  error: system.error,
  info: system.info,
} as const;

export type PrimaryColor = keyof typeof primary;
export type AccentColor = keyof typeof accent;
export type NeutralColor = keyof typeof neutral;
export type SystemColor = keyof typeof system;
