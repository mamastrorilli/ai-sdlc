import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArrowRight, Plus } from 'lucide-react';
import { Button } from './Button';
import { Icon } from '../Icon';

/**
 * Il componente Button rappresenta l'elemento interattivo principale
 * per azioni dell'utente, conforme alle linee guida UI Kit Italia.
 *
 * ## Varianti
 * - **Primary**: Azione principale, CTA
 * - **Secondary**: Azione secondaria, outline
 * - **Tertiary**: Azione terziaria, ghost
 * - **Danger**: Azione distruttiva
 * - **Link**: Stile link testuale
 *
 * ## Accessibilità
 * - Supporta navigazione da tastiera
 * - Stati focus visibili
 * - Attributo aria-busy per loading state
 */
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'link'],
      description: 'Variante visiva del bottone',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Dimensione del bottone',
    },
    isLoading: {
      control: 'boolean',
      description: 'Mostra stato di caricamento',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Bottone a larghezza piena',
    },
    disabled: {
      control: 'boolean',
      description: 'Stato disabilitato',
    },
    children: {
      control: 'text',
      description: 'Contenuto del bottone',
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ============================================
// VARIANTI
// ============================================

/**
 * Variante Primary - Azione principale
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Azione principale',
  },
};

/**
 * Variante Secondary - Azione secondaria con bordo
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Azione secondaria',
  },
};

/**
 * Variante Tertiary - Azione terziaria ghost
 */
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Azione terziaria',
  },
};

/**
 * Variante Danger - Azione distruttiva
 */
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Elimina',
  },
};

/**
 * Variante Link - Stile link testuale
 */
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link testuale',
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
    children: 'Small button',
  },
};

/**
 * Dimensione Medium (default)
 */
export const SizeMedium: Story = {
  args: {
    size: 'md',
    children: 'Medium button',
  },
};

/**
 * Dimensione Large
 */
export const SizeLarge: Story = {
  args: {
    size: 'lg',
    children: 'Large button',
  },
};

// ============================================
// STATI
// ============================================

/**
 * Stato Disabled
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabilitato',
  },
};

/**
 * Stato Loading
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Caricamento...',
  },
};

/**
 * Full Width
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full width button',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

// ============================================
// CON ICONE
// ============================================

/**
 * Con icona a sinistra
 */
export const WithIconLeft: Story = {
  args: {
    iconLeft: <Icon icon={Plus} size="md" />,
    children: 'Aggiungi',
  },
};

/**
 * Con icona a destra
 */
export const WithIconRight: Story = {
  args: {
    iconRight: <Icon icon={ArrowRight} size="md" />,
    children: 'Continua',
  },
};

/**
 * Con entrambe le icone
 */
export const WithBothIcons: Story = {
  args: {
    iconLeft: <Icon icon={Plus} size="md" />,
    iconRight: <Icon icon={ArrowRight} size="md" />,
    children: 'Azione',
  },
};

// ============================================
// SHOWCASE
// ============================================

/**
 * Showcase di tutte le varianti
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

/**
 * Showcase di tutte le dimensioni
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
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
        <h3 className="text-lg font-semibold mb-4">Varianti</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Dimensioni</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Stati</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button isLoading>Loading</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Con icone</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button iconLeft={<Icon icon={Plus} size="md" />}>Aggiungi</Button>
          <Button iconRight={<Icon icon={ArrowRight} size="md" />}>Continua</Button>
          <Button iconLeft={<Icon icon={Plus} size="md" />} iconRight={<Icon icon={ArrowRight} size="md" />}>
            Entrambe
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Secondary con icone</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="secondary" iconLeft={<Icon icon={Plus} size="md" />}>
            Aggiungi
          </Button>
          <Button variant="secondary" iconRight={<Icon icon={ArrowRight} size="md" />}>
            Continua
          </Button>
        </div>
      </div>
    </div>
  ),
};
