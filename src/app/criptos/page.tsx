import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, Search, TrendingUp } from "lucide-react";

const criptos = [
  { symbol: "BTC", name: "Bitcoin", price: 352890, change24h: 2.45, marketCap: "R$ 6.9T", volume24h: "R$ 180B" },
  { symbol: "ETH", name: "Ethereum", price: 18450, change24h: 1.82, marketCap: "R$ 2.2T", volume24h: "R$ 95B" },
  { symbol: "BNB", name: "Binance Coin", price: 3120, change24h: -0.52, marketCap: "R$ 480B", volume24h: "R$ 12B" },
  { symbol: "SOL", name: "Solana", price: 720, change24h: 5.23, marketCap: "R$ 310B", volume24h: "R$ 28B" },
  { symbol: "XRP", name: "Ripple", price: 2.85, change24h: -1.15, marketCap: "R$ 150B", volume24h: "R$ 8B" },
  { symbol: "ADA", name: "Cardano", price: 4.20, change24h: 3.45, marketCap: "R$ 145B", volume24h: "R$ 6B" },
  { symbol: "DOGE", name: "Dogecoin", price: 1.85, change24h: -2.30, marketCap: "R$ 270B", volume24h: "R$ 15B" },
  { symbol: "DOT", name: "Polkadot", price: 35.50, change24h: 1.25, marketCap: "R$ 48B", volume24h: "R$ 3B" },
];

export default function CriptosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-[#002B5C]">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Criptomoedas</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Todas as Criptomoedas</h1>
          <p className="text-gray-600">Preços e análises de criptomoedas em tempo real</p>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar criptomoeda..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B5C]"
            />
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">#</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ativo</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Preço</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">24h</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase hidden md:table-cell">Market Cap</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase hidden md:table-cell">Volume 24h</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody>
              {criptos.map((cripto, idx) => (
                <tr key={cripto.symbol} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <td className="px-4 py-4 text-gray-500">{idx + 1}</td>
                  <td className="px-4 py-4">
                    <Link href={`/ativo/${cripto.symbol}`} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
                        {cripto.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 hover:text-[#002B5C]">{cripto.symbol}</span>
                        <p className="text-sm text-gray-500">{cripto.name}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-right font-medium">
                    R$ {cripto.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className={`flex items-center justify-end gap-1 ${
                      cripto.change24h > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {cripto.change24h > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      {cripto.change24h > 0 ? '+' : ''}{cripto.change24h.toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right text-gray-700 hidden md:table-cell">
                    {cripto.marketCap}
                  </td>
                  <td className="px-4 py-4 text-right text-gray-700 hidden md:table-cell">
                    {cripto.volume24h}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Link href={`/ativo/${cripto.symbol}`} className="text-[#002B5C] hover:text-[#00A86B]">
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
