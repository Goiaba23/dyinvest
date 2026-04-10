"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { 
  Calculator,
  TrendingUp,
  Calendar,
  PiggyBank,
  Target,
  Info,
  BookOpen,
  Lightbulb,
  TrendingDown,
  Percent,
  Clock
} from "lucide-react";

type CalcType = 'juros' | 'simulador' | 'fibonacci';

const EXPLANATIONS = {
  juros: {
    title: "Calculadora de Juros Compostos",
    description: "Os juros compostos são conhecidos como \"juros sobre juros\". Eles calculam o rendimento sobre o capital inicial E sobre os rendimentos anteriores.",
    formula: "FV = PV × (1 + r)^n + PMT × ((1 + r)^n - 1) / r",
    tips: [
      "Comece a investir cedo: quanto mais tempo, mais o juros compostos trabalham",
      "Aporte mensal的一致性 é mais importante que o valor - contribua regularmente",
      "A taxa de juros faz toda a diferença no resultado final",
      "Considere a inflação: um rendimento de 8% ao ano com inflação de 4% significa ganho real de apenas 4%"
    ],
    examples: [
      { initial: 10000, monthly: 500, rate: 12, years: 10, result: "R$ 234.000" },
      { initial: 10000, monthly: 500, rate: 8, years: 10, result: "R$ 178.000" }
    ]
  },
  simulador: {
    title: "Simulador de Imposto de Renda",
    description: "Simule quanto você pagaría de IR sobre seus ganhos de investimento. O IR é cobrado apenas sobre o lucro (ganho), não sobre o valor total.",
    formula: "IR = (Valor Final - Valor Inicial) × Alíquota",
    taxRates: [
      { days: "Até 180 dias", rate: "22,5%" },
      { days: "181 a 360 dias", rate: "18,5%" },
      { days: "361 a 720 dias", rate: "15%" },
      { days: "Acima de 720 dias", rate: "15% (isento para ações)" }
    ],
    tips: [
      "Ações held for more than 720 days are exempt from IR",
      "FIIs always pay IR on distributions, regardless of holding period",
      "Day trade has a different tax rate (20-22.5%)",
      "You can deduct losses from profits in the same type of investment"
    ]
  },
  fibonacci: {
    title: "Retrações de Fibonacci",
    description: "As retrações de Fibonacci são níveis de preço derivados da sequência matemática de Fibonacci. Traders usam esses níveis para identificar potenciais pontos de suporte e resistência.",
    levels: [
      { level: "23,6%", description: "O primeiro nível de retração, frequentemente o mais fraco" },
      { level: "38,2%", description: "Nível importante, frequentemente age como resistência" },
      { level: "50%", description: "Não é um número de Fibonacci, mas психологически важный nível" },
      { level: "61,8%", description: "A \"proporção áurea\" - o nível mais significativo" },
      { level: "78,6%", description: "Último nível de retração antes de reversal completo" }
    ],
    tips: [
      "Use em conjunto com outros indicadores técnicos",
      " Funcionam melhor em mercados com tendências definidas",
      "Não use isoladamente - confirme com volume e outros padrões",
      "O nível 61,8% (proporção áurea) é o mais confiável"
    ]
  }
};

