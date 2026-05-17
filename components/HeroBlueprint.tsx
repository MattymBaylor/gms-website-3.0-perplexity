'use client';

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Phone,
  Bot,
  ListChecks,
  CalendarCheck,
  MessageSquare,
  BellRing,
  Star,
} from 'lucide-react';

/**
 * Hero "blueprint" — a clean horizontal timeline showing the 7-step
 * voice agent lifecycle. Steps flow left→right with clear numbering.
 * Desktop: two rows (4 + 3) connected by a smooth path.
 * Mobile: vertical numbered list.
 */

interface NodeDef {
  id: number;
  label: string;
  stat: string;
  source: string;
  icon: React.ReactNode;
}

const NODES: NodeDef[] = [
  { id: 1, label: 'Phone Rings',         stat: '97% of homeowners say response speed influences who they hire', source: 'CallRail 2026',             icon: <Phone size={18} /> },
  { id: 2, label: 'AI Answers',          stat: '78% of buyers choose the first business to respond',              source: 'Scorpion / CallRail',       icon: <Bot size={18} /> },
  { id: 3, label: 'Qualifies Lead',      stat: '62% of customers call before making a purchase',                  source: 'Invoca',                     icon: <ListChecks size={18} /> },
  { id: 4, label: 'Books the Job',       stat: 'Each missed call costs $300–$1,200',                              source: 'Invoca',                     icon: <CalendarCheck size={18} /> },
  { id: 5, label: 'Texts Details',       stat: 'Less than 3% of voicemail callers leave a message',               source: 'Invoca',                     icon: <MessageSquare size={18} /> },
  { id: 6, label: 'Confirms Appt',       stat: 'Without reminders, up to 30% of appointments are no-shows',       source: 'AAFP / industry data',       icon: <BellRing size={18} /> },
  { id: 7, label: 'Gets Review',         stat: "85% of callers who can't reach you never call back",              source: 'Phone2 / industry research', icon: <Star size={18} /> },
];

const CYCLE_S = 12;

