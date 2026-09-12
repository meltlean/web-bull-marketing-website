import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import GrowthBudgetCalculator from '../components/GrowthBudgetCalculator.jsx';

export default function RemodelingGrowthCalculator() {
  const { bookingLink = '#' } = useOutletContext();

  return (
    <>
      <Head>
        <title>Remodeling Growth Budget Calculator | Web Bull Marketing</title>
        <meta name="description" content="Calculate the revenue gap, customers, qualified leads, allowable CAC, target CPQL, growth budget, projected gross profit, and ROI required to reach your remodeling company revenue goal." />
      </Head>
      <header className="gb-page-hero">
        <div className="gb-page-hero-inner">
          <span className="gb-kicker">Free Remodeling Growth Economics Tool</span>
          <h1>Build Your Remodeling Growth Budget</h1>
          <p>
            Stop choosing your marketing budget from a generic percentage.
            Use your revenue goal, average project value, gross margin, close rate,
            and acquisition economics to build a growth plan around your actual business.
          </p>
          <div className="gb-hero-flow" aria-label="Calculator flow">
            <span>Revenue Goal</span>
            <b>→</b>
            <span>Customers</span>
            <b>→</b>
            <span>Qualified Leads</span>
            <b>→</b>
            <span>Allowable CAC</span>
            <b>→</b>
            <span>Growth Budget</span>
          </div>
        </div>
      </header>

      <main className="gb-page-main">
        <section className="gb-intro">
          <span className="gb-kicker">Growth should be math, not guesswork.</span>
          <h2>Find out what your growth goal can realistically support.</h2>
          <p>
            This calculator works backward from the revenue you want to produce.
            It estimates how many customers and qualified opportunities you need,
            what you can afford to pay to acquire them, and whether your current
            acquisition economics suggest you should scale, fix, hold, or rework.
          </p>
        </section>

        <GrowthBudgetCalculator bookingLink={bookingLink} />

        <section className="gb-content-block">
          <div>
            <span className="gb-kicker">What the numbers mean</span>
            <h2>Don't optimize marketing for cheap leads. Optimize for profitable customers.</h2>
          </div>
          <div className="gb-content-columns">
            <p>
              A low cost per lead can still produce expensive customers if most inquiries
              are poor fits. A higher-cost channel may be far more profitable when it
              generates better-qualified homeowners, stronger close rates, and larger projects.
            </p>
            <p>
              The most useful comparison is your <strong>actual customer acquisition cost</strong>
              against your <strong>allowable customer acquisition cost</strong>, while also
              checking project value, gross margin, sales conversion, and production capacity.
            </p>
          </div>
        </section>

        <section className="gb-faq">
          <span className="gb-kicker">FAQ</span>
          <h2>Remodeling Growth Budget Questions</h2>

          <details>
            <summary>What is allowable customer acquisition cost?</summary>
            <p>Allowable CAC is the amount your project economics can reasonably support spending to acquire one new customer while preserving your desired profitability.</p>
          </details>
          <details>
            <summary>Why does close rate affect my marketing budget?</summary>
            <p>A stronger close rate means fewer qualified opportunities are required to acquire each customer. That can materially improve CAC and the amount you can afford to invest in qualified leads.</p>
          </details>
          <details>
            <summary>Should I use a percentage of revenue to set my marketing budget?</summary>
            <p>Percentages can provide context, but they do not account for project value, margins, close rate, capacity, or your actual revenue gap. This calculator uses those business economics instead.</p>
          </details>
          <details>
            <summary>What does SCALE, FIX, HOLD, or REWORK mean?</summary>
            <p>SCALE means your entered actual CAC is comfortably below allowable CAC and you have capacity. FIX means the economics are near the ceiling. HOLD means operational capacity is the current constraint. REWORK means actual CAC materially exceeds allowable CAC.</p>
          </details>
        </section>
      </main>
    </>
  );
}