import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { INITIAL_PRODUCTS } from "../data/initialProducts";

const LOCAL_STORAGE_KEY = "malik_local_products_v2";

// Helper to normalize local storage products
const getLocalProducts = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return [...INITIAL_PRODUCTS];
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read from localStorage", e);
    return [...INITIAL_PRODUCTS];
  }
};

const saveLocalProducts = (products) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error("Failed to write to localStorage", e);
  }
};

// Normalize DB row (snake_case) to Frontend model (camelCase)
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

// Normalize Frontend model to DB row (snake_case)
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
   * Fetch all products with optional filters
   * @param {Object} options - { category, activeOnly, limit, search }
   */
  async getProducts(options = {}) {
    const { category, activeOnly = true, limit, search } = options;

    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (activeOnly) {
          query = query.eq("is_active", true);
        }

        if (category && category !== "All") {
          // Case-insensitive match for category
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
        console.warn("Supabase fetch failed, falling back to local data:", err);
      }
    }

    // Local / fallback mode
    let list = getLocalProducts();

    if (activeOnly) {
      list = list.filter((p) => p.isActive !== false);
    }

    if (category && category !== "All") {
      list = list.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const s = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s)
      );
    }

    if (limit) {
      list = list.slice(0, limit);
    }

    return { data: list, error: null };
  },

  /**
   * Fetch a single product by ID or Slug
   */
  async getProductById(id) {
    if (isSupabaseConfigured && supabase) {
      try {
        // Check if id is a UUID
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
        if (data) return { data: mapFromDb(data), error: null };
      } catch (err) {
        console.warn("Supabase single item fetch failed, falling back to local:", err);
      }
    }

    // Local fallback
    const list = getLocalProducts();
    const found = list.find((p) => p.id === id || p.slug === id);
    return { data: found || null, error: found ? null : "Product not found" };
  },

  /**
   * Create a new product
   */
  async createProduct(productData) {
    if (isSupabaseConfigured && supabase) {
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
        return { data: null, error: err.message || "Failed to create product" };
      }
    }

    // Local mode
    const list = getLocalProducts();
    const newProduct = {
      id: "prod-" + Date.now(),
      name: productData.name,
      slug: productData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: productData.category,
      subCategory: productData.subCategory || "",
      price: productData.price ? Number(productData.price) : null,
      description: productData.description || "",
      imageUrl: productData.imageUrl || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      inStock: productData.inStock ?? true,
      isActive: productData.isActive ?? true,
      featured: productData.featured ?? false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    list.unshift(newProduct);
    saveLocalProducts(list);
    return { data: newProduct, error: null };
  },

  /**
   * Update an existing product
   */
  async updateProduct(id, productData) {
    if (isSupabaseConfigured && supabase) {
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
        return { data: null, error: err.message || "Failed to update product" };
      }
    }

    // Local mode
    const list = getLocalProducts();
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) {
      return { data: null, error: "Product not found" };
    }

    list[index] = {
      ...list[index],
      ...productData,
      price: productData.price ? Number(productData.price) : null,
      updatedAt: new Date().toISOString(),
    };

    saveLocalProducts(list);
    return { data: list[index], error: null };
  },

  /**
   * Delete a product
   */
  async deleteProduct(id) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from("products").delete().eq("id", id);
        if (error) throw error;
        return { success: true, error: null };
      } catch (err) {
        return { success: false, error: err.message || "Failed to delete" };
      }
    }

    // Local mode
    let list = getLocalProducts();
    list = list.filter((p) => p.id !== id);
    saveLocalProducts(list);
    return { success: true, error: null };
  },

  /**
   * Toggle visibility (is_active)
   */
  async toggleProductActive(id, newActiveStatus) {
    return this.updateProduct(id, { isActive: newActiveStatus });
  },

  /**
   * Upload an image to Supabase Storage bucket 'product-images'
   * Works on mobile file picker / camera.
   */
  async uploadProductImage(file) {
    if (!file) {
      return { url: null, error: "No file provided" };
    }

    // If Supabase is configured
    if (isSupabaseConfigured && supabase) {
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

        // Get public URL
        const { data: publicData } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

        return { url: publicData.publicUrl, error: null };
      } catch (err) {
        console.warn("Storage upload failed, attempting fallback:", err);
        // If storage failed (e.g. policy not applied), still let user proceed with base64 for preview
      }
    }

    // Fallback for local demo mode or pending bucket configuration:
    // Convert to Data URL so it previews immediately and can be saved
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({ url: e.target.result, error: null });
      };
      reader.onerror = () => {
        resolve({ url: null, error: "Failed to read image file" });
      };
      reader.readAsDataURL(file);
    });
  },

  /**
   * Reset local catalog to default initial items (Admin utility)
   */
  resetToInitialCatalog() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return [...INITIAL_PRODUCTS];
  },
};
