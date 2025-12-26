-- Add brand column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS brand TEXT;

-- Update existing products to have a default brand
UPDATE products SET brand = 'Aura Luxury' WHERE brand IS NULL;

-- Make brand column not null after populating it
ALTER TABLE products ALTER COLUMN brand SET NOT NULL;

-- Create index for brand
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);

-- Insert beauty products
INSERT INTO products (name, description, price, category, brand, ingredients, image_url, image_urls, stock) VALUES
  -- Eyeliners
  ('Dazller Eyeliner', 'Long-lasting waterproof eyeliner for a dramatic look', 12.00, 'Eyeliner', 'Dazller', 'Aqua, Acrylates Copolymer, Carbon Black', '/images/dazller-eyeliner.jpg', ARRAY['/images/dazller-eyeliner.jpg'], 100),
  ('Lakme Insta Liner', 'Water resistant eyeliner that stays all day', 15.00, 'Eyeliner', 'Lakme', 'Aqua, Pigments, Preservatives', '/images/lakme-eyeliner.jpg', ARRAY['/images/lakme-eyeliner.jpg'], 100),
  ('Purple Winged Liner', 'Precision tip liner for the perfect wing', 18.00, 'Eyeliner', 'Purple', 'Aqua, Styrene/Acrylates Copolymer', '/images/purple-eyeliner.jpg', ARRAY['/images/purple-eyeliner.jpg'], 100),

  -- Mascara
  ('Dazller Volumizing Mascara', 'Adds volume and length to your lashes', 14.00, 'Mascara', 'Dazller', 'Water, Beeswax, Iron Oxides', '/images/dazller-mascara.jpg', ARRAY['/images/dazller-mascara.jpg'], 80),
  ('Lakme Eyeconic Mascara', 'Curling mascara for iconic eyes', 16.00, 'Mascara', 'Lakme', 'Water, Carnauba Wax, Stearic Acid', '/images/lakme-mascara.jpg', ARRAY['/images/lakme-mascara.jpg'], 80),
  ('Purple Lash Master', 'Clump-free mascara for defined lashes', 20.00, 'Mascara', 'Purple', 'Water, Acrylates Copolymer', '/images/purple-mascara.jpg', ARRAY['/images/purple-mascara.jpg'], 80),

  -- Lip Balm
  ('Dazller Berry Balm', 'Moisturizing lip balm with a hint of berry tint', 5.00, 'Lip Balm', 'Dazller', 'Petrolatum, Shea Butter, Vitamin E', '/images/dazller-lipbalm.jpg', ARRAY['/images/dazller-lipbalm.jpg'], 150),
  ('Lakme Lip Love', 'Hydrating lip care with SPF 15', 6.00, 'Lip Balm', 'Lakme', 'Cocoa Butter, SPF 15', '/images/lakme-lipbalm.jpg', ARRAY['/images/lakme-lipbalm.jpg'], 150),
  ('Purple Tinted Balm', 'Nourishing balm with natural oils', 8.00, 'Lip Balm', 'Purple', 'Jojoba Oil, Almond Oil', '/images/purple-lipbalm.jpg', ARRAY['/images/purple-lipbalm.jpg'], 150),

  -- Foundation
  ('Dazller Matte Foundation', 'Full coverage matte foundation for oily skin', 25.00, 'Foundation', 'Dazller', 'Water, Cyclopentasiloxane, Titanium Dioxide', '/images/dazller-foundation.jpg', ARRAY['/images/dazller-foundation.jpg'], 60),
  ('Lakme Absolute Foundation', 'Skin brightening foundation with natural finish', 30.00, 'Foundation', 'Lakme', 'Water, Dimethicone, Argan Oil', '/images/lakme-foundation.jpg', ARRAY['/images/lakme-foundation.jpg'], 60),
  ('Purple HD Foundation', 'High definition foundation for camera-ready skin', 35.00, 'Foundation', 'Purple', 'Water, Glycerin, Silica', '/images/purple-foundation.jpg', ARRAY['/images/purple-foundation.jpg'], 60),

  -- Compact Powder
  ('Dazller Compact', 'Oil-control compact powder for a fresh look', 10.00, 'Compact Powder', 'Dazller', 'Talc, Mica, Zinc Stearate', '/images/dazller-compact.jpg', ARRAY['/images/dazller-compact.jpg'], 90),
  ('Lakme Radiance Compact', 'Brightening compact for radiant skin', 12.00, 'Compact Powder', 'Lakme', 'Talc, Vitamin C, Vitamin E', '/images/lakme-compact.jpg', ARRAY['/images/lakme-compact.jpg'], 90),
  ('Purple Matte Compact', 'Long-stay matte finish compact', 15.00, 'Compact Powder', 'Purple', 'Talc, Silica, Dimethicone', '/images/purple-compact.jpg', ARRAY['/images/purple-compact.jpg'], 90),

  -- Concealer
  ('Dazller Stick Concealer', 'Easy to apply stick concealer for blemishes', 8.00, 'Concealer', 'Dazller', 'Castor Oil, Carnauba Wax', '/images/dazller-concealer.jpg', ARRAY['/images/dazller-concealer.jpg'], 70),
  ('Lakme Liquid Concealer', 'Full coverage liquid concealer', 10.00, 'Concealer', 'Lakme', 'Water, Cyclopentasiloxane', '/images/lakme-concealer.jpg', ARRAY['/images/lakme-concealer.jpg'], 70),
  ('Purple HD Concealer', 'Crease-proof concealer for under eyes', 14.00, 'Concealer', 'Purple', 'Water, Glycerin, Mica', '/images/purple-concealer.jpg', ARRAY['/images/purple-concealer.jpg'], 70),

  -- Highlighter
  ('Dazller Glow Highlighter', 'Liquid highlighter for a natural glow', 15.00, 'Highlighter', 'Dazller', 'Mica, Glycerin, Water', '/images/dazller-highlighter.jpg', ARRAY['/images/dazller-highlighter.jpg'], 50),
  ('Lakme Moonlit Highlighter', 'Powder highlighter for intense shine', 18.00, 'Highlighter', 'Lakme', 'Talc, Mica, Dimethicone', '/images/lakme-highlighter.jpg', ARRAY['/images/lakme-highlighter.jpg'], 50),
  ('Purple Strobe Cream', 'Illuminating cream for strobing', 22.00, 'Highlighter', 'Purple', 'Water, Mica, Vitamin E', '/images/purple-highlighter.jpg', ARRAY['/images/purple-highlighter.jpg'], 50);
