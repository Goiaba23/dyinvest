import { NextRequest, NextResponse } from 'next/server';
import { 
  signUp, 
  signIn, 
  signOut, 
  getSession, 
  getCurrentUser,
  isSupabaseAuthConfigured,
  resetPassword
} from '@/lib/auth/supabase-auth';
import { getProfile, updateProfile, createProfile } from '@/lib/db/supabase-client';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action') || 'status';

  // Se Supabase não configurado, retornar mensagem
  if (!isSupabaseAuthConfigured()) {
    return NextResponse.json({
      success: false,
      error: 'Supabase não configurado. Configure as variáveis de ambiente.',
      configured: false
    }, { status: 503 });
  }

  try {
    switch (action) {
      case 'status':
        const session = await getSession();
        return NextResponse.json({
          success: true,
          configured: true,
          authenticated: !!session,
          message: session ? 'Usuário logado' : 'Nenhum usuário logado',
          features: ['register', 'login', 'logout', 'verify', 'profile'],
          timestamp: new Date().toISOString()
        });

      case 'verify':
        const token = request.headers.get('authorization')?.replace('Bearer ', '');
        if (!token) {
          return NextResponse.json({ error: 'Token required' }, { status: 401 });
        }
        
        const user = await getCurrentUser();
        if (!user) {
          return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }
        
        return NextResponse.json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name
          },
          timestamp: new Date().toISOString()
        });

      case 'profile':
        const profileUser = await getCurrentUser();
        if (!profileUser) {
          return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }
        
        const profile = await getProfile(profileUser.id);
        return NextResponse.json({
          success: true,
          profile,
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json({
          success: true,
          message: 'Use POST to register or login',
          timestamp: new Date().toISOString()
        });
    }
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Se Supabase não configurado, retornar erro
  if (!isSupabaseAuthConfigured()) {
    return NextResponse.json({
      success: false,
      error: 'Supabase não configurado',
      configured: false
    }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { action, email, password, name } = body;

    switch (action) {
      case 'register':
        if (!email || !password) {
          return NextResponse.json(
            { error: 'email and password are required' },
            { status: 400 }
          );
        }

        const signUpData = await signUp(email, password, name);
        
        return NextResponse.json({
          success: true,
          user: signUpData.user,
          message: 'User registered successfully. Check email for verification.',
          timestamp: new Date().toISOString()
        });

      case 'login':
        if (!email || !password) {
          return NextResponse.json(
            { error: 'email and password are required' },
            { status: 400 }
          );
        }

        const loginData = await signIn(email, password);
        
        return NextResponse.json({
          success: true,
          user: {
            id: loginData.user.id,
            email: loginData.user.email,
            name: loginData.user.user_metadata?.name
          },
          timestamp: new Date().toISOString()
        });

      case 'logout':
        await signOut();
        return NextResponse.json({
          success: true,
          message: 'Logged out successfully',
          timestamp: new Date().toISOString()
        });

      case 'reset_password':
        if (!email) {
          return NextResponse.json(
            { error: 'email is required' },
            { status: 400 }
          );
        }

        await resetPassword(email);
        return NextResponse.json({
          success: true,
          message: 'Password reset email sent',
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action', availableActions: ['register', 'login', 'logout', 'reset_password'] },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('Auth POST error:', error);
    
    // Tratar erros específicos do Supabase
    if (error.message?.includes('Email not confirmed')) {
      return NextResponse.json(
        { success: false, error: 'Email não confirmado. Verifique sua caixa de email.' },
        { status: 400 }
      );
    }
    
    if (error.message?.includes('Invalid login credentials')) {
      return NextResponse.json(
        { success: false, error: 'Email ou senha incorretos' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}