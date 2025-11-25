import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const root = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.resolve(root, '..');
const distDir = path.join(projectRoot, 'dist');
const htmlPath = path.join(distDir, 'index.html');
const cssPath = path.join(distDir, 'styles.css');
const jsPath = path.join(distDir, 'app.js');

if (!existsSync(distDir)) {
  console.error('❌ dist/ folder missing. Run `npm run build` first.');
  process.exit(1);
}

for (const file of [htmlPath, cssPath, jsPath]) {
  if (!existsSync(file)) {
    console.error(`❌ Expected artifact missing: ${path.relative(projectRoot, file)}`);
    process.exit(1);
  }
}

const html = readFileSync(htmlPath, 'utf8');
const requiredSections = [
  'Mission Brief',
  'High-Level Architecture',
  'Input Contract',
  'Acquisition Strategy',
  'Website Detection &amp; Scoring',
  'Data Model Snapshots',
  'Report Generation',
  'Implementation Roadmap',
  'Risk &amp; Mitigation Matrix',
  'Operational Playbook'
];

const missing = requiredSections.filter((heading) => !html.includes(heading));
if (missing.length > 0) {
  console.error('❌ Missing required sections:', missing.join(', '));
  process.exit(1);
}

const css = readFileSync(cssPath, 'utf8');
if (!css.includes('--accent')) {
  console.error('❌ styles.css missing CSS variables.');
  process.exit(1);
}

const js = readFileSync(jsPath, 'utf8');
if (!js.includes('IntersectionObserver')) {
  console.error('❌ app.js missing IntersectionObserver logic.');
  process.exit(1);
}

console.log('✅ Test suite passed — build artifacts validated.');
