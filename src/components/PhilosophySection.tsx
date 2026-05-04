"use client";

import { motion } from 'framer-motion';

export default function PhilosophySection() {
  return (
    <section className="bg-black py-28 md:py-44 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-28 font-bold"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-white/30">Innovation</span>{' '}
          <span className="text-blue-500">×</span>{' '}
          <span className="text-white/30">Vision</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <motion.div
            className="relative rounded-3xl overflow-hidden aspect-[4/3] group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <video
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            >
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white/60 text-xs tracking-widest uppercase">Philosophy</p>
            </div>
          </motion.div>

          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
                  <span className="text-blue-400 text-lg font-bold">01</span>
                </div>
                <p className="text-white/40 text-xs tracking-widest uppercase">Escolha seu espaço</p>
              </div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Cada avanço significativo começa na interseção entre estratégia disciplinada e visão criativa notável. Operamos nesse cruzamento, transformando pensamento ousado em resultados tangíveis que movem pessoas e reformulam indústrias.
              </p>
            </motion.div>

            <div className="w-full h-px bg-gradient-to-r from-blue-500/20 via-white/10 to-purple-500/20" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                  <span className="text-purple-400 text-lg font-bold">02</span>
                </div>
                <p className="text-white/40 text-xs tracking-widest uppercase">Shape o futuro</p>
              </div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Acreditamos que o melhor trabalho emerge quando curiosidade encontra convicção. Nosso processo é projetado para descobrir oportunidades ocultas e traduzi-las em experiências que ressoam muito após a primeira impressão.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}