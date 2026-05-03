"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const tickerData = [
  { symbol: "IBOV", value: "128.450", change: "+0.85%", positive: true },
  { symbol: "USD/BRL", value: "5,12", change: "-0.32%", positive: false },
  { symbol: "EUR/BRL", value: "5,58", change: "+0.15%", positive: true },
  { symbol: "BTC", value: "R$ 352.890", change: "+2.45%", positive: true },
  { symbol: "ETH", value: "R$ 18.450", change: "+1.82%", positive: true },
  { symbol: "PETR4", value: "R$ 38,45", change: "+1.24%", positive: true },
  { symbol: "VALE3", value: "R$ 62,10", change: "-0.85%", positive: false },
  { symbol: "ITUB4", value: "R$ 34,20", change: "+0.42%", positive: true },
  { symbol: "BBDC4", value: "R$ 15,60", change: "-0.51%", positive: false },
  { symbol: "IFIX", value: "3.285", change: "+0.45%", positive: true },
  { symbol: "IVVB11", value: "R$ 28,50", change: "+1.12%", positive: true },
  { symbol: "BOVA11", value: "R$ 102,30", change: "+0.78%", positive: true },
];

export default function MarketTicker() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % tickerData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 border-b border-gray-200 py-2 overflow-hidden">
      <div className="flex items-center gap-6 animate-pulse">
        {[...tickerData, ...tickerData].map((item, idx) => (
          <div key={`${item.symbol}-${idx}`} className="flex items-center gap-2 text-sm whitespace-nowrap">
            <span className="font-semibold text-gray-900">{item.symbol}</span>
            <span className="text-gray-600">{item.value}</span>
            <span className={`flex items-center gap-0.5 ${item.positive ? 'text-green-600' : 'text-red-600'}`}>
              {item.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
