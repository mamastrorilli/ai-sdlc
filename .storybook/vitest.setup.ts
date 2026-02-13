/**
 * File di setup per l'integrazione tra Storybook e Vitest.
 * Assicura che le configurazioni definite in preview.ts (come le regole a11y)
 * siano applicate correttamente durante l'esecuzione dei test automatizzati.
 */
import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import { setProjectAnnotations } from '@storybook/nextjs-vite';
import * as projectAnnotations from './preview';

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);