import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Phone, ShoppingBag, Sparkles } from "lucide-react";
import { products, heroProductIds } from "@/data/products";
import { usePreferences } from "@/context/PreferencesContext";

export default function Hero() {
  const { formatPrice, getProductPrice } = usePreferences();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const heroSneakers = useMemo(() => {
    return heroProductIds
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean);
  }, []);

  const current = heroSneakers[index] || heroSneakers[0];

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % heroSneakers.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + heroSneakers.length) % heroSneakers.length);
  };

  useEffect(() => {
    if (isPaused || heroSneakers.length <= 1) return;
    timerRef.current = setInterval(nextSlide, 4500);
    return () => clearInterval(timerRef.current);
  }, [isPaused, heroSneakers.length]);

  if (!current) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white py-12 md:py-20 lg:py-24">
      {/* Halo lumineux en arrière-plan */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-[#990006]/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-20 h-80 w-80 rounded-full bg-gray-200/50 blur-2xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Colonne Gauche : Texte & Accroche */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Badge exclusif */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#990006]/20 bg-[#990006]/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#990006]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Collection 2026 • Vente de Baskets Ici</span>
            </div>

            {/* Titre Impactant */}
            <h1 className="mt-6 font-['Wosker'] text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-[#1d1d1d]">
              PRENEZ UNE <br />
              LONGUEUR <br />
              <span className="text-[#990006]">D'AVANCE.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg font-light text-[#1d1d1d]/80 leading-relaxed">
              Explorez notre catalogue exclusif de baskets & sneakers authentiques. Finition soignée, styles recherchés et livraison rapide partout au Bénin.
            </p>

            {/* Boutons d'Action */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                to="/"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#990006] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#990006]/25 transition-all duration-200 hover:bg-[#7d0005] hover:shadow-xl active:scale-95"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Explorer les modèles</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-[#1d1d1d] shadow-sm transition-all duration-200 hover:border-[#990006] hover:text-[#990006] hover:bg-gray-50 active:scale-95"
              >
                <span>Voir tout le catalogue</span>
              </Link>
            </div>

            {/* Statistiques rapides */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-gray-200/70 pt-6">
              <div>
                <span className="block font-bold text-2xl text-[#1d1d1d]">100%</span>
                <span className="text-xs font-light text-gray-500">Qualité vérifiée</span>
              </div>
              <div>
                <span className="block font-bold text-2xl text-[#990006]">45+</span>
                <span className="text-xs font-light text-gray-500">Modèles en stock</span>
              </div>
              <div>
                <span className="block font-bold text-2xl text-[#1d1d1d]">24-48H</span>
                <span className="text-xs font-light text-gray-500">Livraison express</span>
              </div>
            </div>

          </div>

          {/* Colonne Droite : Vitrine Interactive Basket */}
          <div
            className="lg:col-span-5 relative flex flex-col items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carte Présentation */}
            <div className="relative w-full max-w-md rounded-3xl border border-gray-200/80 bg-white/80 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
              
              {/* En-tête de la carte */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#990006]">
                    {current.brand}
                  </span>
                  <h3 className="mt-0.5 text-lg font-bold text-[#1d1d1d] line-clamp-1">
                    {current.name}
                  </h3>
                </div>
                <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                  En stock
                </div>
              </div>

              {/* Image Sneakers en lévitation */}
              <div className="relative my-6 flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/60 p-4">
                <Link to={`/product/${current.id}`} className="group block">
                  <img
                    src={current.image || current.images[0]}
                    alt={current.name}
                    className="h-full w-full object-contain drop-shadow-2xl transition-all duration-700 ease-out group-hover:scale-110 group-hover:-rotate-3"
                  />
                </Link>
              </div>

              {/* Pied de la carte */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <span className="text-[11px] text-gray-400 block">Prix unitaire</span>
                  <span className="text-xl font-extrabold text-[#990006]">
                    {formatPrice(getProductPrice(current.price))}
                  </span>
                </div>

                <Link
                  to={`/product/${current.id}`}
                  className="rounded-xl bg-[#1d1d1d] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#990006]"
                >
                  Voir la paire
                </Link>
              </div>

              {/* Contrôles du Carrousel */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {heroSneakers.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Slide ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === index ? "w-6 bg-[#990006]" : "w-2 bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={prevSlide}
                    aria-label="Précédent"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:border-[#990006] hover:text-[#990006] shadow-sm transition"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Suivant"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:border-[#990006] hover:text-[#990006] shadow-sm transition"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
