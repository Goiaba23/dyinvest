"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { 
  TrendingUp, 
  User, 
  Menu, 
  X,
  Search,
  Bell,
  Wallet,
  BarChart3,
  PieChart,
  Globe,
  Bitcoin,
  Crown,
  Calculator,
  MessageSquare,
  Home,
  Bot,
  Activity,
  ChevronDown,
  ArrowRight,
  Settings,
  LogOut
} from "lucide-react";
import { gsap } from "gsap";

interface NavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
  { href: '/mercado', label: 'Mercado', icon: <Activity className="w-5 h-5" /> },
  { href: '/analise', label: 'Análise AI', icon: <Bot className="w-5 h-5" />, badge: 'Novo' },
  { href: '/carteira', label: 'Portfólio', icon: <Wallet className="w-5 h-5" /> },
];

const marketNavItems: NavItem[] = [
  { href: '/acoes', label: 'Ações', icon: <BarChart3 className="w-4 h-4" /> },
  { href: '/etfs', label: 'ETFs', icon: <PieChart className="w-4 h-4" /> },
  { href: '/stocks', label: 'Stocks', icon: <Globe className="w-4 h-4" />, badge: 'Novo' },
  { href: '/criptos', label: 'Cripto', icon: <Bitcoin className="w-4 h-4" />, badge: 'Novo' },
  { href: '/fiis', label: 'FIIs', icon: <Calculator className="w-4 h-4" />, badge: 'Novo' },
  { href: '/commodities', label: 'Commodities', icon: <TrendingUp className="w-4 h-4" /> },
];

const toolsNavItems: NavItem[] = [
  { href: '/rankings', label: 'Rankings', icon: <Crown className="w-4 h-4" /> },
  { href: '/comparar', label: 'Comparar', icon: <ArrowRight className="w-4 h-4" /> },
  { href: '/dividendos', label: 'Dividendos', icon: <Calculator className="w-4 h-4" />, badge: 'Novo' },
  { href: '/sentinel', label: 'Sentinela', icon: <Bot className="w-4 h-4" />, badge: 'Elite' },
];

