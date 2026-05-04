"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart3, TrendingUp, Shield, Zap, Globe, Users } from 'lucide-react';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax for clean reveal
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  const features = [
    { icon: BarChart3, title: "Análise Instantânea", desc: "Transforme notícias complexas em insights acionáveis em segundos" },
    { icon: TrendingUp, title: "Previsao de Tendências", desc: "Identifique oportunidades antes que o mercado reaja" },
    { icon: Shield, title: "Análise de Risco", desc: "Avalie o perfil de risco de qualquer ativo com precisão" },
    { icon: Zap, title: "Velocidade", desc: "Processamento em tempo real de milhares de fontes" },
    { icon: Globe, title: "Cobertura Global", desc: "Mercados nacionais e internacionais em uma única plataforma" },
    { icon: Users, title: "Comunidade", desc: "Conecte-se com investidores e compartilhe estratégias" }
  ];

  const words = ["Por que", "escolher", "DYInvest?"];

  return (
    <section ref={containerRef} className="py-32 bg-[#fafafa]">
      <motion.div style={{ y, opacity }} className="max-w-5xl mx-auto px-6">
        {/* Headline */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-4xl md:text-5xl font-semibold text-gray-900 leading-[1.15]"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="text-lg text-gray-500 mt-4 max-w-lg"
          >
            Uma plataforma construída por investidores, para investidores.
          </motion.p>
        </div>

        {/* Feature grid - clean, no cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: i * 0.08, 
                ease: [0.4, 0, 0.2, 1] 
              }}
              className="group"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-[#0d9488]/10 transition-colors">
                <feature.icon className="w-5 h-5 text-gray-700 group-hover:text-[#0d9488] transition-colors" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}