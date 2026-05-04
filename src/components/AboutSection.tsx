"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, TrendingUp, Brain, Shield, Zap, Globe } from 'lucide-react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { 
      icon: Brain, 
      title: "IA que entende você", 
      description: "Traduzimos notícias complexas de Wall Street para linguagem simples. Sem jargões financeiros.",
      color: "bg-blue-50 text-blue-600"
    },
    { 
      icon: TrendingUp, 
      title: "Probabilidades Reais", 
      description: "Não damos opiniões - apresentamos chances baseadas em dados reais do mercado brasileiro.",
      color: "bg-green-50 text-green-600"
    },
    { 
      icon: Globe, 
      title: "Mercado Global", 
      description: "Acompanhe 500+ ativos entre ações, FIIs, ETFs e criptomoedas em uma única plataforma.",
      color: "bg-purple-50 text-purple-600"
    },
    { 
      icon: Shield, 
      title: "Dados Confiáveis", 
      description: "Fontes verificadas com citações claras. Sabemos exatamente de onde vem cada informação.",
      color: "bg-orange-50 text-orange-600"
    },
    { 
      icon: Zap, 
      title: "Tempo Real", 
      description: "Mercado abre? Já estamos analisando. Dados frescos direto da fonte, 24/7.",
      color: "bg-yellow-50 text-yellow-600"
    },
    { 
      icon: CheckCircle2, 
      title: "Para Todos", 
      description: "Criado para investidores leigos que querem entender o mercado sem complicações.",
      color: "bg-indigo-50 text-indigo-600"
    },
  ];

  const stats = [
    { value: "50K+", label: "Investidores Ativos", gradient: "from-blue-600 to-indigo-600" },
    { value: "500+", label: "Ativos Monitorados", gradient: "from-green-500 to-emerald-600" },
    { value: "40+", label: "Fontes de Dados", gradient: "from-purple-500 to-pink-500" },
    { value: "99.9%", label: "Disponibilidade", gradient: "from-orange-500 to-red-500" },
  ];

  return (
    <section ref={ref} id="recursos" className="bg-white py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-16"
        >
          <p className="text-blue-600 text-sm font-semibold tracking-wider uppercase mb-4">Sobre Nós</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 font-bold tracking-tight">
            Tecnologia que <span className="text-blue-600">simplifica</span> seus investimentos
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-6">
            Combinamos inteligência artificial avançada com análise de dados em tempo real para empoderar investidores brasileiros.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-sm mb-6">Trusted by thousands of investors</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
            {['B3', 'CVM', 'Bacen', 'Sebrae'].map((brand, i) => (
              <span key={i} className="text-gray-400 font-semibold text-lg">{brand}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}