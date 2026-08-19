-- Fix: Add RLS policy for barbershops
-- Allow authenticated users to view all barbershops (for joining/search)
-- and anon users to view only active ones for booking.
CREATE POLICY "Public can view active barbershops"
    ON public.barbershops FOR SELECT
    USING (active = true);

-- Fix: Set search_path for handle_updated_at function
ALTER FUNCTION public.handle_updated_at() SET search_path = public;
