/**
 * Homepage testimonial marquee copy.
 * Source: Downloads/Testimonials.md — edit here only.
 */
export interface Testimonial {
  industry: string;
  quote: string;
  name: string;
  location?: string;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    industry: 'Roofing',
    quote:
      'Cancellation rates dropped from 37% to 26% within 6 months. I don’t have to tell you the average sale of a new tile roof.',
    name: 'Robert B.',
    location: 'Ave Maria, FL',
    company: 'Centex Roofing',
  },
  {
    industry: 'Insurance',
    quote:
      'We ported the AI into our existing phone number and it started capturing quote requests we didn’t even know we were missing. Our producers now walk into conversations already pre-qualified.',
    name: 'Sam B.',
    location: 'Marco Island, FL',
    company: 'Century Mutual Casualty Insurance',
  },
  {
    industry: 'Insurance',
    quote:
      'Clients get immediate reassurance when something goes wrong, instead of waiting on hold or leaving a voicemail. That alone has cut down on angry follow-up calls.',
    name: 'Phil M.',
    location: 'Naples, FL',
    company: 'Genworth Financial',
  },
  {
    industry: 'Plumbing',
    quote:
      'Weekend backups and emergency leaks are now our best jobs instead of our biggest headaches. Christine (AI Front Desk) calmly walks customers through the issue and gets us on the schedule in minutes.',
    name: 'Christian N.',
    location: 'Ft. Myers',
    company: 'Always On Plumbing',
  },
  {
    industry: 'HVAC',
    quote:
      'Holiday and after-hours AC emergencies used to go straight to voicemail. Now the AI picks up, qualifies, and books the job before they can call a competitor.',
    name: 'Will C.',
    location: 'Bonita Springs, FL',
    company: 'WC HVAC',
  },
  {
    industry: 'HVAC',
    quote:
      "Allison (AI Receptionist), asks the right questions, and even texts customers' confirmations pro-actively. My techs love it. They just show up with the knowledge that their next service stop has been primed.",
    name: 'Mark M.',
    location: 'Jacksonville, FL',
    company: 'Champion Air',
  },
  {
    industry: 'Plumbing',
    quote:
      "We didn’t change our ads at all — just stopped losing the calls they generated. Revenue went up, and my office manager finally got her evenings back.",
    name: 'Derek D.',
    company: 'First Care Plumbing & Water Damage Restoration',
  },
  {
    industry: 'Electrical',
    quote:
      "Homeowners don’t care if it’s A.I. or a person; they care that someone answers and gets them on the calendar. This does that without ever getting tired.",
    name: 'Jackson P.',
    location: 'Miami, FL',
    company: 'JP Electrical',
  },
  {
    industry: 'Property Management',
    quote:
      'Tenants get someone answering 24/7, logging every detail, and routing it to the right team. My maintenance coordinator went from drowning in voicemails to simply prioritizing jobs.',
    name: 'Eric M.',
    location: 'Ft. Lauderdale',
    company: 'West Broward Property Management',
  },
];
