import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { applyMeta } from '../lib/content.js';

const SECTIONS = [
  { to: '/marketing-intelligence', title: 'Marketing Intelligence', body: 'Web marketing, local SEO, Google Ads, AI search, and general contractor marketing insights.' },
  { to: '/contractor-marketing-guides', title: 'Contractor Marketing Guides', body: 'Practical, step-by-step guides built specifically for design-build and remodeling companies.' },
  { to: '/case-studies', title: 'Case Studies', body: 'Real pipeline audits and results from design-build firms and high-end remodelers.' },
  { to: '/tools-calculators', title: 'Tools & Calculators', body: 'Calculators and practical tools to help you find revenue hiding in your own pipeline.' },
];

export default function ResourcesHub() {
  useEffect(() => {
    applyMeta('Resources | Web Bull Marketing', 'Marketing intelligence, contractor guides, case studies, and tools for design-build firms and high-end remodelers nationwide.');
  }, []);

  return (
    <section style={{ paddingTop: 130 }}>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow"><span>Resources</span></div>
          <h2>Everything we know about growing a remodeling business</h2>
        </div>
        <div className="services-grid">
          {SECTIONS.map((s) => (
            <Link to={s.to} className="glass-card resource-hub-card" key={s.to}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <span className="read-more">Browse <ChevronRight size={14} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
