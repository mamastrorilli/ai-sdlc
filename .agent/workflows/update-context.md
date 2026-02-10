---
description: Pipeline per aggiornare i file di contesto (design-system.md e CLAUDE.md).
---

Utilizza questo workflow quando apporti modifiche strutturali o aggiungi nuovi elementi al Design System:

1. **Scansione**: Analizza `src/design-system` per trovare differenze rispetto a `.context/design-system.md`.
2. **Update Mapping**: 
   // turbo
   - Aggiorna le tabelle dei componenti in `.context/design-system.md` (Props, Varianti, Utilizzo).
3. **Sync Instructions**: 
   // turbo
   - Assicurati che `CLAUDE.md` abbia gli stessi indici dei componenti aggiornati.
4. **Verifica**: Controlla che tutti i link e i percorsi dei file nei documenti siano corretti.
