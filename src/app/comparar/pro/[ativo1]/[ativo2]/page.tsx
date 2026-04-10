import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { getAsset } from "@/lib/ia/market-data";
import { calculateIAScore, getScoreLabel } from "@/lib/ia/score";
import Link from "next/link";
// Usando renderização dinâmica Server-side no Next.js (SSR) para gerar as meta-tags perfeitas pra SEO
import type { Metadata } from 'next';

type Props = {
  params: { ativo1: string; ativo2: string };
};

// SEO Dinâmico (Server-side)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const asset1 = getAsset(params.ativo1);
  const asset2 = getAsset(params.ativo2);
  
  if (!asset1 || !asset2) {
    return { title: 'Comparador de Ativos | Meu Investimento AI' };
  }

  return {
    title: `${asset1.symbol} vs ${asset2.symbol} (2026): A IA Analisou Qual é Melhor`,
    description: `Descubra a comparação completa e definitiva entre ${asset1.name} (${asset1.symbol}) e ${asset2.name} (${asset2.symbol}). Análise de Dividendos, P/L, ROE e Score de Inteligência Artificial.`,
    keywords: [`${asset1.symbol} vale a pena`, `${asset2.symbol} vale a pena`, `comparar ${asset1.symbol} e ${asset2.symbol}`, `comprar ${asset1.symbol} ou ${asset2.symbol}`]
  };
}

export default function CompareDynamicPage({ params }: Props) {
  const { ativo1, ativo2 } = params;
  const asset1 = getAsset(ativo1);
  const asset2 = getAsset(ativo2);

  if (!asset1 || !asset2) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 pt-24 text-slate-100 text-center">
        <h1 className="text-3xl text-red-500 mb-4">Ativo não encontrado.</h1>
        <Link href="/comparar/pro" className="text-emerald-400 hover:underline">Voltar para o comparador</Link>
      </div>
    );
  }

  const score1 = calculateIAScore(asset1);
  const score2 = calculateIAScore(asset2);
  const winner = score1 > score2 ? asset1 : (score2 > score1 ? asset2 : null);

  return (
    <div className="min-h-screen bg-slate-950 p-8 pt-24 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          {/* Tag H1 Crucial para SEO */}
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 mb-2">
            {asset1.symbol} vs {asset2.symbol}: Qual a Melhor Opção?
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Analisamos lado a lado os fundamentos de <strong>{asset1.name}</strong> e <strong>{asset2.name}</strong>. 
            Descubra quem ganha na Rule of 40, Dividendos e Dívidas.
          </p>
        </div>

        {/* Veredito Resumido SEO (Featured Snippet) */}
        <div className="glass-panel p-6 border-l-4 border-l-emerald-500 rounded text-sm text-slate-300">
          <strong className="text-white">Resumo Executivo da IA: </strong>
          No comparativo geral de fundamentos, {winner ? <span className="text-emerald-400 font-bold">{winner.symbol} vence o confronto</span> : <span>temos um empate técnico</span>}. 
          {winner && ` O score de ${winner.symbol} atingiu ${Math.max(score1, score2).toFixed(0)} pontos contra ${Math.min(score1, score2).toFixed(0)} pontos do rival, impulsionado por suas métricas de valuation.`}
        </div>

        <BentoGrid className="md:grid-cols-2 lg:grid-cols-3">
          <BentoGridItem 
            title={`Fundamentos: ${asset1.symbol}`}
            description={
              <div className="space-y-3 mt-4 text-sm">
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Preço:</span> <span className="font-bold text-emerald-400">R$ {asset1.price}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span>P/L:</span> <span>{asset1.pl}x</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span>ROE:</span> <span className={asset1.roe! > asset2.roe! ? "text-emerald-400 font-bold" : ""}>{asset1.roe}%</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Dividend Yield:</span> <span className={asset1.dy! > asset2.dy! ? "text-emerald-400 font-bold" : ""}>{asset1.dy}%</span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <span className="text-slate-400 block mb-1">Status Atual:</span>
                  <span className={`px-2 py-1 rounded inline-block ${getScoreLabel(score1).badge}`}>
                    {getScoreLabel(score1).label}
                  </span>
                </div>
              </div>
            }
          />
          
          <BentoGridItem 
            title={`Fundamentos: ${asset2.symbol}`}
            description={
              <div className="space-y-3 mt-4 text-sm">
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Preço:</span> <span className="font-bold text-emerald-400">R$ {asset2.price}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span>P/L:</span> <span>{asset2.pl}x</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span>ROE:</span> <span className={asset2.roe! > asset1.roe! ? "text-emerald-400 font-bold" : ""}>{asset2.roe}%</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Dividend Yield:</span> <span className={asset2.dy! > asset1.dy! ? "text-emerald-400 font-bold" : ""}>{asset2.dy}%</span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <span className="text-slate-400 block mb-1">Status Atual:</span>
                  <span className={`px-2 py-1 rounded inline-block ${getScoreLabel(score2).badge}`}>
                    {getScoreLabel(score2).label}
                  </span>
                </div>
              </div>
            }
          />
        </BentoGrid>
        
        <div className="text-center pt-8">
           <Link href="/comparar/pro" className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-full transition-colors text-sm font-medium">
             Fazer nova comparação
           </Link>
        </div>
      </div>
    </div>
  );
}
