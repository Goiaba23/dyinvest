"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { Search, Menu, X, ChevronDown, Star, TrendingUp, Trophy, Newspaper, Brain, Calculator, BookOpen } from "lucide-react";
import { microInteractions } from "@/lib/animations";

const navItems = [
  {
    label: "Ideias",
    icon: Star,
    columns: [
      {
        title: "Investimento Inteligente",
        links: [
          { label: "Maiores Dividendos", href: "/acoes/rankings/dy" },
          { label: "Encontre Oportunidades", href: "/acoes/rankings" },
          { label: "Ações para Iniciantes", href: "/aprender" },
          { label: "Mantenha-se Informado", href: "/noticias" },
          { label: "Ativos Mais Buscados", href: "/acoes" },
          { label: "Imposto de Renda", href: "/irpf" },
        ]
      }
    ]
  },
  {
    label: "Ações",
    icon: TrendingUp,
    columns: [
      {
        title: "Ações",
        links: [
          { label: "Todas as Ações", href: "/acoes" },
          { label: "Rankings", href: "/acoes/rankings" },
          { label: "Mais Buscadas", href: "/acoes/mais-buscadas" },
          { label: "Por Setor", href: "/acoes/setores" },
          { label: "Agenda de Dividendos", href: "/dividendos" },
          { label: "Comparador de Ações", href: "/comparar" },
          { label: "Rastreador de Carteira", href: "/rastreador" },
        ]
      }
    ]
  },
  {
    label: "FIIs",
    icon: TrendingUp,
    columns: [
      {
        title: "Fundos Imobiliários",
        links: [
          { label: "Todos os FIIs", href: "/etfs" },
          { label: "Rankings", href: "/rankings" },
          { label: "Mais Buscados", href: "/etfs/mais-buscados" },
          { label: "Por Segmento", href: "/etfs/segmentos" },
          { label: "Agenda de Dividendos", href: "/dividendos" },
          { label: "Comparador de FIIs", href: "/comparar" },
        ]
      }
    ]
  },
  {
    label: "Cripto",
    icon: TrendingUp,
    columns: [
      {
        title: "Criptomoedas",
        links: [
          { label: "Todas as Criptos", href: "/criptos" },
          { label: "Rankings", href: "/rankings" },
          { label: "Mais Buscadas", href: "/criptos/mais-buscadas" },
          { label: "Análise IA", href: "/analise" },
        ]
      }
    ]
  },
  {
    label: "Notícias",
    icon: Newspaper,
    href: "/noticias"
  },
  {
    label: "Análise IA",
    icon: Brain,
    href: "/analise"
  },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Scroll effect for header
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      // Animate header on mount
      gsap.from(headerRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out"
      });
    }
  }, []);

  return (
    <header ref={headerRef} className={`bg-white border-b transition-all duration-300 sticky top-0 z-50 ${scrolled ? 'shadow-md' : 'border-gray-200'}`}>
      {/* Top Bar */}
      <div className="bg-[#002B5C] text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-white/80">Investimento Inteligente com IA</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-white/80 hover:text-white transition-colors">Entrar</Link>
            <Link href="/register" className="bg-[#00A86B] text-white px-4 py-1 rounded hover:bg-[#008F5B] transition-colors">Cadastrar</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#00A86B] rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold text-[#002B5C]">DYInvest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.href ? (
                  <Link href={item.href} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1e40af] transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1e40af] transition-colors flex items-center gap-1">
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                )}

                {/* Dropdown Menu */}
                {activeDropdown === item.label && !item.href && item.columns && (
                  <div className="absolute top-full left-0 mt-0 w-96 bg-white rounded-lg shadow-lg border border-gray-200 py-4 z-50">
                    {item.columns.map((col, idx) => (
                      <div key={idx} className="px-4">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{col.title}</h3>
                        <ul className="space-y-1">
                          {col.links.map((link) => (
                            <li key={link.label}>
                              <Link href={link.href} className="block px-2 py-1.5 text-sm text-gray-700 hover:text-[#002B5C] hover:bg-gray-50 rounded transition-colors">
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center gap-3">
            <Link href="/calculadoras" className="hidden md:flex items-center gap-1 px-3 py-2 text-sm text-gray-700 hover:text-[#002B5C] transition-colors">
              <Calculator className="w-4 h-4" />
              <span>Calculadoras</span>
            </Link>
            <Link href="/aprender" className="hidden md:flex items-center gap-1 px-3 py-2 text-sm text-gray-700 hover:text-[#002B5C] transition-colors">
              <BookOpen className="w-4 h-4" />
              <span>Aprender</span>
            </Link>
            
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-[#002B5C]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 py-4">
          <nav className="max-w-7xl mx-auto px-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.href ? (
                  <Link href={item.href} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#002B5C] hover:bg-gray-50 rounded">
                    {item.label}
                  </Link>
                ) : (
                  <div className="px-3 py-2 text-sm font-medium text-gray-700">
                    {item.label}
                    <ul className="ml-4 mt-2 space-y-1">
                      {item.columns?.map((col, idx) => (
                        col.links.map((link) => (
                          <li key={link.label}>
                            <Link href={link.href} className="block px-2 py-1 text-sm text-gray-600 hover:text-[#002B5C]">
                              {link.label}
                            </Link>
                          </li>
                        ))
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Link href="/calculadoras" className="block px-3 py-2 text-sm text-gray-700 hover:text-[#002B5C]">Calculadoras</Link>
              <Link href="/aprender" className="block px-3 py-2 text-sm text-gray-700 hover:text-[#002B5C]">Aprender</Link>
              <Link href="/login" className="block px-3 py-2 text-sm text-[#002B5C] font-medium">Entrar</Link>
              <Link href="/register" className="block px-3 py-2 text-sm bg-[#00A86B] text-white rounded text-center">Cadastrar</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
