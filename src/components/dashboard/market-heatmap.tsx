"use client";

import { useMemo } from "react";
import { ACOES, MarketData } from "@/lib/ia/market-data";
import { cn } from "@/lib/utils";

export function MarketHeatmap() {
  const sectorData = useMemo(() => {
    const sectors: Record<string, { totalChange: number; count: number; assets: string[] }> = {};

    ACOES.forEach((asset) => {
      const sector = asset.sector || "Outros";
      if (!sectors[sector]) {
        sectors[sector] = { totalChange: 0, count: 0, assets: [] };
      }
      sectors[sector].totalChange += asset.changePercent;
      sectors[sector].count += 1;
      sectors[sector].assets.push(asset.symbol);
    });

    return Object.entries(sectors).map(([name, data]) => ({
      name,
      avgChange: data.totalChange / data.count,
      count: data.count,
    })).sort((a, b) => b.avgChange - a.avgChange);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {sectorData.map((sector) => {
        const isUp = sector.avgChange >= 0;
        return (
          <div 
            key={sector.name}
            className={cn(
              "p-3 rounded-xl border transition-all hover:scale-105 cursor-default",
              isUp 
                ? "bg-emerald-500/10 border-emerald-500/20" 
                : "bg-rose-500/10 border-rose-500/20"
            )}
          >
            <p className="text-xs text-slate-400 font-medium uppercase truncate">{sector.name}</p>
            <div className="flex items-center justify-between mt-1">
              <span className={cn(
                "text-lg font-bold",
                isUp ? "text-emerald-400" : "text-rose-400"
              )}>
                {isUp ? "+" : ""}{sector.avgChange.toFixed(2)}%
              </span>
              <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
                {sector.count} ativos
              </span>
            </div>
            
            {/* Visual indicator (mini bar) */}
            <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-1000",
                  isUp ? "bg-emerald-500" : "bg-rose-500"
                )}
                style={{ width: `${Math.min(Math.abs(sector.avgChange) * 10, 100)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
