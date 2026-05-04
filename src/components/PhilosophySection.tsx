"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function PhilosophySection() {
  const benefits = [
    {
      number: "01",
      title: "Escolha seu espaço",
      description: "Cada avanço significativo começa na interseção entre estratégia disciplinada e visão criativa notável. Operamos nesse cruzamento, transformando pensamento ousado em resultados tangíveis.",
      color: "blue"
    },
    {
      number: "02",
      title: "Shape o futuro",
      description: "Acreditamos que o melhor trabalho emerge quando curiosidade encontra convicção. Nosso processo é projetado para descobrir oportunidades ocultas e traduzi-las em experiências que ressoam.",
      color: "purple"
    },
    {
      number: "03",
      title: "Decisões inteligentes",
      description: "Use análises, gráficos e projeções para tomar decisões informadas. Exporte relatórios e acompanhe seu progresso com ferramentas poderosas.",
      color: "green"
    }
  ];

  return (
    <section className="bg-white py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-blue-600 text-sm font-semibold tracking-wider uppercase mb-4">Nossa Filosofia</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 font-bold tracking-tight">
            <span className="text-gray-400">Innovation</span>{' '}
            <span className="text-blue-500">×</span>{' '}
            <span className="text-gray-400">Vision</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <motion.div
            className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
              <p className="text-white/80 text-sm">Plataforma DYInvest</p>
            </div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="relative p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                    benefit.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                    benefit.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                    'bg-green-50 text-green-600'
                  }`}>
                    {benefit.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {benefit.description}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: "R$ 2.5B+", label: "Volume analisado" },
              { value: "15min", label: "Tempo médio de análise" },
              { value: "98%", label: "Satisfação dos usuários" }
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}