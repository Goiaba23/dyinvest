"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <>
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
    </>
  );
}

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
    { title: "Análise de Ativos", desc: "Avaliação completa de ações, fundos e outros ativos", price: "R$ 97/mês" },
    { title: "Sinal de Trading", desc: "Alertas de entrada e saída baseados em IA", price: "R$ 147/mês" },
    { title: "Carteira Personalizada", desc: "Construção e gestão de portfólio sob medida", price: "R$ 297/mês" },
    { title: "Consultoria VIP", desc: "Atendimento prioritário e estratégias avançadas", price: "Sob consulta" }
  ];

  const testimonials = [
    { quote: "Transformou minha forma de investir.", author: "Carlos M., Investidor" },
    { quote: "Os sinais são impressionantes.", author: "Ana L., Trader" }
  ];

  return (
    <section className="py-28 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-[11px] font-medium text-[#0d9488] mb-4 tracking-widest uppercase"
        >
          Planos
        </motion.div>

        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white leading-[1.15] mb-12 tracking-tight">
          <WordReveal text="Nossos planos" delay={0.1} />
        </h2>

        {/* Services grid - clean cards, Apple style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3 + i * 0.08, 
                ease 
              }}
              className="p-5 rounded-lg bg-[#111] border border-white/[0.05] hover:border-white/[0.1] transition-colors group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-white text-[15px] font-medium">{service.title}</h3>
                <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#0d9488] transition-colors" />
              </div>
              <p className="text-white/35 text-[13px] mb-3">{service.desc}</p>
              <p className="text-[#0d9488] text-[14px] font-medium">{service.price}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials - minimal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: 0.6 + i * 0.08, 
                ease 
              }}
              className="p-5 rounded-lg bg-[#111]"
            >
              <p className="text-white/60 text-[14px] mb-3 leading-relaxed">"{testimonial.quote}"</p>
              <p className="text-white/30 text-[12px]">{testimonial.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}