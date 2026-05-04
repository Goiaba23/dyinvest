"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Split layout with parallax
  const leftY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rightY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const benefits = [
    "Dados em tempo real",
    "Sem conflito de interesse",
    "Transparente e auditável",
    "Suporte 24/7",
    "Custo benefício",
    "Atualizações gratuitas"
  ];

  const words = ["Nossa", "filosofia"];

  return (
    <section ref={containerRef} className="py-32 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Video side */}
          <motion.div style={{ y: leftY }} className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/5] bg-gray-200 rounded-xl overflow-hidden"
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Video</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <motion.div style={{ y: rightY }} className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="text-sm font-medium text-[#0d9488] mb-4"
            >
              FILOSOFIA
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-[1.15] mb-6">
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

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-lg text-gray-500 mb-8"
            >
              Acreditamos que informação de qualidade deve ser acessível. Por isso 
              desenvolvemos uma ferramenta que traduz dados complexos em decisões claras.
            </motion.p>

            {/* Benefits list - simple checkmarks */}
            <div className="space-y-3">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.3 + i * 0.08, 
                    ease: [0.4, 0, 0.2, 1] 
                  }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#0d9488]" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}