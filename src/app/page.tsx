'use client';
import { Github, Linkedin, BookOpen, FileCode } from 'lucide-react';
import { Hero, Footer } from '@/design-system/organisms';
import { Accordion, BackToTop, type AccordionItemData } from '@/design-system/atoms';
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
          <strong>Atomic Design</strong>, organizzando i componenti in livelli
          crescenti di complessità:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>
            <strong>Atoms</strong>: Accordion, BackToTop, Button, Divider, Icon,
            Link, Logo
          </li>
          <li>
            <strong>Molecules</strong>: LinkGroup, SocialLinks
          </li>
          <li>
            <strong>Organisms</strong>: Footer, Hero
          </li>
        </ul>
        <p>
          Tutti i componenti seguono le linee guida del{' '}
          <strong>UI Kit Italia</strong> (Figma Community) per accessibilità
          WCAG 2.1 AA e coerenza visiva.
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
          <strong>Figma UI Kit Italia</strong> e centralizzati in{' '}
          <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
            tokens/
          </code>
          . Nessun valore HEX è mai hardcodato nei componenti.
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>
            <strong>Colors</strong>: Primary (#0066CC), Accent (#00A3A3),
            Success, Warning, Error, Info + scala Neutral completa
          </li>
          <li>
            <strong>Typography</strong>: Titillium Web con 12 livelli di
            dimensione (xs → 9xl) e 5 pesi (300–700)
          </li>
          <li>
            <strong>Spacing</strong>: Sistema 4px con gap semantici, border
            radius, container widths e z-index scale
          </li>
        </ul>
        <p>
          Ogni token è esposto come CSS custom property (es.{' '}
          <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
            var(--color-primary-500)
          </code>
          ) e classe Tailwind.
        </p>
      </div>
    ),
  },
  {
    id: 'contesto-vivo',
    title: 'Contesto Vivo — AI-Aware Codebase',
    content: (
      <div className="space-y-3">
        <p>
          Il <strong>Contesto Vivo</strong> è il principio cardine del progetto:
          la documentazione non è un artefatto separato, ma{' '}
          <strong>parte integrante del codice</strong> che si aggiorna
          automaticamente ad ogni modifica.
        </p>
        <p>Come funziona:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>
            <strong>CLAUDE.md</strong> (root): istruzioni di progetto lette
            automaticamente da Claude Code e altri AI IDE ad ogni sessione
          </li>
          <li>
            <strong>.context/design-system.md</strong>: registro completo di
            token, componenti, props e varianti — aggiornato ad ogni nuova
            componente
          </li>
          <li>
            <strong>Storybook stories</strong>: documentazione visiva e
            interattiva con play functions per test automatici
          </li>
        </ul>
        <p>
          Quando un AI agent (Claude Code, Cursor, Copilot) apre il progetto,
          ha immediatamente il contesto completo: sa quali componenti esistono,
          quali token usare e quali regole rispettare. Questo elimina
          l\'allucinazione e garantisce coerenza.
        </p>
      </div>
    ),
  },
  {
    id: 'mcp',
    title: 'MCP — Model Context Protocol',
    content: (
      <div className="space-y-3">
        <p>
          <strong>MCP (Model Context Protocol)</strong> è uno standard aperto
          creato da Anthropic che definisce come i modelli AI comunicano con
          strumenti e dati esterni. Funziona come una{' '}
          <strong>&quot;USB-C per l\'AI&quot;</strong>: un singolo protocollo
          standardizzato che sostituisce integrazioni custom per ogni servizio.
        </p>
        <p>
          L\'architettura è client-server: l\'AI IDE (es. Claude Code)
          è il <strong>client MCP</strong>, che si connette a uno o più{' '}
          <strong>server MCP</strong>. Ogni server espone &quot;tools&quot;
          tipizzati che il modello può invocare autonomamente durante la
          conversazione.
        </p>
        <p>In questo progetto, i server MCP configurati sono:</p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong>Figma MCP Server</strong>: Claude Code si connette
            direttamente al file Figma del UI Kit Italia. Può leggere nodi,
            estrarre proprietà (colori, spacing, tipografia), ispezionare
            varianti di un componente e generare codice React + TypeScript
            pixel-perfect — senza che lo sviluppatore debba copiare/incollare
            specifiche dal Dev Mode
          </li>
          <li>
            <strong>GitHub MCP Server</strong>: permette all\'AI di creare
            issue, aprire PR, commentare code review e leggere lo stato delle
            pipeline CI — tutto dalla stessa conversazione in cui si scrive
            codice
          </li>
          <li>
            <strong>File System MCP</strong>: accesso strutturato in
            lettura/scrittura al codebase locale, usato per aggiornare
            automaticamente{' '}
            <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
              .context/design-system.md
            </code>
            ,{' '}
            <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
              CLAUDE.md
            </code>{' '}
            e le Storybook stories quando viene aggiunto un nuovo componente
          </li>
        </ul>
        <p>
          Il vantaggio rispetto al prompting tradizionale: l\'AI non lavora
          su descrizioni testuali approssimative, ma ha{' '}
          <strong>accesso diretto ai dati reali</strong> (il file Figma, il repo
          GitHub, il filesystem). Questo riduce drasticamente errori,
          allucinazioni e il bisogno di iterazioni manuali.
        </p>
      </div>
    ),
  },
  {
    id: 'pipeline-design-system',
    title: 'Pipeline — Design System (Storybook)',
    content: (
      <div className="space-y-3">
        <p>
          La pipeline{' '}
          <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
            storybook-tests.yml
          </code>{' '}
          valida la qualità del Design System ad ogni push o PR verso{' '}
          <strong>main</strong>, <strong>dev</strong> e <strong>test</strong>.
          È progettata per garantire che ogni componente sia accessibile prima
          di raggiungere la produzione.
        </p>
        <p className="font-semibold">Flusso completo:</p>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>
            <strong>Setup</strong>: install dependencies con{' '}
            <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
              yarn --frozen-lockfile
            </code>{' '}
            + installazione browser Playwright (Chromium) per i test in-browser
          </li>
          <li>
            <strong>Test accessibilità</strong>: Vitest esegue tutti i test
            delle Storybook stories tramite{' '}
            <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
              @storybook/addon-vitest
            </code>
            . Ogni story viene renderizzata in un browser reale (Playwright) e
            validata con <strong>axe-core</strong> per WCAG 2.1 AA: contrasto,
            ARIA, semantica HTML, focus management
          </li>
          <li>
            <strong>Report</strong>: se i test falliscono, uno script genera un
            report strutturato (JSON + Markdown) con i dettagli di ogni
            violazione, i file coinvolti e le regole WCAG violate
          </li>
          <li>
            <strong>Auto-Fix (solo PR)</strong>: il report viene passato a un
            agente{' '}
            <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
              anthropics/claude-code-action
            </code>{' '}
            che analizza le violazioni, trova i file sorgente, applica fix
            minimali e pusha il commit sulla branch della PR
          </li>
          <li>
            <strong>Issue (push diretto)</strong>: se il push è diretto (non
            PR), l\'auto-fix non è disponibile — viene creata una GitHub
            Issue con il report completo, label{' '}
            <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
              accessibility, vitest, auto-fix
            </code>{' '}
            e assegnata all\'autore del commit
          </li>
          <li>
            <strong>Deploy (solo main)</strong>: se tutti i test passano e siamo
            su main, viene eseguito{' '}
            <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
              yarn build-storybook
            </code>{' '}
            e il risultato viene deployato su <strong>GitHub Pages</strong> come
            documentazione pubblica del Design System
          </li>
        </ol>
      </div>
    ),
  },
  {
    id: 'pipeline-web-app',
    title: 'Pipeline — Web App (Lighthouse)',
    content: (
      <div className="space-y-3">
        <p>
          La pipeline{' '}
          <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
            app-tests.yml
          </code>{' '}
          valida la qualità della Web App Next.js. A differenza della pipeline
          Storybook che testa componenti isolati, questa esegue{' '}
          <strong>Lighthouse User Flow</strong> su pagine reali, simulando la
          navigazione di un utente.
        </p>
        <p className="font-semibold">Flusso completo:</p>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>
            <strong>Build &amp; Start</strong>:{' '}
            <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
              yarn build
            </code>{' '}
            compila l\'app Next.js, poi{' '}
            <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
              yarn start
            </code>{' '}
            avvia il server di produzione su porta 3000
          </li>
          <li>
            <strong>Lighthouse User Flow</strong>: uno script Node.js esegue
            Lighthouse in modalità User Flow — naviga le pagine, misura
            performance, accessibilità e best practices con metriche reali
            (non synthetic)
          </li>
          <li>
            <strong>Report</strong>: se le soglie non vengono raggiunte, viene
            generato un report strutturato con le violazioni specifiche e i
            punteggi per metrica
          </li>
          <li>
            <strong>Auto-Fix (solo PR)</strong>: stesso meccanismo della
            pipeline Storybook — Claude Code analizza il report Lighthouse,
            identifica i file da correggere e pusha le fix sulla branch
          </li>
          <li>
            <strong>Issue (push diretto)</strong>: GitHub Issue automatica con
            label{' '}
            <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
              lighthouse, auto-fix, web-app
            </code>
          </li>
          <li>
            <strong>Deploy (solo main)</strong>: se tutto passa, deploy
            automatico su <strong>Vercel</strong> in produzione tramite Vercel
            CLI
          </li>
        </ol>
        <p className="font-semibold mt-2">Soglie di qualità:</p>
        <table className="w-full text-sm border-collapse mt-1">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Metrica</th>
              <th className="text-left py-2">Soglia</th>
              <th className="text-left py-2">Effetto</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Accessibility</td>
              <td className="py-2">&gt;= 95%</td>
              <td className="py-2 font-semibold" style={{ color: 'var(--color-error-500)' }}>
                Blocca il deploy
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Performance</td>
              <td className="py-2">&gt;= 90%</td>
              <td className="py-2" style={{ color: 'var(--color-warning-500)' }}>
                Warning (non blocca)
              </td>
            </tr>
            <tr>
              <td className="py-2">Best Practices</td>
              <td className="py-2">&gt;= 90%</td>
              <td className="py-2" style={{ color: 'var(--color-warning-500)' }}>
                Warning (non blocca)
              </td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm mt-2" style={{ color: 'var(--color-neutral-500)' }}>
          Le run concorrenti sulla stessa branch vengono automaticamente
          cancellate per risparmiare risorse CI.
        </p>
      </div>
    ),
  },
  {
    id: 'autofix-agent',
    title: 'Auto-Fix Agent — Claude Code in CI',
    content: (
      <div className="space-y-3">
        <p>
          Quando un test di accessibilità fallisce in CI, un{' '}
          <strong>agente Claude Code</strong> interviene automaticamente tramite{' '}
          <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
            anthropics/claude-code-action
          </code>
          :
        </p>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>
            Legge il <strong>report strutturato</strong> generato dalla pipeline
            (axe-core o Lighthouse)
          </li>
          <li>
            Identifica i file sorgente coinvolti nel codebase
          </li>
          <li>
            Applica <strong>fix minimali</strong> di accessibilità (ARIA
            attributes, contrasto colori, semantic HTML)
          </li>
          <li>
            Verifica che il progetto compili con{' '}
            <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
              yarn build
            </code>
          </li>
          <li>
            Committa e pusha le fix sulla branch della PR
          </li>
        </ol>
        <p>
          Se l\'auto-fix non riesce o siamo su push diretto (non PR), viene
          creata una <strong>GitHub Issue</strong> con il report completo e
          assegnata all\'autore del commit. Requisito:{' '}
          <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
            ANTHROPIC_API_KEY
          </code>{' '}
          nei secrets del repository.
        </p>
      </div>
    ),
  },
  {
    id: 'storybook',
    title: 'Storybook — Documentazione Interattiva',
    content: (
      <div className="space-y-3">
        <p>
          Ogni componente del Design System ha una{' '}
          <strong>story Storybook</strong> dedicata con:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>
            Tutte le <strong>varianti</strong> documentate e navigabili
          </li>
          <li>
            <strong>Play functions</strong> per test di interazione automatizzati
            (click, keyboard, focus)
          </li>
          <li>
            Test di accessibilità <strong>axe-core</strong> integrati via{' '}
            <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
              @storybook/addon-vitest
            </code>
          </li>
          <li>
            Controlli interattivi per provare props in tempo reale
          </li>
        </ul>
        <p>
          Comandi:{' '}
          <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
            yarn storybook
          </code>{' '}
          (dev) |{' '}
          <code className="bg-neutral-100 px-2 py-1 rounded text-sm">
            yarn build-storybook
          </code>{' '}
          (build statico)
        </p>
      </div>
    ),
  },
  {
    id: 'accessibility',
    title: 'Accessibilità — WCAG 2.1 AA',
    content: (
      <div className="space-y-3">
        <p>
          L\'accessibilità è un requisito <strong>bloccante</strong>, non
          opzionale:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>
            Test automatici <strong>axe-core</strong> su ogni story Storybook
            (via Vitest)
          </li>
          <li>
            Soglia Lighthouse Accessibility al <strong>95%</strong> — fallimento
            = build bloccata
          </li>
          <li>Focus management e keyboard navigation su tutti i componenti</li>
          <li>ARIA attributes e semantic HTML obbligatori</li>
          <li>
            Contrasto colori conforme WCAG AA — no opacità ridotte su sfondi
            colorati
          </li>
          <li>
            <strong>Auto-fix AI</strong> in CI per correggere regressioni
            automaticamente
          </li>
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
            <strong>Framework</strong>: Next.js (App Router)
          </li>
          <li>
            <strong>Linguaggio</strong>: TypeScript 5
          </li>
          <li>
            <strong>Styling</strong>: Tailwind CSS v4
          </li>
          <li>
            <strong>Icons</strong>: Lucide React
          </li>
          <li>
            <strong>Documentation</strong>: Storybook 8
          </li>
          <li>
            <strong>Testing</strong>: Vitest + Playwright + axe-core
          </li>
          <li>
            <strong>CI/CD</strong>: GitHub Actions + Vercel + GitHub Pages
          </li>
          <li>
            <strong>AI Agent</strong>: Claude Code (sviluppo + auto-fix CI)
          </li>
          <li>
            <strong>Design Source</strong>: Figma UI Kit Italia (via MCP)
          </li>
          <li>
            <strong>Package Manager</strong>: Yarn
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
          Un <strong>Agentic Workflow</strong> rappresenta un salto evolutivo rispetto alla semplice automazione: l'AI non si limita a generare codice, ma agisce come un <strong>agente autonomo</strong> capace di ragionare, utilizzare strumenti e correggersi iterativamente.
        </p>
        
        <div className="bg-[var(--color-neutral-50)] p-4 rounded-lg border border-[var(--color-neutral-200)] italic text-sm text-[var(--color-neutral-700)]">
          &quot;L'agente osserva lo stato del sistema (test falliti, log), ragiona sulla causa radice, pianifica una soluzione ed esegue modifiche usando tool reali, verificando il risultato in un ciclo continuo.&quot;
        </div>

        <div className="space-y-2">
          <p><strong>Integrazione nel Progetto:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>
              <strong>Antigravity (IDE Agent)</strong>: Integrato direttamente nel workspace, Antigravity utilizza tool di sistema per navigare il codice, eseguire test locali e orchestrare i workflow definiti in <code>.agent/workflows</code>, agendo come un vero programmatore nel team.
            </li>
            <li>
              <strong>Claude Code Action (CI Agent)</strong>: Nelle GitHub Actions, l'agente riceve i report di errore da Lighthouse o Vitest. Non propone una soluzione statica, ma &quot;entra&quot; nel codice della PR, individua il bug, applica una fix e valida che la build passi prima di sottomettere le modifiche.
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

      {/* Back to Top */}
      <BackToTop />

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
