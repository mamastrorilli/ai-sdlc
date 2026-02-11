'use client';
import { Github, Linkedin, BookOpen, FileCode } from 'lucide-react';
import { Hero, Footer } from '@/design-system/organisms';
import { Accordion, type AccordionItemData } from '@/design-system/atoms';
import type { FooterColumn } from '@/design-system/organisms';
import type { SocialLinkItem } from '@/design-system/molecules';

const faqItems: AccordionItemData[] = [
  {
    id: 'design-system',
    title: 'Design System con Atomic Design',
    content: (
      <div className="space-y-3">
        <p>
          Il progetto implementa un Design System basato sulla metodologia{' '}
          <strong>Atomic Design</strong>, organizzando i componenti in livelli:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>
            <strong>Atoms</strong>: Button, Icon, Link, Accordion
          </li>
          <li>
            <strong>Organisms</strong>: Hero
          </li>
        </ul>
        <p>
          I componenti seguono le linee guida del{' '}
          <strong>UI Kit Italia</strong> per garantire accessibilità e coerenza
          visiva.
        </p>
      </div>
    ),
  },
  {
    id: 'design-tokens',
    title: 'Design Tokens (UI Kit Italia)',
    content: (
      <div className="space-y-3">
        <p>
          I token di design sono estratti dal{' '}
          <strong>Figma UI Kit Italia</strong> e includono:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>
            <strong>Colors</strong>: Primary (#0066CC), Accent, Success,
            Warning, Error, Info, Neutral
          </li>
          <li>
            <strong>Typography</strong>: Font Titillium Web con scale tipografiche
            standardizzate
          </li>
          <li>
            <strong>Spacing</strong>: Sistema basato su unità di 4px
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'storybook',
    title: 'Storybook con Play Functions',
    content: (
      <div className="space-y-3">
        <p>
          Ogni componente ha una <strong>story Storybook</strong> con:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Varianti principali documentate</li>
          <li>
            <strong>Play functions</strong> per test di interazione automatizzati
          </li>
          <li>Test di accessibilità integrati con axe-core</li>
        </ul>
        <p>
          Comando: <code className="bg-neutral-100 px-2 py-1 rounded">yarn storybook</code>
        </p>
      </div>
    ),
  },
  {
    id: 'ci-cd',
    title: 'CI/CD con GitHub Actions',
    content: (
      <div className="space-y-3">
        <p>
          Pipeline automatizzata su ogni push/PR verso <strong>main</strong>:
        </p>
        <ol className="list-decimal list-inside space-y-1 ml-2">
          <li>Install dependencies con yarn</li>
          <li>Build Storybook statico</li>
          <li>Test accessibilità (WCAG 2.1 AA) con axe-core</li>
          <li>Lighthouse CI per performance e accessibility score</li>
          <li>Deploy automatico su GitHub Pages</li>
        </ol>
      </div>
    ),
  },
  {
    id: 'lighthouse',
    title: 'Lighthouse CI con Soglie',
    content: (
      <div className="space-y-3">
        <p>
          Controlli automatici di qualità con <strong>Lighthouse CI</strong>:
        </p>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Metrica</th>
              <th className="text-left py-2">Soglia</th>
              <th className="text-left py-2">Livello</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Performance</td>
              <td className="py-2">&gt;= 90%</td>
              <td className="py-2">Warning</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Accessibility</td>
              <td className="py-2">&gt;= 95%</td>
              <td className="py-2 text-red-600 font-semibold">Blocca</td>
            </tr>
            <tr>
              <td className="py-2">Best Practices</td>
              <td className="py-2">&gt;= 90%</td>
              <td className="py-2">Warning</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: 'figma-workflow',
    title: 'Figma MCP Workflow',
    content: (
      <div className="space-y-3">
        <p>
          Integrazione <strong>Figma Dev Mode → Claude Code</strong>:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Estrazione automatica di componenti da Figma</li>
          <li>Generazione di codice React + TypeScript</li>
          <li>Auto-update della documentazione (CLAUDE.md, design-system.md)</li>
          <li>Creazione automatica di Storybook stories</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'accessibility',
    title: 'Accessibilità (WCAG 2.1 AA)',
    content: (
      <div className="space-y-3">
        <p>
          L&apos;accessibilità è una priorità core del progetto:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Test automatici con axe-core su ogni componente</li>
          <li>Soglia Lighthouse Accessibility al 95% (bloccante)</li>
          <li>Focus management e keyboard navigation</li>
          <li>ARIA attributes e semantic HTML</li>
          <li>Contrasto colori conforme WCAG AA</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'tech-stack',
    title: 'Stack Tecnologico',
    content: (
      <div className="space-y-3">
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>
            <strong>Framework</strong>: Next.js 14 (App Router)
          </li>
          <li>
            <strong>Linguaggio</strong>: TypeScript
          </li>
          <li>
            <strong>Styling</strong>: Tailwind CSS
          </li>
          <li>
            <strong>Icons</strong>: Lucide React
          </li>
          <li>
            <strong>Documentation</strong>: Storybook 8
          </li>
          <li>
            <strong>Package Manager</strong>: Yarn
          </li>
          <li>
            <strong>CI/CD</strong>: GitHub Actions
          </li>
        </ul>
      </div>
    ),
  },
];

const STORYBOOK_URL = 'https://mamastrorilli.github.io/ai-sdlc/';
const GITHUB_URL = 'https://github.com/mamastrorilli/ai-sdlc';

const footerColumns: FooterColumn[] = [
  {
    title: 'Risorse',
    links: [
      { label: 'Storybook', href: STORYBOOK_URL, external: true },
      { label: 'Documentazione', href: '/docs' },
      { label: 'Componenti', href: '/components' },
    ],
  },
  {
    title: 'Progetto',
    links: [
      { label: 'GitHub', href: GITHUB_URL, external: true },
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

const socialLinks: SocialLinkItem[] = [
  { name: 'GitHub', href: GITHUB_URL, icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'Storybook', href: STORYBOOK_URL, icon: BookOpen },
  { name: 'Figma', href: 'https://figma.com', icon: FileCode },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <Hero
          variant="withImage"
          imageFlush
          size="lg"
          background="primary"
          kicker="Design System"
          title="AI SDLC"
          subtitle="Un Design System moderno costruito con AI-assisted development. Integrazione Figma, componenti accessibili e pipeline CI/CD automatizzata."
          actions={[
            { label: 'Storybook', href: STORYBOOK_URL },
            { label: 'GitHub', href: GITHUB_URL },
          ]}
          imageUrl="/images/hero-banner-hp.jpg"
          imageAlt="Neural network and artificial intelligence conceptual background"
          imagePriority
        />

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[var(--color-neutral-900)]">
              Cosa è stato implementato
            </h2>
            <p className="text-lg text-center text-[var(--color-neutral-600)] mb-12">
              Scopri tutte le funzionalità e tecnologie del progetto
            </p>

            <Accordion
              variant="activeBackground"
              items={faqItems}
              allowMultiple
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        description="Design System moderno costruito con AI-assisted development. Basato su UI Kit Italia per garantire accessibilità e coerenza visiva."
        columns={footerColumns}
        socialLinks={socialLinks}
        copyright="© 2024 AI SDLC Design System — Built with Next.js, Tailwind CSS & Claude Code"
      />
    </div>
  );
}
