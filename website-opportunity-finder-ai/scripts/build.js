import { rmSync, mkdirSync, readdirSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const root = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.resolve(root, '..');
const siteDir = path.join(projectRoot, 'site');
const outDir = path.join(projectRoot, 'dist');

function copyRecursive(src, dest) {
  const entries = readdirSync(src, { withFileTypes: true });
  mkdirSync(dest, { recursive: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      copyFileSync(srcPath, destPath);
    }
  }
}

try {
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  copyRecursive(siteDir, outDir);
  console.log('Build complete:', outDir);
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
