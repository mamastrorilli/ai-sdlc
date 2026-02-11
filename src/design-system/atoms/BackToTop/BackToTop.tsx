/**
 * BackToTop Component
 * UI Kit Italia - Design System
 *
 * Pulsante fisso "Torna su" che appare durante lo scroll
 * e riporta l'utente in cima alla pagina con animazione smooth.
 *
 * @see https://italia.github.io/bootstrap-italia/docs/componenti/back-to-top/
 */

import { forwardRef, useState, useEffect, useCallback, type ButtonHTMLAttributes } from 'react';
import { ArrowUp } from 'lucide-react';
import { Icon } from '../Icon';

export type BackToTopVariant = 'light' | 'dark';
export type BackToTopSize = 'md' | 'sm';

export interface BackToTopProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante colore */
  variant?: BackToTopVariant;
  /** Dimensione del pulsante */
  size?: BackToTopSize;
  /** Mostra ombra */
  shadow?: boolean;
  /** Soglia di scroll in px per mostrare il pulsante */
  scrollLimit?: number;
  /** Durata animazione scroll in ms (usata come fallback) */
  duration?: number;
  /** Label per accessibilità */
  ariaLabel?: string;
}

const variantStyles: Record<BackToTopVariant, string> = {
  light: [
    'bg-[#CCCCCC] text-[#AAAAAA]',
    'hover:bg-[#BBBBBB]',
    'active:bg-[#AAAAAA]',
  ].join(' '),
  dark: [
    'bg-[#F0F0F0] text-[#D0D0D0]',
    'hover:bg-[#E8E8E8]',
  ].join(' '),
};

const sizeStyles: Record<BackToTopSize, string> = {
  md: 'w-12 h-12',
  sm: 'w-9 h-9',
};

/**
 * BackToTop Component
 *
 * Pulsante fisso in basso a destra che appare quando l'utente
 * scorre la pagina oltre la soglia configurata.
 *
 * @example
 * ```tsx
 * import { BackToTop } from '@/design-system/atoms';
 *
 * <BackToTop />
 * <BackToTop variant="dark" shadow />
 * <BackToTop size="sm" scrollLimit={200} />
 * ```
 */
export const BackToTop = forwardRef<HTMLButtonElement, BackToTopProps>(
  (
    {
      variant = 'light',
      size = 'md',
      shadow = false,
      scrollLimit = 100,
      duration = 800,
      ariaLabel = 'Torna su',
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsVisible(window.scrollY > scrollLimit);
      };

      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollLimit]);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onClick?.(e);
      },
      [onClick]
    );

    const buttonClasses = [
      'fixed bottom-6 right-6 z-[var(--z-fixed)]',
      'rounded-full flex items-center justify-center',
      'transition-all duration-300',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary-500)]',
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none',
      variantStyles[variant],
      sizeStyles[size],
      shadow ? 'shadow-lg' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        className={buttonClasses}
        onClick={handleClick}
        data-duration={duration}
        {...props}
      >
        <Icon icon={ArrowUp} size={size === 'sm' ? 'sm' : 'md'} />
      </button>
    );
  }
);

BackToTop.displayName = 'BackToTop';

export default BackToTop;
