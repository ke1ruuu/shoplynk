-- 0004_platform_ratings.sql
-- Table for capturing website and platform ratings from buyers and sellers

CREATE TABLE IF NOT EXISTS public.platform_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  user_name TEXT NOT NULL,
  user_role TEXT NOT NULL CHECK (user_role IN ('BUYER', 'SELLER', 'CAMPUS_ADMIN', 'PLATFORM_ADMIN')),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  trigger_source TEXT NOT NULL CHECK (trigger_source IN ('BUYER_PURCHASE', 'SELLER_INCOME', 'DIRECT_FEEDBACK')),
  order_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for speedy admin analytics and ordering
CREATE INDEX IF NOT EXISTS idx_platform_ratings_created_at ON public.platform_ratings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_platform_ratings_rating ON public.platform_ratings(rating);
CREATE INDEX IF NOT EXISTS idx_platform_ratings_user_role ON public.platform_ratings(user_role);

-- Enable RLS
ALTER TABLE public.platform_ratings ENABLE ROW LEVEL SECURITY;

-- Allow public / authenticated insert
CREATE POLICY "Allow anyone to insert platform ratings"
  ON public.platform_ratings
  FOR INSERT
  WITH CHECK (true);

-- Allow admins and users to view ratings
CREATE POLICY "Allow select on platform ratings"
  ON public.platform_ratings
  FOR SELECT
  USING (true);

