import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  email: string;
};

export type UserPreferences = {
  objetivo: string;
  ativos: string[];
  nivel_risco: string;
  linguagem_simples: boolean;
  alertas: string;
};

export async function savePreferences(preferences: UserPreferences) {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.user) {
    const { error } = await supabase
      .from('user_preferences')
      .upsert({ 
        user_id: session.user.id, 
        ...preferences,
        updated_at: new Date().toISOString()
      });
      
    if (error) throw error;
  } else {
    // Fallback para localStorage se não logado
    localStorage.setItem('dyinvest_preferences', JSON.stringify(preferences));
  }
}

export async function getPreferences(): Promise<UserPreferences | null> {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.user) {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', session.user.id)
      .single();
      
    if (!error && data) return data as UserPreferences;
  }
  
  const local = localStorage.getItem('dyinvest_preferences');
  return local ? JSON.parse(local) : null;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export type PortfolioItem = {
  id?: string;
  user_id?: string;
  symbol: string;
  quantity: number;
  avg_price: number;
  sector?: string;
  asset_type?: string;
  created_at?: string;
  updated_at?: string;
};

export async function syncPortfolio(): Promise<PortfolioItem[]> {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.user) {
    // 1. Tenta buscar da nuvem
    const { data, error } = await supabase
      .from('portfolio_assets')
      .select('*')
      .eq('user_id', session.user.id);
      
    if (error) {
      console.error('Erro ao sincronizar do Supabase:', error);
    } else if (data && data.length > 0) {
      // 2. Se houver dados na nuvem, atualiza o local para manter coerência
      localStorage.setItem('dyinvest_portfolio', JSON.stringify(data));
      return data as PortfolioItem[];
    }
  }
  
  // 3. Fallback ou Fonte Inicial: LocalStorage
  const local = localStorage.getItem('dyinvest_portfolio');
  return local ? JSON.parse(local) : [];
}

export async function pushLocalToCloud() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return;

  const localItems = JSON.parse(localStorage.getItem('dyinvest_portfolio') || '[]');
  if (localItems.length === 0) return;

  const itemsToPush = localItems.map((item: any) => ({
    user_id: session.user.id,
    symbol: item.symbol,
    quantity: item.quantity,
    avg_price: item.avgPrice || item.avg_price,
    sector: item.sector,
    asset_type: item.type || item.asset_type
  }));

  const { error } = await supabase
    .from('portfolio_assets')
    .upsert(itemsToPush, { onConflict: 'user_id,symbol' });

  if (error) throw error;
}

export type Analise = {
  id: string;
  user_id: string;
  pergunta: string;
  resposta: string;
  created_at: string;
};