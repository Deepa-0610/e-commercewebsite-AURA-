export const categories = [
  { name: 'Skincare', slug: 'skincare' },
  { name: 'Makeup', slug: 'makeup' },
  { name: 'Haircare', slug: 'haircare' },
  { name: 'Fragrance', slug: 'fragrance' },
  { name: 'Bath & Body', slug: 'bath-body' },
]

export const brands = [
  'Aura',
  'Lakme',
  'Maybelline',
  'Plum',
  'Minimalist',
]

export const priceRanges = ['Under ₹499', '₹500–₹999', '₹1000–₹1999', 'Premium']

export const giftSets = ['Festive Kits', 'Bridal Kits', 'Travel Kits']

export const products = [
  {
    id: 'p1',
    name: 'Radiance Serum',
    description: 'Brightening vitamin C serum for even tone and glow.',
    price: 128.0,
    category: 'Skincare',
    image_url: '/luxury-vitamin-c-serum-glass-bottle-minimalist-gol.jpg',
    image_urls: ['/luxury-vitamin-c-serum-glass-bottle-minimalist-gol.jpg'],
    stock: 12,
    ingredients: 'Vitamin C, Hyaluronic Acid, Green Tea',
  },
  {
    id: 'p2',
    name: 'Velvet Night Cream',
    description: 'Rich night cream with peptides and retinol for skin renewal.',
    price: 185.0,
    category: 'Skincare',
    image_url: '/luxury-night-cream-jar-rose-gold-lid-marble-surfac.jpg',
    image_urls: ['/luxury-night-cream-jar-rose-gold-lid-marble-surfac.jpg'],
    stock: 6,
    ingredients: 'Retinol, Peptides, Shea Butter',
  },
  {
    id: 'p3',
    name: 'Travel Mini Kit',
    description: 'Compact travel kit with essentials for a weekend getaway.',
    price: 49.0,
    category: 'Travel Kits',
    image_url: '/travel-kit.jpg',
    image_urls: ['/travel-kit.jpg'],
    stock: 30,
    ingredients: 'Mini sizes of bestsellers',
  },
]

export const subcategories: Record<string, string[]> = {
  skincare: ['Cleansers', 'Toners', 'Serums', 'Moisturizers', 'Masks'],
  makeup: ['Face', 'Eyes', 'Lips', 'Tools & Brushes', 'Primers'],
  haircare: ['Shampoo', 'Conditioner', 'Treatments', 'Styling'],
  fragrance: ['Eau de Parfum', 'Eau de Toilette', 'Body Mists'],
  'bath-body': ['Body Wash', 'Scrubs', 'Lotions', 'Hand Care'],
}

export const brandCollections: Record<string, string[]> = {
  Aura: ['Aura Core', 'Aura Luxe', 'Aura Travel'],
  Lakme: ['Lakme Studio', 'Lakme Spa'],
  Maybelline: ['Fit Me', 'SuperStay'],
  Plum: ['Natural', 'Derma'],
  Minimalist: ['Active', 'Daily'],
}
