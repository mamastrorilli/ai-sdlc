/**
 * Footer Component
 * UI Kit Italia - Design System
 *
 * Footer responsive con logo, gruppi di link, social e copyright.
 */

'use client';

import { type ReactNode } from 'react';
import { Logo, type LogoProps } from '../../atoms/Logo';
import { Divider } from '../../atoms/Divider';
import { LinkGroup, type LinkGroupItem } from '../../molecules/LinkGroup';
import { SocialLinks, type SocialLinkItem } from '../../molecules/SocialLinks';

export interface FooterColumn {
  /** Titolo della colonna */
  title: string;
  /** Link della colonna */
  links: LinkGroupItem[];
}

export interface FooterProps {
  /** Configurazione logo (opzionale, usa default se non specificato) */
  logo?: LogoProps;
  /** Descrizione breve sotto il logo */
  description?: string;
  /** Colonne di link */
  columns?: FooterColumn[];
  /** Link social */
  socialLinks?: SocialLinkItem[];
  /** Testo copyright */
  copyright?: string;
  /** Contenuto aggiuntivo nel bottom */
  bottomContent?: ReactNode;
  /** Variante colore */
  variant?: 'light' | 'dark';
  /** Classe CSS aggiuntiva */
  className?: string;
}

/**
 * Footer Component
 *
 * Footer completo con tutte le sezioni tipiche.
 *
 * @example
 * ```tsx
 * import { Github, Linkedin } from 'lucide-react';
 *
 * <Footer
 *   description="Design System moderno con AI"
 *   columns={[
 *     {
 *       title: 'Risorse',
 *       links: [
 *         { label: 'Docs', href: '/docs' },
 *         { label: 'Storybook', href: '/storybook' },
 *       ],
 *     },
 *   ]}
 *   socialLinks={[
 *     { name: 'GitHub', href: 'https://github.com', icon: Github },
 *   ]}
 *   copyright="© 2024 AI SDLC"
 * />
 * ```
 */
export function Footer({
  logo,
  description,
  columns = [],
  socialLinks = [],
  copyright,
  bottomContent,
  variant = 'dark',
  className = '',
}: FooterProps) {
  const isDark = variant === 'dark';

  const bgColor = isDark
    ? 'bg-[var(--color-neutral-900)]'
    : 'bg-[var(--color-neutral-100)]';

  const textColor = isDark ? 'text-white' : 'text-[var(--color-neutral-600)]';

  return (
    <footer className={`${bgColor} ${className}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Main content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Logo & Description */}
            <div className="lg:col-span-4">
              <Logo
                variant="full"
                size="md"
                color={isDark ? 'light' : 'dark'}
                {...logo}
              />
              {description && (
                <p className={`mt-4 text-sm leading-relaxed ${textColor}`}>
                  {description}
                </p>
              )}
              {/* Social links (mobile: sotto descrizione) */}
              {socialLinks.length > 0 && (
                <div className="mt-6 lg:hidden">
                  <SocialLinks
                    links={socialLinks}
                    variant={isDark ? 'dark' : 'light'}
                    size="md"
                  />
                </div>
              )}
            </div>

            {/* Link columns */}
            {columns.length > 0 && (
              <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
                {columns.map((column, index) => (
                  <LinkGroup
                    key={index}
                    title={column.title}
                    links={column.links}
                    variant={isDark ? 'dark' : 'light'}
                  />
                ))}
              </div>
            )}

            {/* Social links (desktop: colonna destra) */}
            {socialLinks.length > 0 && (
              <div className="hidden lg:flex lg:col-span-2 lg:justify-end">
                <div>
                  <h3
                    className={`font-semibold text-sm uppercase tracking-wider mb-3 ${
                      isDark ? 'text-white' : 'text-[var(--color-neutral-900)]'
                    }`}
                  >
                    Social
                  </h3>
                  <SocialLinks
                    links={socialLinks}
                    variant={isDark ? 'dark' : 'light'}
                    size="md"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <Divider color={isDark ? 'dark' : 'medium'} spacing="none" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {copyright && (
            <p className={`text-sm ${textColor}`}>
              {copyright}
            </p>
          )}
          {bottomContent}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
