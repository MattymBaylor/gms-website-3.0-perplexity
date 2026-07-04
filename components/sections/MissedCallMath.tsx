'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, PhoneCall, PhoneMissed, RotateCcw, Zap } from 'lucide-react';

/**
 * Animated, industry-specific "what missed calls cost" explainer.
 * Replaces the generic YouTube embed on industry pages: a 4-scene sequence
 * (call rings out → missed-call rate → the revenue math → the AI flip)
 * driven by per-industry economics from content/industry-economics.ts.
 *
 * Autoplays once scrolled into view; scene dots + replay for manual control.
 * prefers-reduced-motion: skips straight to the final scene, no timers.
 */
export interface IndustryEconomics {
  /** Display name, e.g. "HVAC" */
  industry: string;
  /** Heading noun phrase with article, e.g. "an HVAC business", "a law firm" */
  businessNoun: string;
  /** Scene-1 timestamp/place line, e.g. "9:40 PM · Cape Coral" */
  scenario: string;
  /** Scene-1 story line, e.g. "The A/C quits in August…" */
  scenarioDetail: string;
  /** Average sale in USD (researched SWFL figure) */
  avgTicket: number;
  /** What avgTicket represents, e.g. "avg A/C system replacement" */
  metricLabel: string;
  /** Assumed unanswered calls per week */
  missedPerWeek: number;
  /** Scene-2 context for when calls get missed, e.g. "after hours, on ladders, during jobs" */
  missedDetail: string;
  /** Close rate on answered calls, 0–1 */
  closeRate: number;
  /** One-line fine-print on where the figure comes from */
  basis: string;
}

const SCENE_MS = [3200, 3200, 4600]; // scenes 0–2 auto-advance; scene 3 holds

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/** rAF count-up from 0 to target whenever `run` flips true. */
function useCountUp(target: number, run: boolean, ms = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / ms, 1);
      // ease-out cubic
      setValue(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, ms]);
  return run ? value : 0;
}

export function MissedCallMath({ data }: { data: IndustryEconomics }) {
  const missedPerMonth = Math.round(data.missedPerWeek * 4.3);
  const lostJobs = missedPerMonth * data.closeRate;
  const lostMonthly = Math.round(lostJobs * data.avgTicket);

  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  // Start once, when the stage scrolls into view.
  useEffect(() => {
    if (started) return;
    const el = stageRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStarted(true);
      setScene(3);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          setPlaying(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  // Auto-advance scenes 0–2.
  useEffect(() => {
    if (!playing || scene >= 3) return;
    const t = setTimeout(() => setScene((s) => s + 1), SCENE_MS[scene]);
    return () => clearTimeout(t);
  }, [playing, scene]);

  const replay = useCallback(() => {
    setScene(0);
    setPlaying(true);
  }, []);

  const goTo = useCallback((s: number) => {
    setScene(s);
    setPlaying(s < 3);
  }, []);

  const missedCount = useCountUp(missedPerMonth, started && scene >= 1, 1000);
  const lostCount = useCountUp(lostMonthly, started && scene === 2, 2200);

  return (
    <section className="section" aria-labelledby="missed-call-math-heading">
      <div className="container-prose">
        <div className="mb-10 text-center">
          <p className="eyebrow">The math, in 30 seconds</p>
          <h2 id="missed-call-math-heading" className="mt-3 text-h1 font-semibold text-ink">
            What missed calls cost {data.businessNoun}
          </h2>
        </div>

        {/* Stage */}
        <div
          ref={stageRef}
          className="relative flex min-h-[380px] w-full flex-col justify-center overflow-hidden rounded-card border border-border bg-bg-card p-8 md:min-h-[430px] md:p-12"
        >
          {/* Scene 0 — the call */}
          {scene === 0 && (
            <div key="s0" className="animate-fade-in text-center">
              <p className="text-sm font-medium tracking-wide text-ink-dim">{data.scenario}</p>
              <div className="relative mx-auto mt-8 flex h-20 w-20 items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent/20" aria-hidden="true" />
                <span className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                  <PhoneCall size={30} />
                </span>
              </div>
              <p className="mx-auto mt-8 max-w-md text-lead text-ink">{data.scenarioDetail}</p>
              <p className="mt-4 text-sm text-ink-muted">
                Whoever answers first usually wins the job.
              </p>
            </div>
          )}

          {/* Scene 1 — the leak */}
          {scene === 1 && (
            <div key="s1" className="animate-fade-in text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-red-300">
                <PhoneMissed size={13} aria-hidden="true" /> Missed
              </span>
              <p className="mt-8 text-hero font-semibold tabular-nums text-ink">
                ≈ {Math.round(missedCount)}
              </p>
              <p className="mt-2 text-lead text-ink-muted">
                calls a month go unanswered —
                <br className="hidden md:block" /> {data.missedDetail}.
              </p>
            </div>
          )}

          {/* Scene 2 — the math */}
          {scene === 2 && (
            <div key="s2" className="animate-fade-in text-center">
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-ink-muted md:text-base">
                <span className="rounded-full border border-border bg-bg-elevated/60 px-3.5 py-1.5 tabular-nums">
                  {missedPerMonth} missed calls
                </span>
                <span aria-hidden="true">×</span>
                <span className="rounded-full border border-border bg-bg-elevated/60 px-3.5 py-1.5 tabular-nums">
                  {Math.round(data.closeRate * 100)}% close rate
                </span>
                <span aria-hidden="true">×</span>
                <span className="rounded-full border border-border bg-bg-elevated/60 px-3.5 py-1.5 tabular-nums">
                  {fmt(data.avgTicket)} {data.metricLabel}
                </span>
              </div>
              <p className="mt-8 text-hero font-semibold tabular-nums text-cta">
                {fmt(Math.round(lostCount))}
              </p>
              <p className="mt-2 text-lead text-ink-muted">
                walking out the door every month.
              </p>
            </div>
          )}

          {/* Scene 3 — the fix */}
          {scene === 3 && (
            <div key="s3" className="animate-fade-in text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-success">
                <Zap size={13} aria-hidden="true" /> AI answers in under a second
              </span>
              <p className="mt-8 text-hero font-semibold tabular-nums text-success">
                {fmt(lostMonthly)}
              </p>
              <p className="mt-2 text-lead text-ink-muted">
                back in play every month — every call answered, qualified, and booked.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="#cta" className="btn-primary">
                  Get Your Free Demo <ArrowRight size={16} />
                </a>
                <button
                  type="button"
                  onClick={replay}
                  className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  <RotateCcw size={14} aria-hidden="true" /> Replay
                </button>
              </div>
            </div>
          )}

          {/* Scene dots */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {[0, 1, 2, 3].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => goTo(s)}
                aria-label={`Scene ${s + 1}`}
                aria-current={scene === s}
                className={[
                  'h-1.5 rounded-full transition-all duration-300',
                  scene === s ? 'w-6 bg-accent' : 'w-1.5 bg-white/20 hover:bg-white/40',
                ].join(' ')}
              />
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-ink-dim">
          Illustration with typical Southwest Florida figures — {data.basis} Assumes ~
          {data.missedPerWeek} unanswered calls/week. Your numbers will vary.
        </p>
      </div>
    </section>
  );
}
