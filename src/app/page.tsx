import Link from "next/link";
import { Search, ArrowRight, TrendingUp, DollarSign, BarChart3, Trophy, Globe, Zap, Star, ChevronRight } from "lucide-react";
import { ACOES, getTopByDY, getTopByMarketCap } from "@/lib/ia/market-data";

const quickSuggestions = [
  { label: "Ibovespa", href: "/acoes" },
  { label: "Dólar", href: "/mercado" },
  { label: "PETR4", href: "/ativo/PETR4" },
  { label: "Bitcoin", href: "/criptos" },
  { label: "Tesouro Direto", href: "/renda-fixa" },
  { label: "FIIs", href: "/etfs" },
];

const assetCategories = [
  { label: "Ações", href: "/acoes", icon: TrendingUp, count: "400+" },
  { label: "FIIs", href: "/etfs", icon: DollarSign, count: "250+" },
  { label: "ETFs", href: "/etfs", icon: BarChart3, count: "100+" },
  { label: "Criptomoedas", href: "/criptos", icon: Globe, count: "500+" },
  { label: "BDRs", href: "/bdrs", icon: Star, count: "30+" },
  { label: "Ideias", href: "/aprender", icon: Zap, count: "Cursos" },
];

const rankings = [
  {
    title: "Maiores Dividendos",
    icon: DollarSign,
    href: "/acoes/rankings/dy",
    items: getTopByDY(5).map((item) => ({
      ticker: item.symbol,
      name: item.name,
      value: `${item.dy?.toFixed(2)}%`,
    })),
  },
  {
    title: "Maiores Market Cap",
    icon: Trophy,
    href: "/acoes/rankings/marketcap",
    items: getTopByMarketCap(5).map((item) => ({
      ticker: item.symbol,
      name: item.name,
      value: item.valorMercado ? `R$ ${(item.valorMercado / 1e9).toFixed(1)}B` : "-",
    })),
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Search */}
      <section className="bg-[#002B5C] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Invista com Inteligência
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Análise de investimentos com IA para investidores brasileiros
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquise pelo ativo desejado..."
                className="w-full pl-12 pr-4 py-4 rounded-xl text-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
              />
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {quickSuggestions.map((suggestion) => (
              <Link
                key={suggestion.label}
                href={suggestion.href}
                className="px-4 py-2 bg-white/10 text-white rounded-full text-sm hover:bg-white/20 transition-colors"
              >
                {suggestion.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Asset Quick Links */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {assetCategories.map((category) => (
              <Link
                key={category.label}
                href={category.href}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex flex-col items-center text-center">
                  <category.icon className="w-8 h-8 text-[#002B5C] mb-3" />
                  <h3 className="text-sm font-semibold text-gray-900">{category.label}</h3>
                  <p className="text-xs text-gray-500 mt-1">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Rankings Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Rankings de Ativos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {rankings.map((ranking) => (
              <div key={ranking.title}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ranking.icon className="w-5 h-5 text-[#00A86B]" />
                    <h3 className="text-lg font-semibold text-gray-900">{ranking.title}</h3>
                  </div>
                  <Link href={ranking.href} className="text-sm text-[#00A86B] hover:underline flex items-center gap-1">
                    Ver Rankings <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {ranking.items.map((item) => (
                    <Link
                      key={item.ticker}
                      href={`/ativo/${item.ticker}`}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <span className="font-semibold text-gray-900">{item.ticker}</span>
                        <p className="text-sm text-gray-500">{item.name}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-[#00A86B]">{item.value}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Por que escolher o DYInvest?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Zap className="w-10 h-10 text-[#00A86B] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Análise IA</h3>
              <p className="text-gray-600">4 analistas virtuais processam dados 24/7 para gerar probabilidades claras</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <BarChart3 className="w-10 h-10 text-[#00A86B] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Dados em Tempo Real</h3>
              <p className="text-gray-600">Cotações atualizadas de 40+ fontes globais com latência menor que 2 segundos</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Globe className="w-10 h-10 text-[#00A86B] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mercado Global</h3>
              <p className="text-gray-600">Acesse ações, FIIs, criptos, BDRs e muito mais em uma única plataforma</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#002B5C]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para investir com inteligência?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Junte-se a milhares de investidores que já usam IA para tomar decisões melhores
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="px-8 py-3 bg-[#00A86B] text-white rounded-lg font-semibold hover:bg-[#008F5B] transition-colors">
              Começar Grátis
            </Link>
            <Link href="/aprender" className="px-8 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors">
              Ver Cursos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
