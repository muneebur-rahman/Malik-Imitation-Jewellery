import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Lock, Mail, ArrowRight, Sparkles, Shield, AlertCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./AdminLogin.css";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { login, isSupabaseConfigured, isDemoMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setErrorMsg(res.error || "Invalid login credentials. Please try again.");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail("admin@malikjewellery.com");
    setPassword("admin123");
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        {/* Top Header */}
        <div className="login-header text-center">
          <div className="login-crest">
            <Sparkles size={24} className="text-gold" />
          </div>
          <span className="login-tag">Shop Management</span>
          <h1 className="login-title">Malik Imitation Jewellery</h1>
          <p className="login-desc">
            Sign in to manage product catalog, update prices, and upload new arrivals.
          </p>
        </div>

        {/* Demo Mode Notice */}
        {isDemoMode && (
          <div className="demo-login-alert">
            <div className="demo-alert-header">
              <Shield size={16} className="text-gold" />
              <strong>Demo Admin Mode</strong>
            </div>
            <p className="demo-alert-text">
              Supabase credentials are not yet configured in <code>.env</code>.
              You can test the admin panel immediately using demo credentials:
            </p>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="btn btn-secondary btn-sm fill-demo-btn"
            >
              Fill Demo Credentials (admin@malikjewellery.com)
            </button>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="login-error-banner">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">
              Admin Email
            </label>
            <div className="input-with-icon">
              <Mail size={17} className="input-icon" />
              <input
                id="admin-email"
                type="email"
                className="form-input"
                placeholder="e.g. owner@malikjewellery.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">
              Password
            </label>
            <div className="input-with-icon">
              <Lock size={17} className="input-icon" />
              <input
                id="admin-password"
                type="password"
                className="form-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg login-submit-btn"
            disabled={loading}
          >
            <span>{loading ? "Authenticating..." : "Sign In to Admin"}</span>
            <ArrowRight size={17} />
          </button>
        </form>

        <div className="login-footer text-center">
          <Link to="/" className="back-to-store-link">
            <ArrowLeft size={14} />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
