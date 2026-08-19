-- 1. Refinar RLS de Profiles: garantir que um usuário autenticado possa criar SOMENTE o próprio perfil
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

-- 2. Refinar leitura pública de Barbershops: permitir busca pública por slug mas restringir acesso completo
DROP POLICY IF EXISTS "Public can view active barbershops by slug" ON public.barbershops;
DROP POLICY IF EXISTS "Staff can view their barbershop details" ON public.barbershops;

-- Leitura pública: permitir apenas leitura de barbearias ativas
CREATE POLICY "Public can view active barbershops by slug"
    ON public.barbershops FOR SELECT
    TO anon, authenticated
    USING (active = true);
