/**
 * Button Component
 * UI Kit Italia - Design System
 *
 * Varianti:
 * - primary: Azione principale (blu)
 * - secondary: Azione secondaria (outline)
 * - tertiary: Azione terziaria (ghost)
 * - danger: Azione distruttiva (rosso)
 * - link: Stile link
 *
 * @see https://www.figma.com/design/INVyTbc0CHHBiY8KPlcTR0/UI-Kit-Italia--Community-
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { Icon, type IconSize } from '../Icon';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visiva del bottone */
  variant?: ButtonVariant;
  /** Dimensione del bottone */
  size?: ButtonSize;
  /** Icona a sinistra del testo */
  iconLeft?: ReactNode;
  /** Icona a destra del testo */
  iconRight?: ReactNode;
  /** Stato di caricamento */
  isLoading?: boolean;
  /** Bottone a larghezza piena */
  fullWidth?: boolean;
  /** Contenuto del bottone */
  children: ReactNode;
}

/**
 * Stili base condivisi da tutte le varianti
 */
const baseStyles = [
  'inline-flex items-center justify-center gap-2',
  'font-semibold transition-all duration-200',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  'disabled:cursor-not-allowed disabled:opacity-50',
  'select-none',
].join(' ');

/**
 * Stili per variante
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-[var(--color-primary-500)] text-white',
    'hover:bg-[var(--color-primary-600)]',
    'active:bg-[var(--color-primary-700)]',
    'focus-visible:outline-[var(--color-primary-500)]',
  ].join(' '),

  secondary: [
    'bg-transparent text-[var(--color-primary-500)]',
    'border-2 border-[var(--color-primary-500)]',
    'hover:bg-[var(--color-primary-50)]',
    'active:bg-[var(--color-primary-100)]',
    'focus-visible:outline-[var(--color-primary-500)]',
  ].join(' '),

  tertiary: [
    'bg-transparent text-[var(--color-primary-500)]',
    'hover:bg-[var(--color-primary-50)]',
    'active:bg-[var(--color-primary-100)]',
    'focus-visible:outline-[var(--color-primary-500)]',
  ].join(' '),

  danger: [
    'bg-[var(--color-error-500)] text-white',
    'hover:bg-[var(--color-error-600)]',
    'active:bg-[var(--color-error-700)]',
    'focus-visible:outline-[var(--color-error-500)]',
  ].join(' '),

  link: [
    'bg-transparent text-[var(--color-primary-500)] underline underline-offset-2',
    'hover:text-[var(--color-primary-700)]',
    'active:text-[var(--color-primary-800)]',
    'focus-visible:outline-[var(--color-primary-500)]',
    'p-0', // Reset padding for link style
  ].join(' '),
};

/**
 * Stili per dimensione
 */
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5 rounded',
  md: 'text-base px-4 py-2 rounded-md',
  lg: 'text-lg px-6 py-3 rounded-lg',
};

/**
 * Mapping size Button -> size Icon
 */
const iconSizeMap: Record<ButtonSize, IconSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

/**
 * Button Component
 *
 * Componente bottone conforme alle linee guida UI Kit Italia.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Azione principale
 * </Button>
 *
 * <Button variant="secondary" iconLeft={<Icon />}>
 *   Con icona
 * </Button>
 *
 * <Button variant="danger" isLoading>
 *   Eliminazione in corso...
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      iconLeft,
      iconRight,
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    // Link variant non ha padding di size, usa solo base
    const sizeClass = variant === 'link' ? '' : sizeStyles[size];

    const buttonClasses = [
      baseStyles,
      variantStyles[variant],
      sizeClass,
      fullWidth ? 'w-full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const iconSize = iconSizeMap[size];

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={buttonClasses}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <Icon icon={Loader2} size={iconSize} className="animate-spin" />
        ) : (
          iconLeft && iconLeft
        )}

        <span>{children}</span>

        {!isLoading && iconRight && iconRight}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
