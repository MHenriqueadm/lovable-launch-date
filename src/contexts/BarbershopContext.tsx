import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { barbershopService } from '@/services/barbershop.service';
import { BarbershopState, Barbershop, BarbershopUser } from '@/types/auth';

const BarbershopContext = createContext<BarbershopState | undefined>(undefined);

export function BarbershopProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [state, setState] = useState<BarbershopState>({
    barbershop: null,
    membership: null,
    loading: true,
  });

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated || !user) {
      setState({ barbershop: null, membership: null, loading: false });
      return;
    }

    async function loadBarbershop() {
      try {
        const memberships = await barbershopService.getMyBarbershops(user!.id);
        
        if (memberships && memberships.length > 0) {
          // By default, pick the first one. Multi-tenant switcher can be added later.
          const first = memberships[0];
          if (first) {
            setState({
              barbershop: first.barbershops as unknown as Barbershop,
              membership: first as unknown as BarbershopUser,
              loading: false,
            });
          } else {
            setState({ barbershop: null, membership: null, loading: false });
          }
        } else {
          setState({ barbershop: null, membership: null, loading: false });
        }
      } catch (err) {
        console.error('Error loading barbershop:', err);
        setState(prev => ({ ...prev, loading: false }));
      }
    }

    loadBarbershop();
  }, [user, isAuthenticated, authLoading]);

  return (
    <BarbershopContext.Provider value={state}>
      {children}
    </BarbershopContext.Provider>
  );
}

export const useBarbershop = () => {
  const context = useContext(BarbershopContext);
  if (context === undefined) {
    throw new Error('useBarbershop must be used within a BarbershopProvider');
  }
  return context;
};
