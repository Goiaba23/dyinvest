"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  Calculator,
  DollarSign,
  TrendingUp,
  Percent,
  Info,
  PiggyBank
} from "lucide-react";
import { ACOES } from "@/lib/ia/market-data";

type CalcType = 'dividendos' | 'graham' | 'bazin';

export default function CalculadorasFundamentalistasPage() {
  const [calcType, setCalcType] = useState<CalcType>('dividendos');

  // Calculadora de Dividendos
  const [valorInvestido, setValorInvestido] = useState(10000);
  const [acaoSelecionada, setAcaoSelecionada] = useState(ACOES[0]);
  const [quantidade, setQuantidade] = useState(0);
  const [anosProjecao, setAnosProjecao] = useState(5);

  const resultadosDividendos = useMemo(() => {
    const qtd = valorInvestido / acaoSelecionada.price;
    const dividendYield = acaoSelecionada.dy || 0;
    const valorProventosAnual = (valorInvestido * dividendYield) / 100;
    const valorProventosMensal = valorProventosAnual / 12;
    
    // Projeção com crescimento de 5% ao ano
    const projecao = [];
    let valorAcumulado = 0;
    for (let i = 1; i <= anosProjecao; i++) {
      const proventos = valorProventosAnual * Math.pow(1.05, i - 1);
      valorAcumulado += proventos;
      projecao.push({
        ano: i,
        proventos: proventos,
        acumulado: valorAcumulado,
        crescimento: ((Math.pow(1.05, i) - 1) * 100).toFixed(1)
      });
    }
    
    return {
      quantidade: qtd,
      dy: dividendYield,
      proventosAnual: valorProventosAnual,
      proventosMensal: valorProventosMensal,
      projecao
    };
  }, [valorInvestido, acaoSelecionada, anosProjecao]);

  // Calculadora Graham
  const [acaoGraham, setAcaoGraham] = useState(ACOES[1]);
  const [ CrescimentoLPA, setCrescimentoLPA] = useState(5);

  const resultadoGraham = useMemo(() => {
    const lpa = acaoGraham.lpa || 0;
    const vpa = acaoGraham.vpa || 0;
    const crescimento = CrescimentoLPA / 100;
    
    // VPA = Valor Patrimonial por Ação
    // LPA = Lucro por Ação
    // EPS Growth = Crescimento esperado do LPA
    
    // Graham: Preço Justo = sqrt(22.5 * VPA * LPA)
    const precoJustoGraham = Math.sqrt(22.5 * vpa * lpa);
    
    // Graham Modificado: Preço Justo = LPA * (8.5 + 2 * g)
    // Onde g = crescimento esperado (em %, ex: 5)
    const fatorGraham = 8.5 + (2 * crescimento);
    const precoJustoGrahamMod = lpa * fatorGraham;
    
    // Margem de segurança
    const precoAtual = acaoGraham.price;
    const margemSeguranca = ((precoJustoGraham - precoAtual) / precoJustoGraham) * 100;
    
    return {
      vpa,
      lpa,
      precoJusto: precoJustoGraham,
      precoJustoMod: precoJustoGrahamMod,
      precoAtual,
      margemSeguranca,
      recomendada: precoAtual < precoJustoGrahamMod
    };
  }, [acaoGraham, CrescimentoLPA]);

  // Calculadora Bazin
  const [acaoBazin, setAcaoBazin] = useState(ACOES[0]);
  const [dividendoDesejado, setDividendoDesejado] = useState(1000);

  const resultadoBazin = useMemo(() => {
    const dy = acaoBazin.dy || 0;
    const preco = acaoBazin.price;
    
    // Preço justo Bazin = Dividendos desejados / (DY% / 100)
    const precoJusto = dividendoDesejado / (dy / 100);
    
    const acoesNecesarias = precoJusto / preco;
    const proventosMensal = (precoJusto * dy / 100) / 12;
    
    return {
      dy,
      precoJusto,
      precoAtual: preco,
      acoesNecesarias,
      proventosMensal,
      recomendada: preco < precoJusto
    };
  }, [acaoBazin, dividendoDesejado]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pb-20 lg:pb-0">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Calculadoras Fundamentalistas</h1>
          <p className="text-slate-400">Ferramentas para análise de ações</p>
        </div>

        {/* Abas */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setCalcType('dividendos')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
              calcType === 'dividendos' ? "bg-green-600 text-white" : "bg-slate-700 text-slate-300"
            )}
          >
            <DollarSign className="w-4 h-4" />
            Dividendos
          </button>
          <button
            onClick={() => setCalcType('graham')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
              calcType === 'graham' ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"
            )}
          >
            <Calculator className="w-4 h-4" />
            Graham
          </button>
          <button
            onClick={() => setCalcType('bazin')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
              calcType === 'bazin' ? "bg-purple-600 text-white" : "bg-slate-700 text-slate-300"
            )}
          >
            <TrendingUp className="w-4 h-4" />
            Bazin
          </button>
        </div>

        {/* Calculadora de Dividendos */}
        {calcType === 'dividendos' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PiggyBank className="w-5 h-5 text-green-400" />
                  Parâmetros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Valor a Investir (R$)</label>
                  <input
                    type="number"
                    value={valorInvestido}
                    onChange={(e) => setValorInvestido(Number(e.target.value))}
                    className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600"
                  />
                </div>
                
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Selecione a Ação</label>
                  <select
                    value={acaoSelecionada.symbol}
                    onChange={(e) => {
                      const acao = ACOES.find(a => a.symbol === e.target.value);
                      if (acao) setAcaoSelecionada(acao);
                    }}
                    className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600"
                  >
                    {ACOES.filter(a => a.dy && a.dy > 0).map(acao => (
                      <option key={acao.symbol} value={acao.symbol}>
                        {acao.symbol} - {acao.name} (DY: {acao.dy?.toFixed(1)}%)
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Anos de Projeção</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={anosProjecao}
                    onChange={(e) => setAnosProjecao(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-white font-bold">{anosProjecao} anos</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Resultado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                    <p className="text-slate-400 text-sm">Ações</p>
                    <p className="text-white font-bold text-xl">{resultadosDividendos.quantidade.toFixed(0)}</p>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                    <p className="text-slate-400 text-sm">DY</p>
                    <p className="text-green-400 font-bold text-xl">{resultadosDividendos.dy.toFixed(2)}%</p>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                    <p className="text-slate-400 text-sm">Anual</p>
                    <p className="text-green-400 font-bold text-xl">R$ {resultadosDividendos.proventosAnual.toFixed(0)}</p>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                    <p className="text-slate-400 text-sm">Mensal</p>
                    <p className="text-green-400 font-bold text-xl">R$ {resultadosDividendos.proventosMensal.toFixed(0)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 text-sm mb-2">Projeção de Recebimentos</p>
                  <div className="space-y-2">
                    {resultadosDividendos.projecao.map(p => (
                      <div key={p.ano} className="flex justify-between bg-slate-700/30 p-2 rounded">
                        <span className="text-slate-300">Ano {p.ano}</span>
                        <span className="text-green-400">R$ {p.proventos.toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between bg-green-900/30 p-2 rounded mt-2">
                    <span className="text-white font-medium">Total Acumulado</span>
                    <span className="text-green-400 font-bold">R$ {resultadosDividendos.projecao[anosProjecao-1]?.acumulado.toFixed(0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Calculadora Graham */}
        {calcType === 'graham' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Parâmetros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Ação</label>
                  <select
                    value={acaoGraham.symbol}
                    onChange={(e) => {
                      const acao = ACOES.find(a => a.symbol === e.target.value);
                      if (acao) setAcaoGraham(acao);
                    }}
                    className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600"
                  >
                    {ACOES.map(acao => (
                      <option key={acao.symbol} value={acao.symbol}>
                        {acao.symbol} - {acao.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Crescimento Esperado LPA (%)</label>
                  <input
                    type="number"
                    value={CrescimentoLPA}
                    onChange={(e) => setCrescimentoLPA(Number(e.target.value))}
                    className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600"
                  />
                </div>

                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm">Dados da Ação</p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div><span className="text-slate-500">LPA:</span> <span className="text-white">R$ {resultadoGraham.lpa.toFixed(2)}</span></div>
                    <div><span className="text-slate-500">VPA:</span> <span className="text-white">R$ {resultadoGraham.vpa.toFixed(2)}</span></div>
                    <div><span className="text-slate-500">P/L:</span> <span className="text-white">{acaoGraham.pl?.toFixed(1)}</span></div>
                    <div><span className="text-slate-500">ROE:</span> <span className="text-white">{acaoGraham.roe?.toFixed(1)}%</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Resultado - Método Graham</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-slate-700/50 rounded-lg">
                  <p className="text-slate-400 text-sm">Preço Justo (Graham Original)</p>
                  <p className="text-3xl font-bold text-blue-400">R$ {resultadoGraham.precoJusto.toFixed(2)}</p>
                  <p className="text-slate-500 text-xs">√(22.5 × VPA × LPA)</p>
                </div>

                <div className="text-center p-6 bg-slate-700/50 rounded-lg">
                  <p className="text-slate-400 text-sm">Preço Justo (Graham Modificado)</p>
                  <p className="text-3xl font-bold text-purple-400">R$ {resultadoGraham.precoJustoMod.toFixed(2)}</p>
                  <p className="text-slate-500 text-xs">LPA × (8.5 + 2g)</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                    <p className="text-slate-400 text-sm">Preço Atual</p>
                    <p className="text-white font-bold">R$ {resultadoGraham.precoAtual.toFixed(2)}</p>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                    <p className="text-slate-400 text-sm">Margem Segurança</p>
                    <p className={cn("font-bold", resultadoGraham.margemSeguranca > 0 ? "text-green-400" : "text-red-400")}>
                      {resultadoGraham.margemSeguranca.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className={cn(
                  "p-4 rounded-lg text-center",
                  resultadoGraham.recomendada ? "bg-green-900/30" : "bg-red-900/30"
                )}>
                  <p className={cn("font-bold text-lg", resultadoGraham.recomendada ? "text-green-400" : "text-red-400")}>
                    {resultadoGraham.recomendada ? "✓ Ação potencialmente subvalorizada" : "✗ Ação potencialmente cara"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Calculadora Bazin */}
        {calcType === 'bazin' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Parâmetros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Ação (FII ou Ação com DY)</label>
                  <select
                    value={acaoBazin.symbol}
                    onChange={(e) => {
                      const acao = ACOES.find(a => a.symbol === e.target.value);
                      if (acao) setAcaoBazin(acao);
                    }}
                    className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600"
                  >
                    {ACOES.filter(a => a.dy && a.dy > 0).map(acao => (
                      <option key={acao.symbol} value={acao.symbol}>
                        {acao.symbol} - {acao.name} (DY: {acao.dy?.toFixed(1)}%)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 text-sm block mb-2">Dividendo Mensal Desejado (R$)</label>
                  <input
                    type="number"
                    value={dividendoDesejado}
                    onChange={(e) => setDividendoDesejado(Number(e.target.value))}
                    className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600"
                  />
                </div>

                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm">Dados do Ativo</p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div><span className="text-slate-500">Preço:</span> <span className="text-white">R$ {acaoBazin.price.toFixed(2)}</span></div>
                    <div><span className="text-slate-500">DY:</span> <span className="text-green-400">{acaoBazin.dy?.toFixed(2)}%</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Resultado - Método Bazin</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-slate-700/50 rounded-lg">
                  <p className="text-slate-400 text-sm">Preço Justo (Bazin)</p>
                  <p className="text-3xl font-bold text-purple-400">R$ {resultadoBazin.precoJusto.toFixed(2)}</p>
                  <p className="text-slate-500 text-xs">Dividendo desejado / (DY% / 100)</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                    <p className="text-slate-400 text-sm">Ações Necessárias</p>
                    <p className="text-white font-bold">{resultadoBazin.acoesNecesarias.toFixed(0)}</p>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                    <p className="text-slate-400 text-sm">Provento Mensal</p>
                    <p className="text-green-400 font-bold">R$ {resultadoBazin.proventosMensal.toFixed(0)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                    <p className="text-slate-400 text-sm">Preço Atual</p>
                    <p className="text-white font-bold">R$ {resultadoBazin.precoAtual.toFixed(2)}</p>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                    <p className="text-slate-400 text-sm">Investimento Total</p>
                    <p className="text-green-400 font-bold">R$ {resultadoBazin.precoJusto.toFixed(0)}</p>
                  </div>
                </div>

                <div className={cn(
                  "p-4 rounded-lg text-center",
                  resultadoBazin.recomendada ? "bg-green-900/30" : "bg-red-900/30"
                )}>
                  <p className={cn("font-bold text-lg", resultadoBazin.recomendada ? "text-green-400" : "text-red-400")}>
                    {resultadoBazin.recomendada ? "✓ Preço atrativo para o dividendo desejado" : "✗ Preço não atrativo"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <p className="text-slate-300 text-sm">
                <strong className="text-blue-400">Sobre os Métodos:</strong>
              </p>
              <ul className="text-slate-400 text-sm mt-2 space-y-1">
                <li>• <strong>Graham:</strong> Baseado no livro "Investimento em Ações". Usa LPA e VPA para calcular preço justo.</li>
                <li>• <strong>Bazin:</strong> Baseado no livro "Como انتخاب Ações". Calcula preço baseado no dividendo desejado.</li>
                <li>• <strong>Dividendos:</strong> Projeção de rendimentos com crescimento de 5% ao ano (taxa histórica).</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
