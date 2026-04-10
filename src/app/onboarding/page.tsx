"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SmartOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState("");

  const handleSelect = (selectedProfile: string) => {
    setProfile(selectedProfile);
    
    // Simula salvamento via Supabase
    // await logOnboardingProfile(userEmail, selectedProfile);
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push("/radar"); // Redireciona para o dashboard com sensação de 'destravado'
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-slate-100">
      
      {/* Indicador de passos */}
      <div className="w-full max-w-lg flex items-center justify-between mb-12">
        <div className={`h-2 rounded-full flex-1 mx-1 ${step >= 1 ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-800"}`} />
        <div className={`h-2 rounded-full flex-1 mx-1 transition-all ${step >= 2 ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-800"}`} />
        <div className={`h-2 rounded-full flex-1 mx-1 transition-all ${step >= 3 ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-800"}`} />
      </div>

      <div className="w-full max-w-lg glass-panel p-10 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Glow de fundo luxuoso */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] -z-10 rounded-full mix-blend-screen" />
        
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-4">Qual é o seu principal objetivo?</h1>
            <p className="text-slate-400 mb-8">Nossa IA calibra o Bento Grid baseado na sua resposta.</p>
            
            <div className="space-y-4">
              <button onClick={() => handleSelect("dividendos")} className="w-full text-left p-4 rounded-xl border border-slate-800 hover:border-emerald-500 hover:bg-slate-800/50 transition-all font-inter group">
                <span className="block text-lg font-semibold text-slate-200 group-hover:text-emerald-400">Renda Passiva (Dividendos)</span>
                <span className="text-sm text-slate-500">Quero viver de renda e pagamentos mensais.</span>
              </button>
              <button onClick={() => handleSelect("tech")} className="w-full text-left p-4 rounded-xl border border-slate-800 hover:border-blue-500 hover:bg-slate-800/50 transition-all font-inter group">
                <span className="block text-lg font-semibold text-slate-200 group-hover:text-blue-400">Multiplicação Tech</span>
                <span className="text-sm text-slate-500">Busco ações que seguem a Rule of 40. Alto risco, alto retorno.</span>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold font-space text-white mb-4">Você confia na conexão da B3?</h1>
            <p className="text-slate-400 mb-8">A concorrência trava e deleta seus ativos de vez em quando.</p>
            
            <div className="space-y-4">
              <button onClick={() => handleSelect("manual")} className="w-full text-left p-4 rounded-xl border border-slate-800 hover:border-yellow-500 hover:bg-slate-800/50 transition-all font-inter">
                <span className="block text-lg font-semibold text-slate-200">Não confio. Prefiro inserir manualmente/CSV</span>
                <span className="text-sm text-slate-500">A importação mais robusta do mercado (Modo Transparente).</span>
              </button>
              <button onClick={() => handleSelect("api")} className="w-full text-left p-4 rounded-xl border border-slate-800 hover:border-slate-600 hover:bg-slate-800/50 transition-all font-inter opacity-60">
                <span className="block text-lg font-semibold text-slate-200">Sim, quero sincronismo bugado automático (B3)</span>
                <span className="text-sm text-slate-500">Não recomendado pela nossa comunidade.</span>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/50 rounded-full mx-auto flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold font-space text-white mb-4">AI Calibrada!</h1>
            <p className="text-slate-400 mb-8 text-sm">
              Sua conta "Family Office" foi preparada. Não pague fortunas por gráficos limitados!
            </p>
            <button 
              onClick={() => handleSelect("done")}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
            >
              Acessar Meu Investimento AI Pro
            </button>
          </div>
        )}
      </div>
    </div>
  );
}