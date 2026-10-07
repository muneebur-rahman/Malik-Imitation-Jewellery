import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, MessageCircle, Sparkles } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { BUSINESS_CONFIG } from "../../config/business";
import "./ProductGrid.css";

export const ProductGrid = ({
  products = [],
  loading = false,
  selectedCategory = "All",
  availableCategories = ["All", "Jewellery", "Cosmetics", "Bags"],
  onCategoryChange,
  showFilters = true,
  title,
  subtitle,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by category
    if (selectedCategory && selectedCategory !== "All") {
      list = list.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.subCategory?.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === "price-asc") {
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Newest first default
      list.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
    }

    return list;
  }, [products, selectedCategory, searchTerm, sortBy]);

  return (
    <div className="product-grid-section">
      {(title || subtitle) && (
        <div className="product-grid-header">
          {subtitle && <span className="eyebrow">{subtitle}</span>}
          {title && <h2 className="grid-title">{title}</h2>}
          <div className="gold-divider"></div>
        </div>
      )}

      {showFilters && (
        <div className="catalog-toolbar">
          {/* Category Tabs */}
          {availableCategories.length > 1 && (
            <div className="category-tabs" role="tablist">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  className={`category-tab-btn ${
                    selectedCategory === cat ? "active" : ""
                  }`}
                  onClick={() => onCategoryChange && onCategoryChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Search & Sort Controls */}
          <div className="search-sort-row">
            <div className="search-input-wrap">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search designs, earrings, lipsticks, bags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                aria-label="Search catalog"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchTerm("")}
                >
                  ×
                </button>
              )}
            </div>

            <div className="sort-wrap">
              <SlidersHorizontal size={15} className="sort-icon" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
                aria-label="Sort products"
              >
                <option value="newest">Latest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical (A - Z)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading ? (
        <div className="products-grid-container">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="product-skeleton-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-body">
                <div className="skeleton-line sm"></div>
                <div className="skeleton-line lg"></div>
                <div className="skeleton-line md"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        /* Products Grid */
        <div className="products-grid-container">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="product-empty-state">
          <div className="empty-crest">
            <Sparkles size={28} className="text-gold" />
          </div>
          <h3 className="empty-title">New arrivals are coming soon</h3>
          <p className="empty-desc">
            We are currently curating more designs for this selection. Feel free
            to message us on WhatsApp with pictures of the style you are looking for!
          </p>
          <a
            href={BUSINESS_CONFIG.getWhatsAppGeneralUrl(
              `Hi Malik Imitation Jewellery, I was browsing your catalog for ${
                selectedCategory !== "All" ? selectedCategory : "products"
              } and would like to enquire about available items.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <MessageCircle size={18} />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>
      )}
    </div>
  );
};
