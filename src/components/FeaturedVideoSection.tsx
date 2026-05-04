"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

export default function FeaturedVideoSection() {
  return (
    <section id="como-funciona" className="bg-gray-50 py-20 md:py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl shadow-gray-200/50"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <video
            className="w-full h-full object-cover"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 cursor-pointer"
              animate={{ 
                boxShadow: ["0 0 0 0 rgba(255,255,255,0.4)", "0 0 0 20px rgba(255,255,255,0)", "0 0 0 0 rgba(255,255,255,0)"] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.3)" }}
            >
              <Play className="w-10 h-10 text-white ml-1" />
            </motion.div>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row gap-6 items-end">
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-lg border border-white/20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <p className="text-white/80 text-xs tracking-widest uppercase">Nossa Abordagem</p>
              </div>
              <p className="text-white text-base leading-relaxed">
                Acreditamos no poder da exploração guiada por curiosidade. Cada projeto começa com uma pergunta, e cada resposta abre uma nova porta para a inovação no mercado financeiro.
              </p>
            </motion.div>

            <motion.button
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver demonstração
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { title: "Análise em Tempo Real", desc: "Dados atualizados a cada segundo" },
            { title: "IA Avançada", desc: "Tradução de notícias em linguagem simples" },
            { title: "Conformidade Total", desc: "Seguindo regulamentações brasileiras" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}