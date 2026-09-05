import React, { useEffect } from 'react';
import { Calendar } from 'lucide-react';
import content from '../../content/pages/contact.json';
import { applyMeta, renderMarkdown } from '../lib/content.js';
import LeadForm from '../components/LeadForm.jsx';

export default function Contact({ bookingLink, formEmbedUrl, socials }) {
  const p = content;
  useEffect(() => { applyMeta(p.seo_title, p.seo_description); }, []);

  return (
    <section style={{ paddingTop: 130 }}>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow"><span>{p.eyebrow}</span></div>
          <h2>{p.title}</h2>
          <p>{p.sub}</p>
        </div>

        <div className="contact-grid">
          <LeadForm bookingLink={bookingLink} />
          <div className="glass-card contact-side">
            <h3>Prefer to book directly?</h3>
            <p>Skip the form and grab a slot on the calendar.</p>
            <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
              <span className="sheen" /><Calendar size={15} /> Book a Call
            </a>
            {socials && socials.length > 0 && (
              <>
                <h3 style={{ marginTop: 34 }}>Follow along</h3>
                <div className="social-row">
                  {socials.map((s, i) => (<a key={i} href={s.url} target="_blank" rel="noreferrer" className="social-btn" title={s.name}><s.Icon size={17} /></a>))}
                </div>
              </>
            )}
            {formEmbedUrl && (
              <div style={{ marginTop: 30 }}>
                <h3>Or fill out this form</h3>
                <iframe src={formEmbedUrl} title="Contact form" style={{ width: '100%', minHeight: 400, border: 'none', borderRadius: 12, marginTop: 12, background: '#fff' }} />
              </div>
            )}
          </div>
        </div>
        {p.extra_content && (
          <div className="rich-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.extra_content) }} />
        )}
      </div>
    </section>
  );
}
