import Link from "next/link";

const footerLinks = {
  "DYInvest": [
    { label: "Sobre Nós", href: "/sobre" },
    { label: "Carreiras", href: "/carreiras" },
    { label: "Imprensa", href: "/imprensa" },
    { label: "Contato", href: "/contato" },
  ],
  "Produtos": [
    { label: "Ações", href: "/acoes" },
    { label: "FIIs", href: "/etfs" },
    { label: "Criptomoedas", href: "/criptos" },
    { label: "Renda Fixa", href: "/renda-fixa" },
    { label: "BDRs", href: "/bdrs" },
    { label: "ETFs", href: "/etfs" },
  ],
  "Ferramentas": [
    { label: "Calculadoras", href: "/calculadoras" },
    { label: "Comparador", href: "/comparar" },
    { label: "Rankings", href: "/rankings" },
    { label: "Rastreador", href: "/rastreador" },
    { label: "Análise IA", href: "/analise" },
    { label: "Notícias", href: "/noticias" },
  ],
  "Educação": [
    { label: "Cursos", href: "/aprender" },
    { label: "Glossário", href: "/glossario" },
    { label: "Artigos", href: "/artigos" },
    { label: "Tutorial", href: "/tutorial" },
  ],
  "Legal": [
    { label: "Termos de Uso", href: "/termos" },
    { label: "Política de Privacidade", href: "/privacidade" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Cookies", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-600 hover:text-[#002B5C] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#00A86B] rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">D</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">DYInvest</span>
            </div>
            
            <p className="text-sm text-gray-500 text-center">
              © {new Date().getFullYear()} DYInvest. Todos os direitos reservados. Dados meramente informativos. Não constitui recomendação de investimento.
            </p>

            <div className="flex items-center gap-4">
              <Link href="https://twitter.com" className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
