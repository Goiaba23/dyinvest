"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const steps = [
  { title: "Perfil de Risco", desc: "Conheça seu perfil" },
  { title: "Objetivos", desc: "Defina metas" },
  { title: "Preferências", desc: "Config. alertas" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="font-dy-h1 text-3xl text-white mb-2">Bem-vindo ao DYInvest</h1>
          <p className="text-zinc-400">Vamos configurar sua conta</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex-1">
              <div className={`h-1 rounded-full ${i <= step ? "bg-blue-500" : "bg-[#252529]"}`}></div>
              <p className={`text-xs mt-2 ${i <= step ? "text-blue-400" : "text-zinc-500"}`}>
                {s.title}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-[#0f0f13] border border-[#252529] rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-4">{steps[step].title}</h2>
          <p className="text-zinc-400 mb-6">{steps[step].desc}</p>

          {/* Simplified step content */}
          {step === 0 && (
            <div className="space-y-3">
              {["Conservador", "Moderado", "Agressivo"].map((risk) => (
                <button
                  key={risk}
                  className="w-full p-4 bg-[#121216] border border-[#252529] rounded-xl text-left hover:border-blue-500/50 transition-colors text-white"
                >
                  {risk}
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 border border-[#252529] text-zinc-400 rounded-xl hover:bg-[#121216] transition-colors"
              >
                Voltar
              </button>
            )}
            <button
              onClick={() => step < 2 ? setStep(step + 1) : null}
              className="ml-auto bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              {step === 2 ? "Finalizar" : "Próximo"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
