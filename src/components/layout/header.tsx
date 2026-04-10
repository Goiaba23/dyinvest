"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Menu, 
  X, 
  User, 
  LogOut,
  LayoutDashboard,
  Wallet,
  BarChart3,
  List,
  PieChart,
  BookOpen
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { GlossaryModal } from "@/components/ui/tooltip";

interface HeaderProps {
  isLoggedIn?: boolean;
  user?: {
    email: string;
  } | null;
}

export function Header({ isLoggedIn = false, user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white font-display">
              DY<span className="text-gradient-neon">Invest</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link 
                  href="/carteira" 
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <Wallet className="w-4 h-4" />
                  Carteira
                </Link>
                <Link 
                  href="/analise" 
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  Análise IA
                </Link>
                <Link 
                  href="/acoes" 
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <List className="w-4 h-4" />
                  Ações
                </Link>
                <Link 
                  href="/etfs" 
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <PieChart className="w-4 h-4" />
                  ETFs
                </Link>
                <button 
                  onClick={() => setGlossaryOpen(true)}
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Glossário
                </button>
              </>
            ) : (
              <>
                <Link href="#funcionalidades" className="text-slate-300 hover:text-white transition-colors">
                  Funcionalidades
                </Link>
                <Link href="#como-funciona" className="text-slate-300 hover:text-white transition-colors">
                  Como Funciona
                </Link>
                <Link href="#precos" className="text-slate-300 hover:text-white transition-colors">
                  Preços
                </Link>
                <button 
                  onClick={() => setGlossaryOpen(true)}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Glossário
                </button>
              </>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-300">{user?.email}</span>
                </div>
                <Button variant="ghost" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Entrar</Button>
                </Link>
                <Link href="/register">
                  <Button>Começar Agora</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <nav className="flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">
                    Dashboard
                  </Link>
                  <Link href="/carteira" className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">
                    Carteira
                  </Link>
                  <Link href="/analise" className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">
                    Análise IA
                  </Link>
                  <Link href="/acoes" className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">
                    Ações
                  </Link>
                  <Link href="/etfs" className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">
                    ETFs
                  </Link>
                  <button 
                    onClick={() => { setGlossaryOpen(true); setMobileMenuOpen(false); }}
                    className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg text-left"
                  >
                    Glossário
                  </button>
                  <div className="border-t border-slate-800 pt-2 mt-2">
                    <span className="px-4 text-sm text-slate-500">{user?.email}</span>
                    <Button variant="ghost" className="w-full mt-2 justify-start">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="#funcionalidades" className="px-4 py-2 text-slate-300">
                    Funcionalidades
                  </Link>
                  <Link href="#como-funciona" className="px-4 py-2 text-slate-300">
                    Como Funciona
                  </Link>
                  <Link href="#precos" className="px-4 py-2 text-slate-300">
                    Preços
                  </Link>
                  <button 
                    onClick={() => { setGlossaryOpen(true); setMobileMenuOpen(false); }}
                    className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg text-left"
                  >
                    Glossário
                  </button>
                  <div className="border-t border-slate-800 pt-2 mt-2">
                    <Link href="/login">
                      <Button variant="outline" className="w-full">Entrar</Button>
                    </Link>
                    <Link href="/register">
                      <Button className="w-full mt-2">Começar Agora</Button>
                    </Link>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>

      <GlossaryModal isOpen={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
    </header>
  );
}