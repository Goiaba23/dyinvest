"use client";

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, TrendingUp, Brain, Shield, Zap, Globe } from 'lucide-react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // For scroll-linked animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const features = [
    { 
      icon: Brain, 
      title: "IA que entende você", 
      description: "Traduzimos notícias complexas de Wall Street para linguagem simples. Sem jargões financeiros.",
      color: "blue"
    },
    { 
      icon: TrendingUp, 
      title: "Probabilidades Reais", 
      description: "Não damos opiniões - apresentamos chances baseadas em dados reais do mercado brasileiro.",
      color: "green"
    },
    { 
      icon: Globe, 
      title: "Mercado Global", 
      description: "Acompanhe 500+ ativos entre ações, FIIs, ETFs e criptomoedas em uma única plataforma.",
      color: "purple"
    },
    { 
      icon: Shield, 
      title: "Dados Confiáveis", 
      description: "Fontes verificadas com citações claras. Sabemos exatamente de onde vem cada informação.",
      color: "orange"
    },
    { 
      icon: Zap, 
      title: "Tempo Real", 
      description: "Mercado abre? Já estamos analisando. Dados frescos direto da fonte, 24/7.",
      color: "yellow"
    },
    { 
      icon: CheckCircle2, 
      title: "Para Todos", 
      description: "Criado para investidores leigos que querem entender o mercado sem complicações.",
      color: "indigo"
    },
  ];

  const stats = [
    { value: "50K+", label: "Investidores Ativos", gradient: "from-blue-600 to-indigo-600" },
    { value: "500+", label: "Ativos Monitorados", gradient: "from-green-500 to-emerald-600" },
    { value: "40+", label: "Fontes de Dados", gradient: "from-purple-500 to-pink-500" },
    { value: "99.9%", label: "Disponibilidade", gradient: "from-orange-500 to-red-500" },
  ];

  // Stagger variants for grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring" as const, stiffness: 80, damping: 20 }
    }
  };

  return (
    <section ref={ref} id="recursos" className="bg-white py-24 md:py-32 px-6 overflow-hidden relative">
      {/* Background decoration */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        {/* Stats with staggered animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center cursor-default"
            >
              <motion.div 
                className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                animate={{ 
                  backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] 
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                style={{ backgroundSize: "200% auto" }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-16"
        >
          <motion.p 
            className="text-blue-600 text-sm font-semibold tracking-wider uppercase mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Sobre Nós
          </motion.p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 font-bold tracking-tight">
            Tecnologia que <span className="text-blue-600">simplifica</span> seus investimentos
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-6">
            Combinamos inteligência artificial avançada com análise de dados em tempo real para empoderar investidores brasileiros.
          </p>
        </motion.div>

        {/* Features Grid with stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                transition: { type: "spring", stiffness: 300 }
              }}
              className={`group p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white transition-all duration-300 cursor-default relative overflow-hidden`}
            >
              {/* Hover gradient overlay */}
              <motion.div 
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                style={{
                  background: `linear-gradient(135deg, ${feature.color === 'blue' ? 'rgba(59,130,246,0.05)' : feature.color === 'green' ? 'rgba(34,197,94,0.05)' : feature.color === 'purple' ? 'rgba(168,85,247,0.05)' : feature.color === 'orange' ? 'rgba(249,115,22,0.05)' : feature.color === 'yellow' ? 'rgba(234,179,8,0.05)' : 'rgba(99,102,241,0.05)'} 0%, transparent 100%)`
                }}
              />
              
              <motion.div 
                className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                style={{
                  backgroundColor: feature.color === 'blue' ? '#EFF6FF' : 
                    feature.color === 'green' ? '#F0FDF4' : 
                    feature.color === 'purple' ? '#FAF5FF' : 
                    feature.color === 'orange' ? '#FFFBEB' : 
                    feature.color === 'yellow' ? '#FEFCE8' : '#EEF2FF',
                  color: feature.color === 'blue' ? '#2563EB' : 
                    feature.color === 'green' ? '#16A34A' : 
                    feature.color === 'purple' ? '#A855F7' : 
                    feature.color === 'orange' ? '#EA580C' : 
                    feature.color === 'yellow' ? '#CA8A04' : '#4F46E5'
                }}
              >
                <feature.icon className="w-7 h-7" />
              </motion.div>
              
              <h3 className="relative text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="relative text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trusted by section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 text-sm mb-6">Trusted by thousands of investors</p>
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-8 opacity-40"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {['B3', 'CVM', 'Bacen', 'Sebrae'].map((brand, i) => (
              <motion.span 
                key={i}
                whileHover={{ scale: 1.1, opacity: 1 }}
                className="text-gray-400 font-semibold text-lg cursor-pointer"
              >
                {brand}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}