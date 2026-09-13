-- ============================================
-- ADMIN & SCHEDULED POSTS SCHEMA
-- Add this to Supabase SQL Editor
-- ============================================

-- ============================================
-- ADMIN TABLE (Only admins can create scheduled posts)
-- ============================================
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_admin_email ON admin_users(email);

-- ============================================
-- SCHEDULED POSTS TABLE
-- ============================================
CREATE TABLE scheduled_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES admin_users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  body TEXT NOT NULL,
  category TEXT, -- 'tutorial', 'guide', 'insights', 'technical', 'story', 'comparison', 'announcement'
  author TEXT DEFAULT 'BudgetPro Editorial',
  calculator_tag TEXT, -- 'mortgage', 'auto', 'solar', 'construction', 'business', 'income', 'all'
  read_time INT,
  featured BOOLEAN DEFAULT false,
  og_image TEXT,
  
  -- Scheduling
  scheduled_date DATE NOT NULL,
  scheduled_time TIME DEFAULT '08:00:00', -- UTC
  status TEXT DEFAULT 'scheduled', -- 'scheduled', 'published', 'draft', 'failed'
  published_at TIMESTAMPTZ,
  published_url TEXT,
  error_message TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_status CHECK (status IN ('scheduled', 'published', 'draft', 'failed'))
);

CREATE INDEX idx_scheduled_posts_admin ON scheduled_posts(admin_id);
CREATE INDEX idx_scheduled_posts_date ON scheduled_posts(scheduled_date);
CREATE INDEX idx_scheduled_posts_status ON scheduled_posts(status);
CREATE INDEX idx_scheduled_posts_slug ON scheduled_posts(slug);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_posts ENABLE ROW LEVEL SECURITY;

-- Only admins can view admin_users (service role only)
CREATE POLICY "Admins table is admin-only"
  ON admin_users FOR ALL
  USING (false) WITH CHECK (false);

-- Only the admin who created a post can view/edit their own posts
CREATE POLICY "Admins can see their own scheduled posts"
  ON scheduled_posts FOR SELECT
  USING (admin_id = auth.uid() OR auth.role() = 'service_role');

CREATE POLICY "Admins can create scheduled posts"
  ON scheduled_posts FOR INSERT
  WITH CHECK (auth.uid() = admin_id OR auth.role() = 'service_role');

CREATE POLICY "Admins can update their own posts"
  ON scheduled_posts FOR UPDATE
  USING (admin_id = auth.uid() OR auth.role() = 'service_role')
  WITH CHECK (admin_id = auth.uid() OR auth.role() = 'service_role');

CREATE POLICY "Admins can delete their own posts"
  ON scheduled_posts FOR DELETE
  USING (admin_id = auth.uid() OR auth.role() = 'service_role');

-- ============================================
-- INSERT INITIAL ADMIN USER
-- ============================================
-- Generate password hash for: Budgetpro12#
-- Use: bcrypt hash of "Budgetpro12#" = $2b$10$YOUR_HASH_HERE
-- For now, use a placeholder (you'll set this in the app)

INSERT INTO admin_users (email, password_hash, full_name, role)
VALUES (
  'admin@budgetpro.com.ng',
  '$2b$10$Nz8K8L5Y4J3H2G1F0E9D8C7B6A5Z4Y3X2W1V0U9T8S7R6Q5P4O3N2M1L0K9J', -- bcrypt hash (placeholder)
  'BudgetPro Admin',
  'admin'
)
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- HELPER FUNCTION: Generate slug from title
-- ============================================
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN LOWER(
    REGEXP_REPLACE(
      REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+',
      '-',
      'g'
    )
  );
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGER: Auto-generate slug if not provided
-- ============================================
CREATE OR REPLACE FUNCTION set_scheduled_post_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.title) || '-' || TO_CHAR(NOW(), 'YYYYMMDDHH24MI');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_scheduled_post_slug
  BEFORE INSERT ON scheduled_posts
  FOR EACH ROW
  EXECUTE FUNCTION set_scheduled_post_slug();

-- ============================================
-- DONE: Schema ready for admin + scheduled posts
-- ============================================
