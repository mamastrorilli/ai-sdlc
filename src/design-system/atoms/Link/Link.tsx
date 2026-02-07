/**
 * Link Component
 * UI Kit Italia - Design System
 *
 * Varianti:
 * - standalone: Solo testo, senza icona
 * - withArrow: Con icona freccia a destra (→)
 * - withDownload: Con icona download a sinistra (↓)
 *
 * @see https://www.figma.com/design/INVyTbc0CHHBiY8KPlcTR0/UI-Kit-Italia--Community-?node-id=1732-166401
 */

import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { Icon, type IconSize } from '../Icon';

export type LinkVariant = 'standalone' | 'withArrow' | 'withDownload';

export type LinkSize = 'sm' | 'md' | 'lg';

export type LinkBackground = 'light' | 'dark';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Variante del link */
  variant?: LinkVariant;
  /** Dimensione del link */
  size?: LinkSize;
  /** Sfondo su cui viene mostrato il link */
  background?: LinkBackground;
  /** Icona personalizzata (sovrascrive l'icona della variante) */
  icon?: ReactNode;
  /** Contenuto del link */
  children: ReactNode;
}

/**
 * Stili base condivisi
 */
const baseStyles = [
  'inline-flex items-center gap-1.5',
  'font-semibold transition-all duration-200',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  'aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
  'select-none cursor-pointer',
].join(' ');

/**
 * Stili per background
 */
const backgroundStyles: Record<LinkBackground, string> = {
  light: [
    'text-[var(--color-primary-500)]',
    'hover:underline hover:underline-offset-4',
    'focus-visible:outline-[var(--color-primary-500)]',
    'aria-disabled:text-[var(--color-neutral-400)] aria-disabled:no-underline',
  ].join(' '),
  dark: [
    'text-white',
    'hover:underline hover:underline-offset-4',
    'focus-visible:outline-white',
    'aria-disabled:text-[var(--color-neutral-300)] aria-disabled:no-underline',
  ].join(' '),
};

/**
 * Stili per dimensione
 */
const sizeStyles: Record<LinkSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

/**
 * Mapping size Link -> size Icon
 */
const iconSizeMap: Record<LinkSize, IconSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

/**
 * Link Component
 *
 * Componente link conforme alle linee guida UI Kit Italia.
 *
 * @example
 * ```tsx
 * // Link standalone
 * <Link href="/pagina">Testo del link</Link>
 *
 * // Link con freccia
 * <Link variant="withArrow" href="/pagina">Scopri di più</Link>
 *
 * // Link download
 * <Link variant="withDownload" href="/file.pdf">Scarica PDF</Link>
 *
 * // Link su sfondo scuro
 * <Link background="dark" href="/pagina">Link chiaro</Link>
 * ```
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = 'standalone',
      size = 'md',
      background = 'light',
      icon,
      children,
      className = '',
      'aria-disabled': ariaDisabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const linkClasses = [
      baseStyles,
      backgroundStyles[background],
      sizeStyles[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const iconSize = iconSizeMap[size];

    // Determina quale icona mostrare
    const renderIcon = () => {
      if (icon) {
        return icon;
      }

      switch (variant) {
        case 'withArrow':
          return <Icon icon={ArrowRight} size={iconSize} />;
        case 'withDownload':
          return <Icon icon={Download} size={iconSize} />;
        default:
          return null;
      }
    };

    const iconElement = renderIcon();
    const isDownload = variant === 'withDownload';

    // Gestione click quando disabilitato
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (ariaDisabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    return (
      <a
        ref={ref}
        className={linkClasses}
        aria-disabled={ariaDisabled}
        onClick={handleClick}
        tabIndex={ariaDisabled ? -1 : undefined}
        {...props}
      >
        {isDownload && iconElement}
        <span>{children}</span>
        {!isDownload && iconElement}
      </a>
    );
  }
);

Link.displayName = 'Link';

export default Link;
