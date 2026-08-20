-- ============================================================================
-- Project Kita — Database Migration Schema (Supabase PostgreSQL)
-- Migration 0001_initial_schema.sql
-- ============================================================================

-- 1. Create Enums
CREATE TYPE user_role AS ENUM ('BUYER', 'SELLER', 'CAMPUS_ADMIN', 'PLATFORM_ADMIN');
CREATE TYPE verification_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE product_status AS ENUM ('DRAFT', 'ACTIVE', 'OUT_OF_STOCK', 'ARCHIVED');
CREATE TYPE order_status AS ENUM (
  'PENDING_PAYMENT',
  'PENDING',
  'CONFIRMED',
  'PREPARING',
  'READY_FOR_PICKUP',
  'OUT_FOR_DELIVERY',
  'COMPLETED',
  'CANCELLED',
  'REJECTED',
  'EXPIRED'
);
CREATE TYPE payment_method AS ENUM ('GCASH', 'COD');
CREATE TYPE payment_status AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');
CREATE TYPE fulfillment_method AS ENUM ('CAMPUS_PICKUP', 'HANDOFF', 'LOCAL_DELIVERY');
CREATE TYPE report_status AS ENUM ('PENDING', 'RESOLVED', 'DISMISSED');

-- 2. Campuses Table
CREATE TABLE campuses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  address TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed Initial Campus (Pilot)
INSERT INTO campuses (name, code, address)
VALUES ('University of the Philippines Diliman', 'UPD', 'Quezon City, Metro Manila');

-- 3. Profiles Table (Linked to auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'BUYER',
  campus_id UUID REFERENCES campuses(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Student Verifications Table
CREATE TABLE student_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  student_id_number TEXT NOT NULL,
  id_image_url TEXT NOT NULL,
  program TEXT NOT NULL,
  year_level TEXT NOT NULL,
  status verification_status NOT NULL DEFAULT 'PENDING',
  rejection_reason TEXT,
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Stores Table
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  campus_id UUID NOT NULL REFERENCES campuses(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  logo_url TEXT,
  banner_url TEXT,
  gcash_name TEXT,
  gcash_number TEXT,
  pickup_locations TEXT,
  operating_hours TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  rating_avg NUMERIC(3, 2) NOT NULL DEFAULT 0.00,
  rating_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed Categories
INSERT INTO categories (name, slug, icon) VALUES
('Food & Drinks', 'food-and-drinks', 'Utensils'),
('Handmade Crafts', 'handmade-crafts', 'Palette'),
('Student Merchandise', 'student-merchandise', 'Shirt'),
('School & Stationery', 'school-and-stationery', 'BookOpen'),
('Lifestyle Goods', 'lifestyle-goods', 'ShoppingBag');

-- 7. Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  status product_status NOT NULL DEFAULT 'DRAFT',
  prep_time_minutes INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Product Images Table
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Carts & Cart Items Table (Single-Store Cart Enforcement)
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INT NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(cart_id, product_id)
);

-- 10. Orders & Order Items
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE RESTRICT,
  campus_id UUID NOT NULL REFERENCES campuses(id) ON DELETE RESTRICT,
  total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
  status order_status NOT NULL DEFAULT 'PENDING',
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  subtotal NUMERIC(10, 2) NOT NULL
);

-- 11. Payments Table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  payment_method payment_method NOT NULL,
  reference_number TEXT,
  receipt_url TEXT,
  status payment_status NOT NULL DEFAULT 'PENDING',
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Fulfillments Table
CREATE TABLE fulfillments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  method fulfillment_method NOT NULL,
  location_details TEXT NOT NULL,
  preferred_time TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Reviews Table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(order_id, product_id)
);

-- 14. Notifications Table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link_url TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. Content Reports Table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL, -- 'PRODUCT', 'STORE', 'REVIEW'
  target_id UUID NOT NULL,
  reason TEXT NOT NULL,
  status report_status NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- Triggers & Functions
-- ============================================================================

