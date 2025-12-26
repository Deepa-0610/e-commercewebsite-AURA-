-- Create products table for beauty items
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  ingredients TEXT,
  image_url TEXT NOT NULL,
  image_urls TEXT[], -- Array of additional product images
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read products
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

-- Insert dummy beauty products
INSERT INTO products (name, description, price, category, ingredients, image_url, image_urls, stock) VALUES
  -- Serums
  ('Radiance Vitamin C Serum', 'Brightening serum with 15% vitamin C and hyaluronic acid to reduce dark spots and improve skin texture', 68.00, 'Serums', 'Vitamin C, Hyaluronic Acid, Ferulic Acid, Vitamin E', '/luxury-vitamin-c-serum-glass-bottle-minimalist-gol.jpg', ARRAY['/luxury-vitamin-c-serum-glass-bottle-minimalist-gol.jpg'], 45),
  ('Hydration Boost Serum', 'Ultra-hydrating serum with multi-molecular hyaluronic acid complex for plump, dewy skin', 72.00, 'Serums', 'Hyaluronic Acid, Ceramides, Peptides, Niacinamide', '/luxury-face-oil-amber-glass-bottle-Hyaluronic Acid-ingre.jpg', ARRAY['/luxury-face-oil-amber-glass-bottle-Hyaluronic Acid-ingre.jpg'], 38),
  ('Retinol Night Renewal', 'Time-release retinol serum to minimize fine lines and improve skin elasticity overnight', 85.00, 'Serums', 'Retinol, Squalane, Vitamin E, Peptides', '/luxury-night-cream-jar-rose-gold-lid-marble-surfac.jpg', ARRAY['/luxury-night-cream-jar-rose-gold-lid-marble-surfac.jpg'], 29),
  
  -- Moisturizers
  ('Cloud Cream Moisturizer', 'Lightweight gel-cream that hydrates without heaviness, perfect for all skin types', 58.00, 'Moisturizers', 'Glycerin, Niacinamide, Ceramides, Squalane', '/luxury-spa-minimalist-beauty-products-marble-surfa.jpg', ARRAY['/luxury-spa-minimalist-beauty-products-marble-surfa.jpg'], 52),
  ('Barrier Repair Night Cream', 'Rich overnight cream that repairs and strengthens the skin barrier while you sleep', 76.00, 'Moisturizers', 'Ceramides, Peptides, Shea Butter, Colloidal Oatmeal', '/luxury-night-cream-jar-rose-gold-lid-marble-surfac.jpg', ARRAY['/luxury-night-cream-jar-rose-gold-lid-marble-surfac.jpg'], 34),
  ('Youth Restore Day Cream', 'Anti-aging day cream with SPF 30 and antioxidants to protect and rejuvenate', 82.00, 'Moisturizers', 'Retinol, SPF 30, Vitamin C, Peptides, Hyaluronic Acid', '/luxury-spa-minimalist-beauty-products-marble-surfa.jpg', ARRAY['/luxury-spa-minimalist-beauty-products-marble-surfa.jpg'], 41),
  
  -- Cleansers
  ('Gentle Foaming Cleanser', 'pH-balanced cleanser that removes impurities without stripping natural oils', 42.00, 'Cleansers', 'Glycerin, Coconut-derived Surfactants, Chamomile Extract', '/luxury-spa-minimalist-beauty-products-marble-surfa.jpg', ARRAY['/luxury-spa-minimalist-beauty-products-marble-surfa.jpg'], 67),
  ('Double Cleanse Oil Balm', 'Luxurious cleansing balm that melts away makeup and sunscreen effortlessly', 48.00, 'Cleansers', 'Jojoba Oil, Vitamin E, Chamomile, Green Tea Extract', '/luxury-face-oil-amber-glass-bottle-Hyaluronic Acid-ingre.jpg', ARRAY['/luxury-face-oil-amber-glass-bottle-Hyaluronic Acid-ingre.jpg'], 55),
  ('Exfoliating AHA Cleanser', 'Gentle daily cleanser with alpha hydroxy acids to reveal brighter, smoother skin', 52.00, 'Cleansers', 'Glycolic Acid, Lactic Acid, Aloe Vera, Vitamin B5', '/luxury-spa-minimalist-beauty-products-marble-surfa.jpg', ARRAY['/luxury-spa-minimalist-beauty-products-marble-surfa.jpg'], 43),
  
  -- Masks
  ('Purifying Clay Mask', 'Deep-cleansing clay mask that draws out impurities and refines pores', 45.00, 'Masks', 'Kaolin Clay, Bentonite, Charcoal, Tea Tree Oil', '/luxury-spa-minimalist-beauty-products-marble-surfa.jpg', ARRAY['/luxury-spa-minimalist-beauty-products-marble-surfa.jpg'], 48),
  ('Overnight Sleeping Mask', 'Intensive hydration mask that works while you sleep for plump, radiant skin', 62.00, 'Masks', 'Hyaluronic Acid, Ceramides, Vitamin B5, Lavender', '/luxury-night-cream-jar-rose-gold-lid-marble-surfac.jpg', ARRAY['/luxury-night-cream-jar-rose-gold-lid-marble-surfac.jpg'], 36),
  ('Brightening Sheet Mask', 'Vitamin-infused sheet mask for instant radiance and hydration boost', 15.00, 'Masks', 'Vitamin C, Niacinamide, Hyaluronic Acid, Aloe Vera', '/luxury-spa-minimalist-beauty-products-marble-surfa.jpg', ARRAY['/luxury-spa-minimalist-beauty-products-marble-surfa.jpg'], 120),
  
  -- Eye Care
  ('Peptide Eye Cream', 'Firming eye cream that reduces puffiness and minimizes dark circles', 58.00, 'Eye Care', 'Peptides, Caffeine, Vitamin K, Hyaluronic Acid', '/luxury-spa-minimalist-beauty-products-marble-surfa.jpg', ARRAY['/luxury-spa-minimalist-beauty-products-marble-surfa.jpg'], 39),
  ('Cooling Eye Gel', 'Refreshing gel formula that instantly soothes and depuffs tired eyes', 48.00, 'Eye Care', 'Cucumber Extract, Caffeine, Aloe Vera, Chamomile', '/luxury-spa-minimalist-beauty-products-marble-surfa.jpg', ARRAY['/luxury-spa-minimalist-beauty-products-marble-surfa.jpg'], 44),
  
  -- Oils
  ('Glow Facial Oil', 'Nourishing blend of Hyaluronic Acid oils for radiant, healthy-looking skin', 68.00, 'Oils', 'Rosehip Oil, Jojoba Oil, Vitamin E, Sea Buckthorn', '/luxury-face-oil-amber-glass-bottle-Hyaluronic Acid-ingre.jpg', ARRAY['/luxury-face-oil-amber-glass-bottle-Hyaluronic Acid-ingre.jpg'], 31),
  ('Squalane + Omega Oil', 'Fast-absorbing oil that locks in moisture without greasiness', 72.00, 'Oils', 'Squalane, Omega-3, Omega-6, Vitamin F', '/luxury-face-oil-amber-glass-bottle-Hyaluronic Acid-ingre.jpg', ARRAY['/luxury-face-oil-amber-glass-bottle-Hyaluronic Acid-ingre.jpg'], 28);
