"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5, 
            delay: delay + i * 0.06,
            ease 
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export default function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const benefits = [
    "Dados em tempo real",
    "Sem conflito de interesse",
    "Transparente e auditável",
    "Suporte 24/7",
    "Custo benefício",
    "Atualizações gratuitas"
  ];

  return (
    <section className="py-28 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Video side */}
          <motion.div style={{ y }}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/5] bg-[#111] rounded-lg overflow-hidden"
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white/20 text-sm">Video</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="text-[11px] font-medium text-[#0d9488] mb-4 tracking-widest uppercase"
            >
              Filosofia
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white leading-[1.15] mb-6 tracking-tight">
              <WordReveal text="Nossa filosofia" delay={0.1} />
            </h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="text-white/40 text-[15px] mb-8 leading-relaxed"
            >
              Acreditamos que informação de qualidade deve ser acessível. Por isso 
              desenvolvemos uma ferramenta que traduz dados complexos em decisões claras.
            </motion.p>

            {/* Benefits list - minimal checkmarks */}
            <div className="space-y-3">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.4 + i * 0.06, 
                    ease 
                  }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0d9488]" />
                  <span className="text-white/60 text-[14px]">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}