"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, ArrowRight, Mail, Lock, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        setSuccess("Conta criada com sucesso! Verifique seu e-mail para confirmar.");
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao processar sua solicitação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-liquid-dark liquid-noise flex items-center justify-center p-4">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2997ff] to-[#0077ed] flex items-center justify-center shadow-lg shadow-[#2997ff]/20 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">DY<span className="text-[#2997ff]">Invest</span></span>
        </Link>
      </div>

      <Card variant="liquid" className="w-full max-w-md border-white/[0.06] shadow-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2997ff]/5 to-[#5e5ce6]/5 pointer-events-none rounded-2xl" />
        
        <CardHeader className="space-y-2 pb-8 pt-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-white/[0.1] to-white/[0.05] flex items-center justify-center mb-4 border border-white/[0.08]">
            {isLogin ? <Lock className="w-6 h-6 text-[#2997ff]" /> : <Mail className="w-6 h-6 text-[#5e5ce6]" />}
          </div>
          <CardTitle className="text-3xl font-bold text-white">
            {isLogin ? "Bem-vindo de volta" : "Criar sua conta"}
          </CardTitle>
          <CardDescription className="text-white/[0.5]">
            {isLogin 
              ? "Acesse sua inteligência financeira." 
              : "Junte-se aos investidores que decidem com dados."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/[0.5] uppercase tracking-widest ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/[0.3]" />
                <Input 
                  type="email" 
                  placeholder="exemplo@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/[0.05] border-white/[0.08] pl-10 focus:border-[#2997ff]/50 transition-all py-6 h-12 text-white placeholder:text-white/[0.25]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-medium text-white/[0.5] uppercase tracking-widest">Senha</label>
                {isLogin && (
                  <Link href="/recuperar" className="text-[10px] text-[#2997ff] hover:text-[#3ba4ff] font-medium transition-colors">
                    Esqueceu?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/[0.3]" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/[0.05] border-white/[0.08] pl-10 focus:border-[#2997ff]/50 transition-all py-6 h-12 text-white placeholder:text-white/[0.25]"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-xs font-medium leading-tight">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-[#2997ff]/10 border border-[#2997ff]/20 p-3 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2997ff] flex-shrink-0" />
                <p className="text-[#2997ff] text-xs font-medium leading-tight">{success}</p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full font-semibold py-6 rounded-xl group h-12"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? "Entrar" : "Começar Agora"}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/[0.06]"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0d0d0f] px-4 text-white/[0.3] font-medium tracking-widest">Ou continuar com</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="bg-white/[0.05] border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.2] transition-all py-6 h-12">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              Github
            </Button>
            <Button variant="outline" className="bg-white/[0.05] border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.2] transition-all py-6 h-12">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>
          </div>

          <p className="text-center text-sm text-white/[0.4] mt-8">
            {isLogin ? "Não tem uma conta?" : "Já possui uma conta?"}{" "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#2997ff] font-semibold hover:text-[#3ba4ff] transition-colors ml-1"
            >
              {isLogin ? "Cadastre-se grátis" : "Faça login"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}