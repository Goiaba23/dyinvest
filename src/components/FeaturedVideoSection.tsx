"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';

export default function FeaturedVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Clean fade reveal with subtle scale
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const words = ["Assista", "ao", "mercado", "em", "tempo", "real"];

  return (
    <section ref={containerRef} className="py-32 bg-white">
      <motion.div style={{ scale, opacity }} className="max-w-5xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-sm font-medium text-[#0d9488] mb-6"
        >
          PLATAFORMA
        </motion.div>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-[1.15] mb-8">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
              className={`inline-block mr-[0.25em] ${i === 3 ? 'text-[#0d9488]' : ''}`}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {/* Video placeholder - Apple style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden group cursor-pointer"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-gray-900/10" />
          
          {/* Play button - minimal */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
            </div>
          </div>

          {/* Bottom info - subtle */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
            <p className="text-white text-sm font-medium">Demo da Plataforma</p>
            <p className="text-white/70 text-xs mt-1">2:34</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}