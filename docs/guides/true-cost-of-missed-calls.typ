// The True Cost of Missed Calls — free lead-magnet guide
// Compile: typst compile true-cost-of-missed-calls.typ
// Delivered via the EmailCapture form → /guides/the-true-cost-of-missed-calls.pdf

#let ink = rgb("#111113")
#let muted = rgb("#55606b")
#let accent = rgb("#0099bb")
#let cta = rgb("#f97316")
#let cardbg = rgb("#f4f6f8")

#set page(
  paper: "us-letter",
  margin: (x: 1in, y: 0.9in),
  footer: context [
    #set text(size: 8pt, fill: muted, font: "Helvetica Neue")
    #line(length: 100%, stroke: 0.5pt + rgb("#dddddd"))
    #v(4pt)
    growthmindset.ai — The True Cost of Missed Calls
    #h(1fr)
    #counter(page).display("1 of 1", both: true)
  ],
)
#set text(font: "Helvetica Neue", size: 10.5pt, fill: ink)
#set par(leading: 0.72em, justify: false)
#show heading.where(level: 1): it => [
  #set text(size: 22pt, weight: "bold")
  #v(6pt) #it #v(4pt)
]
#show heading.where(level: 2): it => [
  #set text(size: 14pt, weight: "bold")
  #v(10pt) #it #v(2pt)
]

// ---------- Title ----------
#v(1.2in)
#text(size: 10pt, fill: accent, weight: "semibold", tracking: 2pt)[FREE GUIDE · GROWTHMINDSET.AI]
#v(10pt)
#text(size: 34pt, weight: "bold")[The True Cost\ of Missed Calls]
#v(10pt)
#text(size: 13pt, fill: muted)[
  The math nobody runs on an unanswered phone — with typical dollar
  figures for twelve service industries in Southwest Florida.
]
#v(24pt)
#box(fill: cardbg, radius: 6pt, inset: 14pt, width: 100%)[
  #text(size: 10pt, fill: muted)[
    *Who this is for:* owners of service businesses — trades, offices, and
    agencies — who suspect the phone is leaking revenue but have never put
    a number on it. Ten minutes with this guide and a calculator will tell you.
  ]
]
#v(1fr)
#text(size: 9pt, fill: muted)[
  Prepared by Matt Martelli · growthmindset.ai · July 2026 \
  Figures researched from published Southwest Florida pricing data (Naples, Fort Myers, Miami).
]
#pagebreak()

// ---------- The problem ----------
= The problem you can't see on a P&L

A large share of calls to service businesses ring out during business
hours — not at midnight, not on holidays, but while the trucks are out and
the office is juggling three things at once. Most callers who hit voicemail
don't leave a message. They hang up, scroll to the next name on Google, and
call your competitor.

That's the part owners miss. You're not "losing leads" in an abstract
funnel. You're handing warm, ready-to-buy customers directly to the
business one listing down — after paying for the marketing that made your
phone ring in the first place.

== Why it happens to well-run shops

It isn't a discipline problem; it's a physics problem. Your best people are
on roofs, under sinks, in consults, chairside — exactly where they can't
pick up. A second call arrives while the first is still going. Lunch
happens. The 7 PM storm-damage call lands after everyone's gone home. The
phone is a single point of failure, and humans can't be in two places at
once.

== Speed decides the winner

When something's broken, customers don't comparison-shop for three days —
they call down the list until someone answers, and they usually book the
first competent person who does. Research on lead response popularized by
the Harvard Business Review / MIT studies found responding within five
minutes makes you roughly *21× more likely to qualify the lead* than
waiting thirty. After that, the curve falls off a cliff.

Every missed call you recover is usually also a job your competitor didn't
get. The math cuts both ways.

// ---------- The math ----------
= The math: three numbers you already know

#box(fill: cardbg, radius: 6pt, inset: 16pt, width: 100%)[
  #align(center)[
    #text(size: 13pt, weight: "bold")[
      missed calls per month #h(6pt) × #h(6pt) close rate #h(6pt) × #h(6pt) average sale
    ]
    #v(4pt)
    #text(size: 11pt, fill: cta, weight: "semibold")[= revenue walking out the door every month]
  ]
]
#v(6pt)

Be honest about the inputs. Count after-hours rings, the second line that
went unanswered while the first was busy, the lunchtime voicemails. Use
your true average ticket — not your best job, not your worst.

= What it looks like in Southwest Florida

