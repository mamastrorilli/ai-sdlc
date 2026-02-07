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
  | 'link'
  | 'primaryInverted'
  | 'secondaryInverted'
  | 'tertiaryInverted';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
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
  /** Elemento da renderizzare (default: button) */
  as?: React.ElementType;
}

/**
 * Stili base condivisi da tutte le varianti
 */
const baseStyles = [
  'inline-flex items-center justify-center gap-2',
  'font-semibold transition-all duration-200',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  'disabled:cursor-not-allowed disabled:opacity-50',
  'select-none whitespace-nowrap',
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

  primaryInverted: [
    'bg-white text-[var(--color-primary-500)]',
    'hover:bg-[var(--color-neutral-100)]',
    'focus-visible:outline-white',
  ].join(' '),

  secondaryInverted: [
    'bg-transparent text-white',
    'border-2 border-white',
    'hover:bg-white/10',
    'focus-visible:outline-white',
  ].join(' '),

  tertiaryInverted: [
    'bg-transparent text-white/90',
    'hover:text-white hover:bg-white/10',
    'focus-visible:outline-white',
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
 * Supporta il rendering come altro elemento (es. anchor) tramite la prop 'as'.
 */
export const Button = forwardRef<HTMLElement, ButtonProps>(
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
      as: Component = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    // Link variant non ha padding di size, usa solo base
    const sizeClass = variant === 'link' ? '' : sizeStyles[size as ButtonSize];

    const buttonClasses = [
      baseStyles,
      variantStyles[variant as ButtonVariant] || variantStyles.primary,
      sizeClass,
      fullWidth ? 'w-full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const iconSize = iconSizeMap[size as ButtonSize];

    return (
      <Component
        ref={ref}
        disabled={Component === 'button' ? isDisabled : undefined}
        className={buttonClasses}
        aria-busy={isLoading}
        {...(props as any) /* eslint-disable-line @typescript-eslint/no-explicit-any */}
      >
        {isLoading ? (
          <Icon icon={Loader2} size={iconSize} className="animate-spin" />
        ) : (
          iconLeft && iconLeft
        )}

        <span>{children}</span>

        {!isLoading && iconRight && iconRight}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;
