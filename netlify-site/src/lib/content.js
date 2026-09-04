import settings from '../../content/settings.json';

const blogModules = import.meta.glob('/content/blog/*.json', { eager: true });

export function getSettings() {
  return settings;
}

export function getBlogPosts() {
  const posts = Object.values(blogModules).map((mod) => mod.default || mod);
  return posts
    .filter((p) => p.published !== false)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getBlogPostBySlug(slug) {
  return getBlogPosts().find((p) => p.slug === slug);
}

export function applyMeta(seoTitle, seoDescription) {
  if (seoTitle) document.title = seoTitle;
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', 'description');
    document.head.appendChild(tag);
  }
  if (seoDescription) tag.setAttribute('content', seoDescription);
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
