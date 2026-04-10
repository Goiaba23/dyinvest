"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  User, 
  LogOut,
  LayoutDashboard,
  Wallet,
  BarChart3,
  List,
  PieChart,
  Bell,
  GraduationCap,
  MessageCircle,
  Settings,
  Home,
  TrendingDown,
  Bot,
  Activity,
  MessageSquare,
  Calendar,
  Search,
  ArrowRightLeft,
  Bitcoin,
  Globe,
  TrendingUpDown,
  Crown,
  Calculator,
  Newspaper,
  FileText,
  Shield,
  PiggyBank,
  Heart,
  DollarSign,
  HelpCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FloatingHelp } from "@/components/floating-help";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Início', icon: <Home className="w-5 h-5" /> },
  { href: '/mercado', label: 'Mercado', icon: <Activity className="w-5 h-5" /> },
  { href: '/analise', label: 'Análise', icon: <Bot className="w-5 h-5" /> },
  { href: '/analise-detalhada', label: 'Análise AI', icon: <Bot className="w-5 h-5" />, badge: 'Novo' },
  { href: '/carteira', label: 'Portfólio', icon: <Wallet className="w-5 h-5" /> },
];

const toolsNavItems: NavItem[] = [
  { href: '/sentinel', label: 'Sentinela Alpha', icon: <Heart className="w-5 h-5" />, badge: 'Elite' },
  { href: '/dividendos-projecao', label: 'Projeção', icon: <DollarSign className="w-5 h-5" />, badge: 'Pro' },
  { href: '/rankings', label: 'Rankings', icon: <Crown className="w-5 h-5" /> },
  { href: '/comparar', label: 'Comparar', icon: <ArrowRightLeft className="w-5 h-5" /> },
  { href: '/dividendos', label: 'Proventos', icon: <Calendar className="w-5 h-5" />, badge: 'Elite' },
  { href: '/rastreador', label: 'Rastreador', icon: <Search className="w-5 h-5" /> },
];

const calcNavItems: NavItem[] = [
  { href: '/calculadoras', label: 'Calculadoras', icon: <Calculator className="w-5 h-5" /> },
  { href: '/calculadoras-fundamentalistas', label: 'Fund.', icon: <PiggyBank className="w-5 h-5" />, badge: 'Novo' },
  { href: '/calculadora-reserva', label: 'Reserva', icon: <Shield className="w-5 h-5" /> },
  { href: '/irpf', label: 'IRPF', icon: <FileText className="w-5 h-5" />, badge: 'Novo' },
];

const marketNavItems: NavItem[] = [
  { href: '/acoes', label: 'Ações', icon: <BarChart3 className="w-5 h-5" /> },
  { href: '/etfs', label: 'ETPs', icon: <PieChart className="w-5 h-5" /> },
  { href: '/stocks', label: 'Stocks', icon: <Globe className="w-5 h-5" />, badge: 'Novo' },
  { href: '/criptos', label: 'Criptos', icon: <Bitcoin className="w-5 h-5" />, badge: 'Novo' },
  { href: '/commodities', label: ' Commodities', icon: <TrendingUpDown className="w-5 h-5" />, badge: 'Novo' },
  { href: '/alertas', label: 'Alertas', icon: <Bell className="w-5 h-5" /> },
  { href: '/aprender', label: 'Aprender', icon: <GraduationCap className="w-5 h-5" /> },
];

export function Header({ isLoggedIn = false, user }: { isLoggedIn?: boolean; user?: { email: string; name?: string } | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <>
      {/* Desktop - Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-20 flex-col bg-slate-900 border-r border-slate-800 z-40">
        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-slate-800">
          <Link href="/" className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold text-white">Invest<span className="text-emerald-400">10</span></span>
          </Link>
        </div>

        {/* Navigation - Main */}
        <nav className="flex-1 flex flex-col items-center py-4 gap-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                pathname === item.href
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
              title={item.label}
            >
              {item.icon}
            </Link>
          ))}
          
          <div className="w-10 h-[1px] bg-slate-700 my-2" />
          
          {/* Tools Section */}
          {toolsNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all relative",
                pathname === item.href
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
              title={item.label}
            >
              {item.icon}
              {item.badge && (
                <span className="absolute -top-1 -right-1 text-[8px] bg-blue-500 text-white px-1 rounded">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}

          <div className="w-10 h-[1px] bg-slate-700 my-2" />
          
          {/* Calculators Section */}
          {calcNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all relative",
                pathname === item.href
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
              title={item.label}
            >
              {item.icon}
              {item.badge && (
                <span className="absolute -top-1 -right-1 text-[8px] bg-blue-500 text-white px-1 rounded">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
          
          <div className="w-10 h-[1px] bg-slate-700 my-2" />
          
          {/* Market Section */}
          {marketNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all relative",
                pathname === item.href
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
              title={item.label}
            >
              {item.icon}
              {item.badge && (
                <span className="absolute -top-1 -right-1 text-[8px] bg-blue-500 text-white px-1 rounded">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Chat IA Button */}
        <div className="px-2 pb-2">
          <button
            onClick={() => setChatOpen(true)}
            className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg shadow-purple-500/20"
            title="Chat com IA"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>

        {/* User */}
        <div className="h-20 flex flex-col items-center justify-center border-t border-slate-800 gap-2">
          {currentUser ? (
            <button 
              onClick={handleLogout}
              className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 transition-all group relative"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
              <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
                Sair ({currentUser.email?.split('@')[0]})
              </span>
            </button>
          ) : (
            <Link href="/login" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all">
              <User className="w-5 h-5" />
            </Link>
          )}
        </div>
      </aside>

      {/* Floating Help Button */}
      <FloatingHelp />

      {/* Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/50">
          <div className="w-full max-w-lg h-[600px] bg-slate-900 rounded-t-2xl lg:rounded-2xl border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">DYInvest IA</p>
                  <p className="text-slate-400 text-xs">Online • Análise em tempo real</p>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="p-2 text-slate-400 hover:text-white"
              >
                <TrendingDown className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 h-[460px] overflow-y-auto">
              <div className="flex gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-slate-800 rounded-xl p-3 max-w-[80%]">
                  <p className="text-white text-sm">
                    Olá! Sou a IA do DYInvest. Posso analisar o mercado, explicar notícias, 
                    calcular probabilidades e ajudar com seus investimentos. O que você quer saber?
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-800">
              <input 
                type="text" 
                placeholder="Digite sua pergunta..."
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile/Tablet - Bottom Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900 border-t border-slate-800 z-40 flex items-center justify-around px-2 overflow-x-auto">
        {mainNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors flex-shrink-0",
              pathname === item.href
                ? "text-emerald-400"
                : "text-slate-400"
            )}
          >
            {item.icon}
            <span className="text-[10px] mt-1">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Main Content Offset */}
      <div className="lg:ml-20">
        {/* Top Bar (mobile only) */}
        <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-slate-900/90 backdrop-blur border-b border-slate-800 z-50">
          <div className="flex items-center justify-between h-full px-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Invest<span className="text-emerald-400">10</span></span>
            </Link>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setChatOpen(true)}
                className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"
              >
                <MessageSquare className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 text-slate-400">
                <Bell className="w-5 h-5" />
              </button>
              <button className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                <User className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}