/**
 * Axe-Core Report Generator for Claude Code Auto-Fix
 *
 * Parses Storybook test-runner (axe-core) results and generates a structured report
 * with source file mappings and fix suggestions for GitHub Issues.
 *
 * Usage:
 *   node scripts/axe-report-generator.mjs [jest-output.json] [output.json] [output.md]
 *
 * Defaults:
 *   - jest-output.json: axe-results.json
 *   - output.json: axe-report.json
 *   - output.md: axe-issue.md
 */

import fs from 'fs';

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
 * Extract story ID from test name
 * "Atoms/Button/Primary" -> "atoms-button--primary"
 */
function testNameToStoryId(testName) {
  if (!testName) return null;

  // Handle format like "Atoms/Button/Primary" or "atoms-button--primary"
  const parts = testName.split('/').map(p => p.toLowerCase().trim());
  if (parts.length >= 3) {
    return `${parts[0]}-${parts[1]}--${parts[2]}`;
  }

  // Already in story ID format
  if (testName.includes('--')) {
    return testName.toLowerCase();
  }

  return null;
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
  'focusable-content': {
    wcag: '2.1.1',
    category: 'Accessibility',
    title: 'Focusable Content',
    commonFixes: [
      'Add tabindex="0" to interactive elements',
      'Use semantic HTML elements like <button> or <a>',
      'Ensure custom interactive elements are keyboard accessible',
    ],
  },
  'focus-order-semantics': {
    wcag: '2.4.3',
    category: 'Accessibility',
    title: 'Focus Order',
    commonFixes: [
      'Ensure focus order follows visual/logical order',
      'Avoid positive tabindex values',
      'Use DOM order to control focus sequence',
    ],
  },
};

/**
 * Parse axe-core violation from Jest error message
 */
function parseAxeViolation(message) {
  const violations = [];

  // Pattern: "Expected no accessibility violations but found X:"
  // Followed by violation details
  const violationMatch = message.match(/Expected.*accessibility violations.*found (\d+)/i);
  if (!violationMatch) return violations;

  // Extract individual violations
  // Format varies but typically includes rule ID and elements
  const ruleMatches = message.matchAll(/- ([a-z-]+)(?:\s*\([^)]+\))?:\s*([^\n]+)/gi);
  for (const match of ruleMatches) {
    const ruleId = match[1].toLowerCase();
    const description = match[2];

    violations.push({
      ruleId,
      description,
      fixSuggestions: WCAG_FIX_SUGGESTIONS[ruleId] || null,
    });
  }

  // Also try to extract from detailed format
  // "VIOLATION: color-contrast"
  const detailedMatches = message.matchAll(/VIOLATION:\s*([a-z-]+)/gi);
  for (const match of detailedMatches) {
    const ruleId = match[1].toLowerCase();
    if (!violations.find(v => v.ruleId === ruleId)) {
      violations.push({
        ruleId,
        description: '',
        fixSuggestions: WCAG_FIX_SUGGESTIONS[ruleId] || null,
      });
    }
  }

  // Extract HTML snippets if present
  const snippetMatches = message.matchAll(/<[^>]+>/g);
  const snippets = [...snippetMatches].map(m => m[0]);

  // Extract selectors if present
  const selectorMatches = message.matchAll(/selector:\s*["']?([^"'\n]+)["']?/gi);
  const selectors = [...selectorMatches].map(m => m[1]);

  return violations.map((v, i) => ({
    ...v,
    snippet: snippets[i] || null,
    selector: selectors[i] || null,
  }));
}

/**
 * Parse Jest JSON output for test failures
 */
