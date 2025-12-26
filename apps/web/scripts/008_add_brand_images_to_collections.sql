-- Add brand_images column to collections table
ALTER TABLE collections ADD COLUMN IF NOT EXISTS brand_images TEXT[];

-- Update collections with brand images
-- Using placeholder images for now as specific brand images were not provided. 
-- In a real scenario, these would be URLs to the actual brand logos/images.
UPDATE collections 
SET brand_images = ARRAY['/images/dazller-logo.jpg', '/images/lakme-logo.jpg', '/images/purple-logo.jpg']
WHERE slug IN ('eyeliner', 'mascara', 'lip-balm', 'foundation', 'compact-powder', 'concealer', 'highlighter');
