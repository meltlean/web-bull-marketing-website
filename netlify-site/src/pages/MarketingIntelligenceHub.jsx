import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { applyMeta, CATEGORIES } from '../lib/content.js';

const SUBCATEGORIES = [
  { to: '/web-marketing-intelligence', slug: 'web-marketing-intelligence', body: 'Website performance, conversion, and overall digital marketing strategy for remodelers.' },
  { to: '/local-seo', slug: 'local-seo', body: 'Ranking in local search results and Google Maps for your service area.' },
  { to: '/google-ads', slug: 'google-ads', body: 'Paid search strategy and budget guidance for high-end remodeling companies.' },
  { to: '/ai-search', slug: 'ai-search', body: 'Showing up in AI-powered search tools like ChatGPT, Gemini, and AI Overviews.' },
  { to: '/contractor-marketing', slug: 'contractor-marketing', body: 'General marketing strategy and positioning for contractors and design-build firms.' },
];

export default function MarketingIntelligenceHub() {
  useEffect(() => {
    applyMeta('Marketing Intelligence | Web Bull Marketing', 'Web marketing, local SEO, Google Ads, AI search, and contractor marketing intelligence for remodelers nationwide.');
  }, []);

  return (
    <section style={{ paddingTop: 130 }}>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow"><span>Resources / Marketing Intelligence</span></div>
          <h2>Marketing Intelligence</h2>
          <p>Pick a topic to browse articles, or check back as we add more.</p>
        </div>
        <div className="services-grid">
          {SUBCATEGORIES.map((s) => (
            <Link to={s.to} className="glass-card resource-hub-card" key={s.to}>
              <h3>{CATEGORIES[s.slug].label}</h3>
              <p>{s.body}</p>
              <span className="read-more">Browse <ChevronRight size={14} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