function parseJestResults(jestOutput) {
  const failures = [];

  if (!jestOutput || !jestOutput.testResults) {
    return failures;
  }

  for (const testFile of jestOutput.testResults) {
    for (const assertion of testFile.assertionResults || []) {
      if (assertion.status !== 'failed') continue;

      const testName = assertion.ancestorTitles?.join('/') + '/' + assertion.title;
      const storyId = testNameToStoryId(testName);
      const filePath = storyIdToFilePath(storyId);

      // Parse error messages for axe violations
      const errorMessages = assertion.failureMessages || [];
      const allViolations = [];

      for (const msg of errorMessages) {
        const violations = parseAxeViolation(msg);
        allViolations.push(...violations);
      }

      if (allViolations.length > 0 || errorMessages.some(m => m.includes('accessibility'))) {
        failures.push({
          testName,
          storyId,
          filePath,
          testFile: testFile.name,
          violations: allViolations,
          rawMessages: errorMessages,
        });
      }
    }
  }

  return failures;
}

/**
 * Parse plain text output when JSON is not available
 */
function parseTextOutput(text) {
  const failures = [];

  // Match test failures
  // Pattern: "✕ Story/Name (123ms)"
  const testFailurePattern = /✕\s+([^\n(]+)\s*\(\d+\s*ms\)/g;
  const matches = text.matchAll(testFailurePattern);

  for (const match of matches) {
    const testName = match[1].trim();
    const storyId = testNameToStoryId(testName);
    const filePath = storyIdToFilePath(storyId);

    // Try to extract violations after this test
    const startIdx = match.index + match[0].length;
    const nextTestIdx = text.indexOf('✕', startIdx);
    const section = text.slice(startIdx, nextTestIdx > 0 ? nextTestIdx : startIdx + 2000);

    const violations = parseAxeViolation(section);

    failures.push({
      testName,
      storyId,
      filePath,
      testFile: null,
      violations,
      rawMessages: [section.trim()],
    });
  }

  return failures;
}

/**
 * Generate structured report
 */
export function generateReport(input, outputPath) {
  const report = {
    generatedAt: new Date().toISOString(),
    source: 'axe-core (Storybook test-runner)',
    summary: {
      totalFailures: 0,
      totalViolations: 0,
      byCategory: {},
      byComponent: {},
      byRule: {},
    },
    failures: [],
    designSystemContext: {
      tokensPath: 'src/design-system/tokens/',
      contrastRules: '.context/design-system.md',
    },
  };

  let failures = [];

  // Try to parse as JSON first
  if (typeof input === 'object') {
    failures = parseJestResults(input);
  } else if (typeof input === 'string') {
    try {
      const json = JSON.parse(input);
      failures = parseJestResults(json);
    } catch {
      // Parse as text
      failures = parseTextOutput(input);
    }
  }

  report.failures = failures;
  report.summary.totalFailures = failures.length;

  for (const failure of failures) {
    // Track by component
    if (failure.filePath) {
      report.summary.byComponent[failure.filePath] =
        (report.summary.byComponent[failure.filePath] || 0) + 1;
    }

    // Track by rule
    for (const violation of failure.violations) {
      report.summary.totalViolations++;
      report.summary.byRule[violation.ruleId] =
        (report.summary.byRule[violation.ruleId] || 0) + 1;

      const category = violation.fixSuggestions?.category || 'Other';
      report.summary.byCategory[category] =
        (report.summary.byCategory[category] || 0) + 1;
    }
  }

  if (outputPath) {
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  }

  return report;
}

/**
 * Generate markdown for GitHub Issue
 */
export function generateIssueMD(report) {
  const title = `[Axe-Core Auto-Fix] ${report.summary.totalFailures} accessibility test(s) failed`;

  if (report.summary.totalFailures === 0) {
    return {
      title: '[Axe-Core] All accessibility tests passed',
      body: 'No accessibility issues detected.',
    };
  }

  let body = `## Axe-Core Accessibility Report (Storybook)

**Generated**: ${report.generatedAt}
**Source**: ${report.source}
**Failed Tests**: ${report.summary.totalFailures}
**Total Violations**: ${report.summary.totalViolations}

### Summary by Component

| Component | Failed Tests |
|-----------|--------------|
`;

  for (const [file, count] of Object.entries(report.summary.byComponent)) {
    body += `| \`${file}\` | ${count} |\n`;
  }

  if (Object.keys(report.summary.byRule).length > 0) {
    body += `
### Summary by Rule

| Rule | Count | WCAG |
|------|-------|------|
`;

    for (const [ruleId, count] of Object.entries(report.summary.byRule)) {
      const wcag = WCAG_FIX_SUGGESTIONS[ruleId]?.wcag || '-';
      body += `| ${ruleId} | ${count} | ${wcag} |\n`;
    }
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
      body += `#### ${failure.testName}

- **Story ID**: \`${failure.storyId || 'N/A'}\`
`;

      if (failure.violations.length > 0) {
        body += `
**Violations:**

`;
        for (const violation of failure.violations) {
          body += `- **${violation.ruleId}**`;
          if (violation.fixSuggestions) {
            body += ` (WCAG ${violation.fixSuggestions.wcag})`;
          }
          body += '\n';

          if (violation.description) {
            body += `  ${violation.description}\n`;
          }
          if (violation.selector) {
            body += `  - Selector: \`${violation.selector}\`\n`;
          }
          if (violation.snippet) {
            body += `  - Snippet: \`${violation.snippet}\`\n`;
          }

          if (violation.fixSuggestions) {
            body += `  - **Suggested fixes:**\n`;
            for (const fix of violation.fixSuggestions.commonFixes) {
              body += `    - ${fix}\n`;
            }
          }
        }
      }

      body += '\n---\n\n';
    }
  }

  // Claude Code instructions
  const filesToModify = Object.keys(report.summary.byComponent)
    .map((f) => `- \`${f}\``)
    .join('\n');

  body += `## Claude Code Fix Instructions

To fix these issues automatically, run Claude Code with the following context:

\`\`\`bash
claude
\`\`\`

Then paste this prompt:

\`\`\`markdown
Fix the axe-core accessibility test failures in this repository.

**Context files to read:**
- \`.context/design-system.md\` - Design tokens and contrast rules
- This GitHub Issue (already provided)

**Files to modify:**
${filesToModify}

**Rules:**
1. Use only tokens from design-system.md (no hardcoded HEX values)
2. WCAG AA contrast: 4.5:1 for normal text, 3:1 for large text
3. Use \`text-white\` instead of \`text-white/80\` on dark backgrounds
4. Every interactive element needs an accessible name
5. Run \`yarn test-storybook:ci\` after fixes to verify

**Priority:** All accessibility tests must pass
\`\`\`

### Quick Fix Commands

\`\`\`bash
# Build Storybook and run accessibility tests locally
yarn build-storybook && yarn test-storybook:ci

# Run tests in dev mode
yarn storybook & yarn test-storybook
\`\`\`

---

**Labels**: \`accessibility\`, \`axe-core\`, \`auto-fix\`, \`claude-code\`
`;

  return { title, body };
}

