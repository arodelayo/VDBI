import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useKKiaPay } from "kkiapay-react";
import { products } from "@/data/products";
import RelatedProducts from "@/components/product/RelatedProducts";
import {
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Lock,
  CreditCard,
  Banknote,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import Badge from "@/components/ui/Badge";

const SWIPE_THRESHOLD = 50;

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    language,
    currency,
    t,
    formatPrice,
    getProductPrice,
    applyKkiapayFee,
    pricingConfig,
    toggleWishlist,
    isWishlisted,
  } = usePreferences();

  const product = products.find((p) => p.id === Number(id));

  // Kkiapay SDK hook
  const { openKkiapayWidget, addSuccessListener, addFailedListener } = useKKiaPay();

  // Galerie photos
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Formulaire Express & Pointures multiples (toggle on/off)
  const isOtherSection = product?.section === "autres";
  const availableSizes =
    product?.sizes && product.sizes.length > 0
      ? product.sizes
      : isOtherSection
      ? ["Taille Unique"]
      : [38, 39, 40, 41, 42, 43, 44, 45];
  
  const [selectedSizes, setSelectedSizes] = useState([]);
  const zones = pricingConfig.DELIVERY_ZONES;
  const [selectedZone, setSelectedZone] = useState(zones[0]);
  const [paymentMethod, setPaymentMethod] = useState("momo"); // 'momo' ou 'cash'
  const [form, setForm] = useState({
    nom: "",
    whatsapp: "",
    quartier: "",
  });

  // États d'erreurs & soumission
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Référence pour conserver les données de commande lors du callback Kkiapay
  const orderDataRef = useRef(null);

  // Swipe / Drag sur l'image principale
  const startX = useRef(null);
  const isDragging = useRef(false);
  const sizeSelectorRef = useRef(null);

  // Mode de paiement & calcul des quantités
  const isKkiapay = paymentMethod === "momo";
  const quantity = selectedSizes.length;
  const effectiveQty = quantity > 0 ? quantity : 1;

  // Prix unitaire unifié dès la source partagée (identique de l'accueil au récapitulatif)
  const unitPrice = product ? getProductPrice(product.price) : 0;
  const deliveryFee = currency === "USD" ? selectedZone.feeUsd : selectedZone.feeFcfa;
  const finalTotal = unitPrice * effectiveQty + deliveryFee;

  // Montant effectif en FCFA (pour le widget Kkiapay et l'enregistrement Google Sheets)
  const unitPriceFcfa = product ? applyKkiapayFee(product.price) : 0;
  const finalTotalFcfa = unitPriceFcfa * effectiveQty + selectedZone.feeFcfa;

  // Toggle pointure (sélection / désélection au clic)
  const handleToggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    if (errors.size) {
      setErrors((prev) => ({ ...prev, size: null }));
    }
  };

  // Fermeture de la confirmation simplifiée avec redirection vers l'accueil
  const handleCloseConfirmation = () => {
    setConfirmedOrder(null);
    setSelectedSizes([]);
    setForm({ nom: "", whatsapp: "", quartier: "" });
    navigate("/");
  };

  // Écouteur de succès Kkiapay
  useEffect(() => {
    if (typeof addSuccessListener === "function") {
      addSuccessListener(async (data) => {
        const order = orderDataRef.current;
        if (!order) return;

        const payload = {
          nom: order.nom,
          whatsapp: order.whatsapp,
          produit: order.produit,
          pointures: order.pointures,
          quantite: order.quantite,
          ville: order.ville,
          devise: order.devise,
          total: order.total,
          totalFcfa: order.totalFcfa,
          fraisKkiapay: order.fraisKkiapay,
          modePaiement: "MoMo / Carte",
          statut: "PAYÉ",
        };

        // Envoi silencieux vers Google Sheets
        try {
          await fetch(import.meta.env.VITE_GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...payload,
              transactionId: data?.transactionId || "",
            }),
          });
        } catch (err) {
          console.error("Erreur transmission Google Sheets :", err);
        }

        setConfirmedOrder({
          ...payload,
          transactionId: data?.transactionId || "",
        });
        setIsSubmitting(false);
      });
    }
  }, [addSuccessListener]);

  // Écouteur d'échec / annulation Kkiapay
  useEffect(() => {
    if (typeof addFailedListener === "function") {
      addFailedListener(() => {
        setIsSubmitting(false);
      });
    }
  }, [addFailedListener]);

  if (!product) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-md">
          <span className="text-5xl">👟</span>
          <h1 className="mt-4 font-['Wosker'] text-3xl sm:text-4xl text-[#1d1d1d]">
            {t("product_not_found")}
          </h1>
          <p className="mt-2 text-xs text-gray-500 font-light">
            {t("product_not_found_desc")}
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-xl bg-[#990006] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow hover:bg-[#7d0005] transition"
          >
            {t("back_to_catalog")}
          </Link>
        </div>
      </main>
    );
  }

  const isLiked = isWishlisted(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const currentImage = images[selectedImageIndex] || images[0];
  const totalImages = images.length;

  const goToNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % totalImages);
  };

  const goToPrevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handlePointerDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current || startX.current === null) return;
    isDragging.current = false;
    const deltaX = e.clientX - startX.current;
    startX.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || totalImages <= 1) return;
    if (deltaX < 0) {
      goToNextImage();
    } else {
      goToPrevImage();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (selectedSizes.length === 0) {
      newErrors.size = t("size_error");
    }

    if (!form.nom.trim()) {
      newErrors.nom = t("error_fullname");
    }

    const cleanPhone = form.whatsapp.trim().replace(/\s+/g, "");
    if (!cleanPhone) {
      newErrors.whatsapp = t("error_whatsapp");
    } else if (cleanPhone.length < 8) {
      newErrors.whatsapp = t("error_whatsapp_invalid");
    }

    if (!form.quartier.trim()) {
      newErrors.quartier = t("error_address");
    }

    setErrors(newErrors);

    if (newErrors.size && sizeSelectorRef.current) {
      sizeSelectorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return Object.keys(newErrors).length === 0;
  };

  const zoneLabel = language === "EN" ? selectedZone.labelEn : selectedZone.labelFr;
  const fullLocation = `${zoneLabel} (${form.quartier.trim()})`;
  const sizesString = [...selectedSizes].sort((a, b) => a - b).join(", ");

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Stockage pour le callback éventuel
    orderDataRef.current = {
      nom: form.nom.trim(),
      whatsapp: form.whatsapp.trim(),
      produit: product.name,
      pointures: sizesString,
      quantite: selectedSizes.length,
      ville: fullLocation,
      devise: currency,
      total: finalTotal,
      totalFcfa: finalTotalFcfa,
      fraisKkiapay: isKkiapay ? `${pricingConfig.KKIAPAY_FEE_PERCENT}% inclus` : "0",
    };

    setIsSubmitting(true);

    if (paymentMethod === "momo") {
      // Option 1 : Paiement Kkiapay (avec compensation de commission pour marge nette préservée)
      try {
        openKkiapayWidget({
          amount: finalTotalFcfa,
          key: import.meta.env.VITE_KKIAPAY_PUBLIC_KEY,
          sandbox: import.meta.env.VITE_KKIAPAY_SANDBOX === "true",
          name: form.nom.trim(),
          phone: form.whatsapp.trim().replace(/\s+/g, ""),
          data: JSON.stringify({
            produit: product.name,
            pointures: sizesString,
            quantite: selectedSizes.length,
            devise: currency,
            totalAffiche: finalTotal,
            fraisKkiapayCompenses: `${pricingConfig.KKIAPAY_FEE_PERCENT}%`,
            ville: fullLocation,
          }),
        });
      } catch (err) {
        console.error("Erreur ouverture Kkiapay :", err);
        setIsSubmitting(false);
      }
    } else {
      // Option 2 : Paiement à la livraison (Cash)
      const payload = {
        nom: form.nom.trim(),
        whatsapp: form.whatsapp.trim(),
        produit: product.name,
        pointures: sizesString,
        quantite: selectedSizes.length,
        ville: fullLocation,
        devise: currency,
        total: finalTotal,
        totalFcfa: finalTotalFcfa,
        fraisKkiapay: "0",
        modePaiement: "Paiement à la livraison",
        statut: "À PAYER À LA LIVRAISON",
      };

      try {
        await fetch(import.meta.env.VITE_GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error("Erreur transmission Google Sheets :", err);
      }

      setConfirmedOrder(payload);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white pb-20 max-w-full overflow-x-hidden">
      
      {/* Bouton Retour sans bordure avec flèche retour */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/");
            }
          }}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#990006] transition-colors cursor-pointer bg-transparent border-0 p-0 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>{t("btn_back")}</span>
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Colonne Gauche : Galerie Photo & Atouts */}
          <div className="lg:col-span-6">
            
            {/* Image Principale avec Swipe */}
            <div
              className="relative aspect-square w-full select-none overflow-hidden rounded-3xl bg-[#f7f7f7] border border-gray-100 p-6 sm:p-10 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-xs"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={() => { isDragging.current = false; }}
            >
              <img
                src={currentImage}
                alt={product.name}
                draggable={false}
                className="h-full w-full object-contain drop-shadow-xl transition-all duration-300"
              />

              {/* Bouton Wishlist Cœur */}
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Ajouter aux favoris"
                className={`absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all hover:scale-110 cursor-pointer ${
                  isLiked ? "text-[#990006]" : "text-gray-400 hover:text-[#990006]"
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
              </button>

              {/* Flèches de navigation rapide */}
              {totalImages > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); goToPrevImage(); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-sm backdrop-blur-sm hover:bg-white transition cursor-pointer"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); goToNextImage(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-sm backdrop-blur-sm hover:bg-white transition cursor-pointer"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Indicateurs de points (mobile) */}
              {totalImages > 1 && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === selectedImageIndex ? "w-5 bg-[#990006]" : "w-1.5 bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Miniatures */}
            {totalImages > 1 && (
              <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-square overflow-hidden rounded-xl border bg-[#f7f7f7] p-2 transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? "border-[#990006] ring-2 ring-[#990006]/20 scale-95"
                        : "border-gray-200/80 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} vue ${idx + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Description du modèle */}
            <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50/50 p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#990006]" />
                <span>{t("about_this_pair")}</span>
              </h3>
              <p className="text-xs sm:text-sm font-light text-gray-600 leading-relaxed">
                {product.description}
              </p>

              <div className="pt-2 border-t border-gray-200/60 grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="block text-xs font-bold text-gray-900">100% Vérifié</span>
                  <span className="text-[11px] text-gray-500">Qualité inspectée</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#990006]">24h Express</span>
                  <span className="text-[11px] text-gray-500">Livraison Cotonou</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-emerald-600">Essayage</span>
                  <span className="text-[11px] text-gray-500">À la réception</span>
                </div>
              </div>
            </div>

          </div>

          {/* Colonne Droite : Formulaire Express */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            
            <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 shadow-sm">
              
              {/* En-tête Fiche Produit */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  {product.brand}
                </span>
                {product.isNew && (
                  <Badge variant="default" className="text-[10px]">
                    {t("new_badge")}
                  </Badge>
                )}
              </div>

              {/* Titre Produit avec typographie soignée et chiffres garantis */}
              <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1d1d1d] leading-tight tracking-tight">
                {product.name}
              </h1>

              {/* Prix Unitaire (dynamique selon FCFA / USD calculé avec marge & expédition) */}
              <div className="mt-4 pb-4 border-b border-gray-100 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-[#990006]">
                  {formatPrice(unitPrice)}
                </span>
                {currency === "USD" && (
                  <span className="text-xs text-gray-400 font-light">
                    (~ {unitPriceFcfa.toLocaleString("fr-FR")} FCFA)
                  </span>
                )}
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  {t("immediate_stock")}
                </span>
              </div>

              <form onSubmit={handleSubmitOrder} className="mt-6 space-y-6">
                
                {/* ÉTAPE 1 : Sélecteur de pointures multiples (toggle on/off) */}
                <div ref={sizeSelectorRef} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1d1d1d]">
                      {isOtherSection
                        ? (language === "EN" ? "1. Choisissez votre option / taille" : "1. Choisissez votre option / taille")
                        : t("step1_size")}{" "}
                      <span className="text-[#990006]">*</span> :
                    </label>
                    <span className="text-[11px] text-gray-400 font-light">
                      {isOtherSection
                        ? (language === "EN" ? "(At least 1 option required)" : "(Au moins 1 option requise)")
                        : t("step1_size_required")}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {availableSizes.map((size) => {
                      const isSelected = selectedSizes.includes(size);
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleToggleSize(size)}
                          className={`flex h-11 min-w-[46px] items-center justify-center rounded-xl px-3 text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#990006] text-white shadow-md shadow-[#990006]/30 scale-105 ring-2 ring-[#990006]/40"
                              : "border border-gray-200 bg-white text-gray-800 hover:border-[#990006] hover:text-[#990006]"
                          } ${errors.size && selectedSizes.length === 0 ? "border-red-300 bg-red-50/20" : ""}`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>

                  {/* Récapitulatif pointures sélectionnées */}
                  {selectedSizes.length > 0 && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-[#990006] font-bold">
                      <span>{t("selected_sizes_label")}</span>
                      <span className="bg-[#990006]/10 px-2 py-0.5 rounded-md">
                        {sizesString}
                      </span>
                      <span className="text-gray-500 font-normal">
                        ({selectedSizes.length} {selectedSizes.length > 1 ? (language === "EN" ? "pairs" : "paires") : (language === "EN" ? "pair" : "paire")})
                      </span>
                    </div>
                  )}

                  {errors.size && (
                    <p className="text-xs font-medium text-red-600 mt-1 animate-in fade-in">
                      {errors.size}
                    </p>
                  )}
                </div>

                {/* ÉTAPE 2 : Informations de Livraison */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1d1d1d] block">
                    {t("step2_coords")}
                  </label>

                  {/* Nom Complet */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("label_fullname")} <span className="text-[#990006]">*</span>
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={form.nom}
                      onChange={handleInputChange}
                      placeholder={t("placeholder_fullname")}
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#990006] transition ${
                        errors.nom ? "border-red-400 bg-red-50/20" : "border-gray-300 bg-white"
                      }`}
                    />
                    {errors.nom && (
                      <p className="text-xs text-red-600 mt-1">{errors.nom}</p>
                    )}
                  </div>

                  {/* Numéro WhatsApp */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("label_whatsapp")} <span className="text-[#990006]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={form.whatsapp}
                      onChange={handleInputChange}
                      placeholder={t("placeholder_whatsapp")}
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#990006] transition ${
                        errors.whatsapp ? "border-red-400 bg-red-50/20" : "border-gray-300 bg-white"
                      }`}
                    />
                    {errors.whatsapp && (
                      <p className="text-xs text-red-600 mt-1">{errors.whatsapp}</p>
                    )}
                  </div>

                  {/* Zone de livraison (Calcul dynamique) */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      {t("label_zone")} <span className="text-[#990006]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {zones.map((zone) => {
                        const isSelected = selectedZone.id === zone.id;
                        const fee = currency === "USD" ? zone.feeUsd : zone.feeFcfa;
                        const label = language === "EN" ? zone.labelEn : zone.labelFr;
                        return (
                          <button
                            key={zone.id}
                            type="button"
                            onClick={() => setSelectedZone(zone)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition cursor-pointer ${
                              isSelected
                                ? "border-[#990006] bg-[#990006]/5 text-[#990006] font-bold shadow-xs"
                                : "border-gray-200 bg-gray-50/60 text-gray-700 hover:border-gray-300"
                            }`}
                          >
                            <span className="text-xs leading-tight">{label}</span>
                            <span className="text-[11px] font-semibold text-[#990006] mt-0.5">
                              +{formatPrice(fee)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quartier / Adresse */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("label_address")} <span className="text-[#990006]">*</span>
                    </label>
                    <input
                      type="text"
                      name="quartier"
                      value={form.quartier}
                      onChange={handleInputChange}
                      placeholder={t("placeholder_address")}
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#990006] transition ${
                        errors.quartier ? "border-red-400 bg-red-50/20" : "border-gray-300 bg-white"
                      }`}
                    />
                    {errors.quartier && (
                      <p className="text-xs text-red-600 mt-1">{errors.quartier}</p>
                    )}
                  </div>

                </div>

                {/* ÉTAPE 3 : Sélecteur de Mode de Règlement */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1d1d1d] block">
                    {t("step3_payment")}
                  </label>

                  <div className="space-y-2.5">
                    
                    {/* Option 1 : Kkiapay (MoMo, Moov, Carte) */}
                    <label
                      className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        paymentMethod === "momo"
                          ? "border-[#990006] bg-[#990006]/5 shadow-xs"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="momo"
                        checked={paymentMethod === "momo"}
                        onChange={() => setPaymentMethod("momo")}
                        className="mt-1 h-4 w-4 text-[#990006] focus:ring-[#990006] cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-900">
                            {t("option_momo_title")}
                          </span>
                          <CreditCard className="h-4 w-4 text-[#990006] shrink-0" />
                        </div>
                        <p className="mt-1 text-[11px] text-gray-500 font-light leading-snug">
                          {t("option_momo_desc")}
                        </p>
                      </div>
                    </label>

                    {/* Option 2 : Paiement à la livraison */}
                    <label
                      className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        paymentMethod === "cash"
                          ? "border-[#990006] bg-[#990006]/5 shadow-xs"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={() => setPaymentMethod("cash")}
                        className="mt-1 h-4 w-4 text-[#990006] focus:ring-[#990006] cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-900">
                            {t("option_cash_title")}
                          </span>
                          <Banknote className="h-4 w-4 text-emerald-600 shrink-0" />
                        </div>
                        <p className="mt-1 text-[11px] text-gray-500 font-light leading-snug">
                          {t("option_cash_desc")}
                        </p>
                      </div>
                    </label>

                  </div>
                </div>

                {/* RÉCAPITULATIF FINANCIER DYNAMIQUE */}
                <div className="rounded-2xl bg-gray-50 p-4 space-y-2 border border-gray-200/70 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>{t("summary_unit_price")}</span>
                    <span>{formatPrice(unitPrice)}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>{t("summary_quantity")}</span>
                    <span className="font-semibold text-gray-900">
                      {quantity > 0 ? quantity : 1} {quantity > 1 ? (language === "EN" ? "pairs" : "paires") : (language === "EN" ? "pair" : "paire")}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>{t("summary_delivery")} ({zoneLabel}) :</span>
                    <span>+{formatPrice(deliveryFee)}</span>
                  </div>

                  <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline font-bold">
                    <span className="text-gray-900 text-sm">{t("summary_total")}</span>
                    <span className="text-[#990006] text-lg font-extrabold">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* BOUTON D'ACTION PRINCIPAL */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#990006] text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#990006]/25 hover:bg-[#7d0005] hover:shadow-xl transition-all active:scale-[0.98] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>{t("btn_processing")}</span>
                    </div>
                  ) : paymentMethod === "momo" ? (
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      <span>{t("btn_pay_now")} ({formatPrice(finalTotal)})</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{t("btn_confirm_cash")} ({formatPrice(finalTotal)})</span>
                    </div>
                  )}
                </button>

                <p className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                  <Lock className="h-3 w-3 text-emerald-600" />
                  <span>{t("secure_order_note")}</span>
                </p>

              </form>

              {/* Réassurance Fiche Produit */}
              <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50/70 p-4 space-y-2.5 text-xs text-gray-600">
                <div className="flex items-center gap-2.5">
                  <Truck className="h-4 w-4 text-[#990006] shrink-0" />
                  <span>{t("guarantee_fast_delivery")}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="h-4 w-4 text-[#990006] shrink-0" />
                  <span>{t("guarantee_try_size")}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-[#990006] shrink-0" />
                  <span>{t("guarantee_quality")}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Produits Similaires Recommandés */}
        <RelatedProducts currentProduct={product} />

      </div>

      {/* BOÎTE DE DIALOGUE DE CONFIRMATION SIMPLIFIÉE AVEC BOUTON UNIQUE « OK » */}
      {confirmedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl text-center animate-in zoom-in-95 duration-200 border border-gray-100">
            
            {/* Icône de confirmation */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            {/* Titre */}
            <h3 className="mt-4 font-['Wosker'] text-2xl text-[#1d1d1d]">
              {t("modal_title_success")}
            </h3>

            {/* Message explicatif */}
            <p className="mt-2 text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
              {confirmedOrder.modePaiement === "MoMo / Carte"
                ? t("modal_momo_message")
                : t("modal_cash_message")}
            </p>

            {/* Récapitulatif condensé */}
            <div className="mt-5 rounded-2xl bg-gray-50 p-4 border border-gray-200/80 text-left text-xs space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Modèle :</span>
                <strong className="text-gray-900 font-bold">{confirmedOrder.produit}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Pointure(s) :</span>
                <span className="font-bold text-[#990006]">{confirmedOrder.pointures}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Lieu de livraison :</span>
                <span className="font-medium text-gray-800 text-right">{confirmedOrder.ville}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-gray-200">
                <span className="font-bold text-gray-900">Total :</span>
                <strong className="font-extrabold text-[#990006]">
                  {formatPrice(confirmedOrder.total)}
                </strong>
              </div>
            </div>

            {/* Bouton unique OK */}
            <button
              type="button"
              onClick={handleCloseConfirmation}
              className="mt-6 w-full flex items-center justify-center py-3.5 px-6 rounded-2xl bg-[#990006] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#7d0005] shadow-lg shadow-[#990006]/25 transition-all cursor-pointer active:scale-95"
            >
              {t("modal_btn_ok")}
            </button>

          </div>
        </div>
      )}

    </main>
  );
}
