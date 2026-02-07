# Skill: Figma Workflow

Istruzioni per l'AI su come gestire la transizione da Figma a Codice.

## Trigger
Ogni volta che l'utente chiede di creare un componente partendo da un link Figma o un node ID.

## Step Operativi
1. **Fetch**: Usa `figma_mcp.get_component` (o analogo) per ottenere i dati.
2. **Interpretazione**:
    - Identifica il livello atomico (Atom, Molecule, Organism).
    - Mappa i colori e le ombre ai token esistenti in `design-system/tokens`.
    - Estrai le prop dinamiche (testi, stati, varianti).
3. **Drafting**: Scrivi il file `.tsx` seguendo le `design-rules.md`.
4. **Stories**: Genera automaticamente una story con tutte le varianti trovate in Figma.
5. **Sync**: Notifica l'utente del completamento e aggiorna i file di contesto.
