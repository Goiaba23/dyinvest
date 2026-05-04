"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

function WordReveal({ text, delay = 0, highlight = false }: { text: string; delay?: number; highlight?: boolean }) {
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
          className={`inline-block mr-[0.25em] ${highlight ? 'text-[#0d9488]' : 'text-white'}`}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export default function FeaturedVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-28 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-[11px] font-medium text-[#0d9488] mb-6 tracking-widest uppercase"
        >
          Plataforma
        </motion.div>

        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white leading-[1.15] mb-10 tracking-tight">
          <WordReveal text="Assista ao mercado" delay={0.1} />
          <WordReveal text="em tempo real" delay={0.4} highlight />
        </h2>

        {/* Video placeholder - clean Apple style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="relative aspect-video bg-[#111] rounded-lg overflow-hidden group cursor-pointer"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
          
          {/* Play button - minimal */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/[0.1] backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
            </div>
          </div>

          {/* Bottom info - subtle */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-white text-[14px] font-medium">Demo da Plataforma</p>
            <p className="text-white/40 text-[12px] mt-1">2:34</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}