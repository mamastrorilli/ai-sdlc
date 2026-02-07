import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Link } from './Link';

/**
 * Il componente Link rappresenta un elemento di navigazione
 * conforme alle linee guida UI Kit Italia.
 *
 * ## Varianti
 * - **Standalone**: Solo testo
 * - **WithArrow**: Con icona freccia a destra (→)
 * - **WithDownload**: Con icona download a sinistra (↓)
 *
 * ## Accessibilità
 * - Supporta navigazione da tastiera
 * - Stati focus visibili
 * - Supporta aria-disabled per stato disabilitato
 */
const meta: Meta<typeof Link> = {
  title: 'Atoms/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standalone', 'withArrow', 'withDownload'],
      description: 'Variante del link',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Dimensione del link',
    },
    background: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Sfondo su cui viene mostrato il link',
    },
    children: {
      control: 'text',
      description: 'Contenuto del link',
    },
  },
  args: {
    children: 'Testo del link',
    variant: 'standalone',
    size: 'md',
    background: 'light',
    href: '#',
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

// ============================================
// VARIANTI
// ============================================

/**
 * Link standalone - Solo testo
 */
export const Standalone: Story = {
  args: {
    variant: 'standalone',
    children: 'Testo del link',
  },
};

/**
 * Link con freccia - Navigazione
 */
export const WithArrow: Story = {
  args: {
    variant: 'withArrow',
    children: 'Testo del link',
  },
};

/**
 * Link download - Scarica file
 */
export const WithDownload: Story = {
  args: {
    variant: 'withDownload',
    children: 'Testo del link',
  },
};

// ============================================
// DIMENSIONI
// ============================================

/**
 * Dimensione Small
 */
export const SizeSmall: Story = {
  args: {
    size: 'sm',
    variant: 'withArrow',
    children: 'Small link',
  },
};

/**
 * Dimensione Medium (default)
 */
export const SizeMedium: Story = {
  args: {
    size: 'md',
    variant: 'withArrow',
    children: 'Medium link',
  },
};

/**
 * Dimensione Large
 */
export const SizeLarge: Story = {
  args: {
    size: 'lg',
    variant: 'withArrow',
    children: 'Large link',
  },
};

// ============================================
// SFONDI
// ============================================

/**
 * Su sfondo chiaro (default)
 */
export const OnLightBackground: Story = {
  args: {
    background: 'light',
    variant: 'withArrow',
    children: 'Testo del link',
  },
};

/**
 * Su sfondo scuro
 */
export const OnDarkBackground: Story = {
  args: {
    background: 'dark',
    variant: 'withArrow',
    children: 'Testo del link',
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--color-primary-500)] p-4 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

// ============================================
// STATI
// ============================================

/**
 * Stato Disabled su sfondo chiaro
 */
export const DisabledLight: Story = {
  args: {
    'aria-disabled': true,
    variant: 'withArrow',
    children: 'Testo del link',
  },
};

/**
 * Stato Disabled su sfondo scuro
 */
export const DisabledDark: Story = {
  args: {
    'aria-disabled': true,
    background: 'dark',
    variant: 'withArrow',
    children: 'Testo del link',
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--color-primary-500)] p-4 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

// ============================================
// SHOWCASE
// ============================================

/**
 * Showcase di tutte le varianti su sfondo chiaro
 */
export const AllVariantsLight: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Link href="#" variant="standalone">Testo del link</Link>
      <Link href="#" variant="withArrow">Testo del link</Link>
      <Link href="#" variant="withDownload">Testo del link</Link>
    </div>
  ),
};

/**
 * Showcase di tutte le varianti su sfondo scuro
 */
export const AllVariantsDark: Story = {
  render: () => (
    <div className="bg-[var(--color-primary-500)] p-4 rounded-lg flex flex-col gap-4">
      <Link href="#" variant="standalone" background="dark">Testo del link</Link>
      <Link href="#" variant="withArrow" background="dark">Testo del link</Link>
      <Link href="#" variant="withDownload" background="dark">Testo del link</Link>
    </div>
  ),
};

/**
 * Showcase di tutte le dimensioni
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Link href="#" variant="withArrow" size="sm">Small link</Link>
      <Link href="#" variant="withArrow" size="md">Medium link</Link>
      <Link href="#" variant="withArrow" size="lg">Large link</Link>
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
        <h3 className="text-lg font-semibold mb-4">Varianti - Sfondo chiaro</h3>
        <div className="flex flex-col gap-4">
          <Link href="#" variant="standalone">Standalone</Link>
          <Link href="#" variant="withArrow">Con freccia</Link>
          <Link href="#" variant="withDownload">Con download</Link>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Varianti - Sfondo scuro</h3>
        <div className="bg-[var(--color-primary-500)] p-4 rounded-lg flex flex-col gap-4">
          <Link href="#" variant="standalone" background="dark">Standalone</Link>
          <Link href="#" variant="withArrow" background="dark">Con freccia</Link>
          <Link href="#" variant="withDownload" background="dark">Con download</Link>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Dimensioni</h3>
        <div className="flex flex-col gap-4">
          <Link href="#" variant="withArrow" size="sm">Small</Link>
          <Link href="#" variant="withArrow" size="md">Medium</Link>
          <Link href="#" variant="withArrow" size="lg">Large</Link>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Stati - Sfondo chiaro</h3>
        <div className="flex flex-col gap-4">
          <Link href="#" variant="withArrow">Default</Link>
          <Link href="#" variant="withArrow" aria-disabled>Disabled</Link>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Stati - Sfondo scuro</h3>
        <div className="bg-[var(--color-primary-500)] p-4 rounded-lg flex flex-col gap-4">
          <Link href="#" variant="withArrow" background="dark">Default</Link>
          <Link href="#" variant="withArrow" background="dark" aria-disabled>Disabled</Link>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Confronto Light vs Dark</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-2">Light</p>
            <Link href="#" variant="withArrow">Testo del link</Link>
          </div>
          <div className="bg-[var(--color-primary-500)] p-4 rounded-lg">
            <p className="text-sm text-white/70 mb-2">Dark</p>
            <Link href="#" variant="withArrow" background="dark">Testo del link</Link>
          </div>
        </div>
      </div>
    </div>
  ),
};
