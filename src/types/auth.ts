import { User, Session } from '@supabase/supabase-js';
import { Tables } from '@/integrations/supabase/types';

export type Profile = Tables<'profiles'>;
export type Barbershop = Tables<'barbershops'>;
export type BarbershopUser = Tables<'barbershop_users'>;

export interface AuthUserState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export interface BarbershopState {
  barbershop: Barbershop | null;
  membership: BarbershopUser | null;
  loading: boolean;
}
