import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <section className="pt-32 pb-20">
        <div className="max-w-md mx-auto px-4">
          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Criar Conta</CardTitle>
              <CardDescription className="text-slate-400">
                Comece a entender o mercado hoje mesmo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input 
                  label="Nome" 
                  placeholder="Seu nome"
                  icon={<User className="w-5 h-5" />}
                />
                <Input 
                  label="Email" 
                  type="email"
                  placeholder="seu@email.com"
                  icon={<Mail className="w-5 h-5" />}
                />
                <Input 
                  label="Senha" 
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock className="w-5 h-5" />}
                />
                <Input 
                  label="Confirmar Senha" 
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock className="w-5 h-5" />}
                />
                
                <Button className="w-full mt-6">
                  Criar Conta Grátis
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-slate-400 text-sm">
                  Já tem conta?{" "}
                  <Link href="/login" className="text-emerald-400 hover:text-emerald-300">
                    Entrar
                  </Link>
                </p>
              </div>
              
              <p className="mt-4 text-xs text-center text-slate-500">
                Ao criar conta, você concorda com nossos{" "}
                <Link href="/termos" className="text-slate-400 hover:text-emerald-400">Termos de Uso</Link>
                {" "}e{" "}
                <Link href="/privacidade" className="text-slate-400 hover:text-emerald-400">Política de Privacidade</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
