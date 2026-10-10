import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./AdminLayout.css";

export const AdminLayout = ({ children, title, subtitle }) => {
  const { user, logout, isSupabaseConfigured } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
    { name: "Manage Products", path: "/admin/products", icon: Package },
    { name: "Add New Product", path: "/admin/products/new", icon: PlusCircle },
  ];

  return (
    <div className="admin-app-wrapper">
      {/* Admin Top Header */}
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-brand-group">
            <button
              type="button"
              className="admin-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle admin menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link to="/admin" className="admin-brand-link">
              <img
                src="/logo.png"
                alt="Malik Imitation Jewellery Logo"
                className="admin-brand-logo-img"
              />
              <div>
                <span className="admin-brand-name">MALIK</span>
                <span className="admin-panel-tag">ADMIN PORTAL</span>
              </div>
            </Link>
          </div>

          <div className="admin-header-actions">
            {/* Supabase Status Pill */}
            {isSupabaseConfigured ? (
              <span className="backend-status-pill status-connected" title="Connected to Supabase Database & Storage">
                <span className="status-dot green"></span>
                <span>Supabase Live</span>
              </span>
            ) : (
              <span className="backend-status-pill status-demo" title="Add credentials to .env">
                <span className="status-dot amber"></span>
                <span>.env Missing</span>
              </span>
            )}

            <Link to="/" target="_blank" className="admin-view-site-link" title="Open Public Website">
              <ExternalLink size={16} />
              <span className="hide-on-mobile">View Live Store</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="admin-logout-btn"
              title="Sign Out"
            >
              <LogOut size={16} />
              <span className="hide-on-mobile">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="admin-body-container">
        {/* Desktop Sidebar */}
        <aside className="admin-sidebar">
          <nav className="admin-sidebar-nav">
            <span className="sidebar-group-title">CATALOG MANAGEMENT</span>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `admin-sidebar-link ${isActive ? "active" : ""}`
                  }
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}

            <div className="sidebar-divider"></div>

            <span className="sidebar-group-title">STORE SHORTCUTS</span>
            <Link to="/" target="_blank" className="admin-sidebar-link">
              <ExternalLink size={18} />
              <span>Public Website</span>
            </Link>
          </nav>

          <div className="admin-user-profile">
            <div className="user-avatar">
              {user?.email?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="user-details">
              <span className="user-email" title={user?.email}>
                {user?.email || "Shop Admin"}
              </span>
              <span className="user-role">
                Supabase Authenticated
              </span>
            </div>
          </div>
        </aside>

        {/* Mobile Slide-Over Drawer */}
        {mobileMenuOpen && (
          <div className="admin-mobile-drawer">
            <div className="admin-mobile-drawer-inner">
              <div className="drawer-nav-group">
                <span className="sidebar-group-title">CATALOG MANAGEMENT</span>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.end}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `admin-sidebar-link ${isActive ? "active" : ""}`
                      }
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}

                <div className="sidebar-divider"></div>

                <Link
                  to="/"
                  target="_blank"
                  className="admin-sidebar-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ExternalLink size={18} />
                  <span>View Public Website</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="admin-sidebar-link text-danger"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="admin-main-content">
          {(title || subtitle) && (
            <div className="admin-page-header">
              {title && <h1 className="admin-page-title">{title}</h1>}
              {subtitle && <p className="admin-page-subtitle">{subtitle}</p>}
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
};
