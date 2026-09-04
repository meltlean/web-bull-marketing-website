import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import content from '../../content/pages/faq.json';
import { applyMeta } from '../lib/content.js';

export default function FAQ() {
  const p = content;
  useEffect(() => { applyMeta(p.seo_title, p.seo_description); }, []);
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section style={{ paddingTop: 130 }}>
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div className="section-head">
          <div className="eyebrow"><span>{p.eyebrow}</span></div>
          <h2>{p.title}</h2>
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
      </div>
    </section>
  );
}
