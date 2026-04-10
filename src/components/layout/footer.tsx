import Link from "next/link";
import { TrendingUp, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-display">
                DY<span className="text-gradient-neon">Invest</span>
              </span>
            </Link>
            <p className="text-slate-400 max-w-md">
              A plataforma de investimentos que usa IA para analisar o mercado global e ajudar você a entender o que acontece no mundo financeiro.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                𝕏
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                in
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                ⌘
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                ✉
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Produto</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#funcionalidades" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link href="#como-funciona" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="#precos" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Preços
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/termos" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} DYInvest. Todos os direitos reservados.</p>
          <p className="mt-2">Investir envolve riscos. Não dizemos "compre" ou "venda". Analisamos dados, fatos e notícias para você entender o mercado e tomar sua própria decisão.</p>
        </div>
      </div>
    </footer>
  );
}