-- Create collection_cover_products table
CREATE TABLE IF NOT EXISTS collection_cover_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(collection_id, product_id)
);

-- Enable RLS
ALTER TABLE collection_cover_products ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read
CREATE POLICY "Anyone can view collection_cover_products" ON collection_cover_products
  FOR SELECT USING (true);

-- Insert data using a DO block to dynamically find IDs
DO $$
DECLARE
  col_rec RECORD;
  prod_rec RECORD;
  counter INTEGER;
BEGIN
  FOR col_rec IN SELECT * FROM collections LOOP
    counter := 0;
    -- Find products that match the collection slug
    -- Collection slug: eyeliner -> Product category: Eyeliner
    -- Collection slug: lip-balm -> Product category: Lip Balm
    
    FOR prod_rec IN 
      SELECT * FROM products 
      WHERE LOWER(category) = LOWER(REPLACE(col_rec.slug, '-', ' ')) 
      ORDER BY price DESC -- Just a way to pick some specific ones
      LIMIT 3
    LOOP
      INSERT INTO collection_cover_products (collection_id, product_id, sort_order)
      VALUES (col_rec.id, prod_rec.id, counter)
      ON CONFLICT (collection_id, product_id) DO NOTHING;
      counter := counter + 1;
    END LOOP;
  END LOOP;
END $$;
