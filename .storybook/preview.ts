/**
 * Configurazione del rendering delle story in Storybook.
 * Gestisce i parametri globali, i decoratori (come gli stili CSS globali) 
 * e le impostazioni degli addon, come il controllo dell'accessibilità.
 */
import type { Preview } from '@storybook/nextjs-vite';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only (dev)
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      // Usa 'error' in CI per bloccare build con violazioni a11y
      test: process.env.CI ? 'error' : 'todo'
    }
  },
};

export default preview;