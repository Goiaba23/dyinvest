"use client";

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, TrendingUp, Brain, Shield, Zap, Globe, Star, ArrowRight, BadgeCheck, CheckCircle } from 'lucide-react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Conversion psychology features
  const features = [
    { 
      icon: Brain, 
      title: "IA que entende você", 
      description: "Traduzimos notícias complexas de Wall Street para linguagem simples. Sem jargões financeiros.",
      color: "teal",
      benefit: "Entenda sem saber financeira"
    },
    { 
      icon: TrendingUp, 
      title: "Probabilidades Reais", 
      description: "Não damos opiniões - apresentamos chances baseadas em dados reais do mercado brasileiro.",
      color: "emerald",
      benefit: "Decisões baseadas em dados"
    },
    { 
      icon: Globe, 
      title: "Mercado Global", 
      description: "Acompanhe 500+ ativos entre ações, FIIs, ETFs e criptomoedas em uma única plataforma.",
      color: "violet",
      benefit: "Tudo em um só lugar"
    },
    { 
      icon: Shield, 
      title: "Dados Confiáveis", 
      description: "Fontes verificadas com citações claras. Sabemos exatamente de onde vem cada informação.",
      color: "amber",
      benefit: "Informação confiável"
    },
    { 
      icon: Zap, 
      title: "Tempo Real", 
      description: "Mercado abre? Já estamos analisando. Dados frescos direto da fonte, 24/7.",
      color: "orange",
      benefit: "Sempre atualizado"
    },
    { 
      icon: CheckCircle2, 
      title: "Para Todos", 
      description: "Criado para investidores leigos que querem entender o mercado sem complicações.",
      color: "indigo",
      benefit: "Sem complexidade"
    },
  ];

  // Social proof / trust stats
  const stats = [
    { value: "50K+", label: "Investidores Ativos", gradient: "from-teal-600 to-emerald-600", sub: "+25% este mês" },
    { value: "500+", label: "Ativos Monitorados", gradient: "from-emerald-500 to-green-600", sub: "Em tempo real" },
    { value: "40+", label: "Fontes de Dados", gradient: "from-violet-500 to-purple-500", sub: "Verificadas" },
    { value: "99.9%", label: "Disponibilidade", gradient: "from-amber-500 to-orange-500", sub: " uptime" },
  ];

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
      <motion.div 
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-50/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-50/50 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        {/* Social Proof Section - Psychology of Trust */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.div 
            variants={itemVariants}
            className="text-center mb-8"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-200 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <BadgeCheck className="w-4 h-4 text-amber-600" />
              <span className="text-amber-700 text-sm font-medium">Escolha Nº 1 dos investidores brasileiros</span>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              >
                <motion.div 
                  className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}
                  animate={{ 
                    backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] 
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                  style={{ backgroundSize: "200% auto" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                <motion.div 
                  className="text-xs text-emerald-600 mt-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  {stat.sub}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-16"
        >
          <motion.p 
            className="text-teal-700 text-sm font-semibold tracking-wider uppercase mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Por que escolher o DYInvest
          </motion.p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 font-bold tracking-tight">
            Tecnologia que <span className="text-teal-700">simplifica</span> seus investimentos
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-6">
            Não ensinamos a investir. Damos ferramentas para você tomar melhores decisões.
          </p>
        </motion.div>

        {/* Features Grid with benefit-focused labels */}
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
              className={`group p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-teal-200 transition-all duration-300 cursor-default relative overflow-hidden backdrop-blur-sm`}
            >
              {/* Benefit tag - Conversion psychology */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="absolute top-4 right-4"
              >
                <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {feature.benefit}
                </span>
              </motion.div>
              
              <motion.div 
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                style={{
                  backgroundColor: feature.color === 'teal' ? '#F0FDFA' : 
                    feature.color === 'emerald' ? '#ECFDF5' : 
                    feature.color === 'violet' ? '#FAF5FF' : 
                    feature.color === 'amber' ? '#FFFBEB' : 
                    feature.color === 'orange' ? '#FFF7ED' : '#EEF2FF',
                  color: feature.color === 'teal' ? '#0D9488' : 
                    feature.color === 'emerald' ? '#059669' : 
                    feature.color === 'violet' ? '#7C3AED' : 
                    feature.color === 'amber' ? '#D97706' : 
                    feature.color === 'orange' ? '#EA580C' : '#4F46E5'
                }}
              >
                <feature.icon className="w-7 h-7" />
              </motion.div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>

              {/* Arrow indicator */}
              <motion.div
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="w-5 h-5 text-teal-600" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust section with logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 text-sm mb-6">Reconhecido por instituições líderes</p>
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-8"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {['B3', 'CVM', 'Bacen', 'Sebrae', 'Anbima'].map((brand, i) => (
              <motion.span 
                key={i}
                whileHover={{ scale: 1.1, opacity: 1, color: "#0D9488" }}
                className="text-gray-400 font-bold text-xl cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {brand}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA with urgency - Conversion psychology */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Comece hoje mesmo</h3>
          <p className="text-gray-600 mb-6">É gratuito. Sem compromisso. Sem cartão de crédito.</p>
          <motion.button
            className="px-10 py-4 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold text-lg shadow-xl shadow-teal-600/20"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(13,148,136,0.3)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Criar conta gratuita →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}