import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Eye,
  EyeOff,
  PlusCircle,
  Sparkles,
  ExternalLink,
  Tag,
  ArrowRight,
  Database,
  CheckCircle,
} from "lucide-react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { productService } from "../../services/productService";
import { useAuth } from "../../context/AuthContext";
import "./AdminDashboard.css";

export const AdminDashboard = () => {
  const { isSupabaseConfigured } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await productService.getProducts({ activeOnly: false });
      setProducts(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalCount = products.length;
  const activeCount = products.filter((p) => p.isActive !== false).length;
  const hiddenCount = totalCount - activeCount;
  const jewelCount = products.filter((p) => p.category?.toLowerCase() === "jewellery").length;
  const cosmCount = products.filter((p) => p.category?.toLowerCase() === "cosmetics").length;
  const bagCount = products.filter((p) => p.category?.toLowerCase() === "bags").length;

  const handleToggle = async (product) => {
    const nextStatus = !product.isActive;
    await productService.toggleProductActive(product.id, nextStatus);
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, isActive: nextStatus } : p))
    );
  };

  return (
    <AdminLayout
      title="Store Management Dashboard"
      subtitle="Overview of your product catalog and online WhatsApp storefront"
    >
      {/* Backend Status Notice */}
      {!isSupabaseConfigured && (
        <div className="dashboard-status-banner">
          <div className="banner-left">
            <Database size={20} className="text-gold" />
            <div>
              <strong>Supabase Connection Required</strong>
              <p>
                Add your <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file to load and manage live products.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="stats-kpi-grid">
        <div className="stat-card">
          <div className="stat-icon-wrap icon-total">
            <Package size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-num">{totalCount}</span>
            <span className="stat-title">Total Catalog Products</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap icon-active">
            <Eye size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-num">{activeCount}</span>
            <span className="stat-title">Active in Store</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap icon-hidden">
            <EyeOff size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-num">{hiddenCount}</span>
            <span className="stat-title">Hidden / Drafts</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown Cards */}
      <div className="category-breakdown-row">
        <div className="category-count-box">
          <span className="count-cat-label">Imitation Jewellery</span>
          <span className="count-cat-num">{jewelCount} items</span>
        </div>
        <div className="category-count-box">
          <span className="count-cat-label">Cosmetics & Beauty</span>
          <span className="count-cat-num">{cosmCount} items</span>
        </div>
        <div className="category-count-box">
          <span className="count-cat-label">Bags & Clutches</span>
          <span className="count-cat-num">{bagCount} items</span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="dashboard-quick-actions">
        <Link to="/admin/products/new" className="btn btn-primary btn-lg">
          <PlusCircle size={19} />
          <span>Add New Product to Store</span>
        </Link>
        <Link to="/admin/products" className="btn btn-secondary btn-lg">
          <Package size={19} />
          <span>Manage All Products</span>
        </Link>
        <Link to="/" target="_blank" className="btn btn-secondary btn-lg">
          <ExternalLink size={19} />
          <span>View Public Store</span>
        </Link>
      </div>

      {/* Recent Products List */}
      <div className="dashboard-recent-section">
        <div className="section-title-row">
          <h2 className="recent-title">Recent Catalog Items</h2>
          <Link to="/admin/products" className="view-all-link">
            <span>View All ({totalCount})</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {loading ? (
          <p className="loading-text">Loading catalog items...</p>
        ) : products.length === 0 ? (
          <div className="dashboard-empty-card">
            <Sparkles size={28} className="text-gold" />
            <h3>No products found</h3>
            <p>Get started by adding your first jewellery piece or cosmetic product.</p>
            <Link to="/admin/products/new" className="btn btn-gold btn-sm mt-3">
              Add First Product
            </Link>
          </div>
        ) : (
          <div className="recent-products-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Visibility</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="table-product-cell">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="table-thumbnail"
                        />
                        <div>
                          <strong className="table-prod-name">{p.name}</strong>
                          <span className="table-prod-sub">{p.subCategory || "General"}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-gold">{p.category}</span>
                    </td>
                    <td>
                      {p.price ? (
                        <span className="price-tag">₹{Number(p.price).toLocaleString("en-IN")}</span>
                      ) : (
                        <span className="enquire-tag">Enquire for Price</span>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleToggle(p)}
                        className={`visibility-toggle-btn ${
                          p.isActive !== false ? "is-visible" : "is-hidden"
                        }`}
                        title="Click to toggle visibility on public website"
                      >
                        {p.isActive !== false ? (
                          <>
                            <Eye size={13} />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <EyeOff size={13} />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td>
                      <Link
                        to={`/admin/products/edit/${p.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
