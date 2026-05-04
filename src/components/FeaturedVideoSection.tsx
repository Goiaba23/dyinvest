"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Play, Sparkles, Zap, Shield, Brain, CheckCircle, Verified } from 'lucide-react';

export default function FeaturedVideoSection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Advanced scroll animations
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);

  // Trust marquee - Conversion psychology
  const marqueeVariants = {
    animate: {
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: 25,
          ease: "linear" as const,
        },
      },
    },
  };

  const trustLogos = [
    { name: 'B3', desc: 'Bolsa Brasileira' },
    { name: 'CVM', desc: 'Regulador' },
    { name: 'Bacen', desc: 'Banco Central' },
    { name: 'Anbima', desc: 'Associação' },
    { name: 'Sebrae', desc: '的支持' },
    { name: 'SPB', desc: 'Financeiro' },
  ];

  const features = [
    { 
      title: "Análise em Tempo Real", 
      desc: "Dados atualizados a cada segundo", 
      icon: Zap, 
      color: "teal",
      benefit: "Nunca perca uma oportunidade"
    },
    { 
      title: "IA Avançada", 
      desc: "Tradução de notícias em linguagem simples", 
      icon: Brain, 
      color: "emerald",
      benefit: "Entenda sem conhecimento prévio"
    },
    { 
      title: "Conformidade Total", 
      desc: "Seguindo regulamentações brasileiras", 
      icon: Shield, 
      color: "violet",
      benefit: "Segurança jurídica garantida"
    }
  ];

  return (
    <section id="como-funciona" ref={containerRef} className="bg-gray-50 py-20 md:py-28 px-6 overflow-hidden relative">
      {/* Animated background */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-200/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-100/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        {/* Trust Marquee - Social Proof */}
        <motion.div 
          className="mb-16 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Verified className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-medium text-sm">Plataforma certificada e autorizada</span>
          </div>
          <motion.div variants={marqueeVariants} animate="animate" className="flex gap-16">
            {[...trustLogos, ...trustLogos, ...trustLogos].map((logo, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 flex flex-col items-center gap-1"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                  <span className="text-gray-700 font-bold text-sm">{logo.name}</span>
                </div>
                <span className="text-gray-400 text-xs">{logo.desc}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Video Section with 3D effect */}
        <motion.div
          className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl shadow-gray-200/50"
          style={{ scale, rotateX: rotate }}
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
              <source src="https://cdn.pixabay.com/video/2022/03/10/109530-692035218_large.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Play button with pulse - attention grabber */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 cursor-pointer"
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(20,184,166,0.4)", 
                    "0 0 0 25px rgba(20,184,166,0)", 
                    "0 0 0 50px rgba(20,184,166,0)",
                    "0 0 0 75px rgba(20,184,166,0)"
                  ] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-12 h-12 text-white ml-1" />
              </motion.div>
            </motion.div>

            {/* Glassmorphism content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row gap-6 items-end">
              <motion.div
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 max-w-lg border border-white/20"
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
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </motion.div>
                  <p className="text-white/80 text-xs tracking-widest uppercase">Nossa Abordagem</p>
                </div>
                <p className="text-white text-base leading-relaxed">
                  Acreditamos no poder da exploração guiada por curiosidade. Cada projeto começa com uma pergunta, e cada resposta abre uma nova porta para a inovação no mercado financeiro.
                </p>
              </motion.div>

              <motion.button
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-sm flex items-center gap-2 shadow-xl"
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
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

        {/* Feature cards with benefit tags */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { 
              transition: { 
                staggerChildren: 0.15,
                delayChildren: 0.3
              } 
            }
          }}
        >
          {features.map((item, i) => (
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
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              className="flex items-center gap-4 p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 cursor-pointer group"
            >
              <motion.div 
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  item.color === 'teal' ? 'bg-teal-50 text-teal-600' :
                  item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                  'bg-violet-50 text-violet-600'
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <item.icon className="w-6 h-6" />
              </motion.div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors">{item.title}</p>
                <p className="text-gray-500 text-sm">{item.desc}</p>
                <div className="flex items-center gap-1 mt-1">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  <span className="text-emerald-600 text-xs">{item.benefit}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}