import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone, Mail, MessageCircle, Banknote } from "lucide-react";
import logo from "@/assets/logo1.svg";
import { usePreferences } from "@/context/PreferencesContext";

// ===================================================================================
// EMPLACEMENTS POUR VOS IMAGES DE LOGOS DE PAIEMENT
// Renseignez ici les chemins de vos images (ex: "/logos/mtn.png" ou un import direct).
// Laissez la chaîne vide "" pour afficher les badges visuels SVG intégrés par défaut.
// ===================================================================================
export const PAYMENT_LOGOS = {
  mtn: "",        // Ex: "/logos/mtn.png"
  moov: "",       // Ex: "/logos/moov-africa.png"
  celtiis: "",    // Ex: "/logos/celtiis.png"
  visa: "",       // Ex: "/logos/visa.svg"
  mastercard: "", // Ex: "/logos/mastercard.svg"
};

function PaymentLogosRow({ isEn }) {
  const logos = [
    {
      id: "mtn",
      name: "MTN",
      src: PAYMENT_LOGOS.mtn,
      svg: (
        <svg viewBox="0 0 50 30" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="30" rx="5" fill="#FFCC00" />
          <ellipse cx="25" cy="15" rx="19" ry="11" fill="none" stroke="#002B49" strokeWidth="2.2" />
          <text x="25" y="19" fill="#002B49" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="-0.3">
            MTN
          </text>
        </svg>
      ),
    },
    {
      id: "moov",
      name: "Moov Africa",
      src: PAYMENT_LOGOS.moov,
      svg: (
        <svg viewBox="0 0 50 30" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="30" rx="5" fill="#FFFFFF" />
          <text x="25" y="14" fill="#005CA9" fontSize="10.5" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="-0.3">
            moov
          </text>
          <text x="25" y="23" fill="#FF7900" fontSize="7" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.8">
            AFRICA
          </text>
        </svg>
      ),
    },
    {
      id: "celtiis",
      name: "Celtiis",
      src: PAYMENT_LOGOS.celtiis,
      svg: (
        <svg viewBox="0 0 50 30" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="30" rx="5" fill="#0066FF" />
          <text x="25" y="19" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="-0.3">
            celtiis
          </text>
        </svg>
      ),
    },
    {
      id: "visa",
      name: "Visa",
      src: PAYMENT_LOGOS.visa,
      svg: (
        <svg viewBox="0 0 50 30" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="30" rx="5" fill="#FFFFFF" />
          <g transform="translate(6, 7)">
            <path d="M1 2.5 L4.5 2.5 L2 9 Z" fill="#F7B600" />
            <text x="19" y="12" fill="#1A1F71" fontSize="12.5" fontWeight="900" fontStyle="italic" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.5">
              VISA
            </text>
          </g>
        </svg>
      ),
    },
    {
      id: "mastercard",
      name: "Mastercard",
      src: PAYMENT_LOGOS.mastercard,
      svg: (
        <svg viewBox="0 0 50 30" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="30" rx="5" fill="#FFFFFF" />
          <g transform="translate(0, 0.5)">
            <circle cx="19.5" cy="12" r="7.5" fill="#EB001B" />
            <circle cx="30.5" cy="12" r="7.5" fill="#F79E1B" fillOpacity="0.92" />
            <path d="M 25 6.9 A 7.5 7.5 0 0 1 25 17.1 A 7.5 7.5 0 0 1 25 6.9" fill="#FF5F00" />
            <text x="25" y="24.5" fill="#333333" fontSize="4.6" fontWeight="bold" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="-0.2">
              mastercard
            </text>
          </g>
        </svg>
      ),
    },
  ];

  return (
    <div className="pt-2 space-y-3">
      <span className="block text-[11px] font-medium text-gray-500">
        {isEn ? "Accepted payments :" : "Moyens de paiement :"}
      </span>

      {/* Rangée horizontale uniforme de cartes de logos */}
      <div className="flex flex-wrap items-center gap-2">
        {logos.map((item) => (
          <div
            key={item.id}
            title={item.name}
            className="w-[50px] h-[32px] rounded-lg border border-gray-200 bg-white shadow-2xs flex items-center justify-center p-0.5 select-none cursor-default hover:shadow-xs hover:border-gray-300 transition-all duration-200 overflow-hidden"
          >
            {item.src ? (
              <img src={item.src} alt={item.name} className="h-full w-full object-contain" />
            ) : (
              item.svg
            )}
          </div>
        ))}
      </div>

      {/* Badge / lien Paiement à la livraison vers Contact */}
      <div className="pt-1">
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50/80 hover:bg-white hover:border-[#990006] hover:text-[#990006] text-xs font-medium text-gray-700 shadow-2xs transition-all duration-200 group"
          title={isEn ? "Contact us for cash on delivery" : "Contactez-nous pour le paiement à la livraison"}
        >
          <Banknote className="h-3.5 w-3.5 text-emerald-600 shrink-0 group-hover:text-[#990006] transition-colors" />
          <span>{isEn ? "Cash on delivery" : "Paiement à la livraison"}</span>
        </Link>
      </div>
    </div>
  );
}

function InstagramIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function TikTokIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export default function Footer() {
  const { language } = usePreferences();
  const isEn = language === "EN";
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const footerSections = [
    {
      title: isEn ? "SHOP" : "BOUTIQUE",
      links: [
        { href: "/", label: isEn ? "All sneakers" : "Toutes les baskets" },
        { href: "/?brand=Nike", label: isEn ? "Nike Collection" : "Collection Nike" },
        { href: "/?brand=Adidas", label: isEn ? "Adidas Collection" : "Collection Adidas" },
        { href: "/?brand=Jordan", label: isEn ? "Jordan Collection" : "Collection Jordan" },
      ],
    },
    {
      title: isEn ? "CUSTOMER SERVICE" : "SERVICE CLIENT",
      links: [
        { href: "/contact", label: isEn ? "Contact us" : "Nous contacter" },
        { href: "https://wa.me/2290151930994", label: isEn ? "WhatsApp Support 7/7" : "Assistance WhatsApp 7j/7" },
        { href: "/contact", label: isEn ? "Delivery & Timelines" : "Délais & Livraison" },
        { href: "/contact", label: isEn ? "Shoe size guide" : "Guide des pointures" },
      ],
    },
    {
      title: isEn ? "ABOUT VDBI" : "VDBI",
      links: [
        { href: "/about", label: isEn ? "About VDBI" : "À propos de VDBI" },
        { href: "/contact", label: isEn ? "Pickup points" : "Points de retrait physiques" },
        { href: "/about", label: isEn ? "Guaranteed authenticity" : "Authenticité garantie" },
        { href: "/about", label: isEn ? "Our vision" : "Notre vision" },
      ],
    },
    {
      title: isEn ? "PAYMENT & SECURITY" : "RÈGLEMENT & SÉCURITÉ",
      links: [
        { href: "/about#processus-commande", label: isEn ? "Order process" : "Processus de commande" },
      ],
      showPaymentLogos: true,
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section "Stay in the loop" */}
        <div className="py-12 sm:py-16 border-b border-gray-200">
          <div className="max-w-2xl space-y-3 mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-normal text-[#1d1d1d] tracking-normal lg:leading-[1.1] font-['Wosker']">
              {isEn ? "Stay connected" : "Restez connecté"}
            </h3>
            <p className="text-gray-600 text-sm font-light">
              {isEn
                ? "Subscribe to our newsletter for exclusive drops, restocks and special offers."
                : "Inscrivez-vous à notre newsletter pour recevoir en avant-première nos arrivages exclusifs, nouvelles pointures et offres spéciales."}
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex max-w-md mx-auto gap-2 pt-3"
            >
              <input
                type="email"
                placeholder={isEn ? "Enter your email" : "Entrez votre email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#990006] focus:border-transparent transition-all"
                required
              />
              <button
                type="submit"
                aria-label={isEn ? "Subscribe to newsletter" : "S'inscrire à la newsletter"}
                className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#990006] text-white hover:bg-[#7d0005] transition-transform hover:scale-105 shrink-0 shadow-sm cursor-pointer"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-emerald-600 font-medium pt-1 animate-in fade-in">
                {isEn
                  ? "Thank you! You are subscribed to VDBI updates."
                  : "Merci ! Vous êtes bien inscrit aux nouveautés VDBI."}
              </p>
            )}
          </div>
        </div>

        {/* Grille Principale Footer (exacte structure BloomShop) */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10">
            
            {/* Colonne 1 & 2 : Présentation VDBI */}
            <div className="lg:col-span-2 space-y-4">
              <Link
                to="/"
                className="flex items-center transition-transform duration-200 hover:scale-[1.02]"
                aria-label="VDBI Accueil"
              >
                <img src={logo} alt="VDBI - Vente de Baskets Ici" className="h-10 sm:h-12 w-auto object-contain" />
              </Link>

              <p className="text-gray-600 text-sm font-light max-w-sm leading-relaxed">
                {isEn ? (
                  <>
                    Vente de Baskets Ici (VDBI) guides you in discovering a wide range of sneaker models. Explore our catalog and order your next pair. <br /> <span>Fast delivery in Benin & Internationally.</span> <br />
                  </>
                ) : (
                  <>
                    Vente de Baskets Ici (VDBI) vous accompagne dans la découverte de modèles de baskets variés. Explorez notre catalogue et commandez votre prochaine paire. <br /> <span>Livraison rapide au Bénin & International.</span> <br />
                  </>
                )}
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-[#990006] shrink-0" />
                  <span>{isEn ? "Cotonou & Abomey-Calavi, Benin" : "Cotonou & Abomey-Calavi, Bénin"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-[#990006] shrink-0" />
                  <span>+229 01 51 93 09 94</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-[#990006] shrink-0" />
                  <span>ventedebasketsici@gmail.com</span>
                </div>
              </div>

              {/* Liens réseaux sociaux ronds */}
              <div className="flex gap-2.5 pt-2">
                <a
                  href="https://wa.me/2290151930994"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp VDBI"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-[#990006] hover:text-white transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/vente_de_baskets_ici_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram VDBI"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-[#990006] hover:text-white transition-colors"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://www.tiktok.com/@vente_de_baskets_ici"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok VDBI"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-[#990006] hover:text-white transition-colors"
                >
                  <TikTokIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Colonnes 3, 4, 5, 6 : Liens de navigation */}
            {footerSections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      {link.href.startsWith("http") ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-600 hover:text-[#990006] transition-colors font-light"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-xs text-gray-600 hover:text-[#990006] transition-colors font-light"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Badges/Logos de paiement : MTN, Moov, Celtiis, Visa, Mastercard */}
                {section.showPaymentLogos && (
                  <PaymentLogosRow isEn={isEn} />
                )}
              </div>
            ))}

          </div>
        </div>

        {/* Ligne inférieure de Copyright */}
        <div className="py-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 font-light">
          <p>© {new Date().getFullYear()} Vente de Baskets Ici (VDBI). {isEn ? "All rights reserved." : "Tous droits réservés."}</p>
          <p className="tracking-widest font-mono text-gray-400">VDBI • COTONOU, BÉNIN & International</p>
        </div>

      </div>
    </footer>
  );
}
