import React from "react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/home/ProductCard";
import { ArrowRight } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";

export default function RelatedProducts({ currentProduct }) {
  const { t } = usePreferences();

  const related = products
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        (p.brand === currentProduct.brand || p.category === currentProduct.category)
    )
    .slice(0, 4);

  // Si on a moins de 4, on complète avec les premiers
  const displayProducts =
    related.length >= 4
      ? related
      : [
          ...related,
          ...products.filter(
            (p) => p.id !== currentProduct.id && !related.some((r) => r.id === p.id)
          ),
        ].slice(0, 4);

  if (displayProducts.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#990006]">
            {t("recommendations_badge")}
          </span>
          <h2 className="mt-1 font-['Wosker'] text-2xl sm:text-3xl text-[#1d1d1d]">
            {t("recommendations_title")}
          </h2>
        </div>

        {/* Redirection directe vers la page d'accueil (catalogue principal) */}
        <Link
          to="/"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#990006] hover:underline"
        >
          <span>{t("view_all_catalog")}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
