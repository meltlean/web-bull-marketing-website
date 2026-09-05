import React, { useEffect, useRef, useState } from 'react';
import { Calendar } from 'lucide-react';
import content from '../../content/pages/home.json';
import { applyMeta, renderMarkdown } from '../lib/content.js';
import SliderField from '../components/SliderField.jsx';
import LeadForm from '../components/LeadForm.jsx';

export default function Home({ bookingLink }) {
  const p = content;
  useEffect(() => { applyMeta(p.seo_title, p.seo_description); }, []);

  const [leads, setLeads] = useState(120);
  const [avgValue, setAvgValue] = useState(45000);
  const [qualified, setQualified] = useState(55);
  const [appt, setAppt] = useState(65);
  const [close, setClose] = useState(25);
  const [margin, setMargin] = useState(32);
  const [results, setResults] = useState(null);
  const [show, setShow] = useState(false);
  const calcRef = useRef(null);

  const calculate = () => {
    const jobs = leads * (qualified / 100) * (appt / 100) * (close / 100);
    const revenue = jobs * avgValue;
    const profit = revenue * (margin / 100);
    const benchClose = Math.min(close / 100 + 0.15, 0.65);
    const benchJobs = leads * (qualified / 100) * (appt / 100) * benchClose;
    const benchRevenue = benchJobs * avgValue;
    const leak = Math.max(benchRevenue - revenue, 0);
    setResults({ jobs, revenue, profit, leak });
    setShow(true);
    setTimeout(() => calcRef.current && calcRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
  };

  return (
    <>
      <header className="hero">
        <div className="wrap">
          <div className="badge"><span className="dot" /><span>{p.badge}</span></div>
          <h1>
            <span>{p.hero_title_pre}</span>
            <span className="grad">{p.hero_title_grad}</span>
            <span>{p.hero_title_post}</span>
          </h1>
          <p className="lede">{p.hero_sub}</p>
          <div className="hero-cta-row">
            <a className="btn btn-primary" onClick={() => calcRef.current && calcRef.current.scrollIntoView({ behavior: 'smooth' })}>
              <span className="sheen" />Show Me My Revenue Leaks
            </a>
            <a className="btn btn-ghost" href={bookingLink} target="_blank" rel="noreferrer"><Calendar size={15} /> Book a Call</a>
          </div>
          <div className="hero-stats">
            <div className="stat"><div className="num">{p.stat1_num}</div><div className="label">{p.stat1_label}</div></div>
            <div className="stat"><div className="num">{p.stat2_num}</div><div className="label">{p.stat2_label}</div></div>
            <div className="stat"><div className="num">{p.stat3_num}</div><div className="label">{p.stat3_label}</div></div>
          </div>
        </div>
      </header>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow"><span>{p.trio_eyebrow}</span></div>
            <h2>{p.trio_title}</h2>
            <p>{p.trio_sub}</p>
          </div>
          <div className="trio">
            <div className="glass-card"><div className="icon">01</div><h3>{p.card1_title}</h3><p>{p.card1_body}</p></div>
            <div className="glass-card"><div className="icon">02</div><h3>{p.card2_title}</h3><p>{p.card2_body}</p></div>
            <div className="glass-card"><div className="icon">03</div><h3>{p.card3_title}</h3><p>{p.card3_body}</p></div>
          </div>
        </div>
      </section>

      <section ref={calcRef}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow"><span>Step 01 &middot; Enter Your Numbers</span></div>
            <h2>See what your pipeline is really worth</h2>
            <p>Drag the sliders to match your business. We'll do the math in real time.</p>
          </div>
          <div className="calc-shell">
            <div className="calc-inner">
              <div className="calc-head"><h3>Pipeline Revenue Calculator</h3><div className="tagpill">Fast Math &middot; Brutal Honesty</div></div>
              <div className="field-grid">
                <div className="field"><label>Leads Per Month</label><div className="num-field"><input type="number" value={leads} onChange={(e) => setLeads(parseFloat(e.target.value) || 0)} /></div></div>
                <div className="field"><label>Average Project Value</label><div className="num-field has-prefix"><span className="prefix">$</span><input type="number" value={avgValue} onChange={(e) => setAvgValue(parseFloat(e.target.value) || 0)} /></div></div>
                <SliderField label="Qualified Lead Rate" value={qualified} onChange={setQualified} />
                <SliderField label="Appointment Rate" value={appt} onChange={setAppt} />
                <SliderField label="Close Rate" value={close} onChange={setClose} />
                <SliderField label="Gross Margin" value={margin} onChange={setMargin} />
              </div>
              <div className="formula-strip">
                Leads &times; Qualified Rate &times; Appointment Rate &times; Close Rate = <strong>New Jobs / Month</strong><br />
                New Jobs &times; Average Project Value = <strong>Monthly Revenue</strong><br />
                Revenue &times; Gross Margin = <strong>Monthly Gross Profit</strong>
              </div>
              <div className="cta-row">
                <button className="btn btn-primary" onClick={calculate}><span className="sheen" />Show Me My Revenue Leaks</button>
                <span className="micro">No email required to see this part.</span>
              </div>
              <div className={'results' + (show ? ' show' : '')}>
                {results && (
                  <div className="results-grid">
                    <div className="cell jobs"><div className="label">New Jobs / Month</div><div className="value">{results.jobs.toFixed(1)}</div><div className="sub">Based on current funnel conversion.</div></div>
                    <div className="cell revenue"><div className="label">Monthly Revenue</div><div className="value">${Math.round(results.revenue).toLocaleString('en-US')}</div><div className="sub">Booked revenue from current lead flow.</div></div>
                    <div className="cell profit"><div className="label">Gross Profit</div><div className="value">${Math.round(results.profit).toLocaleString('en-US')}</div><div className="sub">Before overhead, payroll, owner draw.</div></div>
                    <div className="cell leak"><div className="label">Revenue Left on Table</div><div className="value">${Math.round(results.leak).toLocaleString('en-US')}</div><div className="sub">Vs. a top-quartile close rate.</div></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="quote-block">
        <div className="wrap">
          <div className="glass-card">
            <blockquote>{p.quote}</blockquote>
            <div className="attribution">{p.quote_attribution}</div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow"><span>Step 02 &middot; Your Next Move</span></div>
            <h2>{p.next_step_title}</h2>
            <p>{p.next_step_sub}</p>
          </div>
          <LeadForm bookingLink={bookingLink} />
        </div>
      </section>

      {p.extra_content && (
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="rich-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.extra_content) }} />
          </div>
        </section>
      )}
    </>
  );
}
