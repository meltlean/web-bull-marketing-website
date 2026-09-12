import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { getCustomPageBySlug, renderMarkdown } from '../lib/content.js';

export default function CustomPage() {
  const { slug } = useParams();
  const page = getCustomPageBySlug(slug);

  if (!page) {
    return (
      <div className="wrap" style={{ padding: '140px 0', textAlign: 'center', color: 'var(--gray-light)' }}>
        Page not found. <Link to="/" style={{ color: 'var(--green-bright)' }}>Back home</Link>
      </div>
    );
  }

  const title = page.seo_title && page.seo_title.trim() ? page.seo_title : `${page.title} | Web Bull Marketing`;

  return (
    <section style={{ paddingTop: 130 }}>
      <Head>
        <title>{title}</title>
        {page.seo_description && <meta name="description" content={page.seo_description} />}
      </Head>
      <div className="wrap" style={{ maxWidth: 760 }}>
        <h1>{page.title}</h1>
        <div className="rich-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(page.body) }} />
      </div>
    </section>
  );
}
