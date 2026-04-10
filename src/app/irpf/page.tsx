"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { 
  Calculator,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Info,
  AlertTriangle,
  FileText,
  CheckCircle
} from "lucide-react";

interface Operacao {
  id: number;
  tipo: 'compra' | 'venda';
  ativo: string;
  quantidade: number;
  precoUnitario: number;
  data: string;
}

export default function IRPFCalculatorPage() {
  const [operacoes, setOperacoes] = useState<Operacao[]>([
    { id: 1, tipo: 'compra', ativo: 'PETR4', quantidade: 100, precoUnitario: 42.50, data: '2025-01-15' },
    { id: 2, tipo: 'venda', ativo: 'PETR4', quantidade: 50, precoUnitario: 45.70, data: '2025-06-20' },
    { id: 3, tipo: 'compra', ativo: 'ITUB4', quantidade: 200, precoUnitario: 32.00, data: '2025-03-10' },
    { id: 4, tipo: 'venda', ativo: 'ITUB4', quantidade: 100, precoUnitario: 35.42, data: '2025-08-15' },
    { id: 5, tipo: 'compra', ativo: 'VALE3', quantidade: 150, precoUnitario: 78.00, data: '2025-04-01' },
  ]);

  const resultados = useMemo(() => {
    const compras: { [key: string]: { quantidade: number; valorTotal: number } } = {};
    const vendas: { [key: string]: { quantidade: number; valorTotal: number } } = {};
    
    // Calcular total de compras e vendas por ativo
    operacoes.forEach(op => {
      if (op.tipo === 'compra') {
        if (!compras[op.ativo]) compras[op.ativo] = { quantidade: 0, valorTotal: 0 };
        compras[op.ativo].quantidade += op.quantidade;
        compras[op.ativo].valorTotal += op.quantidade * op.precoUnitario;
      } else {
        if (!vendas[op.ativo]) vendas[op.ativo] = { quantidade: 0, valorTotal: 0 };
        vendas[op.ativo].quantidade += op.quantidade;
        vendas[op.ativo].valorTotal += op.quantidade * op.precoUnitario;
      }
    });

    // Calcular lucro/prejuízo por ativo
    const resultadosAtivos: { [key: string]: { custo: number; receita: number; lucro: number; taxable: boolean } } = {};
    
    Object.keys(vendas).forEach(ativo => {
      const venda = vendas[ativo];
      const compra = compras[ativo] || { quantidade: 0, valorTotal: 0 };
      
      // Calcular custo médio das ações vendidas
      const custoMedio = compra.quantidade > 0 ? compra.valorTotal / compra.quantidade : 0;
      const custoVendas = venda.quantidade * custoMedio;
      const lucro = venda.valorTotal - custoVendas;
      
      // Apenas tributa lucro em operações comuns (não day trade)
      const taxable = lucro > 0;
      
      resultadosAtivos[ativo] = {
        custo: custoVendas,
        receita: venda.valorTotal,
        lucro,
        taxable
      };
    });

    // Calcular totais
    let totalReceita = 0;
    let totalCusto = 0;
    let totalLucro = 0;
    let totalImposto = 0;

    Object.values(resultadosAtivos).forEach(r => {
      totalReceita += r.receita;
      totalCusto += r.custo;
      totalLucro += r.lucro;
      if (r.taxable && r.lucro > 0) {
        // Alíquota de 15% para operações comuns
        totalImposto += r.lucro * 0.15;
      }
    });

    // Day trade (operações no mesmo dia) têm alíquota de 20%
    const dayTradeLucro = 0; // Exemplo
    const dayTradeImposto = dayTradeLucro * 0.20;

    // Isenções para vendas totais até R$ 20.000/mês
    const isento = totalLucro > 0 && totalReceita <= 20000;
    
    return {
      resultadosAtivos,
      totalReceita,
      totalCusto,
      totalLucro,
      totalImposto: totalImposto + dayTradeImposto,
      isento
    };
  }, [operacoes]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pb-20 lg:pb-0">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            📊 Calculadora de IRPF - Renda Variável
            <Tooltip 
              term="IRPF" 
              definition="Imposto de Renda sobre Pessoa Física. Na renda variável (ações), você paga IR sobre os lucros obtidos em vendas. Se vender menos de R$20.000/mês, fica isento."
            />
          </h1>
          <p className="text-slate-400">Calcule o imposto devido sobre operações de compra e venda de ações</p>
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Total Receita</p>
              <p className="text-white text-xl font-bold">R$ {resultados.totalReceita.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Total Custo</p>
              <p className="text-white text-xl font-bold">R$ {resultados.totalCusto.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Lucro/Prejuízo</p>
              <p className={cn("text-xl font-bold", resultados.totalLucro >= 0 ? "text-green-400" : "text-red-400")}>
                R$ {resultados.totalLucro.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">IR a Pagar</p>
              <p className={cn("text-xl font-bold", resultados.totalImposto > 0 ? "text-red-400" : "text-green-400")}>
                R$ {resultados.totalImposto.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Status Isenção */}
        {resultados.isento && (
          <Card className="bg-green-900/30 border-green-600 mb-8">
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-green-400 font-bold">Isento de IR!</p>
                <p className="text-slate-300 text-sm">Suas vendas no mês foram de até R$ 20.000, então você está isento do imposto.</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Operações */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                Operações Realizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left text-slate-400 py-2 px-2">Data</th>
                      <th className="text-left text-slate-400 py-2 px-2">Tipo</th>
                      <th className="text-left text-slate-400 py-2 px-2">Ativo</th>
                      <th className="text-right text-slate-400 py-2 px-2">Qtd</th>
                      <th className="text-right text-slate-400 py-2 px-2">Preço</th>
                      <th className="text-right text-slate-400 py-2 px-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {operacoes.map(op => (
                      <tr key={op.id} className="border-b border-slate-700/50">
                        <td className="py-2 px-2 text-slate-300 text-sm">{op.data}</td>
                        <td className="py-2 px-2">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-xs font-medium",
                            op.tipo === 'compra' ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                          )}>
                            {op.tipo === 'compra' ? 'Compra' : 'Venda'}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-white font-medium">{op.ativo}</td>
                        <td className="py-2 px-2 text-right text-slate-300">{op.quantidade}</td>
                        <td className="py-2 px-2 text-right text-slate-300">R$ {op.precoUnitario.toFixed(2)}</td>
                        <td className="py-2 px-2 text-right text-white">R$ {(op.quantidade * op.precoUnitario).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Resultados por Ativo */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-green-400" />
               Resultado por Ativo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(resultados.resultadosAtivos).map(([ativo, dados]) => (
                  <div key={ativo} className="bg-slate-700/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-bold">{ativo}</span>
                      <span className={cn(
                        "text-sm font-medium",
                        dados.lucro >= 0 ? "text-green-400" : "text-red-400"
                      )}>
                        {dados.lucro >= 0 ? '+' : ''}R$ {dados.lucro.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-slate-500">Receita: </span>
                        <span className="text-slate-300">R$ {dados.receita.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Custo: </span>
                        <span className="text-slate-300">R$ {dados.custo.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-800 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <p className="text-slate-300 text-sm">Investir envolve riscos. Não dizemos "compre" ou "venda".</p>
              <ul className="text-slate-400 text-sm mt-2 space-y-1">
                <li>• Alíquota IR: 15% para operações comuns</li>
                <li>• Alíquota IR: 20% para day trade</li>
                <li>• Isenção: vendas até R$ 20.000/mês</li>
                <li>• FIIs são isentos de IR para pessoa física</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}