import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Hero } from './Hero';

/**
 * Il componente Hero è la sezione principale di una landing page,
 * utilizzato per catturare l'attenzione e comunicare il messaggio chiave.
 *
 * ## Varianti
 * - **default**: Testo centrato su sfondo colorato
 * - **left**: Testo allineato a sinistra
 * - **withImage**: Layout a due colonne con immagine
 * - **fullImage**: Immagine di sfondo a tutto schermo
 *
 * ## Accessibilità
 * - Utilizza heading semantico h1
 * - Supporta alt text per immagini
 * - Contrasto colori conforme WCAG AA
 */
const meta: Meta<typeof Hero> = {
  title: 'Organisms/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'left', 'withImage', 'fullImage'],
      description: 'Variante layout',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Dimensione (padding)',
    },
    background: {
      control: 'select',
      options: ['primary', 'neutral', 'dark', 'light'],
      description: 'Colore di sfondo',
    },
    imagePosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Posizione immagine (solo withImage)',
    },
    kicker: {
      control: 'text',
      description: 'Testo sopra il titolo',
    },
    title: {
      control: 'text',
      description: 'Titolo principale',
    },
    subtitle: {
      control: 'text',
      description: 'Sottotitolo/descrizione',
    },
    imageUrl: {
      control: 'text',
      description: 'URL immagine',
    },
  },
  args: {
    title: 'Il Design System per la Pubblica Amministrazione',
    subtitle:
      'Costruisci interfacce coerenti, accessibili e conformi alle linee guida di design per i servizi pubblici digitali.',
    variant: 'default',
    size: 'md',
    background: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

// Immagine placeholder per le stories
const placeholderImage =
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop';

// ============================================
// VARIANTI BASE
// ============================================

/**
 * Hero Default - Testo centrato, sfondo primary
 */
export const Default: Story = {
  args: {
    variant: 'default',
    background: 'primary',
    kicker: 'UI Kit Italia',
    title: 'Il Design System per la Pubblica Amministrazione',
    subtitle:
      'Costruisci interfacce coerenti, accessibili e conformi alle linee guida di design per i servizi pubblici digitali.',
  },
};

/**
 * Hero con bottoni CTA
 */
export const WithActions: Story = {
  args: {
    variant: 'default',
    background: 'primary',
    kicker: 'Benvenuto',
    title: 'Scopri i nostri servizi digitali',
    subtitle:
      'Accedi facilmente a tutti i servizi della Pubblica Amministrazione direttamente online.',
    actions: [
      { label: 'Inizia ora', href: '#' },
      { label: 'Scopri di più', href: '#', variant: 'tertiary' },
    ],
  },
};

/**
 * Hero allineato a sinistra
 */
export const LeftAligned: Story = {
  args: {
    variant: 'left',
    background: 'primary',
    kicker: 'Servizi online',
    title: 'Gestisci le tue pratiche comodamente da casa',
    subtitle:
      'Risparmia tempo e semplifica la tua vita con i servizi digitali del Comune.',
    actions: [
      { label: 'Accedi ai servizi', href: '#' },
      { label: 'Come funziona', href: '#', variant: 'tertiary' },
    ],
  },
};

/**
 * Hero con immagine affiancata
 */
export const WithImage: Story = {
  args: {
    variant: 'withImage',
    background: 'light',
    kicker: 'Innovazione digitale',
    title: 'La tecnologia al servizio dei cittadini',
    subtitle:
      'Stiamo trasformando il modo in cui interagisci con la Pubblica Amministrazione, rendendo ogni processo più semplice e veloce.',
    imageUrl: placeholderImage,
    imageAlt: 'Team al lavoro su progetti digitali',
    actions: [
      { label: 'Scopri il progetto', href: '#' },
      { label: 'Contattaci', href: '#', variant: 'secondary' },
    ],
  },
};

/**
 * Hero con immagine a sinistra
 */
export const WithImageLeft: Story = {
  args: {
    variant: 'withImage',
    background: 'neutral',
    imagePosition: 'left',
    kicker: 'Chi siamo',
    title: 'Un team dedicato alla trasformazione digitale',
    subtitle:
      'Lavoriamo ogni giorno per migliorare i servizi pubblici digitali e renderli accessibili a tutti.',
    imageUrl: placeholderImage,
    imageAlt: 'Il nostro team',
    actions: [{ label: 'Conosci il team', href: '#' }],
  },
};

/**
 * Hero con immagine di sfondo
 */
export const FullImage: Story = {
  args: {
    variant: 'fullImage',
    size: 'lg',
    title: 'Insieme per un futuro digitale',
    subtitle:
      'La trasformazione digitale della Pubblica Amministrazione inizia qui.',
    imageUrl: placeholderImage,
    imageAlt: 'Background hero',
    actions: [
      { label: 'Partecipa', href: '#', variant: 'secondary' },
      { label: 'Maggiori informazioni', href: '#', variant: 'tertiary' },
    ],
  },
};

// ============================================
// VARIANTI BACKGROUND
// ============================================

/**
 * Background Primary (blu)
 */
export const BackgroundPrimary: Story = {
  args: {
    background: 'primary',
    kicker: 'Servizi',
    title: 'Sfondo Primary',
    subtitle: 'Hero con sfondo blu primary del design system.',
    actions: [{ label: 'Azione', href: '#' }],
  },
};

/**
 * Background Neutral (grigio chiaro)
 */
export const BackgroundNeutral: Story = {
  args: {
    background: 'neutral',
    kicker: 'Servizi',
    title: 'Sfondo Neutral',
    subtitle: 'Hero con sfondo grigio neutro, ideale per pagine interne.',
    actions: [{ label: 'Azione', href: '#' }],
  },
};

/**
 * Background Dark (scuro)
 */
export const BackgroundDark: Story = {
  args: {
    background: 'dark',
    kicker: 'Servizi',
    title: 'Sfondo Dark',
    subtitle: 'Hero con sfondo scuro per massimo contrasto.',
    actions: [{ label: 'Azione', href: '#' }],
  },
};

/**
 * Background Light (bianco)
 */
export const BackgroundLight: Story = {
  args: {
    background: 'light',
    kicker: 'Servizi',
    title: 'Sfondo Light',
    subtitle: 'Hero con sfondo bianco, minimale ed elegante.',
    actions: [{ label: 'Azione', href: '#' }],
  },
};

// ============================================
// DIMENSIONI
// ============================================

/**
 * Dimensione Small
 */
export const SizeSmall: Story = {
  args: {
    size: 'sm',
    background: 'primary',
    title: 'Hero Small',
    subtitle: 'Versione compatta per pagine interne.',
  },
};

/**
 * Dimensione Medium (default)
 */
export const SizeMedium: Story = {
  args: {
    size: 'md',
    background: 'primary',
    title: 'Hero Medium',
    subtitle: 'Dimensione standard per la maggior parte dei casi.',
  },
};

/**
 * Dimensione Large
 */
export const SizeLarge: Story = {
  args: {
    size: 'lg',
    background: 'primary',
    title: 'Hero Large',
    subtitle: 'Versione grande per landing page e home.',
  },
};

// ============================================
// SENZA BOTTONI
// ============================================

/**
 * Senza bottoni - Solo testo
 */
export const WithoutActions: Story = {
  args: {
    variant: 'default',
    background: 'primary',
    kicker: 'Informazioni',
    title: 'Hero senza bottoni',
    subtitle:
      'Questa variante mostra solo il contenuto testuale, utile per pagine informative.',
  },
};

/**
 * Senza kicker
 */
export const WithoutKicker: Story = {
  args: {
    variant: 'default',
    background: 'primary',
    title: 'Hero senza kicker',
    subtitle: 'Questa variante non ha il testo piccolo sopra il titolo.',
    actions: [{ label: 'Scopri', href: '#' }],
  },
};

/**
 * Solo titolo
 */
export const TitleOnly: Story = {
  args: {
    variant: 'default',
    background: 'dark',
    size: 'sm',
    title: 'Solo il titolo',
  },
};

// ============================================
// SHOWCASE
// ============================================

/**
 * Showcase completa di tutte le varianti
 */
export const Showcase: Story = {
  render: () => (
    <div className="space-y-8">
      <Hero
        variant="default"
        background="primary"
        kicker="Default"
        title="Hero Default Centrato"
        subtitle="Testo centrato con sfondo primary"
        actions={[{ label: 'Azione', href: '#' }]}
      />

      <Hero
        variant="left"
        background="neutral"
        kicker="Left"
        title="Hero Allineato a Sinistra"
        subtitle="Testo allineato a sinistra su sfondo neutro"
        actions={[{ label: 'Azione', href: '#' }]}
      />

      <Hero
        variant="withImage"
        background="light"
        kicker="With Image"
        title="Hero con Immagine"
        subtitle="Layout a due colonne con immagine affiancata"
        imageUrl={placeholderImage}
        imageAlt="Placeholder"
        actions={[{ label: 'Azione', href: '#' }]}
      />

      <Hero
        variant="fullImage"
        size="md"
        title="Hero Full Image"
        subtitle="Immagine di sfondo con overlay scuro"
        imageUrl={placeholderImage}
        actions={[{ label: 'Azione', href: '#', variant: 'secondary' }]}
      />
    </div>
  ),
};
