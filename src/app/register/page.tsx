"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register attempt", { name, email, password });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="font-dy-h1 text-3xl text-white mb-2">Crie sua Conta</h1>
          <p className="text-zinc-400">Comece a investir com inteligência</p>
        </div>

        <div className="bg-[#0f0f13] border border-[#252529] rounded-2xl p-8">
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-wider block mb-2">
                Nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full bg-[#121216] border border-[#252529] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-wider block mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-[#121216] border border-[#252529] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-wider block mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full bg-[#121216] border border-[#252529] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Cadastrar
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#252529] text-center">
            <p className="text-zinc-400 text-sm">
              Já tem conta?{" "}
              <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
