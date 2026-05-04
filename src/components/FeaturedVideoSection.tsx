"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

export default function FeaturedVideoSection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scroll-linked animations
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const clipPath = useTransform(scrollYProgress, [0, 0.3], ["inset(10% 10% 10% 10% round 30px)", "inset(0% 0% 0% 0% round 30px)"]);

  return (
    <section id="como-funciona" ref={containerRef} className="bg-gray-50 py-20 md:py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl shadow-gray-200/50"
          style={{ scale, clipPath }}
        >
          <motion.div style={{ opacity }}>
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
            
            {/* Play button with pulse animation */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 cursor-pointer"
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(255,255,255,0.4)", 
                    "0 0 0 20px rgba(255,255,255,0)", 
                    "0 0 0 40px rgba(255,255,255,0)",
                    "0 0 0 60px rgba(255,255,255,0)"
                  ] 
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
                initial={{ opacity: 0, x: -50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                  <p className="text-white/80 text-xs tracking-widest uppercase">Nossa Abordagem</p>
                </div>
                <p className="text-white text-base leading-relaxed">
                  Acreditamos no poder da exploração guiada por curiosidade. Cada projeto começa com uma pergunta, e cada resposta abre uma nova porta para a inovação no mercado financeiro.
                </p>
              </motion.div>

              <motion.button
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg"
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Ver demonstração
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature cards with staggered animation */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { 
              transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.3
              } 
            }
          }}
        >
          {[
            { title: "Análise em Tempo Real", desc: "Dados atualizados a cada segundo", icon: "⚡" },
            { title: "IA Avançada", desc: "Tradução de notícias em linguagem simples", icon: "🧠" },
            { title: "Conformidade Total", desc: "Seguindo regulamentações brasileiras", icon: "✅" }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { type: "spring", stiffness: 100, damping: 15 }
                }
              }}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 cursor-pointer group"
            >
              <motion.div 
                className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {item.icon}
              </motion.div>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</p>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}