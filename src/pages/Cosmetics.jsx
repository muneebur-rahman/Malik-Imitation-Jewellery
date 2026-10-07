import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Sparkles, ChevronRight } from "lucide-react";
import { productService } from "../services/productService";
import { ProductGrid } from "../components/product/ProductGrid";
import { BUSINESS_CONFIG } from "../config/business";
import "./CatalogPage.css";

export const Cosmetics = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubcategory, setActiveSubcategory] = useState("All");

  const subcategories = ["All", "Lip Care", "Eye Makeup", "Face Makeup", "Beauty Kits"];

  useEffect(() => {
    let isMounted = true;
    const fetchCosmetics = async () => {
      try {
        const { data } = await productService.getProducts({
          category: "Cosmetics",
          activeOnly: true,
        });
        if (isMounted && data) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Error loading cosmetics", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCosmetics();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredItems = products.filter((item) => {
    if (activeSubcategory === "All") return true;
    return item.subCategory?.toLowerCase() === activeSubcategory.toLowerCase();
  });

  return (
    <div className="catalog-page">
      {/* Page Header */}
      <div className="catalog-hero-header">
        <div className="container">
          <nav className="catalog-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <span>Cosmetics & Beauty</span>
          </nav>

          <div className="catalog-hero-text">
            <span className="eyebrow">
              <Sparkles size={14} className="text-gold" />
              Glow for Every Celebration
            </span>
            <h1 className="catalog-page-title">Cosmetics & Beauty Catalog</h1>
            <p className="catalog-page-desc">
              Discover high-definition foundations, velvety long-stay matte lip colors,
              vibrant eyeshadow palettes, and bridal beauty essentials curated for
              every skin tone and glam look.
            </p>
          </div>
        </div>
      </div>

      {/* Catalog Content */}
      <div className="container catalog-body">
        <ProductGrid
          products={filteredItems}
          loading={loading}
          selectedCategory={activeSubcategory}
          availableCategories={subcategories}
          onCategoryChange={setActiveSubcategory}
          showFilters={true}
        />
      </div>

      {/* WhatsApp Assistance Banner */}
      <div className="container catalog-cta-container">
        <div className="catalog-bottom-banner">
          <div className="bottom-banner-content">
            <h3 className="bottom-banner-title">
              Need shade recommendations or bulk bridal makeup kits?
            </h3>
            <p className="bottom-banner-desc">
              Connect with our beauty experts directly on WhatsApp for personalized
              shade matching and bridal makeup kit combos.
            </p>
          </div>
          <a
            href={BUSINESS_CONFIG.getWhatsAppGeneralUrl(
              "Hi Malik Imitation Jewellery, I would like to enquire about cosmetics shades and bridal beauty kits."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-lg"
          >
            <MessageCircle size={20} />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
