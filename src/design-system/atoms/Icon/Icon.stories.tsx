import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  ArrowRight,
  Download,
  Search,
  Plus,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  Menu,
  User,
  Settings,
  Home,
  Mail,
  Phone,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  FileText,
  Image,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { Icon } from './Icon';

/**
 * Il componente Icon è un wrapper standardizzato per le icone Lucide.
 *
 * ## Caratteristiche
 * - **Tree-shakeable**: importi solo le icone che usi
 * - **Type-safe**: autocompletamento per tutte le icone Lucide
 * - **Accessibile**: attributi ARIA automatici
 * - **Consistente**: sizing allineato ai design tokens
 *
 * ## Installazione icone
 * ```bash
 * yarn add lucide-react
 * ```
 *
 * ## Catalogo icone
 * Tutte le icone disponibili su [lucide.dev/icons](https://lucide.dev/icons)
 */
const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Dimensione dell\'icona',
    },
    label: {
      control: 'text',
      description: 'Label accessibilità (se omesso, icona decorativa)',
    },
    className: {
      control: 'text',
      description: 'Classi CSS aggiuntive (es. colore)',
    },
  },
  args: {
    icon: ArrowRight,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// ============================================
// DIMENSIONI
// ============================================

/**
 * Dimensione XS (12px)
 */
export const SizeXS: Story = {
  args: {
    icon: ArrowRight,
    size: 'xs',
  },
};

/**
 * Dimensione SM (16px)
 */
export const SizeSM: Story = {
  args: {
    icon: ArrowRight,
    size: 'sm',
  },
};

/**
 * Dimensione MD (20px) - Default
 */
export const SizeMD: Story = {
  args: {
    icon: ArrowRight,
    size: 'md',
  },
};

/**
 * Dimensione LG (24px)
 */
export const SizeLG: Story = {
  args: {
    icon: ArrowRight,
    size: 'lg',
  },
};

/**
 * Dimensione XL (32px)
 */
export const SizeXL: Story = {
  args: {
    icon: ArrowRight,
    size: 'xl',
  },
};

// ============================================
// COLORI
// ============================================

/**
 * Colore Primary
 */
export const ColorPrimary: Story = {
  args: {
    icon: Check,
    size: 'lg',
    className: 'text-[var(--color-primary-500)]',
  },
};

/**
 * Colore Success
 */
export const ColorSuccess: Story = {
  args: {
    icon: CheckCircle,
    size: 'lg',
    className: 'text-[var(--color-success-500)]',
  },
};

/**
 * Colore Error
 */
export const ColorError: Story = {
  args: {
    icon: AlertCircle,
    size: 'lg',
    className: 'text-[var(--color-error-500)]',
  },
};

/**
 * Colore Warning
 */
export const ColorWarning: Story = {
  args: {
    icon: AlertTriangle,
    size: 'lg',
    className: 'text-[var(--color-warning-500)]',
  },
};

// ============================================
// ACCESSIBILITÀ
// ============================================

/**
 * Icona decorativa (default)
 *
 * Senza `label`, l'icona è nascosta agli screen reader.
 */
export const Decorative: Story = {
  args: {
    icon: ArrowRight,
    size: 'md',
  },
};

/**
 * Icona con significato semantico
 *
 * Con `label`, l'icona è annunciata dagli screen reader.
 */
export const WithLabel: Story = {
  args: {
    icon: Search,
    size: 'md',
    label: 'Cerca',
  },
};

// ============================================
// SHOWCASE
// ============================================

/**
 * Tutte le dimensioni
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <Icon icon={ArrowRight} size="xs" />
        <span className="text-xs text-gray-500">xs</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={ArrowRight} size="sm" />
        <span className="text-xs text-gray-500">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={ArrowRight} size="md" />
        <span className="text-xs text-gray-500">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={ArrowRight} size="lg" />
        <span className="text-xs text-gray-500">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={ArrowRight} size="xl" />
        <span className="text-xs text-gray-500">xl</span>
      </div>
    </div>
  ),
};

/**
 * Icone comuni - Navigazione
 */
export const NavigationIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Icon icon={Home} size="lg" />
      <Icon icon={Menu} size="lg" />
      <Icon icon={Search} size="lg" />
      <Icon icon={ArrowRight} size="lg" />
      <Icon icon={ChevronRight} size="lg" />
      <Icon icon={ChevronDown} size="lg" />
      <Icon icon={ExternalLink} size="lg" />
    </div>
  ),
};

/**
 * Icone comuni - Azioni
 */
export const ActionIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Icon icon={Plus} size="lg" />
      <Icon icon={Check} size="lg" />
      <Icon icon={X} size="lg" />
      <Icon icon={Download} size="lg" />
      <Icon icon={Settings} size="lg" />
      <Icon icon={User} size="lg" />
    </div>
  ),
};

/**
 * Icone comuni - Contatti
 */
export const ContactIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Icon icon={Mail} size="lg" />
      <Icon icon={Phone} size="lg" />
      <Icon icon={MapPin} size="lg" />
      <Icon icon={Calendar} size="lg" />
      <Icon icon={Clock} size="lg" />
    </div>
  ),
};

/**
 * Icone comuni - Feedback
 */
export const FeedbackIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Icon icon={CheckCircle} size="lg" className="text-[var(--color-success-500)]" />
      <Icon icon={AlertCircle} size="lg" className="text-[var(--color-error-500)]" />
      <Icon icon={AlertTriangle} size="lg" className="text-[var(--color-warning-500)]" />
      <Icon icon={Info} size="lg" className="text-[var(--color-info-500)]" />
    </div>
  ),
};

/**
 * Icone comuni - Contenuti
 */
export const ContentIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Icon icon={FileText} size="lg" />
      <Icon icon={Image} size="lg" />
      <Icon icon={Download} size="lg" />
      <Icon icon={ExternalLink} size="lg" />
    </div>
  ),
};

/**
 * Showcase completa
 */
export const Showcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Dimensioni</h3>
        <div className="flex items-end gap-4">
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Search} size="xs" />
            <span className="text-xs text-gray-500">xs (12px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Search} size="sm" />
            <span className="text-xs text-gray-500">sm (16px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Search} size="md" />
            <span className="text-xs text-gray-500">md (20px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Search} size="lg" />
            <span className="text-xs text-gray-500">lg (24px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Search} size="xl" />
            <span className="text-xs text-gray-500">xl (32px)</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Colori semantici</h3>
        <div className="flex gap-4">
          <Icon icon={CheckCircle} size="xl" className="text-[var(--color-success-500)]" />
          <Icon icon={AlertCircle} size="xl" className="text-[var(--color-error-500)]" />
          <Icon icon={AlertTriangle} size="xl" className="text-[var(--color-warning-500)]" />
          <Icon icon={Info} size="xl" className="text-[var(--color-info-500)]" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Navigazione</h3>
        <div className="flex gap-4">
          <Icon icon={Home} size="lg" />
          <Icon icon={Menu} size="lg" />
          <Icon icon={Search} size="lg" />
          <Icon icon={ArrowRight} size="lg" />
          <Icon icon={ChevronRight} size="lg" />
          <Icon icon={ExternalLink} size="lg" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Azioni</h3>
        <div className="flex gap-4">
          <Icon icon={Plus} size="lg" />
          <Icon icon={Check} size="lg" />
          <Icon icon={X} size="lg" />
          <Icon icon={Download} size="lg" />
          <Icon icon={Settings} size="lg" />
        </div>
      </div>
    </div>
  ),
};
