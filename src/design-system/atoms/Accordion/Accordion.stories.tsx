import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Accordion, type AccordionItemData } from './Accordion';

/**
 * Il componente Accordion permette di mostrare/nascondere contenuti
 * in sezioni espandibili, conforme alle linee guida UI Kit Italia.
 *
 * ## Varianti
 * - **Basic**: Header con testo neutro e chevron a destra
 * - **LeftIcon**: Icona +/- a sinistra con testo primary
 * - **ActiveBackground**: Header con sfondo primary quando espanso
 *
 * ## Accessibilità
 * - Supporta navigazione da tastiera (Enter/Space)
 * - Attributi ARIA per stato espanso/collassato
 * - Regioni labelizzate correttamente
 */
const meta: Meta<typeof Accordion> = {
  title: 'Atoms/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['basic', 'leftIcon', 'activeBackground'],
      description: 'Variante visiva dell\'accordion',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Permette apertura multipla degli items',
    },
  },
  args: {
    variant: 'basic',
    allowMultiple: false,
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

/**
 * Dati di esempio per le stories
 */
const sampleItems: AccordionItemData[] = [
  {
    id: '1',
    title: 'Accordion Item',
    content: (
      <p>
        Vestibulum hendrerit ultrices nibh, sed pharetra lacus ultrices eget.
        Morbi et ipsum et sapien dapibus facilisis. Integer eget semper nibh.
        Proin enim nulla, egestas ac rutrum eget, ullamcorper nec turpis.
      </p>
    ),
  },
  {
    id: '2',
    title: 'Accordion Item',
    content: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    ),
  },
  {
    id: '3',
    title: 'Accordion Item',
    content: (
      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat.
      </p>
    ),
  },
];

const disabledItems: AccordionItemData[] = [
  { ...sampleItems[0], id: '1' },
  { ...sampleItems[1], id: '2', disabled: true },
  { ...sampleItems[2], id: '3' },
];

// ============================================
// VARIANTI
// ============================================

/**
 * Variante Basic - Header con testo neutro e chevron a destra
 */
export const Basic: Story = {
  args: {
    variant: 'basic',
    items: sampleItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Trova il primo header
    const firstHeader = canvas.getAllByRole('button')[0];

    // Verifica stato iniziale (chiuso)
    expect(firstHeader).toHaveAttribute('aria-expanded', 'false');

    // Click per espandere
    await userEvent.click(firstHeader);

    // Verifica che sia espanso
    expect(firstHeader).toHaveAttribute('aria-expanded', 'true');

    // Click per chiudere
    await userEvent.click(firstHeader);

    // Verifica che sia chiuso
    expect(firstHeader).toHaveAttribute('aria-expanded', 'false');
  },
};

/**
 * Variante LeftIcon - Icona +/- a sinistra con testo primary
 */
export const LeftIcon: Story = {
  args: {
    variant: 'leftIcon',
    items: sampleItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const firstHeader = canvas.getAllByRole('button')[0];

    // Click per espandere
    await userEvent.click(firstHeader);
    expect(firstHeader).toHaveAttribute('aria-expanded', 'true');
  },
};

/**
 * Variante ActiveBackground - Header con sfondo primary quando espanso
 */
export const ActiveBackground: Story = {
  args: {
    variant: 'activeBackground',
    items: sampleItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const firstHeader = canvas.getAllByRole('button')[0];

    // Click per espandere
    await userEvent.click(firstHeader);
    expect(firstHeader).toHaveAttribute('aria-expanded', 'true');
  },
};

// ============================================
// COMPORTAMENTI
// ============================================

/**
 * Modalità singola (default) - Solo un item può essere aperto
 */
export const SingleMode: Story = {
  args: {
    variant: 'basic',
    items: sampleItems,
    allowMultiple: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const buttons = canvas.getAllByRole('button');

    // Apri il primo
    await userEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');

    // Apri il secondo - il primo dovrebbe chiudersi
    await userEvent.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  },
};

/**
 * Modalità multipla - Più items possono essere aperti
 */
export const MultipleMode: Story = {
  args: {
    variant: 'basic',
    items: sampleItems,
    allowMultiple: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const buttons = canvas.getAllByRole('button');

    // Apri il primo
    await userEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');

    // Apri il secondo - il primo deve rimanere aperto
    await userEvent.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  },
};

/**
 * Con item inizialmente espanso
 */
export const DefaultExpanded: Story = {
  args: {
    variant: 'basic',
    items: sampleItems,
    defaultExpandedIds: ['1'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const firstHeader = canvas.getAllByRole('button')[0];

    // Verifica che il primo sia già espanso
    expect(firstHeader).toHaveAttribute('aria-expanded', 'true');
  },
};

/**
 * Con item disabilitato
 */
export const WithDisabledItem: Story = {
  args: {
    variant: 'basic',
    items: disabledItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const buttons = canvas.getAllByRole('button');

    // Il secondo item dovrebbe essere disabilitato
    expect(buttons[1]).toBeDisabled();

    // Click non dovrebbe fare nulla
    await userEvent.click(buttons[1]);
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
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
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic</h3>
        <Accordion variant="basic" items={sampleItems} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Left Icon</h3>
        <Accordion variant="leftIcon" items={sampleItems} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Active Background</h3>
        <Accordion variant="activeBackground" items={sampleItems} />
      </div>
    </div>
  ),
};

/**
 * Single Item - Come da Figma
 */
export const SingleItem: Story = {
  args: {
    variant: 'basic',
    items: [sampleItems[0]],
    defaultExpandedIds: ['1'],
  },
};

/**
 * Showcase completa
 */
export const Showcase: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Items</h3>
        <Accordion variant="basic" items={sampleItems} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Left Icon Items</h3>
        <Accordion variant="leftIcon" items={sampleItems} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Active Background Items</h3>
        <Accordion
          variant="activeBackground"
          items={sampleItems}
          defaultExpandedIds={['1']}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Multiple Mode</h3>
        <Accordion
          variant="basic"
          items={sampleItems}
          allowMultiple={true}
          defaultExpandedIds={['1', '2']}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Disabled Item</h3>
        <Accordion variant="basic" items={disabledItems} />
      </div>
    </div>
  ),
};
