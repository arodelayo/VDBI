import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, Mail } from "lucide-react";
import logo from "@/assets/logo1.svg";
import { usePreferences } from "@/context/PreferencesContext";

export default function Header() {
  const { language, setLanguage, currency, setCurrency, t } = usePreferences();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    setIsVisible(window.scrollY <= 10);
    setIsScrolled(window.scrollY > 10);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      if (currentScrollY <= 10) {
        // Réapparaît uniquement lorsqu'on revient tout en haut
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Part vers le haut dès qu'on scrolle vers le bas
        setIsVisible(false);
        setIsMobileOpen(false);
        setIsSearchOpen(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsSearchOpen(false);
    if (window.scrollY <= 10) {
      setIsVisible(true);
    }
  }, [location.pathname, location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      navigate(`/?search=${encodeURIComponent(q)}`);
    } else {
      navigate("/");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out max-w-full overflow-x-hidden ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-md"
          : "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-xs"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 max-w-full">
        <div className="flex items-center justify-between gap-3 sm:gap-4 max-w-full">
          
          {/* Logo gauche */}
          <div className="flex items-center shrink-0">
            <Link
              to="/"
              className="flex items-center transition-transform duration-200 hover:scale-[1.02]"
              aria-label="VDBI Accueil"
            >
              <img src={logo} alt="VDBI - Vente de Baskets Ici" className="h-9 sm:h-12 w-auto object-contain" />
            </Link>
          </div>

          {/* Barre de recherche centrale */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="search"
                placeholder={t("search_placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#990006] focus:border-transparent transition-all bg-gray-50/60 focus:bg-white"
                aria-label="Rechercher des produits"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>

          {/* Actions Droite : Sur mobile uniquement Loupe + Burger. Sur desktop : Devise, Langue, Contact */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            
            {/* Loupe mobile */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
              aria-label="Recherche"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Sélecteur de Devise : FCFA / USD (Desktop uniquement) */}
            <div
              className="hidden md:inline-flex items-center rounded-xl bg-gray-100/80 p-0.5 border border-gray-200/80 text-xs font-semibold"
              aria-label="Sélecteur de devise"
            >
              <button
                type="button"
                onClick={() => setCurrency("FCFA")}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  currency === "FCFA"
                    ? "bg-white text-[#990006] shadow-xs font-bold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                FCFA
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  currency === "USD"
                    ? "bg-white text-[#990006] shadow-xs font-bold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                USD ($)
              </button>
            </div>

            {/* Sélecteur de Langue épuré : FR / EN (Desktop uniquement) */}
            <div
              className="hidden md:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold select-none px-1"
              aria-label="Sélecteur de langue"
            >
              <button
                type="button"
                onClick={() => setLanguage("FR")}
                className={`transition-colors cursor-pointer py-1 px-1 ${
                  language === "FR"
                    ? "text-[#990006] font-bold"
                    : "text-gray-500 hover:text-gray-900 font-medium"
                }`}
                aria-pressed={language === "FR"}
              >
                FR
              </button>
              <span className="text-gray-300 font-light select-none">/</span>
              <button
                type="button"
                onClick={() => setLanguage("EN")}
                className={`transition-colors cursor-pointer py-1 px-1 ${
                  language === "EN"
                    ? "text-[#990006] font-bold"
                    : "text-gray-500 hover:text-gray-900 font-medium"
                }`}
                aria-pressed={language === "EN"}
              >
                EN
              </button>
            </div>

            {/* Bouton Contact à l'extrême droite (Desktop uniquement) */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-[#990006] text-white border border-[#990006] hover:bg-[#7d0005] hover:border-[#7d0005] shadow-xs hover:shadow transition-all active:scale-95"
            >
              <Mail className="h-4 w-4" />
              <span>{t("nav_contact")}</span>
            </Link>

            {/* Menu burger mobile */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
              aria-label="Menu de navigation"
            >
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

          </div>
        </div>

        {/* Déroulé recherche mobile */}
        {isSearchOpen && (
          <div className="md:hidden mt-3 pb-2 animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                placeholder={t("search_placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#990006] focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>
        )}

        {/* Menu mobile déroulant */}
        {isMobileOpen && (
          <nav className="md:hidden mt-3 pt-3 border-t border-gray-200 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2.5 pb-3">
              {/* 1. LIEN ACCUEIL TOUT EN HAUT */}
              <Link
                to="/"
                onClick={() => setIsMobileOpen(false)}
                className="py-2.5 px-3.5 rounded-xl text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#990006] transition-colors"
              >
                {t("nav_home")}
              </Link>

              {/* 2. LIEN À PROPOS */}
              <Link
                to="/about"
                onClick={() => setIsMobileOpen(false)}
                className="py-2 px-3.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-[#990006] transition-colors"
              >
                {t("nav_about")}
              </Link>

              {/* SÉLECTEURS EN BAS : Devise, Langue, puis bouton Contact */}
              <div className="pt-3 border-t border-gray-100 space-y-2.5">
                
                {/* Devise */}
                <div className="flex items-center justify-between py-1.5 px-1">
                  <span className="text-xs font-semibold text-gray-500">{t("currency")} :</span>
                  <div className="inline-flex rounded-lg bg-gray-100 p-0.5 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setCurrency("FCFA")}
                      className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                        currency === "FCFA" ? "bg-white text-[#990006] shadow-xs font-bold" : "text-gray-600"
                      }`}
                    >
                      FCFA
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrency("USD")}
                      className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                        currency === "USD" ? "bg-white text-[#990006] shadow-xs font-bold" : "text-gray-600"
                      }`}
                    >
                      USD ($)
                    </button>
                  </div>
                </div>

                {/* Langue (FR / EN) */}
                <div className="flex items-center justify-between py-1.5 px-1 border-b border-gray-100 pb-3">
                  <span className="text-xs font-semibold text-gray-500">{t("language")} :</span>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold select-none">
                    <button
                      type="button"
                      onClick={() => setLanguage("FR")}
                      className={`py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
                        language === "FR"
                          ? "bg-red-50 text-[#990006] font-bold"
                          : "text-gray-500 hover:text-gray-800 font-medium"
                      }`}
                    >
                      FR
                    </button>
                    <span className="text-gray-300 select-none font-light">/</span>
                    <button
                      type="button"
                      onClick={() => setLanguage("EN")}
                      className={`py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
                        language === "EN"
                          ? "bg-red-50 text-[#990006] font-bold"
                          : "text-gray-500 hover:text-gray-800 font-medium"
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>

                {/* Bouton Contact tout en bas */}
                <Link
                  to="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-[#990006] text-white border border-[#990006] hover:bg-[#7d0005] shadow-xs transition-all active:scale-95"
                >
                  <Mail className="h-4 w-4" />
                  <span>{t("nav_contact")}</span>
                </Link>

              </div>
            </div>
          </nav>
        )}

      </div>
    </header>
  );
}