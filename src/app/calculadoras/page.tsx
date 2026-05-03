"use client";

import { FileText, Calculator, PiggyBank, TrendingUp } from "lucide-react";
import { useState } from "react";

const calculators = [
  {
    id: "compound",
    name: "Juros Compostos",
    description: "Calcule o crescimento exponencial do seu investimento",
    icon: TrendingUp,
    color: "#3b82f6"
  },
  {
    id: "dca",
    name: "Dollar Cost Averaging",
    description: "Simule aportes mensais regulares",
    icon: PiggyBank,
    color: "#22c55e"
  },
  {
    id: "retirement",
    name: "Aposentadoria",
    description: "Calcule quanto precisa poupar para se aposentar",
    icon: Calculator,
    color: "#a855f7"
  },
  {
    id: "income",
    name: "Renda Fixa",
    description: "Simule investimentos em renda fixa",
    icon: FileText,
    color: "#f59e0b"
  },
];

const compoundData = [
  { month: "1", without: 10000, with: 11000 },
  { month: "2", without: 10000, with: 12100 },
  { month: "3", without: 10000, with: 13310 },
  { month: "6", without: 10000, with: 17716 },
  { month: "12", without: 10000, with: 31384 },
  { month: "24", without: 10000, with: 98500 },
];

export default function CalculadorasPage() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(10);
  const [months, setMonths] = useState(12);

  const futureValue = principal * Math.pow(1 + rate / 100 / 12, months);

  return (
    <div className="p-gutter max-w-container-dy mx-auto">
      <div className="mb-6">
        <h1 className="font-dy-h1 text-dy-h1 text-white mb-1">Calculadoras</h1>
        <p className="text-text-secondary text-sm">Ferramentas para simular investimentos</p>
      </div>

      {/* Calculator Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-6">
        {calculators.map((calc) => (
          <div
            key={calc.id}
            className="bg-[#0f0f13] border border-[#252529] rounded-xl p-6 hover:border-zinc-700 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${calc.color}20`, border: `1px solid ${calc.color}30` }}>
                <calc.icon className="w-5 h-5" style={{ color: calc.color }} />
              </div>
              <h3 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                {calc.name}
              </h3>
            </div>
            <p className="text-xs text-zinc-400">{calc.description}</p>
          </div>
        ))}
      </div>

      {/* Compound Interest Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-1 bg-[#0f0f13] border border-[#252529] rounded-xl p-6">
          <h3 className="text-text-secondary text-xs uppercase tracking-wider mb-6">Juros Compostos</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">Capital Inicial</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(parseInt(e.target.value) || 0)}
                className="w-full bg-[#121216] border border-[#252529] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">Taxa Mensal (%)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(parseInt(e.target.value) || 0)}
                className="w-full bg-[#121216] border border-[#252529] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">Período (meses)</label>
              <input
                type="number"
                value={months}
                onChange={(e) => setMonths(parseInt(e.target.value) || 1)}
                className="w-full bg-[#121216] border border-[#252529] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="pt-4 border-t border-[#252529]">
              <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Valor Futuro</div>
              <div className="font-dy-data-lg text-dy-data-lg text-accent-green">
                R$ {futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#0f0f13] border border-[#252529] rounded-xl p-6">
          <h3 className="text-text-secondary text-xs uppercase tracking-wider mb-6">Evolução do Investimento</h3>
          <div className="h-64 flex items-end gap-1">
            {compoundData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-blue-500/20 rounded-t"
                  style={{ height: `${(d.with / 100000) * 100}%` }}
                ></div>
                <span className="text-[10px] text-zinc-500">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
