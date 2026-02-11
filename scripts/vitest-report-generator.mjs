/**
 * Vitest Report Generator for Claude Code Auto-Fix
 *
 * Parses Vitest (@storybook/addon-vitest) output and generates a structured report
 * with source file mappings and fix suggestions for GitHub Issues.
 *
 * Usage:
 *   node scripts/vitest-report-generator.mjs [vitest-output.txt] [output.json] [output.md]
 */

import fs from 'fs';

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
  },
  'button-name': {
    wcag: '4.1.2',
    category: 'Accessibility',
    title: 'Button Name',
    commonFixes: [
      'Add aria-label to button element',
      'Add visible text content to button',
      'Ensure ariaLabel prop is applied to the DOM element',
    ],
  },
  'accessible-name': {
    wcag: '4.1.2',
    category: 'Accessibility',
    title: 'Accessible Name',
    commonFixes: [
      'Add aria-label attribute',
      'Add visible text content',
      'Ensure label prop is passed to Icon/SVG elements',
    ],
  },
  'image-alt': {
    wcag: '1.1.1',
    category: 'Accessibility',
    title: 'Image Alt Text',
    commonFixes: [
      'Add alt attribute to img element',
      'Use empty alt="" for decorative images',
    ],
  },
  'link-name': {
    wcag: '2.4.4',
    category: 'Accessibility',
    title: 'Link Name',
    commonFixes: [
      'Add descriptive link text',
      'Add aria-label to link',
    ],
  },
};

/**
 * Detect issue type from error message
 */
function detectIssueType(errorMessage) {
  if (errorMessage.includes('Unable to find an accessible element')) {
    if (errorMessage.includes('role "button"')) {
      return 'button-name';
    }
    if (errorMessage.includes('role "link"')) {
      return 'link-name';
    }
    return 'accessible-name';
  }
  if (errorMessage.includes('color-contrast') || errorMessage.includes('contrast')) {
    return 'color-contrast';
  }
  if (errorMessage.includes('alt') && errorMessage.includes('image')) {
    return 'image-alt';
  }
  return 'unknown';
}

/**
 * Parse vitest text output for test failures
 */
