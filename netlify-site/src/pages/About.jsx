import React, { useEffect } from 'react';
import content from '../../content/pages/about.json';
import { applyMeta } from '../lib/content.js';

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
        <div className="about-body">
          <p>{p.body1}</p>
          <p>{p.body2}</p>
        </div>
        <div className="hero-stats" style={{ marginTop: 60 }}>
          <div className="stat"><div className="num">{p.stat1_num}</div><div className="label">{p.stat1_label}</div></div>
          <div className="stat"><div className="num">{p.stat2_num}</div><div className="label">{p.stat2_label}</div></div>
          <div className="stat"><div className="num">{p.stat3_num}</div><div className="label">{p.stat3_label}</div></div>
        </div>
      </div>
    </section>
  );
}
