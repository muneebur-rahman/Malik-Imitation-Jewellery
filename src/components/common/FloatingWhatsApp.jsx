import React from "react";
import { MessageCircle } from "lucide-react";
import { BUSINESS_CONFIG } from "../../config/business";

export const FloatingWhatsApp = () => {
  const whatsappUrl = BUSINESS_CONFIG.getWhatsAppGeneralUrl(
    "Hi Malik Imitation Jewellery, I visited your website and would like to enquire about your available collections."
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label={`Enquire on WhatsApp at ${BUSINESS_CONFIG.whatsapp.display}`}
      title="Chat with Malik Imitation Jewellery on WhatsApp"
    >
      <MessageCircle size={22} />
      <span>Order on WhatsApp</span>
    </a>
  );
};