Typical figures for twelve industries in the Naples / Fort Myers / Miami
market, researched July 2026 from published pricing data. The assumptions
are deliberately conservative — most shops miss more calls than this.

#v(6pt)
#let row(industry, sale, what, missed, close, monthly) = (
  [#text(weight: "semibold")[#industry]], [#sale], [#text(size: 8.5pt, fill: muted)[#what]],
  [#missed], [#close], [#text(weight: "semibold", fill: cta)[#monthly]],
)
#table(
  columns: (1.5fr, 0.8fr, 1.5fr, 0.7fr, 0.6fr, 1fr),
  stroke: (x, y) => if y == 0 { (bottom: 1pt + ink) } else { (bottom: 0.5pt + rgb("#e2e6ea")) },
  inset: (x: 6pt, y: 7pt),
  align: (left, right, left, center, center, right),
  fill: (x, y) => if y == 0 { cardbg },
  table.header(
    [*Industry*], [*Avg sale*], [*What that is*], [*Missed / mo*], [*Close*], [*Monthly exposure*],
  ),
  ..row("HVAC", "$8,500", "avg A/C system replacement", "26", "20%", "$44,200"),
  ..row("Roofing", "$28,000", "avg replacement, hurricane code", "13", "15%", "$54,600"),
  ..row("Plumbing", "$500", "blended avg ticket", "34", "30%", "$5,100"),
  ..row("Electrical", "$750", "avg residential job", "26", "30%", "$5,850"),
  ..row("Insurance", "$600", "first-year commission / policy", "34", "25%", "$5,100"),
  ..row("Real estate", "$13,500", "one side of a closing", "17", "5%", "$11,475"),
  ..row("Legal", "$3,500", "avg initial retainer", "22", "15%", "$11,550"),
  ..row("Medical / dental", "$1,200", "new-patient first-year value", "26", "35%", "$10,920"),
  ..row("Locksmith", "$175", "avg service call", "43", "50%", "$3,763"),
  ..row("Property mgmt", "$3,000", "annual revenue per door", "13", "20%", "$7,800"),
  ..row("Home services", "$450", "blended avg ticket", "34", "30%", "$4,590"),
  ..row("Any service business", "$500", "generic avg job value", "26", "25%", "$3,250"),
)
#v(4pt)
#text(size: 8.5pt, fill: muted)[
  Illustrations, not earnings claims. Average-sale figures come from published
  Southwest Florida and national pricing sources (contractor pricing guides,
  Angi/HomeAdvisor data, Redfin market data, FAIA compensation study, industry
  benchmarks), July 2026. "Missed / mo" assumes 3–10 unanswered calls per week
  depending on call volume typical for the trade. Your numbers will vary —
  run your own.
]
#pagebreak()

// ---------- The fix ----------
= What actually fixes it

The honest options are limited:

*A bigger front office* is expensive, and still can't cover nights,
weekends, or two calls at once.

*A traditional answering service* picks up, but can't qualify the job,
quote a range, or book the appointment — you're still calling everyone
back, by which time they've moved on.

*An AI voice agent* answers on the first ring, every time, around the
clock. It qualifies the job, captures the details your team needs, books
into your existing scheduler, and texts the customer a confirmation before
they've finished their coffee. Twenty simultaneous calls during the first
cold snap — no new hires, no busy signal, no voicemail.

== The 30-second test

Call your own business right now — once during lunch, once after close.
Time how long it rings. Listen to what a customer hears. That experience is
your real front door, and it's what this guide just priced.

#v(16pt)
#box(fill: cardbg, radius: 6pt, inset: 16pt, width: 100%)[
  #text(size: 13pt, weight: "bold")[Hear it answer live]
  #v(4pt)
  #text(fill: muted)[
    Our AI will actually call you and run the whole flow — qualify, book,
    confirm — so you can hear it before you decide anything.
  ]
  #v(8pt)
  #text(size: 12pt, weight: "semibold", fill: accent)[growthmindset.ai #h(6pt) → #h(6pt) Get Your Free Demo]
]
#v(10pt)
#text(size: 9pt, fill: muted)[
  © 2026 growthmindset.ai · Questions? matt\@growthmindset.ai \
  Per-industry breakdowns: growthmindset.ai/hvac · /roofing · /plumbing · /electrical · /insurance ·
  /real-estate · /legal · /medical · /locksmith · /property-management · /home-services
]
