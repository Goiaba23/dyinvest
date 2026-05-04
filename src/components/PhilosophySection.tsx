"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Sparkles, TrendingUp, Target, Zap } from 'lucide-react';

export default function PhilosophySection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);
  
  // Floating animation variants
  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 3, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const benefits = [
    {
      number: "01",
      title: "Escolha seu espaço",
      description: "Cada avanço significativo começa na interseção entre estratégia disciplinada e visão criativa notável. Operamos nesse cruzamento.",
      color: "teal",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      number: "02",
      title: "Shape o futuro",
      description: "Acreditamos que o melhor trabalho emerge quando curiosidade encontra convicção. Descobrimos oportunidades ocultas.",
      color: "violet",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      number: "03",
      title: "Decisões inteligentes",
      description: "Use análises, gráficos e projeções para tomar decisões informadas. Acompanhe seu progresso com ferramentas poderosas.",
      color: "emerald",
      gradient: "from-emerald-500 to-green-500"
    }
  ];

  return (
    <section ref={containerRef} className="bg-white py-24 md:py-32 px-6 overflow-hidden relative">
      {/* Animated background elements - Obsidianos style */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-teal-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-violet-100/30 rounded-full blur-3xl" />
      
      {/* Floating decorative orbs */}
      <motion.div variants={floatVariants} animate="animate" className="absolute top-40 left-[10%] w-16 h-16 rounded-full bg-gradient-to-br from-teal-400/20 to-emerald-400/20 blur-xl" />
      <motion.div variants={floatVariants} animate="animate" className="absolute top-1/3 right-[15%] w-20 h-20 rounded-full bg-gradient-to-br from-violet-400/20 to-purple-400/20 blur-xl" style={{ animationDelay: "1.5s" }} />
      <motion.div variants={floatVariants} animate="animate" className="absolute bottom-40 left-[20%] w-12 h-12 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-400/20 blur-lg" style={{ animationDelay: "2s" }} />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <motion.p 
            className="text-teal-700 text-sm font-semibold tracking-wider uppercase mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Nossa Filosofia
          </motion.p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 font-bold tracking-tight">
            <span className="text-gray-200">Innovation</span>{' '}
            <motion.span 
              className="text-slate-800 inline-block"
              animate={{ 
                scale: [1, 1.05, 1],
                textShadow: ["0 0 0 rgba(71,85,105,0)", "0 0 30px rgba(71,85,105,0.3)", "0 0 0 rgba(71,85,105,0)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >×</motion.span>{' '}
            <span className="text-gray-200">Vision</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Video with parallax and glow */}
          <motion.div
            style={{ y, opacity: videoOpacity }}
            initial={{ opacity: 0, x: -80, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
            className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl"
          >
            {/* Glow effect behind video */}
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 via-emerald-500/20 to-violet-500/20 rounded-3xl blur-2xl" />
            
            <video
              className="relative rounded-3xl w-full h-full object-cover"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            >
              <source src="https://cdn.pixabay.com/video/2023/07/25/130423-838182041_large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl" />
            <div className="absolute bottom-6 left-6 right-6">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
                <p className="text-white/90 text-sm font-medium">Plataforma DYInvest</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Benefits with enhanced animations */}
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
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                className="relative p-6 rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-100/50 transition-all cursor-pointer group bg-white/80 backdrop-blur-sm"
              >
                {/* Number badge with gradient - Obsidianos style */}
                <motion.div
                  className="absolute -top-3 -left-3 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${
                      benefit.color === 'teal' ? '#0D9488' : 
                      benefit.color === 'violet' ? '#7C3AED' : '#059669'
                    }, ${
                      benefit.color === 'teal' ? '#14B8A6' : 
                      benefit.color === 'violet' ? '#A855F7' : '#10B981'
                    })`
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="text-white">{benefit.number}</span>
                </motion.div>

                <div className="flex items-start gap-4 pt-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors flex items-center gap-2">
                      {benefit.title}
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                      >
                        <ArrowUpRight className="w-4 h-4 text-teal-600" />
                      </motion.span>
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats with glassmorphism - like Wexion template */}
        <motion.div
          className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-50/80 to-teal-50/80 border border-gray-100 relative overflow-hidden backdrop-blur-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-slate-500/5 to-emerald-500/5"
            animate={{ 
              backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] 
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: "200% auto" }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
            {[
              { value: "R$ 2.5B+", label: "Volume analisado", icon: TrendingUp, color: "teal" },
              { value: "15min", label: "Tempo médio de análise", icon: Target, color: "violet" },
              { value: "98%", label: "Satisfação dos usuários", icon: Zap, color: "emerald" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-white/50 border border-gray-100"
              >
                <motion.p 
                  className={`text-3xl md:text-4xl font-bold ${
                    stat.color === 'teal' ? 'text-teal-700' :
                    stat.color === 'violet' ? 'text-violet-700' : 'text-emerald-700'
                  } mb-2`}
                >
                  {stat.value}
                </motion.p>
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                  <stat.icon className={`w-4 h-4 ${
                    stat.color === 'teal' ? 'text-teal-500' :
                    stat.color === 'violet' ? 'text-violet-500' : 'text-emerald-500'
                  }`} />
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}