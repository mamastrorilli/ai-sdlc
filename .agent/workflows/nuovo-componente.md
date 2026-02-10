---
description: Pipeline per la creazione di un nuovo componente atomico o molecolare.
---

Segui questi passi per creare un nuovo componente e mantenere il contesto aggiornato:

1. **Analisi Requisiti**: Leggi `.context/design-system.md` per verificare i token (colori, spacing, typo) corretti.
2. **Creazione File**: Crea la cartella in `src/design-system/[livello]/[NomeComponente]` con:
   - `[NomeComponente].tsx`
   - `[NomeComponente].module.css` (se necessario)
   - `[NomeComponente].stories.tsx`
3. **Storybook**: Implementa le varianti principali e aggiungi una `play` function per i test di interazione.
4. **Aggiornamento Contesto**: 
   // turbo
   - Aggiorna `CLAUDE.md` se sono stati aggiunti nuovi componenti o regole.
   - Esegui una scansione del nuovo componente e aggiorna la sezione "Mapping Componenti" in `.context/design-system.md`.
5. **Verifica**:
   // turbo
   - Esegui `yarn lint` e `yarn test` per assicurarti che tutto sia corretto.
6. **Lighthouse**: Se il componente impatta una pagina principale, esegui `yarn lhci` localmente per controllare l'accessibilità.
