-- Create gifts table
CREATE TABLE IF NOT EXISTS gifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL, -- e.g., 'Festive Kits', 'Bridal Kits', 'Travel Kits'
  ingredients TEXT,
  image_url TEXT NOT NULL,
  image_urls TEXT[],
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_gifts_category ON gifts(category);
CREATE INDEX IF NOT EXISTS idx_gifts_created_at ON gifts(created_at DESC);

-- Enable RLS
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read gifts
CREATE POLICY "Anyone can view gifts" ON gifts
  FOR SELECT USING (true);

-- Insert dummy gift products
INSERT INTO gifts (name, description, price, category, ingredients, image_url, image_urls, stock) VALUES
  ('Ultimate Festive Glow Kit', 'A complete set for the festive season including serum, moisturizer, and mask.', 150.00, 'Festive Kits', 'Vitamin C, Hyaluronic Acid, Gold Flakes', '/luxury-spa-minimalist-beauty-products-marble-surfa.jpg', ARRAY['/luxury-spa-minimalist-beauty-products-marble-surfa.jpg'], 20),
  ('Bridal Radiance Box', 'Everything a bride needs for the big day: primer, setting spray, and highlighter.', 200.00, 'Bridal Kits', 'Pearl Extract, Rose Water, Mica', '/luxury-night-cream-jar-rose-gold-lid-marble-surfac.jpg', ARRAY['/luxury-night-cream-jar-rose-gold-lid-marble-surfac.jpg'], 15),
  ('Weekend Getaway Essentials', 'Travel-sized cleanser, toner, and moisturizer in a chic pouch.', 45.00, 'Travel Kits', 'Aloe Vera, Chamomile, Green Tea', '/travel-kit.jpg', ARRAY['/travel-kit.jpg'], 50),
  ('Luxury Spa at Home', 'Indulge in a spa experience with bath salts, body oil, and a scented candle.', 85.00, 'Festive Kits', 'Lavender, Epsom Salt, Jojoba Oil', '/luxury-spa-Hyaluronic Acid-ingredients-natural-light-gre.jpg', ARRAY['/luxury-spa-Hyaluronic Acid-ingredients-natural-light-gre.jpg'], 25);
