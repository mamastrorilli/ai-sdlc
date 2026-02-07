/**
 * Icon Component
 * UI Kit Italia - Design System
 *
 * Wrapper per icone Lucide con sizing e accessibilità standardizzati.
 * Mantiene tree-shaking: importi solo le icone che usi.
 *
 * @see https://lucide.dev/icons
 */

import { forwardRef, type ComponentProps } from 'react';
import type { LucideIcon } from 'lucide-react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps extends Omit<ComponentProps<'svg'>, 'ref'> {
  /** Componente icona Lucide */
  icon: LucideIcon;
  /** Dimensione dell'icona */
  size?: IconSize;
  /** Label per accessibilità (se omesso, l'icona è decorativa) */
  label?: string;
}

/**
 * Mapping dimensioni a pixel/classi Tailwind
 */
const sizeMap: Record<IconSize, { size: number; className: string }> = {
  xs: { size: 12, className: 'w-3 h-3' },
  sm: { size: 16, className: 'w-4 h-4' },
  md: { size: 20, className: 'w-5 h-5' },
  lg: { size: 24, className: 'w-6 h-6' },
  xl: { size: 32, className: 'w-8 h-8' },
};

/**
 * Icon Component
 *
 * Wrapper standardizzato per icone Lucide. Applica sizing coerente
 * e attributi di accessibilità automatici.
 *
 * @example
 * ```tsx
 * import { Icon } from '@/design-system/atoms';
 * import { ArrowRight, Download, Search } from 'lucide-react';
 *
 * // Icona decorativa (default)
 * <Icon icon={ArrowRight} size="md" />
 *
 * // Icona con significato semantico
 * <Icon icon={Search} size="lg" label="Cerca" />
 *
 * // Con colore personalizzato
 * <Icon icon={Download} className="text-primary-500" />
 * ```
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: LucideIcon, size = 'md', label, className = '', ...props }, ref) => {
    const { size: pixelSize, className: sizeClass } = sizeMap[size];

    const isDecorative = !label;

    return (
      <LucideIcon
        ref={ref}
        size={pixelSize}
        className={`${sizeClass} ${className}`.trim()}
        aria-hidden={isDecorative}
        aria-label={label}
        role={isDecorative ? undefined : 'img'}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';

export default Icon;
