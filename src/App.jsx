import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { PreferencesProvider } from "@/context/PreferencesContext";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloatingButton from "@/components/common/WhatsAppFloatingButton";
import PwaInstallPrompt from "@/components/common/PwaInstallPrompt";

import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";

// Fait défiler automatiquement vers le haut ou vers l'ancre demandée lors d'un changement de page
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <PreferencesProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col bg-white text-[#1d1d1d] antialiased">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Redirections propres vers l'accueil pour les anciennes URLs de catalogue et panier */}
              <Route path="/shop" element={<Navigate to="/" replace />} />
              <Route path="/catalogue" element={<Navigate to="/" replace />} />
              <Route path="/cart" element={<Navigate to="/" replace />} />
              <Route path="/panier" element={<Navigate to="/" replace />} />

              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <Footer />
          <WhatsAppFloatingButton />
          <PwaInstallPrompt />
        </div>
      </BrowserRouter>
    </PreferencesProvider>
  );
}
