"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { HelpCircle, X, BookOpen, Search } from "lucide-react";
import { GLOSSARY, GlossaryTerm, getTerm, searchTerms } from "@/lib/ia/glossary";

interface TooltipProps {
  term?: string;
  definition?: string;
  acronym?: string;
  className?: string;
}

export function Tooltip({ term, definition, acronym, className }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  let termData: GlossaryTerm | undefined;
  if (acronym) {
    termData = getTerm(acronym);
  }

  const displayTerm = term || termData?.fullName || acronym || '';
  const displayDef = definition || termData?.description || '';

  if (!displayTerm) return null;

  return (
    <span className={cn("relative inline-block", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium cursor-help hover:bg-blue-500/30 transition-colors"
      >
        ?
      </button>
      
      {isOpen && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-xl">
            <div className="flex items-center justify-between mb-1">
              <p className="text-white font-medium text-sm">{displayTerm}</p>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-slate-300 text-xs">{displayDef}</p>
            {termData && (
              <div className="mt-2 pt-2 border-t border-slate-700">
                <span className="text-slate-500 text-xs capitalize">{termData.category.replace('_', ' ')}</span>
              </div>
            )}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-slate-800 border-r border-b border-slate-600 rotate-45" />
          </div>
      )}
    </span>
  );
}

interface HighlightTooltipProps {
  children: React.ReactNode;
  term?: string;
  definition?: string;
  acronym?: string;
  className?: string;
}

export function HighlightTooltip({ children, term, definition, acronym, className }: HighlightTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  let termData: GlossaryTerm | undefined;
  if (acronym) {
    termData = getTerm(acronym);
  }

  const displayTerm = term || termData?.fullName || acronym || '';
  const displayDef = definition || termData?.description || '';

  return (
    <span 
      className={cn("relative inline-flex items-center gap-1 cursor-help", className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="text-blue-300 underline decoration-dotted decoration-blue-400">
        {children}
      </span>
      <HelpCircle className="w-4 h-4 text-blue-400" />
      
      {isOpen && displayTerm && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-xl">
            <div className="flex items-center justify-between mb-1">
              <p className="text-white font-medium text-sm">{displayTerm}</p>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-slate-300 text-xs">{displayDef}</p>
            {termData && (
              <div className="mt-2 pt-2 border-t border-slate-700">
                <span className="text-slate-500 text-xs capitalize">{termData.category.replace('_', ' ')}</span>
              </div>
            )}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-slate-800 border-r border-b border-slate-600 rotate-45" />
          </div>
      )}
    </span>
  );
}

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlossaryModal({ isOpen, onClose }: GlossaryModalProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(GLOSSARY.map(t => t.category))];
  
  const filteredTerms = GLOSSARY.filter(term => {
    const matchSearch = !search || 
      term.acronym.toLowerCase().includes(search.toLowerCase()) ||
      term.fullName.toLowerCase().includes(search.toLowerCase()) ||
      term.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !selectedCategory || term.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Glossário Financeiro</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar termo..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                selectedCategory === null ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-300"
              )}
            >
              Todos
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-colors capitalize",
                  selectedCategory === cat ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-300"
                )}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-96">
          <div className="grid gap-3">
            {filteredTerms.map((term, index) => (
              <div key={index} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-blue-400 font-bold">{term.acronym}</span>
                  <span className="text-slate-500 text-xs capitalize">({term.category.replace('_', ' ')})</span>
                </div>
                <p className="text-white font-medium text-sm mb-1">{term.fullName}</p>
                <p className="text-slate-400 text-xs">{term.description}</p>
              </div>
            ))}
          </div>
          
          {filteredTerms.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-500">Nenhum termo encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const GLOSSARY_TERMS = GLOSSARY;
export { GLOSSARY, getTerm, searchTerms };