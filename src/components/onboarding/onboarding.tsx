"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { 
  Target, 
  Shield, 
  BookOpen, 
  TrendingUp, 
  DollarSign, 
  Bitcoin,
  Building2,
  Gem,
  Globe,
  ChevronRight,
  Check
} from "lucide-react";
import { savePreferences } from "@/lib/supabase";

const OBJETIVOS = [
  { value: "investir", label: "Investir", icon: TrendingUp, desc: "Quero fazer meu dinheiro render mais" },
  { value: "proteger", label: "Proteger", icon: Shield, desc: "Quero proteger meu patrimônio" },
  { value: "aprender", label: "Aprender", icon: BookOpen, desc: "Quero entender como o mercado funciona" },
];

const ATIVOS = [
  { value: "acoes", label: "Ações", icon: Building2, desc: "PETR4, VALE3, ITUB4..." },
  { value: "fii", label: "FIIs", icon: Building2, desc: "KNIP11, HGLG11, XPLG11..." },
  { value: "ouro", label: "Ouro", icon: Gem, desc: "Proteção contra inflation" },
  { value: "dolar", label: "Dólar", icon: DollarSign, desc: "Moeda americana" },
  { value: "crypto", label: "Cripto", icon: Bitcoin, desc: "Bitcoin, Ethereum..." },
  { value: "global", label: "Mercado Global", icon: Globe, desc: "S&P 500, Nasdaq..." },
];

const RISCOS = [
  { value: "baixo", label: "Conservador", desc: "Prefiro segurança, aceito rendimientos menores" },
  { value: "medio", label: "Moderado", desc: "Quero um equilíbrio entre risco e retorno" },
  { value: "alto", label: "Arrojado", desc: "Aceito riscos para buscar maiores ganhos" },
];

const ALERTAS = [
  { value: "whatsapp", label: "WhatsApp", desc: "Notificações no WhatsApp" },
  { value: "email", label: "Email", desc: "Notificações por email" },
  { value: "nenhum", label: "Nenhum", desc: "Não quero alertas por enquanto" },
];

interface OnboardingProps {
  onComplete?: (preferences: any) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    objetivo: "",
    ativos: [] as string[],
    nivel_risco: "",
    linguagem_simples: true,
    alertas: "email",
  });
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 4;

  const updatePreference = (key: string, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAtivo = (value: string) => {
    setPreferences((prev) => ({
      ...prev,
      ativos: prev.ativos.includes(value)
        ? prev.ativos.filter((a) => a !== value)
        : [...prev.ativos, value],
    }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await savePreferences(preferences);
      
      if (onComplete) {
        onComplete(preferences);
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!preferences.objetivo;
      case 2: return preferences.ativos.length > 0;
      case 3: return !!preferences.nivel_risco;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Passo {step} de {totalSteps}</span>
            <span className="text-sm text-emerald-400">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl text-white">
              {step === 1 && "Qual é o seu objetivo?"}
              {step === 2 && "Quais ativos te interessam?"}
              {step === 3 && "Como você se define como investidor?"}
              {step === 4 && "Como você quer receber alertas?"}
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-4">
            {/* Step 1: Objetivo */}
            {step === 1 && (
              <div className="space-y-3">
                {OBJETIVOS.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => updatePreference("objetivo", item.value)}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 transition-all duration-200 text-left flex items-center gap-4",
                      preferences.objetivo === item.value
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-slate-700 hover:border-slate-600 bg-slate-800/50"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      preferences.objetivo === item.value
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-700 text-slate-400"
                    )}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{item.label}</p>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                    {preferences.objetivo === item.value && (
                      <Check className="w-5 h-5 text-emerald-400" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Ativos */}
            {step === 2 && (
              <div className="space-y-3">
                {ATIVOS.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => toggleAtivo(item.value)}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 transition-all duration-200 text-left flex items-center gap-4",
                      preferences.ativos.includes(item.value)
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-slate-700 hover:border-slate-600 bg-slate-800/50"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      preferences.ativos.includes(item.value)
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-700 text-slate-400"
                    )}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{item.label}</p>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                    {preferences.ativos.includes(item.value) && (
                      <Check className="w-5 h-5 text-emerald-400" />
                    )}
                  </button>
                ))}
                <p className="text-center text-sm text-slate-500 mt-4">
                  Selecione pelo menos um ativo
                </p>
              </div>
            )}

            {/* Step 3: Risco */}
            {step === 3 && (
              <div className="space-y-3">
                {RISCOS.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => updatePreference("nivel_risco", item.value)}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 transition-all duration-200 text-left flex items-center gap-4",
                      preferences.nivel_risco === item.value
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-slate-700 hover:border-slate-600 bg-slate-800/50"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      preferences.nivel_risco === item.value
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-700 text-slate-400"
                    )}>
                      {item.value === "baixo" && <Shield className="w-6 h-6" />}
                      {item.value === "medio" && <TrendingUp className="w-6 h-6" />}
                      {item.value === "alto" && <TrendingUp className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{item.label}</p>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                    {preferences.nivel_risco === item.value && (
                      <Check className="w-5 h-5 text-emerald-400" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Step 4: Alertas */}
            {step === 4 && (
              <div className="space-y-3">
                {ALERTAS.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => updatePreference("alertas", item.value)}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 transition-all duration-200 text-left flex items-center gap-4",
                      preferences.alertas === item.value
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-slate-700 hover:border-slate-600 bg-slate-800/50"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      preferences.alertas === item.value
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-700 text-slate-400"
                    )}>
                      {item.value === "whatsapp" && <span className="text-lg">💬</span>}
                      {item.value === "email" && <span className="text-lg">📧</span>}
                      {item.value === "nenhum" && <span className="text-lg">🔕</span>}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{item.label}</p>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                    {preferences.alertas === item.value && (
                      <Check className="w-5 h-5 text-emerald-400" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
              >
                Voltar
              </Button>
              
              {step < totalSteps ? (
                <Button onClick={nextStep} disabled={!canProceed()}>
                  Próximo
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} isLoading={isLoading}>
                  Começar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}