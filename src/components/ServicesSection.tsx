"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Brain, BarChart3, Shield, Zap, Star } from 'lucide-react';

const services = [
  {
    videoUrl: 'https://cdn.pixabay.com/video/2020/08/21/46330-448549101_large.mp4',
    tag: 'Inteligência',
    title: 'Análise com IA',
    description: 'Processamos milhares de notícias e dados de mercado em tempo real. Nossa IA traduz informações complexas em insights acionáveis.',
    icon: Brain,
    gradient: 'from-teal-600 to-cyan-600',
  },
  {
    videoUrl: 'https://cdn.pixabay.com/video/2021/12/15/97877-651562019_large.mp4',
    tag: 'Dados',
    title: 'Probabilidades Reais',
    description: 'Não damos opiniões - apresentamos probabilidades baseadas em dados. Acompanhe 500+ ativos com análise em tempo real.',
    icon: BarChart3,
    gradient: 'from-violet-600 to-purple-600',
  },
  {
    videoUrl: 'https://cdn.pixabay.com/video/2023/01/26/145825-795795335_large.mp4',
    tag: 'Segurança',
    title: 'Dados Confiáveis',
    description: 'Fontes verificadas com citações claras. Conformidade total com regulamentações brasileiras.',
    icon: Shield,
    gradient: 'from-emerald-600 to-green-600',
  },
  {
    videoUrl: 'https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4',
    tag: 'Velocidade',
    title: 'Tempo Real',
    description: 'Mercado abre? Já estamos analisando. Dados frescos direto da fonte, 24/7.',
    icon: Zap,
    gradient: 'from-amber-600 to-orange-600',
  },
];

const testimonials = [
  {
    name: "Ricardo M.",
    role: "Investidor de Dividendos",
    text: "Finalmente uma ferramenta que traduz o mercado financeiro para quem não é expert. A IA explica tudo em linguagem simples.",
    avatar: "RM",
    rating: 5
  },
  {
    name: "Ana Paula S.",
    role: "Investidora Iniciante",
    text: "Comecei a investir há 3 meses e o DYInvest me ajuda a entender as notícias que antes eu não compreendia.",
    avatar: "AP",
    rating: 5
  },
  {
    name: "Carlos E.",
    role: "Trader",
    text: "A análise em tempo real e as probabilidades baseadas em dados reais mudaram minha forma de operar no mercado.",
    avatar: "CE",
    rating: 5
  }
];

export default function ServicesSection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="depoimentos" ref={containerRef} className="bg-gray-50 py-24 md:py-32 px-6 overflow-hidden relative">
      {/* Animated background - Wexion style */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-100/30 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section header with stagger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16"
        >
          <div>
            <motion.p 
              className="text-teal-700 text-sm font-semibold tracking-wider uppercase mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Serviços
            </motion.p>
            <h2 className="text-4xl md:text-5xl text-gray-900 font-bold tracking-tight">
              O que <span className="text-teal-700">oferecemos</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm mt-4 md:mt-0 max-w-xs">
            Tecnologia de ponta para investimentos inteligentes
          </p>
        </motion.div>

        {/* Services Grid with glassmorphism and hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 80,
                damping: 20
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg shadow-gray-100/50 cursor-pointer border border-gray-100"
            >
              {/* Video container with overlay */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <motion.video
                  className="w-full h-full object-cover"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7 }}
                >
                  <source src={service.videoUrl} type="video/mp4" />
                </motion.video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                
                {/* Tag with glassmorphism */}
                <motion.div 
                  className="absolute top-4 left-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className={`px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md ${service.gradient} text-white text-xs font-medium shadow-lg border border-white/20`}>
                    {service.tag}
                  </span>
                </motion.div>

                {/* Shimmer effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>

              <div className="p-6 md:p-8 bg-white/90 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                  </div>
                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 10,
                      boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
                
                <motion.a
                  href="#"
                  className="flex items-center gap-2 text-teal-700 text-sm font-medium group-hover:gap-3 transition-all"
                  whileHover={{ x: 5 }}
                >
                  Learn more
                  <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials with glassmorphism cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.p 
            className="text-center text-gray-400 text-sm mb-10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            O que dizem sobre nós
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, rotate: i === 1 ? 2 : i === 2 ? -2 : 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4 + i * 0.15,
                  type: "spring",
                  stiffness: 80
                }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                  rotate: 0
                }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 cursor-pointer group"
              >
                {/* Rating stars with stagger */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: 0.5 + i * 0.1 + j * 0.05,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed text-sm">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA with premium animation - Wexion style */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-500 text-sm mb-6">Pronto para investir com inteligência?</p>
          <motion.button
            className="px-12 py-5 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold text-base shadow-2xl shadow-teal-600/20"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 60px rgba(13,148,136,0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            animate={{ 
              boxShadow: [
                "0 10px 30px rgba(13,148,136,0.2)",
                "0 20px 40px rgba(13,148,136,0.3)",
                "0 10px 30px rgba(13,148,136,0.2)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Começar Gratuitamente
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}