export function HeroBlueprint() {
  const prefersReduced = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  useEffect(() => {
    if (prefersReduced) return;
    const slice = (CYCLE_S / NODES.length) * 1000;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % NODES.length);
    }, slice);
    return () => clearInterval(interval);
  }, [prefersReduced]);

  const visibleIdx = hoverIdx ?? activeIdx;

  /* ── Desktop layout positions (viewBox 0 0 640 320) ── */
  const topRow = [
    { x: 60,  y: 70 },
    { x: 220, y: 70 },
    { x: 380, y: 70 },
    { x: 540, y: 70 },
  ];
  const botRow = [
    { x: 480, y: 230 },
    { x: 310, y: 230 },
    { x: 140, y: 230 },
  ];
  const positions = [...topRow, ...botRow];

  /* The flow path: top row L→R, curve down-right, bottom row R→L */
  const FLOW_PATH = [
    `M ${topRow[0].x} ${topRow[0].y}`,
    `L ${topRow[1].x} ${topRow[1].y}`,
    `L ${topRow[2].x} ${topRow[2].y}`,
    `L ${topRow[3].x} ${topRow[3].y}`,
    `C ${topRow[3].x + 50} ${topRow[3].y}, ${botRow[0].x + 50} ${botRow[0].y}, ${botRow[0].x} ${botRow[0].y}`,
    `L ${botRow[1].x} ${botRow[1].y}`,
    `L ${botRow[2].x} ${botRow[2].y}`,
  ].join(' ');

  return (
    <div className="relative w-full">
      {/* ── Desktop / tablet ── */}
      <div className="relative hidden sm:block">
        <svg
          viewBox="0 0 640 320"
          className="relative w-full"
          role="img"
          aria-label="Voice agent lifecycle: 7 steps from phone ring to review."
        >
          <defs>
            <radialGradient id="nodeGlow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Flow line — muted base */}
          <path
            d={FLOW_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />

          {/* Animated pulse path */}
          {!prefersReduced && (
            <path
              d={FLOW_PATH}
              fill="none"
              stroke="#00d4ff"
              strokeWidth="2"
              strokeOpacity="0.3"
              strokeDasharray="6 4"
            />
          )}

          {/* Traveling dot */}
          {!prefersReduced && (
            <circle r="4" fill="#00d4ff" opacity="0.9">
              <animateMotion
                dur={`${CYCLE_S}s`}
                repeatCount="indefinite"
                path={FLOW_PATH}
              />
            </circle>
          )}

          {/* Step numbers along the path — small "1" "2" etc above each node */}
          {NODES.map((n, idx) => {
            const pos = positions[idx];
            const isActive = visibleIdx === idx;
            return (
              <g
                key={n.id}
                onMouseEnter={() => setHoverIdx(idx)}
                onMouseLeave={() => setHoverIdx(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Glow behind active node */}
                {isActive && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="32"
                    fill="url(#nodeGlow2)"
                  />
                )}

                {/* Circle bg */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="20"
                  fill="#141417"
                  stroke={isActive ? '#00d4ff' : 'rgba(255,255,255,0.12)'}
                  strokeWidth={isActive ? 1.5 : 1}
                  style={{ transition: 'stroke 250ms ease, stroke-width 250ms ease' }}
                />

                {/* Step number (small, top-left of circle) */}
                <text
                  x={pos.x - 14}
                  y={pos.y - 24}
                  fontSize="9"
                  fontWeight="600"
                  fill={isActive ? '#00d4ff' : 'rgba(255,255,255,0.25)'}
                  style={{ transition: 'fill 250ms ease', fontVariantNumeric: 'tabular-nums' }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </text>

                {/* Icon */}
                <foreignObject x={pos.x - 9} y={pos.y - 9} width="18" height="18">
                  <div
                    style={{
                      color: isActive ? '#00d4ff' : '#6b7280',
                      transition: 'color 250ms ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    {n.icon}
                  </div>
                </foreignObject>

                {/* Label below */}
                <text
                  x={pos.x}
                  y={pos.y + 36}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="500"
                  fill={isActive ? '#f5f5f5' : '#6b7280'}
                  style={{ transition: 'fill 250ms ease' }}
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Stat tooltip */}
        <AnimatePresence mode="wait">
          <motion.div
            key={visibleIdx}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-lg border border-accent/20 bg-bg-elevated/95 px-3 py-2 shadow-lg backdrop-blur"
            style={{
              left: `${(positions[visibleIdx].x / 640) * 100}%`,
              top: positions[visibleIdx].y > 150
                ? `${((positions[visibleIdx].y - 50) / 320) * 100}%`
                : `${((positions[visibleIdx].y + 55) / 320) * 100}%`,
              maxWidth: '220px',
            }}
          >
            <p className="text-[11px] font-medium text-accent">
              Step {visibleIdx + 1}: {NODES[visibleIdx].label}
            </p>
            <p className="mt-1 text-xs leading-snug text-ink">
              {NODES[visibleIdx].stat}
            </p>
            <p className="mt-0.5 text-[10px] text-ink-dim">
              {NODES[visibleIdx].source}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Mobile: numbered vertical flow ── */}
      <div className="sm:hidden">
        <ol className="relative space-y-1 pl-10">
          {NODES.map((n, idx) => {
            const isActive = visibleIdx === idx;
            return (
              <motion.li
                key={n.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.35 }}
                className="relative"
              >
                {/* Connecting line */}
                {idx < NODES.length - 1 && (
                  <div className="absolute left-[-21px] top-8 h-full w-px bg-border" />
                )}
                {/* Number badge */}
                <span
                  className={`absolute -left-[29px] top-3 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold transition-colors ${
                    isActive
                      ? 'border border-accent bg-accent/10 text-accent'
                      : 'border border-border bg-bg-elevated text-ink-dim'
                  }`}
                >
                  {idx + 1}
                </span>
                <div className="rounded-lg border border-border/50 bg-bg-card/30 px-3 py-2.5 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={isActive ? 'text-accent' : 'text-ink-dim'}>{n.icon}</span>
                    <p className={`text-sm font-medium ${isActive ? 'text-ink' : 'text-ink-muted'}`}>
                      {n.label}
                    </p>
                  </div>
                  {isActive && (
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{n.stat}</p>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>

      {/* Stat bar */}
      <p className="mt-8 text-center text-xs uppercase tracking-[0.18em] text-ink-muted">
        20 simultaneous calls · 24/7/365 · Zero missed opportunities
      </p>
    </div>
  );
}
