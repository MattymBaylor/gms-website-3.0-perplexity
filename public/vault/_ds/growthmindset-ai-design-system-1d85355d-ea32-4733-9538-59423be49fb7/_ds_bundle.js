/* @ds-bundle: {"format":3,"namespace":"GrowthMindsetAiDesignSystem_1d8535","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Card","sourcePath":"components/layout/Card.jsx"},{"name":"SectionHeading","sourcePath":"components/layout/SectionHeading.jsx"},{"name":"StatCallout","sourcePath":"components/layout/StatCallout.jsx"},{"name":"DepartmentCard","sourcePath":"components/sales/DepartmentCard.jsx"},{"name":"FlowDiagram","sourcePath":"components/sales/FlowDiagram.jsx"},{"name":"ProblemMirror","sourcePath":"components/sales/ProblemMirror.jsx"},{"name":"RoadmapStep","sourcePath":"components/sales/RoadmapStep.jsx"},{"name":"Testimonial","sourcePath":"components/sales/Testimonial.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"82b40937a89d","components/core/Button.jsx":"e9324343e203","components/core/Eyebrow.jsx":"6b99fc1f3329","components/layout/Card.jsx":"80a4c486cbde","components/layout/SectionHeading.jsx":"cf6ab94203ba","components/layout/StatCallout.jsx":"72940dd2a1ca","components/sales/DepartmentCard.jsx":"0d0cf84f24da","components/sales/FlowDiagram.jsx":"ec3998edc22d","components/sales/ProblemMirror.jsx":"2b0767b3a442","components/sales/RoadmapStep.jsx":"bef9743c3d1c","components/sales/Testimonial.jsx":"6046bde48c20","ui_kits/prospect_page/AudioStrip.jsx":"ef5786e074e9","ui_kits/prospect_page/BlueprintViewer.jsx":"2aa6efd35435","ui_kits/prospect_page/CTASection.jsx":"4abc5c95d588","ui_kits/prospect_page/CaseFilm.jsx":"1cdb04cd4542","ui_kits/prospect_page/CreativeBrief.jsx":"3c03469fecb6","ui_kits/prospect_page/StepsSection.jsx":"a63170e32dee"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GrowthMindsetAiDesignSystem_1d8535 = window.GrowthMindsetAiDesignSystem_1d8535 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
/**
 * Badge / Tag — small mono label for statuses, tech stack, phase markers.
 * tone: neutral | accent | outcome | positive | negative
 */
function Badge({
  children,
  tone = 'neutral',
  surface = 'paper',
  icon = null,
  style = {}
}) {
  const onNight = surface === 'night';
  const tones = {
    neutral: onNight ? {
      bg: 'rgba(148,163,184,0.10)',
      color: 'var(--text-night-body)',
      border: 'var(--night-line-strong)'
    } : {
      bg: 'var(--surface-sunken)',
      color: 'var(--text-body)',
      border: 'var(--border)'
    },
    accent: onNight ? {
      bg: 'var(--accent-night-soft)',
      color: 'var(--accent-night)',
      border: 'rgba(0,212,255,0.3)'
    } : {
      bg: 'var(--accent-soft)',
      color: 'var(--accent)',
      border: 'var(--accent-soft-border)'
    },
    outcome: {
      bg: 'var(--outcome-soft)',
      color: onNight ? 'var(--gm-amber-soft)' : '#9a6510',
      border: 'rgba(245,165,36,0.3)'
    },
    positive: {
      bg: 'var(--positive-soft)',
      color: 'var(--positive)',
      border: 'rgba(16,185,129,0.3)'
    },
    negative: {
      bg: 'var(--negative-soft)',
      color: 'var(--negative)',
      border: 'rgba(229,72,77,0.3)'
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: '0.02em',
      padding: '4px 9px',
      borderRadius: 'var(--radius-xs)',
      background: t.bg,
      color: t.color,
      border: `1px solid ${t.border}`,
      whiteSpace: 'nowrap',
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 13,
      height: 13
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — primary action across paper and night surfaces.
 * Variants: primary (teal/cyan), secondary (ink outline), ghost, on-night.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  surface = 'paper',
  icon = null,
  iconRight = null,
  href = null,
  disabled = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      fontSize: 13,
      padding: '8px 14px',
      radius: 8,
      gap: 7,
      icon: 15
    },
    md: {
      fontSize: 15,
      padding: '12px 20px',
      radius: 10,
      gap: 9,
      icon: 17
    },
    lg: {
      fontSize: 16,
      padding: '15px 26px',
      radius: 12,
      gap: 10,
      icon: 19
    }
  };
  const s = sizes[size] || sizes.md;
  const onNight = surface === 'night';
  const palettes = {
    primary: onNight ? {
      bg: 'var(--accent-night)',
      color: '#04121a',
      border: 'transparent',
      hover: '#5fe3ff'
    } : {
      bg: 'var(--accent)',
      color: '#fff',
      border: 'transparent',
      hover: 'var(--accent-hover)'
    },
    secondary: onNight ? {
      bg: 'transparent',
      color: 'var(--text-night-strong)',
      border: 'var(--night-line-strong)',
      hover: 'rgba(255,255,255,0.06)'
    } : {
      bg: 'transparent',
      color: 'var(--text-strong)',
      border: 'var(--border-strong)',
      hover: 'var(--surface-sunken)'
    },
    ghost: onNight ? {
      bg: 'transparent',
      color: 'var(--text-night-body)',
      border: 'transparent',
      hover: 'rgba(255,255,255,0.06)'
    } : {
      bg: 'transparent',
      color: 'var(--text-body)',
      border: 'transparent',
      hover: 'var(--surface-sunken)'
    }
  };
  const p = palettes[variant] || palettes.primary;
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: s.fontSize,
    letterSpacing: '-0.01em',
    lineHeight: 1,
    padding: s.padding,
    borderRadius: s.radius,
    border: `1.5px solid ${p.border === 'transparent' ? 'transparent' : p.border}`,
    background: p.bg,
    color: p.color,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    textDecoration: 'none',
    transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
    whiteSpace: 'nowrap',
    ...style
  };
  const onEnter = e => {
    if (!disabled) e.currentTarget.style.background = p.hover;
  };
  const onLeave = e => {
    if (!disabled) e.currentTarget.style.background = p.bg;
  };
  const onDown = e => {
    if (!disabled) e.currentTarget.style.transform = 'translateY(1px)';
  };
  const onUp = e => {
    if (!disabled) e.currentTarget.style.transform = 'none';
  };
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, icon ? /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: s.icon,
      height: s.icon
    }
  }) : null, /*#__PURE__*/React.createElement("span", null, children), iconRight ? /*#__PURE__*/React.createElement("i", {
    "data-lucide": iconRight,
    style: {
      width: s.icon,
      height: s.icon
    }
  }) : null);
  const props = {
    style: baseStyle,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onMouseDown: onDown,
    onMouseUp: onUp,
    ...rest
  };
  if (href && !disabled) return /*#__PURE__*/React.createElement("a", _extends({
    href: href
  }, props), inner);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled
  }, props), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
