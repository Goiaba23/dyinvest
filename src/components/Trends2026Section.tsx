"use client";

import { motion, type Variants } from "framer-motion";

const trends2026 = {
  webDesign: [
    { title: "Proprietary Effects", desc: "Custom visual systems that feel distinctly yours" },
    { title: "Art + Advanced UI", desc: "Handmade aesthetic meeting modern functionality" },
    { title: "Minimalism in Copy", desc: "Saying less becomes the differentiator" },
    { title: "Explosion of Color", desc: "Y2K nostalgia, retro patterns, dopamine design" },
    { title: "Dynamic Typography", desc: "Text as storytelling, not just content" },
    { title: "Guided Scrolling", desc: "Progress indicators as navigation tool" },
  ],
  uiAnimation: [
    { title: "Motion as Language", desc: "Motion communicates state, guides attention" },
    { title: "Motion Systems", desc: "Entire user journeys with cohesive transitions" },
    { title: "Kinetic Type", desc: "Text that animates, morphs, responds" },
    { title: "Interactive 3D", desc: "WebGL as functional interface tools" },
    { title: "Gesture-Based", desc: "Swipes replace visible controls" },
    { title: "Multimodal", desc: "Touch, voice, gestures combined" },
  ],
  typography: [
    { title: "Variable Fonts", desc: "One file replaces 6-8 static files" },
    { title: "Fluid Typography", desc: "clamp() eliminates breakpoints" },
    { title: "Dark Mode Rules", desc: "Reduce weight, avoid pure contrast" },
    { title: "WCAG 4.5:1", desc: "Accessibility as standard" },
    { title: "Hierarchy", desc: "Size + weight + color combined" },
    { title: "Performance", desc: "WOFF2, subset, limited weights" },
  ],
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function TrendCard({ title, desc, index }: { title: string; desc: string; index: number }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 hover:border-[#0d9488]/30"
    >
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#0d9488] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-neutral-400 leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}

export default function Trends2026Section() {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d9488]/5 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-[#0d9488]/10 text-[#0d9488] border border-[#0d9488]/20 mb-6">
            2026 Trends
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Design do Futuro
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            As tendências que estão moldando a próxima geração de interfaces digitais
          </p>
        </motion.div>

        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
              <span className="w-1 h-8 bg-[#0d9488] rounded-full" />
              Web Design
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trends2026.webDesign.map((trend, i) => (
                <TrendCard key={i} {...trend} index={i} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
              <span className="w-1 h-8 bg-[#0d9488] rounded-full" />
              UI & Animation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trends2026.uiAnimation.map((trend, i) => (
                <TrendCard key={i} {...trend} index={i + 6} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
              <span className="w-1 h-8 bg-[#0d9488] rounded-full" />
              Typography & Color
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trends2026.typography.map((trend, i) => (
                <TrendCard key={i} {...trend} index={i + 12} />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-neutral-500">
            Baseado em pesquisas de Webflow, Figma, Midrocket, Pixelmatters e The Crit • 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}