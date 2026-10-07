import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  MessageCircle,
  Navigation,
  Clock,
  Lock,
  Sparkles,
} from "lucide-react";
import { InstagramIcon } from "./InstagramIcon";
import { BUSINESS_CONFIG } from "../../config/business";
import "./Footer.css";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        {/* Top Brand & Highlight Row */}
        <div className="footer-grid">
          {/* Col 1: Business Identity */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <div className="footer-crest">
                <Sparkles size={18} className="text-gold" />
              </div>
              <div>
                <h3 className="footer-brand-title">MALIK</h3>
                <span className="footer-brand-subtitle">
                  IMITATION JEWELLERY
                </span>
              </div>
            </div>

            <p className="footer-tagline-text">
              Jewellery • Cosmetics • Bags
            </p>
            <p className="footer-desc">
              Your premier destination in Kamptee for exquisite bridal sets,
              imitation jewellery, authentic beauty cosmetics, and elegant party
              bags.
            </p>

            <div className="footer-social-links">
              <a
                href={BUSINESS_CONFIG.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn instagram-btn"
                title="Follow us on Instagram"
              >
                <InstagramIcon size={18} />
                <span>Instagram</span>
              </a>
              <a
                href={BUSINESS_CONFIG.whatsapp.baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn whatsapp-btn"
                title="Chat on WhatsApp"
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col links-col">
            <h4 className="footer-heading">Explore Collections</h4>
            <ul className="footer-link-list">
              <li>
                <Link to="/jewellery">Imitation Jewellery</Link>
              </li>
              <li>
                <Link to="/cosmetics">Cosmetics & Beauty</Link>
              </li>
              <li>
                <Link to="/bags">Bags & Clutches</Link>
              </li>
              <li>
                <Link to="/about">About Our Store</Link>
              </li>
              <li>
                <Link to="/contact">Contact & Location</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Phone Numbers */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Call & Enquire</h4>
            <p className="footer-subtext">Direct assistance for custom bridal orders & availability:</p>
            <ul className="footer-contact-list">
              {BUSINESS_CONFIG.phoneNumbers.map((p) => (
                <li key={p.number}>
                  <a href={p.tel} className="footer-contact-item">
                    <Phone size={14} className="text-gold" />
                    <span>{p.display}</span>
                    {p.isPrimary && <span className="primary-tag">Primary</span>}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={BUSINESS_CONFIG.whatsapp.baseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-item whatsapp-contact-item"
                >
                  <MessageCircle size={14} className="text-whatsapp" />
                  <span>WhatsApp: {BUSINESS_CONFIG.whatsapp.display}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Location & Timings */}
          <div className="footer-col location-col">
            <h4 className="footer-heading">Visit Our Store</h4>
            <div className="footer-address-block">
              <MapPin size={18} className="text-gold location-icon" />
              <div>
                <strong className="address-strong">{BUSINESS_CONFIG.name}</strong>
                <p className="address-text">{BUSINESS_CONFIG.location.street}</p>
                <p className="address-text">
                  {BUSINESS_CONFIG.location.city}, {BUSINESS_CONFIG.location.state}{" "}
                  {BUSINESS_CONFIG.location.postalCode}
                </p>
                <p className="plus-code">Plus Code: {BUSINESS_CONFIG.location.plusCode}</p>
              </div>
            </div>

            <div className="footer-hours-block">
              <Clock size={16} className="text-gold" />
              <span>
                {BUSINESS_CONFIG.hours.days}: {BUSINESS_CONFIG.hours.timings}
              </span>
            </div>

            <a
              href={BUSINESS_CONFIG.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-sm get-directions-btn"
            >
              <Navigation size={14} />
              <span>Get Directions (Google Maps)</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Portal */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {currentYear} {BUSINESS_CONFIG.name}. All rights reserved. Kamptee, Maharashtra.
          </p>

          <div className="footer-bottom-links">
            <Link to="/about" className="bottom-link">About Us</Link>
            <span className="bottom-sep">•</span>
            <Link to="/contact" className="bottom-link">Contact</Link>
            <span className="bottom-sep">•</span>
            <Link to="/admin/login" className="bottom-link admin-link" title="Shop Owner Management Portal">
              <Lock size={12} />
              <span>Owner Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
