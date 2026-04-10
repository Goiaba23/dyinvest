"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { HelpCircle, X } from "lucide-react";
import { GlossaryTerm, GLOSSARY } from "@/lib/ia/glossary";

interface TooltipProps {
  term?: string;
  definition?: string;
  acronym?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Tooltip({ term, definition, className }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

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
              <p className="text-white font-medium text-sm">{term}</p>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-slate-300 text-xs">{definition}</p>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-slate-800 border-r border-b border-slate-600 rotate-45" />
          </div>
      )}
    </span>
  );
}

interface HighlightTooltipProps {
  children: React.ReactNode;
  term: string;
  definition: string;
  className?: string;
}

export function HighlightTooltip({ children, term, definition, className }: HighlightTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

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
      
      {isOpen && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-xl">
            <div className="flex items-center justify-between mb-1">
              <p className="text-white font-medium text-sm">{term}</p>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-slate-300 text-xs">{definition}</p>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-slate-800 border-r border-b border-slate-600 rotate-45" />
          </div>
      )}
    </span>
  );
}

interface GlossaryTermTooltipProps {
  acronym: string;
  className?: string;
}

export function GlossaryTermTooltip({ acronym, className }: GlossaryTermTooltipProps) {
  const term = GLOSSARY.find(t => t.acronym.toLowerCase() === acronym.toLowerCase());
  
  if (!term) {
    return <span className={className}>{acronym}</span>;
  }

  return (
    <Tooltip term={term.fullName} definition={term.description} className={className}>
      <span className="text-blue-400 underline decoration-dotted cursor-help">
        {term.acronym}
      </span>
    </Tooltip>
  );
}

interface AutoHighlightTextProps {
  text: string;
  className?: string;
}

export function AutoHighlightText({ text, className }: AutoHighlightTextProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  const buildHighlightedJSX = () => {
    let remainingText = text;
    const parts: React.ReactNode[] = [];
    let key = 0;

    GLOSSARY.forEach(term => {
      const regex = new RegExp(`\\b(${term.acronym.replace('/', '\\/')})\\b`, 'gi');
      
      const matches = text.match(regex);
      if (matches && matches.length > 0) {
        const segments = text.split(regex);
        
        segments.forEach((segment, index) => {
          if (segment.toLowerCase() === term.acronym.toLowerCase()) {
            parts.push(
              <button
                key={`${key}-${index}`}
                onClick={() => { setSelectedTerm(term); setIsOpen(true); }}
                className="text-blue-400 underline decoration-dotted hover:text-blue-300 transition-colors"
              >
                {segment}
              </button>
            );
          } else if (segment) {
            parts.push(segment);
          }
        });
      }
    });

    if (parts.length === 0) return text;
    
    return parts;
  };

  return (
    <>
      <span className={className}>{buildHighlightedJSX()}</span>
      
      {isOpen && selectedTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setIsOpen(false)}>
          <div className="bg-slate-800 border border-slate-600 rounded-xl p-6 max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold text-lg">{selectedTerm.acronym}</h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-blue-400 font-medium mb-2">{selectedTerm.fullName}</p>
            <p className="text-slate-300 text-sm">{selectedTerm.description}</p>
            <div className="mt-3 pt-3 border-t border-slate-700">
              <span className="text-slate-500 text-xs capitalize">Categoria: {selectedTerm.category.replace('_', ' ')}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export const GLOSSARY_TERMS = GLOSSARY;
export { GLOSSARY };