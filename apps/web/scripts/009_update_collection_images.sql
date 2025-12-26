-- Update collections with existing images from public folder
UPDATE collections 
SET image_url = CASE slug
  WHEN 'eyeliner' THEN '/luxury-spa-minimalist-beauty-products-marble-surfa.jpg'
  WHEN 'mascara' THEN '/luxury-night-cream-jar-rose-gold-lid-marble-surfac.jpg'
  WHEN 'lip-balm' THEN '/luxury-face-oil-amber-glass-bottle-Hyaluronic Acid-ingre.jpg'
  WHEN 'foundation' THEN '/luxury-vitamin-c-serum-glass-bottle-minimalist-gol.jpg'
  WHEN 'compact-powder' THEN '/luxury-spa-retin-stones-zen-peaceful-gray-tones.jpg'
  WHEN 'concealer' THEN '/luxury-spa-Hyaluronic Acid-ingredients-natural-light-gre.jpg'
  WHEN 'highlighter' THEN '/vitamin-c-brightening-serum-orange-glow.jpg'
  ELSE image_url
END;

-- Update brand images with existing images (using product images as brand logos for now)
UPDATE collections 
SET brand_images = ARRAY[
  '/luxury-vitamin-c-serum-glass-bottle-minimalist-gol.jpg',
  '/luxury-face-oil-amber-glass-bottle-Hyaluronic Acid-ingre.jpg',
  '/luxury-night-cream-jar-rose-gold-lid-marble-surfac.jpg'
]
WHERE slug IN ('eyeliner', 'mascara', 'lip-balm', 'foundation', 'compact-powder', 'concealer', 'highlighter');
