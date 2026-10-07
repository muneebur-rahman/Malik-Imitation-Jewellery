import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are meaningfully provided
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("https://") &&
    !supabaseUrl.includes("your-project-id") &&
    !supabaseUrl.includes("placeholder") &&
    supabaseAnonKey.length > 20
);

export const supabase = isSupabaseConfigured
  ? (globalThis.__supabaseInstance =
      globalThis.__supabaseInstance ||
      createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      }))
  : null;

if (!isSupabaseConfigured) {
  console.warn(
    "[Malik Imitation Jewellery] Supabase credentials missing. Please define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file."
  );
}
