// lib/ia/auth.ts - Sistema de Autenticação

import crypto from 'crypto';

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash?: string;
  googleId?: string;
  avatar?: string;
  plan: 'free' | 'pro';
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
}

// Simulação de banco de dados (em produção, usar Supabase/PostgreSQL)
const usersDB: Map<string, User> = new Map();
const sessions: Map<string, string> = new Map(); // sessionToken -> userId

// Gerar ID único
function generateId(): string {
  return 'user_' + crypto.randomBytes(8).toString('hex');
}

// Gerar hash de senha
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Verificar senha
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Gerar token de sessão
function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Registrar usuário
export function registerUser(email: string, name: string, password: string): { success: boolean; user?: User; error?: string } {
  // Verificar se email já existe
  const existingUser = Array.from(usersDB.values()).find(u => u.email === email);
  if (existingUser) {
    return { success: false, error: 'Email já cadastrado' };
  }

  const user: User = {
    id: generateId(),
    email,
    name,
    passwordHash: hashPassword(password),
    plan: 'free',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    emailVerified: false,
  };

  usersDB.set(user.id, user);

  return { success: true, user };
}

// Login com email/senha
export function login(email: string, password: string): { success: boolean; user?: User; token?: string; error?: string } {
  const user = Array.from(usersDB.values()).find(u => u.email === email);
  
  if (!user) {
    return { success: false, error: 'Usuário não encontrado' };
  }

  if (!user.passwordHash) {
    return { success: false, error: 'Faça login com Google' };
  }

  if (!verifyPassword(password, user.passwordHash)) {
    return { success: false, error: 'Senha incorreta' };
  }

  // Criar sessão
  const token = generateSessionToken();
  sessions.set(token, user.id);

  return { success: true, user, token };
}

// Login com Google
export function loginWithGoogle(googleId: string, email: string, name: string, avatar?: string): { success: boolean; user?: User; token?: string } {
  let user = Array.from(usersDB.values()).find(u => u.googleId === googleId);

  if (!user) {
    // Criar novo usuário
    user = {
      id: generateId(),
      email,
      name,
      googleId,
      avatar,
      plan: 'free',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      emailVerified: true,
    };
    usersDB.set(user.id, user);
  }

  const token = generateSessionToken();
  sessions.set(token, user.id);

  return { success: true, user, token };
}

// Verificar token de sessão
export function verifyToken(token: string): User | null {
  const userId = sessions.get(token);
  if (!userId) return null;
  
  return usersDB.get(userId) || null;
}

// Logout
export function logout(token: string): void {
  sessions.delete(token);
}

// Atualizar perfil
export function updateProfile(userId: string, data: Partial<User>): User | null {
  const user = usersDB.get(userId);
  if (!user) return null;

  const updatedUser = {
    ...user,
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  usersDB.set(userId, updatedUser);
  return updatedUser;
}

// Obter usuário por ID
export function getUserById(userId: string): User | null {
  return usersDB.get(userId) || null;
}

// Criar usuário admin (para testes)
export function createTestUser(): User {
  const testUser: User = {
    id: 'user_test123',
    email: 'teste@exemplo.com',
    name: 'Usuário Teste',
    passwordHash: hashPassword('123456'),
    plan: 'pro',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    emailVerified: true,
  };
  
  usersDB.set(testUser.id, testUser);
  return testUser;
}

// Inicializar usuário de teste se não existir
export function initTestUser() {
  if (!Array.from(usersDB.values()).find(u => u.email === 'teste@exemplo.com')) {
    createTestUser();
  }
}