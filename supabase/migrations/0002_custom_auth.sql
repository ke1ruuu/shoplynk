-- ============================================================================
-- Project Kita — Database Migration (Custom Database Authentication & Disable RLS)
-- Migration: 0002_custom_auth.sql
-- Dashboard URL: https://supabase.com/dashboard/project/nrloqmqweqczckgvjcny/sql/new
-- ============================================================================

-- 1. Add password_hash column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- 2. Ensure profiles.id has default gen_random_uuid()
ALTER TABLE public.profiles ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- 3. Drop foreign key constraint to auth.users (enables direct DB profiles)
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- 4. Create unique index on lower-cased email
CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_unique_idx ON public.profiles (LOWER(email));

-- 5. Drop campus foreign keys and drop campuses table (Single-school focus)
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_campus_id_fkey;
ALTER TABLE public.stores DROP CONSTRAINT IF EXISTS stores_campus_id_fkey;
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_campus_id_fkey;

ALTER TABLE public.profiles DROP COLUMN IF EXISTS campus_id CASCADE;
ALTER TABLE public.stores DROP COLUMN IF EXISTS campus_id CASCADE;
ALTER TABLE public.orders DROP COLUMN IF EXISTS campus_id CASCADE;

DROP TABLE IF EXISTS public.campuses CASCADE;

-- 6. Disable RLS on all tables for custom database authentication
ALTER TABLE public.stores DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.fulfillments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_verifications DISABLE ROW LEVEL SECURITY;

-- 7. Grant permissions to anon & authenticated roles
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO postgres, anon, authenticated, service_role;

-- 8. Ensure pre-seeded Admin profile exists with CAMPUS_ADMIN role and password 'password123'
INSERT INTO public.profiles (id, email, full_name, role, password_hash)
VALUES (
  '11111111-1111-4111-8111-111111111111',
  'admin@projectkita.edu.ph',
  'Campus Administrator (LYFJSHS)',
  'CAMPUS_ADMIN',
  'a1b2c3d4e5f60718293a4b5c6d7e8f90:bd2a0d77b0b3bb3fb91967ef947b311b65783ebacd8eaaa0b773bee021252e0c186602982b6ef9824ffdac2449f9d5f9bdc892479778e2d6c2c9e748927e4c12'
)
ON CONFLICT (id) DO UPDATE SET
  role = 'CAMPUS_ADMIN',
  password_hash = 'a1b2c3d4e5f60718293a4b5c6d7e8f90:bd2a0d77b0b3bb3fb91967ef947b311b65783ebacd8eaaa0b773bee021252e0c186602982b6ef9824ffdac2449f9d5f9bdc892479778e2d6c2c9e748927e4c12';

UPDATE public.profiles
SET role = 'CAMPUS_ADMIN',
    password_hash = 'a1b2c3d4e5f60718293a4b5c6d7e8f90:bd2a0d77b0b3bb3fb91967ef947b311b65783ebacd8eaaa0b773bee021252e0c186602982b6ef9824ffdac2449f9d5f9bdc892479778e2d6c2c9e748927e4c12'
WHERE LOWER(email) = 'admin@projectkita.edu.ph';

-- 9. Seed default password ('password123') for any other profiles missing password
UPDATE public.profiles 
SET password_hash = 'a1b2c3d4e5f60718293a4b5c6d7e8f90:bd2a0d77b0b3bb3fb91967ef947b311b65783ebacd8eaaa0b773bee021252e0c186602982b6ef9824ffdac2449f9d5f9bdc892479778e2d6c2c9e748927e4c12' 
WHERE password_hash IS NULL;

-- 10. Immediately reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
