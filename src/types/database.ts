export interface Profile {
  id: string;
  name: string;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export type BarbershopRole = 'owner' | 'manager' | 'barber' | 'receptionist';

export interface Barbershop {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  timezone: string;
  currency: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BarbershopUser {
  id: string;
  barbershop_id: string;
  user_id: string;
  role: BarbershopRole;
  active: boolean;
  created_at: string;
  updated_at: string;
}
