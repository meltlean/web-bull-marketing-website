import settings from '../../content/settings.json';
import { marked } from 'marked';

const blogModules = import.meta.glob('/content/blog/*.json', { eager: true });
const customPageModules = import.meta.glob('/content/custom-pages/*.json', { eager: true });

export const CATEGORIES = {
  'web-marketing-intelligence': { label: 'Web Marketing Intelligence', parent: 'marketing-intelligence' },
  'local-seo': { label: 'Local SEO', parent: 'marketing-intelligence' },
  'google-ads': { label: 'Google Ads', parent: 'marketing-intelligence' },
  'ai-search': { label: 'AI Search', parent: 'marketing-intelligence' },
  'contractor-marketing': { label: 'Contractor Marketing', parent: 'marketing-intelligence' },
  'contractor-marketing-guides': { label: 'Contractor Marketing Guides', parent: null },
  'case-studies': { label: 'Case Studies', parent: null },
  'tools-calculators': { label: 'Tools & Calculators', parent: null },
};

export function getSettings() {
  return settings;
}

export function getBlogPosts() {
  const posts = Object.values(blogModules).map((mod) => mod.default || mod);
  return posts
    .filter((p) => p.published !== false)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostsByCategory(category) {
  return getBlogPosts().filter((p) => p.category === category);
}

export function getCategoryMeta(slug) {
  return CATEGORIES[slug] || { label: slug, parent: null };
}

export function getBlogPostBySlug(slug) {
  return getBlogPosts().find((p) => p.slug === slug);
}

export function getCustomPages() {
  const pages = Object.values(customPageModules).map((mod) => mod.default || mod);
  return pages.filter((p) => p.published !== false);
}

export function getCustomPageBySlug(slug) {
  return getCustomPages().find((p) => p.slug === slug);
}

export function renderMarkdown(text) {
  if (!text) return '';
  marked.setOptions({ breaks: true });
  return marked.parse(text);
}

export function applyGA(gaId) {
  document.querySelectorAll('[data-wbm-ga]').forEach((n) => n.remove());
  if (!gaId || !gaId.trim()) return;
  const s1 = document.createElement('script');
  s1.async = true;
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  s1.setAttribute('data-wbm-ga', '1');
  const s2 = document.createElement('script');
  s2.setAttribute('data-wbm-ga', '1');
  s2.textContent = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`;
  document.head.appendChild(s1);
  document.head.appendChild(s2);
}

export function applyCustomHeadCode(codeString) {
  document.querySelectorAll('[data-wbm-custom]').forEach((n) => n.remove());
  if (!codeString || !codeString.trim()) return;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = codeString;
  Array.from(wrapper.childNodes).forEach((node) => {
    if (node.nodeType === 1 && node.tagName === 'SCRIPT') {
      const s = document.createElement('script');
      Array.from(node.attributes || []).forEach((attr) => s.setAttribute(attr.name, attr.value));
      s.textContent = node.textContent;
      s.setAttribute('data-wbm-custom', '1');
      document.head.appendChild(s);
    } else if (node.nodeType === 1) {
      const clone = node.cloneNode(true);
      clone.setAttribute('data-wbm-custom', '1');
      document.head.appendChild(clone);
    }
  });
}

export function injectEmbedCode(container, htmlString) {
  if (!container) return;
  container.innerHTML = '';
  if (!htmlString || !htmlString.trim()) return;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = htmlString;
  Array.from(wrapper.childNodes).forEach((node) => {
    if (node.tagName === 'SCRIPT') {
      const s = document.createElement('script');
      Array.from(node.attributes || []).forEach((attr) => s.setAttribute(attr.name, attr.value));
      s.textContent = node.textContent;
      container.appendChild(s);
    } else {
      container.appendChild(node.cloneNode(true));
    }
  });
}
