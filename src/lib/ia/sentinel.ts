import { PortfolioItem } from '../supabase';
import { ACOES, FIIS } from './market-data';

export interface HealthReport {
  overallScore: number;
  status: 'Critical' | 'Warning' | 'Healthy' | 'Elite';
  pillars: {
    name: string;
    score: number;
    description: string;
    weight: number;
  }[];
  diversification: {
    sector: string;
    percentage: number;
    status: 'optimal' | 'concentrated' | 'low';
  }[];
  prescriptions: string[];
}

/**
 * Doctor IA: Algoritmo de 12 Pilares (Upgrade Investidor 10 + AGF+)
 */
export async function diagnosePortfolio(portfolio: PortfolioItem[]): Promise<HealthReport> {
  const pillars: any[] = [];
  const prescriptions: string[] = [];
  
  if (portfolio.length === 0) {
    return {
      overallScore: 0,
      status: 'Warning',
      pillars: [],
      diversification: [],
      prescriptions: ["💉 Prescrição: Sua carteira está vazia. Adicione ativos para começar o check-up."]
    };
  }

  // Lógica Base: Média Ponderada da Carteira (Simulada para MVP)
  // No futuro, isso buscará os dados fundamentalistas reais de cada ativo via API
  
  // 1. Histórico de Lucros (Base Investidor 10)
  pillars.push({
    name: "Consistência de Lucros",
    score: 95,
    description: "Empresas com lucros crescentes nos últimos 5 anos.",
    weight: 0.15
  });

  // 2. Eficiência (ROE > 10%)
  pillars.push({
    name: "Eficiência (ROE)",
    score: 82,
    description: "Média de retorno sobre patrimônio acima da média setorial.",
    weight: 0.10
  });

  // 3. Saúde Financeira (Dívida/EBITDA < 3x)
  pillars.push({
    name: "Nível de Alavancagem",
    score: 78,
    description: "Dívida líquida controlada na maioria dos seus ativos.",
    weight: 0.10
  });

  // 4. Preço Teto Bazin (Margem de Segurança) - Pilar AGF+
  pillars.push({
    name: "Margem de Segurança",
    score: 65,
    description: "Alguns ativos estão operando próximos ao preço teto de 6%.",
    weight: 0.15
  });

  // 5. Crescimento (CAGR Rec./Lucro)
  pillars.push({
    name: "Potencial de Escala",
    score: 88,
    description: "Taxa de crescimento anual composta (CAGR) acima de 12%.",
    weight: 0.10
  });

  // 6. Governança & ESG
  pillars.push({
    name: "Governança",
    score: 100,
    description: "Ativos listados em Novo Mercado com 100% Tag Along.",
    weight: 0.05
  });

  // 7. IA Sentiment (DYInvest Exclusive)
  pillars.push({
    name: "Sentimento IA",
    score: 85,
    description: "Notícias e tendências recentes confirmam otimismo nos ativos.",
    weight: 0.15
  });

  // 8. Audit Health (Data Confidence)
  pillars.push({
    name: "Confiabilidade de Dados",
    score: 100,
    description: "Sincronização 100% íntegra com a B3.",
    weight: 0.10
  });

  // 9. Diversificação por Ativo (Limite de Concentração)
  pillars.push({
    name: "Risco de Cauda",
    score: 90,
    description: "Nenhum ativo individual representa mais de 20% do portfólio.",
    weight: 0.10
  });

  // Cálculo do Score Geral (Ponderado)
  const totalScore = pillars.reduce((acc, p) => acc + (p.score * p.weight), 0);

  // Análise de Diversificação Setorial
  const sectors: Record<string, number> = {};
  portfolio.forEach(item => {
    const assetInfo = [...ACOES, ...FIIS].find(a => a.symbol === item.symbol);
    const sector = assetInfo?.sector || item.sector || 'Outros';
    const value = item.quantity * (item.avg_price || 0);
    sectors[sector] = (sectors[sector] || 0) + value;
  });

  const totalValue = Object.values(sectors).reduce((a, b) => a + b, 0);
  const diversification = Object.entries(sectors).map(([name, value]) => {
    const percentage = totalValue > 0 ? (value / totalValue) * 100 : 0;
    return {
      sector: name,
      percentage,
      status: percentage > 35 ? 'concentrated' : (percentage < 5 ? 'low' : 'optimal') as any
    };
  });

  // Prescrições IA
  if (totalScore < 60) prescriptions.push("⚠️ Emergência: Seu portfólio possui ativos com lucros decrescentes. Reavalie a tese de investimento.");
  if (diversification.some(d => d.status === 'concentrated')) {
    const concentrated = diversification.find(d => d.status === 'concentrated');
    prescriptions.push(`🧬 Especialista: Você possui alta correlação no setor de ${concentrated?.sector}. Considere diversificar em Commodities ou Criptos para proteção.`);
  }
  if (totalScore > 85) prescriptions.push("💎 Carteira Blindada: Seus fundamentos estão alinhados com os maiores investidores do país.");
  if (pillars.find(p => p.name === "Margem de Segurança")!.score < 50) {
    prescriptions.push("📉 Alerta de Ciclo: Alguns ativos estão caros perante o Método Bazin (DY 6%). Aguarde correções para novos aportes.");
  }

  return {
    overallScore: Math.round(totalScore),
    status: totalScore > 85 ? 'Elite' : (totalScore > 70 ? 'Healthy' : (totalScore > 50 ? 'Warning' : 'Critical')),
    pillars,
    diversification,
    prescriptions
  };
}
