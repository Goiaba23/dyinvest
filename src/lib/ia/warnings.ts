// lib/ia/warnings.ts - Sistema de alertas e warnings baseado em dados fundamentais

import { MarketData } from "./market-data";

export interface Warning {
  level: 'low' | 'medium' | 'high';
  message: string;
  icon: 'warning' | 'alert' | 'info';
}

export function analyzeStockWarnings(stock: MarketData): Warning[] {
  const warnings: Warning[] = [];

  // P/L Analysis
  if (stock.pl) {
    if (stock.pl > 40) {
      warnings.push({
        level: 'high',
        message: 'P/L muito alto (acima de 40). Pode indicar ação cara ou expectativa irreal de crescimento.',
        icon: 'warning'
      });
    } else if (stock.pl > 25 && stock.pl <= 40) {
      warnings.push({
        level: 'medium',
        message: 'P/L elevado (acima de 25). Verifique se o crescimento justifica o preço.',
        icon: 'alert'
      });
    } else if (stock.pl < 0) {
      warnings.push({
        level: 'high',
        message: 'P/L negativo. Empresa está com prejuízo, análise requer cuidado extra.',
        icon: 'warning'
      });
    } else if (stock.pl > 0 && stock.pl < 5) {
      warnings.push({
        level: 'low',
        message: 'P/L baixo pode indicar ação subvalorizada ou problemas no negócio.',
        icon: 'info'
      });
    }
  }

  // P/VP Analysis
  if (stock.pvp) {
    if (stock.pvp > 3) {
      warnings.push({
        level: 'high',
        message: 'P/VP muito alto (acima de 3x). Ação negociada bem acima do valor patrimonial.',
        icon: 'warning'
      });
    } else if (stock.pvp > 2 && stock.pvp <= 3) {
      warnings.push({
        level: 'medium',
        message: 'P/VP elevado. Pode não compensar o preço pago pelo patrimônio.',
        icon: 'alert'
      });
    } else if (stock.pvp < 0.5) {
      warnings.push({
        level: 'medium',
        message: 'P/VP muito baixo pode ser oportunidade ou indicativo de problemas.',
        icon: 'alert'
      });
    }
  }

  // Dividend Yield Analysis
  if (stock.dy) {
    if (stock.dy > 15) {
      warnings.push({
        level: 'high',
        message: 'Dividend Yield muito alto. Verifique se é sustentável ou foi pagamento pontual.',
        icon: 'warning'
      });
    } else if (stock.dy > 10 && stock.dy <= 15) {
      warnings.push({
        level: 'medium',
        message: 'DY alto. Analise a saúde financeira da empresa antes de investir.',
        icon: 'alert'
      });
    }
  }

  // ROE Analysis
  if (stock.roe !== undefined) {
    if (stock.roe < 0) {
      warnings.push({
        level: 'high',
        message: 'ROE negativo. Empresa está destruindo valor para os acionistas.',
        icon: 'warning'
      });
    } else if (stock.roe > 50) {
      warnings.push({
        level: 'medium',
        message: 'ROE muito alto pode não ser sustentável a longo prazo.',
        icon: 'alert'
      });
    }
  }

  // Dívida Analysis
  if (stock.dividaLiquidaEbitda && stock.dividaLiquidaEbitda > 4) {
    warnings.push({
      level: 'high',
      message: 'Dívida elevada (mais de 4x EBITDA). Risco de inadimplência.',
      icon: 'warning'
    });
  } else if (stock.dividaLiquidaEbitda && stock.dividaLiquidaEbitda > 2) {
    warnings.push({
      level: 'medium',
      message: 'Dívida moderada. Monitore a capacidade de geração de caixa.',
      icon: 'alert'
    });
  }

  // Margem Líquida
  if (stock.margemLiquida !== undefined) {
    if (stock.margemLiquida < 0) {
      warnings.push({
        level: 'high',
        message: 'Margem líquida negativa. Empresa não está gerando lucro.',
        icon: 'warning'
      });
    } else if (stock.margemLiquida > 30) {
      warnings.push({
        level: 'low',
        message: 'Margem excelente. Empresa tem boa lucratividade.',
        icon: 'info'
      });
    }
  }

  // Valor de Mercado
  if (stock.valorMercado && stock.valorMercado < 1000000000) {
    warnings.push({
      level: 'medium',
        message: 'Company de small cap. Maior volatilidade e risco.',
      icon: 'alert'
    });
  }

  // Setor específico warnings
  if (stock.sector === 'Petroleo e Gas' || stock.sector === 'Materiais Básicos') {
    warnings.push({
      level: 'low',
      message: 'Setor cíclico. Pode ser afetado por variações de commodities e câmbio.',
      icon: 'info'
    });
  }

  if (stock.sector === 'Tecnologia') {
    warnings.push({
      level: 'medium',
      message: 'Setor competitivo com mudanças rápidas. Risco de disrupção.',
      icon: 'alert'
    });
  }

  if (stock.sector === 'Financeiros') {
    warnings.push({
      level: 'medium',
      message: 'Setor regulado. Mudanças na taxa de juros impactam diretamente.',
      icon: 'alert'
    });
  }

  return warnings;
}

export function getStockSummary(stock: MarketData): string {
  const warnings = analyzeStockWarnings(stock);
  
  if (warnings.filter(w => w.level === 'high').length > 0) {
    return 'Atenção: Ação com riscos elevados. Analise com cautela.';
  } else if (warnings.filter(w => w.level === 'medium').length > 2) {
    return 'Cuidados: Alguns indicadores merecem atenção.';
  } else if (warnings.length > 0) {
    return 'Análise: Indicadores normais, mas vale verificar alguns pontos.';
  }
  
  return 'Análise: Ação sem alertas significativos.';
}