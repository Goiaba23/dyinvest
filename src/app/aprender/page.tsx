"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { 
  GraduationCap,
  Play,
  BookOpen,
  Lightbulb,
  ChevronRight,
  Search,
  Star,
  Award,
  Clock,
  ArrowRight,
  BookMarked,
  Brain,
  Target,
  Zap
} from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: 'iniciante' | 'intermediario' | 'avancado';
  category: string;
  icon: any;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'O que é ações?',
    description: 'Entenda o básico de ações e como ganar dinheiro com elas.',
    duration: '5 min',
    level: 'iniciante',
    category: 'Básico',
    icon: BookOpen
  },
  {
    id: 2,
    title: 'O que é FII?',
    description: 'Fundos Imobiliários explicados de forma simples.',
    duration: '4 min',
    level: 'iniciante',
    category: 'Básico',
    icon: BookOpen
  },
  {
    id: 3,
    title: 'O que são ETFs?',
    description: 'Investir em índices de forma fácil e diversificada.',
    duration: '4 min',
    level: 'iniciante',
    category: 'Básico',
    icon: BookOpen
  },
  {
    id: 4,
    title: 'Tesouro Direto',
    description: 'Investimento mais seguro do Brasil explicado.',
    duration: '6 min',
    level: 'iniciante',
    category: 'Renda Fixa',
    icon: Award
  },
  {
    id: 5,
    title: 'Análise Fundamentalista',
    description: 'Como avaliar uma empresa antes de comprar sua ação.',
    duration: '8 min',
    level: 'intermediario',
    category: 'Análise',
    icon: Brain
  },
  {
    id: 6,
    title: 'Diversificação de Portfólio',
    description: 'Por que não colocar todos os ovos na mesma cesta.',
    duration: '6 min',
    level: 'intermediario',
    category: 'Análise',
    icon: Target
  },
];

const levelColors = {
  iniciante: { bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30', text: 'text-green-400' },
  intermediario: { bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30', text: 'text-blue-400' },
  avancado: { bg: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', text: 'text-purple-400' }
};

export default function AprenderPage() {
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(lessons.map(l => l.category))];
  
  const filteredLessons = lessons.filter(l => {
    const matchSearch = !search || l.title.toLowerCase().includes(search.toLowerCase()) || l.description.toLowerCase().includes(search.toLowerCase());
    const matchLevel = !selectedLevel || l.level === selectedLevel;
    const matchCategory = !selectedCategory || l.category === selectedCategory;
    return matchSearch && matchLevel && matchCategory;
  });

  return (
    <div className="min-h-screen bg-void bg-aurora bg-grid">
      <main className="pt-20 pb-24 lg:pt-8 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-display flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
              <GraduationCap className="w-6 h-6 text-purple-400" />
            </div>
            Aprenda a <span className="text-gradient-neon">Investir</span>
          </h1>
          <p className="text-slate-400 text-lg ml-15">Cursos gratuitos para você entender o mercado antes de investir</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Buscar curso (ex: ações, FII)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all card-elevated"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedLevel(null)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-medium transition-all",
              selectedLevel === null 
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25" 
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700/50"
            )}
          >
            Todos os Níveis
          </button>
          {Object.entries(levelColors).map(([level, colors]) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-medium transition-all capitalize",
                selectedLevel === level 
                  ? `bg-gradient-to-r ${colors.bg} text-white shadow-lg border ${colors.border}` 
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700/50"
              )}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm transition-all",
              selectedCategory === null 
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                : "bg-slate-800/30 text-slate-400 border border-transparent"
            )}
          >
            Todas as Categorias
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm transition-all",
                selectedCategory === cat 
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                  : "bg-slate-800/30 text-slate-400 border border-transparent"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredLessons.map(lesson => {
            const Icon = lesson.icon;
            const colors = levelColors[lesson.level as keyof typeof levelColors];
            
            return (
              <Card key={lesson.id} variant="glass" className="card-elevated hover:scale-[1.02] transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br", colors.bg, "border", colors.border)}>
                      <Icon className={cn("w-7 h-7", colors.text)} />
                    </div>
                    <span className={cn("text-xs px-3 py-1 rounded-full font-medium border", colors.bg, colors.border, colors.text)}>
                      {lesson.level}
                    </span>
                  </div>
                  
                  <h3 className="text-white font-bold text-lg mb-2">{lesson.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">{lesson.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{lesson.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-cyan-400 font-medium text-sm">
                      <span>Assistir</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-16 card-elevated rounded-2xl">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">Nenhum curso encontrado.</p>
          </div>
        )}
      </main>
    </div>
  );
}
