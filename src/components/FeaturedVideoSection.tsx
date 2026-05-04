"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Play, Sparkles } from 'lucide-react';

export default function FeaturedVideoSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [20, -15]);

  return (
    <section id="como-funciona" ref={containerRef} className="bg-gray-50 py-24 px-6">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-gray-100 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gray-100 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-10"
        >
          <p className="text-gray-400 text-xs tracking-widest uppercase mb-3">Como funciona</p>
          <h2 className="text-2xl md:text-3xl text-gray-900 font-medium">Nossa abordagem</h2>
        </motion.div>

        {/* Video - simple */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="relative rounded-xl overflow-hidden aspect-video bg-gray-200"
        >
          <video className="w-full h-full object-cover opacity-40" muted autoPlay loop playsInline>
            <source src="https://cdn.pixabay.com/video/2022/03/10/109530-692035218_large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
              <Play className="w-4 h-4 text-white ml-0.5" />
            </button>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3 h-3 text-white/50" />
              <p className="text-white/50 text-xs">Abordagem</p>
            </div>
            <p className="text-white text-sm">
              Cada pergunta abre uma nova porta para a inovação no mercado.
            </p>
          </div>
        </motion.div>

        {/* Features - simple grid */}
        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {[
            { t: "Tempo Real", d: "Dados a cada segundo" },
            { t: "IA Avançada", d: "Linguagem simples" },
            { t: "Conformidade", d: "Regulamentações" }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } } }}
              className="p-4 rounded-lg bg-white border border-gray-100"
            >
              <p className="text-sm font-medium text-gray-900">{item.t}</p>
              <p className="text-xs text-gray-500 mt-1">{item.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}