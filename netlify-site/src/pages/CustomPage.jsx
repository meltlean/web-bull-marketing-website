import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCustomPageBySlug, applyMeta, renderMarkdown } from '../lib/content.js';

export default function CustomPage() {
  const { slug } = useParams();
  const page = getCustomPageBySlug(slug);

  useEffect(() => {
    if (page) {
      const title = page.seo_title && page.seo_title.trim() ? page.seo_title : `${page.title} | Web Bull Marketing`;
      applyMeta(title, page.seo_description);
    }
  }, [page]);

  if (!page) {
    return (
      <div className="wrap" style={{ padding: '140px 0', textAlign: 'center', color: 'var(--gray-light)' }}>
        Page not found. <Link to="/" style={{ color: 'var(--green-bright)' }}>Back home</Link>
      </div>
    );
  }

  return (
    <section style={{ paddingTop: 130 }}>
      <div className="wrap" style={{ maxWidth: 760 }}>
        <h1>{page.title}</h1>
        <div className="rich-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(page.body) }} />
      </div>
    </section>
  );
}
