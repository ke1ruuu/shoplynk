-- ============================================================================
-- Project Kita — Database Migration (Custom Database Authentication & Active RLS)
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

-- 6. Enable Row-Level Security (RLS) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fulfillments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_verifications ENABLE ROW LEVEL SECURITY;

-- 7. Drop any legacy restrictive auth.uid() policies
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN
        SELECT schemaname, tablename, policyname
        FROM pg_policies
        WHERE schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', pol.policyname, pol.schemaname, pol.tablename);
    END LOOP;
END $$;

-- 8. Create Application RLS Policies (allows application server client operations)
CREATE POLICY "Allow select on profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow insert on profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on profiles" ON public.profiles FOR UPDATE USING (true);
CREATE POLICY "Allow delete on profiles" ON public.profiles FOR DELETE USING (true);

CREATE POLICY "Allow select on stores" ON public.stores FOR SELECT USING (true);
CREATE POLICY "Allow insert on stores" ON public.stores FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on stores" ON public.stores FOR UPDATE USING (true);
CREATE POLICY "Allow delete on stores" ON public.stores FOR DELETE USING (true);

CREATE POLICY "Allow select on products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow insert on products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Allow delete on products" ON public.products FOR DELETE USING (true);

CREATE POLICY "Allow select on product_images" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Allow insert on product_images" ON public.product_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on product_images" ON public.product_images FOR UPDATE USING (true);
CREATE POLICY "Allow delete on product_images" ON public.product_images FOR DELETE USING (true);

CREATE POLICY "Allow select on categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow insert on categories" ON public.categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on categories" ON public.categories FOR UPDATE USING (true);
CREATE POLICY "Allow delete on categories" ON public.categories FOR DELETE USING (true);

CREATE POLICY "Allow select on carts" ON public.carts FOR SELECT USING (true);
CREATE POLICY "Allow insert on carts" ON public.carts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on carts" ON public.carts FOR UPDATE USING (true);
CREATE POLICY "Allow delete on carts" ON public.carts FOR DELETE USING (true);

CREATE POLICY "Allow select on cart_items" ON public.cart_items FOR SELECT USING (true);
CREATE POLICY "Allow insert on cart_items" ON public.cart_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on cart_items" ON public.cart_items FOR UPDATE USING (true);
CREATE POLICY "Allow delete on cart_items" ON public.cart_items FOR DELETE USING (true);

CREATE POLICY "Allow select on orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow insert on orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on orders" ON public.orders FOR UPDATE USING (true);
CREATE POLICY "Allow delete on orders" ON public.orders FOR DELETE USING (true);

CREATE POLICY "Allow select on order_items" ON public.order_items FOR SELECT USING (true);
CREATE POLICY "Allow insert on order_items" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on order_items" ON public.order_items FOR UPDATE USING (true);
CREATE POLICY "Allow delete on order_items" ON public.order_items FOR DELETE USING (true);

CREATE POLICY "Allow select on student_verifications" ON public.student_verifications FOR SELECT USING (true);
CREATE POLICY "Allow insert on student_verifications" ON public.student_verifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on student_verifications" ON public.student_verifications FOR UPDATE USING (true);
CREATE POLICY "Allow delete on student_verifications" ON public.student_verifications FOR DELETE USING (true);

CREATE POLICY "Allow select on payments" ON public.payments FOR SELECT USING (true);
CREATE POLICY "Allow insert on payments" ON public.payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on payments" ON public.payments FOR UPDATE USING (true);
CREATE POLICY "Allow delete on payments" ON public.payments FOR DELETE USING (true);

CREATE POLICY "Allow select on fulfillments" ON public.fulfillments FOR SELECT USING (true);
CREATE POLICY "Allow insert on fulfillments" ON public.fulfillments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on fulfillments" ON public.fulfillments FOR UPDATE USING (true);
CREATE POLICY "Allow delete on fulfillments" ON public.fulfillments FOR DELETE USING (true);

CREATE POLICY "Allow select on reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow insert on reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on reviews" ON public.reviews FOR UPDATE USING (true);
CREATE POLICY "Allow delete on reviews" ON public.reviews FOR DELETE USING (true);

CREATE POLICY "Allow select on notifications" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Allow insert on notifications" ON public.notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on notifications" ON public.notifications FOR UPDATE USING (true);
CREATE POLICY "Allow delete on notifications" ON public.notifications FOR DELETE USING (true);

CREATE POLICY "Allow select on reports" ON public.reports FOR SELECT USING (true);
CREATE POLICY "Allow insert on reports" ON public.reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on reports" ON public.reports FOR UPDATE USING (true);
CREATE POLICY "Allow delete on reports" ON public.reports FOR DELETE USING (true);

-- 9. Grant permissions to PostgreSQL roles
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO postgres, anon, authenticated, service_role;

-- 10. Ensure pre-seeded Admin profile exists with CAMPUS_ADMIN role and password 'password123'
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

-- 11. Seed default password ('password123') for any other profiles missing password
UPDATE public.profiles 
SET password_hash = 'a1b2c3d4e5f60718293a4b5c6d7e8f90:bd2a0d77b0b3bb3fb91967ef947b311b65783ebacd8eaaa0b773bee021252e0c186602982b6ef9824ffdac2449f9d5f9bdc892479778e2d6c2c9e748927e4c12' 
WHERE password_hash IS NULL;

-- 12. Enable Supabase Realtime for instant live updates on student verifications & stores
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.student_verifications;
EXCEPTION WHEN duplicate_object THEN
  NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.stores;
EXCEPTION WHEN duplicate_object THEN
  NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
EXCEPTION WHEN duplicate_object THEN
  NULL;
END $$;

-- 13. Immediately reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
