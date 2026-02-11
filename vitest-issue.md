# [Vitest A11y] 1 accessibility test(s) failed

## Vitest Accessibility Report (Storybook)

**Generated**: 2026-02-11T17:49:55.360Z
**Source**: vitest (@storybook/addon-vitest)
**Failed Tests**: 1
**Total Violations**: 0

### Summary by Component

| Component | Failed Tests |
|-----------|--------------|
| `src/design-system/atoms/BackToTop/BackToTop.tsx` | 1 |

---

## Detailed Failures

### Unknown

- **File**: `src/design-system/atoms/BackToTop/BackToTop.tsx`
- **Story**: `src/design-system/atoms/BackToTop/BackToTop.stories.tsx`
- **Issue Type**: unknown

**Error Message:**
```

```

**HTML Snippet:**
```html
<button
    class="fixed bottom-6 right-6 z-[var(--z-fixed)] rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary-500)] opacity-0 scale-75 pointer-events-none bg-[#CCCCCC] text-[#AAAAAA] hover:bg-[#BBBBBB] active:bg-[#AAAAAA] w-12 h-12"
    data-duration="800"
    type="button"
  />

  --------------------------------------------------

Ignored nodes: comments, script, style
<div>
  <div
    style="min-height: 200px; padding: 2rem; position: relative;"
  >
    <button
      class="fixed bottom-6 right-6 z-[var(--z-fixed)] rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary-500)] opacity-0 scale-75 pointer-events-none bg-[#CCCCCC] text-[#AAAAAA] hover:bg-[#BBBBBB] active:bg-[#AAAAAA] w-12 h-12"
      data-duration="800"
      type="button"
    >
      <svg
        aria-hidden="true"
        class="lucide lucide-arrow-up w-5 h-5"
        fill="none"
        height="20"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m5 12 7-7 7 7"
        />
        <path
          d="M12 19V5"
        />
      </svg>
    </button>
```

---

## Claude Code Fix Instructions

To fix these issues automatically, run Claude Code with the following context:

```bash
claude
```

Then paste this prompt:

```markdown
Fix the accessibility test failures in this repository.

**Context files to read:**
- `.context/design-system.md` - Design tokens and contrast rules
- This GitHub Issue (already provided)

**Files to modify:**
- `src/design-system/atoms/BackToTop/BackToTop.tsx`

**Common Issues:**
1. **button-name**: The ariaLabel prop is destructured but not applied to the button's aria-label attribute
2. **color-contrast**: Use proper contrast ratios (4.5:1 for normal text)
3. **accessible-name**: Ensure all interactive elements have accessible names

**Rules:**
1. Use only tokens from design-system.md (no hardcoded HEX values)
2. WCAG AA contrast: 4.5:1 for normal text, 3:1 for large text
3. Every interactive element needs an accessible name
4. Run `yarn test` after fixes to verify

**Priority:** All accessibility tests must pass
```

### Quick Fix Commands

```bash
# Run accessibility tests locally
yarn test

# Run tests in watch mode
yarn test --watch
```

---

**Labels**: `accessibility`, `vitest`, `auto-fix`, `claude-code`
