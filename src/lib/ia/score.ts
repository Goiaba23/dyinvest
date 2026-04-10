import { MarketData } from "./market-data";

/**
 * Calcula o Score IA de um ativo (0-100) baseado em indicadores fundamentalistas e IA.
 * Inclui: Value, Quality, Momentum, Rule of 40, e Rating Setorial.
 */
export function calculateIAScore(asset: MarketData, sectorAveragePL?: number, sectorAverageROE?: number): number {
  let score = 50; // Base neutra

  // 1. Value (P/L e P/VP) - 25%
  if (asset.pl !== undefined) {
    if (asset.pl > 0 && asset.pl < 15) score += 15;
    else if (asset.pl >= 15 && asset.pl < 25) score += 5;
    else if (asset.pl < 0) score -= 20; // Prejuízo
    else if (asset.pl >= 25) score -= 10; // "Caro"

    // Sector Rating (P/L Relativo)
    if (sectorAveragePL && asset.pl > 0 && asset.pl < sectorAveragePL) score += 5;
  }

  if (asset.pvp !== undefined) {
    if (asset.pvp > 0 && asset.pvp < 1.5) score += 15;
    else if (asset.pvp >= 1.5 && asset.pvp < 3) score += 5;
    else if (asset.pvp >= 3) score -= 10;
  }

  // 2. Quality (ROE e Margem) - 25%
  if (asset.roe !== undefined) {
    if (asset.roe > 20) score += 20;
    else if (asset.roe > 10) score += 10;
    else if (asset.roe < 0) score -= 15;

    // Sector Rating (ROE Relativo)
    if (sectorAverageROE && asset.roe > sectorAverageROE) score += 5;
  }

  if (asset.margemLiquida !== undefined) {
    if (asset.margemLiquida > 15) score += 10;
    else if (asset.margemLiquida < 5) score -= 5;
  }

  // 3. Dividends (DY) - 15%
  if (asset.dy !== undefined) {
    if (asset.dy > 8 && asset.dy <= 15) score += 20; // DY Saudável
    else if (asset.dy > 4 && asset.dy <= 8) score += 10;
    else if (asset.dy > 15) score -= 5; // Dividend Trap Alert
    else if (asset.dy === 0 && asset.type === 'acao') score -= 5;
  }

  // 4. Financial Health (Dívida/EBITDA) - 15%
  if (asset.dividaLiquidaEbitda !== undefined) {
    if (asset.dividaLiquidaEbitda < 2 && asset.dividaLiquidaEbitda >= 0) score += 10;
    else if (asset.dividaLiquidaEbitda > 4) score -= 15;
  }

  // 5. Rule of 40 (SaaS / Tech / Growth) - 20%
  // Crescimento da Receita + Margem de Lucro >= 40% (aproximado usando margem líquida e um crescimento mockato para fins do algoritmo base)
  const estimatedGrowth = asset.roe !== undefined ? asset.roe / 2 : 0; // Proxy para crescimento
  const ruleOf40 = estimatedGrowth + (asset.margemLiquida || 0);
  if (ruleOf40 >= 40) {
    score += 10; // Empresa de elite em crescimento e lucratividade
  } else if (ruleOf40 > 20) {
    score += 5;
  }

  // Normalização
  return clampScore(score);
}

function clampScore(score: number): number {
  return Math.min(Math.max(score, 0), 100);
}

/**
 * Retorna uma label e cor baseada no score (Premium Style)
 */
export function getScoreLabel(score: number): { label: string; color: string; badge: string } {
  if (score >= 80) return { label: 'Elite Buy', color: 'text-emerald-400', badge: 'bg-emerald-400/20 text-emerald-500 border-emerald-500/30' };
  if (score >= 60) return { label: 'Strong', color: 'text-blue-400', badge: 'bg-blue-400/20 text-blue-500 border-blue-500/30' };
  if (score >= 40) return { label: 'Hold', color: 'text-slate-400', badge: 'bg-slate-400/20 text-slate-500 border-slate-500/30' };
  if (score >= 20) return { label: 'Warning', color: 'text-orange-400', badge: 'bg-orange-400/20 text-orange-500 border-orange-500/30' };
  return { label: 'Sell / Toxic', color: 'text-red-400', badge: 'bg-red-400/20 text-red-500 border-red-500/30' };
}
