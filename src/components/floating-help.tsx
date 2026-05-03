"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { HelpCircle, X } from "lucide-react";
import { GLOSSARY } from "@/lib/ia/glossary";

interface FloatingHelpProps {
  className?: string;
}

export function FloatingHelp({ className }: FloatingHelpProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = searchTerm 
    ? GLOSSARY.filter(t => 
        t.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : GLOSSARY;

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all",
          "lg:bottom-24 lg:right-6",
          className
        )}
        title="Ajuda com termos"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {/* Modal de ajuda */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg max-h-[80vh] bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h3 className="text-white font-bold text-lg"> glossário de Termos</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Busca */}
            <div className="p-4 border-b border-slate-700">
              <input
                type="text"
                placeholder="Buscar termo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Lista de termos */}
            <div className="p-4 overflow-y-auto max-h-96">
              <div className="grid grid-cols-1 gap-3">
                {filteredTerms.map((term, idx) => (
                  <div 
                    key={idx}
                    className="p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-400 font-bold">{term.acronym}</span>
                      <span className="text-slate-500 text-sm">- {term.fullName}</span>
                    </div>
                    <p className="text-slate-400 text-sm">{term.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-slate-700 text-center">
              <p className="text-slate-500 text-xs">Passe o mouse sobre os termos (?) nas páginas para ver a definição</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}