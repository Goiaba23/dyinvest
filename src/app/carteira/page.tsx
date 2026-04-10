"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Portfolio } from "@/components/portfolio/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  BarChart3,
  PieChart,
  ArrowUpRight,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const mockPortfolio = [
  { id: '1', ativo: 'PETR4', quantidade: 100, preco_medio: 32.50 },
  { id: '2', ativo: 'VALE3', quantidade: 50, preco_medio: 68.20 },
  { id: '3', ativo: 'KNIP11', quantidade: 20, preco_medio: 145.00 },
];

export default function WalletPage() {
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    const symbols = ['PETR4', 'VALE3', 'KNIP11', 'ITUB4', 'WEGE3', 'GC=F', 'BTC-USD', '^BVSP'];
    const quotes = await getQuotes(symbols);
    const quotesMap: Record<string, Quote> = {};
    quotes.forEach(q => { quotesMap[q.symbol] = q; });
    setQuotes(quotesMap);
  };

  return (
    <div className="min-h-screen bg-void bg-aurora bg-grid">
      <Header isLoggedIn user={{ email: "usuario@email.com" }} />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3 font-display">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-500/30">
              <Wallet className="w-6 h-6 text-emerald-400" />
            </div>
            Minha <span className="text-gradient-neon">Carteira</span>
            <Tooltip 
              term="Carteira de Investimentos" 
              definition="Conjunto de ativos que você possui. Uma carteira bem diversificada reduz riscos e aumenta chances de bons retornos."
            />
          </h1>
          <p className="text-slate-400 text-lg ml-15">Acompanhe seus investimentos e veja o impacto no seu patrimônio</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Portfolio initialItems={mockPortfolio} quotes={quotes} />
          </div>

          <div className="space-y-6">
            {/* Dicas */}
            <Card variant="glass" className="card-elevated">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30">
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>
                  Dicas de Investimento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-emerald-400 font-medium">Diversifique</p>
                  </div>
                  <p className="text-sm text-slate-300">
                    Não coloque todos os ovos na mesma cesta. Misture renda fixa e variável para reduzir riscos.
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
                    Investir é para o longo prazo. Não se deixe levar pela volatilidade diária.
                  </p>
                </div>
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <PiggyBank className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-purple-400 font-medium">Reserva de emergência</p>
                  </div>
                  <p className="text-sm text-slate-300">
                    Tenha 6 meses de despesas investidos antes de investir em renda variável.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Simulador */}
            <Card variant="glass" className="card-elevated">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
                    <PiggyBank className="w-5 h-5 text-purple-400" />
                  </div>
                  Simulador
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400 mb-4">Simule o crescimento do seu investimento:</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-slate-700/50">
                    <span className="text-slate-400 text-sm">R$ 1.000</span>
                    <span className="text-emerald-400 font-bold">+R$ 180/ano</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-slate-700/50">
                    <span className="text-slate-400 text-sm">R$ 5.000</span>
                    <span className="text-emerald-400 font-bold">+R$ 900/ano</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-slate-700/50">
                    <span className="text-slate-400 text-sm">R$ 10.000</span>
                    <span className="text-emerald-400 font-bold">+R$ 1.800/ano</span>
                  </div>
                </div>
                <Link href="/calculadoras" className="block text-center mt-4">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white border-0">
                    Ver Calculadora Completa
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Alertas */}
            <Card variant="glass" className="card-elevated border-emerald-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center border border-amber-500/30">
                    <BarChart3 className="w-5 h-5 text-amber-400" />
                  </div>
                  Configure Alertas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400 mb-4">Receba notificações sobre mudanças nos seus ativos:</p>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}