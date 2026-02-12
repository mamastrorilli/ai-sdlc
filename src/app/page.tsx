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
          Il progetto implementa un Design System robusto basato sulla metodologia{' '}
          <strong>Atomic Design</strong>. Questa architettura permette una scalabilità eccellente attraverso la scomposizione dell&apos;interfaccia in elementi modulari, riutilizzabili e gerarchici.
        </p>
        <p>
          I componenti sono stati sviluppati seguendo rigorosamente le linee guida del{' '}
          <strong>UI Kit Italia</strong> per garantire accessibilità nativa (WCAG 2.1 AA) e coerenza
          visiva con gli standard di design di riferimento.
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
    title: 'GitHub Actions: AI-Driven Pipeline',
    content: (
      <div className="space-y-3">
        <p>
          Il progetto utilizza due pipeline principali che integrano l&apos;AI per garantire la qualità:
        </p>
        <div className="space-y-2">
          <p><strong>1. Web App Quality & Release:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Analisi <strong>Lighthouse User Flow</strong> (Performance & Accessibility).</li>
            <li><strong>Claude Auto-Fix</strong>: risponde ai fallimenti Lighthouse applicando fix automatiche su PR.</li>
            <li>Deploy continuo su <strong>Vercel Production</strong> (solo se i test passano).</li>
          </ul>
          
          <p><strong>2. Design System Quality:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Test di accessibilità con <strong>Vitest & axe-core</strong> su ogni story.</li>
            <li><strong>Claude Auto-Fix</strong>: corregge errori di contrasto o ARIA nei componenti.</li>
            <li>Generazione automatica di <strong>GitHub Issues</strong> per fix manuali su push falliti.</li>
            <li>Deploy automatico della documentazione su <strong>GitHub Pages</strong>.</li>
          </ul>
        </div>
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
            <strong>Frontend</strong>: Next.js 16 (App Router) con React 19
          </li>
          <li>
            <strong>Linguaggio</strong>: TypeScript 5
          </li>
          <li>
            <strong>Styling</strong>: Tailwind CSS 4 (Engine moderno v4)
          </li>
          <li>
            <strong>Testing</strong>: Vitest con Playwright Browser Testing
          </li>
          <li>
            <strong>Documentation</strong>: Storybook 10 con Play functions
          </li>
          <li>
            <strong>Icons</strong>: Lucide React
          </li>
          <li>
            <strong>Package Manager</strong>: Yarn
          </li>
          <li>
            <strong>CI/CD</strong>: GitHub Actions & Lighthouse CI
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'agentic-workflows',
    title: 'Agentic Workflows: L\'AI come Collaboratore Autonomo',
    content: (
      <div className="space-y-4">
        <p>
          Un <strong>Agentic Workflow</strong> rappresenta un salto evolutivo rispetto alla semplice automazione: l&apos;AI non si limita a generare codice, ma agisce come un <strong>agente autonomo</strong> capace di ragionare, utilizzare strumenti e correggersi iterativamente.
        </p>
        
        <div className="bg-[var(--color-neutral-50)] p-4 rounded-lg border border-[var(--color-neutral-200)] italic text-sm text-[var(--color-neutral-700)]">
          &quot;L&apos;agente osserva lo stato del sistema (test falliti, log), ragiona sulla causa radice, pianifica una soluzione ed esegue modifiche usando tool reali, verificando il risultato in un ciclo continuo.&quot;
        </div>

        <div className="space-y-2">
          <p><strong>Integrazione nel Progetto:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>
              <strong>Antigravity (IDE Agent)</strong>: Integrato direttamente nel workspace, Antigravity utilizza tool di sistema per navigare il codice, eseguire test locali e orchestrare i workflow definiti in <code>.agent/workflows</code>, agendo come un vero programmatore nel team.
            </li>
            <li>
              <strong>Claude Code Action (CI Agent)</strong>: Nelle GitHub Actions, l&apos;agente riceve i report di errore da Lighthouse o Vitest. Non propone una soluzione statica, ma &quot;entra&quot; nel codice della PR, individua il bug, applica una fix e valida che la build passi prima di sottomettere le modifiche.
            </li>
            <li>
              <strong>Tool-Use & Decision Making</strong>: Grazie alle <em>capabilities</em> di tool-use, i modelli possono eseguire comandi terminale, leggere la struttura delle directory e manipolare i file, riducendo drasticamente il task switching per gli sviluppatori.
            </li>
          </ul>
        </div>
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
