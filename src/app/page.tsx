"use client";

import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import FeaturedVideoSection from '@/components/FeaturedVideoSection';
import PhilosophySection from '@/components/PhilosophySection';
import ServicesSection from '@/components/ServicesSection';
import CTASection from '@/components/CTASection';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <ScrollProgress />
      <HeroSection />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
      <CTASection />
    </div>
  );
}