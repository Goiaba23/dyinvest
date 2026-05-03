import Link from "next/link";
import { Trophy, DollarSign, BarChart3, TrendingUp, ArrowRight } from "lucide-react";
import { ACOES, getTopByDY, getTopByMarketCap, getTopByRevenue, getTopByProfit, getTopByROE } from "@/lib/ia/market-data";

const rankings = [
  {
    title: "Maiores Dividendos",
    icon: DollarSign,
    description: "Empresas com maior Dividend Yield",
    items: getTopByDY(10).map((item) => ({
      rank: 0,
      ticker: item.symbol,
      name: item.name,
      value: `${item.dy?.toFixed(2)}%`,
      sector: item.sector,
    })),
  },
  {
    title: "Maiores Market Cap",
    icon: Trophy,
    description: "Empresas com maior valor de mercado",
    items: getTopByMarketCap(10).map((item, idx) => ({
      rank: idx + 1,
      ticker: item.symbol,
      name: item.name,
      value: item.valorMercado ? `R$ ${(item.valorMercado / 1e9).toFixed(1)}B` : "-",
      sector: item.sector,
    })),
  },
  {
    title: "Maiores Receitas",
    icon: BarChart3,
    description: "Empresas com maior receita líquida",
    items: getTopByRevenue(10).map((item, idx) => ({
      rank: idx + 1,
      ticker: item.symbol,
      name: item.name,
      value: item.receita ? `R$ ${(item.receita / 1e6).toFixed(0)}M` : "-",
      sector: item.sector,
    })),
  },
  {
    title: "Maiores Lucros",
    icon: BarChart3,
    description: "Empresas com maior lucro líquido",
    items: getTopByProfit(10).map((item, idx) => ({
      rank: idx + 1,
      ticker: item.symbol,
      name: item.name,
      value: item.lucro ? `R$ ${(item.lucro / 1e6).toFixed(0)}M` : "-",
      sector: item.sector,
    })),
  },
  {
    title: "Maiores ROEs",
    icon: TrendingUp,
    description: "Empresas com maior retorno sobre patrimônio",
    items: getTopByROE(10).map((item, idx) => ({
      rank: idx + 1,
      ticker: item.symbol,
      name: item.name,
      value: `${item.roe?.toFixed(1)}%`,
      sector: item.sector,
    })),
  },
];

export default function RankingsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-[#002B5C]">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Rankings</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rankings de Ativos</h1>
          <p className="text-gray-600">Compare ativos por diversos indicadores fundamentalistas</p>
        </div>
      </div>

      {/* Rankings */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {rankings.map((ranking) => (
            <div key={ranking.title}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <ranking.icon className="w-5 h-5 text-[#00A86B]" />
                    <h2 className="text-lg font-bold text-gray-900">{ranking.title}</h2>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{ranking.description}</p>
                </div>
                <Link href="#" className="text-sm text-[#00A86B] hover:underline flex items-center gap-1">
                  Ver todos <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="space-y-2">
                {ranking.items.map((item, idx) => (
                  <Link
                    key={item.ticker}
                    href={`/ativo/${item.ticker}`}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-500">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="font-semibold text-gray-900 group-hover:text-[#002B5C]">{item.ticker}</span>
                        <p className="text-xs text-gray-500">{item.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-[#00A86B]">{item.value}</span>
                      <p className="text-xs text-gray-500">{item.sector}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
