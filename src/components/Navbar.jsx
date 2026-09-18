import { Search, ShoppingBag, Menu } from "lucide-react";
import logo from "../assets/logo1.png";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <a href="/" className="shrink-0">
          <img
            src={logo}
            alt="Vente de Baskets Ici"
            className="h-11 w-auto"
          />
        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          <a
            href="/"
            className="text-sm font-medium text-[#1d1d1d] transition hover:text-[#990006]"
          >
            Accueil
          </a>

          <a
            href="/shop"
            className="text-sm font-medium text-[#1d1d1d] transition hover:text-[#990006]"
          >
            Baskets
          </a>

          <a
            href="/shop"
            className="text-sm font-medium text-[#1d1d1d] transition hover:text-[#990006]"
          >
            Nouveautés
          </a>

          <a
            href="/about"
            className="text-sm font-medium text-[#1d1d1d] transition hover:text-[#990006]"
          >
            À propos
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">

          <button
            type="button"
            aria-label="Rechercher"
            className="rounded-full p-2.5 text-[#1d1d1d] transition hover:bg-gray-100 hover:text-[#990006]"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            aria-label="Panier"
            className="rounded-full p-2.5 text-[#1d1d1d] transition hover:bg-gray-100 hover:text-[#990006]"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            aria-label="Menu"
            className="rounded-full p-2.5 text-[#1d1d1d] transition hover:bg-gray-100 hover:text-[#990006] md:hidden"
          >
            <Menu size={22} strokeWidth={1.8} />
          </button>

        </div>
      </nav>

      {/* Petite ligne de séparation */}
      <div className="h-px bg-gray-100" />
    </header>
  );
}

export default Navbar;