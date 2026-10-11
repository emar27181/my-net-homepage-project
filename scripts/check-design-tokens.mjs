import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const scanRoots = ['src/pages', 'src/components', 'src/layouts'];
const allowedGeometryFiles = new Set([
  'src/components/GameBoyGallery.astro',
  'src/components/DSLite.astro',
  'src/components/WiiUGamepad.astro',
]);

const violations = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = relative(ROOT, full).replaceAll('\\', '/');
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (rel === 'src/pages/unused') continue;
      walk(full);
      continue;
    }
    if (!/\.(astro|css|ts|tsx|js|mjs)$/.test(name)) continue;
    const text = readFileSync(full, 'utf8');

    // Live typography must use role tokens. Geometry-only console components are
    // exempt from dimension rules, but not from hard-coded font sizes.
    const fontSizePattern = /font-size\s*:\s*\d+(?:\.\d+)?px\b/g;
    for (const match of text.matchAll(fontSizePattern)) {
      const line = text.slice(0, match.index).split('\n').length;
      violations.push(`${rel}:${line} hard-coded font-size: ${match[0]}`);
    }

    if (text.includes('/icon_omencat_transparent.png')) {
      violations.push(`${rel}: legacy brand icon reference; use BRAND_ASSETS.appIcon`);
    }

    // Generic UI SVGs should not reintroduce paired fixed dimensions.
    if (!allowedGeometryFiles.has(rel)) {
      const inlineIconPattern = /width\s*:\s*\d+px;\s*height\s*:\s*\d+px;[^\n]*(?:svg|currentColor)/gi;
      for (const match of text.matchAll(inlineIconPattern)) {
        const line = text.slice(0, match.index).split('\n').length;
        violations.push(`${rel}:${line} fixed inline icon dimensions; use an icon-size token`);
      }
    }
  }
}

for (const root of scanRoots) walk(join(ROOT, root));

if (violations.length) {
  console.error('Design token check failed:\n' + violations.map(v => `- ${v}`).join('\n'));
  process.exit(1);
}

console.log('Design token check passed.');
