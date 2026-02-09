/**
 * Lighthouse Report Generator for Claude Code Auto-Fix
 *
 * Parses Lighthouse CI results and generates a structured report
 * with source file mappings and fix suggestions for GitHub Issues.
 *
 * Usage:
 *   node scripts/lighthouse-report-generator.mjs [lhci-dir] [output.json] [output.md]
 *
 * Defaults:
 *   - lhci-dir: .lighthouseci
 *   - output.json: lighthouse-report.json
 *   - output.md: lighthouse-issue.md
 */

import fs from 'fs';
import path from 'path';

/**
 * Story ID to file path mapping
 * Pattern: {category}-{component}--{variant} -> src/design-system/{category}/{Component}/{Component}.tsx
 */
function storyIdToFilePath(storyId) {
  if (!storyId) return null;

  const match = storyId.match(/^(atoms|molecules|organisms|templates)-([a-z]+)--/i);
  if (!match) return null;

  const [, category, componentLower] = match;
  const component = componentLower.charAt(0).toUpperCase() + componentLower.slice(1);

  return `src/design-system/${category}/${component}/${component}.tsx`;
}

/**
 * Parse URL to extract story ID
 * http://localhost/iframe.html?id=atoms-button--primary -> atoms-button--primary
 */
function urlToStoryId(url) {
  if (!url) return null;
  const match = url.match(/[?&]id=([^&]+)/);
  return match ? match[1] : null;
}

/**
 * WCAG audit IDs and their fix suggestions
 */
const WCAG_FIX_SUGGESTIONS = {
  'color-contrast': {
    wcag: '1.4.3',
    category: 'Accessibility',
    title: 'Color Contrast',
    commonFixes: [
      'Replace text-white/80 or text-white/90 with text-white',
      'Use higher contrast color tokens from design-system.md',
      'Check background-foreground combination meets 4.5:1 ratio',
    ],
    relatedTokens: ['text-white', 'text-neutral-900', 'bg-primary-500'],
  },
  'button-name': {
    wcag: '4.1.2',
    category: 'Accessibility',
    title: 'Button Name',
    commonFixes: [
      'Add aria-label to button',
      'Add visible text content',
      'Use aria-labelledby for complex buttons',
    ],
  },
  'image-alt': {
    wcag: '1.1.1',
    category: 'Accessibility',
    title: 'Image Alt Text',
    commonFixes: [
      'Add alt attribute to img element',
      'Use empty alt="" for decorative images',
      'Provide descriptive alt text for informative images',
    ],
  },
  'link-name': {
    wcag: '2.4.4',
    category: 'Accessibility',
    title: 'Link Name',
    commonFixes: [
      'Add descriptive link text',
      'Add aria-label to link',
      'Avoid generic text like "click here" or "read more"',
    ],
  },
  'heading-order': {
    wcag: '1.3.1',
    category: 'Accessibility',
    title: 'Heading Order',
    commonFixes: [
      'Ensure headings follow sequential order (h1 -> h2 -> h3)',
      'Do not skip heading levels',
    ],
  },
  'landmark-one-main': {
    wcag: '1.3.1',
    category: 'Accessibility',
    title: 'Main Landmark',
    commonFixes: ['Add <main> element to page', 'Use role="main" on main container'],
  },
  'aria-required-attr': {
    wcag: '4.1.2',
    category: 'Accessibility',
    title: 'ARIA Required Attributes',
    commonFixes: [
      'Add missing required ARIA attributes',
      'Check ARIA role requirements',
    ],
  },
  'aria-valid-attr': {
    wcag: '4.1.2',
    category: 'Accessibility',
    title: 'ARIA Valid Attributes',
    commonFixes: [
      'Remove invalid ARIA attributes',
      'Check attribute spelling',
    ],
  },
};

/**
 * Extract failing audits from Lighthouse result
 */
