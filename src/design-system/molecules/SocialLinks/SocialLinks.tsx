/**
 * SocialLinks Component
 * UI Kit Italia - Design System
 *
 * Icone social con link, usato tipicamente nei footer.
 */

import { type LucideIcon } from 'lucide-react';
import { Icon } from '../../atoms/Icon';

export interface SocialLinkItem {
  /** Nome del social (per aria-label) */
  name: string;
  /** URL del profilo */
  href: string;
  /** Icona Lucide */
  icon: LucideIcon;
}

export interface SocialLinksProps {
  /** Lista dei social link */
  links: SocialLinkItem[];
  /** Dimensione delle icone */
  size?: 'sm' | 'md' | 'lg';
  /** Variante colore per sfondo scuro */
  variant?: 'light' | 'dark';
  /** Classe CSS aggiuntiva */
  className?: string;
}

const sizeStyles = {
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-2.5',
};

/**
 * SocialLinks Component
 *
 * Lista di icone social cliccabili.
 *
 * @example
 * ```tsx
 * import { Github, Linkedin, Twitter } from 'lucide-react';
 *
 * <SocialLinks
 *   links={[
 *     { name: 'GitHub', href: 'https://github.com', icon: Github },
 *     { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
 *   ]}
 * />
 * ```
 */
export function SocialLinks({
  links,
  size = 'md',
  variant = 'light',
  className = '',
}: SocialLinksProps) {
  const isDark = variant === 'dark';

  return (
    <nav className={`flex items-center gap-1 ${className}`} aria-label="Social media">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          className={`
            ${sizeStyles[size]}
            rounded-full
            transition-colors duration-200
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-500)]
            ${
              isDark
                ? 'text-neutral-400 hover:text-white hover:bg-white/10'
                : 'text-[var(--color-neutral-600)] hover:text-[var(--color-primary-500)] hover:bg-[var(--color-primary-50)]'
            }
          `.trim().replace(/\s+/g, ' ')}
        >
          <Icon icon={link.icon} size={size} />
        </a>
      ))}
    </nav>
  );
}

export default SocialLinks;
