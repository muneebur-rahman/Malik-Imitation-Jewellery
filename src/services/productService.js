import { supabase, isSupabaseConfigured } from "./supabaseClient";

// Helper: Normalize DB row (snake_case) to Frontend model (camelCase)
const mapFromDb = (row) => ({
  id: row.id,
  name: row.name,
  slug: row.slug || row.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  category: row.category,
  subCategory: row.sub_category || "",
  price: row.price !== null && row.price !== undefined ? Number(row.price) : null,
  description: row.description || "",
  imageUrl: row.image_url || "",
  inStock: row.in_stock ?? true,
  isActive: row.is_active ?? true,
  featured: row.featured ?? false,
  createdAt: row.created_at || new Date().toISOString(),
  updatedAt: row.updated_at || new Date().toISOString(),
});

// Helper: Normalize Frontend model to DB row (snake_case)
const mapToDb = (item) => ({
  name: item.name,
  slug: item.slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  category: item.category,
  sub_category: item.subCategory || "",
  price: item.price ? Number(item.price) : null,
  description: item.description || "",
  image_url: item.imageUrl || "",
  in_stock: Boolean(item.inStock),
  is_active: Boolean(item.isActive),
  featured: Boolean(item.featured),
  updated_at: new Date().toISOString(),
});

export const productService = {
  isConfigured: () => isSupabaseConfigured,

  /**
   * Fetch all products from Supabase
   * @param {Object} options - { category, activeOnly, limit, search }
   */
  async getProducts(options = {}) {
    const { category, activeOnly = true, limit, search } = options;

    if (!isSupabaseConfigured || !supabase) {
      return {
        data: [],
        error: "Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.",
      };
    }

    try {
      let query = supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (activeOnly) {
        query = query.eq("is_active", true);
      }

      if (category && category !== "All") {
        query = query.ilike("category", category);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      if (error) throw error;

      let results = (data || []).map(mapFromDb);

      if (search) {
        const s = search.toLowerCase();
        results = results.filter(
          (p) =>
            p.name.toLowerCase().includes(s) ||
            p.description.toLowerCase().includes(s)
        );
      }

      return { data: results, error: null };
    } catch (err) {
      console.error("Supabase getProducts error:", err);
      return {
        data: [],
        error: err.message || "Failed to fetch products from Supabase.",
      };
    }
  },

  /**
   * Fetch a single product by ID or Slug from Supabase
   */
  async getProductById(id) {
    if (!isSupabaseConfigured || !supabase) {
      return {
        data: null,
        error: "Supabase is not configured. Please add credentials to your .env file.",
      };
    }

    try {
      const isUuid =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          id
        );

      let query = supabase.from("products").select("*");
      if (isUuid) {
        query = query.eq("id", id);
      } else {
        query = query.or(`id.eq.${id},slug.eq.${id}`);
      }

      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      if (!data) return { data: null, error: "Product not found." };

      return { data: mapFromDb(data), error: null };
    } catch (err) {
      console.error("Supabase getProductById error:", err);
      return { data: null, error: err.message || "Failed to fetch product." };
    }
  },

  /**
   * Create a new product in Supabase
   */
  async createProduct(productData) {
    if (!isSupabaseConfigured || !supabase) {
      return {
        data: null,
        error: "Supabase is not configured. Please set up your .env file.",
      };
    }

    try {
      const payload = mapToDb(productData);
      payload.created_at = new Date().toISOString();

      const { data, error } = await supabase
        .from("products")
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return { data: mapFromDb(data), error: null };
    } catch (err) {
      console.error("Supabase createProduct error:", err);
      return { data: null, error: err.message || "Failed to create product in Supabase." };
    }
  },

  /**
   * Update an existing product in Supabase
   */
  async updateProduct(id, productData) {
    if (!isSupabaseConfigured || !supabase) {
      return {
        data: null,
        error: "Supabase is not configured. Please set up your .env file.",
      };
    }

    try {
      const payload = mapToDb(productData);
      const { data, error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return { data: mapFromDb(data), error: null };
    } catch (err) {
      console.error("Supabase updateProduct error:", err);
      return { data: null, error: err.message || "Failed to update product in Supabase." };
    }
  },

  /**
   * Delete a product from Supabase
   */
  async deleteProduct(id) {
    if (!isSupabaseConfigured || !supabase) {
      return {
        success: false,
        error: "Supabase is not configured. Please set up your .env file.",
      };
    }

    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      return { success: true, error: null };
    } catch (err) {
      console.error("Supabase deleteProduct error:", err);
      return { success: false, error: err.message || "Failed to delete product from Supabase." };
    }
  },

  /**
   * Toggle product visibility (is_active) in Supabase
   */
  async toggleProductActive(id, newActiveStatus) {
    if (!isSupabaseConfigured || !supabase) {
      return {
        data: null,
        error: "Supabase is not configured.",
      };
    }

    try {
      const { data, error } = await supabase
        .from("products")
        .update({ is_active: Boolean(newActiveStatus), updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return { data: mapFromDb(data), error: null };
    } catch (err) {
      console.error("Supabase toggleProductActive error:", err);
      return { data: null, error: err.message };
    }
  },

  /**
   * Upload an image to Supabase Storage bucket 'product-images'
   */
  async uploadProductImage(file) {
    if (!file) {
      return { url: null, error: "No image file provided." };
    }

    if (!isSupabaseConfigured || !supabase) {
      return {
        url: null,
        error: "Supabase is not configured. Please configure .env to upload images to Supabase Storage.",
      };
    }

    try {
      const fileExt = file.name ? file.name.split(".").pop() : "jpg";
      const cleanName = (file.name || "image")
        .split(".")[0]
        .replace(/[^a-zA-Z0-9]/g, "-")
        .toLowerCase();
      const fileName = `${Date.now()}-${cleanName}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      // Retrieve public URL from Supabase Storage
      const { data: publicData } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      return { url: publicData.publicUrl, error: null };
    } catch (err) {
      console.error("Supabase Storage upload error:", err);
      return {
        url: null,
        error: err.message || "Failed to upload image to Supabase Storage bucket 'product-images'.",
      };
    }
  },
};
