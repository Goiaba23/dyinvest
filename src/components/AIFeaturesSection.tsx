"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Brain, TrendingUp, Shield, Zap, Globe } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + i * 0.05, ease }}
          className="inline-block mr-[0.2em]"
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export default function AIFeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const aiFeatures = [
    { icon: Brain, title: "Análise de Sentimento", desc: "Entenda o mercado através de análise de sentimento em tempo real" },
    { icon: TrendingUp, title: "Predição de Tendências", desc: "Identifique padrões e antecipar movimentos do mercado" },
    { icon: Zap, title: "Processamento Rápido", desc: "Miles de notícias processadas em milissegundos" },
    { icon: Shield, title: "Análise de Risco", desc: "Avalie riscos com precisão usando modelos preditivos" },
    { icon: Globe, title: "Cobertura Global", desc: "Acompanhe mercados de todo o mundo em um só lugar" },
    { icon: Sparkles, title: "Relatórios Automáticos", desc: "Gere relatórios personalizados com um clique" },
  ];

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background element */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0d9488]/3 rounded-full blur-[150px]" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0d9488]/10 border border-[#0d9488]/20 rounded-full text-[#0d9488] text-[13px] font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Powered by AI
          </span>
          <h2 className="text-4xl md:text-5xl font-normal text-white leading-[1.15] tracking-tight">
            <AnimatedText text="Inteligência artificial" delay={0} />
            <AnimatedText text="para suas decisões" delay={0.2} />
          </h2>
        </motion.div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease }}
              className="group p-6 rounded-xl bg-[#080808] border border-white/[0.04] hover:border-[#0d9488]/15 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0d9488]/10 flex items-center justify-center mb-4 group-hover:bg-[#0d9488]/20 transition-colors">
                <feature.icon className="w-5 h-5 text-[#0d9488]" />
              </div>
              <h3 className="text-white text-[16px] font-medium mb-2">{feature.title}</h3>
              <p className="text-white/35 text-[13px] leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}