import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloatingButton() {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappNumber = "2290151930994";
  const defaultMessage = encodeURIComponent(
    "Bonjour VDBI, j'ai une question avant de passer ma commande."
  );

  return (
    <aside
      aria-label="Support client WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5"
    >
      {/* Bulle d'aide au survol */}
      <span
        aria-hidden={!isHovered}
        className={`hidden sm:inline-block rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-gray-800 shadow-lg border border-gray-100 transition-all duration-300 pointer-events-none ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2"
        }`}
      >
        Besoin d'aide ? Discutez avec nous 👋
      </span>

      {/* Bouton Flottant WhatsApp */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Discuter avec le support VDBI sur WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/35 transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {/* Effet pulsation discret */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
        
        <MessageCircle className="relative h-7 w-7 transition-transform group-hover:rotate-6" />
      </a>
    </aside>
  );
}
