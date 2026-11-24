import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, CreditCard, Truck, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";
import { usePreferences } from "@/context/PreferencesContext";

export default function AboutPage() {
  const { language } = usePreferences();
  const isEn = language === "EN";
  const location = useLocation();

  // Défilement fluide vers l'ancre si demandée dans l'URL
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  const steps = [
    {
      number: "01",
      title: isEn
        ? "Select your pair & size(s)"
        : "Sélectionnez votre paire & pointure(s)",
      description: isEn
        ? "Browse models from the home catalog and select one or multiple sizes on the product page (with clear pricing in FCFA or USD)."
        : "Sélectionnez votre modèle depuis le catalogue de l'accueil et cochez votre ou vos pointures sur la fiche produit (avec affichage transparent en FCFA ou USD).",
      icon: ShoppingBag,
    },
    {
      number: "02",
      title: isEn
        ? "Delivery details & Payment method"
        : "Coordonnées & Mode de règlement",
      description: isEn
        ? "Enter your delivery address and choose either secure online payment via Kkiapay (Mobile Money / Credit Card) or cash on delivery."
        : "Saisissez vos coordonnées de livraison et choisissez votre mode de règlement : paiement en ligne sécurisé via Kkiapay (Mobile Money / Carte bancaire) ou paiement à la livraison.",
      icon: CreditCard,
    },
    {
      number: "03",
      title: isEn
        ? "Express validation & Dispatch"
        : "Validation express & Prise en charge",
      description: isEn
        ? "Confirm your order in one click without creating an account. Our team immediately prepares and delivers your pair with care."
        : "Validez votre commande express sans création de compte. Notre équipe prend immédiatement en charge votre colis pour une livraison rapide et soignée.",
      icon: Truck,
    },
  ];

  return (
    <main className="min-h-screen bg-white max-w-full overflow-x-hidden">
      {/* Hero À Propos */}
      <section className="relative overflow-hidden bg-[#1d1d1d] py-20 md:py-28 text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#990006]/20 blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
           
            <h1 className="mt-4 font-['Wosker'] text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
              {isEn ? (
                <>
                  MORE THAN A <br />
                  PAIR OF <br />
                  <span className="text-[#990006]">SNEAKERS.</span>
                </>
              ) : (
                <>
                  PLUS QU'UNE <br />
                  PAIRE DE <br />
                  <span className="text-[#990006]">BASKETS.</span>
                </>
              )}
            </h1>
            <p className="mt-6 text-sm sm:text-base font-light text-white/80 leading-relaxed max-w-2xl">
              {isEn ? (
                <>
                  Welcome to <strong className="text-white">Vente de Baskets Ici (VDBI)</strong>. Explore our online catalog and easily order the pair you need: a seamless journey, from selecting your shoe size to home delivery, without leaving your door.
                </>
              ) : (
                <>
                  Bienvenue chez <strong className="text-white">Vente de Baskets Ici (VDBI)</strong>. Explorez notre catalogue en ligne et commandez facilement la paire qu'il vous faut : un parcours fluide, du choix de votre pointure jusqu'à la livraison chez vous, sans vous déplacer.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Section Histoire & Vision */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
            
              <h2 className="mt-3 font-['Wosker'] text-3xl sm:text-4xl text-[#1d1d1d]">
                {isEn ? "THE PASSION FOR THE SNEAKER GAME WITHIN REACH" : "LA PASSION DU SNEAKER GAME À VOTRE PORTÉE"}
              </h2>
              <p className="mt-4 text-sm font-light text-gray-600 leading-relaxed">
                {isEn
                  ? "Finding premium sneakers with impeccable finish in Cotonou can be a real challenge. At VDBI, we've eliminated the guesswork: every pair is thoroughly inspected, carefully packaged, and delivered straight to your door."
                  : "Trouver des sneakers de qualité aux finitions impeccables à Cotonou peut s'avérer un parcours du combattant. Chez VDBI, nous avons éliminé les incertitudes : chaque paire est minutieusement vérifiée, emballée avec soin et livrée directement chez vous."}
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-xs font-medium text-gray-800">
                  <CheckCircle2 className="h-4 w-4 text-[#990006]" />
                  <span>
                    {isEn
                      ? "Wide catalog of international brands (Nike, Adidas, Puma, Rick Owens)"
                      : "Large catalogue de marques internationales (Nike, Adidas, Puma, Rick Owens)"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-gray-800">
                  <CheckCircle2 className="h-4 w-4 text-[#990006]" />
                  <span>
                    {isEn
                      ? "Personalized advice and size trying upon delivery"
                      : "Conseil personnalisé et essayage possible lors de la remise"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-gray-800">
                  <CheckCircle2 className="h-4 w-4 text-[#990006]" />
                  <span>
                    {isEn
                      ? "Convenient payment methods: Mobile Money & Credit card"
                      : "Moyens de paiement pratiques : Mobile Money & Carte bancaire"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-gray-50 border border-gray-100 p-8 sm:p-10">
              <h3 className="font-['Wosker'] text-2xl text-[#1d1d1d] mb-4">
                {isEn ? "OUR CORE VALUES" : "NOS VALEURS FONDAMENTALES"}
              </h3>
              <div className="space-y-4">
                <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                  <h4 className="text-sm font-bold text-[#1d1d1d]">
                    {isEn ? "Uncompromising Quality" : "Qualité Inflexible"}
                  </h4>
                  <p className="mt-1 text-xs text-gray-500 font-light leading-relaxed">
                    {isEn
                      ? "We refuse compromises on material quality and craftsmanship of our sneakers."
                      : "Nous refusons les compromis sur la qualité des matériaux et des finitions de nos baskets."}
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                  <h4 className="text-sm font-bold text-[#1d1d1d]">
                    {isEn ? "Proximity & Responsiveness" : "Proximité & Réactivité"}
                  </h4>
                  <p className="mt-1 text-xs text-gray-500 font-light leading-relaxed">
                    {isEn
                      ? "Direct human contact via WhatsApp to meet your expectations without intermediaries."
                      : "Un contact humain direct via WhatsApp pour répondre à vos exigences sans intermédiaire."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche - Processus de Commande */}
      <section
        id="processus-commande"
        className="py-16 md:py-24 bg-gray-50/50 border-t border-gray-100 scroll-mt-20 md:scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
           
            <h2 className="mt-2 font-['Wosker'] text-3xl sm:text-4xl text-[#1d1d1d]">
              {isEn ? "HOW TO ORDER FROM VDBI?" : "COMMENT COMMANDER CHEZ VDBI ?"}
            </h2>
            <p className="mt-3 text-sm text-gray-500 font-light">
              {isEn
                ? "From sneaker selection to doorstep delivery: a seamless 3-step express experience."
                : "De la sélection à la réception de votre colis, un parcours express et limpide en 3 étapes."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl bg-white p-8 shadow-sm border border-gray-100 text-center flex flex-col items-center"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#990006]/10 text-[#990006]">
                  <step.icon className="h-8 w-8" />
                </div>
                <span className="font-mono text-xs font-bold text-[#990006] mb-2">
                  {isEn ? `STEP ${step.number}` : `ÉTAPE ${step.number}`}
                </span>
                <h3 className="text-base font-bold text-[#1d1d1d] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhatsAppCTA />
    </main>
  );
}
