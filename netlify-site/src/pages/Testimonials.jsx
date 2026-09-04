import React, { useEffect } from 'react';
import content from '../../content/pages/testimonials.json';
import { applyMeta } from '../lib/content.js';

export default function Testimonials() {
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
        <div className="testimonial-grid">
          {p.items.map((it, i) => (
            <div className="glass-card testimonial-card" key={i}>
              <blockquote>{it.quote}</blockquote>
              <div className="testimonial-attr">
                <div className="t-name">{it.name}</div>
                <div className="t-role">{it.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
