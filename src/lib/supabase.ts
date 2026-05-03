// Simulated Supabase for build
export interface PortfolioItem {
  id?: string;
  symbol: string;
  quantity: number;
  avg_price: number;
  sector?: string;
}

export const syncPortfolio = async (): Promise<PortfolioItem[]> => {
  return [];
};

export const savePreferences = async (preferences: any): Promise<void> => {
  console.log("Saving preferences:", preferences);
};

export const supabase = {
  auth: {
    signIn: async () => ({ data: { user: null, session: null }, error: null }),
    signUp: async () => ({ data: { user: null, session: null }, error: null }),
    getSession: async () => ({ 
      data: { session: { user: { id: '', email: '' } as any } }, 
      error: null 
    }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: (callback: any) => ({
      data: { subscription: { unsubscribe: () => {} } }
    }),
  },
  from: (table: string) => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: null, error: null }),
    update: () => ({ data: null, error: null }),
    delete: () => ({ data: null, error: null }),
  }),
};

export const createClient = (url: string, key: string) => supabase;
