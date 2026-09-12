import React from 'react';
import { Head } from 'vite-react-ssg';
import content from '../../content/pages/about.json';
import { renderMarkdown } from '../lib/content.js';

export default function About() {
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
