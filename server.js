/**
 * Zero-dependency local preview server for the Portfolio & Showcase Websites.
 * Run with: node server.js [port]
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/portfolio/index.html';
  }

  let filePath = path.join(BASE_DIR, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`404 Not Found: ${reqPath}`);
      return;
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`500 Server Error: ${readErr.message}`);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Showcase Server running at http://localhost:${PORT}`);
  console.log(`🌐 MASTER PORTFOLIO HUB & DEVICE SIMULATOR: http://localhost:${PORT}/portfolio/`);
  console.log(`🖥️  Website 11 - SYNAPSE INFRASTRUCTURE (Enterprise Datacenter Systems): http://localhost:${PORT}/projects/11-synapse-infrastructure/`);
  console.log(`⚡ Website 10 - NEXUS PRIME (Multi-Asset Quant Trading Terminal): http://localhost:${PORT}/projects/10-nexus-terminal/`);
  console.log(`🏛️ Website 9 - ARCHIVIST (Architecture & Spatial Culture Journal): http://localhost:${PORT}/projects/09-archivist-journal/`);
  console.log(`💉 Website 8 - LUMINA DERMA-OS (Dermatology & Practice Intelligence): http://localhost:${PORT}/projects/08-lumina-dermatology/`);
  console.log(`🏛️ Website 7 - VILLA SOLSTICE (Ultra-Luxury Architecture & Estate): http://localhost:${PORT}/projects/07-solstice-real-estate/`);
  console.log(`☕ Website 6 - STRADA MONOLITH (Precision Dual-Boiler Espresso): http://localhost:${PORT}/projects/06-strada-espresso/`);
  console.log(`🎧 Website 5 - AETHER 01 (Titanium Audiophile Headphones): http://localhost:${PORT}/projects/05-aether-headphones/`);
  console.log(`🦷 Website 4 - Aussie Smile Holidays (Dental Tourism): http://localhost:${PORT}/projects/04-pacific-dental-concierge/`);
  console.log(`🫒 Website 3 - ASOFI (Terroir & Huile d'Olive): http://localhost:${PORT}/projects/03-asofi-terroir/`);
  console.log(`🌿 Website 2 - McKenzo & Co. (Consulting & EIE): http://localhost:${PORT}/projects/02-mckenzo-consulting/`);
  console.log(`⚖️  Website 1 - Vanguard & Sterling (Law Firm): http://localhost:${PORT}/projects/01-lexicon-law/`);
  console.log(`======================================================\n`);
});
