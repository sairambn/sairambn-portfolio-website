'use client';

import { motion } from 'framer-motion';
import { principles } from '@/lib/data';

export function Approach() {
  return (
    <section id="approach" className="border-b border-line">
      <div className="mx-auto max-w-site px-5 py-20 md:px-8 md:py-28">
        <div className="mb-16 grid gap-6 md:grid-cols-[minmax(0,200px)_1fr]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Nº003 / Approach
          </p>
          <div>
            <h2 className="font-display text-display-md font-semibold text-paper">
              How I work
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              Four principles. No framework theatre — just the habits that keep
              systems correct and finished.
            </p>
          </div>
        </div>

        <ol className="grid gap-0 divide-y divide-line md:grid-cols-2 md:divide-y-0 md:gap-x-12 md:gap-y-0">
          {principles.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border-line py-8 md:border-t"
            >
              <p className="font-mono text-[11px] text-accent">Nº{p.index}</p>
              <h3 className="mt-2 font-display text-xl font-medium text-paper">
                {p.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                {p.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
