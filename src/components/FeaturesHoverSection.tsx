"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';

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
          transition={{ duration: 0.5, delay: delay + i * 0.06, ease }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export default function FeaturesHoverSection() {
  const features = [
    { icon: "📊", title: "Dados em Tempo Real", desc: "Acompanhe o mercado segundo a segundo" },
    { icon: "🎯", title: "Precisão", desc: "Análises baseadas em machine learning" },
    { icon: "🔒", title: "Segurança", desc: "Seus dados protegidos com criptografia" },
    { icon: "⚡", title: "Velocidade", desc: "Processamento em milissegundos" },
    { icon: "🌍", title: "Global", desc: "Acesso a mercados internacionais" },
    { icon: "💬", title: "Comunidade", desc: "Conecte-se com outros investidores" },
  ];

  return (
    <section className="py-28 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            <AnimatedText text="Recursos avançados" delay={0} />
          </h2>
          <p className="text-white/40 text-[15px] mt-4">
            Tudo que você precisa para investir melhor
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group relative p-6 rounded-xl bg-[#111] border border-white/[0.05] overflow-hidden"
            >
              {/* Hover gradient effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#0d9488]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              {/* Glow effect on hover */}
              <motion.div
                className="absolute -inset-px bg-gradient-to-r from-[#0d9488]/0 via-[#0d9488]/10 to-[#0d9488]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ borderRadius: 'inherit' }}
              />

              <div className="relative z-10">
                <span className="text-2xl mb-4 block">{feature.icon}</span>
                <h3 className="text-white text-[15px] font-medium mb-2">{feature.title}</h3>
                <p className="text-white/35 text-[13px] leading-relaxed">{feature.desc}</p>
              </div>

              {/* Corner accent */}
              <motion.div
                className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#0d9488]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ borderRadius: '0 12px 0 100%' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}