/**
 * Eyebrow — the mono uppercase kicker that labels every section.
 * Optionally prefixed with a short index (e.g. "01") and a tick mark.
 */
function Eyebrow({
  children,
  index = null,
  surface = 'paper',
  align = 'left',
  style = {}
}) {
  const onNight = surface === 'night';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      fontWeight: 500,
      color: onNight ? 'var(--accent-night)' : 'var(--accent)',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      ...style
    }
  }, index != null && /*#__PURE__*/React.createElement("span", {
    style: {
      color: onNight ? 'var(--text-night-faint)' : 'var(--text-faint)'
    }
  }, index), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      width: 22,
      height: 1.5,
      background: onNight ? 'var(--accent-night)' : 'var(--accent)',
      opacity: 0.7,
      display: 'inline-block'
    }
  }), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/layout/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the base surface for the whole system. Paper or night.
 * Optional accent edge (top) and hover lift.
 */
function Card({
  children,
  surface = 'paper',
  accent = false,
  hover = false,
  pad = 24,
  style = {},
  ...rest
}) {
  const onNight = surface === 'night';
  const base = {
    position: 'relative',
    background: onNight ? 'var(--surface-night-card)' : 'var(--surface-card)',
    border: `1px solid ${onNight ? 'var(--night-line)' : 'var(--border)'}`,
    borderRadius: 'var(--radius)',
    padding: pad,
    boxShadow: onNight ? 'var(--shadow-night)' : 'var(--shadow-card)',
    transition: 'transform var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out)',
    overflow: 'hidden',
    ...style
  };
  const onEnter = e => {
    if (!hover) return;
    e.currentTarget.style.transform = 'translateY(-3px)';
    e.currentTarget.style.boxShadow = onNight ? 'var(--glow-cyan)' : 'var(--shadow-md)';
  };
  const onLeave = e => {
    if (!hover) return;
    e.currentTarget.style.transform = 'none';
    e.currentTarget.style.boxShadow = onNight ? 'var(--shadow-night)' : 'var(--shadow-card)';
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: base,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave
  }, rest), accent && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      background: onNight ? 'var(--accent-night)' : 'var(--accent)'
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Card.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionHeading.jsx
try { (() => {
/**
 * SectionHeading — eyebrow + headline + optional lead, used to open
 * every page module. Keeps hierarchy consistent across the page.
 */
function SectionHeading({
  eyebrow,
  index = null,
  title,
  lead = null,
  surface = 'paper',
  align = 'left',
  maxWidth = 720,
  style = {}
}) {
  const onNight = surface === 'night';
  const centered = align === 'center';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      alignItems: centered ? 'center' : 'flex-start',
      textAlign: centered ? 'center' : 'left',
      maxWidth: centered ? maxWidth : 'none',
      margin: centered ? '0 auto' : 0,
      ...style
    }
  }, eyebrow && /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    index: index,
    surface: surface,
    align: align
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'clamp(28px, 3.6vw, 40px)',
      lineHeight: 'var(--leading-snug)',
      letterSpacing: 'var(--tracking-snug)',
      color: onNight ? 'var(--text-night-strong)' : 'var(--text-strong)',
      margin: 0,
      maxWidth,
      textWrap: 'balance'
    }
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-lead)',
      lineHeight: 'var(--leading-relaxed)',
      color: onNight ? 'var(--text-night-body)' : 'var(--text-body)',
      margin: 0,
      maxWidth,
      textWrap: 'pretty'
    }
  }, lead));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/layout/StatCallout.jsx
