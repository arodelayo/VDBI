import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";

export default function ProductCard({ product }) {
  const { formatPrice, getProductPrice, toggleWishlist, isWishlisted, t } = usePreferences();
  const [imageError, setImageError] = useState(false);

  const isLiked = isWishlisted(product.id);
  const displayImage = product.image || (product.images && product.images[0]) || "";
  const displayPrice = getProductPrice(product.price);

  const handleToggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
      
      {/* Zone Image */}
      <div className="relative overflow-hidden bg-[#f6f6f6] aspect-square">
        {/* Bouton Like / Wishlist en haut à droite */}
        <button
          onClick={handleToggleLike}
          aria-label="Ajouter aux favoris"
          className={`absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-xs ${
            isLiked ? "opacity-100 text-[#990006]" : "opacity-0 group-hover:opacity-100 text-gray-600"
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
        </button>

        {/* Badge NOUVEAU si applicable */}
        {product.isNew && (
          <span className="absolute top-3 left-3 z-10 rounded-md bg-[#990006] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
            {t("new_badge")}
          </span>
        )}

        {/* Image Produit */}
        <Link to={`/product/${product.id}`} className="block relative h-full w-full">
          <div className="h-full w-full flex items-center justify-center p-6">
            {!imageError && displayImage ? (
              <img
                src={displayImage}
                alt={product.name}
                loading="lazy"
                onError={() => setImageError(true)}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="text-gray-400 text-xs">Image non disponible</div>
            )}
          </div>

          {/* Bouton Voir au survol */}
          <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[1px]">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#990006] text-white px-4 py-2 text-xs font-semibold shadow-md hover:bg-[#7d0005] transition-transform hover:scale-105">
              <span>{t("order_this_pair")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Link>
      </div>

      {/* Contenu carte : Titre, Prix, Bouton Commander Direct */}
      <div className="p-4 sm:p-5 flex flex-col space-y-3">
        <Link to={`/product/${product.id}`}>
          <h2 className="font-semibold text-gray-900 line-clamp-2 hover:text-[#990006] transition-colors text-sm sm:text-base leading-snug">
            {product.name}
          </h2>
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-base sm:text-lg font-bold text-[#1d1d1d]">
            {formatPrice(displayPrice)}
          </span>
          <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
            {product.brand}
          </span>
        </div>

        {/* Bouton Commander Express */}
        <Link
          to={`/product/${product.id}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#990006] text-white hover:bg-[#7d0005] shadow-xs hover:shadow transition-all"
        >
          <span>{t("order_this_pair")}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

    </div>
  );
}
