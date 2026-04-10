import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency: string = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(value);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}

export function formatCompactNumber(value: number): string {
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
  return value.toString();
}

export function getChangeColor(change: number): string {
  if (change > 0) return 'text-emerald-500';
  if (change < 0) return 'text-rose-500';
  return 'text-slate-500';
}

export function getChangeBg(change: number): string {
  if (change > 0) return 'bg-emerald-500/10';
  if (change < 0) return 'bg-rose-500/10';
  return 'bg-slate-500/10';
}

export const ATIVO_ICONS: Record<string, string> = {
  PETR4: '🛢️',
  VALE3: '⛏️',
  ITUB4: '🏦',
  WEGE3: '⚡',
  BBDC4: '🏦',
  MGLU3: '🛒',
  ABEV3: '🍺',
  KNIP11: '🏠',
  HGLG11: '🏢',
  'GC=F': '🥇',
  'BTC-USD': '₿',
  '^BVSP': '📈',
  '^GSPC': '🇺🇸',
  default: '📊',
};

export function getAtivoIcon(ativo: string): string {
  return ATIVO_ICONS[ativo] || ATIVO_ICONS.default;
}

export function getAtivoLabel(ativo: string): string {
  const labels: Record<string, string> = {
    PETR4: 'Petrobras',
    VALE3: 'Vale',
    ITUB4: 'Itaú',
    WEGE3: 'WEG',
    BBDC4: 'Bradesco',
    MGLU3: 'Magazine Luiza',
    ABEV3: 'Ambev',
    KNIP11: 'Kinea',
    HGLG11: 'CSHG',
    'GC=F': 'Ouro',
    'BTC-USD': 'Bitcoin',
    '^BVSP': 'Ibovespa',
    '^GSPC': 'S&P 500',
  };
  return labels[ativo] || ativo;
}