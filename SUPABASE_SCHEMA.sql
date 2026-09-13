-- ============================================
-- BUDGETPRO BLOG SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- ============================================
-- POSTS TABLE
-- ============================================
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  media_url TEXT,
  media_thumbnail_url TEXT,
  media_type TEXT CHECK (media_type IN ('image', 'audio', 'video', 'none')) DEFAULT 'none',
  media_expires_at TIMESTAMPTZ,
  media_deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COMMENTS TABLE
-- ============================================
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_posts_created ON posts(created_at DESC);
CREATE INDEX idx_posts_media_expiry ON posts(media_expires_at)
  WHERE media_url IS NOT NULL;
CREATE INDEX idx_comments_post ON comments(post_id, created_at ASC);
CREATE INDEX idx_comments_user ON comments(user_id);
CREATE INDEX idx_posts_user ON posts(user_id);

-- ============================================
-- TRIGGER: SET MEDIA EXPIRY (30 DAYS)
-- ============================================
CREATE OR REPLACE FUNCTION set_media_expiry()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.media_url IS NOT NULL THEN
    NEW.media_expires_at := NEW.created_at + INTERVAL '30 days';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_media_expiry
  BEFORE INSERT ON posts
  FOR EACH ROW
  EXECUTE FUNCTION set_media_expiry();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- POSTS: Everyone can read
CREATE POLICY "Posts are viewable by everyone"
  ON posts FOR SELECT USING (true);

-- POSTS: Only authenticated users can create
CREATE POLICY "Authenticated users can create posts"
  ON posts FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

-- POSTS: Users can update their own posts
CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- POSTS: Users can delete their own posts
CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE USING (auth.uid() = user_id);

-- COMMENTS: Everyone can read
CREATE POLICY "Comments are viewable by everyone"
  ON comments FOR SELECT USING (true);

-- COMMENTS: Only authenticated users can create
CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

-- COMMENTS: Users can delete their own comments
CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- ADDITIONAL: USER PROFILES (Optional, for future use)
-- ============================================
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User profiles are viewable by everyone"
  ON user_profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ============================================
-- DONE
-- ============================================
-- All tables and policies are now configured.
-- Proceed to Step 4 to set up Storage.
