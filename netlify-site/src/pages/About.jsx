import React, { useEffect } from 'react';
import content from '../../content/pages/about.json';
import { applyMeta, renderMarkdown } from '../lib/content.js';

export default function About() {
  const p = content;
  useEffect(() => { applyMeta(p.seo_title, p.seo_description); }, []);

  return (
    <section style={{ paddingTop: 130 }}>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow"><span>{p.eyebrow}</span></div>
          <h2>{p.title}</h2>
        </div>
        <div className={'about-layout' + (p.photo ? ' has-photo' : '')}>
          {p.photo && (
            <img src={p.photo} alt={p.title} className="about-photo" />
          )}
          <div className="about-body">
            <p>{p.body1}</p>
            <p>{p.body2}</p>
          </div>
        </div>
        <div className="hero-stats" style={{ marginTop: 60 }}>
          <div className="stat"><div className="num">{p.stat1_num}</div><div className="label">{p.stat1_label}</div></div>
          <div className="stat"><div className="num">{p.stat2_num}</div><div className="label">{p.stat2_label}</div></div>
          <div className="stat"><div className="num">{p.stat3_num}</div><div className="label">{p.stat3_label}</div></div>
        </div>
        {p.extra_content && (
          <div className="rich-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.extra_content) }} />
        )}
      </div>
    </section>
  );
}
