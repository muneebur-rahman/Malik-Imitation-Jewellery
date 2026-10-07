/**
 * Central Business Configuration for Malik Imitation Jewellery
 * All phone numbers, addresses, social links, and WhatsApp helpers
 * are maintained here to avoid duplicate hardcoding across components.
 */

export const BUSINESS_CONFIG = {
  name: "Malik Imitation Jewellery",
  shortName: "Malik Jewellery",
  tagline: "Elegance for Every Occasion",
  description:
    "Curated imitation jewellery, premium cosmetics, and stylish bags in Gujri Bazar, Kamptee. Discover exquisite bridal sets, daily wear, festive collections, and beauty essentials.",
  
  // Location details
  location: {
    plusCode: "659V+4WH",
    street: "Gujri Bazar, Near Jama Masjid",
    city: "Kamptee",
    state: "Maharashtra",
    postalCode: "441001",
    country: "India",
    fullAddress: "659V+4WH, Gujri Bazar, Near Jama Masjid, Kamptee, Maharashtra 441001",
    googleMapsUrl: "https://maps.app.goo.gl/1bsVZwVUDcR2GVUK7",
    // Embed map URL centered on Gujri Bazar, Kamptee
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.46788544924!2d79.1983056!3d21.2132778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c728e539955b%3A0x6b6d2a45d0458fa8!2sGujri%20Bazar%2C%20Kamptee%2C%20Maharashtra%20441001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    geo: {
      latitude: 21.2239,
      longitude: 79.1994,
    },
  },

  // Calling Phone Numbers
  phoneNumbers: [
    { number: "9595947246", display: "+91 95959 47246", tel: "+919595947246" },
    { number: "8282818076", display: "+91 82828 18076", tel: "+918282818076" },
    { number: "8668703440", display: "+91 86687 03440", tel: "+918668703440", isPrimary: true },
  ],

  // Primary WhatsApp details (All WhatsApp orders MUST use 8668703440)
  whatsapp: {
    rawNumber: "8668703440",
    countryCode: "91",
    fullNumber: "918668703440",
    display: "+91 86687 03440",
    baseUrl: "https://wa.me/918668703440",
  },

  // Social Channels
  social: {
    instagram: {
      handle: "@malik_immitation_s7",
      url: "https://www.instagram.com/malik_immitation_s7/",
    },
  },

  // Store Hours
  hours: {
    days: "Monday - Sunday",
    timings: "10:30 AM - 10:00 PM",
  },

  // Product Categories
  categories: [
    {
      id: "jewellery",
      name: "Imitation Jewellery",
      shortName: "Jewellery",
      slug: "jewellery",
      description: "Exquisite bridal sets, Kundan chokers, necklaces, earrings, bangles, and festive accessories.",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "cosmetics",
      name: "Cosmetics & Beauty",
      shortName: "Cosmetics",
      slug: "cosmetics",
      description: "Premium daily & bridal cosmetics, lip shades, eyeshadow palettes, skin essentials, and fragrances.",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "bags",
      name: "Bags & Clutches",
      shortName: "Bags",
      slug: "bags",
      description: "Elegant bridal clutches, designer party purses, everyday tote bags, and chic sling bags.",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    },
  ],

  // WhatsApp Message Generators
  getWhatsAppProductUrl: (productName, category, price) => {
    const priceText = price ? ` (Price: ₹${price})` : "";
    const message = `Hi, I am interested in this product from Malik Imitation Jewellery.\n\nProduct: ${productName}${priceText}\nCategory: ${category || "General"}\n\nPlease share availability and details.`;
    return `https://wa.me/918668703440?text=${encodeURIComponent(message)}`;
  },

  getWhatsAppGeneralUrl: (customText) => {
    const defaultText = "Hi Malik Imitation Jewellery! I would like to enquire about your latest jewellery, cosmetics, and bag collections.";
    const message = customText || defaultText;
    return `https://wa.me/918668703440?text=${encodeURIComponent(message)}`;
  },
};
