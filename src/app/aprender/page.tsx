"use client";

import { useState } from "react";
import { BookOpen, TrendingUp, Calculator, Search, FileText, GraduationCap, Play } from "lucide-react";

const courses = [
  { id: 1, title: "Introdução ao Mercado de Ações", level: "Iniciante", duration: "45 min", progress: 100, icon: BookOpen },
  { id: 2, title: "Entendendo P/L e P/VP", level: "Iniciante", duration: "30 min", progress: 75, icon: Calculator },
  { id: 3, title: "Análise Técnica Básica", level: "Intermediário", duration: "60 min", progress: 50, icon: TrendingUp },
  { id: 4, title: "Renda Fixa e CDBs", level: "Iniciante", duration: "40 min", progress: 100, icon: FileText },
  { id: 5, title: "Criptomoedas 101", level: "Iniciante", duration: "50 min", progress: 0, icon: Play },
  { id: 6, title: "Análise Fundamentalista", level: "Avançado", duration: "90 min", progress: 0, icon: GraduationCap },
];

const glossary = [
  { term: "P/L (Preço/Lucro)", definition: "Indica quantos anos levaria para recuperar o investimento com base no lucro." },
  { term: "P/VP (Preço/Valor Patrimonial)", definition: "Relação entre preço de mercado e valor contábil da empresa." },
  { term: "DY (Dividend Yield)", definition: "Percentual de dividendos pagos em relação ao preço da ação." },
  { term: "ROE (Return on Equity)", definition: "Retorno sobre o patrimônio líquido da empresa." },
  { term: "Crawl4AI", definition: "Ferramenta de extração de dados web usada para coletar notícias." },
  { term: "Stop Loss", definition: "Ordem de venda automática para limitar perdas." },
];

export default function AprenderPage() {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <div className="p-gutter max-w-container-dy mx-auto">
      <div className="mb-6">
        <h1 className="font-dy-h1 text-dy-h1 text-white mb-1">Aprender</h1>
        <p className="text-text-secondary text-sm">Educação financeira para iniciantes</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-[#252529]">
        {["courses", "glossary"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-medium uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === tab
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-zinc-500 hover:text-white"
            }`}
          >
            {tab === "courses" ? "Cursos" : "Glossário"}
          </button>
        ))}
      </div>

      {/* Courses */}
      {activeTab === "courses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-[#0f0f13] border border-[#252529] rounded-xl p-6 hover:border-zinc-700 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <course.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    course.level === "Iniciante" ? "bg-accent-green/10 text-accent-green" :
                    course.level === "Intermediário" ? "bg-amber-500/10 text-amber-400" :
                    "bg-red-500/10 text-red-500"
                  }`}>
                    {course.level}
                  </span>
                </div>
              </div>

              <h3 className="text-white text-sm font-medium mb-2 group-hover:text-blue-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-zinc-500 text-xs mb-4">{course.duration}</p>

              {/* Progress Bar */}
              <div className="mt-auto">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-500">Progresso</span>
                  <span className="text-zinc-300">{course.progress}%</span>
                </div>
                <div className="h-1.5 bg-[#252529] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      course.progress === 100 ? "bg-accent-green" : "bg-blue-500"
                    }`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              {course.progress === 0 && (
                <button className="mt-4 w-full py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Começar
                </button>
              )}
              {course.progress > 0 && course.progress < 100 && (
                <button className="mt-4 w-full py-2 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-lg hover:bg-blue-500/30 transition-colors">
                  Continuar
                </button>
              )}
              {course.progress === 100 && (
                <button className="mt-4 w-full py-2 bg-accent-green/10 text-accent-green text-xs font-medium rounded-lg hover:bg-accent-green/20 transition-colors">
                  Revisar
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Glossary */}
      {activeTab === "glossary" && (
        <div className="bg-[#0f0f13] border border-[#252529] rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#252529] bg-[#0a0a0c]">
                <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider">Termo</th>
                <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider">Definição</th>
              </tr>
            </thead>
            <tbody>
              {glossary.map((item, idx) => (
                <tr key={idx} className="border-b border-[#252529] hover:bg-[#121215] transition-colors">
                  <td className="p-4">
                    <span className="text-sm font-medium text-white">{item.term}</span>
                  </td>
                  <td className="p-4 text-sm text-zinc-400">{item.definition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
