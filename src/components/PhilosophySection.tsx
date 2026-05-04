"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function PhilosophySection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect for the video
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  const benefits = [
    {
      number: "01",
      title: "Escolha seu espaço",
      description: "Cada avanço significativo começa na interseção entre estratégia disciplinada e visão criativa notável. Operamos nesse cruzamento, transformando pensamento ousado em resultados tangíveis.",
      color: "blue",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      number: "02",
      title: "Shape o futuro",
      description: "Acreditamos que o melhor trabalho emerge quando curiosidade encontra convicção. Nosso processo é projetado para descobrir oportunidades ocultas e traduzi-las em experiências que ressoam.",
      color: "purple",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      title: "Decisões inteligentes",
      description: "Use análises, gráficos e projeções para tomar decisões informadas. Exporte relatórios e acompanhe seu progresso com ferramentas poderosas.",
      color: "green",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section ref={containerRef} className="bg-white py-24 md:py-32 px-6 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-gradient-to-tl from-purple-100 to-transparent rounded-full blur-3xl opacity-50" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <motion.p 
            className="text-blue-600 text-sm font-semibold tracking-wider uppercase mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Nossa Filosofia
          </motion.p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 font-bold tracking-tight">
            <span className="text-gray-300">Innovation</span>{' '}
            <motion.span 
              className="text-blue-500"
              animate={{ 
                scale: [1, 1.05, 1],
                textShadow: ["0 0 0 rgba(59,130,246,0)", "0 0 20px rgba(59,130,246,0.5)", "0 0 0 rgba(59,130,246,0)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >×</motion.span>{' '}
            <span className="text-gray-300">Vision</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Video with parallax */}
          <motion.div
            style={{ y, opacity: videoOpacity }}
            initial={{ opacity: 0, x: -80, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
            className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl"
          >
            <video
              className="w-full h-full object-cover"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            >
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <p className="text-white/90 text-sm font-medium">Plataforma DYInvest</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Benefits with staggered animation */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
            }}
          >
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: 50, scale: 0.95 },
                  visible: { 
                    opacity: 1, 
                    x: 0, 
                    scale: 1,
                    transition: { type: "spring", stiffness: 80, damping: 20 }
                  }
                }}
                whileHover={{ 
                  x: 10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="relative p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100/50 transition-all cursor-pointer group"
              >
                {/* Number badge with gradient */}
                <motion.div
                  className={`absolute -top-3 -left-3 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg`}
                  style={{
                    background: `linear-gradient(135deg, ${
                      benefit.color === 'blue' ? '#3B82F6' : 
                      benefit.color === 'purple' ? '#A855F7' : '#10B981'
                    }, ${
                      benefit.color === 'blue' ? '#6366F1' : 
                      benefit.color === 'purple' ? '#EC4899' : '#059669'
                    })`
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="text-white">{benefit.number}</span>
                </motion.div>

                <div className="flex items-start gap-4 pt-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {benefit.description}
                    </p>
                  </div>
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}
                    style={{
                      background: `linear-gradient(135deg, ${
                        benefit.color === 'blue' ? '#3B82F6' : 
                        benefit.color === 'purple' ? '#A855F7' : '#10B981'
                      }, ${
                        benefit.color === 'blue' ? '#6366F1' : 
                        benefit.color === 'purple' ? '#EC4899' : '#059669'
                      })`
                    }}
                  >
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats section with gradient border */}
        <motion.div
          className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"
            animate={{ 
              backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] 
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: "200% auto" }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
            {[
              { value: "R$ 2.5B+", label: "Volume analisado", color: "blue" },
              { value: "15min", label: "Tempo médio de análise", color: "purple" },
              { value: "98%", label: "Satisfação dos usuários", color: "green" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <motion.p 
                  className={`text-3xl md:text-4xl font-bold ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'purple' ? 'text-purple-600' : 'text-green-600'
                  } mb-2`}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}