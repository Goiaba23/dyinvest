"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
    tag: 'Strategy',
    title: 'Research & Insight',
    description: 'We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change.',
  },
  {
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
    tag: 'Craft',
    title: 'Design & Execution',
    description: 'From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary.',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-black py-28 md:py-40 px-6 overflow-hidden relative">
      <div className="bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)] absolute inset-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight">What we do</h2>
          <p className="text-white/40 text-sm hidden md:block">Our services</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="liquid-glass rounded-3xl overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <div className="aspect-video relative overflow-hidden">
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
                <div className="bg-gradient-to-t from-black/40 to-transparent absolute inset-0" />
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white/40 text-xs tracking-widest uppercase">{service.tag}</p>
                  <div className="liquid-glass rounded-full p-2">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}