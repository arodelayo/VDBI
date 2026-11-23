import React, { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/home/ProductCard";
import { usePreferences } from "@/context/PreferencesContext";
import { ChevronDown, Check } from "lucide-react";

const INITIAL_BATCH_COUNT = 24;
const LOAD_MORE_STEP = 10;

// Catégories prédéfinies pour les souliers et autres articles
const DEFAULT_OTHER_CATEGORIES = [
  "Montres",
  "Parfums",
  "Chaussettes",
  "Bonnets",
  "Sacs",
];

const CATEGORY_TRANSLATIONS = {
  Montres: { FR: "Montres", EN: "Watches" },
  Parfums: { FR: "Parfums", EN: "Perfumes" },
  Chaussettes: { FR: "Chaussettes", EN: "Socks" },
  Bonnets: { FR: "Bonnets", EN: "Beanies" },
  Sacs: { FR: "Sacs", EN: "Bags" },
  Souliers: { FR: "Souliers", EN: "Dress shoes" },
};

function getCategoryLabel(category, isEn) {
  if (!category) return "";
  const found = CATEGORY_TRANSLATIONS[category];
  if (found) {
    return isEn ? found.EN : found.FR;
  }
  return category;
}

export default function Home() {
  const { t, language } = usePreferences();
  const isEn = language === "EN";
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const brandParam = searchParams.get("brand");
  const sectionParam = searchParams.get("section");
  const categoryParam = searchParams.get("category");

  // État de la navigation principale
  const [activeSection, setActiveSection] = useState("chaussures"); // 'chaussures' ou 'autres'
  const [activeCategory, setActiveCategory] = useState("all"); // 'all' ou marque/catégorie exacte
  const [openDropdown, setOpenDropdown] = useState(null); // null | 'chaussures' | 'autres'
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH_COUNT);

  const navRef = useRef(null);

  // Synchronisation avec les paramètres d'URL éventuels
  useEffect(() => {
    if (sectionParam === "autres") {
      setActiveSection("autres");
    } else if (sectionParam === "chaussures") {
      setActiveSection("chaussures");
    }

    if (brandParam) {
      setActiveSection("chaussures");
      setActiveCategory(brandParam);
    } else if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [brandParam, sectionParam, categoryParam]);

  // Fermeture des menus déroulants lors d'un clic extérieur ou touche Échap
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Réinitialise le quota d'affichage lors d'un changement de filtre
  useEffect(() => {
    setVisibleCount(INITIAL_BATCH_COUNT);
  }, [activeSection, activeCategory, searchQuery]);

  // Tous les produits appartenant à la section chaussures
  const shoesProducts = useMemo(() => {
    return products.filter((p) => (p.section || "chaussures") === "chaussures");
  }, []);

  // Tous les produits appartenant à la section autres
  const otherProducts = useMemo(() => {
    return products.filter((p) => p.section === "autres");
  }, []);

  // Liste des marques de chaussures détectées dynamiquement
  const shoeBrandCategories = useMemo(() => {
    const brandsSet = new Set();
    shoesProducts.forEach((p) => {
      const cat = p.category || p.brand;
      if (cat && cat.toLowerCase() !== "souliers") {
        brandsSet.add(cat);
      }
    });

    // Liste ordonnée avec les marques courantes
    const preferredOrder = [
      "Nike",
      "Adidas",
      "Jordan",
      "Puma",
      "New Balance",
      "Asics",
      "Rick Owens",
      "Louis Vuitton",
      "Maison MIHARA YASUHIRO",
    ];

    const sorted = Array.from(brandsSet).sort((a, b) => {
      const idxA = preferredOrder.indexOf(a);
      const idxB = preferredOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });

    return sorted;
  }, [shoesProducts]);

  // Options du menu déroulant "Chaussures"
  const shoesOptions = useMemo(() => {
    const souliersCount = shoesProducts.filter(
      (p) =>
        p.category?.toLowerCase() === "souliers" ||
        p.brand?.toLowerCase() === "souliers"
    ).length;

    const brandOptions = shoeBrandCategories.map((brand) => ({
      id: brand,
      label: brand,
      count: shoesProducts.filter(
        (p) =>
          p.category?.toLowerCase() === brand.toLowerCase() ||
          p.brand?.toLowerCase() === brand.toLowerCase()
      ).length,
    }));

    return [
      {
        id: "all",
        label: isEn ? "All shoes" : "Toutes les chaussures",
        count: shoesProducts.length,
      },
      {
        id: "Souliers",
        label: isEn ? "Dress shoes (Souliers)" : "Souliers",
        count: souliersCount,
        isHighlight: true,
      },
      ...brandOptions,
    ];
  }, [shoesProducts, shoeBrandCategories, isEn]);

  // Options du menu déroulant "Autres articles"
  const otherOptions = useMemo(() => {
    const detectedCategories = new Set(DEFAULT_OTHER_CATEGORIES);
    otherProducts.forEach((p) => {
      if (p.category) detectedCategories.add(p.category);
    });

    const categoryList = Array.from(detectedCategories).map((cat) => ({
      id: cat,
      label: getCategoryLabel(cat, isEn),
      count: otherProducts.filter(
        (p) => p.category?.toLowerCase() === cat.toLowerCase()
      ).length,
    }));

    return [
      {
        id: "all",
        label: isEn ? "All other items" : "Tous les autres articles",
        count: otherProducts.length,
      },
      ...categoryList,
    ];
  }, [otherProducts, isEn]);

  // Filtrage combiné : Recherche + Section + Catégorie + Tri automatique par priorité croissante
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // 1. Filtrage par recherche
        if (searchQuery) {
          const q = searchQuery.toLowerCase().trim();
          const matchesName = p.name?.toLowerCase().includes(q);
          const matchesBrand = p.brand?.toLowerCase().includes(q);
          const matchesCategory = p.category?.toLowerCase().includes(q);
          if (!matchesName && !matchesBrand && !matchesCategory) return false;
        }

        // 2. Filtrage par section (chaussures vs autres)
        const pSection = p.section || "chaussures";
        if (pSection !== activeSection) {
          return false;
        }

        // 3. Filtrage par sous-catégorie / marque
        if (activeCategory !== "all") {
          const target = activeCategory.toLowerCase();
          const matchesCat = p.category?.toLowerCase() === target;
          const matchesBrand = p.brand?.toLowerCase() === target;
          if (!matchesCat && !matchesBrand) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priorityA = typeof a.priority === "number" ? a.priority : 2;
        const priorityB = typeof b.priority === "number" ? b.priority : 2;
        return priorityA - priorityB;
      });
  }, [searchQuery, activeSection, activeCategory]);

  // Gestion du chargement progressif
  const isSearchActive = Boolean(searchQuery.trim());
  const displayedProducts = useMemo(() => {
    if (isSearchActive) {
      return filteredProducts;
    }
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount, isSearchActive]);

  const hasMore = !isSearchActive && visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_STEP);
  };

  // Bascule d'onglet :
  // - 1er clic sur un onglet inactif : active uniquement cet onglet et affiche ses produits sans ouvrir la liste déroulante
  // - 2e clic sur l'onglet déjà actif : ouvre ou ferme (toggle) la liste déroulante
  const handleTabClick = (section) => {
    if (activeSection !== section) {
      setActiveSection(section);
      setActiveCategory("all");
      setOpenDropdown(null);
    } else {
      setOpenDropdown((prev) => (prev === section ? null : section));
    }
  };

  // Sélection d'une option dans le menu déroulant
  const handleSelectOption = (section, categoryId) => {
    setActiveSection(section);
    setActiveCategory(categoryId);
    setOpenDropdown(null);
  };

  // Libellé dynamique de l'onglet Chaussures
  const tabShoesLabel = useMemo(() => {
    if (activeSection === "chaussures" && activeCategory !== "all") {
      if (activeCategory.toLowerCase() === "souliers") {
        return isEn ? "Dress shoes" : "Souliers";
      }
      return `${activeCategory}`;
    }
    return isEn ? "All shoes" : "Toutes les chaussures";
  }, [activeSection, activeCategory, isEn]);

  // Libellé dynamique de l'onglet Autres articles
  const tabOtherLabel = useMemo(() => {
    if (activeSection === "autres" && activeCategory !== "all") {
      return getCategoryLabel(activeCategory, isEn);
    }
    return isEn ? "Other items" : "Autres articles";
  }, [activeSection, activeCategory, isEn]);

  return (
    <div className="bg-white min-h-screen px-4 py-8 sm:py-12 lg:py-16 lg:px-8">
      
      {/* En-tête épuré */}
      <div className="text-center mx-auto mb-10 sm:mb-12 space-y-3 max-w-4xl">
        <h1 className="text-[#1d1d1d] text-4xl font-normal tracking-normal lg:leading-[1.1] xl:text-5xl font-['Wosker']">
          {t("home_title_1")} <span className="text-[#990006]">{t("home_title_2")}</span>
        </h1>

        {/* Respect scrupuleux de votre phrase personnalisée en français */}
        <p className="text-gray-700 text-base max-w-2xl mx-auto sm:text-lg font-light leading-relaxed">
          {language === "FR"
            ? "Découvrez notre sélection de baskets disponibles et trouvez votre prochaine paire."
            : t("home_subtitle")}
        </p>

        {/* NAVIGATION EN DEUX ONGLETS INTERACTIFS AVEC MENUS DÉROULANTS */}
        <div ref={navRef} className="pt-6 flex flex-wrap items-center justify-center gap-3 relative z-30">
          
          {/* ============================================================ */}
          {/* ONGLET 1 : TOUTES LES CHAUSSURES ▾                          */}
          {/* ============================================================ */}
          <div className="relative">
            <button
              type="button"
              onClick={() => handleTabClick("chaussures")}
              aria-expanded={openDropdown === "chaussures"}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs active:scale-95 ${
                activeSection === "chaussures"
                  ? "bg-[#990006] text-white shadow-md shadow-[#990006]/20 ring-2 ring-[#990006]/20"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200/90 border border-gray-200/60"
              }`}
            >
              <span>{tabShoesLabel}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  openDropdown === "chaussures" ? "rotate-180" : ""
                } ${activeSection === "chaussures" ? "text-white/90" : "text-gray-500"}`}
              />
            </button>

            {/* Menu Déroulant Chaussures */}
            {openDropdown === "chaussures" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 w-64 max-w-[92vw] rounded-2xl bg-white border border-gray-200/90 shadow-2xl p-2 z-40 max-h-80 overflow-y-auto animate-in fade-in duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 mb-1">
                  {t("filter_by_brand")}
                </div>

                <div className="space-y-0.5">
                  {shoesOptions.map((opt) => {
                    const isSelected =
                      activeSection === "chaussures" && activeCategory === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption("chaussures", opt.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer text-left ${
                          isSelected
                            ? "bg-red-50 text-[#990006] font-bold"
                            : opt.isHighlight
                            ? "text-[#1d1d1d] hover:bg-gray-50 hover:text-[#990006] font-semibold"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#990006]"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isSelected ? (
                            <Check className="h-3.5 w-3.5 text-[#990006] shrink-0" />
                          ) : opt.isHighlight ? (
                            <span className="text-xs">👞</span>
                          ) : null}
                          <span>{opt.label}</span>
                        </span>
                        <span className="text-[11px] font-normal text-gray-400 ml-2">
                          ({opt.count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* ONGLET 2 : AUTRES ARTICLES ▾                                */}
          {/* ============================================================ */}
          <div className="relative">
            <button
              type="button"
              onClick={() => handleTabClick("autres")}
              aria-expanded={openDropdown === "autres"}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs active:scale-95 ${
                activeSection === "autres"
                  ? "bg-[#990006] text-white shadow-md shadow-[#990006]/20 ring-2 ring-[#990006]/20"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200/90 border border-gray-200/60"
              }`}
            >
              <span>{tabOtherLabel}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  openDropdown === "autres" ? "rotate-180" : ""
                } ${activeSection === "autres" ? "text-white/90" : "text-gray-500"}`}
              />
            </button>

            {/* Menu Déroulant Autres Articles */}
            {openDropdown === "autres" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 sm:right-0 sm:left-auto sm:translate-x-0 mt-2 w-64 max-w-[92vw] rounded-2xl bg-white border border-gray-200/90 shadow-2xl p-2 z-40 max-h-80 overflow-y-auto animate-in fade-in duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 mb-1">
                  {t("filter_by_category")}
                </div>

                <div className="space-y-0.5">
                  {otherOptions.map((opt) => {
                    const isSelected =
                      activeSection === "autres" && activeCategory === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption("autres", opt.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer text-left ${
                          isSelected
                            ? "bg-red-50 text-[#990006] font-bold"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#990006]"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isSelected && (
                            <Check className="h-3.5 w-3.5 text-[#990006] shrink-0" />
                          )}
                          <span>{opt.label}</span>
                        </span>
                        <span className="text-[11px] font-normal text-gray-400 ml-2">
                          ({opt.count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Grille Catalogue avec chargement progressif */}
      <div className="max-w-7xl mx-auto">
        {displayedProducts.length > 0 ? (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            {/* Bouton Afficher plus (+10 articles) */}
            {hasMore && (
              <div className="mt-12 sm:mt-16 text-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-gray-300 bg-white text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1d1d1d] shadow-sm hover:border-[#990006] hover:text-[#990006] hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95 group"
                >
                  <span>{t("load_more")}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-[#990006] transition-transform group-hover:translate-y-0.5" />
                  <span className="text-[11px] font-normal text-gray-400">
                    ({displayedProducts.length} / {filteredProducts.length})
                  </span>
                </button>
              </div>
            )}
          </>
        ) : (
          /* États vides soignés et contextuels */
          <div className="flex flex-col items-center justify-center py-16 text-center max-w-md mx-auto">
            {activeSection === "autres" ? (
              <>
                <div className="text-5xl mb-4">🛍️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t("empty_other_title")}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mb-6 leading-relaxed">
                  {t("empty_other_desc")}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("chaussures");
                    setActiveCategory("all");
                  }}
                  className="rounded-full bg-[#990006] text-white px-6 py-2.5 text-xs font-semibold shadow-sm hover:bg-[#7d0005] transition cursor-pointer"
                >
                  {t("btn_explore_shoes")}
                </button>
              </>
            ) : activeCategory.toLowerCase() === "souliers" ? (
              <>
                <div className="text-5xl mb-4">👞</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {isEn ? "Dress shoes coming soon" : "Collection Souliers bientôt disponible"}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mb-6 leading-relaxed">
                  {isEn
                    ? "Our collection of dress shoes will be available very soon in our catalog."
                    : "Nos modèles de souliers arrivent très bientôt dans notre catalogue."}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  className="rounded-full bg-[#990006] text-white px-6 py-2.5 text-xs font-semibold shadow-sm hover:bg-[#7d0005] transition cursor-pointer"
                >
                  {t("view_all_pairs")}
                </button>
              </>
            ) : (
              <>
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t("no_product_found")}
                </h3>
                <p className="text-gray-500 text-xs mb-6">
                  {t("no_product_sub")}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("chaussures");
                    setActiveCategory("all");
                    if (searchQuery) {
                      setSearchParams({});
                    }
                  }}
                  className="rounded-full bg-[#990006] text-white px-6 py-2.5 text-xs font-semibold shadow hover:bg-[#7d0005] transition cursor-pointer"
                >
                  {t("view_all_pairs")}
                </button>
              </>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