// CLI entry point
const isMainModule =
  process.argv[1] &&
  (process.argv[1].endsWith('axe-report-generator.mjs') ||
    process.argv[1].includes('axe-report-generator'));

if (isMainModule) {
  const args = process.argv.slice(2);
  const inputFile = args[0] || 'axe-results.json';
  const outputJson = args[1] || 'axe-report.json';
  const outputMd = args[2] || 'axe-issue.md';

  console.log(`Parsing axe-core results from: ${inputFile}`);

  let input;
  if (fs.existsSync(inputFile)) {
    input = fs.readFileSync(inputFile, 'utf8');
  } else {
    console.warn(`Input file not found: ${inputFile}`);
    console.log('Attempting to read from stdin...');
    input = fs.readFileSync(0, 'utf8'); // Read from stdin
  }

  const report = generateReport(input, outputJson);
  const { title, body } = generateIssueMD(report);

  fs.writeFileSync(outputMd, `# ${title}\n\n${body}`);

  console.log(`Report generated: ${outputJson}`);
  console.log(`Issue MD generated: ${outputMd}`);
  console.log(`Total failures: ${report.summary.totalFailures}`);
  console.log(`Total violations: ${report.summary.totalViolations}`);

  // Exit with error code if there are failures (for CI)
  process.exit(report.summary.totalFailures > 0 ? 1 : 0);
}
