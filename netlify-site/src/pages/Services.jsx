import React from 'react';
import { Head } from 'vite-react-ssg';
import content from '../../content/pages/services.json';
import { renderMarkdown } from '../lib/content.js';

export default function Services() {
  const p = content;

  return (
    <section style={{ paddingTop: 130 }}>
      <Head>
        <title>{p.seo_title}</title>
        <meta name="description" content={p.seo_description} />
      </Head>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow"><span>{p.eyebrow}</span></div>
          <h1>{p.title}</h1>
          <p>{p.sub}</p>
        </div>
        <div className="services-grid">
          {p.items.map((it, i) => (
            <div className="glass-card" key={i}>
              {it.image ? (
                <img src={it.image} alt={it.title} className="service-icon-image" />
              ) : (
                <div className="icon">{String(i + 1).padStart(2, '0')}</div>
              )}
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
        {p.extra_content && (
          <div className="rich-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.extra_content) }} />
        )}
      </div>
    </section>
  );
}
