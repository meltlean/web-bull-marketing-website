import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { Check } from 'lucide-react';
import content from '../../content/pages/pricing.json';
import { renderMarkdown } from '../lib/content.js';

export default function Pricing() {
  const { bookingLink } = useOutletContext();
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
        <div className="pricing-grid">
          {p.tiers.map((tier, i) => (
            <div className={'glass-card pricing-card' + (tier.highlighted ? ' highlighted' : '')} key={i}>
              {tier.highlighted && <div className="pricing-badge">Most Popular</div>}
              <h3>{tier.name}</h3>
              <div className="pricing-price">{tier.price} <span className="pricing-period">{tier.period}</span></div>
              <ul className="pricing-features">
                {tier.features.map((f, fi) => (
                  <li key={fi}><Check size={14} className="check-ic" /><span>{f}</span></li>
                ))}
              </ul>
              <a href={bookingLink} target="_blank" rel="noreferrer" className={'btn ' + (tier.highlighted ? 'btn-primary' : 'btn-ghost')} style={{ width: '100%', justifyContent: 'center' }}>
                {tier.highlighted && <span className="sheen" />}
                {tier.cta_label}
              </a>
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
