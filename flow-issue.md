# [Lighthouse Auto-Fix] User Flow - 9 issue(s) detected

## Lighthouse User Flow Report

**Generated**: 2026-02-10T17:32:03.530Z
**Pipeline**: Web App User Flow
**Total Issues**: 9

### Scores Summary

| Step | Performance | Accessibility |
|------|-------------|---------------|
| Navigation report (localhost/) |  73% |  98% |
| Timespan report (localhost/) |  100% |  NaN% |

### Issues by Audit

| Audit | Count | WCAG |
|-------|-------|------|
| layout-shifts | 1 | - |
| landmark-one-main | 1 | - |
| unused-javascript | 1 | - |
| cls-culprits-insight | 1 | - |
| image-delivery-insight | 1 | - |
| lcp-discovery-insight | 1 | - |
| legacy-javascript-insight | 1 | - |
| network-dependency-tree-insight | 1 | - |
| render-blocking-insight | 1 | - |

### Affected Files

- `src/app/page.tsx`
- `src/design-system/organisms/Hero/Hero.tsx`
- `src/design-system/organisms/Footer/Footer.tsx`

---

## Detailed Failures

### Navigation report (localhost/)

**URL**: `http://localhost:3000/`
**Files**: `src/app/page.tsx`, `src/design-system/organisms/Hero/Hero.tsx`, `src/design-system/organisms/Footer/Footer.tsx`

#### Avoid large layout shifts

- **Audit**: `layout-shifts`
- **Score**: 0%
- **Details**: 1 layout shift found


**Failing Elements (1 total):**

<details>
<summary><strong>1. DESIGN SYSTEM
AI SDLC

Un Design System moderno costruito con AI-assisted devel…</strong></summary>

**CSS Selector:** `body.titillium_web_79d31269-module__n7szFG__variable > div.min-h-screen > section.overflow-hidden`

**DOM Path:** `2,HTML,1,BODY,1,DIV,1,SECTION`

**HTML:**
```html
<section aria-labelledby="_R_2avb_" class="overflow-hidden bg-[var(--color-primary-500)] text-white  ">
```

**Location:** top: 400px, left: 0px, width: 412px, height: 850px

</details>


#### Document does not have a main landmark.

- **Audit**: `landmark-one-main`
- **Score**: 0%


**Failing Elements (1 total):**

<details>
<summary><strong>1. html</strong></summary>

**CSS Selector:** `html`

**DOM Path:** `2,HTML`

**HTML:**
```html
<html lang="it">
```

**Problem:** Fix all of the following:
  Document does not have a main landmark

**Location:** top: 0px, left: 0px, width: 412px, height: 3086px

</details>


#### Reduce unused JavaScript

- **Audit**: `unused-javascript`
- **Score**: 0%
- **Details**: Est savings of 51 KiB


#### Layout shift culprits

- **Audit**: `cls-culprits-insight`
- **Score**: 0%


#### Improve image delivery

- **Audit**: `image-delivery-insight`
- **Score**: 50%
- **Details**: Est savings of 8 KiB


**Failing Elements (1 total):**

<details>
<summary><strong>1. Neural network and artificial intelligence conceptual background</strong></summary>

**CSS Selector:** `div.w-full > div.flex > div.flex-1 > img.object-cover`

**DOM Path:** `2,HTML,1,BODY,1,DIV,1,SECTION,0,DIV,0,DIV,1,DIV,0,IMG`

**HTML:**
```html
<img alt="Neural network and artificial intelligence conceptual background" loading="lazy" decoding="async" data-nimg="fill" class=" object-cover" style="position: absolute; height: 100%; width: 100%; inset: 0px;" sizes="(max-width: 768px) 100vw, 50vw" srcset="/_next/image?url=%2Fimages%2Fhero-banner-hp.jpg&amp;w=384&amp;q=75 384w, /_next/im…" src="http://localhost:3000/_next/image?url=%2Fimages%2Fhero-banner-hp.jpg&amp;w=750…">
```

**Location:** top: 850px, left: 0px, width: 412px, height: 400px

</details>


#### LCP request discovery

- **Audit**: `lcp-discovery-insight`
- **Score**: 0%


#### Legacy JavaScript

- **Audit**: `legacy-javascript-insight`
- **Score**: 0%
- **Details**: Est savings of 13 KiB


#### Network dependency tree

- **Audit**: `network-dependency-tree-insight`
- **Score**: 0%


#### Render blocking requests

- **Audit**: `render-blocking-insight`
- **Score**: 0%
- **Details**: Est savings of 110 ms



### Recommendations

- Run yarn test-storybook:ci for detailed a11y tests

---

## Claude Code Fix Instructions

```bash
claude
```

Then provide this context:

```markdown
Fix the Lighthouse User Flow issues in this repository.

**Context files to read:**
- `.context/design-system.md` - Design tokens and contrast rules
- This GitHub Issue

**Files to modify:**
- `src/app/page.tsx`
- `src/design-system/organisms/Hero/Hero.tsx`
- `src/design-system/organisms/Footer/Footer.tsx`

**Specific Issues to Fix:**
1. **layout-shifts** at `body.titillium_web_79d31269-module__n7szFG__variable > div.min-h-screen > section.overflow-hidden`
   - Element: `<section aria-labelledby="_R_2avb_" class="overflow-hidden bg-[var(--color-prima...`
2. **landmark-one-main** at `html`
   - Problem: Fix all of the following:
   - Element: `<html lang="it">`
3. **image-delivery-insight** at `div.w-full > div.flex > div.flex-1 > img.object-cover`
   - Element: `<img alt="Neural network and artificial intelligence conceptual background" load...`

**Focus areas:**
1. Accessibility issues during page load
2. Performance during scroll interactions
3. CLS (Cumulative Layout Shift) during navigation

**Verification:**
Run `node scripts/lighthouse-flow.mjs` after fixes.
```

### Quick Commands

```bash
# Start dev server and run flow test
yarn build && yarn start &
npx wait-on tcp:3000 && node scripts/lighthouse-flow.mjs
```

---

**Labels**: `accessibility`, `lighthouse`, `auto-fix`, `claude-code`, `web-app`
