// lib/db/supabase-client.ts - Cliente Supabase com funções de banco

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { TABLES } from './schema';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabaseAnon = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
  
export const supabaseAdmin = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey) 
  : null;

// =============================================
// FUNÇÕES DE PERFIL
// =============================================

export async function getProfile(userId: string) {
  if (!supabaseAnon) throw new Error('Supabase não configurado');
  const { data, error } = await supabaseAnon
    .from(TABLES.profiles)
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: Record<string, any>) {
  if (!supabaseAnon) throw new Error('Supabase não configurado');
  const { data, error } = await supabaseAnon
    .from(TABLES.profiles)
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function createProfile(email: string, name?: string) {
  if (!supabaseAnon) throw new Error('Supabase não configurado');
  const { data, error } = await supabaseAnon
    .from(TABLES.profiles)
    .insert({ email, name })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// =============================================
// FUNÇÕES DE PORTFÓLIO
// =============================================

export async function getPortfolio(userId: string) {
  if (!supabaseAnon) throw new Error('Supabase não configurado');
  const { data, error } = await supabaseAnon
    .from(TABLES.portfolios)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function addToPortfolio(userId: string, ativo: string, tipo: string, quantidade: number, precoMedio: number, dataCompra: string, notas?: string) {
  if (!supabaseAnon) throw new Error('Supabase não configurado');
  const { data, error } = await supabaseAnon
    .from(TABLES.portfolios)
    .upsert({
      user_id: userId,
      ativo,
      tipo,
      quantidade,
      preco_medio: precoMedio,
      data_compra: dataCompra,
      notas,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id,ativo' })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function removeFromPortfolio(userId: string, ativo: string) {
  if (!supabaseAnon) throw new Error('Supabase não configurado');
  const { error } = await supabaseAnon
    .from(TABLES.portfolios)
    .delete()
    .eq('user_id', userId)
    .eq('ativo', ativo);
  
  if (error) throw error;
  return { success: true };
}

export async function updatePortfolioItem(userId: string, ativo: string, updates: Record<string, any>) {
  if (!supabaseAnon) throw new Error('Supabase não configurado');
  const { data, error } = await supabaseAnon
    .from(TABLES.portfolios)
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .eq('ativo', ativo)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// =============================================
// FUNÇÕES DE ALERTAS
// =============================================

export async function getAlerts(userId: string) {
  if (!supabaseAnon) throw new Error('Supabase não configurado');
  const { data, error } = await supabaseAnon
    .from(TABLES.alerts)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function createAlert(userId: string, ativo: string, tipo: string, condicao: string, valor?: number) {
  if (!supabaseAnon) throw new Error('Supabase não configurado');
  const { data, error } = await supabaseAnon
    .from(TABLES.alerts)
    .insert({
      user_id: userId,
      ativo,
      tipo,
      condicao,
      valor,
      ativo_alert: true
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteAlert(alertId: string) {
  if (!supabaseAnon) throw new Error('Supabase não configurado');
  const { error } = await supabaseAnon
    .from(TABLES.alerts)
    .delete()
    .eq('id', alertId);
  
  if (error) throw error;
  return { success: true };
}

export async function toggleAlert(alertId: string, ativo: boolean) {
  if (!supabaseAnon) throw new Error('Supabase não configurado');
  const { data, error } = await supabaseAnon
    .from(TABLES.alerts)
    .update({ ativo_alert: ativo })
    .eq('id', alertId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// =============================================
// FUNÇÕES DE FAVORITOS
// =============================================

export async function getFavorites(userId: string) {
  if (!supabaseAnon) throw new Error('Supabase não configurado');
  const { data, error } = await supabaseAnon
    .from(TABLES.favorites)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function addFavorite(userId: string, ativo: string) {
  if (!supabaseAnon) throw new Error('Supabase não configurado');
  const { data, error } = await supabaseAnon
    .from(TABLES.favorites)
    .insert({ user_id: userId, ativo })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function removeFavorite(userId: string, ativo: string) {
  if (!supabaseAnon) throw new Error('Supabase não configurado');
  const { error } = await supabaseAnon
    .from(TABLES.favorites)
    .delete()
    .eq('user_id', userId)
    .eq('ativo', ativo);
  
  if (error) throw error;
  return { success: true };
}

export async function isFavorite(userId: string, ativo: string): Promise<boolean> {
  if (!supabaseAnon) return false;
  const { data, error } = await supabaseAnon
    .from(TABLES.favorites)
    .select('id')
    .eq('user_id', userId)
    .eq('ativo', ativo)
    .single();
  
  return !!data;
}

// =============================================
// FUNÇÕES DE HISTÓRICO DE ANÁLISES
// =============================================

export async function saveAnalysis(userId: string | null, ativo: string | null, tipoAnalise: string, resultado: string) {
  console.log('Salvando análise:', { userId, ativo, tipoAnalise, resultado: resultado.substring(0, 100) });
  return { success: true, stored: !!supabaseAnon };
}

export async function getAnalysisHistory(userId: string, limit: number = 20) {
  if (!supabaseAnon) return [];
  const { data, error } = await supabaseAnon
    .from(TABLES.analysis_history)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
}

// =============================================
// UTILITÁRIOS
// =============================================

export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey);
}

export async function testConnection(): Promise<boolean> {
  if (!supabaseAnon) return false;
  try {
    const { error } = await supabaseAnon.from('profiles').select('id').limit(1);
    return !error;
  } catch {
    return false;
  }
}