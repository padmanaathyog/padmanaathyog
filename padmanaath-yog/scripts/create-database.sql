-- Create tables for the yoga website

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  quote TEXT NOT NULL,
  image TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5)
);

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  src TEXT NOT NULL,
  category TEXT NOT NULL
);

-- Gallery videos table
CREATE TABLE IF NOT EXISTS gallery_videos (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  src TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  duration TEXT NOT NULL,
  category TEXT NOT NULL
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  spots INTEGER NOT NULL DEFAULT 20,
  is_past BOOLEAN NOT NULL DEFAULT FALSE
);

-- Yoga classes table
CREATE TABLE IF NOT EXISTS yoga_classes (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  duration TEXT NOT NULL,
  level TEXT NOT NULL,
  instructor TEXT NOT NULL,
  category TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

-- Blog external references table
CREATE TABLE IF NOT EXISTS blog_external_refs (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  external_id TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  image TEXT NOT NULL,
  author TEXT NOT NULL,
  date TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  provider TEXT NOT NULL
);

-- Create storage bucket for uploads
-- Note: This is a Supabase-specific command and would be executed via the Supabase dashboard or CLI
-- EXECUTE EXTENSION storage.create_bucket('yoga-website', 'public');

-- Set up Row Level Security (RLS) policies
-- For public access to read data
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE yoga_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_external_refs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view testimonials" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Public can view gallery images" ON gallery_images
  FOR SELECT USING (true);

CREATE POLICY "Public can view gallery videos" ON gallery_videos
  FOR SELECT USING (true);

CREATE POLICY "Public can view events" ON events
  FOR SELECT USING (true);

CREATE POLICY "Public can view yoga classes" ON yoga_classes
  FOR SELECT USING (true);

CREATE POLICY "Public can view blog references" ON blog_external_refs
  FOR SELECT USING (true);

-- Create policies for authenticated users (admins) to manage content
CREATE POLICY "Authenticated users can manage testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage gallery images" ON gallery_images
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage gallery videos" ON gallery_videos
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage events" ON events
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage yoga classes" ON yoga_classes
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage blog references" ON blog_external_refs
  FOR ALL USING (auth.role() = 'authenticated');
