import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Store,
  HeartHandshake,
  Clock,
  Phone,
  MapPin,
  Navigation,
} from "lucide-react";
import { InstagramIcon } from "../components/common/InstagramIcon";
import { BUSINESS_CONFIG } from "../config/business";
import { productService } from "../services/productService";
import { CategoryCard } from "../components/common/CategoryCard";
import { ProductCard } from "../components/product/ProductCard";
import "./Home.css";

export const Home = () => {
  const [featuredJewels, setFeaturedJewels] = useState([]);
  const [featuredCosmetics, setFeaturedCosmetics] = useState([]);
  const [featuredBags, setFeaturedBags] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchHomeData = async () => {
      try {
        const { data: allProducts } = await productService.getProducts({
          activeOnly: true,
        });

        if (!isMounted) return;

        if (allProducts && allProducts.length > 0) {
          // Filter by categories
          setFeaturedJewels(
            allProducts
              .filter((p) => p.category?.toLowerCase() === "jewellery")
              .slice(0, 4)
          );
          setFeaturedCosmetics(
            allProducts
              .filter((p) => p.category?.toLowerCase() === "cosmetics")
              .slice(0, 3)
          );
          setFeaturedBags(
            allProducts
              .filter((p) => p.category?.toLowerCase() === "bags")
              .slice(0, 3)
          );
          // Latest items
          setLatestProducts(allProducts.slice(0, 4));
        }
      } catch (e) {
        console.error("Error loading home products", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchHomeData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section" aria-label="Welcome Hero">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="eyebrow">
              <Sparkles size={14} className="text-gold" />
              Kamptee’s Trusted Boutique • Gujri Bazar
            </span>

            <h1 className="hero-title">
              Elegance for Every <span className="title-accent">Occasion</span>
            </h1>

            <p className="hero-description">
              Discover imitation jewellery, cosmetics and bags curated for
              every style and occasion. Handcrafted bridal sets, trendsetting
              daily wear, and beauty essentials right in Kamptee.
            </p>

            <div className="hero-actions">
              <Link to="/jewellery" className="btn btn-primary btn-lg">
                <span>Explore Collection</span>
                <ArrowRight size={18} />
              </Link>

              <a
                href={BUSINESS_CONFIG.getWhatsAppGeneralUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageCircle size={19} />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            <div className="hero-features-strip">
              <div className="feature-pill">
                <Store size={15} className="text-gold" />
                <span>Visit Store in Gujri Bazar</span>
              </div>
              <div className="feature-pill">
                <HeartHandshake size={15} className="text-gold" />
                <span>Instant WhatsApp Enquiry</span>
              </div>
              <div className="feature-pill">
                <ShieldCheck size={15} className="text-gold" />
                <span>Quality Tested Products</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-frame">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
                alt="Malik Imitation Jewellery Bridal Choker Set"
                className="hero-main-img"
              />
              <div className="hero-card-floating-badge">
                <Sparkles size={16} className="badge-sparkle" />
                <div>
                  <span className="floating-badge-title">Handpicked Collections</span>
                  <span className="floating-badge-subtitle">Bridal • Festive • Casual</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY */}
      <section className="section-padded categories-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="eyebrow">Our Signature Lines</span>
            <h2 className="section-title">Shop by Category</h2>
            <div className="gold-divider"></div>
            <p className="section-subtitle">
              Browse our three dedicated departments designed to fulfill your
              every festive, wedding, and daily beauty desire.
            </p>
          </div>

          <div className="category-grid">
            {BUSINESS_CONFIG.categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED JEWELLERY */}
      <section className="section-padded featured-section bg-cream-base">
        <div className="container">
          <div className="section-header-split">
            <div>
              <span className="eyebrow">Royal Radiance</span>
              <h2 className="section-title">Featured Imitation Jewellery</h2>
              <p className="section-subtitle">
                Bridal chokers, temple jhumkas, and American Diamond bangles crafted to perfection.
              </p>
            </div>
            <Link to="/jewellery" className="btn btn-secondary">
              <span>View All Jewellery</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="products-grid-container mt-8">
            {featuredJewels.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. COSMETICS SHOWCASE */}
      <section className="section-padded cosmetics-section">
        <div className="container">
          <div className="section-header-split">
            <div>
              <span className="eyebrow">Beauty & Glow</span>
              <h2 className="section-title">Premium Cosmetics</h2>
              <p className="section-subtitle">
                Long-lasting lip shades, eyeshadow palettes, and makeup essentials for bridal & daily glow.
              </p>
            </div>
            <Link to="/cosmetics" className="btn btn-secondary">
              <span>View All Cosmetics</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="products-grid-container mt-8">
            {featuredCosmetics.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. BAGS SHOWCASE */}
      <section className="section-padded bags-section bg-cream-base">
        <div className="container">
          <div className="section-header-split">
            <div>
              <span className="eyebrow">Handbags & Clutches</span>
              <h2 className="section-title">Designer Bags & Potlis</h2>
              <p className="section-subtitle">
                Zari embroidered bridal potlis, hard-case evening clutches, and trendy sling bags.
              </p>
            </div>
            <Link to="/bags" className="btn btn-secondary">
              <span>View All Bags</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="products-grid-container mt-8">
            {featuredBags.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section className="section-padded why-us-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="eyebrow">The Malik Guarantee</span>
            <h2 className="section-title">Why Choose Malik Imitation Jewellery</h2>
            <div className="gold-divider"></div>
          </div>

          <div className="why-us-grid">
            <div className="why-card">
              <div className="why-icon-box">
                <Sparkles size={24} className="text-gold" />
              </div>
              <h3 className="why-card-title">Handpicked Trending Designs</h3>
              <p className="why-card-desc">
                From regal Kundan bridal sets to minimalist rose gold chains,
                every item is curated according to current wedding and festive fashion trends.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon-box">
                <Store size={24} className="text-gold" />
              </div>
              <h3 className="why-card-title">Trusted Local Kamptee Store</h3>
              <p className="why-card-desc">
                Conveniently located at Gujri Bazar, Near Jama Masjid, Kamptee.
                Visit in person to feel the finish, try on jewellery, and shop with confidence.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon-box">
                <MessageCircle size={24} className="text-gold" />
              </div>
              <h3 className="why-card-title">Instant WhatsApp Orders</h3>
              <p className="why-card-desc">
                No complicated checkout forms or accounts. Send us a direct message on
                WhatsApp to confirm availability, request live photos, or place an order.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon-box">
                <ShieldCheck size={24} className="text-gold" />
              </div>
              <h3 className="why-card-title">Authentic Value & Quality</h3>
              <p className="why-card-desc">
                Premium micro-plating, skin-safe finishes, and durable craftsmanship
                that look like real gold without the steep diamond price tag.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LATEST PRODUCTS */}
      <section className="section-padded latest-section bg-cream-base">
        <div className="container">
          <div className="section-header text-center">
            <span className="eyebrow">Fresh in Stock</span>
            <h2 className="section-title">Latest Arrivals</h2>
            <div className="gold-divider"></div>
            <p className="section-subtitle">
              Fresh additions across Jewellery, Cosmetics, and Bags just added to our catalog.
            </p>
          </div>

          <div className="products-grid-container mt-8">
            {latestProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. INSTAGRAM / SOCIAL SECTION */}
      <section className="section-padded instagram-showcase-section">
        <div className="container">
          <div className="instagram-card">
            <div className="instagram-content">
              <div className="insta-badge">
                <InstagramIcon size={18} />
                <span>Follow @malik_immitation_s7</span>
              </div>
              <h2 className="insta-title">Connect With Us On Instagram</h2>
              <p className="insta-desc">
                Follow our official page for daily unboxing reels, bride styling inspirations,
                festival discounts, and new arrivals before they hit the shelves!
              </p>
              <a
                href={BUSINESS_CONFIG.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-lg"
              >
                <InstagramIcon size={19} />
                <span>Visit Our Instagram Profile</span>
              </a>
            </div>
            <div className="instagram-banner-image">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
                alt="Malik Imitation Jewellery Instagram Feed Preview"
                className="insta-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. VISIT OUR STORE */}
      <section className="section-padded visit-section bg-cream-base" id="visit">
        <div className="container">
          <div className="visit-grid">
            <div className="visit-info">
              <span className="eyebrow">Local Presence</span>
              <h2 className="section-title">Visit Our Store in Kamptee</h2>
              <p className="visit-text">
                We invite you to experience our collection in person. Try on jewellery,
                find matching cosmetics for your skin tone, and choose the perfect clutch
                for your wedding outfits.
              </p>

              <div className="store-meta-list">
                <div className="store-meta-item">
                  <MapPin size={22} className="text-gold meta-icon" />
                  <div>
                    <strong>Store Address:</strong>
                    <p>{BUSINESS_CONFIG.location.fullAddress}</p>
                    <p className="plus-code-tag">Plus Code: {BUSINESS_CONFIG.location.plusCode}</p>
                  </div>
                </div>

                <div className="store-meta-item">
                  <Phone size={22} className="text-gold meta-icon" />
                  <div>
                    <strong>Phone Numbers:</strong>
                    <div className="phone-tags">
                      {BUSINESS_CONFIG.phoneNumbers.map((p) => (
                        <a key={p.number} href={p.tel} className="call-pill">
                          {p.display} {p.isPrimary && "(Primary WhatsApp)"}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="store-meta-item">
                  <Clock size={22} className="text-gold meta-icon" />
                  <div>
                    <strong>Store Timings:</strong>
                    <p>
                      {BUSINESS_CONFIG.hours.days}: {BUSINESS_CONFIG.hours.timings}
                    </p>
                  </div>
                </div>
              </div>

              <div className="visit-buttons">
                <a
                  href={BUSINESS_CONFIG.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <Navigation size={18} />
                  <span>Get Directions on Google Maps</span>
                </a>

                <a
                  href="tel:+918668703440"
                  className="btn btn-secondary"
                >
                  <Phone size={18} />
                  <span>Call Store</span>
                </a>
              </div>
            </div>

            <div className="visit-map-wrap">
              <iframe
                title="Malik Imitation Jewellery Kamptee Location"
                src={BUSINESS_CONFIG.location.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "360px", borderRadius: "16px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 10. WHATSAPP CTA BANNER */}
      <section className="section-padded whatsapp-banner-section">
        <div className="container">
          <div className="whatsapp-banner-card">
            <div className="banner-icon-crest">
              <MessageCircle size={32} />
            </div>
            <h2 className="banner-title">
              Have a Specific Jewellery Design in Mind?
            </h2>
            <p className="banner-desc">
              Send us a screenshot or photo on WhatsApp! Our shop team in Kamptee will
              promptly check our store stock, share close-up video clips, and assist with your order.
            </p>
            <div className="banner-actions">
              <a
                href={BUSINESS_CONFIG.getWhatsAppGeneralUrl(
                  "Hi Malik Imitation Jewellery, I have a photo of a jewellery/cosmetics design I am looking for. Can you check availability?"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageCircle size={20} />
                <span>Chat on WhatsApp (+91 86687 03440)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
