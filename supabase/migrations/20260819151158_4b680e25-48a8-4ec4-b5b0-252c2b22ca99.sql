-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    phone text,
    avatar_url text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

-- 2. BARBERSHOPS
CREATE TABLE public.barbershops (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    logo_url text,
    phone text,
    whatsapp text,
    email text,
    timezone text DEFAULT 'America/Sao_Paulo' NOT NULL,
    currency text DEFAULT 'BRL' NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

GRANT SELECT ON public.barbershops TO authenticated;
GRANT SELECT ON public.barbershops TO anon; -- For public booking page
GRANT ALL ON public.barbershops TO service_role;

ALTER TABLE public.barbershops ENABLE ROW LEVEL SECURITY;

-- 3. BARBERSHOP_USERS
CREATE TABLE public.barbershop_users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    barbershop_id uuid NOT NULL REFERENCES public.barbershops(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role text NOT NULL CHECK (role IN ('owner', 'manager', 'barber', 'receptionist')),
    active boolean DEFAULT true NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    UNIQUE(barbershop_id, user_id)
);

GRANT SELECT ON public.barbershop_users TO authenticated;
GRANT ALL ON public.barbershop_users TO service_role;

ALTER TABLE public.barbershop_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own barbershop memberships"
    ON public.barbershop_users FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_barbershops_updated_at
    BEFORE UPDATE ON public.barbershops
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_barbershop_users_updated_at
    BEFORE UPDATE ON public.barbershop_users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
