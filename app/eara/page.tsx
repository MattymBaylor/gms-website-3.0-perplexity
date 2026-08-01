"use client";

import { useMemo, useState } from "react";

type DimensionKey = "strategy" | "data" | "processes" | "governance" | "people" | "technology";
type Stage = "landing" | "assessment" | "results";

type Dimension = {
  key: DimensionKey;
  name: string;
  icon: string;
  note: string;
  questions: string[];
  roadmap: {
    objective: string;
    actions: [string, string, string];
  };
};

const dimensions: Dimension[] = [
  {
    key: "strategy",
    name: "Strategy",
    icon: "◎",
    note: "Business outcomes and executive alignment",
    questions: [
      "The business outcomes we expect AI to improve are explicitly documented.",
      "An executive sponsor is accountable for enterprise AI outcomes—not merely technology delivery.",
      "AI opportunities are ranked by business value, feasibility, risk, and time to value.",
      "Each priority initiative has a baseline, target metric, and named business owner.",
      "Our AI portfolio is connected to enterprise strategy rather than isolated departmental experiments.",
      "Investment decisions account for adoption, governance, integration, monitoring, and ongoing operating costs.",
    ],
    roadmap: {
      objective: "Connect AI investment to measurable enterprise outcomes.",
      actions: [
        "Name an executive sponsor and document the three business outcomes AI must improve.",
        "Score the use-case portfolio against value, feasibility, risk, and time to value.",
        "Approve a sequenced portfolio with baselines, targets, owners, and funding gates.",
      ],
    },
  },
  {
    key: "data",
    name: "Data",
    icon: "▤",
    note: "Access, quality, ownership, and usefulness",
    questions: [
      "Critical data assets are inventoried and have accountable business owners.",
      "Data quality is measured at the source using agreed standards and thresholds.",
      "Access, privacy, retention, and acceptable-use rules are consistently enforced.",
      "Relevant data can move across systems without losing context, lineage, or meaning.",
      "Teams can explain where sensitive or regulated data enters an AI-enabled workflow.",
      "Data fitness is validated before an AI initiative is approved for production use.",
    ],
    roadmap: {
      objective: "Create trustworthy, usable data foundations for priority decisions.",
      actions: [
        "Inventory the data required by the highest-value use case and assign accountable owners.",
        "Profile quality, access, lineage, privacy, and retention gaps; agree on thresholds.",
        "Publish a governed data product with monitoring, access controls, and remediation ownership.",
      ],
    },
  },
  {
    key: "processes",
    name: "Processes",
    icon: "⌘",
    note: "Workflows, friction, and operating discipline",
    questions: [
      "Priority workflows are mapped end to end across teams, systems, decisions, and handoffs.",
      "Customer friction, cycle time, rework, failure demand, and bottlenecks are quantified.",
      "Processes are simplified or redesigned before automation is introduced.",
      "Workflow owners have defined exceptions, failure paths, escalation rules, and recovery steps.",
      "Human and AI responsibilities are explicit at every consequential decision point.",
      "Operational performance is measured before and after an AI-enabled change is released.",
    ],
    roadmap: {
      objective: "Redesign the work before automating it.",
      actions: [
        "Map one priority value flow and quantify its delays, friction, rework, and failure points.",
        "Redesign the workflow, including human decisions, exceptions, escalation, and recovery.",
        "Pilot the redesigned process with baseline metrics and a named operational owner.",
      ],
    },
  },
  {
    key: "governance",
    name: "Governance",
    icon: "◇",
    note: "Risk, oversight, and responsible control",
    questions: [
      "Enterprise policies define acceptable, restricted, and prohibited AI uses.",
      "AI initiatives are classified by risk before development or procurement begins.",
      "Accountability for AI-assisted outcomes is assigned to a person—not to the model or vendor.",
      "Human review, override, escalation, incident response, and shutdown criteria are defined.",
      "Models, vendors, agents, and data processors undergo security, privacy, legal, and resilience review.",
      "Production AI is continuously monitored, tested, documented, and auditable.",
    ],
    roadmap: {
      objective: "Make responsible ownership operational rather than aspirational.",
      actions: [
        "Establish an accountable AI owner, risk tiers, acceptable-use rules, and decision rights.",
        "Define review gates, human oversight, incident escalation, override, and shutdown criteria.",
        "Launch a production monitoring and audit cadence covering models, vendors, agents, and outcomes.",
      ],
    },
  },
  {
    key: "people",
    name: "People",
    icon: "◉",
    note: "Roles, skills, adoption, and accountability",
    questions: [
      "Roles and decision rights for AI strategy, delivery, risk, operations, and adoption are clear.",
      "Leaders can explain why the organization is using AI and what will not be delegated to it.",
      "Employees affected by an AI-enabled change participate in workflow design and testing.",
      "Training is tailored to role, risk, responsibility, and the actual work being changed.",
      "Adoption, confidence, resistance, workarounds, and unintended behavior are actively measured.",
      "Workforce planning addresses role redesign, capacity, incentives, career paths, and change ownership.",
    ],
    roadmap: {
      objective: "Build the roles, trust, and capability required for adoption.",
      actions: [
        "Clarify roles, decision rights, change ownership, and the work that remains human-led.",
        "Co-design one priority workflow with affected teams and deliver role-specific training.",
        "Measure adoption, confidence, workarounds, capacity changes, and required role redesign.",
      ],
    },
  },
  {
    key: "technology",
    name: "Technology",
    icon: "▦",
    note: "Architecture, integration, and reliability",
    questions: [
      "A target AI architecture defines how models, agents, data, systems, identity, and controls interact.",
      "Priority business systems expose stable, secure integration paths and reliable interfaces.",
      "Identity, permissions, secrets, data boundaries, and environment separation are enforced by design.",
      "Model and vendor choices can change without forcing a complete rebuild of the business workflow.",
      "AI-enabled services are observable across quality, latency, cost, security, drift, and failure behavior.",
      "Testing, versioning, release, rollback, resilience, and retirement practices cover the full AI lifecycle.",
    ],
    roadmap: {
      objective: "Create a secure, observable, and adaptable delivery foundation.",
      actions: [
        "Document the target architecture, integration boundaries, identities, data paths, and failure domains.",
        "Establish reusable security, evaluation, observability, versioning, and rollback patterns.",
        "Prove portability and resilience through a production pilot with monitored service-level objectives.",
      ],
    },
  },
];

