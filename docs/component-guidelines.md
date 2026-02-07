# Component Guidelines

Linee guida per la creazione di componenti di alta qualità.

## Principi
- **Dumb Components**: Mantieni la logica fuori dai componenti visuali il più possibile.
- **Single Responsibility**: Un componente fa una cosa sola.
- **Prop Drilling**: Evita il drilling eccessivo, usa Context o Composition se necessario (soprattutto per Organisms).

## Testing (Storybook Play Functions)
Ogni interazione critica deve essere testata nella story.
Esempio:
```typescript
play: async ({ canvasElement, step }) => {
  const canvas = findByRole(canvasElement, 'button');
  await step('Click on button', async () => {
    await userEvent.click(canvas);
    // expect statements
  });
}
```

## Struttura File
```text
Component/
├── Component.tsx
├── Component.stories.tsx
├── index.ts (barrel)
└── types.ts (se complesso)
```

## Barrel Exports
Non dimenticare di esportare il nuovo componente nel file `index.ts` della categoria corrispondente (es. `src/design-system/atoms/index.ts`).
