import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Search,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { productService } from "../../services/productService";
import "./AdminProducts.css";

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadProducts = async () => {
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
    loadProducts();
  }, []);

  const handleToggleActive = async (p) => {
    const nextStatus = !p.isActive;
    await productService.toggleProductActive(p.id, nextStatus);
    setProducts((prev) =>
      prev.map((item) => (item.id === p.id ? { ...item, isActive: nextStatus } : item))
    );
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    setDeleting(true);
    try {
      await productService.deleteProduct(productToDelete.id);
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setProductToDelete(null);
    } catch (e) {
      console.error("Delete failed", e);
    } finally {
      setDeleting(false);
    }
  };

  const filtered = products.filter((p) => {
    const matchesCat =
      categoryFilter === "All" ||
      p.category?.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch =
      !searchTerm.trim() ||
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <AdminLayout
      title="Product Catalog Management"
      subtitle="View, edit, toggle visibility, and delete products from your storefront"
    >
      {/* Action Bar */}
      <div className="admin-actions-bar">
        <div className="action-bar-left">
          <div className="search-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search products by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input search-input-field"
            />
          </div>

          <div className="cat-filter-pills">
            {["All", "Jewellery", "Cosmetics", "Bags"].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`cat-pill ${categoryFilter === cat ? "active" : ""}`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <Link to="/admin/products/new" className="btn btn-primary add-product-cta">
          <PlusCircle size={18} />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Main List */}
      {loading ? (
        <div className="loading-state-card">
          <p>Loading catalog items...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty-catalog">
          <Sparkles size={32} className="text-gold" />
          <h3>No products match your criteria</h3>
          <p>Try clearing your search query or add a new product.</p>
          <button
            type="button"
            className="btn btn-secondary btn-sm mt-3"
            onClick={() => {
              setSearchTerm("");
              setCategoryFilter("All");
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="admin-products-container">
          {/* Desktop Table View */}
          <div className="admin-desktop-table-card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Store Visibility</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
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
                          <span className="table-prod-sub">
                            {p.subCategory || "General"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-gold">{p.category}</span>
                    </td>
                    <td>
                      {p.price ? (
                        <strong className="price-tag">
                          ₹{Number(p.price).toLocaleString("en-IN")}
                        </strong>
                      ) : (
                        <span className="enquire-tag">Enquire for Price</span>
                      )}
                    </td>
                    <td>
                      <span
                        className={`stock-indicator-pill ${
                          p.inStock ? "in-stock" : "out-of-stock"
                        }`}
                      >
                        {p.inStock ? "In Stock" : "On Order"}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleToggleActive(p)}
                        className={`visibility-toggle-btn ${
                          p.isActive !== false ? "is-visible" : "is-hidden"
                        }`}
                        title="Click to toggle visibility on public website"
                      >
                        {p.isActive !== false ? (
                          <>
                            <Eye size={13} />
                            <span>Active (Visible)</span>
                          </>
                        ) : (
                          <>
                            <EyeOff size={13} />
                            <span>Hidden (Draft)</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td>
                      <div className="row-action-buttons">
                        <Link
                          to={`/product/${p.id}`}
                          target="_blank"
                          className="action-icon-btn view-btn"
                          title="View on public website"
                        >
                          <ExternalLink size={15} />
                        </Link>
                        <Link
                          to={`/admin/products/edit/${p.id}`}
                          className="action-icon-btn edit-btn"
                          title="Edit Product"
                        >
                          <Edit size={15} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setProductToDelete(p)}
                          className="action-icon-btn delete-btn"
                          title="Delete Product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (optimized for Android touch) */}
          <div className="admin-mobile-cards-list">
            {filtered.map((p) => (
              <div key={p.id} className="mobile-product-card">
                <div className="mobile-card-top">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="mobile-card-thumb"
                  />
                  <div className="mobile-card-meta">
                    <span className="mobile-card-category">{p.category}</span>
                    <h4 className="mobile-card-title">{p.name}</h4>
                    <div className="mobile-price-row">
                      {p.price ? (
                        <strong className="mobile-price">
                          ₹{Number(p.price).toLocaleString("en-IN")}
                        </strong>
                      ) : (
                        <span className="mobile-enquire">Enquire for Price</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mobile-card-controls">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(p)}
                    className={`visibility-toggle-btn ${
                      p.isActive !== false ? "is-visible" : "is-hidden"
                    }`}
                  >
                    {p.isActive !== false ? (
                      <>
                        <Eye size={13} />
                        <span>Visible in Store</span>
                      </>
                    ) : (
                      <>
                        <EyeOff size={13} />
                        <span>Hidden</span>
                      </>
                    )}
                  </button>

                  <div className="mobile-action-group">
                    <Link
                      to={`/product/${p.id}`}
                      target="_blank"
                      className="btn btn-secondary btn-sm"
                    >
                      <ExternalLink size={14} />
                    </Link>
                    <Link
                      to={`/admin/products/edit/${p.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setProductToDelete(p)}
                      className="btn btn-secondary btn-sm delete-btn"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="admin-modal-backdrop" onClick={() => setProductToDelete(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon-badge danger">
                <Trash2 size={22} className="text-danger" />
              </div>
              <div>
                <h3 className="modal-title">Delete Product</h3>
                <p className="modal-subtitle">Confirm removal from catalog</p>
              </div>
            </div>

            <div className="modal-body">
              <p>
                Are you sure you want to permanently remove{" "}
                <strong>"{productToDelete.name}"</strong>?
              </p>
              <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>
                This action cannot be undone. Customers will no longer be able to view
                or order this product on WhatsApp.
              </p>
            </div>

            <div className="modal-footer" style={{ gap: "0.75rem" }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setProductToDelete(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                style={{ backgroundColor: "#DC2626", borderColor: "#DC2626" }}
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
