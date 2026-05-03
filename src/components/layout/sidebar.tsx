"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, BarChart3, TrendingUp, Wallet, Newspaper, 
  BookOpen, Calculator, Search, Bell, Settings,
  ChevronLeft, ChevronRight, LogOut, User,
  LineChart, PieChart, Shield, Zap, Globe,
  Layers, Target, Calendar, DollarSign
} from "lucide-react";

const menuItems = [
  { href: "/dashboard", icon: Home, label: "Início", badge: null },
  { href: "/mercado", icon: Globe, label: "Mercado", badge: null },
  { href: "/analise", icon: Zap, label: "Análise IA", badge: "NEW" },
  { href: "/carteira", icon: Wallet, label: "Carteira", badge: null },
  { href: "/noticias", icon: Newspaper, label: "Notícias", badge: "3" },
  { href: "/alertas", icon: Bell, label: "Alertas", badge: null },
  { href: "/comparar", icon: BarChart3, label: "Comparar", badge: null },
  { href: "/aprender", icon: BookOpen, label: "Aprender", badge: null },
];

const secondaryItems = [
  { href: "/acoes", icon: TrendingUp, label: "Ações" },
  { href: "/etfs", icon: PieChart, label: "ETFs" },
  { href: "/criptos", icon: DollarSign, label: "Cripto" },
  { href: "/renda-fixa", icon: Shield, label: "Renda Fixa" },
  { href: "/tesouro", icon: Target, label: "Tesouro" },
  { href: "/fundos", icon: Layers, label: "Fundos" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(".sidebar-item", 
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.03, ease: "power2.out" }
      );
    }
  }, [collapsed]);

  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/") return true;
    return pathname?.startsWith(href);
  };

  return (
    <div 
      ref={sidebarRef}
      className={`fixed left-0 top-0 h-screen bg-[#121216] border-r border-[#252529] flex flex-col transition-all duration-300 ${
        collapsed ? "w-[80px]" : "w-[260px]"
      } z-40`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-[#252529] px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          {!collapsed && (
            <span className="font-bold text-white text-lg">DYInvest</span>
          )}
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="mb-6">
          {!collapsed && (
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3 px-3">
              Principal
            </p>
          )}
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                  isActive(item.href)
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    : "text-zinc-400 hover:bg-[#1E1E1E] hover:text-white"
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${
                  isActive(item.href) ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300"
                }`} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.badge === "NEW" 
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {collapsed && item.badge && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white">{item.badge === "NEW" ? "N" : item.badge}</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Secondary Items */}
        <div>
          {!collapsed && (
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3 px-3">
              Ativos
            </p>
          )}
          <div className="space-y-1">
            {secondaryItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive(item.href)
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-zinc-400 hover:bg-[#1E1E1E] hover:text-white"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${
                  isActive(item.href) ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300"
                }`} />
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* User Section */}
      <div className="border-t border-[#252529] p-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Usuário</p>
              <p className="text-[10px] text-zinc-500">Plano Gratuito</p>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <button className="sidebar-item flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-zinc-400 hover:bg-[#1E1E1E] hover:text-white transition-all duration-200">
            <Settings className="w-4 h-4" />
            {!collapsed && <span className="text-xs">Config</span>}
          </button>
          <button className="sidebar-item flex items-center justify-center px-3 py-2 rounded-xl text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-[#121216] border border-[#252529] rounded-full flex items-center justify-center hover:border-zinc-700 transition-all duration-200 z-10"
      >
        {collapsed ? 
          <ChevronRight className="w-3 h-3 text-zinc-500" /> : 
          <ChevronLeft className="w-3 h-3 text-zinc-500" />
        }
      </button>
    </div>
  );
}
