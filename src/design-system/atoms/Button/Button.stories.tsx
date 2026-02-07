import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

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

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-full h-full"
  >
    <path
      fillRule="evenodd"
      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
      clipRule="evenodd"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-full h-full"
  >
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);

/**
 * Con icona a sinistra
 */
export const WithIconLeft: Story = {
  args: {
    iconLeft: <PlusIcon />,
    children: 'Aggiungi',
  },
};

/**
 * Con icona a destra
 */
export const WithIconRight: Story = {
  args: {
    iconRight: <ArrowRightIcon />,
    children: 'Continua',
  },
};

/**
 * Con entrambe le icone
 */
export const WithBothIcons: Story = {
  args: {
    iconLeft: <PlusIcon />,
    iconRight: <ArrowRightIcon />,
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
          <Button iconLeft={<PlusIcon />}>Aggiungi</Button>
          <Button iconRight={<ArrowRightIcon />}>Continua</Button>
          <Button iconLeft={<PlusIcon />} iconRight={<ArrowRightIcon />}>
            Entrambe
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Secondary con icone</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="secondary" iconLeft={<PlusIcon />}>
            Aggiungi
          </Button>
          <Button variant="secondary" iconRight={<ArrowRightIcon />}>
            Continua
          </Button>
        </div>
      </div>
    </div>
  ),
};
