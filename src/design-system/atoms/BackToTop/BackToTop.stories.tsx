import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { BackToTop } from './BackToTop';

/**
 * Il componente BackToTop mostra un pulsante fisso in basso a destra
 * che permette all'utente di tornare in cima alla pagina.
 *
 * ## Varianti
 * - **Light**: Sfondo primary blu, icona bianca (default)
 * - **Dark**: Sfondo bianco, icona scura
 *
 * ## Accessibilità
 * - Supporta navigazione da tastiera
 * - Focus ring visibile
 * - aria-label descrittivo
 */
const meta: Meta<typeof BackToTop> = {
  title: 'Atoms/BackToTop',
  component: BackToTop,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Variante colore',
    },
    size: {
      control: 'select',
      options: ['md', 'sm'],
      description: 'Dimensione del pulsante',
    },
    shadow: {
      control: 'boolean',
      description: 'Mostra ombra',
    },
    scrollLimit: {
      control: 'number',
      description: 'Soglia scroll in px',
    },
    ariaLabel: {
      control: 'text',
      description: 'Label per accessibilità',
    },
  },
  args: {
    variant: 'light',
    size: 'md',
    shadow: false,
    scrollLimit: 0,
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '200px', padding: '2rem', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BackToTop>;

// ============================================
// VARIANTI
// ============================================

/**
 * Variante Light (default) - Sfondo primary blu
 * Include test di accessibilità da tastiera
 */
export const Default: Story = {
  args: {
    variant: 'light',
    scrollLimit: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Torna su' });

    // Test 1: Il pulsante è focusabile da tastiera
    await userEvent.tab();
    expect(button).toHaveFocus();

    // Test 2: Verifica che il focus ring sia visibile
    const styles = window.getComputedStyle(button);
    const hasVisibleFocusIndicator =
      styles.outline !== 'none' ||
      styles.outlineWidth !== '0px' ||
      styles.boxShadow !== 'none';
    expect(hasVisibleFocusIndicator).toBe(true);

    // Test 3: Il pulsante risponde a Enter
    let clicked = false;
    button.addEventListener('click', () => (clicked = true), { once: true });
    await userEvent.keyboard('{Enter}');
    expect(clicked).toBe(true);
  },
};

/**
 * Variante Dark - Sfondo bianco, icona scura
 */
export const Dark: Story = {
  args: {
    variant: 'dark',
    scrollLimit: 0,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '200px',
          padding: '2rem',
          position: 'relative',
          backgroundColor: 'var(--color-primary-500)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Dimensione Small
 */
export const Small: Story = {
  args: {
    size: 'sm',
    scrollLimit: 0,
  },
};

/**
 * Con ombra
 */
export const WithShadow: Story = {
  args: {
    shadow: true,
    scrollLimit: 0,
  },
};

// ============================================
// SHOWCASE
// ============================================

/**
 * Showcase di tutte le varianti
 */
export const Showcase: Story = {
  render: () => (
    <div className="flex flex-wrap gap-16 items-end p-8">
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-[var(--color-neutral-500)]">Light MD</span>
        <div className="relative w-16 h-16">
          <BackToTop variant="light" size="md" scrollLimit={0} className="!static" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-[var(--color-neutral-500)]">Light SM</span>
        <div className="relative w-16 h-16">
          <BackToTop variant="light" size="sm" scrollLimit={0} className="!static" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-[var(--color-neutral-500)]">Dark MD</span>
        <div className="relative w-16 h-16 bg-[var(--color-primary-500)] rounded-lg flex items-center justify-center">
          <BackToTop variant="dark" size="md" scrollLimit={0} className="!static" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-[var(--color-neutral-500)]">Dark SM</span>
        <div className="relative w-16 h-16 bg-[var(--color-primary-500)] rounded-lg flex items-center justify-center">
          <BackToTop variant="dark" size="sm" scrollLimit={0} className="!static" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-[var(--color-neutral-500)]">Shadow</span>
        <div className="relative w-16 h-16">
          <BackToTop variant="light" shadow scrollLimit={0} className="!static" />
        </div>
      </div>
    </div>
  ),
};