try { (() => {
/**
 * StatCallout — a single proof figure with label and optional footnote
 * marker. The brand's honest-proof pattern (¹²³ map to a source list).
 */
function StatCallout({
  value,
  label,
  footnote = null,
  tone = 'accent',
  surface = 'paper',
  align = 'left',
  style = {}
}) {
  const onNight = surface === 'night';
  const valueColor = tone === 'outcome' ? 'var(--outcome)' : tone === 'positive' ? 'var(--positive)' : onNight ? 'var(--accent-night)' : 'var(--accent)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(36px, 4.4vw, 52px)',
      lineHeight: 1,
      letterSpacing: '-0.03em',
      color: valueColor,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 2,
      justifyContent: align === 'center' ? 'center' : 'flex-start'
    }
  }, value, footnote != null && /*#__PURE__*/React.createElement("sup", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      fontWeight: 500,
      color: onNight ? 'var(--text-night-faint)' : 'var(--text-faint)',
      marginTop: 4
    }
  }, footnote)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontSize: 14.5,
      lineHeight: 1.45,
      color: onNight ? 'var(--text-night-body)' : 'var(--text-muted)',
      maxWidth: 220,
      marginLeft: align === 'center' ? 'auto' : 0,
      marginRight: align === 'center' ? 'auto' : 0
    }
  }, label));
}
Object.assign(__ds_scope, { StatCallout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/StatCallout.jsx", error: String((e && e.message) || e) }); }

// components/sales/DepartmentCard.jsx
try { (() => {
/**
 * DepartmentCard — one node in the "whole business, mapped" grid. Shows a
 * department, its AI-readiness status, and the systems that would plug in.
 * status: priority | ready | later
 */
function DepartmentCard({
  icon = 'building-2',
  name,
  summary,
  systems = [],
  status = 'ready',
  surface = 'paper',
  style = {}
}) {
  const onNight = surface === 'night';
  const statusMap = {
    priority: {
      label: 'Priority',
      tone: 'outcome',
      dot: 'var(--outcome)'
    },
    ready: {
      label: 'High-fit',
      tone: 'accent',
      dot: onNight ? 'var(--accent-night)' : 'var(--accent)'
    },
    later: {
      label: 'Phase 2',
      tone: 'neutral',
      dot: onNight ? 'var(--text-night-faint)' : 'var(--text-faint)'
    }
  };
  const st = statusMap[status] || statusMap.ready;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: onNight ? 'var(--surface-night-card)' : 'var(--surface-card)',
      border: `1px solid ${onNight ? 'var(--night-line)' : 'var(--border)'}`,
      borderRadius: 'var(--radius)',
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      boxShadow: onNight ? 'var(--shadow-night)' : 'var(--shadow-card)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 10,
      background: onNight ? 'var(--accent-night-soft)' : 'var(--accent-soft)',
      color: onNight ? 'var(--accent-night)' : 'var(--accent)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 20,
      height: 20
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: st.dot
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: onNight ? 'var(--text-night-faint)' : 'var(--text-muted)'
    }
  }, st.label))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: onNight ? 'var(--text-night-strong)' : 'var(--text-strong)',
      marginBottom: 5
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: 1.5,
      color: onNight ? 'var(--text-night-body)' : 'var(--text-muted)'
    }
  }, summary)), systems.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 7,
      marginTop: 'auto'
    }
  }, systems.map((s, i) => /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    key: i,
    tone: "neutral",
    surface: surface
  }, s))));
}
Object.assign(__ds_scope, { DepartmentCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sales/DepartmentCard.jsx", error: String((e && e.message) || e) }); }

// components/sales/FlowDiagram.jsx
try { (() => {
/**
 * FlowDiagram — the "workflow architecture" module. A horizontal, left-to-
 * right system flow of labelled nodes connected by animated dashed edges.
 * Designed for the night surface (command-center look) but works on paper.
 * Each node: { icon, label, sub }. Optional trailing outcome chip.
 */
function FlowDiagram({
  nodes = [],
  outcome = null,
  surface = 'night',
  style = {}
}) {
  const onNight = surface !== 'paper';
  const edge = onNight ? 'var(--accent-night)' : 'var(--accent)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      gap: 0,
      flexWrap: 'wrap',
      ...style
    }
  }, nodes.map((n, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 0',
      minWidth: 130,
      background: onNight ? 'var(--surface-night-raised)' : 'var(--surface-card)',
      border: `1px solid ${onNight ? 'var(--night-line-strong)' : 'var(--border)'}`,
      borderRadius: 'var(--radius)',
      padding: '18px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      boxShadow: onNight ? 'var(--shadow-night)' : 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 38,
      height: 38,
      borderRadius: 9,
      background: onNight ? 'var(--accent-night-soft)' : 'var(--accent-soft)',
      color: edge
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": n.icon || 'box',
    style: {
      width: 19,
      height: 19
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 15,
      fontWeight: 600,
      color: onNight ? 'var(--text-night-strong)' : 'var(--text-strong)',
      marginBottom: 3
    }
  }, n.label), n.sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      lineHeight: 1.4,
      color: onNight ? 'var(--text-night-faint)' : 'var(--text-muted)'
    }
  }, n.sub))), i < nodes.length - 1 && /*#__PURE__*/React.createElement(FlowEdge, {
    color: edge
  }))), outcome && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FlowEdge, {
    color: edge
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 auto',
      alignSelf: 'center',
      background: 'var(--outcome-soft)',
      border: '1px solid rgba(245,165,36,0.35)',
      borderRadius: 'var(--radius-pill)',
      padding: '12px 18px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "target",
    style: {
      width: 17,
      height: 17,
      color: 'var(--outcome)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 14.5,
      color: onNight ? 'var(--gm-amber-soft)' : '#9a6510'
    }
  }, outcome))));
}
function FlowEdge({
  color
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 38px',
      alignSelf: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "38",
    height: "14",
    viewBox: "0 0 38 14",
    fill: "none",
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "7",
    x2: "30",
    y2: "7",
    stroke: color,
    strokeWidth: "1.5",
    strokeDasharray: "4 4"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "stroke-dashoffset",
    from: "8",
    to: "0",
    dur: "0.7s",
    repeatCount: "indefinite"
  })), /*#__PURE__*/React.createElement("path", {
    d: "M30 2.5 L37 7 L30 11.5 Z",
    fill: color
  })));
}
Object.assign(__ds_scope, { FlowDiagram });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sales/FlowDiagram.jsx", error: String((e && e.message) || e) }); }