const ratingScale = [
  { value: 1, label: "Not in place", short: "Absent" },
  { value: 2, label: "Ad hoc", short: "Ad hoc" },
  { value: 3, label: "Defined", short: "Defined" },
  { value: 4, label: "Operational", short: "Operational" },
  { value: 5, label: "Measured and scalable", short: "Scaled" },
];

const maturity = (score: number) => {
  if (score < 25) return { label: "Fragmented", description: "Activity exists, but capability depends on isolated effort and individual judgment." };
  if (score < 45) return { label: "Emerging", description: "The foundations are forming, but ownership and execution remain inconsistent." };
  if (score < 65) return { label: "Building", description: "Core practices are defined; the next challenge is connecting and operationalizing them." };
  if (score < 80) return { label: "Operationalizing", description: "The organization can execute responsibly, but scaling requires stronger measurement and reuse." };
  return { label: "Scaling responsibly", description: "AI capability is governed, measurable, reusable, and positioned to scale with control." };
};

function BrandHeader({ compact = false, onHome }: { compact?: boolean; onHome?: () => void }) {
  return (
    <header className={`site-header ${compact ? "compact" : ""}`}>
      <button className="brand brand-button" type="button" onClick={onHome} aria-label="Return to growthmindset.ai assessment overview">
        <img src="/eara/growthmindset-logo-white.svg" alt="growthmindset.ai" />
      </button>
      {compact && <span className="header-label">Enterprise AI Readiness Assessment</span>}
    </header>
  );
}

