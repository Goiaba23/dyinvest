import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, Search, Filter, Star } from "lucide-react";
import { ACOES } from "@/lib/ia/market-data";

export default function AcoesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-[#002B5C]">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Ações</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Todas as Ações</h1>
          <p className="text-gray-600">Compare ações da B3 com dados fundamentalistas completos</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar ação..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B5C] focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ativo</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Preço</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Variação</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase hidden md:table-cell">P/L</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase hidden md:table-cell">P/VP</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase hidden md:table-cell">DY</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase hidden lg:table-cell">ROE</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase hidden lg:table-cell">Market Cap</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody>
              {ACOES.map((acao) => (
                <tr key={acao.symbol} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <td className="px-4 py-4">
                    <Link href={`/ativo/${acao.symbol}`} className="flex items-center gap-3">
                      <button className="text-gray-400 hover:text-[#00A86B]">
                        <Star className="w-4 h-4" />
                      </button>
                      <div>
                        <span className="font-semibold text-gray-900 hover:text-[#002B5C]">{acao.symbol}</span>
                        <p className="text-sm text-gray-500">{acao.name}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-right font-medium">
                    R$ {acao.price?.toFixed(2) || '-'}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className={`flex items-center justify-end gap-1 ${
                      acao.changePercent > 0 ? 'text-green-600' : acao.changePercent < 0 ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {acao.changePercent > 0 ? <ArrowUpRight className="w-4 h-4" /> : acao.changePercent < 0 ? <ArrowDownRight className="w-4 h-4" /> : null}
                      {acao.changePercent > 0 ? '+' : ''}{acao.changePercent?.toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right text-gray-700 hidden md:table-cell">
                    {acao.pl?.toFixed(1) || '-'}
                  </td>
                  <td className="px-4 py-4 text-right text-gray-700 hidden md:table-cell">
                    {acao.pvp?.toFixed(2) || '-'}
                  </td>
                  <td className="px-4 py-4 text-right text-gray-700 hidden md:table-cell">
                    {acao.dy?.toFixed(2)}%
                  </td>
                  <td className="px-4 py-4 text-right text-gray-700 hidden lg:table-cell">
                    {acao.roe?.toFixed(1)}%
                  </td>
                  <td className="px-4 py-4 text-right text-gray-700 hidden lg:table-cell">
                    {acao.valorMercado ? `R$ ${(acao.valorMercado / 1e9).toFixed(1)}B` : '-'}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Link href={`/ativo/${acao.symbol}`} className="text-[#002B5C] hover:text-[#00A86B]">
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
