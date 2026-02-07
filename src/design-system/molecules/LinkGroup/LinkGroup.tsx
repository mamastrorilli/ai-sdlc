/**
 * LinkGroup Component
 * UI Kit Italia - Design System
 *
 * Gruppo di link con titolo opzionale, usato tipicamente nei footer.
 */

import { type ReactNode } from 'react';
import { Link } from '../../atoms/Link';

export interface LinkGroupItem {
  /** Testo del link */
  label: string;
  /** URL del link */
  href: string;
  /** Link esterno */
  external?: boolean;
  /** Icona opzionale */
  icon?: ReactNode;
}

export interface LinkGroupProps {
  /** Titolo del gruppo */
  title?: string;
  /** Lista dei link */
  links: LinkGroupItem[];
  /** Orientamento */
  orientation?: 'vertical' | 'horizontal';
  /** Variante colore per sfondo scuro */
  variant?: 'light' | 'dark';
  /** Classe CSS aggiuntiva */
  className?: string;
}

/**
 * LinkGroup Component
 *
 * Gruppo di link navigazionali.
 *
 * @example
 * ```tsx
 * <LinkGroup
 *   title="Risorse"
 *   links={[
 *     { label: 'Documentazione', href: '/docs' },
 *     { label: 'GitHub', href: 'https://github.com', external: true },
 *   ]}
 * />
 * ```
 */
export function LinkGroup({
  title,
  links,
  orientation = 'vertical',
  variant = 'light',
  className = '',
}: LinkGroupProps) {
  const isVertical = orientation === 'vertical';
  const isDark = variant === 'dark';

  return (
    <nav className={`flex flex-col gap-3 ${className}`} aria-label={title}>
      {title && (
        <h3
          className={`font-semibold text-sm uppercase tracking-wider ${
            isDark ? 'text-white' : 'text-[var(--color-neutral-900)]'
          }`}
        >
          {title}
        </h3>
      )}

      <ul
        className={`flex gap-2 ${
          isVertical ? 'flex-col' : 'flex-row flex-wrap'
        }`}
      >
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              variant="standalone"
              size="sm"
              background={isDark ? 'dark' : 'light'}
              icon={link.icon}
              {...(link.external && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default LinkGroup;
