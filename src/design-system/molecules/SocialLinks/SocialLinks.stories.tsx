import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Github, Linkedin, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import { SocialLinks } from './SocialLinks';

const meta: Meta<typeof SocialLinks> = {
  title: 'Molecules/SocialLinks',
  component: SocialLinks,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SocialLinks>;

export const Default: Story = {
  args: {
    links: [
      { name: 'GitHub', href: 'https://github.com', icon: Github },
      { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
      { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    ],
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-center">
      <div>
        <p className="text-sm text-center mb-2">Small</p>
        <SocialLinks
          size="sm"
          links={[
            { name: 'GitHub', href: '#', icon: Github },
            { name: 'LinkedIn', href: '#', icon: Linkedin },
          ]}
        />
      </div>
      <div>
        <p className="text-sm text-center mb-2">Medium</p>
        <SocialLinks
          size="md"
          links={[
            { name: 'GitHub', href: '#', icon: Github },
            { name: 'LinkedIn', href: '#', icon: Linkedin },
          ]}
        />
      </div>
      <div>
        <p className="text-sm text-center mb-2">Large</p>
        <SocialLinks
          size="lg"
          links={[
            { name: 'GitHub', href: '#', icon: Github },
            { name: 'LinkedIn', href: '#', icon: Linkedin },
          ]}
        />
      </div>
    </div>
  ),
};

export const OnDarkBackground: Story = {
  render: () => (
    <div className="bg-[var(--color-neutral-900)] p-8 rounded-lg">
      <SocialLinks
        variant="dark"
        links={[
          { name: 'GitHub', href: 'https://github.com', icon: Github },
          { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
          { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
        ]}
      />
    </div>
  ),
};

export const ExtendedSocials: Story = {
  args: {
    links: [
      { name: 'GitHub', href: '#', icon: Github },
      { name: 'LinkedIn', href: '#', icon: Linkedin },
      { name: 'Twitter', href: '#', icon: Twitter },
      { name: 'Facebook', href: '#', icon: Facebook },
      { name: 'Instagram', href: '#', icon: Instagram },
      { name: 'YouTube', href: '#', icon: Youtube },
    ],
  },
};