function parseVitestOutput(text) {
  const failures = [];

  // Match FAIL blocks
  // Pattern: "FAIL  storybook (chromium) src/.../File.stories.tsx > StoryName"
  const failPattern = /FAIL\s+.*?\s+([^\s]+\.stories\.tsx)\s*(?:>\s*([^\n]+))?/g;
  let match;

  while ((match = failPattern.exec(text)) !== null) {
    const storyFile = match[1];
    const storyName = match[2]?.trim() || 'Unknown';

    // Extract component path from story file
    // src/design-system/atoms/BackToTop/BackToTop.stories.tsx -> src/design-system/atoms/BackToTop/BackToTop.tsx
    const componentPath = storyFile.replace('.stories.tsx', '.tsx');

    // Extract error message (look for TestingLibraryElementError or other errors)
    const startIdx = match.index + match[0].length;
    const nextFailIdx = text.indexOf('FAIL', startIdx + 10);
    const section = text.slice(startIdx, nextFailIdx > 0 ? nextFailIdx : startIdx + 3000);

    // Extract the actual error message
    let errorMessage = '';
    const errorMatch = section.match(/(?:TestingLibraryElementError|Error):\s*([\s\S]*?)(?=\n\s*❯|\n\s*⎯|$)/);
    if (errorMatch) {
      errorMessage = errorMatch[1].trim();
    }

    // Detect issue type
    const issueType = detectIssueType(errorMessage);

    // Extract expected name if present
    let expectedName = null;
    const nameMatch = errorMessage.match(/name\s*["']([^"']+)["']/);
    if (nameMatch) {
      expectedName = nameMatch[1];
    }

    // Extract HTML snippet if present
    let htmlSnippet = null;
    const snippetMatch = section.match(/<button[^>]*>[\s\S]*?<\/button>/);
    if (snippetMatch) {
      htmlSnippet = snippetMatch[0];
    }

    failures.push({
      testName: storyName,
      storyFile,
      filePath: componentPath,
      errorMessage: errorMessage.slice(0, 500), // Limit length
      issueType,
      expectedName,
      htmlSnippet,
      fixSuggestions: WCAG_FIX_SUGGESTIONS[issueType] || null,
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
    source: 'vitest (@storybook/addon-vitest)',
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

  const failures = parseVitestOutput(input);

  report.failures = failures;
  report.summary.totalFailures = failures.length;

  for (const failure of failures) {
    // Track by component
    if (failure.filePath) {
      report.summary.byComponent[failure.filePath] =
        (report.summary.byComponent[failure.filePath] || 0) + 1;
    }

    // Track by rule
    if (failure.issueType && failure.issueType !== 'unknown') {
      report.summary.totalViolations++;
      report.summary.byRule[failure.issueType] =
        (report.summary.byRule[failure.issueType] || 0) + 1;

      const category = failure.fixSuggestions?.category || 'Other';
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
  const title = `[Vitest A11y] ${report.summary.totalFailures} accessibility test(s) failed`;

  if (report.summary.totalFailures === 0) {
    return {
      title: '[Vitest A11y] All accessibility tests passed',
      body: 'No accessibility issues detected.',
    };
  }

  let body = `## Vitest Accessibility Report (Storybook)

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

  for (const failure of report.failures) {
    body += `### ${failure.testName}

- **File**: \`${failure.filePath}\`
- **Story**: \`${failure.storyFile}\`
- **Issue Type**: ${failure.issueType}
`;

    if (failure.expectedName) {
      body += `- **Expected Name**: "${failure.expectedName}"\n`;
    }

    body += `
**Error Message:**
\`\`\`
${failure.errorMessage}
\`\`\`
`;

    if (failure.htmlSnippet) {
      body += `
**HTML Snippet:**
\`\`\`html
${failure.htmlSnippet}
\`\`\`
`;
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
Fix the accessibility test failures in this repository.

**Context files to read:**
- \`.context/design-system.md\` - Design tokens and contrast rules
- This GitHub Issue (already provided)

**Files to modify:**
${filesToModify}

**Common Issues:**
1. **button-name**: The ariaLabel prop is destructured but not applied to the button's aria-label attribute
2. **color-contrast**: Use proper contrast ratios (4.5:1 for normal text)
3. **accessible-name**: Ensure all interactive elements have accessible names

**Rules:**
1. Use only tokens from design-system.md (no hardcoded HEX values)
2. WCAG AA contrast: 4.5:1 for normal text, 3:1 for large text
3. Every interactive element needs an accessible name
4. Run \`yarn test\` after fixes to verify

**Priority:** All accessibility tests must pass
\`\`\`

### Quick Fix Commands

\`\`\`bash
# Run accessibility tests locally
yarn test

# Run tests in watch mode
yarn test --watch
\`\`\`

---

**Labels**: \`accessibility\`, \`vitest\`, \`auto-fix\`, \`claude-code\`
`;

  return { title, body };
}

// CLI entry point
const isMainModule =
  process.argv[1] &&
  (process.argv[1].endsWith('vitest-report-generator.mjs') ||
    process.argv[1].includes('vitest-report-generator'));

if (isMainModule) {
  const args = process.argv.slice(2);
  const inputFile = args[0] || 'vitest-output.txt';
  const outputJson = args[1] || 'vitest-report.json';
  const outputMd = args[2] || 'vitest-issue.md';

  console.log(`Parsing vitest results from: ${inputFile}`);

  let input;
  if (fs.existsSync(inputFile)) {
    input = fs.readFileSync(inputFile, 'utf8');
  } else {
    console.warn(`Input file not found: ${inputFile}`);
    process.exit(1);
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
