import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MessageCircle, Menu, X, Phone, MapPin, Sparkles } from "lucide-react";
import { BUSINESS_CONFIG } from "../../config/business";
import "./Navbar.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Jewellery", path: "/jewellery" },
    { name: "Cosmetics", path: "/cosmetics" },
    { name: "Bags", path: "/bags" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="top-announcement-bar">
        <div className="container announcement-content">
          <div className="announcement-left">
            <span className="location-pill">
              <MapPin size={13} className="text-gold" />
              Gujri Bazar, Kamptee, Maharashtra
            </span>
          </div>
          <div className="announcement-right">
            <span className="phone-summary">
              <Phone size={13} className="text-gold" />
              Call:{" "}
              <a href="tel:+918668703440" className="phone-link">
                +91 86687 03440
              </a>
            </span>
            <span className="bar-separator">•</span>
            <span className="timing-summary">Open Today: 10:30 AM - 10:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
        <div className="container header-container">
          {/* Logo / Brand Name */}
          <Link to="/" className="brand-logo" aria-label="Malik Imitation Jewellery Home">
            <div className="brand-crest">
              <Sparkles size={20} className="crest-icon" />
            </div>
            <div className="brand-text">
              <span className="brand-title">MALIK</span>
              <span className="brand-subtitle">IMITATION JEWELLERY</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-list">
              {navLinks.map((item) => (
                <li key={item.path} className="nav-item">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "nav-link-active" : ""}`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Action: WhatsApp Order Button */}
          <div className="header-actions">
            <a
              href={BUSINESS_CONFIG.whatsapp.baseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp nav-whatsapp-btn"
              title="Order or enquire on WhatsApp"
            >
              <MessageCircle size={18} />
              <span>WhatsApp Order</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${isOpen ? "drawer-open" : ""}`}>
          <div className="drawer-inner">
            <div className="drawer-header">
              <div className="brand-text">
                <span className="brand-title">MALIK</span>
                <span className="brand-subtitle">IMITATION JEWELLERY • KAMPTEE</span>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <ul className="mobile-nav-list">
              {navLinks.map((item) => (
                <li key={item.path} className="mobile-nav-item">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `mobile-nav-link ${isActive ? "mobile-nav-active" : ""}`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="drawer-divider"></div>

            <div className="drawer-cta-section">
              <a
                href={BUSINESS_CONFIG.whatsapp.baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-full"
              >
                <MessageCircle size={20} />
                <span>Order on WhatsApp (8668703440)</span>
              </a>

              <div className="drawer-phone-links">
                <p className="drawer-label">Call Store Directly:</p>
                {BUSINESS_CONFIG.phoneNumbers.map((phone) => (
                  <a
                    key={phone.number}
                    href={phone.tel}
                    className="drawer-phone-item"
                  >
                    <Phone size={14} className="text-gold" />
                    <span>{phone.display}</span>
                    {phone.isPrimary && <span className="primary-pill">Primary</span>}
                  </a>
                ))}
              </div>

              <div className="drawer-location">
                <MapPin size={15} className="text-gold" />
                <span>659V+4WH, Gujri Bazar, Near Jama Masjid, Kamptee</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
