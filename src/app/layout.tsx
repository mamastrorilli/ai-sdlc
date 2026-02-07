import type { Metadata } from "next";
import { Titillium_Web, Roboto_Mono } from "next/font/google";
import "./globals.css";

const titillium = Titillium_Web({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI SDLC - Design System",
  description: "Design System moderno costruito con AI-assisted development. Integrazione Figma, componenti accessibili e pipeline CI/CD automatizzata.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${titillium.variable} ${robotoMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
