import { createClient } from "@supabase/supabase-js";

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are meaningfully provided
export const isSupabaseConfigured = Boolean(
  rawUrl &&
    supabaseAnonKey &&
    rawUrl.startsWith("https://") &&
    !rawUrl.includes("your-project-id") &&
    !rawUrl.includes("placeholder") &&
    supabaseAnonKey.length > 20
);

// In local development, route through Vite proxy if running on localhost to resolve new subdomains reliably
const activeUrl =
  import.meta.env.DEV &&
  typeof window !== "undefined" &&
  window.location?.origin?.includes("localhost")
    ? `${window.location.origin}/supabase-proxy`
    : rawUrl;

export const supabase = isSupabaseConfigured
  ? (globalThis.__supabaseInstance =
      globalThis.__supabaseInstance ||
      createClient(activeUrl, supabaseAnonKey, {
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