export function TopNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      setCurrentUser(session?.user || null);
      setLoading(false);
    }
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.fromTo(".mobile-menu-item", 
        { opacity: 0, x: -20 }, 
        { opacity: 1, x: 0, stagger: 0.08, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    gsap.fromTo(".nav-item", 
      { opacity: 0, y: -10 }, 
      { opacity: 1, y: 0, stagger: 0.03, duration: 0.4, delay: 0.1, ease: "power2.out" }
    );
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* Liquid Glass Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Main Nav Bar */}
        <div className="bg-[#0a0a0a]/85 backdrop-blur-[50px] border-b border-white/[0.06]">
          <div className="max-w-[1920px] mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between h-16 lg:h-18">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br from-[#adc6ff] to-[#4b8eff] flex items-center justify-center shadow-lg shadow-[#4b8eff]/40 group-hover:scale-105 transition-transform duration-300">
                  <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-[#002e69]" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-lg lg:text-xl font-bold tracking-tight text-white font-['Space_Grotesk']">
                    DY<span className="text-[#adc6ff]">invest</span>
                  </span>
                  <span className="hidden lg:inline text-[10px] text-white/25 ml-2 uppercase tracking-widest font-medium">Terminal</span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-0.5">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "nav-item flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 relative group",
                      isActive(item.href)
                        ? "text-[#adc6ff] bg-[#adc6ff]/10"
                        : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                    )}
                  >
                    <span className={cn(
                      "transition-transform duration-300",
                      isActive(item.href) ? "scale-110" : "group-hover:scale-105"
                    )}>{item.icon}</span>
                    {item.label}
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 text-[7px] bg-[#4b8eff] text-white px-1.5 py-0.5 rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}

                {/* Market Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'market' ? null : 'market')}
                    onMouseEnter={() => setActiveDropdown('market')}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300",
                      activeDropdown === 'market' || isActive('/acoes') || isActive('/etfs') || isActive('/stocks') || isActive('/criptos') || isActive('/fiis')
                        ? "text-[#adc6ff] bg-[#adc6ff]/10" 
                        : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                    )}
                  >
                    <BarChart3 className="w-4 h-4" />
                    Mercado
                    <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", activeDropdown === 'market' && "rotate-180")} />
                  </button>
                  {activeDropdown === 'market' && (
                    <div 
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="absolute top-full left-0 mt-2 w-56 bg-[#121212]/95 backdrop-blur-2xl rounded-2xl border border-white/[0.08] p-2 shadow-2xl shadow-black/50"
                    >
                      {marketNavItems.map((item, index) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center justify-between px-4 py-3 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                          onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, { x: 4, duration: 0.2 });
                          }}
                          onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, { x: 0, duration: 0.2 });
                          }}
                        >
                          <span className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">{item.icon}</span>
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="text-[8px] bg-[#4b8eff] text-white px-2 py-0.5 rounded-full font-medium">{item.badge}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tools Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'tools' ? null : 'tools')}
                    onMouseEnter={() => setActiveDropdown('tools')}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300",
                      activeDropdown === 'tools' || isActive('/rankings') || isActive('/comparar') || isActive('/dividendos')
                        ? "text-[#adc6ff] bg-[#adc6ff]/10" 
                        : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                    )}
                  >
                    <Crown className="w-4 h-4" />
                    Ferramentas
                    <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", activeDropdown === 'tools' && "rotate-180")} />
                  </button>
                  {activeDropdown === 'tools' && (
                    <div 
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="absolute top-full left-0 mt-2 w-56 bg-[#121212]/95 backdrop-blur-2xl rounded-2xl border border-white/[0.08] p-2 shadow-2xl shadow-black/50"
                    >
                      {toolsNavItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center justify-between px-4 py-3 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                        >
                          <span className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">{item.icon}</span>
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="text-[8px] bg-[#4b8eff] text-white px-2 py-0.5 rounded-full font-medium">{item.badge}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </nav>

              {/* Search & Actions */}
              <div className="flex items-center gap-2 lg:gap-4">
                {/* Search */}
                <div className="hidden md:flex items-center relative">
                  <Search className="absolute left-4 w-4 h-4 text-white/25" />
                  <input
                    type="text"
                    placeholder="Buscar ativos..."
                    className="w-44 lg:w-64 h-10 pl-11 pr-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#adc6ff]/20 focus:bg-white/[0.05] focus:w-56 lg:focus:w-72 transition-all duration-300"
                  />
                </div>

                {/* Notifications */}
                <button className="relative p-2.5 text-white/40 hover:text-white hover:bg-white/[0.06] rounded-xl transition-all duration-200">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#4b8eff] rounded-full animate-pulse"></span>
                </button>

                {/* Chat AI */}
                <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#5e5ce6] to-[#4b8eff] rounded-2xl text-sm font-semibold text-white hover:brightness-110 transition-all duration-300 shadow-lg shadow-[#5e5ce6]/30">
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden lg:inline">Assistente AI</span>
                </button>

                {/* User Menu */}
                {currentUser ? (
                  <div className="relative">
                    <button 
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 p-1.5 pr-3 bg-white/[0.04] hover:bg-white/[0.08] rounded-2xl border border-white/[0.06] transition-all duration-200"
                    >
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#adc6ff] to-[#4b8eff] flex items-center justify-center">
                        <User className="w-4 h-4 text-[#002e69]" />
                      </div>
                      <span className="hidden lg:inline text-sm text-white/70 max-w-[120px] truncate">
                        {currentUser.email?.split('@')[0]}
                      </span>
                    </button>
                    {userMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-[#121212]/95 backdrop-blur-2xl rounded-2xl border border-white/[0.08] p-2 shadow-2xl">
                        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors">
                          <Settings className="w-4 h-4" />
                          Configurações
                        </button>
                        <button 
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sair
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="hidden lg:flex items-center gap-3">
                    <Link href="/login" className="px-5 py-2.5 text-sm text-white/60 hover:text-white transition-colors">
                      Entrar
                    </Link>
                    <Link href="/register" className="px-6 py-2.5 bg-[#adc6ff] text-[#002e69] rounded-2xl text-sm font-bold hover:brightness-110 transition-all duration-300">
                      Começar
                    </Link>
                  </div>
                )}

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2.5 text-white/50 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div ref={menuRef} className="lg:hidden bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/[0.05] p-4">
            <nav className="flex flex-col gap-1">
              <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-white/20 font-medium">Principal</div>
              {[...mainNavItems].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "mobile-menu-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors",
                    isActive(item.href)
                      ? "text-[#adc6ff] bg-[#adc6ff]/10"
                      : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                  )}
                >
                  {item.icon}
                  {item.label}
                  {item.badge && (
                    <span className="text-[8px] bg-[#4b8eff] text-white px-2 py-0.5 rounded-full ml-auto">{item.badge}</span>
                  )}
                </Link>
              ))}
              <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-white/20 font-medium mt-4">Mercado</div>
              {marketNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "mobile-menu-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors",
                    isActive(item.href)
                      ? "text-[#adc6ff] bg-[#adc6ff]/10"
                      : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                  )}
                >
                  {item.icon}
                  {item.label}
                  {item.badge && (
                    <span className="text-[8px] bg-[#4b8eff] text-white px-2 py-0.5 rounded-full ml-auto">{item.badge}</span>
                  )}
                </Link>
              ))}
              <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-white/20 font-medium mt-4">Ferramentas</div>
              {toolsNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "mobile-menu-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors",
                    isActive(item.href)
                      ? "text-[#adc6ff] bg-[#adc6ff]/10"
                      : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                  )}
                >
                  {item.icon}
                  {item.label}
                  {item.badge && (
                    <span className="text-[8px] bg-[#4b8eff] text-white px-2 py-0.5 rounded-full ml-auto">{item.badge}</span>
                  )}
                </Link>
              ))}
              {!currentUser && (
                <div className="flex gap-2 mt-6 pt-4 border-t border-white/[0.05]">
                  <Link href="/login" className="flex-1 px-4 py-3 text-center text-sm text-white/60 border border-white/[0.1] rounded-xl">
                    Entrar
                  </Link>
                  <Link href="/register" className="flex-1 px-4 py-3 text-center text-sm font-bold text-[#002e69] bg-[#adc6ff] rounded-xl">
                    Começar
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="pt-16 lg:pt-18 min-h-screen">
        {children}
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/[0.05] flex items-center justify-around px-2 z-40">
        {mainNavItems.slice(0, 4).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-colors flex-shrink-0",
              isActive(item.href)
                ? "text-[#adc6ff]"
                : "text-white/30"
            )}
          >
            {item.icon}
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}