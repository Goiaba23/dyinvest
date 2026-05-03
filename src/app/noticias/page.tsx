import Link from "next/link";
import { ArrowRight, TrendingUp, Calendar } from "lucide-react";

const noticias = [
  {
    title: "Petrobras anuncia lucro recorde no trimestre e surpreende analistas",
    excerpt: "A estatal reportou lucro líquido de R$ 32 bilhões, superando expectativas do mercado...",
    category: "Mercado",
    date: "2h atrás",
    image: "https://placehold.co/800x400/002B5C/FFFFFF?text=Not%C3%ADcia",
    featured: true,
  },
  {
    title: "Banco Central mantém Selic em 10,75% e sinaliza cautela",
    excerpt: "Copom decidiu manter a taxa básica de juros inalterada pela terceira reunião consecutiva...",
    category: "Economia",
    date: "4h atrás",
    image: "https://placehold.co/800x400/00A86B/FFFFFF?text=Selic",
  },
  {
    title: "Vale anuncia programa de recompra de ações de R$ 5 bilhões",
    excerpt: "A mineradora anunciou um novo programa de recompra visando retornar capital aos acionistas...",
    category: "Empresas",
    date: "6h atrás",
    image: "https://placehold.co/800x400/1F2937/FFFFFF?text=Vale",
  },
  {
    title: "Bitcoin ultrapassa US$ 100 mil pela primeira vez na história",
    excerpt: "A criptomoeda atingiu novo recorde histórico impulsionada por adoção institucional...",
    category: "Cripto",
    date: "8h atrás",
    image: "https://placehold.co/800x400/F59E0B/FFFFFF?text=Bitcoin",
  },
  {
    title: "Setor bancário brasileiro apresenta resultados sólidos no 3T24",
    excerpt: "Os principais bancos reportaram crescimento consistente em receita e lucro líquido...",
    category: "Setorial",
    date: "12h atrás",
    image: "https://placehold.co/800x400/3B82F6/FFFFFF?text=Bancos",
  },
];

export default function NoticiasPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-[#002B5C]">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Notícias</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Últimas Notícias</h1>
          <p className="text-gray-600">Fique por dentro do mercado financeiro</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Featured News */}
            {noticias[0] && (
              <Link href={`/noticias/0`} className="block mb-8 group">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img src={noticias[0].image} alt={noticias[0].title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#00A86B] text-white text-xs font-semibold rounded-full">{noticias[0].category}</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#002B5C] transition-colors">{noticias[0].title}</h2>
                <p className="text-gray-600">{noticias[0].excerpt}</p>
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{noticias[0].date}</span>
                </div>
              </Link>
            )}

            {/* Other News */}
            <div className="space-y-6">
              {noticias.slice(1).map((noticia, idx) => (
                <Link key={idx} href={`/noticias/${idx + 1}`} className="flex gap-4 group">
                  <div className="w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                    <img src={noticia.image} alt={noticia.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">{noticia.category}</span>
                      <span className="text-sm text-gray-500">{noticia.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#002B5C] transition-colors">{noticia.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{noticia.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mais Lidas */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Mais Lidas</h3>
              <ol className="space-y-3">
                {noticias.slice(0, 5).map((noticia, idx) => (
                  <li key={idx}>
                    <Link href={`/noticias/${idx}`} className="flex items-start gap-3 group">
                      <span className="text-2xl font-bold text-gray-300 group-hover:text-[#00A86B] transition-colors">{idx + 1}</span>
                      <span className="text-sm text-gray-700 group-hover:text-[#002B5C] transition-colors">{noticia.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            {/* Categorias */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Categorias</h3>
              <ul className="space-y-2">
                {["Mercado", "Economia", "Empresas", "Cripto", "Setorial", "Internacional"].map((cat) => (
                  <li key={cat}>
                    <Link href={`/noticias/categoria/${cat.toLowerCase()}`} className="flex items-center justify-between text-sm text-gray-700 hover:text-[#002B5C] transition-colors">
                      <span>{cat}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
