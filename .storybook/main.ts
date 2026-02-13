/**
 * Configurazione principale di Storybook.
 * Definisce dove trovare le story, quali addon caricare (a11y, docs, vitest, ecc.)
 * e il framework utilizzato (Next.js con Vite) per il design system.
 */
import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.tsx",
    "../src/**/*.stories.ts",
    "../src/**/*.stories.jsx",
    "../src/**/*.stories.js"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/nextjs-vite",
  "staticDirs": [
    "../public"
  ]
};
export default config;