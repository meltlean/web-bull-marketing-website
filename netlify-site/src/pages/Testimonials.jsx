import React from 'react';
import { Head } from 'vite-react-ssg';
import content from '../../content/pages/testimonials.json';
import { renderMarkdown } from '../lib/content.js';

export default function Testimonials() {
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
        <div className="testimonial-grid">
          {p.items.map((it, i) => (
            <div className="glass-card testimonial-card" key={i}>
              <blockquote>{it.quote}</blockquote>
              <div className="testimonial-attr">
                {it.avatar && <img src={it.avatar} alt={it.name} className="testimonial-avatar" />}
                <div>
                  <div className="t-name">{it.name}</div>
                  <div className="t-role">{it.role}</div>
                </div>
              </div>
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
