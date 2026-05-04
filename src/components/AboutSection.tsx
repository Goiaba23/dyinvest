"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Shield, Zap, Globe, Users } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

function WordReveal({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const words = text.split(' ');
  return (
    <span className={className}>
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
    </span>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const features = [
    { icon: BarChart3, title: "Análise Instantânea", desc: "Transforme notícias complexas em insights acionáveis em segundos" },
    { icon: TrendingUp, title: "Previsão de Tendências", desc: "Identifique oportunidades antes que o mercado reaja" },
    { icon: Shield, title: "Análise de Risco", desc: "Avalie o perfil de risco de qualquer ativo com precisão" },
    { icon: Zap, title: "Velocidade", desc: "Processamento em tempo real de milhares de fontes" },
    { icon: Globe, title: "Cobertura Global", desc: "Mercados nacionais e internacionais em uma única plataforma" },
    { icon: Users, title: "Comunidade", desc: "Conecte-se com investidores e compartilhe estratégias" }
  ];

  return (
    <section className="py-28 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Headline - clean, short */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="text-3xl md:text-4xl font-semibold text-white leading-[1.15] tracking-tight"
          >
            <WordReveal text="Por que escolher" delay={0} />
            <WordReveal text="DYInvest?" delay={0.3} />
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6, ease }}
            className="text-white/40 text-[15px] mt-4 max-w-md leading-relaxed"
          >
            Uma plataforma construída por investidores, para investidores.
          </motion.p>
        </div>

        {/* Feature grid - minimal, no cards, clean spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: 0.7 + i * 0.08, 
                ease 
              }}
              className="group"
            >
              <div className="w-9 h-9 rounded-lg bg-white/[0.03] flex items-center justify-center mb-4 group-hover:bg-[#0d9488]/10 transition-colors">
                <feature.icon className="w-4 h-4 text-white/60 group-hover:text-[#0d9488] transition-colors" />
              </div>
              <h3 className="text-white text-[15px] font-medium mb-2">{feature.title}</h3>
              <p className="text-white/35 text-[13px] leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}