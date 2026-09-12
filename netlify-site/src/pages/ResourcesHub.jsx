import React from 'react';
import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { ChevronRight } from 'lucide-react';

const SECTIONS = [
  { to: '/marketing-intelligence', title: 'Marketing Intelligence', body: 'Web marketing, local SEO, Google Ads, AI search, and general contractor marketing insights.' },
  { to: '/contractor-marketing-guides', title: 'Contractor Marketing Guides', body: 'Practical, step-by-step guides built specifically for design-build and remodeling companies.' },
  { to: '/case-studies', title: 'Case Studies', body: 'Real pipeline audits and results from design-build firms and high-end remodelers.' },
  { to: '/tools-calculators', title: 'Tools & Calculators', body: 'Calculators and practical tools to help you find revenue hiding in your own pipeline.' },
];

export default function ResourcesHub() {
  return (
    <section style={{ paddingTop: 130 }}>
      <Head>
        <title>Resources | Web Bull Marketing</title>
        <meta name="description" content="Marketing intelligence, contractor guides, case studies, and tools for design-build firms and high-end remodelers nationwide." />
      </Head>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow"><span>Resources</span></div>
          <h1>Everything we know about growing a remodeling business</h1>
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
