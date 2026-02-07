/**
 * Divider Component
 * UI Kit Italia - Design System
 *
 * Linea separatrice per dividere sezioni di contenuto.
 */

import { type HTMLAttributes } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /** Orientamento del divider */
  orientation?: DividerOrientation;
  /** Stile della linea */
  variant?: DividerVariant;
  /** Spazio verticale/orizzontale */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /** Colore del divider */
  color?: 'light' | 'medium' | 'dark';
}

const spacingStyles: Record<string, Record<DividerOrientation, string>> = {
  none: { horizontal: '', vertical: '' },
  sm: { horizontal: 'my-2', vertical: 'mx-2' },
  md: { horizontal: 'my-4', vertical: 'mx-4' },
  lg: { horizontal: 'my-8', vertical: 'mx-8' },
};

const variantStyles: Record<DividerVariant, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
};

const colorStyles: Record<string, string> = {
  light: 'border-[var(--color-neutral-200)]',
  medium: 'border-[var(--color-neutral-400)]',
  dark: 'border-[var(--color-neutral-600)]',
};

/**
 * Divider Component
 *
 * Separatore visivo per contenuti.
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider variant="dashed" spacing="lg" />
 * <Divider orientation="vertical" />
 * ```
 */
export function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  spacing = 'md',
  color = 'light',
  className = '',
  ...props
}: DividerProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <hr
      className={`
        ${isHorizontal ? 'w-full border-t' : 'h-full border-l self-stretch'}
        ${variantStyles[variant]}
        ${colorStyles[color]}
        ${spacingStyles[spacing][orientation]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      aria-orientation={orientation}
      {...props}
    />
  );
}

export default Divider;
