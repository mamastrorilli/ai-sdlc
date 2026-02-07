# Design System AI-Driven (Next.js + Figma MCP)

Questo repository è un ambiente pre-configurato per lo sviluppo di un Design System moderno, integrato con **Figma Dev Mode (via MCP)** e ottimizzato per workflow guidati dall'Intelligenza Artificiale (Claude Code).

## 🚀 Stack Tecnologico
- **Framework**: Next.js 15+ (App Router, React 19)
- **Styling**: Tailwind CSS v4
- **Linguaggio**: TypeScript
- **Documentazione & Testing**: Storybook 10 + Playwright + Vitest
- **Architettura**: Atomic Design (Atoms, Molecules, Organisms, Templates)

---

## 🛠️ Setup Iniziale Eseguito

In questa fase di bootstrap, l'AI Lead Engineer ha predisposto l'infrastruttura senza creare componenti UI reali, preparando il terreno per l'automazione Figma-to-Code.

### 1. Architettura Atomic Design
Organizzata sotto `src/design-system/` con la seguente struttura:
- `atoms/`, `molecules/`, `organisms/`, `templates/`: Cartelle pronte ad ospitare i componenti.
- `tokens/`: Gestione centralizzata di colori, tipografia e spaziature (mapping Figma).
- **Barrel Strategy**: Ogni cartella contiene un `index.ts` per export puliti, facilitando l'auto-import da parte dell'AI.

### 2. Storybook & Quality Pipeline
- **Storybook 10**: Configurato per Next.js 15 e Tailwind v4. Supporta nativamente le `Play functions` per il testing delle interazioni.
- **CI/CD Quality Gates**:
  - `npm run lint`: ESLint con regole Next.js e Storybook.
  - `npm run check`: Validazione tipi TypeScript.
  - `npm run test`: Unit testing con Vitest.
  - `npm run test-storybook`: Test runner per le interazioni UI.
  - `npm run format`: Prettier per la consistenza del codice.

### 3. Infrastruttura "AI Context" (VIVO)
È stato creato un sistema di file per istruire Claude Code e altri modelli AI su come operare:
- **`CLAUDE.md`**: Il cuore del contesto. Contiene le regole di sviluppo e il registro dinamico dei componenti.
- **`.context/design-system.md`**: Mantiene il mapping tra gli ID di Figma e i file nel codice.
- **`.context/sdlc.md`**: Definisce le tappe del "Figma → Code → Docs" workflow.
- **`.context/skills/`**: Script e istruzioni specializzate (Figma integration, Design Rules).

---

## 🔄 Il Workflow "Figma → AI → Code"

Il progetto è progettato per questo flusso di lavoro:
1. **Figma Dev Mode**: Si seleziona un componente in Figma.
2. **Claude Code (MCP)**: L'AI legge via tool MCP le proprietà CSS e i token.
3. **Generazione**: L'AI genera il componente React (`.tsx`), i token Tailwind e la Story dedicata.
4. **Auto-Update**: L'AI aggiorna autonomamente `CLAUDE.md` e le documentazioni di contesto.

---

## 📦 Script Disponibili
- `npm run dev`: Avvia l'app Next.js.
- `npm run storybook`: Avvia l'ambiente di documentazione a http://localhost:6006.
- `npm run build-storybook`: Build statico di Storybook.
- `npm run test-storybook`: Esegue i test funzionali sulle stories.
- `npm run lint` / `npm run check`: Controlli di qualità.
