/**
 * Logo Component
 * UI Kit Italia - Design System
 *
 * Varianti:
 * - full: Logo completo con testo
 * - compact: Solo simbolo/icona
 * - mono: Versione monocromatica
 */

import { type HTMLAttributes } from 'react';

export type LogoVariant = 'full' | 'compact' | 'mono';
export type LogoSize = 'sm' | 'md' | 'lg';

export interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  /** Variante del logo */
  variant?: LogoVariant;
  /** Dimensione del logo */
  size?: LogoSize;
  /** Testo alternativo per accessibilità */
  alt?: string;
  /** Colore forzato (per variante mono) */
  color?: 'light' | 'dark';
}

const sizeStyles: Record<LogoSize, { container: string; text: string; icon: string }> = {
  sm: { container: 'h-8', text: 'text-lg', icon: 'w-6 h-6' },
  md: { container: 'h-10', text: 'text-xl', icon: 'w-8 h-8' },
  lg: { container: 'h-12', text: 'text-2xl', icon: 'w-10 h-10' },
};

/**
 * Logo Component
 *
 * Brand identity per il Design System.
 *
 * @example
 * ```tsx
 * <Logo variant="full" size="md" />
 * <Logo variant="compact" />
 * <Logo variant="mono" color="light" />
 * ```
 */
export function Logo({
  variant = 'full',
  size = 'md',
  alt = 'AI SDLC',
  color,
  className = '',
  ...props
}: LogoProps) {
  const styles = sizeStyles[size];

  const textColor = color === 'light'
    ? 'text-white'
    : color === 'dark'
      ? 'text-[var(--color-neutral-900)]'
      : 'text-[var(--color-primary-500)]';

  const iconBg = color === 'light'
    ? 'bg-white text-[var(--color-primary-500)]'
    : color === 'dark'
      ? 'bg-[var(--color-neutral-900)] text-white'
      : 'bg-[var(--color-primary-500)] text-white';

  return (
    <div
      className={`flex items-center gap-2 ${styles.container} ${className}`}
      role="img"
      aria-label={alt}
      {...props}
    >
      {/* Icon/Symbol */}
      <div
        className={`${styles.icon} ${iconBg} rounded-lg flex items-center justify-center font-bold ${styles.text}`}
      >
        AI
      </div>

      {/* Text (only for full variant) */}
      {variant === 'full' && (
        <span className={`font-bold ${styles.text} ${textColor}`}>
          SDLC
        </span>
      )}
    </div>
  );
}

export default Logo;
