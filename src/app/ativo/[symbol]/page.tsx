"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { 
  LineChartComponent, BarChartComponent, AreaChartComponent, PieChartComponent, SparklineChart 
} from "@/components/ui/charts";
import { 
  ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, BarChart3, 
  PieChart, Activity, Globe, Building2, Calendar, Percent, 
  Layers, Shield, Zap, Bookmark, Share2, RefreshCw
} from "lucide-react";

interface AssetDetail {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: string;
  marketCap: string;
  pl: number;
  pvp: number;
  dy: number;
  roe: number;
  beta: number;
  vpa: number;
  lpa: number;
  debtToEquity: number;
  dividendYield12m: number;
  recommendation: 'compra forte' | 'compra' | 'neutra' | 'venda';
}

const asset: AssetDetail = {
  symbol: "PETR4",
  name: "Petróleo Brasileiro S.A. - Petrobras PN",
  sector: "Energia",
  price: 38.45,
  change: 0.47,
  changePercent: 1.24,
  open: 37.98,
  high: 38.90,
  low: 37.85,
  volume: "45.2M",
  marketCap: "R$ 510B",
  pl: 8.5,
  pvp: 1.2,
  dy: 12.5,
  roe: 15.2,
  beta: 1.12,
  vpa: 32.04,
  lpa: 4.53,
  debtToEquity: 0.45,
  dividendYield12m: 14.2,
  recommendation: 'compra forte',
};

const priceHistory = [
  { date: "09:30", price: 37.80 },
  { date: "10:00", price: 37.95 },
  { date: "10:30", price: 38.10 },
  { date: "11:00", price: 38.25 },
  { date: "11:30", price: 38.05 },
  { date: "12:00", price: 38.45 },
  { date: "12:30", price: 38.60 },
  { date: "13:00", price: 38.45 },
  { date: "13:30", price: 38.70 },
  { date: "14:00", price: 38.45 },
];

const volumeData = [
  { time: "09:30", volume: 4.2 },
  { time: "10:00", volume: 5.8 },
  { time: "10:30", volume: 7.1 },
  { time: "11:00", volume: 6.3 },
  { time: "11:30", volume: 5.9 },
  { time: "12:00", volume: 8.2 },
  { time: "12:30", volume: 7.5 },
  { time: "13:00", volume: 6.8 },
  { time: "13:30", volume: 5.4 },
  { time: "14:00", volume: 4.5 },
];

const fundamentalsData = [
  { name: "P/L", value: 8.5, benchmark: 12.0 },
  { name: "P/VP", value: 1.2, benchmark: 1.5 },
  { name: "DY", value: 12.5, benchmark: 6.0 },
  { name: "ROE", value: 15.2, benchmark: 14.0 },
  { name: "Beta", value: 1.12, benchmark: 1.0 },
];

const peerComparison = [
  { symbol: "PETR4", price: 38.45, change: 1.24, pe: 8.5, dy: 12.5 },
  { symbol: "PETR3", price: 42.10, change: 1.45, pe: 8.8, dy: 11.8 },
  { symbol: "CSAN3", price: 18.25, change: -0.85, pe: 12.5, dy: 8.2 },
  { symbol: "UGPA3", price: 22.40, change: 0.65, pe: 9.2, dy: 10.5 },
];

