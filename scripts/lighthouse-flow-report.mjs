/**
 * Lighthouse User Flow Report Generator
 *
 * Parses User Flow JSON results and generates a structured report
 * with source file mappings for GitHub Issues.
 *
 * Usage:
 *   node scripts/lighthouse-flow-report.mjs [report-dir] [output.json] [output.md]
 *
 * Defaults:
 *   - report-dir: lighthouse-report
 *   - output.json: flow-report.json
 *   - output.md: flow-issue.md
 */

import fs from 'fs';
import path from 'path';

/**
 * Page URL to component file mappings
 */
const PAGE_COMPONENT_MAP = {
  '/': [
    'src/app/page.tsx',
    'src/design-system/organisms/Hero/Hero.tsx',
    'src/design-system/organisms/Footer/Footer.tsx',
  ],
  '/about': ['src/app/about/page.tsx'],
};

/**
 * WCAG audit suggestions (shared with lighthouse-report-generator.mjs)
 */
const WCAG_FIX_SUGGESTIONS = {
  'color-contrast': {
    wcag: '1.4.3',
    title: 'Color Contrast',
    commonFixes: [
      'Replace text-white/80 with text-white',
      'Use higher contrast color tokens',
      'Check background-foreground meets 4.5:1 ratio',
    ],
  },
  'button-name': {
    wcag: '4.1.2',
    title: 'Button Name',
    commonFixes: ['Add aria-label to button', 'Add visible text content'],
  },
  'image-alt': {
    wcag: '1.1.1',
    title: 'Image Alt Text',
    commonFixes: ['Add alt attribute to img', 'Use empty alt="" for decorative images'],
  },
  'link-name': {
    wcag: '2.4.4',
    title: 'Link Name',
    commonFixes: ['Add descriptive link text', 'Add aria-label'],
  },
};

/**
 * Extract page path from URL
 */
function urlToPagePath(url) {
  if (!url) return '/';
  try {
    const parsed = new URL(url);
    return parsed.pathname || '/';
  } catch {
    return '/';
  }
}

/**
 * Get component files for a page
 */
function getComponentFiles(pagePath) {
  return PAGE_COMPONENT_MAP[pagePath] || ['src/app/page.tsx'];
}

/**
 * Extract failing audits from a flow step
 */
function extractStepFailures(step) {
  const failures = [];
  const lhr = step.lhr;

  if (!lhr || !lhr.audits) return failures;

  for (const [auditId, audit] of Object.entries(lhr.audits)) {
    if (audit.score === null || audit.score >= 1) continue;
    if (audit.scoreDisplayMode === 'notApplicable') continue;

    const details = audit.details || {};
    const items = details.items || [];

    const failingItems = items
      .map((item) => ({
        selector: item.node?.selector || null,
        snippet: item.node?.snippet || null,
        explanation: item.node?.explanation || null,
      }))
      .filter((i) => i.selector || i.snippet);

    if (failingItems.length > 0 || audit.score === 0) {
      failures.push({
        auditId,
        title: audit.title,
        score: audit.score,
        displayValue: audit.displayValue || null,
        items: failingItems,
        fixSuggestions: WCAG_FIX_SUGGESTIONS[auditId] || null,
      });
    }
  }

  return failures;
}

/**
 * Parse User Flow JSON result
 */
export function parseFlowResult(flowResultPath) {
  const report = {
    generatedAt: new Date().toISOString(),
    pipelineType: 'web-app',
    summary: {
      totalIssues: 0,
      steps: [],
      byAudit: {},
      affectedFiles: new Set(),
    },
    steps: [],
    recommendations: [],
  };

  if (!fs.existsSync(flowResultPath)) {
    console.warn(`Flow result not found: ${flowResultPath}`);
    return report;
  }

  let flowResult;
  try {
    flowResult = JSON.parse(fs.readFileSync(flowResultPath, 'utf8'));
  } catch (e) {
    console.warn(`Failed to parse flow result: ${e.message}`);
    return report;
  }

  // Process each step in the flow
  const steps = flowResult.steps || [];

  for (const step of steps) {
    const lhr = step.lhr || {};
    const url = lhr.requestedUrl || lhr.finalUrl || lhr.finalDisplayedUrl || '';
    const pagePath = urlToPagePath(url);
    const componentFiles = getComponentFiles(pagePath);

    const perfScore = lhr.categories?.performance?.score;
    const a11yScore = lhr.categories?.accessibility?.score;

    const stepData = {
      name: step.name || 'Unknown Step',
      url,
      pagePath,
      componentFiles,
      performance: perfScore !== null ? Math.round(perfScore * 100) : null,
      accessibility: a11yScore !== null ? Math.round(a11yScore * 100) : null,
      failures: extractStepFailures(step),
    };

    report.steps.push(stepData);
    report.summary.steps.push({
      name: stepData.name,
      performance: stepData.performance,
      accessibility: stepData.accessibility,
    });

    // Track affected files
    for (const file of componentFiles) {
      report.summary.affectedFiles.add(file);
    }

    // Track failures by audit
    for (const failure of stepData.failures) {
      report.summary.totalIssues++;
      report.summary.byAudit[failure.auditId] =
        (report.summary.byAudit[failure.auditId] || 0) + 1;
    }
  }

  // Convert Set to Array for JSON serialization
  report.summary.affectedFiles = Array.from(report.summary.affectedFiles);

  // Add recommendations based on findings
  if (report.summary.byAudit['color-contrast']) {
    report.recommendations.push(
      'Check text contrast ratios in Hero and Footer components'
    );
  }
  if (report.summary.totalIssues > 0) {
    report.recommendations.push('Run yarn test-storybook:ci for detailed a11y tests');
  }

  return report;
}