function extractFailingAudits(lhr, url) {
  const failures = [];
  const storyId = urlToStoryId(url);
  const filePath = storyIdToFilePath(storyId);

  for (const [auditId, audit] of Object.entries(lhr.audits || {})) {
    // Skip passing audits and non-applicable
    if (audit.score === null || audit.score >= 1) continue;
    if (audit.scoreDisplayMode === 'notApplicable') continue;

    const details = audit.details || {};
    const items = details.items || [];

    const failingItems = items
      .map((item) => ({
        selector: item.node?.selector || null,
        snippet: item.node?.snippet || null,
        explanation: item.node?.explanation || item.explanation || null,
        path: item.node?.path || null,
        nodeLabel: item.node?.nodeLabel || null,
      }))
      .filter((i) => i.selector || i.snippet);

    // Only include if there are actual failing elements or score is 0
    if (failingItems.length > 0 || audit.score === 0) {
      failures.push({
        auditId,
        title: audit.title,
        description: audit.description,
        score: audit.score,
        scoreDisplayMode: audit.scoreDisplayMode,
        displayValue: audit.displayValue || null,
        storyId,
        filePath,
        url,
        items: failingItems,
        fixSuggestions: WCAG_FIX_SUGGESTIONS[auditId] || null,
      });
    }
  }

  return failures;
}

/**
 * Generate report from LHCI results directory
 */
export async function generateReport(lhciResultsDir, outputPath) {
  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalFailures: 0,
      byCategory: {},
      byComponent: {},
      byAudit: {},
    },
    failures: [],
    designSystemContext: {
      tokensPath: 'src/design-system/tokens/',
      contrastRules: '.context/design-system.md',
      lighthouseConfig: 'lighthouserc.js',
    },
  };

  // Check if directory exists
  if (!fs.existsSync(lhciResultsDir)) {
    console.warn(`LHCI results directory not found: ${lhciResultsDir}`);
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
    return report;
  }

  // Read all JSON result files from LHCI
  const files = fs
    .readdirSync(lhciResultsDir)
    .filter((f) => f.endsWith('.json') && f.startsWith('lhr-'));

  if (files.length === 0) {
    console.warn('No LHR JSON files found in:', lhciResultsDir);
  }

  for (const file of files) {
    const lhrPath = path.join(lhciResultsDir, file);
    let lhr;

    try {
      lhr = JSON.parse(fs.readFileSync(lhrPath, 'utf8'));
    } catch (e) {
      console.warn(`Failed to parse ${file}:`, e.message);
      continue;
    }

    const url = lhr.requestedUrl || lhr.finalUrl || lhr.finalDisplayedUrl;
    const failures = extractFailingAudits(lhr, url);

    for (const failure of failures) {
      report.failures.push(failure);
      report.summary.totalFailures++;

      // Track by category
      const category = failure.fixSuggestions?.category || 'Other';
      report.summary.byCategory[category] =
        (report.summary.byCategory[category] || 0) + 1;

      // Track by component
      if (failure.filePath) {
        report.summary.byComponent[failure.filePath] =
          (report.summary.byComponent[failure.filePath] || 0) + 1;
      }

      // Track by audit
      report.summary.byAudit[failure.auditId] =
        (report.summary.byAudit[failure.auditId] || 0) + 1;
    }
  }

  // Write report
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

  return report;
}

/**
 * Generate markdown for GitHub Issue
 */
