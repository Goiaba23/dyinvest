"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Brain, BarChart3, Shield, Zap } from 'lucide-react';

const services = [
  { tag: 'Inteligência', title: 'Análise com IA', desc: 'Notícias e dados em tempo real', icon: Brain },
  { tag: 'Dados', title: 'Probabilidades', desc: 'Baseadas em dados reais', icon: BarChart3 },
  { tag: 'Segurança', title: 'Dados Confiáveis', desc: 'Fontes verificadas', icon: Shield },
  { tag: 'Velocidade', title: 'Tempo Real', desc: 'Dados 24/7', icon: Zap },
];

const testimonials = [
  { n: "Ricardo M.", r: "Investidor", t: "Finalmente uma ferramenta que traduz o mercado para quem não é expert.", a: "RM" },
  { n: "Ana Paula S.", r: "Iniciante", t: "O DYInvest me ajuda a entender as notícias que antes não compreendia.", a: "AP" },
  { n: "Carlos E.", r: "Trader", t: "A análise em tempo real mudou minha forma de operar.", a: "CE" }
];

export default function ServicesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <section id="depoimentos" ref={ref} className="bg-gray-50 py-24 px-6">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gray-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gray-100/50 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-14"
        >
          <p className="text-gray-400 text-xs tracking-widest uppercase mb-3">Serviços</p>
          <h2 className="text-2xl md:text-3xl text-gray-900 font-medium">O que oferecemos</h2>
        </motion.div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-14">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
              className="p-5 rounded-xl bg-white border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-gray-400 text-xs">{s.tag}</span>
                  <h3 className="text-sm font-medium text-gray-900 mt-1">{s.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
                </div>
                <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                  <s.icon className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-gray-400 text-sm mb-8">O que dizem</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="p-4 rounded-xl bg-white border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                    {t.a}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t.n}</p>
                    <p className="text-xs text-gray-400">{t.r}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">"{t.t}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-gray-500 text-sm mb-4">Pronto para começar?</p>
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full text-sm font-medium">
            Criar conta gratuita
          </button>
        </motion.div>
      </div>
    </section>
  );
}