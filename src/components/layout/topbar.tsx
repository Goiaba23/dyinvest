"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { 
  Search, Bell, Sun, Moon, Menu, X,
  TrendingUp, ChevronDown, Sparkles,
  Wallet, Newspaper, Globe
} from "lucide-react";

export default function TopBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const topbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topbarRef.current) {
      gsap.from(".topbar-item", {
        y: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <>
      <div 
        ref={topbarRef}
        className="fixed top-0 left-[80px] right-0 h-16 bg-[#121216]/80 backdrop-blur-xl border-b border-[#252529] flex items-center justify-between px-6 z-30"
      >
        {/* Left Section - Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden topbar-item p-2 rounded-xl hover:bg-[#1E1E1E] transition-all duration-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-zinc-300" /> : <Menu className="w-5 h-5 text-zinc-300" />}
          </button>

          {/* Search */}
          <div className={`topbar-item ${searchOpen ? "w-96" : "w-64"} transition-all duration-300`}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Buscar ativos, notícias..."
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
                className="w-full bg-[#0a0a0c] border border-[#252529] rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Live Indicator */}
          <div className="topbar-item hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-medium text-emerald-400">AO VIVO</span>
          </div>

          {/* Quick Actions */}
          <button className="topbar-item p-2 rounded-xl hover:bg-[#1E1E1E] transition-all duration-200 relative">
            <Sparkles className="w-5 h-5 text-zinc-400" />
          </button>

          <button className="topbar-item p-2 rounded-xl hover:bg-[#1E1E1E] transition-all duration-200 relative">
            <Bell className="w-5 h-5 text-zinc-400" />
            <div className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">3</span>
            </div>
          </button>

          {/* User Menu */}
          <button className="topbar-item flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-[#1E1E1E] transition-all duration-200 border border-[#252529]">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-xs font-bold text-white">U</span>
            </div>
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-64 h-full bg-[#121216] border-r border-[#252529] p-4" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-2 mt-16">
              {[
                { href: "/dashboard", label: "Dashboard", icon: TrendingUp },
                { href: "/mercado", label: "Mercado", icon: Globe },
                { href: "/carteira", label: "Carteira", icon: Wallet },
                { href: "/noticias", label: "Notícias", icon: Newspaper },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-[#1E1E1E] transition-all duration-200"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
