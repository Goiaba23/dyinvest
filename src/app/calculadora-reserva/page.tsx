"use client";

import { useState, useMemo } from "react";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  Calculator,
  PiggyBank,
  Shield,
  Target,
  TrendingUp,
  Info,
  AlertCircle
} from "lucide-react";

export default function ReservaEmergenciaPage() {
  const [gastosMensais, setGastosMensais] = useState(5000);
  const [mesesReserva, setMesesReserva] = useState(6);
  const [rendaFixa, setRendaFixa] = useState(100); // taxa média CDI
  
  const resultados = useMemo(() => {
    const reservaNecessaria = gastosMensais * mesesReserva;
    
    // Calcular quanto precisa investir por mês para atingir a meta em 1 ano
    const mesesParaMeta = 12;
    const taxaMensal = (rendaFixa / 100) / 12;
    const investimentoMensal = reservaNecessaria / ((Math.pow(1 + taxaMensal, mesesParaMeta) - 1) / taxaMensal);
    
    // Onde investir
    const opcoes = [
      { nome: 'Tesouro Selic', taxa: 10.5, risco: 'Baixo', liquidez: 'D+0' },
      { nome: 'CDB 100% CDI', taxa: 11.0, risco: 'Baixo', liquidez: 'D+0' },
      { nome: 'LCI/LCA (90%)', taxa: 9.5, risco: 'Baixo', liquidez: 'D+1' },
      { nome: 'Fundo DI', taxa: 10.2, risco: 'Baixo', liquidez: 'D+0' },
      { nome: 'Poupança', taxa: 7.5, risco: 'Baixo', liquidez: 'D+0' },
    ];
    
    return {
      reservaNecessaria,
      investimentoMensal,
      opcoes,
     cdiAtual: 13.65
    };
  }, [gastosMensais, mesesReserva, rendaFixa]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pb-20 lg:pb-0">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Calculadora de Reserva de Emergência</h1>
          <p className="text-slate-400">Planeje sua segurança financeira</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Parâmetros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-slate-400 text-sm block mb-2">Gastos Mensais (R$)</label>
                <input
                  type="number"
                  value={gastosMensais}
                  onChange={(e) => setGastosMensais(Number(e.target.value))}
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600"
                />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Meses de Reserva</label>
                <input
                  type="range"
                  min="3"
                  max="12"
                  value={mesesReserva}
                  onChange={(e) => setMesesReserva(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-slate-500 text-sm mt-1">
                  <span>3 meses</span>
                  <span className="text-white font-bold">{mesesReserva} meses</span>
                  <span>12 meses</span>
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Taxa de Retorno Anual Estimada (%)</label>
                <input
                  type="number"
                  value={rendaFixa}
                  onChange={(e) => setRendaFixa(Number(e.target.value))}
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600"
                />
                <p className="text-slate-500 text-xs mt-1">CDI atual: {resultados.cdiAtual}%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Resultado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-blue-900/30 rounded-lg">
                <p className="text-slate-400 text-sm">Reserva Necessária</p>
                <p className="text-4xl font-bold text-blue-400">
                  R$ {resultados.reservaNecessaria.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="text-center p-6 bg-green-900/30 rounded-lg">
                <p className="text-slate-400 text-sm">Investimento Mensal (para atingir em 1 ano)</p>
                <p className="text-3xl font-bold text-green-400">
                  R$ {resultados.investimentoMensal.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="bg-yellow-900/30 p-4 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <p className="text-slate-300 text-sm">
                  Mantenha a reserva em investimentos de alta liquidez e baixo risco.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Onde Investir */}
        <Card className="bg-slate-800/50 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-green-400" />
              Onde Investir sua Reserva
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-slate-400 py-3 px-4">Investimento</th>
                    <th className="text-right text-slate-400 py-3 px-4">Taxa Anual</th>
                    <th className="text-center text-slate-400 py-3 px-4">Risco</th>
                    <th className="text-center text-slate-400 py-3 px-4">Liquidez</th>
                  </tr>
                </thead>
                <tbody>
                  {resultados.opcoes.map((op, i) => (
                    <tr key={i} className="border-b border-slate-700/50">
                      <td className="py-3 px-4 text-white font-medium">{op.nome}</td>
                      <td className="py-3 px-4 text-right text-green-400">{op.taxa.toFixed(1)}%</td>
                      <td className="py-3 px-4 text-center">
                        <span className={cn(
                          "px-2 py-1 rounded text-xs",
                          op.risco === 'Baixo' ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                        )}>
                          {op.risco}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-slate-300">{op.liquidez}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <p className="text-slate-300 text-sm">
                <strong className="text-blue-400">O que é Reserva de Emergência?</strong>
              </p>
              <p className="text-slate-400 text-sm mt-2">
                É um valor guardado para imprevistos como doenças, perda de emprego, manutenção darurat do carro.
                Recomenda-se guardar de 3 a 12 meses dos seus gastos mensais.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
