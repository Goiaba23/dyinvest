"use client";

import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import AIFeaturesSection from '@/components/AIFeaturesSection';
import PricingSection from '@/components/PricingSection';
import FooterSection from '@/components/FooterSection';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  return (
    <div className="bg-[#050505] min-h-screen">
      <ScrollProgress />
      <HeroSection />
      <FeaturesSection />
      <AIFeaturesSection />
      <PricingSection />
      <FooterSection />
    </div>
  );
}