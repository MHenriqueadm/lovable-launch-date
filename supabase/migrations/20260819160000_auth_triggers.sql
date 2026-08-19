-- 1. Function to handle profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', 'Usuário'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ service_role;

-- 2. Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Bootstrap function for first barbershop (Private admin use)
CREATE OR REPLACE FUNCTION public.bootstrap_barbershop(
  _user_id uuid,
  _name text,
  _slug text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _barbershop_id uuid;
BEGIN
  -- Check if user exists in profiles
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = _user_id) THEN
    RAISE EXCEPTION 'Profile for user % does not exist', _user_id;
  END IF;

  -- Create barbershop
  INSERT INTO public.barbershops (name, slug)
  VALUES (_name, _slug)
  RETURNING id INTO _barbershop_id;

  -- Link user as owner
  INSERT INTO public.barbershop_users (barbershop_id, user_id, role)
  VALUES (_barbershop_id, _user_id, 'owner');

  RETURN _barbershop_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.bootstrap_barbershop(uuid, text, text) TO service_role;
