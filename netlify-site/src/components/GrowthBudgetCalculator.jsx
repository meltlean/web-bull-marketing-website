import React, { useMemo, useState } from 'react';

const FORM_NAME = 'remodeling-growth-plan';

const money = (n) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);

const number = (n, digits = 0) =>
  new Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits,
  }).format(Number.isFinite(n) ? n : 0);

/*
 * Lets visitors enter a simple root domain such as:
 * captainremodel.com
 *
 * Netlify will receive:
 * https://captainremodel.com
 */
function normalizeWebsite(value) {
  const website = value.trim();

  if (!website) return '';

  if (/^https?:\/\//i.test(website)) {
    return website;
  }

  return `https://${website}`;
}

function getAttribution() {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);

  return {
    landing_page: window.location.href,
    referrer: document.referrer || '',
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || '',
  };
}

function track(event, payload = {}) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...payload,
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, payload);
  }
}

function Field({
  label,
  hint,
  prefix,
  suffix,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
}) {
  return (
    <label className="gb-field">
      <span className="gb-field-label">{label}</span>

      <span className="gb-input-wrap">
        {prefix && (
          <span className="gb-affix gb-prefix">
            {prefix}
          </span>
        )}

        <input
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`${prefix ? 'has-prefix' : ''} ${
            suffix ? 'has-suffix' : ''
          }`}
        />

        {suffix && (
          <span className="gb-affix gb-suffix">
            {suffix}
          </span>
        )}
      </span>

      {hint && (
        <span className="gb-hint">
          {hint}
        </span>
      )}
    </label>
  );
}

