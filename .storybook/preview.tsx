import React from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import { Titillium_Web, Roboto_Mono } from 'next/font/google';
import '../src/app/globals.css';

const titillium = Titillium_Web({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: process.env.CI ? 'error' : 'todo',
    },
  },
  decorators: [
    (Story) => (
      <div className={`${titillium.variable} ${robotoMono.variable} font-sans antialiased`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;