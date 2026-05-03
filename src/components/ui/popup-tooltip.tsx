"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";
import { GLOSSARY, GlossaryTerm } from "@/lib/ia/glossary";

interface PopupTooltipProps {
  acronym: string;
  className?: string;
}

export function PopupTooltip({ acronym, className }: PopupTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const term = GLOSSARY.find(t => t.acronym.toLowerCase() === acronym.toLowerCase());
  
  if (!term) {
    return (
      <span className={cn("inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-500/20 text-slate-400 text-xs font-medium cursor-help", className)}>
        ?
      </span>
    );
  }

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
          <p className="text-white font-bold text-sm mb-1">{term.acronym}</p>
          <p className="text-blue-300 text-xs mb-2">{term.fullName}</p>
          <p className="text-slate-300 text-xs">{term.description}</p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-slate-800 border-r border-b border-slate-600 rotate-45" />
        </div>
      )}
    </span>
  );
}

interface LabelWithTooltipProps {
  label: string;
  acronym: string;
  className?: string;
}

export function LabelWithTooltip({ label, acronym, className }: LabelWithTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const term = GLOSSARY.find(t => t.acronym.toLowerCase() === acronym.toLowerCase());
  
  if (!term) return <span className={className}>{label}</span>;

  return (
    <span 
      className={cn("relative inline-flex items-center gap-1 cursor-help group", className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="text-slate-300 group-hover:text-white transition-colors">{label}</span>
      <HelpCircle className="w-4 h-4 text-blue-400" />
      
      {isOpen && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-xl">
          <p className="text-white font-bold text-sm mb-1">{term.acronym}</p>
          <p className="text-blue-300 text-xs mb-2">{term.fullName}</p>
          <p className="text-slate-300 text-xs">{term.description}</p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-slate-800 border-r border-b border-slate-600 rotate-45" />
        </div>
      )}
    </span>
  );
}