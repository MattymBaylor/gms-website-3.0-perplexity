'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface QA {
  q: string;
  a: string;
}

const FAQS: QA[] = [
  {
    q: 'Does it really sound human?',
    a: "Yes. The voice is designed to feel natural, calm, and useful on real service calls. We'll show you live in the demo so you can judge it against your own callers and scripts.",
  },
  {
    q: 'I already have a receptionist. Do I still need this?',
    a: 'Your receptionist handles one call at a time, during business hours. This handles 20 simultaneously, 24/7. Think of it as a force-multiplier — it filters and books the easy ones so your team only takes the calls that actually need a human.',
  },
  {
    q: 'How fast is setup?',
    a: 'Most demos can be prepared quickly because we start with your business details, service area, and call scripts. If you move forward, we confirm the workflow before anything goes live.',
  },
  {
    q: 'What if a caller wants to speak to a real person?',
    a: "The AI can transfer to you or any of your team at any time. It's a filter, not a wall. Callers in genuine emergencies or who simply prefer a human always reach one.",
  },
  {
    q: 'Can it handle multiple calls at once?',
    a: 'Yes — up to 20 simultaneous calls per number. No busy signals, no hold music, no "please hold." If 20 people call at the exact same second, all 20 get answered immediately.',
  },
  {
    q: 'Is there a long-term contract?',
    a: 'No. Month-to-month, cancel anytime. The 14-day free trial means you only pay if it works.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section" aria-labelledby="faq-heading">
      <div className="container-prose">
        <div className="mb-10 text-center">
          <p className="eyebrow">Questions</p>
          <h2 id="faq-heading" className="mt-3 text-h1 font-semibold text-ink">
            FAQs
          </h2>
        </div>

        <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
          {FAQS.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <div key={idx}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                >
                  <span className="text-base font-medium text-ink md:text-lg">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-ink-muted"
                    aria-hidden="true"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-8 text-ink-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
