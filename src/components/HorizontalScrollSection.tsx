"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { motion as m } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

function AnimatedText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <m.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.06, ease }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </m.span>
      ))}
    </>
  );
}

export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const cards = [
    { number: "01", title: "Análise Instantânea", desc: "Transforme notícias em insights acionáveis" },
    { number: "02", title: "Previsão de Tendências", desc: "Identifique oportunidades antes do mercado" },
    { number: "03", title: "Análise de Risco", desc: "Avalie o perfil de risco com precisão" },
    { number: "04", title: "Velocidade", desc: "Processamento em tempo real" },
    { number: "05", title: "Cobertura Global", desc: "Mercados nacionais e internacionais" },
    { number: "06", title: "Comunidade", desc: "Conecte-se com investidores" },
  ];

  return (
    <section ref={containerRef} className="py-28 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-[11px] font-medium text-[#0d9488] mb-4 tracking-widest uppercase"
        >
          Recursos
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
          <AnimatedText text="Tudo que você precisa" />
        </h2>
      </div>

      <div className="relative">
        <motion.div 
          style={{ x }}
          className="flex gap-6 pl-6"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="flex-shrink-0 w-[280px] md:w-[320px] p-6 rounded-xl bg-[#111] border border-white/[0.05] hover:border-[#0d9488]/30 transition-colors group"
            >
              <span className="text-[#0d9488]/40 text-4xl font-light">{card.number}</span>
              <h3 className="text-white text-lg font-medium mt-4 mb-2">{card.title}</h3>
              <p className="text-white/35 text-[13px] leading-relaxed">{card.desc}</p>
              <div className="mt-4 flex items-center gap-2 text-[#0d9488] text-[13px] opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Saiba mais</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Gradient fades on edges */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}