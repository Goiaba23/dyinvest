import { MarketData, ACOES, FIIS } from './market-data';

export interface DividendEvent {
  id: string;
  symbol: string;
  type: 'Dividendo' | 'JCP' | 'Rendimento';
  amount: number;
  dataCom: string;
  dataPagamento: string;
  status: 'anunciado' | 'pago' | 'projetado';
  confidence?: number;
}

export interface DividendSummary {
  totalAnual: number;
  totalMes: number;
  yieldOnCostMedia: number;
  snowballEffect: {
    canBuyShares: number;
    nextDividendIncrease: number;
  };
}

/**
 * Projeta dividendos futuros com base no histórico de 10 anos (Simulado)
 * No futuro, isso consumirá uma API real de dados históricos.
 */
export async function projectDividends(portfolio: any[]): Promise<DividendEvent[]> {
  const events: DividendEvent[] = [];
  const today = new Date();
  
  portfolio.forEach(asset => {
    // Simulação de lógica preditiva: 
    // Se hoje é Abril e ITSA4 costuma pagar em Maio e Agosto...
    if (asset.symbol === 'ITSA4') {
      events.push({
        id: `proj-itsa4-${today.getTime()}`,
        symbol: 'ITSA4',
        type: 'JCP',
        amount: 0.12,
        dataCom: '2026-05-15',
        dataPagamento: '2026-07-01',
        status: 'projetado',
        confidence: 92
      });
    }
    
    if (asset.symbol === 'PETR4') {
      events.push({
        id: `proj-petr4-${today.getTime()}`,
        symbol: 'PETR4',
        type: 'Dividendo',
        amount: 1.25,
        dataCom: '2026-04-25',
        dataPagamento: '2026-05-20',
        status: 'anunciado'
      });
    }
    
    // FIIs geralmente pagam todo mês
    const isFii = FIIS.some(f => f.symbol === asset.symbol);
    if (isFii) {
      events.push({
        id: `proj-${asset.symbol}-${today.getMonth() + 1}`,
        symbol: asset.symbol,
        type: 'Rendimento',
        amount: asset.price * 0.009, // ~0.9% ao mês
        dataCom: '2026-04-30',
        dataPagamento: '2026-05-15',
        status: 'projetado',
        confidence: 98
      });
    }
  });

  return events;
}

export function calculateDividendStats(portfolio: any[], events: DividendEvent[]): DividendSummary {
  const totalMes = events
    .filter(e => e.status !== 'projetado')
    .reduce((acc, curr) => acc + (curr.amount * (portfolio.find(p => p.symbol === curr.symbol)?.quantity || 0)), 0);

  // Média simples para o MVP
  const yieldOnCostMedia = portfolio.length > 0
    ? portfolio.reduce((acc, curr) => {
        const assetData = [...ACOES, ...FIIS].find(a => a.symbol === curr.symbol);
        const yoc = assetData && assetData.dy ? (assetData.dy * assetData.price) / (curr.avgPrice * 100) : 0;
        return acc + yoc;
      }, 0) / portfolio.length
    : 0;

  // Efeito Bola de Neve
  const mainAsset = portfolio[0]; // Simplificação: pega o ativo com maior peso ou o primeiro
  const snowballEffect = {
    canBuyShares: mainAsset ? Math.floor(totalMes / mainAsset.price) : 0,
    nextDividendIncrease: 0
  };

  if (mainAsset && snowballEffect.canBuyShares > 0) {
    const assetData = [...ACOES, ...FIIS].find(a => a.symbol === mainAsset.symbol);
    snowballEffect.nextDividendIncrease = snowballEffect.canBuyShares * (assetData?.dy || 0) * (assetData?.price || 0) / 100 / 12;
  }

  return {
    totalAnual: totalMes * 12,
    totalMes,
    yieldOnCostMedia: yieldOnCostMedia * 100,
    snowballEffect
  };
}

export function calculateCeilingPrice(symbol: string, method: 'bazin' | 'historical' = 'bazin'): number {
  const asset = [...ACOES, ...FIIS].find(a => a.symbol === symbol);
  if (!asset || !asset.dy) return 0;

  if (method === 'bazin') {
    // Regra dos 6%: (Dividendo Médio / 0.06)
    const annualDividend = (asset.dy / 100) * asset.price;
    return annualDividend / 0.06;
  }

  // Futuro: Lógica historical com IA
  return asset.price * 0.95; // Mock
}
