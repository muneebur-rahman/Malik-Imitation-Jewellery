import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Phone,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Tag,
  Share2,
  Sparkles,
  ShieldCheck,
  Store,
  ChevronRight,
} from "lucide-react";
import { productService } from "../services/productService";
import { BUSINESS_CONFIG } from "../config/business";
import { ProductCard } from "../components/product/ProductCard";
import "./ProductDetails.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    window.scrollTo(0, 0);

    const loadProduct = async () => {
      setLoading(true);
      try {
        const { data, error } = await productService.getProductById(id);
        if (!isMounted) return;

        if (error || !data) {
          setProduct(null);
        } else {
          setProduct(data);

          // Update page title dynamically for SEO
          document.title = `${data.name} | Malik Imitation Jewellery Kamptee`;

          // Fetch related items from same category
          const { data: allCat } = await productService.getProducts({
            category: data.category,
            limit: 4,
            activeOnly: true,
          });

          if (isMounted && allCat) {
            setRelatedProducts(allCat.filter((p) => p.id !== data.id).slice(0, 3));
          }
        }
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: `Check out ${product?.name} from Malik Imitation Jewellery, Kamptee`,
          url: window.location.href,
        });
      } catch (e) {
        // Ignored
      }
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="container product-loading-view">
        <div className="product-skeleton-details">
          <div className="skeleton-img-box"></div>
          <div className="skeleton-info-box">
            <div className="skeleton-line sm"></div>
            <div className="skeleton-line lg"></div>
            <div className="skeleton-line md"></div>
            <div className="skeleton-line xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container product-not-found-view">
        <div className="empty-crest">
          <Sparkles size={32} className="text-gold" />
        </div>
        <h2>Product Not Found</h2>
        <p>The product you are looking for might be out of catalog or renamed.</p>
        <Link to="/jewellery" className="btn btn-primary mt-4">
          <ArrowLeft size={16} />
          <span>Browse Jewellery Catalog</span>
        </Link>
      </div>
    );
  }

  const whatsappUrl = BUSINESS_CONFIG.getWhatsAppProductUrl(
    product.name,
    product.category,
    product.price
  );

  const categoryRoute = `/${product.category?.toLowerCase() || "jewellery"}`;

  return (
    <div className="product-details-page">
      {/* Breadcrumb */}
      <div className="container breadcrumb-container">
        <nav className="catalog-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to={categoryRoute}>{product.category}</Link>
          <ChevronRight size={14} />
          <span>{product.name}</span>
        </nav>
      </div>

      <div className="container">
        <div className="product-detail-layout">
          {/* Left Column: Image Preview */}
          <div className="product-gallery-col">
            <div className="product-main-image-wrap">
              <img
                src={imgError ? FALLBACK_IMAGE : product.imageUrl || FALLBACK_IMAGE}
                alt={product.name}
                onError={() => setImgError(true)}
                className="product-main-image"
              />
              <span className="product-badge-category">{product.category}</span>
            </div>

            {/* Quality Reassurance Strip */}
            <div className="reassurance-strip">
              <div className="reassurance-item">
                <Store size={16} className="text-gold" />
                <span>Available at Kamptee Store</span>
              </div>
              <div className="reassurance-item">
                <ShieldCheck size={16} className="text-gold" />
                <span>Skin Friendly Micro-Plating</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Meta & WhatsApp CTA */}
          <div className="product-info-col">
            <div className="product-header-group">
              <div className="meta-top-row">
                <span className="product-subcat-label">
                  {product.subCategory || product.category}
                </span>

                <span
                  className={`product-stock-tag ${
                    product.inStock ? "tag-in-stock" : "tag-out-of-stock"
                  }`}
                >
                  {product.inStock ? (
                    <>
                      <CheckCircle2 size={13} />
                      In Stock & Ready
                    </>
                  ) : (
                    <>
                      <AlertCircle size={13} />
                      Available on Order
                    </>
                  )}
                </span>
              </div>

              <h1 className="product-main-title">{product.name}</h1>

              {/* Price display */}
              <div className="product-price-section">
                {product.price ? (
                  <div className="detail-price-box">
                    <span className="detail-currency">₹</span>
                    <span className="detail-amount">
                      {Number(product.price).toLocaleString("en-IN")}
                    </span>
                    <span className="detail-tax-note">(Inclusive of all taxes)</span>
                  </div>
                ) : (
                  <div className="detail-price-enquire">
                    <Tag size={16} className="text-gold" />
                    <span>Enquire for Price on WhatsApp</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="product-description-block">
              <h3 className="section-label">Product Details & Craftsmanship</h3>
              <p className="description-text">{product.description}</p>
            </div>

            {/* Important ordering notice */}
            <div className="whatsapp-notice-card">
              <div className="notice-icon">
                <MessageCircle size={20} className="text-whatsapp" />
              </div>
              <div className="notice-text">
                <strong>WhatsApp Order System</strong>
                <p>
                  Clicking the button below directly connects you with Malik Imitation
                  Jewellery (+91 86687 03440). We will confirm current availability and
                  assist you right away.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-primary-actions">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg order-cta-btn"
                id="whatsapp-order-btn"
              >
                <MessageCircle size={22} />
                <span>Order / Enquire on WhatsApp</span>
              </a>

              <div className="secondary-action-row">
                <a
                  href="tel:+918668703440"
                  className="btn btn-secondary call-cta-btn"
                  title="Call shop directly"
                >
                  <Phone size={17} />
                  <span>Call Store</span>
                </a>

                <button
                  type="button"
                  onClick={handleShare}
                  className="btn btn-secondary share-btn"
                  title="Share product"
                >
                  <Share2 size={17} />
                  <span>{copied ? "Link Copied!" : "Share"}</span>
                </button>
              </div>
            </div>

            {/* Store Information Card */}
            <div className="store-pickup-card">
              <p className="pickup-title">
                <strong>Store Location:</strong> Gujri Bazar, Near Jama Masjid, Kamptee
              </p>
              <p className="pickup-subtitle">
                Visit our physical store to try this piece or pick it up directly!
              </p>
              <a
                href={BUSINESS_CONFIG.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pickup-map-link"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <div className="section-header text-center">
              <span className="eyebrow">You May Also Love</span>
              <h2 className="section-title">Similar Handpicked Designs</h2>
              <div className="gold-divider"></div>
            </div>

            <div className="products-grid-container mt-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
