import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Atoms/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['full', 'compact', 'mono'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: [undefined, 'light', 'dark'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    variant: 'full',
    size: 'md',
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      <Logo variant="full" size="sm" />
      <Logo variant="full" size="md" />
      <Logo variant="full" size="lg" />
    </div>
  ),
};

export const OnDarkBackground: Story = {
  render: () => (
    <div className="bg-[var(--color-neutral-900)] p-8 rounded-lg">
      <Logo variant="full" size="md" color="light" />
    </div>
  ),
};

export const MonoVariants: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="p-4">
        <Logo variant="mono" color="dark" />
      </div>
      <div className="bg-[var(--color-neutral-900)] p-4 rounded">
        <Logo variant="mono" color="light" />
      </div>
    </div>
  ),
};
