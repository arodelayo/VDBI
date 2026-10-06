import { useState } from "react";
import {
  Search,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) return;

    navigate(`/shop?search=${encodeURIComponent(query)}`);

    setSearch("");
    setSearchOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white">

      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="shrink-0"
          onClick={closeMenu}
        >
          <img
            src={logo}
            alt="Vente de Baskets Ici"
            className="h-11 w-auto"
          />
        </Link>

        {/* Navigation desktop */}
        <div className="hidden items-center gap-10 md:flex">

          <Link
            to="/"
            className="text-sm font-medium text-[#1d1d1d] transition hover:text-[#990006]"
          >
            Accueil
          </Link>

          <Link
            to="/shop"
            className="text-sm font-medium text-[#1d1d1d] transition hover:text-[#990006]"
          >
            Baskets
          </Link>

          <Link
            to="/shop?filter=new"
            className="text-sm font-medium text-[#1d1d1d] transition hover:text-[#990006]"
          >
            Nouveautés
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium text-[#1d1d1d] transition hover:text-[#990006]"
          >
            À propos
          </Link>

        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">

          {/* Recherche */}
          <button
            type="button"
            aria-label="Rechercher"
            onClick={() => setSearchOpen((value) => !value)}
            className={`rounded-full p-2.5 text-[#1d1d1d] transition hover:bg-gray-100 hover:text-[#990006] ${
              searchOpen ? "bg-gray-100 text-[#990006]" : ""
            }`}
          >
            {searchOpen ? (
              <X size={20} strokeWidth={1.8} />
            ) : (
              <Search size={20} strokeWidth={1.8} />
            )}
          </button>

          {/* Menu mobile */}
          <button
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className="rounded-full p-2.5 text-[#1d1d1d] transition hover:bg-gray-100 hover:text-[#990006] md:hidden"
          >
            {menuOpen ? (
              <X size={22} strokeWidth={1.8} />
            ) : (
              <Menu size={22} strokeWidth={1.8} />
            )}
          </button>

        </div>
      </nav>

      {/* Barre de recherche */}
      <div
        className={`overflow-hidden border-t border-gray-100 transition-all duration-300 ${
          searchOpen
            ? "max-h-24 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <form
          onSubmit={handleSearch}
          className="mx-auto flex max-w-7xl px-5 py-3 lg:px-8"
        >
          <div className="flex w-full items-center border-b border-[#1d1d1d]/20">

            <Search
              size={18}
              strokeWidth={1.8}
              className="mr-3 shrink-0 text-[#1d1d1d]/50"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher une paire..."
              className="w-full bg-transparent py-2 font-sans text-sm text-[#1d1d1d] outline-none placeholder:text-[#1d1d1d]/40"
              autoFocus={searchOpen}
            />

          </div>
        </form>
      </div>

      {/* Menu mobile */}
      <div
        className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 md:hidden ${
          menuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-4">

          <Link
            to="/"
            onClick={closeMenu}
            className="block border-b border-gray-100 py-4 text-sm font-medium text-[#1d1d1d] transition hover:text-[#990006]"
          >
            Accueil
          </Link>

          <Link
            to="/shop"
            onClick={closeMenu}
            className="block border-b border-gray-100 py-4 text-sm font-medium text-[#1d1d1d] transition hover:text-[#990006]"
          >
            Baskets
          </Link>

          <Link
            to="/shop?filter=new"
            onClick={closeMenu}
            className="block border-b border-gray-100 py-4 text-sm font-medium text-[#1d1d1d] transition hover:text-[#990006]"
          >
            Nouveautés
          </Link>

          <Link
            to="/about"
            onClick={closeMenu}
            className="block py-4 text-sm font-medium text-[#1d1d1d] transition hover:text-[#990006]"
          >
            À propos
          </Link>

        </div>
      </div>

      {/* Ligne de séparation */}
      <div className="h-px bg-gray-100" />

    </header>
  );
}

export default Navbar;