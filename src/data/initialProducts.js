/**
 * Initial curated sample products for Malik Imitation Jewellery.
 * Used for initial UI preview and default seed data when Supabase is connected.
 * Easily manageable and deletable via the Admin panel.
 */

export const INITIAL_PRODUCTS = [
  {
    id: "jewel-001",
    name: "Royal Kundan & Pearl Bridal Choker Set",
    slug: "royal-kundan-pearl-bridal-choker-set",
    category: "Jewellery",
    subCategory: "Necklace Sets",
    price: 3499,
    description:
      "Handcrafted royal antique gold finish choker necklace studded with micro-faceted Kundan stones, emerald-toned drops, and hanging cluster pearls. Includes matching heavy jhumka earrings and maang tikka.",
    imageUrl:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    isActive: true,
    featured: true,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "jewel-002",
    name: "Classic Matte Gold Temple Jhumkas",
    slug: "classic-matte-gold-temple-jhumkas",
    category: "Jewellery",
    subCategory: "Earrings",
    price: 899,
    description:
      "Traditional South Indian temple work matte finish jhumki earrings with delicate ghungroo bells and floral stud top. Lightweight, skin-friendly, and perfect for wedding rituals and festive wear.",
    imageUrl:
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    isActive: true,
    featured: true,
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: "jewel-003",
    name: "Zircon Crystal American Diamond Bangle Pair",
    slug: "zircon-crystal-american-diamond-bangle-pair",
    category: "Jewellery",
    subCategory: "Bangles",
    price: 1550,
    description:
      "High-sparkle premium AAA American Diamond (Cubic Zirconia) rhodium-plated kada bangles with secure clasp lock. Resembles real solitaire diamonds with lasting shine.",
    imageUrl:
      "https://images.unsplash.com/photo-1611591475836-8a901ffdc8fa?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    isActive: true,
    featured: true,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "jewel-004",
    name: "Delicate Rose Gold Floral Pendant Chain",
    slug: "delicate-rose-gold-floral-pendant-chain",
    category: "Jewellery",
    subCategory: "Daily Wear",
    price: null, // "Enquire for Price" demonstration
    description:
      "Minimalist daily wear rose gold plated dainty chain with shimmering floral motif pendant. Anti-tarnish micro plating suitable for college, office, and casual outings.",
    imageUrl:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    isActive: true,
    featured: false,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "cosm-001",
    name: "Velvet Matte Long-Stay Liquid Lipstick Set",
    slug: "velvet-matte-long-stay-liquid-lipstick-set",
    category: "Cosmetics",
    subCategory: "Lip Care",
    price: 699,
    description:
      "Ultra-pigmented, transfer-proof velvet matte liquid lip colors enriched with Vitamin E. Smooth, weightless formula that keeps lips soft throughout the day.",
    imageUrl:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    isActive: true,
    featured: true,
    created_at: new Date(Date.now() - 86400000 * 6).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 6).toISOString(),
  },
  {
    id: "cosm-002",
    name: "Pro Glow 18-Shade Eyeshadow Palette",
    slug: "pro-glow-18-shade-eyeshadow-palette",
    category: "Cosmetics",
    subCategory: "Eye Makeup",
    price: 1199,
    description:
      "Versatile eye palette featuring buttery mattes, intense foiled metallic glitters, and warm transition tones. Perfect for festive and bridal eye makeup looks.",
    imageUrl:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    isActive: true,
    featured: true,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "cosm-003",
    name: "Luminous HD Foundation & Setting Powder Kit",
    slug: "luminous-hd-foundation-setting-powder-kit",
    category: "Cosmetics",
    subCategory: "Face Makeup",
    price: null, // "Enquire for Price"
    description:
      "High-definition blendable liquid foundation offering medium-to-full buildable coverage with micro-fine banana setting powder for pore-blurring perfection.",
    imageUrl:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    isActive: true,
    featured: false,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "bag-001",
    name: "Embroidered Zari Bridal Potli Purse",
    slug: "embroidered-zari-bridal-potli-purse",
    category: "Bags",
    subCategory: "Clutches",
    price: 1299,
    description:
      "Royal raw silk drawstring bridal potli adorned with intricate golden zari threadwork, hand-sewn beads, and rich pearl tassel ties. Ample space for phones and wedding essentials.",
    imageUrl:
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    isActive: true,
    featured: true,
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: "bag-002",
    name: "Metallic Hard-Case Designer Evening Clutch",
    slug: "metallic-hard-case-designer-evening-clutch",
    category: "Bags",
    subCategory: "Clutches",
    price: 1850,
    description:
      "Champagne gold textured hard-shell evening clutch with crystal embellished push-lock and detachable gold chain shoulder strap. Complements sarees, lehengas, and gowns.",
    imageUrl:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    isActive: true,
    featured: true,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "bag-003",
    name: "Chic Structured Quilted Shoulder Sling Bag",
    slug: "chic-structured-quilted-shoulder-sling-bag",
    category: "Bags",
    subCategory: "Sling Bags",
    price: 1450,
    description:
      "Sophisticated vegan leather diamond-quilted sling bag with golden turn-lock hardware and dual zip compartments. Elegant companion for everyday style and outings.",
    imageUrl:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    isActive: true,
    featured: false,
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];
