"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-28 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white leading-[1.15] mb-4 tracking-tight">
            Pronto para transformar seus investimentos?
          </h2>
          <p className="text-white/40 text-[15px] mb-8 leading-relaxed">
            Comece gratuitamente e descubra insights que profissionais pagam para acessar.
          </p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-[15px] font-medium hover:bg-white/90 transition-colors"
          >
            Criar conta grátis
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <p className="text-white/25 text-[12px] mt-6">
            Sem necessidade de cartão de crédito
          </p>
        </motion.div>
      </div>
    </section>
  );
}