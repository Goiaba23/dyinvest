"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight, Brain, BarChart3, Shield, Zap, Globe, Users, FileText } from 'lucide-react';

const services = [
  {
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
    tag: 'Inteligência',
    title: 'Análise com IA',
    description: 'Processamos milhares de notícias e dados de mercado em tempo real. Nossa IA traduz informações complexas em insights acionáveis.',
    icon: Brain,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
    tag: 'Dados',
    title: 'Probabilidades Reais',
    description: 'Não damos opiniões - apresentamos probabilidades baseadas em dados. Acompanhe 500+ ativos com análise em tempo real.',
    icon: BarChart3,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4',
    tag: 'Segurança',
    title: 'Dados Confiáveis',
    description: 'Fontes verificadas com citações claras. Conformidade total com regulamentações brasileiras.',
    icon: Shield,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4',
    tag: 'Velocidade',
    title: 'Tempo Real',
    description: 'Mercado abre? Já estamos analisando. Dados frescos direto da fonte, 24/7.',
    icon: Zap,
    gradient: 'from-orange-500 to-red-500',
  },
];

const testimonials = [
  {
    name: "Ricardo M.",
    role: "Investidor de Dividendos",
    text: "Finalmente uma ferramenta que traduz o mercado financeiro para quem não é expert. A IA explica tudo em linguagem simples.",
    avatar: "RM"
  },
  {
    name: "Ana Paula S.",
    role: "Investidora Iniciante",
    text: "Comecei a investir há 3 meses e o DYInvest me ajuda a entender as notícias que antes eu não compreendia.",
    avatar: "AP"
  },
  {
    name: "Carlos E.",
    role: "Trader",
    text: "A análise em tempo real e as probabilidades baseadas em dados reais mudaram minha forma de operar no mercado.",
    avatar: "CE"
  }
];

export default function ServicesSection() {
  return (
    <section id="depoimentos" className="bg-gray-50 py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="text-blue-600 text-sm font-semibold tracking-wider uppercase mb-4">Serviços</p>
            <h2 className="text-4xl md:text-5xl text-gray-900 font-bold tracking-tight">
              O que <span className="text-blue-600">oferecemos</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm mt-4 md:mt-0 max-w-xs">
            Tecnologia de ponta para investimentos inteligentes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative rounded-3xl overflow-hidden bg-white shadow-lg shadow-gray-100/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <video
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                >
                  <source src={service.videoUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${service.gradient} text-white text-xs font-medium`}>
                    {service.tag}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                  </div>
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <service.icon className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
                
                <motion.a
                  href="#"
                  className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:gap-3 transition-all"
                  whileHover={{ x: 5 }}
                >
                  Learn more
                  <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-center text-gray-400 text-sm mb-10">O que dizem sobre nós</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed text-sm">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-gray-500 text-sm mb-6">Pronto para investir com inteligência?</p>
          <motion.button
            className="px-10 py-4 rounded-full bg-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-600/20"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(59,130,246,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Começar Gratuitamente
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}