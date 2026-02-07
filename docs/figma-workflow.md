# Guida Workflow Figma → Claude

Questa guida spiega come utilizzare Claude per generare componenti dal Design System di Figma.

## Requisiti
- Accesso al file Figma.
- Claude Code configurato con MCP Figma server.

## Procedura
1. Copia il link del componente o del frame in Figma.
2. Invia a Claude: "Crea il componente [Nome] da questo link Figma: [URL]".
3. Claude analizzerà:
    - Token (Colore, Typo, Spacing).
    - Varianti (Primary, Secondary, Small, Large, Hover, Active).
    - Auto-layout per generare classi Flex/Grid Tailwind.
4. Rivedi il codice generato e la Storybook story.

## Risoluzione Problemi
- Se i colori non corrispondono, verifica che siano definiti come "Styles" o "Variables" in Figma.
- Se la struttura è troppo complessa, chiedi a Claude di scomporla in Atomi e Molecole.
