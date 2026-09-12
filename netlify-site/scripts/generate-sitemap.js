// Generates public/sitemap.xml before every build, based on whatever
// pages, blog posts, and custom pages actually exist at build time.
// Runs automatically via the "prebuild" step in package.json — no manual
// updates needed as content is added.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const SITE_URL = 'https://webbullmarketing.com';

const today = new Date().toISOString().slice(0, 10);

// Fixed, always-present pages on the site.
const staticRoutes = [
  { loc: '/', priority: '1.0' },
  { loc: '/services', priority: '0.8' },
  { loc: '/pricing', priority: '0.8' },
  { loc: '/testimonials', priority: '0.6' },
  { loc: '/faq', priority: '0.6' },
  { loc: '/blog', priority: '0.7' },
  { loc: '/about', priority: '0.6' },
  { loc: '/contact', priority: '0.7' },
  { loc: '/resources', priority: '0.7' },
  { loc: '/marketing-intelligence', priority: '0.6' },
  { loc: '/web-marketing-intelligence', priority: '0.6' },
  { loc: '/local-seo', priority: '0.6' },
  { loc: '/google-ads', priority: '0.6' },
  { loc: '/ai-search', priority: '0.6' },
  { loc: '/contractor-marketing', priority: '0.6' },
  { loc: '/contractor-marketing-guides', priority: '0.6' },
  { loc: '/case-studies', priority: '0.6' },
  { loc: '/tools-calculators', priority: '0.6' },
  { loc: '/remodeling-growth-calculator', priority: '0.7' },
];

function readJsonFilesFromDir(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dirPath, f), 'utf-8');
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.warn(`sitemap: skipping unparsable file ${f}`);
        return null;
      }
    })
    .filter(Boolean);
}

const blogPosts = readJsonFilesFromDir(path.join(root, 'content/blog'))
  .filter((p) => p.published !== false && p.slug)
  .map((p) => ({ loc: `/blog/${p.slug}`, lastmod: p.date || today, priority: '0.6' }));

const customPages = readJsonFilesFromDir(path.join(root, 'content/custom-pages'))
  .filter((p) => p.published !== false && p.slug)
  .map((p) => ({ loc: `/${p.slug}`, lastmod: today, priority: '0.5' }));

const allRoutes = [
  ...staticRoutes.map((r) => ({ ...r, lastmod: today })),
  ...blogPosts,
  ...customPages,
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.loc}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outPath = path.join(root, 'public/sitemap.xml');
fs.writeFileSync(outPath, xml);
console.log(`sitemap.xml generated with ${allRoutes.length} URLs -> ${outPath}`);
