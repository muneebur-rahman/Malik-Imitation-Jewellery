-- ==============================================================================
-- MALIK IMITATION JEWELLERY - COMPLETE SUPABASE DATABASE & STORAGE SCHEMA
-- ==============================================================================
-- Copy and run this script entirely in the Supabase SQL Editor.
-- It creates:
-- 1. products table with proper fields, UUIDs, and updated_at triggers
-- 2. Indexes for fast query performance
-- 3. Row Level Security (RLS) policies
-- 4. Storage bucket 'product-images' with public read & authenticated write policies
-- 5. Initial starter products for Malik Imitation Jewellery, Kamptee
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE,
    category TEXT NOT NULL CHECK (category IN ('Jewellery', 'Cosmetics', 'Bags')),
    sub_category TEXT,
    price NUMERIC(10, 2) DEFAULT NULL,
    description TEXT DEFAULT '',
    image_url TEXT NOT NULL,
    in_stock BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CREATE PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products (category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products (is_active);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products (featured);

-- 4. AUTO-UPDATE UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_products_updated_at ON public.products;
CREATE TRIGGER trigger_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Grant schema & table permissions to anon and authenticated roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.products TO anon;
GRANT ALL ON public.products TO authenticated;

-- Enable RLS on the products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public can view active products" ON public.products;
DROP POLICY IF EXISTS "Authenticated admin can view all products" ON public.products;
DROP POLICY IF EXISTS "Authenticated admin can insert products" ON public.products;
DROP POLICY IF EXISTS "Authenticated admin can update products" ON public.products;
DROP POLICY IF EXISTS "Authenticated admin can delete products" ON public.products;

-- POLICY 1: Public visitors can ONLY view active products
CREATE POLICY "Public can view active products"
ON public.products
FOR SELECT
TO public
USING (is_active = TRUE);

-- POLICY 2: Authenticated admin can view ALL products (including hidden drafts)
CREATE POLICY "Authenticated admin can view all products"
ON public.products
FOR SELECT
TO authenticated
USING (TRUE);

-- POLICY 3: Authenticated admin can create new products
CREATE POLICY "Authenticated admin can insert products"
ON public.products
FOR INSERT
TO authenticated
WITH CHECK (TRUE);

-- POLICY 4: Authenticated admin can update any product
CREATE POLICY "Authenticated admin can update products"
ON public.products
FOR UPDATE
TO authenticated
USING (TRUE)
WITH CHECK (TRUE);

-- POLICY 5: Authenticated admin can delete products
CREATE POLICY "Authenticated admin can delete products"
ON public.products
FOR DELETE
TO authenticated
USING (TRUE);


-- ==============================================================================
-- 6. STORAGE BUCKET CONFIGURATION FOR PRODUCT IMAGES
-- ==============================================================================

-- Create public storage bucket 'product-images' if not already created
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'product-images',
    'product-images',
    TRUE,
    10485760, -- 10MB limit per image
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET public = TRUE;

-- Storage RLS Policies
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated admin can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated admin can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated admin can delete product images" ON storage.objects;

-- POLICY 1: Anyone on the web can view images in product-images bucket
CREATE POLICY "Public can view product images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- POLICY 2: Authenticated admin can upload images to product-images bucket
CREATE POLICY "Authenticated admin can upload product images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- POLICY 3: Authenticated admin can update images
CREATE POLICY "Authenticated admin can update product images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images');

-- POLICY 4: Authenticated admin can delete images
CREATE POLICY "Authenticated admin can delete product images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');


-- ==============================================================================
-- 7. INITIAL SAMPLE PRODUCTS SEED (Optional: Run to populate starting catalog)
-- ==============================================================================

INSERT INTO public.products (name, slug, category, sub_category, price, description, image_url, in_stock, is_active, featured)
VALUES
(
    'Royal Kundan & Pearl Bridal Choker Set',
    'royal-kundan-pearl-bridal-choker-set',
    'Jewellery',
    'Necklace Sets',
    3499,
    'Handcrafted royal antique gold finish choker necklace studded with micro-faceted Kundan stones, emerald-toned drops, and hanging cluster pearls. Includes matching heavy jhumka earrings and maang tikka.',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    TRUE,
    TRUE,
    TRUE
),
(
    'Classic Matte Gold Temple Jhumkas',
    'classic-matte-gold-temple-jhumkas',
    'Jewellery',
    'Earrings',
    899,
    'Traditional South Indian temple work matte finish jhumki earrings with delicate ghungroo bells and floral stud top. Lightweight, skin-friendly, and perfect for wedding rituals and festive wear.',
    'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    TRUE,
    TRUE,
    TRUE
),
(
    'Zircon Crystal American Diamond Bangle Pair',
    'zircon-crystal-american-diamond-bangle-pair',
    'Jewellery',
    'Bangles',
    1550,
    'High-sparkle premium AAA American Diamond (Cubic Zirconia) rhodium-plated kada bangles with secure clasp lock. Resembles real solitaire diamonds with lasting shine.',
    'https://images.unsplash.com/photo-1611591475836-8a901ffdc8fa?auto=format&fit=crop&w=800&q=80',
    TRUE,
    TRUE,
    TRUE
),
(
    'Delicate Rose Gold Floral Pendant Chain',
    'delicate-rose-gold-floral-pendant-chain',
    'Jewellery',
    'Daily Wear',
    NULL, -- Demonstrates 'Enquire for Price'
    'Minimalist daily wear rose gold plated dainty chain with shimmering floral motif pendant. Anti-tarnish micro plating suitable for college, office, and casual outings.',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    TRUE,
    TRUE,
    FALSE
),
(
    'Velvet Matte Long-Stay Liquid Lipstick Set',
    'velvet-matte-long-stay-liquid-lipstick-set',
    'Cosmetics',
    'Lip Care',
    699,
    'Ultra-pigmented, transfer-proof velvet matte liquid lip colors enriched with Vitamin E. Smooth, weightless formula that keeps lips soft throughout the day.',
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    TRUE,
    TRUE,
    TRUE
),
(
    'Pro Glow 18-Shade Eyeshadow Palette',
    'pro-glow-18-shade-eyeshadow-palette',
    'Cosmetics',
    'Eye Makeup',
    1199,
    'Versatile eye palette featuring buttery mattes, intense foiled metallic glitters, and warm transition tones. Perfect for festive and bridal eye makeup looks.',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    TRUE,
    TRUE,
    TRUE
),
(
    'Embroidered Zari Bridal Potli Purse',
    'embroidered-zari-bridal-potli-purse',
    'Bags',
    'Clutches',
    1299,
    'Royal raw silk drawstring bridal potli adorned with intricate golden zari threadwork, hand-sewn beads, and rich pearl tassel ties. Ample space for phones and wedding essentials.',
    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
    TRUE,
    TRUE,
    TRUE
),
(
    'Metallic Hard-Case Designer Evening Clutch',
    'metallic-hard-case-designer-evening-clutch',
    'Bags',
    'Clutches',
    1850,
    'Champagne gold textured hard-shell evening clutch with crystal embellished push-lock and detachable gold chain shoulder strap. Complements sarees, lehengas, and gowns.',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    TRUE,
    TRUE,
    TRUE
)
ON CONFLICT (slug) DO NOTHING;
