"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export default function FeaturedVideoSection() {
  return (
    <section className="bg-black pt-10 pb-24 md:pb-36 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="relative rounded-3xl overflow-hidden aspect-[16/9] group"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
        >
          <video
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 cursor-pointer"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </motion.div>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row gap-6 items-end">
            <motion.div
              className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <p className="text-blue-400 text-xs tracking-widest uppercase">Nossa Abordagem</p>
              </div>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                Acreditamos no poder da exploração guiada por curiosidade. Cada projeto começa com uma pergunta, e cada resposta abre uma nova porta para a inovação.
              </p>
            </motion.div>

            <motion.button
              className="liquid-glass rounded-full px-8 py-4 text-white text-sm font-medium flex items-center gap-2"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Explore mais
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}