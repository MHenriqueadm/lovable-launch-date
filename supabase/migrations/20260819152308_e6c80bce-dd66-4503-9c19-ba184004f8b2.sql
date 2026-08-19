-- 1. Refinar RLS de Profiles para permitir INSERT controlado
-- Garantir que o usuário só possa inserir seu próprio perfil
CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

-- 2. Refinar RLS de Barbershops
-- Remover a policy genérica anterior se necessário e criar policies distintas
DROP POLICY IF EXISTS "Public can view active barbershops" ON public.barbershops;

-- Leitura pública (apenas o necessário para encontrar via slug na home/agendamento)
CREATE POLICY "Public can view active barbershops by slug"
    ON public.barbershops FOR SELECT
    TO anon
    USING (active = true);

-- Leitura autenticada (usuários internos da barbearia podem ver detalhes)
-- Usamos uma subquery segura (já que barbershop_users tem RLS por user_id)
CREATE POLICY "Staff can view their barbershop details"
    ON public.barbershops FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.barbershop_users
            WHERE barbershop_users.barbershop_id = public.barbershops.id
            AND barbershop_users.user_id = auth.uid()
        )
        OR active = true -- Mantém visibilidade para descoberta se for ativa
    );

-- 3. Refinar RLS de Barbershop Users
CREATE POLICY "Barbershop owners can manage their users"
    ON public.barbershop_users FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.barbershop_users AS bu
            WHERE bu.barbershop_id = public.barbershop_users.barbershop_id
            AND bu.user_id = auth.uid()
            AND bu.role = 'owner'
        )
    );
