"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatCurrency, formatPercent, getChangeColor, getChangeBg, getAtivoIcon, getAtivoLabel } from "@/lib/utils";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { Quote } from "@/lib/api/mercado";

interface MarketCardProps {
  ativo: string;
  quote?: Quote;
  isLoading?: boolean;
  onClick?: () => void;
}

export function MarketCard({ ativo, quote, isLoading, onClick }: MarketCardProps) {
  const icon = getAtivoIcon(ativo);
  const label = getAtivoLabel(ativo);
  const change = quote?.changePercent || 0;

  return (
    <Card 
      variant="glass" 
      hover 
      className="cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{icon}</span>
            <div>
              <p className="font-semibold text-white">{label}</p>
              <p className="text-sm text-slate-400">{ativo}</p>
            </div>
          </div>
          
          <div className="text-right">
            {isLoading ? (
              <div className="flex items-center gap-2 text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Carregando...</span>
              </div>
            ) : quote ? (
              <>
                <p className="text-lg font-bold text-white">
                  {formatCurrency(quote.price)}
                </p>
                <div className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  getChangeColor(change)
                )}>
                  {change > 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : change < 0 ? (
                    <TrendingDown className="w-3 h-3" />
                  ) : null}
                  <span>{formatPercent(change)}</span>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-500">N/A</p>
            )}
          </div>
        </div>

        {/* Mini Chart Placeholder */}
        {quote && (
          <div className={cn(
            "mt-3 h-8 rounded-lg flex items-center justify-center text-xs font-medium",
            getChangeBg(change)
          )}>
            {change > 0 ? "▲ Tendência de Alta" : change < 0 ? "▼ Tendência de Baixa" : "— Sem Variação"}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface MarketGridProps {
  ativos: string[];
  quotes: Record<string, Quote>;
  loading?: boolean;
}

export function MarketGrid({ ativos, quotes, loading }: MarketGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {ativos.map((ativo) => (
        <MarketCard
          key={ativo}
          ativo={ativo}
          quote={quotes[ativo]}
          isLoading={loading}
        />
      ))}
    </div>
  );
}