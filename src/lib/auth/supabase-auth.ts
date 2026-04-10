// lib/auth/supabase-auth.ts - Autenticação com Supabase

import { createClient, User } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabaseAuth = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, { 
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    }) 
  : null;

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  plan?: string;
}

// Registrar novo usuário
export async function signUp(email: string, password: string, name?: string) {
  if (!supabaseAuth) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabaseAuth.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name || email.split('@')[0]
      }
    }
  });

  if (error) throw error;
  return data;
}

// Login com email e senha
export async function signIn(email: string, password: string) {
  if (!supabaseAuth) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabaseAuth.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

// Logout
export async function signOut() {
  if (!supabaseAuth) {
    throw new Error('Supabase não configurado');
  }

  const { error } = await supabaseAuth.auth.signOut();
  if (error) throw error;
}

// Verificar sessão atual
export async function getSession() {
  if (!supabaseAuth) {
    return null;
  }

  const { data: { session }, error } = await supabaseAuth.auth.getSession();
  if (error) throw error;
  return session;
}

// Verificar usuário atual
export async function getCurrentUser() {
  if (!supabaseAuth) {
    return null;
  }

  const { data: { user }, error } = await supabaseAuth.auth.getUser();
  if (error) throw error;
  return user;
}

// Escutar mudanças de auth
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  if (!supabaseAuth) {
    return () => {};
  }

  return supabaseAuth.auth.onAuthStateChange(callback);
}

// Redefinir senha
export async function resetPassword(email: string) {
  if (!supabaseAuth) {
    throw new Error('Supabase não configurado');
  }

  const { error } = await supabaseAuth.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`
  });

  if (error) throw error;
}

// Verificar se está configurado
export function isSupabaseAuthConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey && supabaseAuth);
}