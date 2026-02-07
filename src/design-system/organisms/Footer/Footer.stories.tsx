import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Github, Linkedin, Twitter, BookOpen } from 'lucide-react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

const defaultColumns = [
  {
    title: 'Risorse',
    links: [
      { label: 'Storybook', href: '/storybook' },
      { label: 'Documentazione', href: '/docs' },
      { label: 'Componenti', href: '/components' },
    ],
  },
  {
    title: 'Progetto',
    links: [
      { label: 'GitHub', href: 'https://github.com', external: true },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
  },
  {
    title: 'Sviluppo',
    links: [
      { label: 'Getting Started', href: '/docs/getting-started' },
      { label: 'Contributing', href: '/docs/contributing' },
      { label: 'Design Tokens', href: '/docs/tokens' },
    ],
  },
];

const defaultSocialLinks = [
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'Storybook', href: '/storybook', icon: BookOpen },
];

export const Default: Story = {
  args: {
    description: 'Design System moderno costruito con AI-assisted development. Basato su UI Kit Italia.',
    columns: defaultColumns,
    socialLinks: defaultSocialLinks,
    copyright: '© 2024 AI SDLC Design System',
  },
};

export const LightVariant: Story = {
  args: {
    variant: 'light',
    description: 'Design System moderno costruito con AI-assisted development.',
    columns: defaultColumns,
    socialLinks: defaultSocialLinks,
    copyright: '© 2024 AI SDLC Design System',
  },
};

export const Minimal: Story = {
  args: {
    description: 'Design System moderno.',
    copyright: '© 2024 AI SDLC',
  },
};

export const WithSocialOnly: Story = {
  args: {
    description: 'Un Design System accessibile e moderno.',
    socialLinks: defaultSocialLinks,
    copyright: '© 2024 AI SDLC Design System',
  },
};

export const FullFeatured: Story = {
  args: {
    description: 'AI SDLC è un Design System moderno costruito con AI-assisted development. Integrazione Figma, componenti accessibili e pipeline CI/CD automatizzata. Basato su UI Kit Italia per garantire accessibilità e coerenza visiva.',
    columns: defaultColumns,
    socialLinks: defaultSocialLinks,
    copyright: '© 2024 AI SDLC Design System — Built with Next.js, Tailwind CSS & Claude Code',
    bottomContent: (
      <div className="flex gap-4 text-sm text-neutral-400">
        <a href="/privacy" className="hover:text-white">Privacy Policy</a>
        <a href="/terms" className="hover:text-white">Terms of Service</a>
        <a href="/cookies" className="hover:text-white">Cookie Policy</a>
      </div>
    ),
  },
};
