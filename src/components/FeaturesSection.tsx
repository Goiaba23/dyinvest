"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

function AnimatedWord({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + i * 0.06, ease }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const features = [
    { title: "Análise Instantânea", desc: "Transforme notícias em insights acionáveis em segundos", tag: "AI" },
    { title: "Previsão de Tendências", desc: "Identifique oportunidades antes que o mercado reaja", tag: "Pro" },
    { title: "Análise de Risco", desc: "Avalie o perfil de risco de qualquer ativo com precisão", tag: "AI" },
    { title: "Cobertura Global", desc: "Mercados nacionais e internacionais em uma plataforma", tag: "Global" },
  ];

  return (
    <section id="features" className="py-32 bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-16"
        >
          <span className="text-[#0d9488] text-[13px] font-medium tracking-widest uppercase mb-4 block">
            Recursos
          </span>
          <h2 className="text-4xl md:text-5xl font-normal text-white leading-[1.15] tracking-tight">
            <AnimatedWord text="Tudo que você precisa" delay={0} />
            <AnimatedWord text="para investir melhor" delay={0.3} />
          </h2>
        </motion.div>

        {/* Features grid - Obsidianos style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group relative p-8 rounded-2xl bg-[#0a0a0a] border border-white/[0.06] hover:border-[#0d9488]/20 transition-all duration-300"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-white text-xl font-medium">{feature.title}</h3>
                <span className="px-3 py-1 text-[11px] font-medium text-[#0d9488] bg-[#0d9488]/10 rounded-full">
                  {feature.tag}
                </span>
              </div>
              
              <p className="text-white/40 text-[15px] leading-relaxed mb-6">
                {feature.desc}
              </p>

              <div className="flex items-center gap-2 text-[#0d9488] text-[13px] opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Saiba mais</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              {/* Corner glow effect */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#0d9488]/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}