/**
 * Generate markdown for GitHub Issue
 */
export function generateFlowIssueMD(report) {
  const title = `[Lighthouse Auto-Fix] User Flow - ${report.summary.totalIssues} issue(s) detected`;

  if (report.summary.totalIssues === 0 && report.summary.steps.every(s => s.accessibility >= 90)) {
    return {
      title: '[Lighthouse] User Flow checks passed',
      body: 'No significant accessibility or performance issues detected.',
    };
  }

  let body = `## Lighthouse User Flow Report

**Generated**: ${report.generatedAt}
**Pipeline**: Web App User Flow
**Total Issues**: ${report.summary.totalIssues}

### Scores Summary

| Step | Performance | Accessibility |
|------|-------------|---------------|
`;

  for (const step of report.summary.steps) {
    const perfIcon = step.performance >= 90 ? '' : '';
    const a11yIcon = step.accessibility >= 95 ? '' : '';
    body += `| ${step.name} | ${perfIcon} ${step.performance ?? 'N/A'}% | ${a11yIcon} ${step.accessibility ?? 'N/A'}% |\n`;
  }

  if (Object.keys(report.summary.byAudit).length > 0) {
    body += `
### Issues by Audit

| Audit | Count | WCAG |
|-------|-------|------|
`;
    for (const [auditId, count] of Object.entries(report.summary.byAudit)) {
      const wcag = WCAG_FIX_SUGGESTIONS[auditId]?.wcag || '-';
      body += `| ${auditId} | ${count} | ${wcag} |\n`;
    }
  }

  body += `
### Affected Files

`;
  for (const file of report.summary.affectedFiles) {
    body += `- \`${file}\`\n`;
  }

  // Detailed failures per step
  body += `
---

## Detailed Failures

`;

  for (const step of report.steps) {
    if (step.failures.length === 0) continue;

    body += `### ${step.name}

**URL**: \`${step.url}\`
**Files**: ${step.componentFiles.map(f => `\`${f}\``).join(', ')}

`;

    for (const failure of step.failures) {
      body += `#### ${failure.title}

- **Audit**: \`${failure.auditId}\`
- **Score**: ${failure.score !== null ? Math.round(failure.score * 100) : 'N/A'}%
${failure.displayValue ? `- **Details**: ${failure.displayValue}\n` : ''}
`;

      if (failure.items.length > 0) {
        body += `**Failing Elements:**\n`;
        for (const item of failure.items.slice(0, 3)) {
          body += `- \`${item.selector || 'N/A'}\`\n`;
          if (item.snippet) {
            body += `  \`\`\`html\n  ${item.snippet}\n  \`\`\`\n`;
          }
        }
        if (failure.items.length > 3) {
          body += `- ... and ${failure.items.length - 3} more\n`;
        }
      }

      if (failure.fixSuggestions) {
        body += `\n**Suggested Fixes (WCAG ${failure.fixSuggestions.wcag}):**\n`;
        for (const fix of failure.fixSuggestions.commonFixes) {
          body += `- ${fix}\n`;
        }
      }
      body += '\n';
    }
  }

  // Recommendations
  if (report.recommendations.length > 0) {
    body += `
### Recommendations

`;
    for (const rec of report.recommendations) {
      body += `- ${rec}\n`;
    }
  }

  // Claude Code instructions
  body += `
---

## Claude Code Fix Instructions

\`\`\`bash
claude
\`\`\`

Then provide this context:

\`\`\`markdown
Fix the Lighthouse User Flow issues in this repository.

**Context files to read:**
- \`.context/design-system.md\` - Design tokens and contrast rules
- This GitHub Issue

**Files to modify:**
${report.summary.affectedFiles.map(f => `- \`${f}\``).join('\n')}

**Focus areas:**
1. Accessibility issues during page load
2. Performance during scroll interactions
3. CLS (Cumulative Layout Shift) during navigation

**Verification:**
Run \`node scripts/lighthouse-flow.mjs\` after fixes.
\`\`\`

### Quick Commands

\`\`\`bash
# Start dev server and run flow test
yarn build && yarn start &
npx wait-on tcp:3000 && node scripts/lighthouse-flow.mjs
\`\`\`

---

**Labels**: \`accessibility\`, \`lighthouse\`, \`auto-fix\`, \`claude-code\`, \`web-app\`
`;

  return { title, body };
}

// CLI entry point
const isMainModule =
  process.argv[1] &&
  (process.argv[1].endsWith('lighthouse-flow-report.mjs') ||
    process.argv[1].includes('lighthouse-flow-report'));

if (isMainModule) {
  const args = process.argv.slice(2);
  const reportDir = args[0] || 'lighthouse-report';
  const outputJson = args[1] || 'flow-report.json';
  const outputMd = args[2] || 'flow-issue.md';

  const flowResultPath = `${reportDir}/user-flow.json`;
  console.log(`Parsing User Flow result from: ${flowResultPath}`);

  const report = parseFlowResult(flowResultPath);
  const { title, body } = generateFlowIssueMD(report);

  fs.writeFileSync(outputJson, JSON.stringify(report, null, 2));
  fs.writeFileSync(outputMd, `# ${title}\n\n${body}`);

  console.log(`Report generated: ${outputJson}`);
  console.log(`Issue MD generated: ${outputMd}`);
  console.log(`Total issues: ${report.summary.totalIssues}`);

  process.exit(report.summary.totalIssues > 0 ? 1 : 0);
}