-- Function to handle new user signup and populate profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  default_campus_id UUID;
BEGIN
  SELECT id INTO default_campus_id FROM public.campuses WHERE code = 'UPD' LIMIT 1;

  INSERT INTO public.profiles (id, email, full_name, role, campus_id)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'BUYER',
    default_campus_id
  );

  INSERT INTO public.carts (user_id) VALUES (new.id);

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger for updating store rating averages when a review is added
CREATE OR REPLACE FUNCTION update_store_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE stores
  SET 
    rating_avg = (SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE store_id = NEW.store_id),
    rating_count = (SELECT COUNT(*) FROM reviews WHERE store_id = NEW.store_id)
  WHERE id = NEW.store_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_review_created
  AFTER INSERT ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_store_rating();

-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================

-- Schema Grants for Supabase Roles
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO postgres, anon, authenticated, service_role;

ALTER TABLE campuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE fulfillments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Campuses & Categories Policies
CREATE POLICY "Campuses viewable by everyone" ON campuses FOR SELECT USING (true);
CREATE POLICY "Categories viewable by everyone" ON categories FOR SELECT USING (true);

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by authenticated users"
  ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Student Verifications Policies
CREATE POLICY "Sellers can view own verification"
  ON student_verifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Buyers can submit verification"
  ON student_verifications FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view and review verifications"
  ON student_verifications FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('CAMPUS_ADMIN', 'PLATFORM_ADMIN'))
  );

-- Stores Policies
CREATE POLICY "Active stores are viewable by everyone"
  ON stores FOR SELECT USING (is_active = true OR user_id = auth.uid());
CREATE POLICY "Sellers can update own store"
  ON stores FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Sellers can insert store"
  ON stores FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Products Policies
CREATE POLICY "Active products are viewable by everyone"
  ON products FOR SELECT USING (
    status = 'ACTIVE' OR 
    EXISTS (SELECT 1 FROM stores WHERE id = products.store_id AND user_id = auth.uid())
  );
CREATE POLICY "Store owners can manage products"
  ON products FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM stores WHERE id = products.store_id AND user_id = auth.uid())
  );

-- Product Images Policies
CREATE POLICY "Product images viewable by everyone"
  ON product_images FOR SELECT USING (true);
CREATE POLICY "Store owners can manage product images"
  ON product_images FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM products p
      JOIN stores s ON s.id = p.store_id
      WHERE p.id = product_images.product_id AND s.user_id = auth.uid()
    )
  );

-- Carts Policies
CREATE POLICY "Users can manage own cart"
  ON carts FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can manage own cart items"
  ON cart_items FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM carts WHERE id = cart_items.cart_id AND user_id = auth.uid())
  );

-- Orders Policies
CREATE POLICY "Buyers and Store Owners can view orders"
  ON orders FOR SELECT TO authenticated USING (
    buyer_id = auth.uid() OR
    EXISTS (SELECT 1 FROM stores WHERE id = orders.store_id AND user_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('CAMPUS_ADMIN', 'PLATFORM_ADMIN'))
  );
CREATE POLICY "Buyers can place orders"
  ON orders FOR INSERT TO authenticated WITH CHECK (buyer_id = auth.uid());
CREATE POLICY "Buyers and Sellers can update orders"
  ON orders FOR UPDATE TO authenticated USING (
    buyer_id = auth.uid() OR
    EXISTS (SELECT 1 FROM stores WHERE id = orders.store_id AND user_id = auth.uid())
  );

-- Order Items Policies
CREATE POLICY "Viewable by order participants"
  ON order_items FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM orders o
      JOIN stores s ON s.id = o.store_id
      WHERE o.id = order_items.order_id AND (o.buyer_id = auth.uid() OR s.user_id = auth.uid())
    )
  );

-- Payments Policies
CREATE POLICY "Viewable by order buyer and seller"
  ON payments FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM orders o
      JOIN stores s ON s.id = o.store_id
      WHERE o.id = payments.order_id AND (o.buyer_id = auth.uid() OR s.user_id = auth.uid())
    )
  );

-- Reviews Policies
CREATE POLICY "Reviews viewable by everyone"
  ON reviews FOR SELECT USING (true);
CREATE POLICY "Buyers can create reviews for completed orders"
  ON reviews FOR INSERT TO authenticated WITH CHECK (buyer_id = auth.uid());

-- Notifications Policies
CREATE POLICY "Users view own notifications"
  ON notifications FOR ALL TO authenticated USING (user_id = auth.uid());
