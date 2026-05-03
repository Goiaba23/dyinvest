"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { SectionHeader, PremiumCard, Badge } from "@/components/ui/premium";
import { fadeInUp, slideInLeft } from "@/lib/animations";
import { BarChartComponent, ScatterPlotComponent } from "@/components/ui/charts";
import { Brain, Users, TrendingUp, Shield, AlertTriangle, ArrowRight } from "lucide-react";

const analysts = [
  { name: "Analista Técnico", icon: TrendingUp, sentiment: "bullish", confidence: 85, color: "#3b82f6" },
  { name: "Analista Fundamental", icon: Shield, sentiment: "neutral", confidence: 72, color: "#a855f7" },
  { name: "Analista de Sentimento", icon: Users, sentiment: "bullish", confidence: 78, color: "#22c55e" },
  { name: "Analista Macro", icon: AlertTriangle, sentiment: "bearish", confidence: 65, color: "#ef4444" },
];

const consensusData = [
  { name: "PETR4", analyst1: 85, analyst2: 72, analyst3: 78, analyst4: 65, consensus: 75 },
  { name: "VALE3", analyst1: 45, analyst2: 68, analyst3: 55, analyst4: 70, consensus: 60 },
  { name: "ITUB4", analyst1: 90, analyst2: 85, analyst3: 88, analyst4: 75, consensus: 84 },
  { name: "WEGE3", analyst1: 95, analyst2: 80, analyst3: 92, analyst4: 70, consensus: 84 },
];

const scatterData = [
  { name: "PETR4", pl: 8.5, dy: 12.5 },
  { name: "VALE3", pl: 7.2, dy: 11.2 },
  { name: "ITUB4", pl: 12.5, dy: 5.2 },
  { name: "WEGE3", pl: 18.2, dy: 2.1 },
  { name: "BBDC4", pl: 15.3, dy: 6.8 },
  { name: "BBAS3", pl: 11.2, dy: 7.5 },
];

export default function AnalisePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("consensus");

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".page-header", fadeInUp);
        gsap.from(".analyst-card", { ...fadeInUp, stagger: 0.1, delay: 0.2 });
        gsap.from(".tab-button", { ...slideInLeft, stagger: 0.05, delay: 0.3 });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <div ref={containerRef} className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="page-header mb-8">
        <SectionHeader
          title="Análise IA"
          subtitle="Consenso de múltiplos analistas virtuais com inteligência artificial"
          badge="Multi-AI"
        />
      </div>

      {/* Analysts Cards - Primacy Effect with Large Typography */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {analysts.map((analyst) => (
          <div key={analyst.name} className="analyst-card">
            <PremiumCard className="p-5 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center" 
                  style={{ backgroundColor: `${analyst.color}10`, border: `1px solid ${analyst.color}20` }}
                >
                  <analyst.icon className="w-5 h-5" style={{ color: analyst.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-white">{analyst.name}</h3>
                  <Badge 
                    variant={
                      analyst.sentiment === "bullish" ? "green" : 
                      analyst.sentiment === "bearish" ? "red" : "blue"
                    } 
                    size="sm"
                  >
                    {analyst.sentiment}
                  </Badge>
                </div>
              </div>
              
              {/* Large Typography for Key Metric (Primacy Effect) */}
              <div className="mb-3">
                <span className="text-zinc-500 text-xs uppercase tracking-wider">Confiança</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-mono text-3xl font-bold text-white">{analyst.confidence}</span>
                  <span className="text-zinc-500 text-sm">%</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="h-1.5 bg-[#252529] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{ width: `${analyst.confidence}%`, backgroundColor: analyst.color }}
                ></div>
              </div>
            </PremiumCard>
          </div>
        ))}
      </div>

      {/* Tabs - Progressive Disclosure */}
      <div className="flex gap-1 mb-6 bg-[#121216] p-1 rounded-xl border border-[#252529] w-fit">
        {[
          { id: "consensus", label: "Consenso" },
          { id: "scatter", label: "P/L vs DY" },
          { id: "news", label: "Notícias IA" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button px-4 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-blue-500/20 text-blue-400 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-[#252529]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Consensus Chart */}
      {activeTab === "consensus" && (
        <PremiumCard className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-5 h-5 text-blue-400" />
            <h3 className="text-zinc-400 text-xs uppercase tracking-wider font-medium">Probabilidade de Alta por Ativo</h3>
          </div>
          <BarChartComponent data={consensusData} />
        </PremiumCard>
      )}

      {/* Scatter Plot */}
      {activeTab === "scatter" && (
        <PremiumCard className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="text-zinc-400 text-xs uppercase tracking-wider font-medium">Value vs Yield (P/L vs DY)</h3>
          </div>
          <ScatterPlotComponent data={scatterData} />
        </PremiumCard>
      )}

      {/* AI News */}
      {activeTab === "news" && (
        <PremiumCard className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-5 h-5 text-blue-400" />
            <h3 className="text-zinc-400 text-xs uppercase tracking-wider font-medium">Crawl4AI Analysis</h3>
          </div>
          <div className="space-y-4">
            {[
              { title: "Petrobras: Produção recorde impulsiona dividendos", impact: "high", sentiment: "bullish", assets: ["PETR4"], confidence: 92 },
              { title: "Vale: China reduz importação de minério", impact: "medium", sentiment: "bearish", assets: ["VALE3"], confidence: 78 },
              { title: "Setor Bancário: Margens protegidas com Selic alta", impact: "medium", sentiment: "bullish", assets: ["ITUB4", "BBDC4"], confidence: 85 },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-[#0a0a0c] border border-[#252529] rounded-lg hover:border-blue-500/20 transition-all duration-200">
                <div className="flex justify-between items-start mb-3">
                  <Badge 
                    variant={
                      item.sentiment === "bullish" ? "green" : 
                      item.sentiment === "bearish" ? "red" : "blue"
                    }
                  >
                    {item.sentiment}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500 font-mono">Confidence:</span>
                    <span className="font-mono text-sm text-white">{item.confidence}%</span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-white mb-3">{item.title}</h4>
                <div className="flex gap-2">
                  {item.assets.map((asset) => (
                    <Badge key={asset} variant="blue" size="sm">{asset}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PremiumCard>
      )}
    </div>
  );
}
