import React, { useState } from 'react';
import { Head } from 'vite-react-ssg';
import { ChevronRight } from 'lucide-react';
import content from '../../content/pages/faq.json';
import { renderMarkdown } from '../lib/content.js';

export default function FAQ() {
  const p = content;
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section style={{ paddingTop: 130 }}>
      <Head>
        <title>{p.seo_title}</title>
        <meta name="description" content={p.seo_description} />
      </Head>
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div className="section-head">
          <div className="eyebrow"><span>{p.eyebrow}</span></div>
          <h1>{p.title}</h1>
          <p>{p.sub}</p>
        </div>
        <div className="faq-list">
          {p.items.map((it, i) => (
            <div className={'faq-item' + (openIdx === i ? ' open' : '')} key={i}>
              <div className="faq-q-row" onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
                <h3>{it.q}</h3>
                <ChevronRight size={16} className="faq-chevron" />
              </div>
              <div className="faq-a"><p>{it.a}</p></div>
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
