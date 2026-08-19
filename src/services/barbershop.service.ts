import { supabase } from '@/integrations/supabase/client';

export const barbershopService = {
  async getMyBarbershops(userId: string) {
    const { data, error } = await supabase
      .from('barbershop_users')
      .select('*, barbershops(*)')
      .eq('user_id', userId)
      .eq('active', true);
    
    if (error) throw error;
    return data;
  },

  async getBarbershopBySlug(slug: string) {
    const { data, error } = await supabase
      .from('barbershops')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single();
    
    if (error) throw error;
    return data;
  }
};
