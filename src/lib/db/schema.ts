// lib/db/schema.ts - Schema do banco de dados Supabase

export const TABLES = {
  // Tabela de usuários (estende o auth do Supabase)
  profiles: 'profiles',
  
  // Tabela de portfólio do usuário
  portfolios: 'portfolios',
  
  // Tabela de alertas
  alerts: 'alerts',
  
  // Tabela de ativos favoritos
  favorites: 'favorites',
  
  // Tabela de histórico de análises
  analysis_history: 'analysis_history',
};

export const SQL_SCHEMA = `
-- =============================================
-- SCHEMA DO BANCO - MEU INVESTIMENTO AI
-- =============================================

-- 1. Tabela de profiles (extende auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'premium')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Preferências
  objetivo TEXT CHECK (objetivo IN ('investir', 'proteger', 'aprender')),
  nivel_risco TEXT CHECK (nivel_risco IN ('baixo', 'medio', 'alto')),
  linguagem_simples BOOLEAN DEFAULT true,
  alertas TEXT CHECK (alertas IN ('whatsapp', 'email', 'nenhum')),
  
  -- Dados demográficos
  idade INTEGER,
  experiencia TEXT CHECK (experiencia IN ('iniciante', 'intermediario', 'avancado')),
  renda_mensal DECIMAL(12,2),
  objetivos TEXT[]
);

-- 2. Tabela de portfólio
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  ativo TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('acao', 'etf', 'fii', 'cripto', 'renda_fixa', 'tesouro', 'stock')),
  quantidade DECIMAL(18,8) NOT NULL,
  preco_medio DECIMAL(18,8) NOT NULL,
  data_compra DATE NOT NULL,
  notas TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, ativo)
);

-- 3. Tabela de alertas
CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  ativo TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('preco_alta', 'preco_baixa', 'dy_maior', 'dy_menor', 'noticia')),
  condicao TEXT NOT NULL,
  valor DECIMAL(18,8),
  ativo_alert BOOLEAN DEFAULT true,
  enviado BOOLEAN DEFAULT false,
  triggered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabela de favoritos
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  ativo TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, ativo)
);

-- 5. Tabela de histórico de análises
CREATE TABLE IF NOT EXISTS analysis_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  ativo TEXT,
  tipo_analise TEXT NOT NULL CHECK (tipo_analise IN ('mercado', 'ativo', 'portfolio', 'chat')),
  resultado TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Tabela de sync de dados
CREATE TABLE IF NOT EXISTS data_sync_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL CHECK (source IN ('yahoo', 'coingecko', 'mercado_bitcoin', 'manual')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'success', 'error')),
  records_updated INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- =============================================
-- ÍNDICES PARA PERFORMANCE
-- =============================================
CREATE INDEX IF NOT EXISTS idx_portfolios_user ON portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_user ON alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_ativo ON alerts(ativo);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_analysis_user ON analysis_history(user_id);
CREATE INDEX IF NOT EXISTS idx_analysis_created ON analysis_history(created_at DESC);

-- =============================================
-- POLÍTICAS DE SEGURANÇA (RLS)
-- =============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_history ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para portfólio
CREATE POLICY "Users can view own portfolio" ON portfolios
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own portfolio" ON portfolios
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolio" ON portfolios
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own portfolio" ON portfolios
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para alertas
CREATE POLICY "Users can view own alerts" ON alerts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own alerts" ON alerts
  FOR ALL USING (auth.uid() = user_id);

-- Políticas para favoritos
CREATE POLICY "Users can manage own favorites" ON favorites
  FOR ALL USING (auth.uid() = user_id);

-- Políticas para histórico de análises
CREATE POLICY "Users can view own history" ON analysis_history
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert own history" ON analysis_history
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- =============================================
-- TRIGGERS
-- =============================================

-- Trigger para criar profile automaticamente ao criar usuário
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
`;

export const TABLES_STRUCTURE = {
  profiles: {
    columns: ['id', 'email', 'name', 'plan', 'objetivo', 'nivel_risco', 'linguagem_simples', 'alertas', 'created_at'],
    required: ['id', 'email'],
  },
  portfolios: {
    columns: ['id', 'user_id', 'ativo', 'tipo', 'quantidade', 'preco_medio', 'data_compra'],
    required: ['user_id', 'ativo', 'quantidade', 'preco_medio'],
  },
  alerts: {
    columns: ['id', 'user_id', 'ativo', 'tipo', 'condicao', 'valor', 'ativo_alert'],
    required: ['user_id', 'ativo', 'tipo', 'condicao'],
  },
  favorites: {
    columns: ['id', 'user_id', 'ativo', 'created_at'],
    required: ['user_id', 'ativo'],
  },
  analysis_history: {
    columns: ['id', 'user_id', 'ativo', 'tipo_analise', 'resultado', 'created_at'],
    required: ['tipo_analise', 'resultado'],
  },
};