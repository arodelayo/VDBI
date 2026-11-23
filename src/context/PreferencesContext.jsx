import React, { createContext, useContext, useState, useEffect } from "react";
import {
  PRICING_CONFIG,
  calculateUsdPrice,
  calculateKkiapayFee,
  applyKkiapayFee,
  formatPriceByCurrency,
} from "@/config/pricing";

const PreferencesContext = createContext();

export const translations = {
  FR: {
    // Header
    nav_home: "Accueil",
    nav_catalog: "Catalogue",
    nav_about: "À propos",
    nav_contact: "Contact",
    search_placeholder: "Rechercher une paire (Nike, Adidas, Puma...)",
    currency: "Devise",
    language: "Langue",

    // Home
    home_title_1: "DES BASKETS QUI FONT",
    home_title_2: "LA DIFFÉRENCE.",
    home_subtitle: "Découvrez notre sélection de baskets disponibles et trouvez votre prochaine paire.",
    all_brands: "Toutes",
    tab_shoes: "Toutes les chaussures",
    tab_other: "Autres articles",
    all_shoes: "Toutes les chaussures",
    all_other_items: "Tous les autres articles",
    filter_by_brand: "Filtrer par marque ou type",
    filter_by_category: "Filtrer par catégorie",
    category_souliers: "Souliers",
    empty_shoes_title: "Aucun modèle trouvé",
    empty_shoes_desc: "De nouveaux modèles arrivent très bientôt chez VDBI.",
    empty_other_title: "Nouveaux articles bientôt disponibles !",
    empty_other_desc: "Montres, parfums, chaussettes et accessoires arrivent très prochainement sur VDBI.",
    btn_explore_shoes: "Voir toutes les chaussures",
    no_product_found: "Aucun modèle trouvé",
    no_product_sub: "Essayez de modifier votre recherche ou de sélectionner une autre marque.",
    view_all_pairs: "Voir toutes les paires",
    order_this_pair: "Commander",
    new_badge: "Nouveau",
    load_more: "Afficher plus",

    // ProductDetails
    btn_back: "Retour",
    product_not_found: "PRODUIT INTROUVABLE",
    product_not_found_desc: "Cette paire de sneakers n'est plus disponible ou le lien est incorrect.",
    back_to_catalog: "Retour à l'accueil",
    verified_reviews: "avis vérifiés",
    immediate_stock: "En stock immédiat",
    about_this_pair: "À propos de cette paire",
    step1_size: "1. Choisissez votre ou vos pointures",
    step1_size_required: "(Au moins 1 pointure requise)",
    selected_sizes_label: "Pointure(s) choisie(s) :",
    size_error: "Veuillez sélectionner au moins une pointure avant de valider votre commande.",
    step2_coords: "2. Vos Coordonnées de Livraison :",
    label_fullname: "Nom & Prénoms",
    label_whatsapp: "Numéro WhatsApp",
    label_zone: "Zone de livraison",
    label_address: "Quartier & Indication précise",
    placeholder_fullname: "Ex: Jean Houndé",
    placeholder_whatsapp: "Ex: +229 01 51 93 09",
    placeholder_address: "Ex: Fidjrossè, près de la pharmacie du calvaire",
    error_fullname: "Veuillez renseigner votre nom complet.",
    error_whatsapp: "Veuillez renseigner votre numéro WhatsApp.",
    error_whatsapp_invalid: "Veuillez entrer un numéro de téléphone valide.",
    error_address: "Veuillez indiquer votre quartier ou repère précis.",
    step3_payment: "3. Mode de Règlement :",
    option_momo_title: "Payer maintenant (MTN MoMo, Moov Money, Carte Bancaire)",
    option_momo_desc: "Règlement instantané sécurisé par Kkiapay (Bénin & International).",
    option_cash_title: "Payer à la livraison (Cash)",
    option_cash_desc: "Vous réglez en espèces au livreur lors de la remise de votre colis.",
    summary_unit_price: "Prix unitaire de la paire :",
    summary_quantity: "Quantité sélectionnée :",
    summary_delivery: "Frais de livraison",
    kkiapay_fee_label: "Frais de transaction Kkiapay",
    summary_total: "Total à régler :",
    btn_pay_now: "Valider et Payer",
    btn_confirm_cash: "Confirmer la commande (Paiement à la livraison)",
    btn_processing: "Traitement en cours...",
    secure_order_note: "Commande express sans création de compte • Données sécurisées",
    guarantee_fast_delivery: "Livraison rapide sous 24h-48h",
    guarantee_try_size: "Possibilité d'essayer la pointure à la réception",
    guarantee_quality: "Finitions soignées et authenticité garanties par VDBI",

    // Confirmation Dialog
    modal_title_success: "Commande Enregistrée !",
    modal_momo_message: "Votre paiement a été validé et votre commande est enregistrée avec succès. Notre équipe prépare votre colis avec le plus grand soin.",
    modal_cash_message: "Votre commande a été enregistrée avec succès. Notre équipe VDBI vous contactera sur WhatsApp pour confirmer l'heure exacte de livraison.",
    modal_btn_ok: "OK",

    // Related Products
    recommendations_badge: "Recommandations",
    recommendations_title: "VOUS POURRIEZ AUSSI AIMER",
    view_all_catalog: "Voir tout le catalogue",
  },

  EN: {
    // Header
    nav_home: "Home",
    nav_catalog: "Catalog",
    nav_about: "About",
    nav_contact: "Contact",
    search_placeholder: "Search sneakers (Nike, Adidas, Puma...)",
    currency: "Currency",
    language: "Language",

    // Home
    home_title_1: "SNEAKERS THAT MAKE",
    home_title_2: "THE DIFFERENCE.",
    home_subtitle: "Discover our selection of available sneakers and find your next pair.",
    all_brands: "All",
    tab_shoes: "All shoes",
    tab_other: "Other items",
    all_shoes: "All shoes",
    all_other_items: "All other items",
    filter_by_brand: "Filter by brand or type",
    filter_by_category: "Filter by category",
    category_souliers: "Dress shoes",
    empty_shoes_title: "No shoes found",
    empty_shoes_desc: "New models are arriving very soon at VDBI.",
    empty_other_title: "New items coming soon!",
    empty_other_desc: "Watches, perfumes, socks and accessories will be available soon on VDBI.",
    btn_explore_shoes: "View all shoes",
    no_product_found: "No sneaker found",
    no_product_sub: "Try adjusting your search or selecting another brand.",
    view_all_pairs: "View all sneakers",
    order_this_pair: "Order",
    new_badge: "New",
    load_more: "Show more",

    // ProductDetails
    btn_back: "Back",
    product_not_found: "PRODUCT NOT FOUND",
    product_not_found_desc: "This pair of sneakers is no longer available or the link is incorrect.",
    back_to_catalog: "Back to Home",
    verified_reviews: "verified reviews",
    immediate_stock: "In immediate stock",
    about_this_pair: "About this pair",
    step1_size: "1. Select your shoe size(s)",
    step1_size_required: "(At least 1 size required)",
    selected_sizes_label: "Selected size(s):",
    size_error: "Please select at least one shoe size before placing your order.",
    step2_coords: "2. Your Delivery Information:",
    label_fullname: "Full Name",
    label_whatsapp: "WhatsApp Number",
    label_zone: "Delivery Zone",
    label_address: "Neighborhood & Landmark",
    placeholder_fullname: "Ex: John Doe",
    placeholder_whatsapp: "Ex: +229 01 51 93 09",
    placeholder_address: "Ex: Fidjrosse, near the pharmacy",
    error_fullname: "Please enter your full name.",
    error_whatsapp: "Please enter your WhatsApp number.",
    error_whatsapp_invalid: "Please enter a valid phone number.",
    error_address: "Please specify your neighborhood or landmark.",
    step3_payment: "3. Payment Method:",
    option_momo_title: "Pay now (MTN MoMo, Moov Money, Credit Card)",
    option_momo_desc: "Instant and secure checkout via Kkiapay (Benin & International).",
    option_cash_title: "Cash on Delivery",
    option_cash_desc: "Pay in cash directly to our delivery courier upon receiving your package.",
    summary_unit_price: "Unit price per pair:",
    summary_quantity: "Selected quantity:",
    summary_delivery: "Delivery fee",
    kkiapay_fee_label: "Kkiapay secure transaction fee",
    summary_total: "Total to pay:",
    btn_pay_now: "Pay & Validate",
    btn_confirm_cash: "Confirm Order (Cash on delivery)",
    btn_processing: "Processing order...",
    secure_order_note: "Express checkout without account creation • 100% Secure",
    guarantee_fast_delivery: "Fast delivery within 24h-48h",
    guarantee_try_size: "Try on size upon delivery",
    guarantee_quality: "Careful finishing and authenticity guaranteed by VDBI",

    // Confirmation Dialog
    modal_title_success: "Order Successfully Placed!",
    modal_momo_message: "Your payment has been approved and your order is recorded. Our team is carefully preparing your sneakers.",
    modal_cash_message: "Your order has been recorded successfully. Our VDBI team will contact you on WhatsApp to confirm the exact delivery time.",
    modal_btn_ok: "OK",

    // Related Products
    recommendations_badge: "Recommendations",
    recommendations_title: "YOU MIGHT ALSO LIKE",
    view_all_catalog: "View full catalog",
  },
};

export function PreferencesProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem("vdbi_language") || "FR";
  });

  const [currency, setCurrencyState] = useState(() => {
    return localStorage.getItem("vdbi_currency") || "FCFA";
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("vdbi_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem("vdbi_wishlist", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem("vdbi_language", lang);
  };

  const setCurrency = (curr) => {
    setCurrencyState(curr);
    localStorage.setItem("vdbi_currency", curr);
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.FR[key] || key;
  };

  const getProductPrice = (priceFcfa) => {
    if (!priceFcfa || priceFcfa <= 0) return 0;
    // Intégration préalable de la compensation Kkiapay dès la source partagée
    // pour garantir une cohérence parfaite entre l'accueil, la fiche produit et la commande
    const priceWithFee = applyKkiapayFee(priceFcfa);
    if (currency === "USD") {
      return calculateUsdPrice(priceWithFee);
    }
    return priceWithFee;
  };

  const formatPrice = (amount) => {
    return formatPriceByCurrency(amount, currency);
  };

  return (
    <PreferencesContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        t,
        getProductPrice,
        formatPrice,
        calculateKkiapayFee,
        applyKkiapayFee,
        pricingConfig: PRICING_CONFIG,
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
}
