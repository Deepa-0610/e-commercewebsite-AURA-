-- Create collections table
CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  description TEXT,
  count_text TEXT, -- e.g., "3 Brands" or "8 products"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read collections
CREATE POLICY "Anyone can view collections" ON collections
  FOR SELECT USING (true);

-- Insert beauty collections
INSERT INTO collections (name, slug, image_url, count_text, description) VALUES
  ('EYELINER', 'eyeliner', '/images/dazller-eyeliner.jpg', '3 Brands', 'Define your eyes with our range of eyeliners'),
  ('MASCARA', 'mascara', '/images/dazller-mascara.jpg', '3 Brands', 'Volumizing and lengthening mascaras'),
  ('LIP BALM', 'lip-balm', '/images/dazller-lipbalm.jpg', '3 Brands', 'Nourishing lip care for soft lips'),
  ('FOUNDATION', 'foundation', '/images/dazller-foundation.jpg', '3 Brands', 'Flawless base for every skin tone'),
  ('COMPACT POWDER', 'compact-powder', '/images/dazller-compact.jpg', '3 Brands', 'Set your makeup with our compact powders'),
  ('CONCEALER', 'concealer', '/images/dazller-concealer.jpg', '3 Brands', 'Hide imperfections with high coverage concealers'),
  ('HIGHLIGHTER', 'highlighter', '/images/dazller-highlighter.jpg', '3 Brands', 'Get that perfect glow');
