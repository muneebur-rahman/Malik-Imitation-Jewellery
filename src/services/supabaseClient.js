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
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

if (!isSupabaseConfigured) {
  console.info(
    "%c[Malik Imitation Jewellery] Supabase is not yet configured. The website is operating in local catalog & demo mode. Follow the SUPABASE_SETUP.md guide to connect your real Supabase instance.",
    "color: #C5A059; font-weight: bold; font-size: 12px;"
  );
}