function RadarChart({ scores }: { scores: Array<{ name: string; score: number }> }) {
  const center = 150;
  const radius = 102;
  const point = (index: number, value: number) => {
    const angle = -Math.PI / 2 + index * (Math.PI * 2 / scores.length);
    const r = radius * (value / 100);
    return `${center + Math.cos(angle) * r},${center + Math.sin(angle) * r}`;
  };
  const full = scores.map((_, index) => point(index, 100)).join(" ");
  const data = scores.map((entry, index) => point(index, entry.score)).join(" ");

  return (
    <svg className="radar-chart" viewBox="0 0 300 300" role="img" aria-label="Readiness scores across six dimensions">
      {[25, 50, 75, 100].map((level) => (
        <polygon key={level} points={scores.map((_, index) => point(index, level)).join(" ")} className="radar-grid" />
      ))}
      {scores.map((_, index) => <line key={index} x1={center} y1={center} x2={full.split(" ")[index].split(",")[0]} y2={full.split(" ")[index].split(",")[1]} className="radar-axis" />)}
      <polygon points={data} className="radar-data" />
      {scores.map((entry, index) => {
        const [cx, cy] = point(index, entry.score).split(",");
        return <circle key={entry.name} cx={cx} cy={cy} r="4" className="radar-point" />;
      })}
    </svg>
  );
}