export default function GrowthBudgetCalculator({
  bookingLink = '#',
  onLeadSubmitted,
}) {
  const [step, setStep] = useState(1);
  const [capacity, setCapacity] = useState('yes');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const [lead, setLead] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    website: '',
  });

  const [values, setValues] = useState({
    currentRevenue: 3000000,
    targetRevenue: 4000000,
    baselineRevenue: 3300000,
    projectValue: 100000,
    grossMargin: 35,
    closeRate: 25,
    qualificationRate: 50,
    acquisitionAllowance: 10,
    currentSpend: 0,
    currentCustomers: 0,
  });

  const setVal = (key, value) =>
    setValues((prev) => ({
      ...prev,
      [key]: Number.isFinite(value) ? value : 0,
    }));

  const results = useMemo(() => {
    const projectValue = Math.max(values.projectValue, 1);
    const close = Math.max(values.closeRate, 0.1) / 100;
    const qual = Math.max(values.qualificationRate, 0.1) / 100;
    const margin = Math.max(values.grossMargin, 0) / 100;
    const allowance =
      Math.max(values.acquisitionAllowance, 0) / 100;

    const revenueGap = Math.max(
      values.targetRevenue - values.baselineRevenue,
      0
    );

    const customersNeeded = Math.ceil(
      revenueGap / projectValue
    );

    const qualifiedLeadsNeeded = customersNeeded
      ? Math.ceil(customersNeeded / close)
      : 0;

    const totalInquiriesNeeded = qualifiedLeadsNeeded
      ? Math.ceil(qualifiedLeadsNeeded / qual)
      : 0;

    const grossProfitPerProject =
      projectValue * margin;

    const allowableCAC =
      grossProfitPerProject * allowance;

    const targetCPQL =
      allowableCAC * close;

    const targetCPI =
      targetCPQL * qual;

    const annualGrowthBudget =
      customersNeeded * allowableCAC;

    const monthlyGrowthBudget =
      annualGrowthBudget / 12;

    const projectedGrossProfit =
      customersNeeded * grossProfitPerProject;

    const grossProfitAfterAcquisition =
      projectedGrossProfit - annualGrowthBudget;

    const grossProfitROI =
      annualGrowthBudget > 0
        ? (
            (projectedGrossProfit - annualGrowthBudget) /
            annualGrowthBudget
          ) * 100
        : 0;

    const actualCAC =
      values.currentCustomers > 0
        ? values.currentSpend / values.currentCustomers
        : null;

    let diagnosis = {
      key: 'PLAN',
      title: 'You now have a growth target.',
      body:
        'Use these benchmarks to plan acquisition. Add current spend and customers acquired to compare actual performance.',
    };

    if (capacity === 'no') {
      diagnosis = {
        key: 'HOLD',
        title:
          'Protect capacity before scaling demand.',
        body:
          'Your economics may support growth, but operations are currently the constraint. Maintain demand, improve project mix, and add capacity before materially increasing acquisition.',
      };
    } else if (
      actualCAC !== null &&
      allowableCAC > 0
    ) {
      const ratio =
        actualCAC / allowableCAC;

      if (ratio <= 0.8) {
        diagnosis = {
          key: 'SCALE',
          title:
            'Your acquisition economics have room.',
          body:
            'Current CAC is comfortably below your allowable CAC. If lead quality, margins, close rate, and production capacity are healthy, this may support additional investment.',
        };
      } else if (ratio <= 1.1) {
        diagnosis = {
          key: 'FIX',
          title:
            'Optimize before you add meaningful spend.',
          body:
            'Current CAC is close to your allowable ceiling. Improve lead quality, conversion, follow-up, pricing, or channel efficiency before scaling aggressively.',
        };
      } else {
        diagnosis = {
          key: 'REWORK',
          title:
            'The current acquisition economics need work.',
          body:
            'Current CAC is materially above your allowable target. Diagnose the funnel and rework the channel before allocating additional budget.',
        };
      }
    }

    return {
      revenueGap,
      customersNeeded,
      qualifiedLeadsNeeded,
      totalInquiriesNeeded,
      grossProfitPerProject,
      allowableCAC,
      targetCPQL,
      targetCPI,
      annualGrowthBudget,
      monthlyGrowthBudget,
      projectedGrossProfit,
      grossProfitAfterAcquisition,
      grossProfitROI,
      actualCAC,
      diagnosis,
    };
  }, [values, capacity]);

  const next = () => {
    setStep((s) => Math.min(3, s + 1));

    track('calculator_step_completed', {
      step,
    });
  };

  const back = () =>
    setStep((s) => Math.max(1, s - 1));

  const calculate = () => {
    setStep(4);

    track('calculator_completed', {
      result: results.diagnosis.key,
      annual_growth_budget: Math.round(
        results.annualGrowthBudget
      ),
      allowable_cac: Math.round(
        results.allowableCAC
      ),
      target_cpql: Math.round(
        results.targetCPQL
      ),
    });

    setTimeout(() => {
      document
        .getElementById('gb-results')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    }, 50);
  };

  const encoded = (data) =>
    Object.keys(data)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            data[key] ?? ''
          )}`
      )
      .join('&');

  const submitLead = async (e) => {
    e.preventDefault();

    setFormError('');

    if (
      !lead.name.trim() ||
      !lead.email.trim()
    ) {
      setFormError(
        'Please enter your name and email.'
      );
      return;
    }

    setSubmitting(true);

    const attribution =
      getAttribution();

    /*
     * Normalize the website only when submitting.
     *
     * Visitor can type:
     * captainremodel.com
     *
     * Netlify receives:
     * https://captainremodel.com
     */
    const normalizedWebsite =
      normalizeWebsite(lead.website);

    const payload = {
      'form-name': FORM_NAME,

      ...lead,

      website: normalizedWebsite,

      ...attribution,

      current_revenue:
        values.currentRevenue,

      target_revenue:
        values.targetRevenue,

      expected_revenue_without_new_acquisition:
        values.baselineRevenue,

      average_project_value:
        values.projectValue,

      gross_margin:
        values.grossMargin,

      qualified_lead_close_rate:
        values.closeRate,

      qualification_rate:
        values.qualificationRate,

      acquisition_allowance:
        values.acquisitionAllowance,

      current_acquisition_spend:
        values.currentSpend,

      current_customers_acquired:
        values.currentCustomers,

      capacity,

      revenue_gap:
        Math.round(results.revenueGap),

      customers_needed:
        results.customersNeeded,

      qualified_leads_needed:
        results.qualifiedLeadsNeeded,

      total_inquiries_needed:
        results.totalInquiriesNeeded,

      allowable_cac:
        Math.round(results.allowableCAC),

      target_cpql:
        Math.round(results.targetCPQL),

      target_cpi:
        Math.round(results.targetCPI),

      annual_growth_budget:
        Math.round(
          results.annualGrowthBudget
        ),

      monthly_growth_budget:
        Math.round(
          results.monthlyGrowthBudget
        ),

      projected_gross_profit:
        Math.round(
          results.projectedGrossProfit
        ),

      gross_profit_roi_percent:
        Math.round(
          results.grossProfitROI
        ),

      actual_cac:
        results.actualCAC === null
          ? ''
          : Math.round(
              results.actualCAC
            ),

      diagnosis:
        results.diagnosis.key,
    };

    try {
      const response =
        await fetch('/', {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/x-www-form-urlencoded',
          },

          body: encoded(payload),
        });

      if (!response.ok) {
        throw new Error(
          'Submission failed'
        );
      }

      setSubmitted(true);

      track(
        'growth_plan_lead_submitted',
        {
          result:
            results.diagnosis.key,

          source:
            attribution.utm_source ||
            attribution.referrer ||
            'direct',
        }
      );

      if (
        typeof onLeadSubmitted ===
        'function'
      ) {
        onLeadSubmitted(payload);
      }
    } catch (err) {
      setFormError(
        'Something went wrong saving your plan. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="gb-shell">

      <div className="gb-card gb-calculator-card">

        <div className="gb-progress">

          {[1, 2, 3].map((n) => (

            <div
              key={n}
              className={`gb-progress-step ${
                step >= n ? 'active' : ''
              }`}
            >

              <span>{n}</span>

              <small>
                {n === 1
                  ? 'Growth Goal'
                  : n === 2
                  ? 'Economics'
                  : 'Current Performance'}
              </small>

            </div>

          ))}

        </div>

        {step === 1 && (

          <div className="gb-step">

            <span className="gb-kicker">
              Step 1
            </span>

            <h2>
              Where are you going?
            </h2>

            <p className="gb-step-intro">
              Start with the revenue target, then define how much new acquisition actually needs to produce.
            </p>

            <div className="gb-fields">

              <Field
                label="Current Annual Revenue"
                prefix="$"
                step={1000}
                value={
                  values.currentRevenue
                }
                onChange={(v) =>
                  setVal(
                    'currentRevenue',
                    v
                  )
                }
              />

              <Field
                label="Target Annual Revenue"
                prefix="$"
                step={1000}
                value={
                  values.targetRevenue
                }
                onChange={(v) =>
                  setVal(
                    'targetRevenue',
                    v
                  )
                }
              />

              <Field
                label="Expected Revenue Without New Acquisition"
                prefix="$"
                step={1000}
                value={
                  values.baselineRevenue
                }
                onChange={(v) =>
                  setVal(
                    'baselineRevenue',
                    v
                  )
                }
                hint="Backlog, repeat clients, referrals, and existing demand."
              />

              <Field
                label="Average Project Value"
                prefix="$"
                step={1000}
                value={
                  values.projectValue
                }
                onChange={(v) =>
                  setVal(
                    'projectValue',
                    v
                  )
                }
              />

            </div>

            <div className="gb-actions">

              <button
                className="btn btn-primary"
                type="button"
                onClick={next}
              >
                Next: Business Economics →
              </button>

            </div>

          </div>

        )}

        {step === 2 && (

          <div className="gb-step">

            <span className="gb-kicker">
              Step 2
            </span>

            <h2>
              How does your business perform?
            </h2>

            <p className="gb-step-intro">
              These inputs determine what a new customer—and therefore a qualified lead—can economically be worth.
            </p>

            <div className="gb-fields">

              <Field
                label="Gross Margin"
                suffix="%"
                max={100}
                step={0.5}
                value={
                  values.grossMargin
                }
                onChange={(v) =>
                  setVal(
                    'grossMargin',
                    v
                  )
                }
              />

              <Field
                label="Qualified Lead Close Rate"
                suffix="%"
                max={100}
                step={0.5}
                value={
                  values.closeRate
                }
                onChange={(v) =>
                  setVal(
                    'closeRate',
                    v
                  )
                }
                hint="Sold projects ÷ qualified opportunities."
              />

              <Field
                label="Lead Qualification Rate"
                suffix="%"
                max={100}
                step={0.5}
                value={
                  values.qualificationRate
                }
                onChange={(v) =>
                  setVal(
                    'qualificationRate',
                    v
                  )
                }
                hint="Qualified leads ÷ total inquiries."
              />

              <Field
                label="Acquisition Allowance"
                suffix="%"
                max={100}
                step={0.5}
                value={
                  values.acquisitionAllowance
                }
                onChange={(v) =>
                  setVal(
                    'acquisitionAllowance',
                    v
                  )
                }
                hint="Percent of gross profit you are willing to invest to acquire a customer."
              />

            </div>

            <div className="gb-actions split">

              <button
                className="btn btn-ghost"
                type="button"
                onClick={back}
              >
                ← Back
              </button>

              <button
                className="btn btn-primary"
                type="button"
                onClick={next}
              >
                Next: Current Performance →
              </button>

            </div>

          </div>

        )}

        {step === 3 && (

          <div className="gb-step">

            <span className="gb-kicker">
              Step 3
            </span>

            <h2>
              How are you performing today?
            </h2>

            <p className="gb-step-intro">
              Optional current-performance data lets the calculator compare actual CAC to your allowable CAC.
            </p>

            <div className="gb-fields">

              <Field
                label="Current Annual Acquisition Spend"
                prefix="$"
                step={1000}
                value={
                  values.currentSpend
                }
                onChange={(v) =>
                  setVal(
                    'currentSpend',
                    v
                  )
                }
                hint="Use paid media only or fully loaded acquisition spend—just be consistent."
              />

              <Field
                label="Customers Acquired From That Spend"
                step={1}
                value={
                  values.currentCustomers
                }
                onChange={(v) =>
                  setVal(
                    'currentCustomers',
                    v
                  )
                }
              />

            </div>

            <div className="gb-capacity">

              <span className="gb-field-label">
                Can your operations team profitably handle
