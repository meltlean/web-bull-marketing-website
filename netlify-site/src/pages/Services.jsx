import React, { useEffect } from 'react';
import content from '../../content/pages/services.json';
import { applyMeta, renderMarkdown } from '../lib/content.js';

export default function Services() {
  const p = content;
  useEffect(() => { applyMeta(p.seo_title, p.seo_description); }, []);

  return (
    <section style={{ paddingTop: 130 }}>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow"><span>{p.eyebrow}</span></div>
          <h2>{p.title}</h2>
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
