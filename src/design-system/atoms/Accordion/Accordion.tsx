/**
 * Accordion Component
 * UI Kit Italia - Design System
 *
 * Varianti:
 * - basic: Header con testo nero e chevron a destra
 * - leftIcon: Icona +/- a sinistra, testo primary
 * - activeBackground: Header con sfondo primary quando espanso
 *
 * @see https://www.figma.com/design/INVyTbc0CHHBiY8KPlcTR0/UI-Kit-Italia--Community-
 */

'use client';

import {
  forwardRef,
  useState,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
  useId,
} from 'react';
import { ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';
import { Icon } from '../Icon';

export type AccordionVariant = 'basic' | 'leftIcon' | 'activeBackground';

export interface AccordionItemData {
  /** Identificativo univoco dell'item */
  id: string;
  /** Titolo dell'header */
  title: string;
  /** Contenuto del pannello */
  content: ReactNode;
  /** Item disabilitato */
  disabled?: boolean;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /** Array di items dell'accordion */
  items: AccordionItemData[];
  /** Variante visiva */
  variant?: AccordionVariant;
  /** IDs degli items inizialmente espansi */
  defaultExpandedIds?: string[];
  /** Permette apertura multipla (default: false = solo uno aperto) */
  allowMultiple?: boolean;
}

/**
 * Stili header per variante
 */
const getHeaderStyles = (
  variant: AccordionVariant,
  isExpanded: boolean,
  disabled: boolean
): string => {
  const base = [
    'w-full flex items-center justify-between',
    'px-6 py-4',
    'text-left font-semibold',
    'transition-colors duration-200',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-500)]',
    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
  ];

  const variantStyles: Record<AccordionVariant, string[]> = {
    basic: [
      'text-[var(--color-neutral-900)]',
      !disabled && 'hover:bg-[var(--color-neutral-50)]',
    ].filter(Boolean) as string[],

    leftIcon: [
      'text-[var(--color-primary-500)]',
      'flex-row-reverse justify-end gap-3',
      !disabled && 'hover:bg-[var(--color-primary-50)]',
    ].filter(Boolean) as string[],

    activeBackground: isExpanded
      ? [
          'bg-[var(--color-primary-500)] text-white',
          !disabled && 'hover:bg-[var(--color-primary-600)]',
        ].filter(Boolean) as string[]
      : [
          'text-[var(--color-primary-500)]',
          !disabled && 'hover:bg-[var(--color-primary-50)]',
        ].filter(Boolean) as string[],
  };

  return [...base, ...variantStyles[variant]].join(' ');
};

/**
 * Stili contenuto
 */
const contentStyles = [
  'px-6 pt-2 pb-10',
  'text-[var(--color-neutral-700)]',
  'animate-accordion-down',
].join(' ');

/**
 * Stili container item
 */
const itemContainerStyles = [
  'border border-[var(--color-neutral-200)]',
  'first:rounded-t last:rounded-b',
  '-mt-px first:mt-0',
].join(' ');

/**
 * Accordion Component
 *
 * Componente accordion conforme alle linee guida UI Kit Italia.
 * Supporta tre varianti visive e modalità singola o multipla.
 *
 * @example
 * ```tsx
 * <Accordion
 *   variant="basic"
 *   items={[
 *     { id: '1', title: 'Sezione 1', content: <p>Contenuto 1</p> },
 *     { id: '2', title: 'Sezione 2', content: <p>Contenuto 2</p> },
 *   ]}
 * />
 * ```
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      items,
      variant = 'basic',
      defaultExpandedIds = [],
      allowMultiple = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(
      new Set(defaultExpandedIds)
    );
    const baseId = useId();

    const toggleItem = useCallback(
      (itemId: string) => {
        setExpandedIds((prev) => {
          const next = new Set(prev);

          if (next.has(itemId)) {
            next.delete(itemId);
          } else {
            if (!allowMultiple) {
              next.clear();
            }
            next.add(itemId);
          }

          return next;
        });
      },
      [allowMultiple]
    );

    const renderIcon = (isExpanded: boolean) => {
      if (variant === 'leftIcon') {
        return (
          <Icon
            icon={isExpanded ? Minus : Plus}
            size="sm"
            className="flex-shrink-0"
          />
        );
      }

      return (
        <Icon
          icon={isExpanded ? ChevronUp : ChevronDown}
          size="md"
          className={`flex-shrink-0 transition-transform duration-200 ${
            variant === 'activeBackground' && isExpanded ? 'text-white' : ''
          }`}
        />
      );
    };

    return (
      <div ref={ref} className={`w-full ${className}`} {...props}>
        {items.map((item, index) => {
          const isExpanded = expandedIds.has(item.id);
          const headerId = `${baseId}-header-${index}`;
          const panelId = `${baseId}-panel-${index}`;
          const disabled = item.disabled ?? false;

          return (
            <div key={item.id} className={itemContainerStyles}>
              <h3>
                <button
                  id={headerId}
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  aria-disabled={disabled}
                  disabled={disabled}
                  onClick={() => !disabled && toggleItem(item.id)}
                  className={getHeaderStyles(variant, isExpanded, disabled)}
                >
                  {variant === 'leftIcon' ? (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {renderIcon(isExpanded)}
                    </>
                  ) : (
                    <>
                      <span>{item.title}</span>
                      {renderIcon(isExpanded)}
                    </>
                  )}
                </button>
              </h3>

              {isExpanded && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className={contentStyles}
                >
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';

export default Accordion;
