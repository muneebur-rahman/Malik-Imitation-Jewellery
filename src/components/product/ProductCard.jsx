import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Eye, Tag, CheckCircle2, AlertCircle } from "lucide-react";
import { BUSINESS_CONFIG } from "../../config/business";
import "./ProductCard.css";

// Reliable fallback placeholder image
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80";

export const ProductCard = ({ product }) => {
  const [imgSrc, setImgSrc] = useState(product?.imageUrl || FALLBACK_IMAGE);
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      setImgSrc(FALLBACK_IMAGE);
    }
  };

  const whatsappUrl = BUSINESS_CONFIG.getWhatsAppProductUrl(
    product.name,
    product.category,
    product.price
  );

  return (
    <div className="product-card">
      {/* Image Container with Badges */}
      <div className="product-image-wrap">
        <Link to={`/product/${product.id}`} className="product-image-link" tabIndex={-1}>
          <img
            src={imgSrc}
            alt={product.name}
            onError={handleImageError}
            loading="lazy"
            className="product-image"
          />
        </Link>

        {/* Category Pill */}
        <span className="product-category-badge">
          {product.category}
        </span>

        {/* Stock Status */}
        <span
          className={`product-stock-badge ${
            product.inStock ? "stock-in" : "stock-out"
          }`}
        >
          {product.inStock ? (
            <>
              <CheckCircle2 size={11} />
              In Stock
            </>
          ) : (
            <>
              <AlertCircle size={11} />
              Made to Order
            </>
          )}
        </span>
      </div>

      {/* Content */}
      <div className="product-content">
        <div className="product-subcat">
          {product.subCategory || product.category}
        </div>

        <h3 className="product-title">
          <Link to={`/product/${product.id}`} title={product.name}>
            {product.name}
          </Link>
        </h3>

        {/* Price Area */}
        <div className="product-price-row">
          {product.price ? (
            <div className="product-price">
              <span className="price-currency">₹</span>
              <span className="price-amount">
                {Number(product.price).toLocaleString("en-IN")}
              </span>
            </div>
          ) : (
            <div className="product-price-enquire">
              <Tag size={13} className="text-gold" />
              <span>Enquire for Price</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="product-actions">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm product-whatsapp-btn"
            title={`Order ${product.name} on WhatsApp`}
          >
            <MessageCircle size={15} />
            <span>Order on WhatsApp</span>
          </a>

          <Link
            to={`/product/${product.id}`}
            className="btn btn-secondary btn-sm product-details-btn"
            title="View Details"
          >
            <Eye size={15} />
            <span>Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
