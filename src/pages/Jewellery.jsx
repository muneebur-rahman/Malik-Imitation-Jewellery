import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Sparkles, ChevronRight } from "lucide-react";
import { productService } from "../services/productService";
import { ProductGrid } from "../components/product/ProductGrid";
import { BUSINESS_CONFIG } from "../config/business";
import "./CatalogPage.css";

export const Jewellery = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubcategory, setActiveSubcategory] = useState("All");

  const subcategories = ["All", "Necklace Sets", "Earrings", "Bangles", "Daily Wear"];

  useEffect(() => {
    let isMounted = true;
    const fetchJewellery = async () => {
      try {
        const { data } = await productService.getProducts({
          category: "Jewellery",
          activeOnly: true,
        });
        if (isMounted && data) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Error loading jewellery", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchJewellery();
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
            <span>Imitation Jewellery</span>
          </nav>

          <div className="catalog-hero-text">
            <span className="eyebrow">
              <Sparkles size={14} className="text-gold" />
              Kamptee’s Finest Collection
            </span>
            <h1 className="catalog-page-title">Imitation Jewellery Collection</h1>
            <p className="catalog-page-desc">
              Adorn yourself in timeless elegance. From majestic bridal Kundan
              sets and South Indian temple jhumkas to sparkling American Diamond
              bangles and lightweight daily wear chains.
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
              Looking for a matching bridal set or custom design?
            </h3>
            <p className="bottom-banner-desc">
              Send us a photo of your lehenga or saree on WhatsApp. We will curate
              the perfect jewellery sets to match your occasion!
            </p>
          </div>
          <a
            href={BUSINESS_CONFIG.getWhatsAppGeneralUrl(
              "Hi Malik Imitation Jewellery, I am looking for a specific jewellery design. Can I share a photo for recommendations?"
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
