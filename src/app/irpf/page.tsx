"use client";

import { useState } from "react";
import { FileText, Calculator, Download, CheckCircle, AlertTriangle } from "lucide-react";

const incomeCategories = [
  { category: "Rendimentos Isentos", amount: 25000, tax: 0, color: "#22c55e" },
  { category: "Rendimentos Tributáveis", amount: 45000, tax: 6750, color: "#3b82f6" },
  { category: "Ganhos de Capital", amount: 12000, tax: 1800, color: "#f59e0b" },
  { category: "Dividendos", amount: 8500, tax: 0, color: "#a855f7" },
];

const deductions = [
  { item: "Previdência Privada", value: 12000 },
  { item: "Saúde", value: 4500 },
  { item: "Educação", value: 3200 },
  { item: "Dependentes (2)", value: 5280 },
];

export default function IrpfPage() {
  const [year, setYear] = useState("2024");

  const totalIncome = incomeCategories.reduce((acc, cat) => acc + cat.amount, 0);
  const totalTax = incomeCategories.reduce((acc, cat) => acc + cat.tax, 0);
  const totalDeductions = deductions.reduce((acc, d) => acc + d.value, 0);

  return (
    <div className="p-gutter max-w-container-dy mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="font-dy-h1 text-dy-h1 text-white mb-1">IRPF - Imposto de Renda</h1>
          <p className="text-text-secondary text-sm">Simulador de imposto de renda pessoa física</p>
        </div>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="bg-[#0f0f13] border border-[#252529] rounded-lg px-4 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
        >
          <option>2024</option>
          <option>2023</option>
          <option>2022</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#0f0f13] border border-[#252529] rounded-xl p-6">
          <span className="text-text-secondary text-xs uppercase tracking-wider block mb-2">Rendimentos Totais</span>
          <div className="font-dy-data-lg text-dy-data-lg text-white">
            R$ {totalIncome.toLocaleString()}
          </div>
        </div>
        <div className="bg-[#0f0f13] border border-[#252529] rounded-xl p-6">
          <span className="text-text-secondary text-xs uppercase tracking-wider block mb-2">Imposto Devido</span>
          <div className="font-dy-data-lg text-dy-data-lg text-accent-red">
            R$ {totalTax.toLocaleString()}
          </div>
        </div>
        <div className="bg-[#0f0f13] border border-[#252529] rounded-xl p-6">
          <span className="text-text-secondary text-xs uppercase tracking-wider block mb-2">Deduções</span>
          <div className="font-dy-data-lg text-dy-data-lg text-accent-green">
            R$ {totalDeductions.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Income Categories */}
      <div className="bg-[#0f0f13] border border-[#252529] rounded-xl p-6 mb-6">
        <h3 className="text-text-secondary text-xs uppercase tracking-wider mb-6">Rendimentos por Categoria</h3>
        <div className="space-y-4">
          {incomeCategories.map((cat) => (
            <div key={cat.category}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white">{cat.category}</span>
                <span className="text-zinc-300">R$ {cat.amount.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-[#252529] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(cat.amount / totalIncome) * 100}%`, backgroundColor: cat.color }}
                ></div>
              </div>
              {cat.tax > 0 && (
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-accent-red">Imposto: R$ {cat.tax.toLocaleString()}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Deductions Table */}
      <div className="bg-[#0f0f13] border border-[#252529] rounded-xl overflow-hidden mb-6">
        <div className="p-6 border-b border-[#252529]">
          <h3 className="text-text-secondary text-xs uppercase tracking-wider">Deduções</h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#252529] bg-[#0a0a0c]">
              <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider">Item</th>
              <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            {deductions.map((d) => (
              <tr key={d.item} className="border-b border-[#252529] hover:bg-[#121215] transition-colors">
                <td className="p-4 text-sm text-white">{d.item}</td>
                <td className="p-4 text-right font-mono text-sm text-zinc-300">R$ {d.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-[#0f0f13] border border-[#252529] rounded-xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-400 leading-relaxed">
          <strong className="text-zinc-300">Aviso:</strong> Esta é uma simulação simplificada. 
          Consulte um contador para cálculos oficiais de IRPF. 
          Investir envolve riscos. Não dizemos "compre" ou "venda". Analisamos dados, fatos e notícias...
        </p>
      </div>
    </div>
  );
}
