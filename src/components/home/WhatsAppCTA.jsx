import React from "react";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";

export default function WhatsAppCTA() {
  const whatsappNumber = "2290151930994";
  const defaultMessage = encodeURIComponent(
    "Bonjour VDBI, je souhaite commander une paire de baskets ou vérifier une disponibilité."
  );

  return (
    <section className="relative overflow-hidden bg-[#990006] py-16 md:py-20 text-white">
      {/* Motifs de fond subtils */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-black/10 blur-2xl" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          <div className="max-w-2xl">
            
            <h2 className="mt-3 font-['Wosker'] text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
              UNE QUESTION ? PARLONS-EN DIRECTEMENT.
            </h2>
            <p className="mt-4 text-sm sm:text-base font-light text-white/90 leading-relaxed max-w-xl">
              Vous hésitez sur une pointure ou vous cherchez un modèle spécifique ? Contactez notre équipe sur WhatsApp pour une réponse immédiate.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-4 text-xs font-bold uppercase tracking-wider text-[#990006] shadow-xl transition-all duration-200 hover:bg-gray-100 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600" />
              <span>Discuter sur WhatsApp</span>
              <ArrowRight className="h-4 w-4 text-[#990006]" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