export function generateIssueMD(report, pipelineType = 'design-system') {
  const title = `[Lighthouse Auto-Fix] ${report.summary.totalFailures} accessibility issue(s) detected`;

  if (report.summary.totalFailures === 0) {
    return {
      title: '[Lighthouse] All checks passed',
      body: 'No accessibility issues detected.',
    };
  }

  let body = `## Lighthouse Accessibility Report

**Generated**: ${report.generatedAt}
**Pipeline**: ${pipelineType === 'design-system' ? 'Design System (Storybook)' : 'Web App'}
**Total Issues**: ${report.summary.totalFailures}

### Summary by Component

| Component | Issues |
|-----------|--------|
`;

  for (const [file, count] of Object.entries(report.summary.byComponent)) {
    body += `| \`${file}\` | ${count} |\n`;
  }

  body += `
### Summary by Audit

| Audit | Count | WCAG |
|-------|-------|------|
`;

  for (const [auditId, count] of Object.entries(report.summary.byAudit)) {
    const wcag = WCAG_FIX_SUGGESTIONS[auditId]?.wcag || '-';
    body += `| ${auditId} | ${count} | ${wcag} |\n`;
  }

  body += `
---

## Detailed Failures

`;

  // Group failures by component
  const byComponent = {};
  for (const failure of report.failures) {
    const key = failure.filePath || 'unknown';
    if (!byComponent[key]) byComponent[key] = [];
    byComponent[key].push(failure);
  }

  for (const [filePath, failures] of Object.entries(byComponent)) {
    body += `### \`${filePath}\`

`;
    for (const failure of failures) {
      body += `#### ${failure.title}

- **Audit ID**: \`${failure.auditId}\`
- **Score**: ${failure.score === null ? 'N/A' : Math.round(failure.score * 100)}%
- **Story**: \`${failure.storyId || 'N/A'}\`
${failure.displayValue ? `- **Details**: ${failure.displayValue}\n` : ''}
`;
      if (failure.items.length > 0) {
        body += `
**Failing Elements:**

`;
        for (const item of failure.items.slice(0, 5)) {
          body += `- Selector: \`${item.selector || 'N/A'}\`\n`;
          if (item.snippet) {
            body += `  \`\`\`html
  ${item.snippet}
  \`\`\`
`;
          }
          if (item.explanation) {
            body += `  > ${item.explanation}\n`;
          }
        }
        if (failure.items.length > 5) {
          body += `- ... and ${failure.items.length - 5} more\n`;
        }
      }

      if (failure.fixSuggestions) {
        body += `
**Suggested Fixes (WCAG ${failure.fixSuggestions.wcag}):**
`;
        for (const fix of failure.fixSuggestions.commonFixes) {
          body += `- ${fix}\n`;
        }
      }
      body += '\n---\n\n';
    }
  }

  // Claude Code instructions section
  const filesToModify = Object.keys(report.summary.byComponent)
    .map((f) => `- \`${f}\``)
    .join('\n');

  body += `## Claude Code Fix Instructions

To fix these issues automatically, run Claude Code with the following context:

\`\`\`bash
# Open Claude Code in the repo root
claude
\`\`\`

Then paste this prompt:

\`\`\`markdown
Fix the Lighthouse accessibility issues in this repository.

**Context files to read:**
- \`.context/design-system.md\` - Design tokens and contrast rules
- \`lighthouserc.js\` - Lighthouse CI thresholds
- This GitHub Issue (already provided)

**Files to modify:**
${filesToModify}

**Rules:**
1. Use only tokens from design-system.md (no hardcoded HEX values)
2. WCAG AA contrast: 4.5:1 for normal text, 3:1 for large text
3. Use \`text-white\` instead of \`text-white/80\` or \`text-white/90\` on dark backgrounds
4. Every interactive element needs an accessible name
5. Run \`yarn lhci\` after fixes to verify

**Priority:** Accessibility score must be >= 0.95 (current threshold)
\`\`\`

### Quick Fix Commands

\`\`\`bash
# Build Storybook and run Lighthouse locally
yarn build-storybook && yarn lhci

# Run just accessibility tests
yarn test-storybook:ci
\`\`\`

---

**Labels**: \`accessibility\`, \`lighthouse\`, \`auto-fix\`, \`claude-code\`
`;

  return { title, body };
}

// CLI entry point
const isMainModule =
  process.argv[1] &&
  (process.argv[1].endsWith('lighthouse-report-generator.mjs') ||
    process.argv[1].includes('lighthouse-report-generator'));

if (isMainModule) {
  const args = process.argv.slice(2);
  const lhciDir = args[0] || '.lighthouseci';
  const outputJson = args[1] || 'lighthouse-report.json';
  const outputMd = args[2] || 'lighthouse-issue.md';

  console.log(`Parsing LHCI results from: ${lhciDir}`);

  const report = await generateReport(lhciDir, outputJson);
  const { title, body } = generateIssueMD(report);

  fs.writeFileSync(outputMd, `# ${title}\n\n${body}`);

  console.log(`Report generated: ${outputJson}`);
  console.log(`Issue MD generated: ${outputMd}`);
  console.log(`Total failures: ${report.summary.totalFailures}`);

  // Exit with error code if there are failures (for CI)
  process.exit(report.summary.totalFailures > 0 ? 1 : 0);
}
