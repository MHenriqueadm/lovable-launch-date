-- 1. Refinar RLS de Profiles: garantir que um usuário autenticado possa criar SOMENTE o próprio perfil
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

-- 2. Refinar RLS de Barbershops: 
-- A regra 'active = true' é muito ampla para SELECT se quisermos restringir o que o staff vê vs o que o público vê.
-- Removemos as políticas anteriores para reconstruir.
DROP POLICY IF EXISTS "Public can view active barbershops by slug" ON public.barbershops;
DROP POLICY IF EXISTS "Staff can view their barbershop details" ON public.barbershops;

-- Policy para PÚBLICO (anon): pode ver apenas barbearias ativas. 
-- Em uma aplicação real, você pode querer limitar as colunas retornadas via view, 
-- mas aqui garantimos que pelo menos o filtro de 'active' está presente.
CREATE POLICY "Public discovery of active barbershops"
    ON public.barbershops FOR SELECT
    TO anon
    USING (active = true);

-- Policy para STAFF (authenticated): pode ver a barbearia se for membro dela OU se for ativa (para descoberta)
CREATE POLICY "Staff or public access to active barbershops"
    ON public.barbershops FOR SELECT
    TO authenticated
    USING (
        active = true 
        OR 
        EXISTS (
            SELECT 1 FROM public.barbershop_users
            WHERE barbershop_users.barbershop_id = public.barbershops.id
            AND barbershop_users.user_id = auth.uid()
        )
    );
