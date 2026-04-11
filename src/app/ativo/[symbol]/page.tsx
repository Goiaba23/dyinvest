"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { 
  ArrowLeft,
  Search,
  TrendingUp,
  TrendingDown,
  BarChart3,
  RefreshCw,
  Building2,
  Home,
  Wallet,
  FileText,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Calculator
} from "lucide-react";
import { ACOES } from "@/lib/ia/market-data";
import { getCompany } from "@/lib/ia/companies";

export default function AssetDetailPage() {
  const params = useParams();
  const symbol = params.symbol as string;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const stock = ACOES.find(s => s.symbol === symbol) || ACOES[0];
  const company = getCompany(symbol);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.fade-item', {
          y: 10,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out'
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [symbol]);

  const fundamentals = [
    { label: 'P/L', value: (stock.pl || 0).toFixed(2), sector: 3.13, subsetor: 3.13, segment: 4.39 },
    { label: 'P/VP', value: (stock.pvp || 0).toFixed(2), sector: 1.31, subsetor: 1.31, segment: 1.43 },
    { label: 'P/Receita', value: '1.25', sector: 1.01, subsetor: 1.01, segment: 1.17 },
    { label: 'DY', value: `${(stock.dy || 0).toFixed(2)}%`, sector: '1.58%', subsetor: '1.58%', segment: '1.98%' },
    { label: 'Payout', value: '38,56%', sector: '11,85%', subsetor: '11,85%', segment: '14,81%' },
    { label: 'Margem Líquida', value: `${(stock.margemLiquida || 0).toFixed(1)}%`, sector: '3,28%', subsetor: '3,28%', segment: '5,92%' },
    { label: 'Margem Bruta', value: '47,63%', sector: '32,85%', subsetor: '32,85%', segment: '32,14%' },
    { label: 'Margem EBIT', value: '29,27%', sector: '10,96%', subsetor: '10,96%', segment: '12,55%' },
    { label: 'Margem EBITDA', value: '46,23%', sector: '22,13%', subsetor: '22,13%', segment: '24,50%' },
  ];

  const profitability = [
    { period: '1 mês', value: '12,61%', real: '12,61%' },
    { period: '3 meses', value: '59,44%', real: '58,33%' },
    { period: '1 ano', value: '59,84%', real: '55,50%' },
    { period: '2 anos', value: '67,48%', real: '54,39%' },
    { period: '5 anos', value: '610,18%', real: '440,47%' },
    { period: '10 anos', value: '1.952,97%', real: '1.173,29%' },
  ];

  const formatMarketValue = (value?: number) => {
    if (!value) return 'R$ 0,00';
    if (value >= 1e9) return `R$ ${(value / 1e9).toFixed(2)} B`;
    if (value >= 1e6) return `R$ ${(value / 1e6).toFixed(2)} M`;
    return `R$ ${value.toLocaleString('pt-BR')}`;
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0d0d10]">
      {/* Header */}
      <div className="bg-[#18181b] border-b border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/acoes" className="flex items-center gap-1 text-[#71717a] hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs">Voltar</span>
            </Link>
            <div className="h-4 w-px bg-white/[0.06]" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#27272a] flex items-center justify-center text-[10px] font-bold text-[#71717a]">
                {symbol.slice(0, 2)}
              </div>
              <div>
                <h1 className="text-base font-semibold text-white">{symbol}</h1>
                <p className="text-[#52525b] text-xs">{company?.name || stock.name}</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <span className="text-[#52525b] text-[10px]">BVMF</span>
              <RefreshCw className="w-3 h-3 text-[#52525b]" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 py-4">
        {/* Price Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Main Price Card */}
          <div className="lg:col-span-2 bg-[#18181b] border border-white/[0.06] rounded-lg p-4 fade-item">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#52525b] text-xs mb-1">Cotação</p>
                <p className="text-3xl font-mono font-bold text-white">R$ {(stock.price || 45).toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={cn(
                    "text-sm font-mono font-medium px-2 py-0.5 rounded",
                    (stock.changePercent || 0) >= 0 ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"
                  )}>
                    {(stock.changePercent || 0) >= 0 ? '+' : ''}{(stock.changePercent || 0).toFixed(2)}%
                  </span>
                  <span className="text-[#52525b] text-xs">
                    variação (12M)
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#52525b] text-xs mb-1">Valor de Mercado</p>
                <p className="text-white text-sm font-mono">{formatMarketValue(stock.valorMercado)}</p>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="mt-4 h-48 bg-[#27272a]/50 rounded-lg flex items-center justify-center border border-white/[0.04]">
              <p className="text-[#52525b] text-xs">Gráfico de preço em breve</p>
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="bg-[#18181b] border border-white/[0.06] rounded-lg p-4 fade-item">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[#52525b] text-[10px] uppercase mb-1">P/L</p>
                <p className="text-white text-lg font-mono font-semibold">{(stock.pl || 5.65).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[#52525b] text-[10px] uppercase mb-1">P/VP</p>
                <p className="text-white text-lg font-mono font-semibold">{(stock.pvp || 1.50).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[#52525b] text-[10px] uppercase mb-1">DY</p>
                <p className="text-green-400 text-lg font-mono font-semibold">{(stock.dy || 6.94).toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-[#52525b] text-[10px] uppercase mb-1">ROE</p>
                <p className="text-white text-lg font-mono font-semibold">{(stock.roe || 26).toFixed(1)}%</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/[0.04]">
              <p className="text-[#52525b] text-[10px] uppercase mb-1">Setor</p>
              <p className="text-white text-xs">{stock.sector || 'Petroleo, Gas e Biocombustiveis'}</p>
            </div>
          </div>
        </div>

        {/* Rentabilidade Table */}
        <div className="bg-[#18181b] border border-white/[0.06] rounded-lg mb-4 fade-item">
          <div className="px-4 py-3 border-b border-white/[0.04]">
            <h2 className="text-white text-sm font-semibold">Rentabilidade de {symbol}</h2>
          </div>
          <div className="grid grid-cols-6 divide-x divide-white/[0.04]">
            {profitability.map((p) => (
              <div key={p.period} className="p-3 text-center">
                <p className="text-[#52525b] text-[10px] mb-1">{p.period}</p>
                <p className="text-green-400 text-xs font-mono font-medium">{p.value}</p>
                <p className="text-[#71717a] text-[9px] mt-1">real: {p.real}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fundamentals Comparison */}
        <div className="bg-[#18181b] border border-white/[0.06] rounded-lg mb-4 fade-item">
          <div className="px-4 py-3 border-b border-white/[0.04]">
            <h2 className="text-white text-sm font-semibold">Fundamentos</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-[10px] text-[#71717a] uppercase border-b border-white/[0.04]">
                  <th className="text-left px-4 py-2">Métrica</th>
                  <th className="text-right px-4 py-2">{symbol}</th>
                  <th className="text-right px-4 py-2">Setor</th>
                  <th className="text-right px-4 py-2">Subsetor</th>
                  <th className="text-right px-4 py-2">Segmento</th>
                </tr>
              </thead>
              <tbody>
                {fundamentals.map((f, i) => (
                  <tr key={i} className="border-b border-white/[0.02]">
                    <td className="px-4 py-2 text-[#71717a] text-xs">{f.label}</td>
                    <td className="px-4 py-2 text-white text-xs font-mono text-right">{f.value}</td>
                    <td className="px-4 py-2 text-[#52525b] text-xs font-mono text-right">{f.sector}</td>
                    <td className="px-4 py-2 text-[#52525b] text-xs font-mono text-right">{f.subsetor}</td>
                    <td className="px-4 py-2 text-[#52525b] text-xs font-mono text-right">{f.segment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Company Info */}
        {company && (
          <div className="bg-[#18181b] border border-white/[0.06] rounded-lg mb-4 fade-item">
            <div className="px-4 py-3 border-b border-white/[0.04]">
              <h2 className="text-white text-sm font-semibold">Sobre a Empresa</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <p className="text-[#52525b] text-[10px] uppercase mb-1">O que faz</p>
                <p className="text-white text-xs">{company.business}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-green-500/5 rounded-lg border border-green-500/10">
                  <p className="text-green-400 text-[10px] font-bold uppercase mb-2">Pontos Positivos</p>
                  <ul className="text-[#a1a1aa] text-xs space-y-1">
                    {company.positives.map((p, i) => (
                      <li key={i}>• {p}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-red-500/5 rounded-lg border border-red-500/10">
                  <p className="text-red-400 text-[10px] font-bold uppercase mb-2">Riscos</p>
                  <ul className="text-[#a1a1aa] text-xs space-y-1">
                    {company.risks.map((r, i) => (
                      <li key={i}>• {r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}