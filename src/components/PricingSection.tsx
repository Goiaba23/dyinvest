"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

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

export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "R$ 0",
      period: "/mês",
      desc: "Perfeito para começar",
      features: [
        "Acesso básico à plataforma",
        "5 análises por dia",
        "Newsletter diária",
        "Comunidade básica"
      ],
      cta: "Começar grátis",
      popular: false
    },
    {
      name: "Pro",
      price: "R$ 97",
      period: "/mês",
      desc: "Para investidores serious",
      features: [
        "Análises ilimitadas",
        "Relatórios personalizados",
        "Alertas em tempo real",
        "Suporte prioritário",
        "Acesso a todos os mercados"
      ],
      cta: "Começar Pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Sob consulta",
      period: "",
      desc: "Para equipes e instituições",
      features: [
        "Tudo do Pro",
        "Múltiplos usuários",
        "API acesso",
        "Consultoria dedicada",
        "Personalização total"
      ],
      cta: "Falar com equipe",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-32 bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <span className="text-[#0d9488] text-[13px] font-medium tracking-widest uppercase mb-4 block">
            Preços
          </span>
          <h2 className="text-4xl md:text-5xl font-normal text-white leading-[1.15] tracking-tight">
            <AnimatedText text="Escolha o plano" delay={0} />
            <AnimatedText text="ideal para você" delay={0.2} />
          </h2>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease }}
              className={`relative p-8 rounded-2xl border transition-all ${
                plan.popular 
                  ? 'bg-[#0d9488]/5 border-[#0d9488]/30' 
                  : 'bg-[#080808] border-white/[0.06] hover:border-white/[0.1]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#0d9488] text-black text-[11px] font-medium rounded-full">
                  Mais popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-white text-lg font-medium mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-white text-4xl font-normal">{plan.price}</span>
                  <span className="text-white/40 text-[14px]">{plan.period}</span>
                </div>
                <p className="text-white/40 text-[13px] mt-2">{plan.desc}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-white/50 text-[14px]">
                    <Check className="w-4 h-4 text-[#0d9488]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-full text-[14px] font-medium transition-colors ${
                plan.popular 
                  ? 'bg-[#0d9488] text-black hover:bg-[#0d9488]/90' 
                  : 'bg-white text-black hover:bg-white/90'
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}