// components/sales/ProblemMirror.jsx
try { (() => {
/**
 * ProblemMirror — the "what I heard you asking" module. Mirrors the
 * prospect's own questions back, paired with the business problem each
 * one really points to. Two-column rows: their words → the real problem.
 */
function ProblemMirror({
  items = [],
  surface = 'paper',
  style = {}
}) {
  const onNight = surface === 'night';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto 1.1fr',
      gap: 24,
      alignItems: 'center',
      padding: '22px 0',
      borderTop: `1px solid ${onNight ? 'var(--night-line)' : 'var(--border)'}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 18,
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
      color: onNight ? 'var(--text-night-strong)' : 'var(--text-strong)',
      fontStyle: 'italic'
    }
  }, "\u201C", it.question, "\u201D"), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-right",
    style: {
      width: 20,
      height: 20,
      color: onNight ? 'var(--accent-night)' : 'var(--accent)',
      justifySelf: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: onNight ? 'var(--text-night-faint)' : 'var(--text-faint)',
      marginBottom: 6
    }
  }, it.tag || 'The real problem'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15.5,
      lineHeight: 1.55,
      color: onNight ? 'var(--text-night-body)' : 'var(--text-body)'
    }
  }, it.problem)))));
}
Object.assign(__ds_scope, { ProblemMirror });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sales/ProblemMirror.jsx", error: String((e && e.message) || e) }); }

// components/sales/RoadmapStep.jsx
try { (() => {
/**
 * RoadmapStep — one phase in the solution roadmap. Numbered marker on a
 * vertical spine, with title, what-happens copy, deliverables, and an
 * optional timeframe. Stack several to form the roadmap.
 */
function RoadmapStep({
  phase,
  title,
  timeframe = null,
  description,
  deliverables = [],
  surface = 'paper',
  last = false,
  style = {}
}) {
  const onNight = surface === 'night';
  const accent = onNight ? 'var(--accent-night)' : 'var(--accent)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '48px 1fr',
      gap: 20,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1.5px solid ${accent}`,
      background: onNight ? 'var(--accent-night-soft)' : 'var(--accent-soft)',
      color: accent,
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 16,
      flex: '0 0 auto'
    }
  }, phase), !last && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1.5,
      flex: 1,
      marginTop: 8,
      background: onNight ? 'var(--night-line-strong)' : 'var(--border-strong)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: last ? 0 : 34
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      flexWrap: 'wrap',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: onNight ? 'var(--text-night-strong)' : 'var(--text-strong)',
      margin: 0
    }
  }, title), timeframe && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      letterSpacing: '0.04em',
      color: onNight ? 'var(--text-night-faint)' : 'var(--text-muted)'
    }
  }, timeframe)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.6,
      color: onNight ? 'var(--text-night-body)' : 'var(--text-body)',
      margin: '0 0 14px',
      maxWidth: 560
    }
  }, description), deliverables.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, deliverables.map((d, i) => /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    key: i,
    tone: "accent",
    surface: surface,
    icon: "check"
  }, d)))));
}
Object.assign(__ds_scope, { RoadmapStep });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sales/RoadmapStep.jsx", error: String((e && e.message) || e) }); }

