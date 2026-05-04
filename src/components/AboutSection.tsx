"use client";

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Brain, TrendingUp, Globe, Shield, Zap, CheckCircle } from 'lucide-react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [30, -20]);

  const features = [
    { icon: Brain, title: "IA que entende você", desc: "Traduz notícias para linguagem simples" },
    { icon: TrendingUp, title: "Probabilidades Reais", desc: "Dados do mercado brasileiro" },
    { icon: Globe, title: "Mercado Global", desc: "500+ ativos em uma plataforma" },
    { icon: Shield, title: "Dados Confiáveis", desc: "Fontes verificadas" },
    { icon: Zap, title: "Tempo Real", desc: "Dados 24/7" },
    { icon: CheckCircle, title: "Para Todos", desc: "Criado para iniciantes" },
  ];

  const stats = [
    { value: "50K+", label: "Investidores" },
    { value: "500+", label: "Ativos" },
    { value: "40+", label: "Fontes" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <section ref={ref} id="recursos" className="bg-white py-24 px-6">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute top-10 left-0 w-64 h-64 bg-gray-50 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-10 right-0 w-64 h-64 bg-gray-50 rounded-full blur-3xl opacity-40" />
      </motion.div>

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl text-gray-900 font-medium">
            Tecnologia que simplifica
          </h2>
          <p className="text-gray-500 mt-3">
            IA + dados para empoderar investidores
          </p>
        </motion.div>

        {/* Stats - simple stagger */}
        <motion.div 
          className="grid grid-cols-4 gap-8 mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
              }}
              className="text-center"
            >
              <div className="text-xl font-medium text-gray-900">{stat.value}</div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
          }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
              }}
              className="p-5 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{feature.title}</h3>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full text-sm font-medium">
            Criar conta gratuita
          </button>
        </motion.div>
      </div>
    </section>
  );
}