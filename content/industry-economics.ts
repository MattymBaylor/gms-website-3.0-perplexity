import type { IndustryEconomics } from '@/components/sections/MissedCallMath';

/**
 * Per-industry economics for the MissedCallMath animated explainer.
 *
 * Dollar figures researched 2026-07 for Southwest Florida (Naples, Fort Myers,
 * Miami) — each entry cites its sources in the comment above it. The
 * missedPerWeek / closeRate assumptions are deliberately conservative demo
 * inputs, not claims; the component prints them in the fine print.
 */
export const INDUSTRY_ECONOMICS: Record<string, IndustryEconomics> = {
  // Sources: hvac.com FL replacement guide ($7.5k–$13.5k), onewayairfl.com repair
  // costs, filterbuy.com FL install costs. Range $6,000–$13,500.
  hvac: {
    industry: 'HVAC',
    businessNoun: 'an HVAC business',
    scenario: '9:40 PM · Cape Coral',
    scenarioDetail:
      'The A/C quits in August. Three contractors get dialed, top to bottom of the Google list.',
    avgTicket: 8500,
    metricLabel: 'avg A/C replacement',
    missedPerWeek: 6,
    closeRate: 0.2,
    missedDetail: 'after hours, in attics, during the summer surge',
    basis: 'SWFL A/C system replacements run $6,000–$13,500; we use $8,500.',
  },

  // Sources: pitchroofing.com FL 2026 guide (~$25k avg), coastalroofingofsouthflorida.com
  // (Miami HVHZ $30–35k), instantroofer.com Fort Myers. Range $15,000–$45,000.
  roofing: {
    industry: 'Roofing',
    businessNoun: 'a roofing company',
    scenario: '7:15 AM · Naples',
    scenarioDetail:
      "Shingles in the pool after last night's storm — and every roofer in Collier County is getting the same calls.",
    avgTicket: 28000,
    metricLabel: 'avg roof replacement',
    missedPerWeek: 3,
    closeRate: 0.15,
    missedDetail: 'on roofs, mid-storm-surge, after hours',
    basis: 'SWFL roof replacements under hurricane code run $15,000–$45,000; we use $28,000.',
  },

  // Sources: calljolt.com blended $500 ticket benchmark, homeyou.com Naples repair
  // costs ($254–$627), mikesplumbingswfl.com water heater guide. Range $300–$800.
  plumbing: {
    industry: 'Plumbing',
    businessNoun: 'a plumbing business',
    scenario: '2:47 AM · Fort Myers',
    scenarioDetail:
      "The water heater lets go. They're calling every plumber on the list until someone picks up.",
    avgTicket: 500,
    metricLabel: 'avg ticket',
    missedPerWeek: 8,
    closeRate: 0.3,
    missedDetail: 'under sinks, on emergency calls, at 2 AM',
    basis: 'Blended SWFL plumbing tickets run $300–$800; we use $500.',
  },

  // Sources: manta.com Naples cost data ($901–$1,072 avg project), USREI Miami
  // breakdown, homeguide.com 2026 pricing. Range $350–$1,100.
  electrical: {
    industry: 'Electrical',
    businessNoun: 'an electrical business',
    scenario: '6:05 PM · Bonita Springs',
    scenarioDetail:
      'Half the house just went dark. Panel? Breaker? They need an answer tonight, not tomorrow.',
    avgTicket: 750,
    metricLabel: 'avg job',
    missedPerWeek: 6,
    closeRate: 0.3,
    missedDetail: 'in panels, on ladders, between service calls',
    basis: 'Naples-area electrical jobs run $350–$1,100; we use $750.',
  },

  // Sources: FAIA agent compensation study (10.8% avg HO commission), sonant.ai
  // commission guide, insurify.com FL 2026 premium report. Range $400–$900.
  insurance: {
    industry: 'Insurance',
    businessNoun: 'an insurance agency',
    scenario: 'Monday 8:02 AM · Naples',
    scenarioDetail:
      "The renewal letter landed 40% higher. They're shopping three agencies before lunch.",
    avgTicket: 600,
    metricLabel: 'first-year commission',
    missedPerWeek: 8,
    closeRate: 0.25,
    missedDetail: 'during quotes, at renewals season, over lunch',
    basis:
      'First-year commission on a Florida homeowners policy runs $400–$900 (before renewals); we use $600.',
  },

  // Sources: listwithclever.com FL commission survey (~5.6% total), redfin.com
  // Naples market data, bankrate.com FL commissions. Range $10,000–$18,000.
  realEstate: {
    industry: 'Real Estate',
    businessNoun: 'a real estate team',
    scenario: 'Sunday 2:15 PM · Miami',
    scenarioDetail:
      'A buyer standing outside your listing calls the number on the sign. Once.',
    avgTicket: 13500,
    metricLabel: 'avg commission per closing',
    missedPerWeek: 4,
    closeRate: 0.05,
    missedDetail: 'at showings, in closings, on Sunday afternoons',
    basis:
      'One side of a SWFL/Miami closing grosses $10,000–$18,000 in commission; we use $13,500.',
  },

  // Sources: marquezkellylaw.com Fort Myers divorce costs ($2.5k–$5k retainers),
  // kleinattorneys.com FL fee guide, markmlegal.com estate planning. Range $2,500–$7,500.
  legal: {
    industry: 'Legal',
    businessNoun: 'a law firm',
    scenario: 'Tuesday 12:30 PM · Fort Myers',
    scenarioDetail:
      '"I need to talk to someone today." If it goes to voicemail, they dial the next firm.',
    avgTicket: 3500,
    metricLabel: 'avg retainer',
    missedPerWeek: 5,
    closeRate: 0.15,
    missedDetail: 'in court, in consults, after 5 PM',
    basis: 'Consumer-practice retainers in SWFL run $2,500–$7,500; we use $3,500.',
  },

  // Sources: dentistryiq.com / Sikka new-patient value data ($1.2k–$1.5k first-year),
  // schedulinginstitute.com practice economics, realdentalcosts.com Naples implants.
  medical: {
    industry: 'Medical / Dental',
    businessNoun: 'a medical or dental practice',
    scenario: 'Lunchtime · Naples',
    scenarioDetail:
      'A new patient calls to book a cleaning. The front desk is with a patient. Voicemail.',
    avgTicket: 1200,
    metricLabel: 'new-patient value',
    missedPerWeek: 6,
    closeRate: 0.35,
    missedDetail: 'chairside, at lunch, after closing',
    basis: "A new dental patient's first-year value runs $1,000–$1,800; we use $1,200.",
  },

  // Sources: angi.com locksmith cost data ($107–$242 typical), homeadvisor.com
  // (~$156 avg), locksmithsprices.com Miami ($95–$215). Range $95–$300.
  locksmith: {
    industry: 'Locksmith',
    businessNoun: 'a locksmith business',
    scenario: '11:58 PM · Miami',
    scenarioDetail:
      'Locked out in a parking garage. Nobody leaves a voicemail for a locksmith — they call the next one.',
    avgTicket: 175,
    metricLabel: 'avg service call',
    missedPerWeek: 10,
    closeRate: 0.5,
    missedDetail: 'on jobs, driving between calls, at midnight',
    basis: 'SWFL locksmith service calls run $95–$300; we use $175.',
  },

  // Sources: eatonrealty.com FL management fees (8–12% of rent), belonghome.com
  // FL cost guide, steadily.com Fort Myers rents. Range $2,400–$4,000/door/year.
  propertyManagement: {
    industry: 'Property Management',
    businessNoun: 'a property management company',
    scenario: '10:20 AM · Cape Coral',
    scenarioDetail:
      "An owner with six rentals is interviewing managers today. You're one of three calls.",
    avgTicket: 3000,
    metricLabel: 'per door, per year',
    missedPerWeek: 3,
    closeRate: 0.2,
    missedDetail: 'at inspections, mid-turnover, on maintenance runs',
    basis: 'A managed door in SWFL yields $2,400–$4,000 a year; we use $3,000.',
  },

  // Sources: homeservicehound.com 2025 ticket benchmarks, housecallpro.com pest
  // pricing, angi.com garage door costs. Range $150–$850 blended.
  homeServices: {
    industry: 'Home Services',
    businessNoun: 'a home services business',
    scenario: 'Saturday 9:00 AM · Naples',
    scenarioDetail:
      "The pool's green and the in-laws land Friday. The first company to answer gets the job.",
    avgTicket: 450,
    metricLabel: 'avg ticket',
    missedPerWeek: 8,
    closeRate: 0.3,
    missedDetail: 'on routes, in backyards, on weekends',
    basis: 'Blended home-services tickets run $150–$850; we use $450.',
  },

  // Sources: ainora.lt 2026 service-call statistics, homeservicehound.com 2025
  // benchmarks, KPMG home services industry update. Range $300–$950.
  custom: {
    industry: 'Custom',
    businessNoun: 'a service business',
    scenario: 'Your busiest hour',
    scenarioDetail:
      'Two calls at once, a customer at the counter — and the phone keeps ringing.',
    avgTicket: 500,
    metricLabel: 'avg job value',
    missedPerWeek: 6,
    closeRate: 0.25,
    missedDetail: "whenever you're busiest — which is exactly when they call",
    basis: 'Typical local-service job values run $300–$950; we use $500.',
  },
};
