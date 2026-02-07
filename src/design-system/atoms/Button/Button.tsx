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
 * Dimensioni icone per size
 */
const iconSizeStyles: Record<ButtonSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

/**
 * Spinner per stato loading
 */
function LoadingSpinner({ size }: { size: ButtonSize }) {
  return (
    <svg
      className={`animate-spin ${iconSizeStyles[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

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
          <LoadingSpinner size={size} />
        ) : (
          iconLeft && (
            <span className={iconSizeStyles[size]} aria-hidden="true">
              {iconLeft}
            </span>
          )
        )}

        <span>{children}</span>

        {!isLoading && iconRight && (
          <span className={iconSizeStyles[size]} aria-hidden="true">
            {iconRight}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