// components/sales/Testimonial.jsx
try { (() => {
/**
 * Testimonial — a trust quote with attribution. Quiet, premium; the mark
 * is a small accent rule, not a giant glyph. Optional result badge.
 */
function Testimonial({
  quote,
  name,
  role,
  result = null,
  surface = 'paper',
  style = {}
}) {
  const onNight = surface === 'night';
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      background: onNight ? 'var(--surface-night-card)' : 'var(--surface-card)',
      border: `1px solid ${onNight ? 'var(--night-line)' : 'var(--border)'}`,
      borderRadius: 'var(--radius-lg)',
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      boxShadow: onNight ? 'var(--shadow-night)' : 'var(--shadow-card)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      width: 32,
      height: 3,
      borderRadius: 2,
      background: onNight ? 'var(--accent-night)' : 'var(--accent)'
    }
  }), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 19,
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '-0.01em',
      color: onNight ? 'var(--text-night-strong)' : 'var(--text-strong)',
      textWrap: 'pretty'
    }
  }, "\u201C", quote, "\u201D"), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: onNight ? 'var(--text-night-strong)' : 'var(--text-strong)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: onNight ? 'var(--text-night-faint)' : 'var(--text-muted)',
      marginTop: 2
    }
  }, role)), result && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      fontWeight: 500,
      color: onNight ? 'var(--accent-night)' : 'var(--accent)',
      background: onNight ? 'var(--accent-night-soft)' : 'var(--accent-soft)',
      border: `1px solid ${onNight ? 'rgba(0,212,255,0.3)' : 'var(--accent-soft-border)'}`,
      borderRadius: 'var(--radius-pill)',
      padding: '6px 12px',
      whiteSpace: 'nowrap'
    }
  }, result)));
}
Object.assign(__ds_scope, { Testimonial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sales/Testimonial.jsx", error: String((e && e.message) || e) }); }

// ui_kits/prospect_page/AudioStrip.jsx
try { (() => {
// AudioStrip — optional interview-style audio breakdown for audio-first
// visitors. Native player styled into a dark case strip. Renders only when
// the config provides an audioUrl.

function AudioStrip({
  config
}) {
  if (!config.audioUrl) return null;
  const accent = config.primaryColor;
  return /*#__PURE__*/React.createElement("section", {
    className: "cf-section cf-divide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cf-wrap"
  }, /*#__PURE__*/React.createElement("p", {
    className: "cf-eyebrow"
  }, "Audio breakdown"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 460
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "cf-h2",
    style: {
      marginTop: 0
    }
  }, "Prefer to listen?"), /*#__PURE__*/React.createElement("p", {
    className: "cf-sub",
    style: {
      marginTop: 10
    }
  }, "A 5\u201310 minute interview-style walkthrough of the same workflow and blueprint, in plain English.")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 420,
      background: "var(--night-2)",
      border: "1px solid var(--night-line-strong)",
      borderRadius: 14,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      borderRadius: 10,
      background: hexA(accent, 0.12),
      color: accent
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "headphones",
    style: {
      width: 20,
      height: 20
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 600,
      color: "var(--text-night-strong)"
    }
  }, config.clientName, " \u2014 workflow breakdown"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 0",
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--text-night-faint)"
    }
  }, "Interview \xB7 audio"))), /*#__PURE__*/React.createElement("audio", {
    controls: true,
    preload: "none",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("source", {
    src: config.audioUrl,
    type: "audio/mpeg"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      fontSize: 11,
      color: "var(--text-night-faint)"
    }
  }, "Hosted on your existing podcast or file host.")))));
}
window.AudioStrip = AudioStrip;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/prospect_page/AudioStrip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/prospect_page/BlueprintViewer.jsx
try { (() => {
// BlueprintViewer — interactive blueprint preview. Renders the client's
// blueprint PDF page-by-page to a canvas via pdf.js (UMD, window.pdfjsLib),
// with prev/next + zoom, inside a dark "case" card. Open-full-PDF link.

function BlueprintViewer({
  config
}) {
  const accent = config.primaryColor;
  const canvasRef = React.useRef(null);
  const docRef = React.useRef(null);
  const renderTaskRef = React.useRef(null);
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [scale, setScale] = React.useState(1);
  const [status, setStatus] = React.useState("loading");

  // load document once
  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const lib = window.pdfjsLib;
        lib.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
        const doc = await lib.getDocument(config.blueprintPdfUrl).promise;
        if (cancelled) return;
        docRef.current = doc;
        setNumPages(doc.numPages);
        setStatus("ready");
      } catch (e) {
        console.error("PDF load failed", e);
        if (!cancelled) setStatus("error");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [config.blueprintPdfUrl]);

  // render current page
  React.useEffect(() => {
    async function render() {
      const doc = docRef.current;
      const canvas = canvasRef.current;
      if (!doc || !canvas) return;
      const page = await doc.getPage(pageNumber);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({
        scale: scale * 1.4
      });
      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;
      canvas.style.width = viewport.width + "px";
      canvas.style.height = viewport.height + "px";
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (e) {}
      }
      const task = page.render({
        canvasContext: ctx,
        viewport
      });
      renderTaskRef.current = task;
      try {
        await task.promise;
      } catch (e) {/* cancelled */}
    }
    if (status === "ready") render();
  }, [pageNumber, scale, status]);
  const prev = () => setPageNumber(p => Math.max(1, p - 1));
  const next = () => setPageNumber(p => numPages ? Math.min(numPages, p + 1) : p);
  const ctrlBtn = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    fontFamily: "var(--font-body)",
    fontSize: 13,
    fontWeight: 500,
    color: "var(--text-night-body)",
    background: "transparent",
    border: "1px solid var(--night-line-strong)",
    borderRadius: 999,
    padding: "7px 13px",
    cursor: "pointer"
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "cf-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cf-wrap"
  }, /*#__PURE__*/React.createElement("p", {
    className: "cf-eyebrow"
  }, "Blueprint preview"), /*#__PURE__*/React.createElement("h2", {
    className: "cf-h2"
  }, config.clientName, "\u2019s agent blueprint."), /*#__PURE__*/React.createElement("p", {
    className: "cf-sub"
  }, "Page through the architecture, data guardrails, and rollout plan below \u2014 or open the full PDF for the complete case."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      borderRadius: 16,
      border: "1px solid var(--night-line-strong)",
      background: "var(--night-1)",
      padding: 16,
      boxShadow: "0 28px 60px -28px rgba(0,0,0,0.8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: prev,
    style: ctrlBtn,
    disabled: pageNumber <= 1
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-left",
    style: {
      width: 15,
      height: 15
    }
  }), " Prev"), /*#__PURE__*/React.createElement("button", {
    onClick: next,
    style: ctrlBtn,
    disabled: numPages != null && pageNumber >= numPages
  }, "Next ", /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-right",
    style: {
      width: 15,
      height: 15
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 6,
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--text-night-faint)"
    }
  }, status === "ready" ? `Page ${pageNumber}${numPages ? ` / ${numPages}` : ""}` : status === "error" ? "—" : "Loading…")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setScale(s => Math.max(0.75, +(s - 0.25).toFixed(2))),
    style: ctrlBtn,
    "aria-label": "Zoom out"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "minus",
    style: {
      width: 15,
      height: 15
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--text-night-faint)",
      minWidth: 42,
      textAlign: "center"
    }
  }, Math.round(scale * 100), "%"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setScale(s => Math.min(2, +(s + 0.25).toFixed(2))),
    style: ctrlBtn,
    "aria-label": "Zoom in"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "plus",
    style: {
      width: 15,
      height: 15
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      overflow: "auto",
      background: "var(--night-0)",
      borderRadius: 10,
      padding: 18,
      border: "1px solid var(--night-line)",
      minHeight: 360,
      maxHeight: 560
    }
  }, status === "error" ? /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: "center",
      textAlign: "center",
      color: "var(--text-night-faint)",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "file-warning",
    style: {
      width: 26,
      height: 26,
      opacity: 0.7
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10
    }
  }, "Blueprint preview unavailable here.", /*#__PURE__*/React.createElement("br", null), "Use \u201COpen full PDF\u201D.")) : /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      borderRadius: 6,
      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.8)",
      background: "#fff",
      maxWidth: "100%"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      marginTop: 14,
      fontSize: 12.5,
      color: "var(--text-night-faint)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Scroll to pan \xB7 zoom for detail."), /*#__PURE__*/React.createElement("a", {
    href: config.blueprintPdfUrl,
    target: "_blank",
    rel: "noreferrer",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      color: accent,
      fontWeight: 600,
      textDecoration: "none"
    }
  }, "Open full PDF ", /*#__PURE__*/React.createElement("i", {
    "data-lucide": "external-link",
    style: {
      width: 14,
      height: 14
    }
  }))))));
}
window.BlueprintViewer = BlueprintViewer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/prospect_page/BlueprintViewer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/prospect_page/CTASection.jsx
try { (() => {
// CTASection — the final, single call to action on the black stage.
// Uses the DS Button (cyan on night). One obvious next step.

function CTASection({
  config
}) {
  const {
    Button
  } = window.GrowthMindsetAiDesignSystem_1d8535;
  return /*#__PURE__*/React.createElement("section", {
    className: "cf-section cf-divide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cf-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24,
      background: "radial-gradient(120% 160% at 100% 0%, rgba(0,212,255,0.10), transparent 60%), var(--night-1)",
      border: "1px solid var(--night-line-strong)",
      borderRadius: 18,
      padding: "30px 30px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "cf-eyebrow"
  }, "Next step"), /*#__PURE__*/React.createElement("h2", {
    className: "cf-h2",
    style: {
      marginTop: 8
    }
  }, config.ctaHeadline || "See your blueprint in a 20-minute walkthrough."), /*#__PURE__*/React.createElement("p", {
    className: "cf-sub",
    style: {
      marginTop: 10
    }
  }, config.ctaSub || "Tell me about the business problem. I'll tell you how I'd architect the system that solves it.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    surface: "night",
    variant: "primary",
    size: "lg",
    icon: "calendar",
    href: config.ctaUrl || "#book"
  }, config.ctaLabel || "Book a call"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11.5,
      color: "var(--text-night-faint)",
      paddingLeft: 2
    }
  }, config.ctaMeta || "20 min · no slides · just the system"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      marginTop: 22,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/brand/emblem-cyan.svg",
    alt: "",
    style: {
      width: 18,
      height: 18
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11.5,
      color: "var(--text-night-faint)",
      letterSpacing: "0.08em"
    }
  }, "GROWTHMINDSET.AI \xB7 MATT MARTELLI")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--text-night-faint)"
    }
  }, "Case file \xB7 ", config.slug))));
}
window.CTASection = CTASection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/prospect_page/CTASection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/prospect_page/CaseFilm.jsx
try { (() => {
// CaseFilm — the custom-styled YouTube player. Shows a bespoke "case film"
// poster with a branded play button; on click swaps in the YouTube iframe
// (kept on YouTube for SEO). Accent = per-client primaryColor.

function CaseFilm({
  config
}) {
  const [playing, setPlaying] = React.useState(false);
  const accent = config.primaryColor;
  const src = `https://www.youtube.com/embed/${config.youtubeId}?rel=0&modestbranding=1&autoplay=1&controls=1`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      borderRadius: 14,
      border: "1px solid var(--night-line-strong)",
      background: "var(--night-2)",
      boxShadow: "0 28px 60px -24px rgba(0,0,0,0.85)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "16 / 9"
    }
  }, !playing ? /*#__PURE__*/React.createElement("button", {
    onClick: () => setPlaying(true),
    "aria-label": "Play the 60-second case film",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      border: "none",
      cursor: "pointer",
      padding: 0,
      background: "radial-gradient(120% 90% at 50% 30%, #11202b 0%, #0A0A0F 78%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0.5,
      backgroundImage: "radial-gradient(circle, rgba(0,212,255,0.10) 1px, transparent 1px)",
      backgroundSize: "26px 26px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: 12,
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--text-night-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      height: 1,
      width: 26,
      background: "var(--text-night-faint)"
    }
  }), "Watch the 60-second case film", /*#__PURE__*/React.createElement("span", {
    style: {
      height: 1,
      width: 26,
      background: "var(--text-night-faint)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 76,
      height: 76,
      borderRadius: "50%",
      background: accent,
      boxShadow: `0 0 0 10px ${hexA(accent, 0.14)}, 0 0 36px ${hexA(accent, 0.5)}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 52,
      height: 52,
      borderRadius: "50%",
      background: "#0A0A0F"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 4,
      width: 0,
      height: 0,
      borderTop: "10px solid transparent",
      borderBottom: "10px solid transparent",
      borderLeft: `16px solid ${accent}`
    }
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      position: "relative",
      margin: 0,
      fontSize: 11.5,
      color: "var(--text-night-faint)"
    }
  }, "Hosted on YouTube for SEO \xB7 styled as a custom player")) : /*#__PURE__*/React.createElement("iframe", {
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      border: "none"
    },
    src: src,
    title: "Case film",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowFullScreen: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      padding: "12px 16px",
      borderTop: "1px solid var(--night-line)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--text-night-faint)"
    }
  }, "Case Film \xB7 0:60"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      fontSize: 12,
      color: "var(--text-night-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: accent,
      boxShadow: `0 0 10px ${hexA(accent, 0.7)}`
    }
  }), "Ready to play")));
}

// hex (#rrggbb) -> rgba string
function hexA(hex, a) {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
  const r = parseInt(n.slice(0, 2), 16),
    g = parseInt(n.slice(2, 4), 16),
    b = parseInt(n.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
window.CaseFilm = CaseFilm;
window.hexA = hexA;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/prospect_page/CaseFilm.jsx", error: String((e && e.message) || e) }); }

// ui_kits/prospect_page/CreativeBrief.jsx
try { (() => {
// CreativeBrief — the manila "case file" card. Classic advertising brief:
// stamped header, logo, and labelled fields (Client, Project, Pain Point,
// Creative Issue, Objective, Deliverables). Sits on the black stage.

function CreativeBrief({
  config
}) {
  const fields = [{
    label: "Client",
    value: config.clientName
  }, {
    label: "Project",
    value: config.headline
  }, {
    label: "Pain Point",
    value: config.painPoint
  }, {
    label: "Creative Issue",
    value: config.creativeIssue
  }, {
    label: "Objective",
    value: config.objective
  }, {
    label: "Deliverables",
    value: config.deliverables
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "cf-manila",
    style: {
      position: "relative",
      borderRadius: 14,
      border: "1px solid rgba(120,90,40,0.30)",
      padding: "26px 26px 22px",
      boxShadow: "0 28px 60px -24px rgba(0,0,0,0.85), 0 2px 0 rgba(255,255,255,0.4) inset",
      color: "#3a2f1a"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: "absolute",
      top: -13,
      left: 26,
      height: 14,
      width: 96,
      background: "#EADCB8",
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      border: "1px solid rgba(120,90,40,0.30)",
      borderBottom: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 38,
      height: 38,
      borderRadius: 9,
      background: "#0A0A0F"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: config.logoUrl,
    alt: config.clientName,
    style: {
      width: 22,
      height: 22,
      objectFit: "contain"
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-mono)",
      fontSize: 10.5,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: "#9A7B33",
      fontWeight: 600
    }
  }, "Creative Brief"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "3px 0 0",
      fontSize: 12,
      color: "rgba(58,47,26,0.7)"
    }
  }, "AI Workflow Case File"))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10.5,
      letterSpacing: "0.08em",
      color: "#7A5E1E",
      border: "1px solid rgba(120,90,40,0.4)",
      borderRadius: 999,
      padding: "5px 11px",
      background: "rgba(255,255,255,0.4)",
      whiteSpace: "nowrap"
    }
  }, "Draft v1.0")), /*#__PURE__*/React.createElement("div", null, fields.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: f.label,
    style: {
      display: "grid",
      gridTemplateColumns: "108px 1fr",
      gap: 16,
      alignItems: "baseline",
      padding: "11px 0",
      borderTop: i === 0 ? "none" : "1px solid rgba(120,90,40,0.18)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10.5,
      fontWeight: 600,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "#9A7B33"
    }
  }, f.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      lineHeight: 1.5,
      color: "#2b2310",
      fontWeight: i === 0 ? 600 : 400
    }
  }, f.value)))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      fontSize: 11.5,
      lineHeight: 1.55,
      color: "rgba(58,47,26,0.62)",
      fontStyle: "italic",
      borderTop: "1px dashed rgba(120,90,40,0.3)",
      paddingTop: 12
    }
  }, "This case file anchors the explainer film, blueprint, and rollout plan \u2014 one reference for the entire engagement."));
}
window.CreativeBrief = CreativeBrief;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/prospect_page/CreativeBrief.jsx", error: String((e && e.message) || e) }); }

// ui_kits/prospect_page/StepsSection.jsx
try { (() => {
// StepsSection — the linear methodology: Map → Design → Prototype → Deploy.
// Four numbered cards with a connecting baseline; recruiter-friendly read.

function StepsSection({
  config
}) {
  const accent = config.primaryColor;
  const steps = [{
    n: "01",
    name: "Map",
    icon: "git-branch",
    blurb: "Audit every department's workflow and data, top-down."
  }, {
    n: "02",
    name: "Design",
    icon: "pen-tool",
    blurb: "Architect the agent system around the real business problem."
  }, {
    n: "03",
    name: "Prototype",
    icon: "flask-conical",
    blurb: "Stand up a working slice with guardrails you can test."
  }, {
    n: "04",
    name: "Deploy",
    icon: "rocket",
    blurb: "Ship to production, measure, and hand over the runbook."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "cf-section cf-divide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cf-wrap"
  }, /*#__PURE__*/React.createElement("p", {
    className: "cf-eyebrow"
  }, "How this works"), /*#__PURE__*/React.createElement("h2", {
    className: "cf-h2"
  }, "From audit to live agents in four steps."), /*#__PURE__*/React.createElement("div", {
    className: "cf-steps-grid",
    style: {
      marginTop: 26
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.n,
    style: {
      position: "relative",
      background: "var(--night-2)",
      border: "1px solid var(--night-line)",
      borderRadius: 14,
      padding: "20px 18px",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      minHeight: 168
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 38,
      height: 38,
      borderRadius: 9,
      background: hexA(accent, 0.12),
      color: accent
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": s.icon,
    style: {
      width: 19,
      height: 19
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--text-night-faint)",
      letterSpacing: "0.08em"
    }
  }, s.n)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: 17,
      fontWeight: 600,
      color: "var(--text-night-strong)",
      letterSpacing: "-0.01em"
    }
  }, s.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontSize: 13,
      lineHeight: 1.5,
      color: "var(--text-night-body)"
    }
  }, s.blurb)), i < steps.length - 1 && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: "absolute",
      right: -7,
      top: "50%",
      zIndex: 2,
      color: accent,
      fontSize: 14,
      lineHeight: 1
    },
    className: "cf-step-arrow"
  }, "\u2192"))))));
}
window.StepsSection = StepsSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/prospect_page/StepsSection.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.StatCallout = __ds_scope.StatCallout;

__ds_ns.DepartmentCard = __ds_scope.DepartmentCard;

__ds_ns.FlowDiagram = __ds_scope.FlowDiagram;

__ds_ns.ProblemMirror = __ds_scope.ProblemMirror;

__ds_ns.RoadmapStep = __ds_scope.RoadmapStep;

__ds_ns.Testimonial = __ds_scope.Testimonial;

})();
