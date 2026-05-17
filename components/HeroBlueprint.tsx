'use client';

import { motion, useReducedMotion } from 'framer-motion';
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
 * Hero "blueprint" — a clean two-row linear flow visualization of
 * the voice agent lifecycle. 7 nodes: 4 across the top (left→right),
 * then 3 across the bottom (right→left), connected by straight lines
 * with a curved connector on the right side. A pulse dot continuously
 * travels the path. Stat tooltips appear on hover / auto-cycle.
 *
 * On mobile (<640px) we collapse to a vertical flow.
 */

interface NodeDef {
  id: number;
  label: string;
  stat: string;
  source: string;
  icon: React.ReactNode;
  /** Position on the SVG canvas (viewBox 0 0 700 350) */
  x: number;
  y: number;
}

const NODES: NodeDef[] = [
  { id: 1, label: 'Phone Rings',         stat: '97% of homeowners say response speed influences who they hire', source: 'CallRail 2026',         icon: <Phone size={20} />,         x: 80,  y: 100 },
  { id: 2, label: 'AI Answers Instantly', stat: '78% of buyers choose the first business to respond',              source: 'Scorpion/CallRail',     icon: <Bot size={20} />,           x: 260, y: 100 },
  { id: 3, label: 'Qualifies the Lead',   stat: '62% of customers call before making a purchase',                  source: 'Invoca',                 icon: <ListChecks size={20} />,    x: 440, y: 100 },
  { id: 4, label: 'Books the Job',        stat: 'Each missed call costs $300–$1,200',                              source: 'Invoca',                 icon: <CalendarCheck size={20} />, x: 620, y: 100 },
  { id: 5, label: 'Texts You Details',    stat: 'Less than 3% of voicemail callers leave a message',               source: 'Invoca',                 icon: <MessageSquare size={20} />, x: 540, y: 260 },
  { id: 6, label: 'Confirmation Calls',   stat: 'Without confirmation reminders, up to 30% of appointments end in no-shows', source: 'AAFP / industry data', icon: <BellRing size={20} />,      x: 340, y: 260 },
  { id: 7, label: 'Asks for Review',      stat: "85% of callers who can't reach you never call back",              source: 'Phone2 / industry research', icon: <Star size={20} />,         x: 140, y: 260 },
];

/**
 * Clean two-row flow path:
 *   Top row (left→right): node 1 → 2 → 3 → 4
 *   Right-side curve: node 4 → node 5 (drops down)
 *   Bottom row (right→left): node 5 → 6 → 7
 *
 * Single continuous open path (no Z/close) so the pulse travels
 * from start to end, then loops via repeatCount.
 */
const FLOW_PATH = `M 80 100 L 260 100 L 440 100 L 620 100 C 670 100, 670 260, 540 260 L 340 260 L 140 260`.replace(/\s+/g, ' ').trim();

/** Total cycle duration (seconds) — pulse traverses the path once. */
const CYCLE_S = 12;