const recommendationColors = {
  'compra forte': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'compra': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  'neutra': { bg: 'bg-zinc-800/50', text: 'text-zinc-400', border: 'border-zinc-700' },
  'venda': { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
};

export default function AtivoDetailPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePeriod, setActivePeriod] = useState("1D");
  const [activeChart, setActiveChart] = useState("price");
  const [isSaved, setIsSaved] = useState(false);
  const periods = ["1D", "1W", "1M", "3M", "6M", "1Y", "ALL"];
  const chartTypes = ["price", "volume", "fundamentals"];

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".asset-header", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out"
        });
        
        gsap.from(".price-card", {
          y: 15,
          opacity: 0,
          duration: 0.4,
          delay: 0.2,
          ease: "power2.out"
        });
        
        gsap.from(".detail-card", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.3,
          ease: "power2.out"
        });
        
        gsap.from(".tab-button", {
          scale: 0.95,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          delay: 0.4,
          ease: "power2.out"
        });
      }, containerRef);
      
      return () => ctx.revert();
    }
  }, []);

  const isPositive = asset.changePercent > 0;

  return (
    <div ref={containerRef} className="p-6 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="asset-header flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Building2 className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-3xl text-white">{asset.symbol}</h1>
                <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg font-label-sm text-label-sm uppercase tracking-wider">
                  B3
                </span>
                <span className={`px-2.5 py-1 rounded-lg font-label-sm text-label-sm uppercase tracking-wider border ${
                  recommendationColors[asset.recommendation].bg + ' ' + recommendationColors[asset.recommendation].text + ' ' + recommendationColors[asset.recommendation].border
                }`}>
                  {asset.recommendation}
                </span>
              </div>
              <p className="text-zinc-400 font-label-sm text-label-sm mt-1">{asset.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Globe className="w-3.5 h-3.5" />
              {asset.sector}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Calendar className="w-3.5 h-3.5" />
              Última atualização: Hoje, 14:32 BRT
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-baseline gap-3 justify-end">
            <span className="font-mono text-4xl font-semibold text-white">
              R$ {asset.price.toFixed(2)}
            </span>
          </div>
          <div className={`flex items-center gap-2 justify-end mt-1 ${
            isPositive ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span className="font-mono font-medium">
              {isPositive ? '+' : ''}{asset.changePercent}%
            </span>
            <span className="text-zinc-500 text-sm">
              (R$ {isPositive ? '+' : ''}{asset.change.toFixed(2)})
            </span>
          </div>
        </div>
      </div>

      {/* Price Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="price-card bg-[#121216] border border-[#252529] rounded-2xl p-4 hover:border-zinc-700 transition-all duration-200">
          <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium block mb-1">Abertura</span>
          <span className="text-white font-mono font-medium">R$ {asset.open.toFixed(2)}</span>
        </div>
        <div className="price-card bg-[#121216] border border-[#252529] rounded-2xl p-4 hover:border-zinc-700 transition-all duration-200">
          <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium block mb-1">Máxima</span>
          <span className="text-emerald-400 font-mono font-medium">R$ {asset.high.toFixed(2)}</span>
        </div>
        <div className="price-card bg-[#121216] border border-[#252529] rounded-2xl p-4 hover:border-zinc-700 transition-all duration-200">
          <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium block mb-1">Mínima</span>
          <span className="text-red-400 font-mono font-medium">R$ {asset.low.toFixed(2)}</span>
        </div>
        <div className="price-card bg-[#121216] border border-[#252529] rounded-2xl p-4 hover:border-zinc-700 transition-all duration-200">
          <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium block mb-1">Volume</span>
          <span className="text-white font-mono font-medium">{asset.volume}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button className="tab-button px-4 py-2.5 text-sm font-medium bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-600/30 transition-all duration-200 flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Análise IA
        </button>
        <button 
          onClick={() => setIsSaved(!isSaved)}
          className={`tab-button px-4 py-2.5 text-sm font-medium rounded-xl border transition-all duration-200 flex items-center gap-2 ${
            isSaved 
              ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
              : 'bg-[#121216] text-zinc-300 border-[#252529] hover:bg-[#1E1E1E] hover:border-zinc-700'
          }`}
        >
          <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
          {isSaved ? 'Salvo' : 'Salvar'}
        </button>
        <button className="tab-button px-4 py-2.5 text-sm font-medium bg-[#121216] text-zinc-300 border border-[#252529] rounded-xl hover:bg-[#1E1E1E] hover:border-zinc-700 transition-all duration-200 flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Compartilhar
        </button>
        <button className="tab-button px-4 py-2.5 text-sm font-medium bg-[#121216] text-zinc-300 border border-[#252529] rounded-xl hover:bg-[#1E1E1E] hover:border-zinc-700 transition-all duration-200 flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Atualizar
        </button>
      </div>

      {/* Chart Section */}
      <div className="detail-card bg-[#121216] border border-[#252529] rounded-2xl p-6 hover:border-zinc-700 transition-all duration-200 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="font-display text-xl text-white mb-1">
              {activeChart === 'price' ? 'Gráfico de Preço' : activeChart === 'volume' ? 'Volume de Negociação' : 'Indicadores Fundamentalistas'}
            </h2>
            <p className="text-zinc-500 text-sm">Dados em tempo real</p>
          </div>
          <div className="flex gap-3">
            <div className="flex gap-1 bg-[#0a0a0c] p-1 rounded-xl">
              {chartTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveChart(type)}
                  className={`tab-button px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                    activeChart === type 
                      ? "bg-blue-500/20 text-blue-400" 
                      : "text-zinc-400 hover:text-white hover:bg-[#252529]"
                  }`}
                >
                  {type === 'price' ? 'Preço' : type === 'volume' ? 'Volume' : 'Fundamentos'}
                </button>
              ))}
            </div>
            <div className="flex gap-1 bg-[#0a0a0c] p-1 rounded-xl">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => setActivePeriod(period)}
                  className={`tab-button px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                    activePeriod === period 
                      ? "bg-blue-500/20 text-blue-400" 
                      : "text-zinc-400 hover:text-white hover:bg-[#252529]"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="h-72">
          {activeChart === 'price' && <LineChartComponent data={priceHistory} dataKey="price" />}
          {activeChart === 'volume' && <BarChartComponent data={volumeData} dataKey="volume" />}
          {activeChart === 'fundamentals' && <BarChartComponent data={fundamentalsData} dataKey="value" />}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Fundamental Data */}
        <div className="lg:col-span-2 detail-card">
          <div className="bg-[#121216] border border-[#252529] rounded-2xl p-6 hover:border-zinc-700 transition-all duration-200">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Activity className="w-4 h-4 text-blue-400" />
              </div>
              <h3 className="text-white font-medium">Indicadores Fundamentalistas</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'P/L', value: asset.pl, benchmark: 12.0, format: '' },
                { label: 'P/VP', value: asset.pvp, benchmark: 1.5, format: '' },
                { label: 'DY %', value: asset.dy, benchmark: 6.0, format: '%' },
                { label: 'ROE %', value: asset.roe, benchmark: 14.0, format: '%' },
                { label: 'Beta', value: asset.beta, benchmark: 1.0, format: '' },
                { label: 'VPA', value: asset.vpa, benchmark: 0, format: 'R$ ' },
                { label: 'LPA', value: asset.lpa, benchmark: 0, format: 'R$ ' },
                { label: 'D/E', value: asset.debtToEquity, benchmark: 0.5, format: '' },
                { label: 'DY 12M', value: asset.dividendYield12m, benchmark: 6.0, format: '%' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-[#0a0a0c] border border-[#252529] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">{item.label}</span>
                    {item.benchmark > 0 && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                        item.value > item.benchmark 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : 'bg-red-500/10 text-red-400'
                      }`}>
                        {item.value > item.benchmark ? 'Acima' : 'Abaixo'} mÉdia
                      </span>
                    )}
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {item.format === 'R$ ' ? 'R$ ' : ''}{item.value}{item.format === '%' ? '%' : ''}
                  </div>
                  {item.benchmark > 0 && (
                    <div className="text-[10px] text-zinc-600 mt-1">
                      Média setorial: {item.benchmark}{item.format}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Peer Comparison */}
        <div className="detail-card">
          <div className="bg-[#121216] border border-[#252529] rounded-2xl p-6 hover:border-zinc-700 transition-all duration-200">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Layers className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="text-white font-medium">Comparação</h3>
            </div>
            <div className="space-y-3">
              {peerComparison.map((peer, idx) => (
                <div key={idx} className={`p-3 rounded-xl transition-all duration-200 ${
                  peer.symbol === asset.symbol ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-[#0a0a0c] border border-[#252529] hover:border-zinc-700'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium ${peer.symbol === asset.symbol ? 'text-blue-400' : 'text-white'}`}>
                      {peer.symbol}
                    </span>
                    <span className={`text-sm font-mono ${peer.change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {peer.change > 0 ? '+' : ''}{peer.change}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span>R$ {peer.price.toFixed(2)}</span>
                    <span>P/L: {peer.pe}</span>
                    <span>DY: {peer.dy}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sparkline Section */}
      <div className="detail-card bg-[#121216] border border-[#252529] rounded-2xl p-6 hover:border-zinc-700 transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-medium">Desempenho Histórico</h3>
          <span className="text-xs text-zinc-500">Últimos 30 dias</span>
        </div>
        <div className="h-20">
          <SparklineChart 
            data={Array.from({ length: 30 }, () => 35 + Math.random() * 10)} 
            positive={true}
            color="#3b82f6"
          />
        </div>
      </div>
    </div>
  );
}
