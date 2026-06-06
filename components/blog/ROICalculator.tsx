'use client';

import { useState } from 'react';

/**
 * Interactive missed-revenue calculator for the keystone blog post.
 * Demonstrates MDX Option A: a live React component embedded in prose.
 * Styled with GrowthMindset design tokens (bg/accent/cta/ink/border).
 */
export function ROICalculator() {
  const [callsPerDay, setCallsPerDay] = useState(15);
  const [missedPct, setMissedPct] = useState(40);
  const [jobValue, setJobValue] = useState(8000);
  const [closeRate, setCloseRate] = useState(25);

  const missedPerDay = (callsPerDay * missedPct) / 100;
  const missedPerMonth = missedPerDay * 22; // ~22 business days
  const lostJobsPerMonth = (missedPerMonth * closeRate) / 100;
  const lostRevenueMonth = lostJobsPerMonth * jobValue;
  const lostRevenueYear = lostRevenueMonth * 12;

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="my-10 rounded-card border border-border-strong bg-bg-card/60 p-6 backdrop-blur-sm md:p-8">
      <p className="eyebrow mb-2">Interactive</p>
      <h3 className="text-h3 font-semibold text-ink">What missed calls cost you</h3>
      <p className="mt-2 text-sm text-ink-muted">
        Drag the sliders to your numbers. This estimates the revenue walking out
        the door every time a call goes unanswered.
      </p>

      <div className="mt-6 grid gap-6">
        <Slider
          label="Calls per day"
          value={callsPerDay}
          min={1}
          max={100}
          step={1}
          display={`${callsPerDay}`}
          onChange={setCallsPerDay}
        />
        <Slider
          label="% of calls missed"
          value={missedPct}
          min={0}
          max={100}
          step={5}
          display={`${missedPct}%`}
          onChange={setMissedPct}
        />
        <Slider
          label="Average job value"
          value={jobValue}
          min={500}
          max={50000}
          step={500}
          display={fmt(jobValue)}
          onChange={setJobValue}
        />
        <Slider
          label="Close rate on answered calls"
          value={closeRate}
          min={0}
          max={100}
          step={5}
          display={`${closeRate}%`}
          onChange={setCloseRate}
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Missed calls / month" value={Math.round(missedPerMonth).toString()} />
        <Stat label="Lost jobs / month" value={Math.round(lostJobsPerMonth).toString()} />
        <Stat label="Lost revenue / month" value={fmt(lostRevenueMonth)} accent />
      </div>

      <div className="mt-4 rounded-btn border border-cta/40 bg-cta/5 p-5 text-center">
        <p className="text-sm text-ink-muted">Estimated annual revenue lost to missed calls</p>
        <p className="mt-1 text-hero font-semibold text-cta">{fmt(lostRevenueYear)}</p>
      </div>

      <p className="mt-4 text-xs text-ink-dim">
        Estimate only, based on ~22 business days/month. Your numbers will vary.
      </p>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm text-ink-muted">{label}</span>
        <span className="text-sm font-semibold text-accent">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-bg-elevated accent-accent"
        aria-label={label}
      />
    </label>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-btn border border-border bg-bg-elevated/50 p-4 text-center">
      <p className="text-xs text-ink-dim">{label}</p>
      <p className={`mt-1 text-h3 font-semibold ${accent ? 'text-accent' : 'text-ink'}`}>{value}</p>
    </div>
  );
}
