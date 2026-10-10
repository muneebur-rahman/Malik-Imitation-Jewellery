import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../services/supabaseClient";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    if (isSupabaseConfigured && supabase) {
      // Fetch initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!mounted) return;
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      // Listen for auth state changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!mounted) return;
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => {
        mounted = false;
        subscription?.unsubscribe();
      };
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    if (!isSupabaseConfigured || !supabase) {
      return {
        success: false,
        errorType: "config",
        error:
          "Supabase credentials not configured. Please define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.",
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        const errorMsg = error.message || "";
        const isNetwork =
          errorMsg.toLowerCase().includes("failed to fetch") ||
          errorMsg.toLowerCase().includes("networkerror") ||
          errorMsg.toLowerCase().includes("network request failed") ||
          error.name === "AuthRetryableFetchError";

        if (isNetwork) {
          return {
            success: false,
            errorType: "network",
            error:
              "Unable to reach the Supabase server (Network / Fetch Error). Please check your internet connection and verify that your Supabase project is active.",
          };
        }

        let friendlyMessage = errorMsg;
        if (errorMsg.toLowerCase().includes("invalid login credentials")) {
          friendlyMessage =
            "Invalid email or password. Please verify your admin credentials in the Supabase Auth dashboard.";
        } else if (errorMsg.toLowerCase().includes("email not confirmed")) {
          friendlyMessage =
            "Email address is not confirmed yet. Please verify your email or disable confirmation in Supabase Auth settings.";
        }

        return {
          success: false,
          errorType: "auth",
          error: friendlyMessage,
        };
      }

      return { success: true, user: data.user };
    } catch (err) {
      const errorMsg = err?.message || "";
      const isNetwork =
        errorMsg.toLowerCase().includes("failed to fetch") ||
        errorMsg.toLowerCase().includes("networkerror") ||
        errorMsg.toLowerCase().includes("network request failed") ||
        err?.name === "AuthRetryableFetchError";

      return {
        success: false,
        errorType: isNetwork ? "network" : "auth",
        error: isNetwork
          ? "Unable to reach the Supabase server (Network / Fetch Error). Please check your internet connection and verify that your Supabase project is active."
          : errorMsg || "Failed to sign in. Please try again.",
      };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
  };

  const value = {
    user,
    session,
    isAuthenticated: Boolean(user),
    loading,
    isSupabaseConfigured,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
