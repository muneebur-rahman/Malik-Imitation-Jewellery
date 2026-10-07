import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  MapPin,
  MessageCircle,
  Phone,
  Heart,
  ShieldCheck,
  Store,
  ArrowRight,
  Eye,
} from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";
import "./About.css";

export const About = () => {
  return (
    <div className="about-page">
      {/* Hero Header */}
      <section className="about-hero-section">
        <div className="container">
          <div className="about-hero-content text-center">
            <span className="eyebrow">
              <Sparkles size={14} className="text-gold" />
              Our Story & Passion
            </span>
            <h1 className="about-hero-title">About Malik Imitation Jewellery</h1>
            <div className="gold-divider"></div>
            <p className="about-hero-subtitle">
              Serving our community in Kamptee with elegance, authentic warmth,
              and carefully curated jewellery, cosmetics, and bags for every special moment.
            </p>
          </div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="section-padded">
        <div className="container">
          <div className="about-story-grid">
            <div className="story-visual-wrap">
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
                alt="Jewellery display at Malik Imitation Jewellery Kamptee"
                className="story-main-img"
              />
              <div className="story-badge-card">
                <Store size={22} className="text-gold" />
                <div>
                  <strong>Local Presence in Kamptee</strong>
                  <span>Gujri Bazar, Near Jama Masjid</span>
                </div>
              </div>
            </div>

            <div className="story-text-content">
              <span className="eyebrow">Local Commitment</span>
              <h2 className="section-title">Bringing High-End Elegance Within Reach</h2>
              <p className="story-p">
                At <strong>Malik Imitation Jewellery</strong>, we believe every woman
                deserves to look and feel regal without the immense expense and stress
                of pure gold. Located in the heart of Kamptee at Gujri Bazar, our boutique
                has become a trusted neighborhood destination for brides, families, and
                everyday jewellery enthusiasts.
              </p>
              <p className="story-p">
                We take personal pride in sourcing contemporary and traditional designs:
                majestic bridal Kundan choker sets, antique South Indian temple jewellery,
                sparkling American Diamond bangles, lightweight daily wear chains, alongside
                authentic cosmetics and designer party clutches.
              </p>

              <div className="core-pillars-list">
                <div className="pillar-item">
                  <div className="pillar-icon">
                    <Heart size={20} className="text-gold" />
                  </div>
                  <div>
                    <h4>Personalized Customer Care</h4>
                    <p>
                      We treat every visitor like family. Whether you are matching a
                      necklace to your wedding lehenga or picking a lipstick shade, we
                      guide you with genuine care.
                    </p>
                  </div>
                </div>

                <div className="pillar-item">
                  <div className="pillar-icon">
                    <ShieldCheck size={20} className="text-gold" />
                  </div>
                  <div>
                    <h4>Quality You Can Trust</h4>
                    <p>
                      Each piece in our catalog is inspected for sturdy clasp locks,
                      consistent plating finish, and skin-friendly metals suitable for
                      extended celebration wear.
                    </p>
                  </div>
                </div>

                <div className="pillar-item">
                  <div className="pillar-icon">
                    <MessageCircle size={20} className="text-gold" />
                  </div>
                  <div>
                    <h4>Modern WhatsApp Convenience</h4>
                    <p>
                      Browse our catalog online anytime. If you see something you adore,
                      a single click opens a WhatsApp chat where we can send videos, confirm
                      pricing, and hold items for you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Categories Section */}
      <section className="section-padded bg-cream-base">
        <div className="container">
          <div className="section-header text-center">
            <span className="eyebrow">What We Offer</span>
            <h2 className="section-title">Curated For Every Style</h2>
            <div className="gold-divider"></div>
          </div>

          <div className="about-departments-grid">
            <div className="dept-card">
              <h3 className="dept-title">1. Imitation Jewellery</h3>
              <p className="dept-desc">
                Bridal choker sets, Kundan necklaces, matte finish temple jhumkas,
                chandbalis, American diamond bangles, and delicate daily chains crafted
                with lasting micro-plating.
              </p>
              <Link to="/jewellery" className="dept-link">
                <span>View Jewellery Collection</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="dept-card">
              <h3 className="dept-title">2. Cosmetics & Beauty</h3>
              <p className="dept-desc">
                HD liquid foundations, transfer-resistant matte lipsticks, 18-shade
                pigmented eyeshadow palettes, kajal, setting powders, and complete bridal
                makeup vanity kits.
              </p>
              <Link to="/cosmetics" className="dept-link">
                <span>View Cosmetics Collection</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="dept-card">
              <h3 className="dept-title">3. Bags & Clutches</h3>
              <p className="dept-desc">
                Intricately embroidered Zari bridal potlis, crystal-studded evening
                hard-case clutches, casual chic sling bags, and spacious daily handbags.
              </p>
              <Link to="/bags" className="dept-link">
                <span>View Bags Collection</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Store CTA */}
      <section className="section-padded">
        <div className="container">
          <div className="about-store-cta-card">
            <div className="cta-left">
              <span className="eyebrow text-gold">Visit Us In Person</span>
              <h2 className="cta-heading">Experience The Collection At Our Shop</h2>
              <p className="cta-address">
                <strong>Address:</strong> 659V+4WH, Gujri Bazar, Near Jama Masjid, Kamptee, Maharashtra 441001
              </p>
              <p className="cta-timings">
                <strong>Open 7 Days:</strong> Monday to Sunday (10:30 AM – 10:00 PM)
              </p>
              <div className="cta-buttons-row">
                <a
                  href={BUSINESS_CONFIG.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                >
                  <MapPin size={17} />
                  <span>Get Directions on Google Maps</span>
                </a>
                <a
                  href={BUSINESS_CONFIG.getWhatsAppGeneralUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageCircle size={17} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
