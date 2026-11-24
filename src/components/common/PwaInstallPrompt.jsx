import React, { useState, useEffect } from "react";
import { Download, X, Smartphone } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import logo from "@/assets/logo1.svg";

export default function PwaInstallPrompt() {
  const { language } = usePreferences();
  const isEn = language === "EN";

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Si déjà lancé en mode autonome (PWA installée), ne pas afficher
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) return;

    // Si fermé pour cette session de navigation
    if (sessionStorage.getItem("vdbi_pwa_dismissed") === "true") {
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      // Empêche la mini-infobar native automatique de Chrome
      e.preventDefault();
      // Conserve l'événement pour le déclencher sur action utilisateur
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowPrompt(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      // Déclenche l'invite native de Chrome
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } catch (err) {
      console.warn("Installation PWA :", err);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("vdbi_pwa_dismissed", "true");
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <aside
      aria-label="Installation de l'application VDBI"
      className="fixed bottom-4 left-4 right-20 sm:right-auto sm:max-w-sm z-30 animate-in fade-in slide-in-from-bottom-3 duration-300 max-w-[calc(100vw-5rem)]"
    >
      <div className="rounded-2xl border border-gray-200/90 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 shadow-xl flex items-center justify-between gap-3">
        {/* Logo / Icône & Description */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 p-1">
            <img src={logo} alt="VDBI" className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
              {isEn ? "Install VDBI App" : "Installer l'app VDBI"}
            </h4>
            <p className="text-[10px] sm:text-[11px] text-gray-500 font-light truncate">
              {isEn ? "Add shortcut to home screen" : "Ajouter à l'écran d'accueil"}
            </p>
          </div>
        </div>

        {/* Bouton Installer & Fermer */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleInstallClick}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#990006] text-white text-xs font-semibold shadow-xs hover:bg-[#7d0005] active:scale-95 transition-all cursor-pointer"
          >
            <Download className="h-3 w-3" />
            <span>{isEn ? "Install" : "Installer"}</span>
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Fermer"
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