export default function Home() {
  const [stage, setStage] = useState<Stage>("landing");
  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showValidation, setShowValidation] = useState(false);

  const section = dimensions[sectionIndex];
  const sectionAnswers = section.questions.filter((_, index) => answers[`${section.key}-${index}`]);

  const dimensionScores = useMemo(() => dimensions.map((dimension) => {
    const values = dimension.questions.map((_, index) => answers[`${dimension.key}-${index}`]).filter(Boolean);
    const average = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 1;
    return { ...dimension, score: Math.round(((average - 1) / 4) * 100) };
  }), [answers]);

  const overallScore = useMemo(() => Math.round(dimensionScores.reduce((sum, dimension) => sum + dimension.score, 0) / dimensions.length), [dimensionScores]);
  const ranked = useMemo(() => [...dimensionScores].sort((a, b) => a.score - b.score), [dimensionScores]);
  const strength = useMemo(() => [...dimensionScores].sort((a, b) => b.score - a.score)[0], [dimensionScores]);

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const startAssessment = () => { setStage("assessment"); setSectionIndex(0); setShowValidation(false); setTimeout(goTop, 0); };
  const returnHome = () => { setStage("landing"); setTimeout(goTop, 0); };
  const answerQuestion = (questionIndex: number, value: number) => {
    setAnswers((current) => ({ ...current, [`${section.key}-${questionIndex}`]: value }));
    setShowValidation(false);
  };
  const nextSection = () => {
    if (sectionAnswers.length !== section.questions.length) { setShowValidation(true); return; }
    if (sectionIndex < dimensions.length - 1) { setSectionIndex(sectionIndex + 1); setShowValidation(false); setTimeout(goTop, 0); }
    else { setStage("results"); setTimeout(goTop, 0); }
  };
  const previousSection = () => { if (sectionIndex > 0) { setSectionIndex(sectionIndex - 1); setShowValidation(false); setTimeout(goTop, 0); } else returnHome(); };
  const restart = () => { setAnswers({}); setSectionIndex(0); setShowValidation(false); setStage("landing"); setTimeout(goTop, 0); };

  if (stage === "assessment") {
    const progress = Math.round(((sectionIndex * 6 + sectionAnswers.length) / 36) * 100);
    return (
      <main className="assessment-shell">
        <BrandHeader compact onHome={returnHome} />
        <div className="assessment-layout">
          <aside className="dimension-sidebar" aria-label="Assessment progress">
            <p className="sidebar-kicker">Assessment progress</p>
            <strong>{progress}% complete</strong>
            <div className="progress-track" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
            <ol>
              {dimensions.map((dimension, index) => {
                const answered = dimension.questions.filter((_, questionIndex) => answers[`${dimension.key}-${questionIndex}`]).length;
                return (
                  <li key={dimension.key} className={index === sectionIndex ? "active" : index < sectionIndex ? "complete" : ""}>
                    <button type="button" onClick={() => { if (index <= sectionIndex) { setSectionIndex(index); setShowValidation(false); setTimeout(goTop, 0); } }} disabled={index > sectionIndex}>
                      <span>{index < sectionIndex ? "✓" : index + 1}</span>
                      <div><b>{dimension.name}</b><small>{answered}/6 answered</small></div>
                    </button>
                  </li>
                );
              })}
            </ol>
            <p className="privacy-note">Responses stay in this browser and are not submitted or stored.</p>
          </aside>

          <section className="question-panel">
            <div className="question-heading">
              <div className="section-number">{sectionIndex + 1}</div>
              <div><p className="eyebrow">Dimension {sectionIndex + 1} of 6</p><h1>{section.name}</h1><p>{section.note}</p></div>
            </div>
            <div className="scale-key" aria-label="Rating scale">
              <span>Rate each statement:</span>
              {ratingScale.map((rating) => <small key={rating.value}><b>{rating.value}</b> {rating.label}</small>)}
            </div>

            <div className="questions-list">
              {section.questions.map((question, questionIndex) => {
                const selected = answers[`${section.key}-${questionIndex}`];
                return (
                  <fieldset className={`question-card ${selected ? "answered" : ""}`} key={question}>
                    <legend><span>{questionIndex + 1}</span>{question}</legend>
                    <div className="rating-options" role="radiogroup" aria-label={`Rating for: ${question}`}>
                      {ratingScale.map((rating) => (
                        <button key={rating.value} type="button" role="radio" aria-checked={selected === rating.value} className={selected === rating.value ? "selected" : ""} onClick={() => answerQuestion(questionIndex, rating.value)} title={rating.label}>
                          <b>{rating.value}</b><span>{rating.short}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                );
              })}
            </div>

            {showValidation && <p className="validation-message" role="alert">Answer all six statements before continuing. Honest gaps produce a useful roadmap; optimistic fiction produces a very handsome lie.</p>}
            <div className="assessment-actions">
              <button className="secondary-button" type="button" onClick={previousSection}>← Previous</button>
              <p>{sectionAnswers.length} of 6 answered</p>
              <button className="primary-button next-button" type="button" onClick={nextSection}>{sectionIndex === 5 ? "Generate roadmap" : "Continue"}<span aria-hidden="true">→</span></button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (stage === "results") {
    const status = maturity(overallScore);
    const decision = overallScore >= 80
      ? `Scale selectively from your strongest foundation in ${strength.name}, while protecting against overextension in ${ranked[0].name}.`
      : `Authorize a 90-day foundation sprint centered on ${ranked[0].name}, with ${ranked[1].name} treated as the enabling dependency.`;
    return (
      <main className="results-shell">
        <BrandHeader compact onHome={returnHome} />
        <section className="results-hero">
          <div className="results-title">
            <p className="eyebrow">Executive readiness brief</p>
            <h1>Your organization is <em>{status.label}</em>.</h1>
            <p>{status.description}</p>
            <div className="result-buttons">
              <button className="primary-button" type="button" onClick={() => window.print()}><span aria-hidden="true">↓</span>Print executive brief</button>
              <button className="secondary-button" type="button" onClick={restart}>Start over</button>
            </div>
          </div>
          <div className="score-orbit">
            <span>Overall readiness</span><strong>{overallScore}</strong><small>out of 100</small>
          </div>
        </section>

        <section className="results-grid">
          <article className="radar-card">
            <div className="card-heading"><div><p className="eyebrow">Readiness profile</p><h2>Six connected capabilities</h2></div><span>{overallScore}</span></div>
            <div className="radar-layout">
              <RadarChart scores={dimensionScores.map(({ name, score }) => ({ name, score }))} />
              <div className="score-list">
                {dimensionScores.map((dimension) => <div key={dimension.key}><p><b>{dimension.name}</b><span>{dimension.score}</span></p><div><i style={{ width: `${dimension.score}%` }} /></div></div>)}
              </div>
            </div>
          </article>

          <article className="decision-card">
            <p className="eyebrow">Decision guidance</p>
            <h2>Now that I know this, what decision can I responsibly make?</h2>
            <p className="decision-copy">{decision}</p>
            <ul>
              <li><span>Constraint</span><b>{ranked[0].name} · {ranked[0].score}</b></li>
              <li><span>Enabling dependency</span><b>{ranked[1].name} · {ranked[1].score}</b></li>
              <li><span>Strongest foundation</span><b>{strength.name} · {strength.score}</b></li>
            </ul>
            <p className="decision-rule">Do not approve broad technology procurement until the priority outcome, accountable owner, baseline metric, data boundary, and governance gate are explicit.</p>
          </article>
        </section>

        <section className="roadmap-section">
          <div className="roadmap-intro"><div><p className="eyebrow">Prioritized roadmap</p><h2>Start where weakness constrains value.</h2></div><p>The roadmap sequences your three lowest-scoring dimensions. These are not three unrelated projects; each move should make the next one safer and more valuable.</p></div>
          <div className="priority-stack">
            {ranked.slice(0, 3).map((priority, index) => (
              <article className="priority-card" key={priority.key}>
                <div className="priority-header"><span>Priority {index + 1}</span><div><h3>{priority.name}</h3><p>{priority.roadmap.objective}</p></div><strong>{priority.score}</strong></div>
                <div className="timeline-actions">
                  {priority.roadmap.actions.map((action, actionIndex) => <div key={action}><span>{["Days 1–30", "Days 31–60", "Days 61–90"][actionIndex]}</span><p>{action}</p></div>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="report-footer">
          <img src="/eara/growthmindset-logo-white.svg" alt="growthmindset.ai" />
          <div><p>This assessment is a directional diagnostic, not an audit or compliance certification. Validate the findings through stakeholder interviews, workflow evidence, architecture review, and operating data before committing major capital.</p><a href="https://growthmindset.ai" target="_blank" rel="noreferrer">Continue with growthmindset.ai →</a></div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <BrandHeader onHome={returnHome} />
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Enterprise AI readiness</p>
          <h1>Enterprise AI<br />Readiness<br />Assessment</h1>
          <p className="hero-lede">Measure your organization across strategy, data, processes, governance, people, and technology—then turn the results into a prioritized roadmap.</p>
          <button className="primary-button" type="button" onClick={startAssessment}><span aria-hidden="true">→</span>Begin Assessment</button>
          <p className="assessment-meta"><span>36 questions</span><span>8–10 minutes</span><span>Executive-ready roadmap</span></p>
        </div>

        <div className="system-map" aria-label="Six connected readiness dimensions">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="core"><span>AI readiness</span><strong>6</strong><small>connected dimensions</small></div>
          {dimensions.map((dimension, index) => (
            <article className={`dimension-node node-${index + 1}`} key={dimension.name}><span className="node-icon" aria-hidden="true">{dimension.icon}</span><h2>{dimension.name}</h2><div className="node-bars" aria-hidden="true"><i /><i /><i /><i /><i /></div></article>
          ))}
        </div>
      </section>

      <section className="outcome-strip" id="outcomes" aria-label="Assessment outcomes">
        <article><span>↗</span><div><h2>Readiness score</h2><p>A clear, evidence-led snapshot of current capability.</p></div></article>
        <article><span>⌁</span><div><h2>Priority roadmap</h2><p>Sequenced actions focused on the highest-impact moves.</p></div></article>
        <article><span>⌖</span><div><h2>Decision guidance</h2><p>A responsible next decision—not a shopping list of AI tools.</p></div></article>
      </section>

      <section className="framework-section" id="framework">
        <p className="eyebrow">One system, six lenses</p><h2>Readiness is only as strong as the connections.</h2>
        <p className="section-intro">A strong model with weak ownership is not readiness. Neither is clean data attached to a broken process. This diagnostic shows where capability is real, where it is assumed, and what deserves attention first.</p>
        <div className="framework-grid">{dimensions.map((dimension) => <article key={dimension.name}><span>{dimension.icon}</span><h3>{dimension.name}</h3><p>{dimension.note}</p></article>)}</div>
      </section>

      <footer><img src="/eara/growthmindset-logo-white.svg" alt="growthmindset.ai" /><p>Enterprise AI decisions grounded in evidence, responsibility, and business value.</p></footer>
    </main>
  );
}
