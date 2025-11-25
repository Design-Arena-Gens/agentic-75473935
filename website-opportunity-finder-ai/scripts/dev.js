import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

const root = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.resolve(root, '..');
const siteDir = path.join(projectRoot, 'site');
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function resolveFile(requestUrl) {
  const requestedPath = new URL(requestUrl, 'http://localhost').pathname;
  let filePath = path.join(siteDir, requestedPath);
  if (requestedPath.endsWith('/')) {
    filePath = path.join(filePath, 'index.html');
  }
  return filePath;
}

const server = http.createServer(async (req, res) => {
  const filePath = resolveFile(req.url ?? '/');
  const ext = path.extname(filePath);

  try {
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      const data = await readFile(indexPath);
      res.setHeader('Content-Type', mimeTypes['.html']);
      res.end(data);
      return;
    }

    const data = await readFile(filePath);
    res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
    res.end(data);
  } catch (error) {
    if (!ext) {
      try {
        const fallback = await readFile(path.join(siteDir, 'index.html'));
        res.setHeader('Content-Type', mimeTypes['.html']);
        res.end(fallback);
        return;
      } catch (fallbackErr) {
        res.statusCode = 500;
        res.end(`Internal error: ${fallbackErr.message}`);
        return;
      }
    }

    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(port, () => {
  console.log(`Dev server running at http://localhost:${port}`);
});
