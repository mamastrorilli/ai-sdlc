---
description: Workflow per risolvere automaticamente problemi di accessibilità rilevati da Lighthouse.
---

Segui questi passi per applicare i fix suggeriti da Lighthouse CI:

1. **Analisi Report**: Leggi il file di report generato da Lighthouse (solitamente passato come contesto o presente in `lighthouse-report/`).
2. **Identificazione File**: Usa il mapping in `.context/sdlc.md` per trovare il file sorgente corrispondente allo Story ID fallito.
3. **Applicazione Fix**:
   - Correggi i selettori CSS o gli attributi HTML (ARIA, contrasto, label).
   - Consulta `tokens/colors.ts` per assicurarti di usare i colori corretti per il contrasto.
4. **Verifica Locale**:
   // turbo
   - Esegui `yarn lhci` per verificare che lo score di accessibilità sia ora >= 0.95.
5. **Update**: Se il fix ha cambiato le props o il comportamento del componente, aggiorna `.context/design-system.md`.
