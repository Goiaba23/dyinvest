"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, TrendingUp, Target, Zap } from 'lucide-react';

export default function PhilosophySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [20, -15]);

  const benefits = [
    { n: "01", t: "Escolha seu espaço", d: "Estratégia disciplinada com visão criativa." },
    { n: "02", t: "Shape o futuro", d: "Curiosidade que encontra convicção." },
    { n: "03", t: "Decisões inteligentes", d: "Análises para decisões informadas." }
  ];

  return (
    <section ref={ref} className="bg-white py-24 px-6">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute top-20 left-0 w-56 h-56 bg-gray-50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-56 h-56 bg-gray-50 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-14"
        >
          <p className="text-gray-400 text-xs tracking-widest uppercase mb-3">Filosofia</p>
          <h2 className="text-2xl md:text-3xl text-gray-900 font-medium">Innovation × Vision</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100"
          >
            <video className="w-full h-full object-cover" muted autoPlay loop playsInline>
              <source src="https://cdn.pixabay.com/video/2023/07/25/130423-838182041_large.mp4" type="video/mp4" />
            </video>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-white/60" />
                <p className="text-white/60 text-xs">DYInvest</p>
              </div>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
          >
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, x: 15 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } } }}
                className="flex gap-4 p-4 rounded-lg hover:bg-gray-50"
              >
                <span className="text-gray-300 font-mono text-sm w-6">{b.n}</span>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{b.t}</h3>
                  <p className="text-xs text-gray-500 mt-1">{b.d}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-14 grid grid-cols-3 gap-6 p-8 rounded-xl bg-gray-50"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[{ v: "R$ 2.5B+", l: "Volume", i: TrendingUp }, { v: "15min", l: "Tempo", i: Target }, { v: "98%", l: "Satisfação", i: Zap }].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-lg font-medium text-gray-900">{s.v}</div>
              <div className="text-gray-400 text-xs mt-1">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}