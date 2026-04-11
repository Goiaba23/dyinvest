import Link from "next/link";
import { TrendingUp, BarChart3, Wallet, FileText, Brain, Shield, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    produto: [
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/acoes', label: 'Ações' },
      { href: '/fiis', label: 'FIIs' },
      { href: '/criptos', label: 'Cripto' },
    ],
    analise: [
      { href: '/analise', label: 'Análise IA' },
      { href: '/sentinel', label: 'Sentinel' },
      { href: '/rankings', label: 'Rankings' },
      { href: '/comparar', label: 'Comparar' },
    ],
    ferramentas: [
      { href: '/carteira', label: 'Carteira' },
      { href: '/alertas', label: 'Alertas' },
      { href: '/calendario', label: 'Calendário' },
      { href: '/calculadoras', label: 'Calculadoras' },
    ],
  };

  return (
    <footer className="bg-[#0a0a0c] border-t border-white/[0.06]">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/dashboard" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7dd3fc] to-[#0ea5e9] flex items-center justify-center shadow-lg shadow-[#7dd3fc]/20 group-hover:scale-105 transition-transform">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-display font-bold text-white tracking-tight">
                DY<span className="text-[#7dd3fc]">Invest</span>
              </span>
            </Link>
            <p className="text-[#52525b] text-xs leading-relaxed max-w-[240px] mb-4">
              Plataforma de investimentos com IA para análise do mercado brasileiro.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="text-[#52525b] hover:text-[#7dd3fc] transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="#" className="text-[#52525b] hover:text-[#7dd3fc] transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="#" className="text-[#52525b] hover:text-[#7dd3fc] transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Produto */}
          <div>
            <h4 className="text-[#71717a] text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <BarChart3 className="w-3 h-3" />
              Produto
            </h4>
            <ul className="space-y-2">
              {footerLinks.produto.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#a1a1aa] text-xs hover:text-[#7dd3fc] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Análise */}
          <div>
            <h4 className="text-[#71717a] text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Brain className="w-3 h-3" />
              Análise
            </h4>
            <ul className="space-y-2">
              {footerLinks.analise.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#a1a1aa] text-xs hover:text-[#7dd3fc] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ferramentas */}
          <div>
            <h4 className="text-[#71717a] text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Wallet className="w-3 h-3" />
              Ferramentas
            </h4>
            <ul className="space-y-2">
              {footerLinks.ferramentas.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#a1a1aa] text-xs hover:text-[#7dd3fc] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[#71717a] text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Shield className="w-3 h-3" />
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/termos" className="text-[#a1a1aa] text-xs hover:text-[#7dd3fc] transition-colors">
                  Termos
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-[#a1a1aa] text-xs hover:text-[#7dd3fc] transition-colors">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-[#a1a1aa] text-xs hover:text-[#7dd3fc] transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[#52525b] text-[10px]">
            © {currentYear} DYInvest. Todos os direitos reservados.
          </p>
          <p className="text-[#3f3f46] text-[9px] text-center md:text-right max-w-md">
            Investir envolve riscos. Não oferecemos recomendações de compra ou venda.
          </p>
        </div>
      </div>
    </footer>
  );
}