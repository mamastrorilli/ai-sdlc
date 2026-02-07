import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LinkGroup } from './LinkGroup';

const meta: Meta<typeof LinkGroup> = {
  title: 'Molecules/LinkGroup',
  component: LinkGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    variant: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof LinkGroup>;

export const Default: Story = {
  args: {
    title: 'Risorse',
    links: [
      { label: 'Documentazione', href: '/docs' },
      { label: 'Storybook', href: '/storybook' },
      { label: 'GitHub', href: 'https://github.com', external: true },
    ],
  },
};

export const WithoutTitle: Story = {
  args: {
    links: [
      { label: 'Home', href: '/' },
      { label: 'Chi siamo', href: '/about' },
      { label: 'Contatti', href: '/contact' },
    ],
  },
};

export const Horizontal: Story = {
  args: {
    title: 'Menu',
    orientation: 'horizontal',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Prodotti', href: '/products' },
      { label: 'Servizi', href: '/services' },
      { label: 'Contatti', href: '/contact' },
    ],
  },
};

export const OnDarkBackground: Story = {
  render: () => (
    <div className="bg-[var(--color-neutral-900)] p-8 rounded-lg">
      <LinkGroup
        title="Risorse"
        variant="dark"
        links={[
          { label: 'Documentazione', href: '/docs' },
          { label: 'Storybook', href: '/storybook' },
          { label: 'GitHub', href: 'https://github.com', external: true },
        ]}
      />
    </div>
  ),
};

export const FooterLayout: Story = {
  render: () => (
    <div className="bg-[var(--color-neutral-900)] p-8 rounded-lg">
      <div className="grid grid-cols-3 gap-8">
        <LinkGroup
          title="Prodotto"
          variant="dark"
          links={[
            { label: 'Features', href: '/features' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Demo', href: '/demo' },
          ]}
        />
        <LinkGroup
          title="Risorse"
          variant="dark"
          links={[
            { label: 'Docs', href: '/docs' },
            { label: 'Blog', href: '/blog' },
            { label: 'Support', href: '/support' },
          ]}
        />
        <LinkGroup
          title="Azienda"
          variant="dark"
          links={[
            { label: 'About', href: '/about' },
            { label: 'Careers', href: '/careers' },
            { label: 'Contact', href: '/contact' },
          ]}
        />
      </div>
    </div>
  ),
};
