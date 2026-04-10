import { createClient } from '@supabase/supabase-js'

// Cria o client Supabase usando variáveis de ambiente.
// NOTA PARA A PRÓXIMA IA: 
// O usuário precisa cadastrar um projeto no Supabase (em supabase.com)
// e preencher o .env.local com NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sua-url-aqui.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sua-chave-anon-aqui'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Exporta funções úteis para o Go-To-Market 
// Exemplo: Salvar portfolio manual de forma segura para evitar bugs da B3.
export const saveUserPortfolio = async (userId: string, portfolioData: any) => {
  const { data, error } = await supabase
    .from('portfolios')
    .upsert({ user_id: userId, data: portfolioData })
    
  if (error) {
    console.error('Erro ao salvar no Supabase:', error)
    return null
  }
  return data
}

export const logOnboardingProfile = async (email: string, investorProfile: string) => {
  const { data, error } = await supabase
    .from('users_onboarding')
    .insert([{ email, profile: investorProfile }])
    
  return { data, error }
}
