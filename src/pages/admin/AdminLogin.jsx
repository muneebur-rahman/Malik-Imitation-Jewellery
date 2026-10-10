import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Lock, Mail, ArrowRight, AlertCircle, ArrowLeft, Database, WifiOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./AdminLogin.css";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState({ message: "", type: "" });

  const { login, isSupabaseConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorInfo({ message: "", type: "" });
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setErrorInfo({
          message: res.error || "Invalid login credentials. Please check your Supabase user.",
          type: res.errorType || "auth",
        });
      }
    } catch (_err) {
      setErrorInfo({
        message: "An unexpected error occurred during sign in. Please try again.",
        type: "unknown",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        {/* Top Header */}
        <div className="login-header text-center">
          <div className="login-logo-wrap">
            <img
              src="/logo.png"
              alt="Malik Imitation Jewellery Logo"
              className="login-logo-img"
            />
          </div>
          <span className="login-tag">Shop Management Portal</span>
          <h1 className="login-title">Malik Imitation Jewellery</h1>
          <p className="login-desc">
            Sign in with your Supabase shop owner credentials to manage products, prices, and upload new arrivals.
          </p>
        </div>

        {/* Configuration Warning if .env missing */}
        {!isSupabaseConfigured && (
          <div className="login-error-banner" style={{ backgroundColor: "#FFFBEB", borderColor: "#FCD34D", color: "#B45309" }}>
            <Database size={16} />
            <span>
              Supabase credentials not detected. Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file.
            </span>
          </div>
        )}

        {/* Error message */}
        {errorInfo.message && (
          <div
            className={`login-error-banner ${
              errorInfo.type === "network" ? "banner-network-error" : ""
            }`}
          >
            {errorInfo.type === "network" ? (
              <WifiOff size={18} className="banner-icon" />
            ) : (
              <AlertCircle size={18} className="banner-icon" />
            )}
            <div className="banner-content">
              <strong className="banner-title">
                {errorInfo.type === "network"
                  ? "Network Connection Error"
                  : errorInfo.type === "config"
                  ? "Configuration Missing"
                  : "Authentication Error"}
              </strong>
              <p className="banner-desc">{errorInfo.message}</p>
            </div>
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
                placeholder="Enter your Supabase admin password"
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
            <span>{loading ? "Authenticating with Supabase..." : "Sign In to Admin"}</span>
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
