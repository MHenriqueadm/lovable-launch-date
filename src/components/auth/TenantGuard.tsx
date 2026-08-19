import React, { useEffect } from 'react';
import { useBarbershop } from '@/contexts/BarbershopContext';
import { useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';

export function TenantGuard({ children }: { children: React.ReactNode }) {
  const { barbershop, loading } = useBarbershop();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !barbershop) {
      // If user has no barbershop membership, redirect to a "no-access" or "onboarding" page
      // For now, redirect back to login with a message or just home
      navigate({ to: '/' });
    }
  }, [barbershop, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (!barbershop) return null;

  return <>{children}</>;
}
