"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

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

  const words = ["Nossos", "planos"];

  return (
    <section ref={containerRef} className="py-32 bg-white">
      <motion.div style={{ opacity }} className="max-w-5xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-sm font-medium text-[#0d9488] mb-4"
        >
          PLANOS
        </motion.div>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-[1.15] mb-12">
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
        </h2>

        {/* Services grid - Apple style cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2 + i * 0.08, 
                ease: [0.4, 0, 0.2, 1] 
              }}
              className="p-6 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#0d9488] transition-colors" />
              </div>
              <p className="text-sm text-gray-500 mb-4">{service.desc}</p>
              <p className="text-lg font-medium text-[#0d9488]">{service.price}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials - minimal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0.5 + i * 0.08, 
                ease: [0.4, 0, 0.2, 1] 
              }}
              className="p-6 rounded-xl bg-gray-50"
            >
              <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
              <p className="text-sm text-gray-500">{testimonial.author}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}