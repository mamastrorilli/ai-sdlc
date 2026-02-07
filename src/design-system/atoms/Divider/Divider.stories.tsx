import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['light', 'medium', 'dark'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    spacing: 'md',
  },
};

export const Dashed: Story = {
  args: {
    variant: 'dashed',
    spacing: 'md',
  },
};

export const Dotted: Story = {
  args: {
    variant: 'dotted',
    spacing: 'md',
  },
};

export const AllColors: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm mb-2">Light</p>
        <Divider color="light" spacing="none" />
      </div>
      <div>
        <p className="text-sm mb-2">Medium</p>
        <Divider color="medium" spacing="none" />
      </div>
      <div>
        <p className="text-sm mb-2">Dark</p>
        <Divider color="dark" spacing="none" />
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center h-16 gap-4">
      <span>Item 1</span>
      <Divider orientation="vertical" spacing="none" />
      <span>Item 2</span>
      <Divider orientation="vertical" spacing="none" />
      <span>Item 3</span>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div>
      <p>Contenuto sopra il divider</p>
      <Divider spacing="lg" />
      <p>Contenuto sotto il divider</p>
    </div>
  ),
};
