"use client";

import { useState, useEffect } from "react";
import { Portfolio } from "@/components/portfolio/portfolio";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { getQuotes, Quote } from "@/lib/api/mercado";
import { 
  Wallet, 
  TrendingUp, 
  PiggyBank, 
  Shield,
  ArrowRight,
  Target,
  BarChart3
} from "lucide-react";
import Link from "next/link";

const mockPortfolio = [
  { id: '1', ativo: 'PETR4', quantidade: 100, preco_medio: 32.50 },
  { id: '2', ativo: 'VALE3', quantidade: 50, preco_medio: 68.20 },
  { id: '3', ativo: 'KNIP11', quantidade: 20, preco_medio: 145.00 },
];

export default function WalletPage() {
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});

  useEffect(() => {
    const loadQuotes = async () => {
      const symbols = ['PETR4', 'VALE3', 'KNIP11', 'ITUB4', 'WEGE3', 'GC=F', 'BTC-USD', '^BVSP'];
      const quotes = await getQuotes(symbols);
      const quotesMap: Record<string, Quote> = {};
      quotes.forEach(q => { quotesMap[q.symbol] = q; });
      setQuotes(quotesMap);
    };
    loadQuotes();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505]">
      <main className="pt-4 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1800px] mx-auto">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3 font-['Space_Grotesk']">
            <div className="w-12 h-12 rounded-2xl bg-[#adc6ff]/10 flex items-center justify-center border border-[#adc6ff]/20">
              <Wallet className="w-6 h-6 text-[#adc6ff]" />
            </div>
            Minha <span className="text-[#adc6ff]">Carteira</span>
            <Tooltip 
              term="Carteira de Investimentos" 
              definition="Conjunto de ativos que você possui. Uma carteira bem diversificada reduz riscos e aumenta chances de bons retornos."
            />
          </h1>
          <p className="text-white/40 text-lg font-['Inter']">Acompanhe seus investimentos e veja o impacto no seu patrimonio</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Portfolio initialItems={mockPortfolio} quotes={quotes} />
          </div>

          <div className="space-y-6">
            <div className="liquid-card p-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-3 font-['Space_Grotesk']">
                <div className="w-10 h-10 rounded-xl bg-[#adc6ff]/10 flex items-center justify-center border border-[#adc6ff]/20">
                  <Shield className="w-5 h-5 text-[#adc6ff]" />
                </div>
                Dicas de Investimento
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-white/[0.03] rounded-xl border border-white/[0.08] hover:border-[#adc6ff]/20 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#adc6ff]/10 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-[#adc6ff]" />
                    </div>
                    <p className="text-[#adc6ff] font-medium font-['Space_Grotesk']">Diversifique</p>
                  </div>
                  <p className="text-sm text-white/50 font-['Inter']">
                    Nao coloque todos os ovos na mesma cesta. Misture renda fixa e variavel para reduzir riscos.
                  </p>
                </div>
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <Target className="w-4 h-4 text-cyan-400" />
                    </div>
                    <p className="text-cyan-400 font-medium">Longo prazo</p>
                  </div>
                  <p className="text-sm text-slate-300">
                    Investir e para o longo prazo. Nao se deixe levar pela volatilidade diaria.
                  </p>
                </div>
                <div className="p-4 bg-white/[0.03] rounded-xl border border-white/[0.08] hover:border-purple-500/20 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <PiggyBank className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-purple-400 font-medium font-['Space_Grotesk']">Reserva de emergencia</p>
                  </div>
                  <p className="text-sm text-white/50 font-['Inter']">
                    Tenha 6 meses de despesas investidos antes de investir em renda variavel.
                  </p>
                </div>
              </div>
            </div>

            <div className="liquid-card p-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-3 font-['Space_Grotesk']">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <PiggyBank className="w-5 h-5 text-purple-400" />
                </div>
                Simulador
              </h3>
              <p className="text-sm text-white/40 mb-4 font-['Inter']">Simule o crescimento do seu investimento:</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-slate-700/50">
                  <span className="text-slate-400 text-sm">R$ 1.000</span>
                  <span className="text-emerald-400 font-bold">+R$ 180/ano</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-slate-700/50">
                  <span className="text-slate-400 text-sm">R$ 5.000</span>
                  <span className="text-[#00C805] font-bold">+R$ 900/ano</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl border border-white/[0.08]">
                  <span className="text-white/40 text-sm font-['Inter']">R$ 10.000</span>
                  <span className="text-[#00C805] font-bold">+R$ 1.800/ano</span>
                </div>
              </div>
              <Link href="/calculadoras" className="block text-center mt-4">
                <Button className="w-full bg-[#adc6ff] hover:brightness-110 text-[#002e69] border-0 font-['Space_Grotesk']">
                  Ver Calculadora Completa
                </Button>
              </Link>
            </div>

            <div className="liquid-card p-6 border-[#adc6ff]/20">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-3 font-['Space_Grotesk']">
                <div className="w-10 h-10 rounded-xl bg-[#adc6ff]/10 flex items-center justify-center border border-[#adc6ff]/20">
                  <BarChart3 className="w-5 h-5 text-[#adc6ff]" />
                </div>
                Configure Alertas
              </h3>
              <p className="text-sm text-white/40 mb-4 font-['Inter']">Receba notificacoes sobre mudancas nos seus ativos:</p>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-all text-left">
                  <span className="text-white text-sm">PETR4</span>
                  <span className="text-slate-400 text-xs">Queda &gt; 5%</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-all text-left">
                  <span className="text-white text-sm">VALE3</span>
                  <span className="text-slate-400 text-xs">Alta &gt; 3%</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <Link href="/alertas" className="block text-center mt-4">
                <span className="text-cyan-400 text-sm hover:text-cyan-300">Gerenciar todos os alertas</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}