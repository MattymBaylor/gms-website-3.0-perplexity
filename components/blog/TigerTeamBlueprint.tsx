// Static render of the live 17-node "Tiger Team" audit pipeline. The original
// SVG is embedded verbatim (via dangerouslySetInnerHTML) so its styling is
// preserved exactly; interactivity from the standalone article is dropped.
const BLUEPRINT_SVG = `<svg id="bpsvg" class="bp" viewBox="0 0 1030 372" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The 17-node n8n workflow: intake, three parallel auditors, merge, cross-verify, reward engine, and three outputs."><style>
.bp{--sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Roboto,sans-serif;--mono:ui-monospace,'SF Mono',Menlo,Consolas,monospace;width:100%;height:auto;max-width:1030px;display:block;margin:0 auto}
.bp .nd{fill:#15161b;stroke:#2b3140;stroke-width:1.2}
.bp .in{stroke:#2f6f68}
.bp .aud{stroke:#c98a2a;fill:#1b1710}
.bp .par{stroke:#6b5a2f}
.bp .neu{stroke:#3a3f4d}
.bp .guard{stroke:#a34a3a;fill:#1c1210}
.bp .core{stroke:#E8632A;fill:#20140d;stroke-width:1.7}
.bp .out{stroke:#c79a2c;fill:#1a1708}
.bp .nn{fill:#F4F1EA;font-weight:700;font-size:12px;font-family:var(--sans)}
.bp .ns{fill:#9A968C;font-size:9.5px;font-family:var(--mono)}
.bp .lbl{fill:#7d8494;font-size:10.5px;font-weight:700;font-family:var(--mono);letter-spacing:.1em}
.bp .cx{stroke:#39404e;stroke-width:1.5;fill:none}
.bp .cxa{stroke:#b9822c;stroke-width:1.5;fill:none;opacity:.75}
</style>
      <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6.5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#4a5160"/></marker>
      <marker id="ara" markerWidth="8" markerHeight="8" refX="6.5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#b9822c"/></marker></defs>
      <text class="lbl" x="20" y="20">INTAKE</text>
      <text class="lbl" x="600" y="20">3 RIVAL AUDITORS · FAN-OUT</text>
      <text class="lbl" x="340" y="180">SCORE · SPLIT · OUTPUT</text>
      <line class="cx" x1="140" y1="89" x2="160" y2="89" marker-end="url(#ar)"/>
      <line class="cx" x1="280" y1="89" x2="300" y2="89" marker-end="url(#ar)"/>
      <line class="cx" x1="420" y1="89" x2="440" y2="89" marker-end="url(#ar)"/>
      <line class="cxa" x1="560" y1="89" x2="600" y2="31" marker-end="url(#ara)"/>
      <line class="cxa" x1="560" y1="89" x2="600" y2="89" marker-end="url(#ara)"/>
      <line class="cxa" x1="560" y1="89" x2="600" y2="147" marker-end="url(#ara)"/>
      <line class="cxa" x1="720" y1="31" x2="740" y2="31" marker-end="url(#ara)"/>
      <line class="cxa" x1="720" y1="89" x2="740" y2="89" marker-end="url(#ara)"/>
      <line class="cxa" x1="720" y1="147" x2="740" y2="147" marker-end="url(#ara)"/>
      <line class="cx" x1="860" y1="31" x2="880" y2="82" marker-end="url(#ar)"/>
      <line class="cx" x1="860" y1="89" x2="880" y2="89" marker-end="url(#ar)"/>
      <line class="cx" x1="860" y1="147" x2="880" y2="96" marker-end="url(#ar)"/>
      <line class="cx" x1="940" y1="112" x2="940" y2="250" marker-end="url(#ar)"/>
      <line class="cx" x1="880" y1="273" x2="820" y2="273" marker-end="url(#ar)"/>
      <line class="cx" x1="700" y1="273" x2="640" y2="273" marker-end="url(#ar)"/>
      <line class="cx" x1="520" y1="273" x2="460" y2="219" marker-end="url(#ar)"/>
      <line class="cx" x1="520" y1="273" x2="460" y2="273" marker-end="url(#ar)"/>
      <line class="cx" x1="520" y1="273" x2="460" y2="327" marker-end="url(#ar)"/>
      <g class="node" data-k="trigger"><rect class="nd in" x="20" y="66" width="120" height="46" rx="9"/><text class="nn" x="32" y="86">Trigger</text><text class="ns" x="32" y="100">monthly cron</text></g>
      <g class="node" data-k="config"><rect class="nd neu" x="160" y="66" width="120" height="46" rx="9"/><text class="nn" x="172" y="86">Set Config</text><text class="ns" x="172" y="100">run_id</text></g>
      <g class="node" data-k="ground"><rect class="nd in" x="300" y="66" width="120" height="46" rx="9"/><text class="nn" x="312" y="86">Load ORG.md</text><text class="ns" x="312" y="100">Google Drive</text></g>
      <g class="node" data-k="extract"><rect class="nd in" x="440" y="66" width="120" height="46" rx="9"/><text class="nn" x="452" y="86">Extract</text><text class="ns" x="452" y="100">ground truth</text></g>
      <g class="node" data-k="opus"><rect class="nd aud" x="600" y="8" width="120" height="46" rx="9"/><text class="nn" x="612" y="28">Auditor A</text><text class="ns" x="612" y="42">Claude Opus</text></g>
      <g class="node" data-k="gpt"><rect class="nd aud" x="600" y="66" width="120" height="46" rx="9"/><text class="nn" x="612" y="86">Auditor B</text><text class="ns" x="612" y="100">GPT-5</text></g>
      <g class="node" data-k="gemini"><rect class="nd aud" x="600" y="124" width="120" height="46" rx="9"/><text class="nn" x="612" y="144">Auditor C</text><text class="ns" x="612" y="158">Gemini</text></g>
      <g class="node" data-k="parse"><rect class="nd par" x="740" y="8" width="120" height="46" rx="9"/><text class="nn" x="752" y="28">Parse</text><text class="ns" x="752" y="42">→ JSON</text></g>
      <g class="node" data-k="parse"><rect class="nd par" x="740" y="66" width="120" height="46" rx="9"/><text class="nn" x="752" y="86">Parse</text><text class="ns" x="752" y="100">→ JSON</text></g>
      <g class="node" data-k="parse"><rect class="nd par" x="740" y="124" width="120" height="46" rx="9"/><text class="nn" x="752" y="144">Parse</text><text class="ns" x="752" y="158">→ JSON</text></g>
      <g class="node" data-k="merge"><rect class="nd neu" x="880" y="66" width="120" height="46" rx="9"/><text class="nn" x="892" y="86">Merge</text><text class="ns" x="892" y="100">3 inputs</text></g>
      <g class="node" data-k="verify"><rect class="nd guard" x="880" y="250" width="120" height="46" rx="9"/><text class="nn" x="892" y="270">Cross-Verify</text><text class="ns" x="892" y="284">rival check</text></g>
      <g class="node" data-k="reward"><rect class="nd core" x="700" y="250" width="120" height="46" rx="9"/><text class="nn" x="712" y="270">Reward Engine</text><text class="ns" x="712" y="284">score + consensus</text></g>
      <g class="node" data-k="split"><rect class="nd neu" x="520" y="250" width="120" height="46" rx="9"/><text class="nn" x="532" y="270">Split</text><text class="ns" x="532" y="284">aggregate?</text></g>
      <g class="node" data-k="out_slack"><rect class="nd out" x="340" y="196" width="120" height="46" rx="9"/><text class="nn" x="352" y="216">Post Scorecard</text><text class="ns" x="352" y="230">Slack · #war-room</text></g>
      <g class="node" data-k="out_master"><rect class="nd out" x="340" y="250" width="120" height="46" rx="9"/><text class="nn" x="352" y="270">Save Master</text><text class="ns" x="352" y="284">Drive</text></g>
      <g class="node" data-k="out_reports"><rect class="nd out" x="340" y="304" width="120" height="46" rx="9"/><text class="nn" x="352" y="324">Save Reports</text><text class="ns" x="352" y="338">Drive · Fix Prompt</text></g>
    </svg>`;

export function TigerTeamBlueprint() {
  return (
    <figure className="my-10 overflow-x-auto rounded-card border border-border bg-bg-card/40 p-4">
      <div className="min-w-[680px]" dangerouslySetInnerHTML={{ __html: BLUEPRINT_SVG }} />
      <figcaption className="mt-3 text-center text-sm text-ink-muted">
        The live audit pipeline: intake → three rival auditors → cross-verify → reward engine → filed reports and fixes.
      </figcaption>
    </figure>
  );
}
