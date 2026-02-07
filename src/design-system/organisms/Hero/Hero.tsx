/**
 * Hero Component
 * UI Kit Italia - Design System
 *
 * Varianti:
 * - default: Testo centrato su sfondo colorato
 * - left: Testo allineato a sinistra
 * - withImage: Testo + immagine affiancati
 * - fullImage: Immagine a tutto schermo con overlay
 *
 * @see https://www.figma.com/design/INVyTbc0CHHBiY8KPlcTR0/UI-Kit-Italia--Community-
 */

import { type ReactNode } from 'react';
import Image from 'next/image';
import { Button, type ButtonProps } from '../../atoms/Button';

export type HeroVariant = 'default' | 'left' | 'withImage' | 'fullImage';
export type HeroSize = 'sm' | 'md' | 'lg';
export type HeroBackground = 'primary' | 'neutral' | 'dark' | 'light';

export interface HeroAction {
  /** Testo del bottone */
  label: string;
  /** URL o callback onClick */
  href?: string;
  onClick?: () => void;
  /** Variante del bottone */
  variant?: ButtonProps['variant'];
}

export interface HeroProps {
  /** Variante layout dell'hero */
  variant?: HeroVariant;
  /** Dimensione dell'hero */
  size?: HeroSize;
  /** Colore di sfondo */
  background?: HeroBackground;
  /** Kicker/eyebrow sopra il titolo */
  kicker?: string;
  /** Titolo principale */
  title: string;
  /** Sottotitolo/descrizione */
  subtitle?: string;
  /** Azioni CTA (max 2 bottoni) */
  actions?: HeroAction[];
  /** URL immagine per varianti con immagine */
  imageUrl?: string;
  /** Alt text per immagine */
  imageAlt?: string;
  /** Posizione immagine (solo per withImage) */
  imagePosition?: 'left' | 'right';
  /** Contenuto custom aggiuntivo */
  children?: ReactNode;
  /** Classe CSS aggiuntiva */
  className?: string;
}

/**
 * Stili per background
 */
const backgroundStyles: Record<HeroBackground, string> = {
  primary: 'bg-[var(--color-primary-500)] text-white',
  neutral: 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-900)]',
  dark: 'bg-[var(--color-neutral-900)] text-white',
  light: 'bg-white text-[var(--color-neutral-900)]',
};

/**
 * Stili per dimensione (padding verticale)
 */
const sizeStyles: Record<HeroSize, string> = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-24 md:py-32',
};

/**
 * Stili per allineamento testo
 */
const alignmentStyles: Record<'center' | 'left', string> = {
  center: 'text-center items-center',
  left: 'text-left items-start',
};

/**
 * Determina variante bottone in base al background
 */
function getButtonVariant(
  background: HeroBackground,
  isPrimary: boolean
): ButtonProps['variant'] {
  if (background === 'primary' || background === 'dark') {
    return isPrimary ? 'secondary' : 'tertiary';
  }
  return isPrimary ? 'primary' : 'secondary';
}

/**
 * Hero Component
 *
 * Sezione hero per landing page e pagine interne.
 *
 * @example
 * ```tsx
 * <Hero
 *   variant="default"
 *   size="lg"
 *   background="primary"
 *   kicker="Benvenuto"
 *   title="Titolo principale dell'hero"
 *   subtitle="Descrizione che spiega il contenuto della pagina"
 *   actions={[
 *     { label: 'Azione principale', href: '/action' },
 *     { label: 'Scopri di più', href: '/info', variant: 'secondary' }
 *   ]}
 * />
 * ```
 */
export function Hero({
  variant = 'default',
  size = 'md',
  background = 'primary',
  kicker,
  title,
  subtitle,
  actions,
  imageUrl,
  imageAlt = '',
  imagePosition = 'right',
  children,
  className = '',
}: HeroProps) {
  const alignment = variant === 'left' || variant === 'withImage' ? 'left' : 'center';

  // Contenuto testuale
  const textContent = (
    <div
      className={`flex flex-col gap-4 md:gap-6 ${alignmentStyles[alignment]} ${
        variant === 'withImage' ? 'flex-1' : 'max-w-4xl mx-auto'
      }`}
    >
      {/* Kicker */}
      {kicker && (
        <span
          className={`text-sm md:text-base font-semibold uppercase tracking-wider ${
            background === 'primary' || background === 'dark'
              ? 'text-white/80'
              : 'text-[var(--color-primary-500)]'
          }`}
        >
          {kicker}
        </span>
      )}

      {/* Title */}
      <h1
        className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${
          size === 'lg' ? 'lg:text-6xl' : ''
        }`}
      >
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`text-lg md:text-xl lg:text-2xl leading-relaxed ${
            background === 'primary' || background === 'dark'
              ? 'text-white/90'
              : 'text-[var(--color-neutral-600)]'
          } ${variant === 'withImage' ? '' : 'max-w-2xl'} ${
            alignment === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}

      {/* Actions */}
      {actions && actions.length > 0 && (
        <div
          className={`flex flex-wrap gap-4 mt-2 ${
            alignment === 'center' ? 'justify-center' : 'justify-start'
          }`}
        >
          {actions.slice(0, 2).map((action, index) => (
            <Button
              key={index}
              variant={
                action.variant || getButtonVariant(background, index === 0)
              }
              size={size === 'sm' ? 'md' : 'lg'}
              onClick={action.onClick}
              {...(action.href && {
                as: 'a',
                href: action.href,
              })}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}

      {/* Custom children */}
      {children}
    </div>
  );

  // Variante con immagine affiancata
  if (variant === 'withImage') {
    return (
      <section
        className={`${backgroundStyles[background]} ${sizeStyles[size]} ${className}`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div
            className={`flex flex-col ${
              imagePosition === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'
            } gap-8 md:gap-12 lg:gap-16 items-center`}
          >
            {textContent}

            {/* Image */}
            {imageUrl && (
              <div className="flex-1 w-full relative aspect-[4/3] min-h-[300px]">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="rounded-lg shadow-lg object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Variante full image background
  if (variant === 'fullImage') {
    return (
      <section
        className={`relative ${sizeStyles[size]} ${className}`}
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[var(--color-neutral-900)]/70" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-white">
          {textContent}
        </div>
      </section>
    );
  }

  // Variante default e left
  return (
    <section
      className={`${backgroundStyles[background]} ${sizeStyles[size]} ${className}`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {textContent}
      </div>
    </section>
  );
}

export default Hero;
