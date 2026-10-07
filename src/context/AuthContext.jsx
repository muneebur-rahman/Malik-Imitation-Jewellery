import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../services/supabaseClient";

const AuthContext = createContext({});

const DEMO_ADMIN_KEY = "malik_demo_admin_session";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured);

  useEffect(() => {
    let mounted = true;

    if (isSupabaseConfigured && supabase) {
      setIsDemoMode(false);
      // Fetch initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!mounted) return;
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      // Listen for auth changes
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
      // Local demo mode check
      setIsDemoMode(true);
      const saved = localStorage.getItem(DEMO_ADMIN_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setUser(parsed);
          setSession({ user: parsed, access_token: "demo-token" });
        } catch (e) {
          localStorage.removeItem(DEMO_ADMIN_KEY);
        }
      }
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, user: data.user };
    }

    // Demo mode: Accept admin credentials
    // Default demo: admin@malikjewellery.com / admin123 (or any valid email)
    if (email && password && password.length >= 6) {
      const demoUser = {
        id: "demo-admin-id",
        email: email.trim(),
        role: "admin",
        user_metadata: { name: "Shop Owner" },
      };
      localStorage.setItem(DEMO_ADMIN_KEY, JSON.stringify(demoUser));
      setUser(demoUser);
      setSession({ user: demoUser, access_token: "demo-token" });
      return { success: true, user: demoUser };
    }

    return {
      success: false,
      error: "Please enter a valid email and password (minimum 6 characters).",
    };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(DEMO_ADMIN_KEY);
    setUser(null);
    setSession(null);
  };

  const value = {
    user,
    session,
    isAuthenticated: Boolean(user),
    loading,
    isDemoMode,
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
