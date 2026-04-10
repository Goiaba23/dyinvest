import { NextRequest, NextResponse } from 'next/server';
import { 
  processOnboarding, 
  generatePersonalizedDashboard,
  saveUserProfile,
  getUserProfile,
  updateUserPreferences,
  OnboardingAnswers 
} from '@/lib/ia/user-onboarding';

// Simulação de banco de dados (em produção, usar Supabase)
const usersDB: Map<string, any> = new Map();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action') || 'status';
  const userId = searchParams.get('userId');

  try {
    switch (action) {
      case 'status':
        return NextResponse.json({
          success: true,
          message: 'User Onboarding API is running',
          features: [
            'submit - Submit onboarding answers',
            'profile - Get user profile',
            'dashboard - Get personalized dashboard',
            'preferences - Update user preferences'
          ],
          timestamp: new Date().toISOString()
        });

      case 'profile':
        if (!userId) {
          return NextResponse.json({ error: 'userId is required' }, { status: 400 });
        }
        
        const profile = usersDB.get(userId);
        if (!profile) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        
        return NextResponse.json({
          success: true,
          data: profile,
          timestamp: new Date().toISOString()
        });

      case 'dashboard':
        if (!userId) {
          return NextResponse.json({ error: 'userId is required' }, { status: 400 });
        }
        
        const userProfile = usersDB.get(userId);
        if (!userProfile) {
          return NextResponse.json({ error: 'User not found. Complete onboarding first.' }, { status: 404 });
        }
        
        const dashboard = generatePersonalizedDashboard(userProfile);
        
        return NextResponse.json({
          success: true,
          data: dashboard,
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json({
          success: true,
          message: 'Use POST to submit onboarding answers',
          usage: {
            POST: 'Submit answers to create/update user profile'
          },
          timestamp: new Date().toISOString()
        });
    }
  } catch (error) {
    console.error('Onboarding API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId, answers, preferences } = body;

    switch (action) {
      case 'submit':
        if (!answers) {
          return NextResponse.json({ error: 'answers are required' }, { status: 400 });
        }
        
        // Processar respostas do questionário
        const profile = processOnboarding(answers);
        
        // Se userId existente, atualizar
        if (userId && usersDB.has(userId)) {
          const existing = usersDB.get(userId);
          profile.id = userId;
          profile.createdAt = existing.createdAt;
        }
        
        // Salvar no "banco"
        usersDB.set(profile.id, profile);
        
        // Gerar dashboard personalizado
        const dashboard = generatePersonalizedDashboard(profile);
        
        return NextResponse.json({
          success: true,
          message: 'Profile created successfully',
          userId: profile.id,
          dashboard,
          timestamp: new Date().toISOString()
        });

      case 'update-preferences':
        if (!userId) {
          return NextResponse.json({ error: 'userId is required' }, { status: 400 });
        }
        
        if (!usersDB.has(userId)) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        
        if (!preferences) {
          return NextResponse.json({ error: 'preferences are required' }, { status: 400 });
        }
        
        // Atualizar preferências
        const user = usersDB.get(userId);
        user.preferencias = { ...user.preferencias, ...preferences };
        user.updatedAt = new Date().toISOString();
        usersDB.set(userId, user);
        
        // Regenerar dashboard
        const updatedDashboard = generatePersonalizedDashboard(user);
        
        return NextResponse.json({
          success: true,
          message: 'Preferences updated',
          dashboard: updatedDashboard,
          timestamp: new Date().toISOString()
        });

      case 'add-favorite':
        if (!userId || !body.symbol) {
          return NextResponse.json({ error: 'userId and symbol are required' }, { status: 400 });
        }
        
        const userFav = usersDB.get(userId);
        if (!userFav) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        
        if (!userFav.ativosFavoritos.includes(body.symbol)) {
          userFav.ativosFavoritos.push(body.symbol);
          userFav.updatedAt = new Date().toISOString();
          usersDB.set(userId, userFav);
        }
        
        return NextResponse.json({
          success: true,
          favorites: userFav.ativosFavoritos,
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: submit, update-preferences, add-favorite' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Onboarding POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}