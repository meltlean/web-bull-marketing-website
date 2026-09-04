import React, { useEffect } from 'react';
import content from '../../content/pages/services.json';
import { applyMeta } from '../lib/content.js';

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
              <div className="icon">{String(i + 1).padStart(2, '0')}</div>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
