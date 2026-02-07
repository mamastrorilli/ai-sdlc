# Skill: Design Rules

Consistenze e standard per il codice UI del progetto.

## Styling (Tailwind CSS v4)
- Preferire le classi utility di Tailwind.
- Non usare stili inline a meno di calcoli dinamici complessi.
- Usare `clsx` o `tailwind-merge` per la gestione condizionale delle classi.

## Struttura Componente
```tsx
import { FC } from 'react';

interface Props {
  // props types
}

export const ComponentName: FC<Props> = ({ ...props }) => {
  return (
    <div className="...">
      {/* implementation */}
    </div>
  );
};
```

## Atomic Design
- **Atoms**: Componenti indivisibili (Button, Icon). Non contengono logica di business.
- **Molecules**: Insieme di atomi (SearchBar = Input + Button). Gestiscono interazioni semplici.
- **Organisms**: Sezioni complesse (Header, Footer). Possono contenere logica di fetching o stato globale.
- **Templates**: Layout di pagina (senza dati reali, solo slot).

## Accessibilità
- Pulsanti devono avere `type="button"` o `submit`.
- Icone decorative devono avere `aria-hidden="true"`.
- Focus states devono essere sempre visibili e coerenti.
