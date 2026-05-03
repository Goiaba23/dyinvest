-- =============================================
-- CORREÇÃO: Políticas já existentes
-- Execute apenas esta parte se as políticasderem erro
-- =============================================

-- Drop políticas existentes (se houver)
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own portfolio" ON portfolios;
DROP POLICY IF EXISTS "Users can insert own portfolio" ON portfolios;
DROP POLICY IF EXISTS "Users can update own portfolio" ON portfolios;
DROP POLICY IF EXISTS "Users can delete own portfolio" ON portfolios;
DROP POLICY IF EXISTS "Users can view own alerts" ON alerts;
DROP POLICY IF EXISTS "Users can manage own alerts" ON alerts;
DROP POLICY IF EXISTS "Users can manage own favorites" ON favorites;
DROP POLICY IF EXISTS "Users can view own history" ON analysis_history;
DROP POLICY IF EXISTS "Users can insert own history" ON analysis_history;

-- Recriar políticas
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own portfolio" ON portfolios
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own portfolio" ON portfolios
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolio" ON portfolios
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own portfolio" ON portfolios
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own alerts" ON alerts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own alerts" ON alerts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own favorites" ON favorites
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own history" ON analysis_history
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert own history" ON analysis_history
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

SELECT 'Políticas recriadas com sucesso!' AS resultado;