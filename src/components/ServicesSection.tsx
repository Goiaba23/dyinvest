"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight, Brain, BarChart3, Shield, Zap, Globe } from 'lucide-react';

const services = [
  {
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
    tag: 'Inteligência',
    title: 'Análise com IA',
    description: 'Processamos milhares de notícias e dados de mercado em tempo real. Nossa IA traduz informações complexas em insights acionáveis para suas decisões de investimento.',
    icon: Brain,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
    tag: 'Dados',
    title: 'Probabilidades Reais',
    description: 'Não damos opiniões - apresentamos probabilidades baseadas em dados. Acompanhe 500+ ativos entre ações, FIIs, ETFs e criptomoedas com análise em tempo real.',
    icon: BarChart3,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4',
    tag: 'Segurança',
    title: 'Dados Confiáveis',
    description: 'Fontes verificadas com citações claras. Sabemos exatamente de onde vem cada informação. Conformidade total com regulamentações brasileiras.',
    icon: Shield,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4',
    tag: 'Velocidade',
    title: 'Tempo Real',
    description: 'Mercado abre? Já estamos analisando. Dados frescos direto da fonte, 24/7, atualizados a cada segundo para você nunca perder uma oportunidade.',
    icon: Zap,
    gradient: 'from-orange-500 to-red-500',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-black py-28 md:py-44 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.05)_0%,_transparent_60%)]" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="text-blue-400 text-sm tracking-[0.2em] uppercase mb-4">Serviços</p>
            <h2 className="text-4xl md:text-6xl text-white tracking-tight font-bold">
              O que <span className="text-blue-500">oferecemos</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm mt-4 md:mt-0 max-w-xs">
            Tecnologia de ponta para investimentos inteligentes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative rounded-3xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative aspect-[16/10] overflow-hidden">
                <video
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                >
                  <source src={service.videoUrl} type="video/mp4" />
                </video>
                <div className="bg-gradient-to-t from-black/80 via-black/20 to-transparent absolute inset-0" />
                
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${service.gradient} text-white text-xs font-medium`}>
                    {service.tag}
                  </span>
                </div>
              </div>

              <div className="relative p-6 md:p-8 bg-black/80 backdrop-blur-xl border-t border-white/5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
                  </div>
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <service.icon className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
                
                <motion.button
                  className="flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors mt-4"
                  whileHover={{ x: 5 }}
                >
                  Learn more
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <p className="text-white/40 text-sm mb-6">Junte-se a milhares de investidores que já usam DYInvest</p>
          <motion.button
            className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59,130,246,0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            Começar Gratuitamente
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}