export function HeroBlueprint() {
  const prefersReduced = useReducedMotion();
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [hoverNode, setHoverNode] = useState<number | null>(null);

  // Drive the active-stat tooltip in sync with the pulse cycle.
  useEffect(() => {
    if (prefersReduced) {
      setActiveNode(1);
      return;
    }
    const slice = CYCLE_S / NODES.length; // seconds per node
    let i = 0;
    setActiveNode(NODES[0].id);
    const tick = () => {
      i = (i + 1) % NODES.length;
      setActiveNode(NODES[i].id);
    };
    const interval = setInterval(tick, slice * 1000);
    return () => clearInterval(interval);
  }, [prefersReduced]);

  const visibleNode = hoverNode ?? activeNode;

  return (
    <div className="relative w-full">
      {/* Desktop / tablet: SVG blueprint */}
      <div className="relative hidden sm:block">
        <div className="bp-grid absolute inset-0 rounded-card opacity-60" aria-hidden="true" />

        <svg
          viewBox="0 0 700 350"
          className="relative w-full"
          role="img"
          aria-label="Voice agent lifecycle: 7 connected nodes showing how AI answers, qualifies, books, follows up, and reviews."
        >
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#00d4ff" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="pulseGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#00d4ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Base muted flow line */}
          <path
            d={FLOW_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
          />

          {/* Animated dashed flow (the pulse) */}
          {!prefersReduced && (
            <path
              d={FLOW_PATH}
              fill="none"
              stroke="#00d4ff"
              strokeWidth="1.5"
              strokeOpacity="0.55"
              className="blueprint-path"
            />
          )}

          {/* Traveling glow dot */}
          {!prefersReduced && (
            <circle r="5" fill="#00d4ff" filter="url(#pulseGradient)">
              <animateMotion
                dur={`${CYCLE_S}s`}
                repeatCount="indefinite"
                rotate="auto"
                path={FLOW_PATH}
              />
              <animate
                attributeName="opacity"
                values="0.9;1;0.9"
                dur="1.6s"
                repeatCount="indefinite"
              />
            </circle>
          )}

          {/* Nodes */}
          {NODES.map((n, idx) => {
            const isActive = visibleNode === n.id;
            return (
              <motion.g
                key={n.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * idx, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoverNode(n.id)}
                onMouseLeave={() => setHoverNode(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Glow */}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={isActive ? 36 : 26}
                  fill="url(#nodeGlow)"
                  style={{ transition: 'r 300ms ease' }}
                />
                {/* Node circle */}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="22"
                  fill="#141417"
                  stroke={isActive ? '#00d4ff' : 'rgba(255,255,255,0.15)'}
                  strokeWidth={isActive ? 2 : 1.2}
                  style={{ transition: 'stroke 200ms ease' }}
                />
                {/* Icon (foreignObject so we can use lucide React component) */}
                <foreignObject x={n.x - 11} y={n.y - 11} width="22" height="22">
                  <div
                    style={{
                      color: isActive ? '#00d4ff' : '#9ca3af',
                      transition: 'color 200ms ease',
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

                {/* Label */}
                <text
                  x={n.x}
                  y={n.y + 38}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="500"
                  fill={isActive ? '#f5f5f5' : '#9ca3af'}
                  style={{ transition: 'fill 200ms ease', letterSpacing: '0.01em' }}
                >
                  {n.label}
                </text>
              </motion.g>
            );
          })}
        </svg>

        {/* Stat tooltip (positioned absolutely over the diagram) */}
        {visibleNode && (
          <ActiveStat node={NODES.find((n) => n.id === visibleNode)!} />
        )}
      </div>

      {/* Mobile: vertical flow */}
      <div className="sm:hidden">
        <ol className="relative space-y-3 border-l border-border pl-6">
          {NODES.map((n, idx) => (
            <motion.li
              key={n.id}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="relative"
            >
              <span className="absolute -left-[31px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-accent/50 bg-bg-elevated">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <div className="rounded-card border border-border bg-bg-card/50 p-4">
                <div className="flex items-center gap-2 text-ink">
                  <span className="text-accent">{n.icon}</span>
                  <p className="text-sm font-semibold">{n.label}</p>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">{n.stat}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-ink-dim">
                  {n.source}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Stat bar — static reinforcement */}
      <p className="mt-8 text-center text-xs uppercase tracking-[0.18em] text-ink-muted">
        20 simultaneous calls · 24/7/365 · Zero missed opportunities
      </p>
    </div>
  );
}

function ActiveStat({ node }: { node: NodeDef }) {
  // Position the tooltip relative to the SVG container — anchor by node coords as %.
  const leftPct = (node.x / 700) * 100;
  const topPct = (node.y / 350) * 100;
  // Top-row nodes (y=100): show tooltip below. Bottom-row nodes (y=260): show above.
  const isBottomRow = node.y > 180;
  return (
    <motion.div
      key={node.id}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="pointer-events-none absolute z-10 w-56 -translate-x-1/2 rounded-card border border-accent/30 bg-bg-elevated/95 px-3 py-2.5 shadow-[0_8px_32px_rgba(0,212,255,0.12)] backdrop-blur"
      style={{
        left: `${leftPct}%`,
        top: `calc(${topPct}% + ${isBottomRow ? '-110px' : '60px'})`,
      }}
    >
      <p className="text-[11px] uppercase tracking-wider text-accent">{node.label}</p>
      <p className="mt-1 text-xs leading-snug text-ink">{node.stat}</p>
      <p className="mt-1 text-[10px] uppercase tracking-wider text-ink-dim">
        {node.source}
      </p>
    </motion.div>
  );
}
