import React, { useState } from "react";
import {
  MapPin,
  Phone,
  MessageCircle,
  Navigation,
  Clock,
  Send,
  Sparkles,
} from "lucide-react";
import { InstagramIcon } from "../components/common/InstagramIcon";
import { BUSINESS_CONFIG } from "../config/business";
import "./Contact.css";

export const Contact = () => {
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("Jewellery");
  const [message, setMessage] = useState("");

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const formattedMessage = `Hi Malik Imitation Jewellery!\n\nName: ${
      name || "Customer"
    }\nInterested In: ${interest}\n\nMessage: ${
      message || "I would like to enquire about your products and visit your store."
    }`;

    const url = `https://wa.me/918668703440?text=${encodeURIComponent(
      formattedMessage
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="contact-page">
      {/* Hero Header */}
      <section className="contact-hero-section">
        <div className="container text-center">
          <span className="eyebrow">
            <Sparkles size={14} className="text-gold" />
            Connect With Our Store
          </span>
          <h1 className="contact-hero-title">Contact & Visit Our Store</h1>
          <div className="gold-divider"></div>
          <p className="contact-hero-subtitle">
            We are always happy to welcome you at our Kamptee boutique or chat on
            WhatsApp for personal product recommendations.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section-padded">
        <div className="container">
          <div className="contact-main-grid">
            {/* Contact Details Column */}
            <div className="contact-info-col">
              <h2 className="section-title">Shop Information</h2>
              <p className="contact-intro">
                Reach out to us directly through phone, WhatsApp, or visit us in Gujri Bazar.
              </p>

              {/* Action Buttons Hub */}
              <div className="quick-action-strip">
                <a
                  href={BUSINESS_CONFIG.whatsapp.baseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp quick-action-btn"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp (8668703440)</span>
                </a>

                <a
                  href="tel:+918668703440"
                  className="btn btn-primary quick-action-btn"
                >
                  <Phone size={18} />
                  <span>Call Primary (+91 86687 03440)</span>
                </a>

                <a
                  href={BUSINESS_CONFIG.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold quick-action-btn"
                >
                  <Navigation size={18} />
                  <span>Get Directions</span>
                </a>

                <a
                  href={BUSINESS_CONFIG.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary quick-action-btn"
                >
                  <InstagramIcon size={18} />
                  <span>Instagram Profile</span>
                </a>
              </div>

              {/* Information Cards */}
              <div className="info-cards-stack">
                {/* Address Card */}
                <div className="contact-card">
                  <div className="contact-card-icon">
                    <MapPin size={22} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="card-heading">Store Address</h3>
                    <p className="card-bold-text">{BUSINESS_CONFIG.name}</p>
                    <p className="card-text">{BUSINESS_CONFIG.location.street}</p>
                    <p className="card-text">
                      {BUSINESS_CONFIG.location.city}, {BUSINESS_CONFIG.location.state}{" "}
                      {BUSINESS_CONFIG.location.postalCode}
                    </p>
                    <p className="card-code">
                      Plus Code: <strong>{BUSINESS_CONFIG.location.plusCode}</strong>
                    </p>
                  </div>
                </div>

                {/* Calling Numbers Card */}
                <div className="contact-card">
                  <div className="contact-card-icon">
                    <Phone size={22} className="text-gold" />
                  </div>
                  <div className="w-full">
                    <h3 className="card-heading">Phone Numbers (Call Us)</h3>
                    <div className="phone-links-grid">
                      {BUSINESS_CONFIG.phoneNumbers.map((phone) => (
                        <a
                          key={phone.number}
                          href={phone.tel}
                          className="phone-call-row"
                        >
                          <span className="phone-val">{phone.display}</span>
                          <span className="phone-badge">
                            {phone.isPrimary ? "Primary / WhatsApp" : "Call"}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timings */}
                <div className="contact-card">
                  <div className="contact-card-icon">
                    <Clock size={22} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="card-heading">Store Working Hours</h3>
                    <p className="card-bold-text">{BUSINESS_CONFIG.hours.days}</p>
                    <p className="card-text">{BUSINESS_CONFIG.hours.timings}</p>
                    <p className="card-text text-gold">Open all 7 days of the week</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive WhatsApp Composer Form */}
            <div className="contact-form-col">
              <div className="whatsapp-composer-box">
                <div className="composer-header">
                  <div className="composer-crest">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <h3 className="composer-title">Quick WhatsApp Enquiry</h3>
                    <p className="composer-sub">
                      Fill out this short form to instantly generate a pre-formatted message
                      on your WhatsApp.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleWhatsAppSubmit} className="composer-form">
                  <div className="form-group">
                    <label htmlFor="customer-name" className="form-label">
                      Your Name
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      className="form-input"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="product-category-interest" className="form-label">
                      What are you interested in?
                    </label>
                    <select
                      id="product-category-interest"
                      className="form-select"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                    >
                      <option value="Bridal Jewellery">Bridal Jewellery Sets</option>
                      <option value="Necklace & Chokers">Necklace & Chokers</option>
                      <option value="Earrings & Jhumkas">Earrings & Jhumkas</option>
                      <option value="Bangles & Kadas">Bangles & Kadas</option>
                      <option value="Cosmetics & Makeup">Cosmetics & Beauty Kits</option>
                      <option value="Bridal Bags & Clutches">Bridal Bags & Clutches</option>
                      <option value="General Store Enquiry">General Store Enquiry</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="customer-message" className="form-label">
                      Message / Enquiry Details
                    </label>
                    <textarea
                      id="customer-message"
                      rows={4}
                      className="form-textarea"
                      placeholder="e.g. Do you have golden choker sets under ₹3,000 in stock?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-whatsapp btn-full btn-lg composer-submit-btn"
                  >
                    <Send size={18} />
                    <span>Send via WhatsApp (+91 86687 03440)</span>
                  </button>

                  <p className="composer-footer-note">
                    * No online payment or card needed. This directly opens WhatsApp with
                    our shop owner in Kamptee.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Embed Section */}
      <section className="section-padded map-section bg-cream-base">
        <div className="container">
          <div className="section-header text-center">
            <span className="eyebrow">Interactive Location</span>
            <h2 className="section-title">Find Us on Google Maps</h2>
            <div className="gold-divider"></div>
            <p className="section-subtitle">
              Located in Gujri Bazar, Kamptee near Jama Masjid. Click below to open directions
              on your phone's GPS.
            </p>
          </div>

          <div className="map-frame-box">
            <iframe
              title="Malik Imitation Jewellery Kamptee Google Maps"
              src={BUSINESS_CONFIG.location.embedMapUrl}
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: "16px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="map-cta-row text-center mt-8">
            <a
              href={BUSINESS_CONFIG.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              <Navigation size={18} />
              <span>Open in Google Maps App (Get Directions)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