export default function CalculadoraPage() {
  const [calcType, setCalcType] = useState<CalcType>('juros');

  // Juros Compostos
  const [investimentoInicial, setInvestimentoInicial] = useState(10000);
  const [aporteMensal, setAporteMensal] = useState(500);
  const [taxaJuros, setTaxaJuros] = useState(12);
  const [anos, setAnos] = useState(10);
  const [tipoRendimento, setTipoRendimento] = useState<'anual' | 'mensal'>('anual');

  const resultadosJuros = useMemo(() => {
    const taxaMensal = tipoRendimento === 'anual' ? Math.pow(1 + taxaJuros/100, 1/12) - 1 : taxaJuros/100;
    const meses = anos * 12;
    
    // FV = PV * (1 + r)^n + PMT * ((1 + r)^n - 1) / r
    const valorFuturo = investimentoInicial * Math.pow(1 + taxaMensal, meses) + 
      aporteMensal * (Math.pow(1 + taxaMensal, meses) - 1) / taxaMensal;
    
    const totalInvestido = investimentoInicial + (aporteMensal * meses);
    const rendimentoTotal = valorFuturo - totalInvestido;
    
    return {
      valorFuturo,
      totalInvestido,
      rendimentoTotal,
      taxaMensal: taxaMensal * 100
    };
  }, [investimentoInicial, aporteMensal, taxaJuros, anos, tipoRendimento]);

  // Simulador
  const [valorInicial, setValorInicial] = useState(10000);
  const [taxaAnual, setTaxaAnual] = useState(12);
  const [anosSimulacao, setAnosSimulacao] = useState(10);

  const simulacao = useMemo(() => {
    const anosSelecionados = [];
    let valor = valorInicial;
    
    for (let i = 1; i <= anosSimulacao; i++) {
      const valorAntesIR = valor * (1 + taxaAnual/100);
      const ir = (valorAntesIR - valor) * 0.15; // IR de 15% sobre ganhos
      valor = valorAntesIR - ir;
      
      anosSelecionados.push({
        ano: i,
        valorBruto: valorAntesIR,
        ir: ir,
        valorLiquido: valor,
        rendimentoLiquido: valor - valorInicial
      });
    }
    
    return anosSelecionados;
  }, [valorInicial, taxaAnual, anosSimulacao]);

  // Fibonacci
  const [numeroFibonacci, setNumeroFibonacci] = useState(50);

  const fibonacciSequence = useMemo(() => {
    const seq = [0, 1];
    for (let i = 2; i < numeroFibonacci; i++) {
      seq.push(seq[i-1] + seq[i-2]);
    }
    return seq;
  }, [numeroFibonacci]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pb-20 lg:pb-0">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Calculadoras de Investimentos</h1>
          <p className="text-slate-400">Ferramentas para planejar seus investimentos</p>
        </div>

        {/* Abas */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setCalcType('juros')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
              calcType === 'juros' ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"
            )}
          >
            <Calculator className="w-4 h-4" />
            Juros Compostos
            <Tooltip 
              term="Juros Compostos" 
              definition="Sistema de juros onde o rendimento é calculado sobre o capital inicial + juros acumulados. Também chamado de 'juros sobre juros'."
            />
          </button>
          <button
            onClick={() => setCalcType('simulador')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
              calcType === 'simulador' ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"
            )}
          >
            <TrendingUp className="w-4 h-4" />
            Simulador IR
            <Tooltip 
              term="Imposto de Renda" 
              definition="Taxa cobrada sobre o lucro de investimentos. Para ações, a alíquota é 15% para vendas acima de R$ 20.000/mês (isento se abaixo)."
            />
          </button>
          <button
            onClick={() => setCalcType('fibonacci')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
              calcType === 'fibonacci' ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"
            )}
          >
            <Target className="w-4 h-4" />
            Análise Técnica
            <Tooltip 
              term="Fibonacci" 
              definition="Sequência matemática usada em análise técnica para identificar níveis de suporte e resistência nos preços de ativos."
            />
          </button>
        </div>

        {/* Explicação do tipo de calculadora */}
        {calcType === 'juros' && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/50 rounded-lg">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <h3 className="text-blue-400 font-medium mb-1">{EXPLANATIONS.juros.title}</h3>
                <p className="text-slate-300 text-sm">{EXPLANATIONS.juros.description}</p>
                <div className="mt-2 p-2 bg-slate-800/50 rounded font-mono text-sm text-slate-400">
                  {EXPLANATIONS.juros.formula}
                </div>
              </div>
            </div>
          </div>
        )}

        {calcType === 'simulador' && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-700/50 rounded-lg">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <h3 className="text-green-400 font-medium mb-1">{EXPLANATIONS.simulador.title}</h3>
                <p className="text-slate-300 text-sm">{EXPLANATIONS.simulador.description}</p>
                <div className="mt-2 p-2 bg-slate-800/50 rounded font-mono text-sm text-slate-400">
                  {EXPLANATIONS.simulador.formula}
                </div>
              </div>
            </div>
          </div>
        )}

        {calcType === 'fibonacci' && (
          <div className="mb-6 p-4 bg-gradient-to-r from-orange-900/30 to-yellow-900/30 border border-orange-700/50 rounded-lg">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-orange-400 mt-0.5" />
              <div>
                <h3 className="text-orange-400 font-medium mb-1">{EXPLANATIONS.fibonacci.title}</h3>
                <p className="text-slate-300 text-sm">{EXPLANATIONS.fibonacci.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Juros Compostos */}
        {calcType === 'juros' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PiggyBank className="w-5 h-5 text-blue-400" />
                  Parâmetros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Investimento Inicial (R$)</label>
                  <input
                    type="number"
                    value={investimentoInicial}
                    onChange={(e) => setInvestimentoInicial(Number(e.target.value))}
                    className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600"
                  />
                </div>
                
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Aporte Mensal (R$)</label>
                  <input
                    type="number"
                    value={aporteMensal}
                    onChange={(e) => setAporteMensal(Number(e.target.value))}
                    className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600"
                  />
                </div>
                
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Taxa de Juros (%)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={taxaJuros}
                      onChange={(e) => setTaxaJuros(Number(e.target.value))}
                      className="flex-1 bg-slate-700 text-white px-4 py-2 rounded border border-slate-600"
                    />
                    <select
                      value={tipoRendimento}
                      onChange={(e) => setTipoRendimento(e.target.value as 'anual' | 'mensal')}
                      className="bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
                    >
                      <option value="anual">ao ano</option>
                      <option value="mensal">ao mês</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Período (anos)</label>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    value={anos}
                    onChange={(e) => setAnos(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-white font-bold">{anos} anos</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Resultado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-slate-400 text-sm">Valor Futuro</p>
                  <p className="text-4xl font-bold text-green-400">
                    R$ {resultadosJuros.valorFuturo.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                    <p className="text-slate-400 text-sm">Total Investido</p>
                    <p className="text-white font-bold">
                      R$ {resultadosJuros.totalInvestido.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                    <p className="text-slate-400 text-sm">Rendimento Total</p>
                    <p className="text-green-400 font-bold">
                      R$ {resultadosJuros.rendimentoTotal.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-900/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm font-medium">Resumo</span>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Em {anos} anos, você terá investido R$ {resultadosJuros.totalInvestido.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} 
                    e ganado R$ {resultadosJuros.rendimentoTotal.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} em rendimentos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Simulador IR */}
        {calcType === 'simulador' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Parâmetros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Valor Inicial (R$)</label>
                  <input
                    type="number"
                    value={valorInicial}
                    onChange={(e) => setValorInicial(Number(e.target.value))}
                    className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Taxa Anual (%)</label>
                  <input
                    type="number"
                    value={taxaAnual}
                    onChange={(e) => setTaxaAnual(Number(e.target.value))}
                    className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Anos</label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={anosSimulacao}
                    onChange={(e) => setAnosSimulacao(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-white font-bold">{anosSimulacao} anos</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Evolução com IR (15%)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-slate-400 py-2 px-2 text-left">Ano</th>
                        <th className="text-slate-400 py-2 px-2 text-right">Bruto</th>
                        <th className="text-slate-400 py-2 px-2 text-right">IR</th>
                        <th className="text-slate-400 py-2 px-2 text-right">Líquido</th>
                      </tr>
                    </thead>
                    <tbody>
                      {simulacao.map(ano => (
                        <tr key={ano.ano} className="border-b border-slate-700/50">
                          <td className="py-2 px-2 text-white">Ano {ano.ano}</td>
                          <td className="py-2 px-2 text-right text-slate-300">
                            R$ {ano.valorBruto.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                          </td>
                          <td className="py-2 px-2 text-right text-red-400">
                            R$ {ano.ir.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                          </td>
                          <td className="py-2 px-2 text-right text-green-400 font-medium">
                            R$ {ano.valorLiquido.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Fibonacci */}
        {calcType === 'fibonacci' && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Sequência de Fibonacci (Retrações)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 mb-4">
                As retrações de Fibonacci são: 23,6%, 38,2%, 50%, 61,8%, 78,6%
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[0.236, 0.382, 0.5, 0.618, 0.786].map((nivel, i) => (
                  <div key={i} className="bg-slate-700/50 p-4 rounded-lg text-center">
                    <p className="text-slate-400 text-sm">Nível {i + 1}</p>
                    <p className="text-white font-bold text-xl">{(nivel * 100).toFixed(1)}%</p>
                    <p className="text-slate-500 text-xs">F{nivel * 1000}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-900/20 rounded-lg">
                <p className="text-slate-300 text-sm">
                  <strong className="text-blue-400">Como usar:</strong> Em análise técnica, quando uma ação faz uma alta ou baixa, 
                  as retrações de Fibonacci mostram onde o preço pode encontrar suporte ou resistência.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <div className="flex items-start gap-3 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <p className="text-yellow-400 font-medium text-sm mb-2">Dicas Importantes</p>
              <ul className="space-y-1">
                {EXPLANATIONS[calcType].tips.map((tip, i) => (
                  <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-slate-400 text-sm">
            <strong className="text-blue-400">Nota:</strong> Estes são dados e cálculos baseados em parâmetros informados. 
            Resultados passados não garantem resultados futuros. Considere sempre a inflação e impostos.
          </p>
        </div>
      </main>
    </div>
  );
}
