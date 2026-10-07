import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Sparkles, ChevronRight } from "lucide-react";
import { productService } from "../services/productService";
import { ProductGrid } from "../components/product/ProductGrid";
import { BUSINESS_CONFIG } from "../config/business";
import "./CatalogPage.css";

export const Bags = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubcategory, setActiveSubcategory] = useState("All");

  const subcategories = ["All", "Clutches", "Potlis", "Sling Bags", "Totes"];

  useEffect(() => {
    let isMounted = true;
    const fetchBags = async () => {
      try {
        const { data } = await productService.getProducts({
          category: "Bags",
          activeOnly: true,
        });
        if (isMounted && data) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Error loading bags", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBags();
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
            <span>Bags & Clutches</span>
          </nav>

          <div className="catalog-hero-text">
            <span className="eyebrow">
              <Sparkles size={14} className="text-gold" />
              Party, Bridal & Everyday Style
            </span>
            <h1 className="catalog-page-title">Bags & Clutches Collection</h1>
            <p className="catalog-page-desc">
              Complete your look with our hand-embroidered raw silk potlis, metallic
              hard-case evening clutches, and contemporary quilted sling bags.
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
              Looking for a specific color clutch to match your outfit?
            </h3>
            <p className="bottom-banner-desc">
              Message us on WhatsApp! We can share videos showing interior compartments,
              phone fit, and chain lengths.
            </p>
          </div>
          <a
            href={BUSINESS_CONFIG.getWhatsAppGeneralUrl(
              "Hi Malik Imitation Jewellery, I am looking for a party clutch/bag. Can you share available colors?"
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
