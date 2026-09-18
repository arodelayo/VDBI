import { useMemo, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [quality, setQuality] = useState("Toutes");
  const [size, setSize] = useState("Toutes");
  const [sort, setSort] = useState("default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = [
    "Tous",
    ...new Set(products.map((product) => product.category)),
  ];

  const qualities = [
    "Toutes",
    ...new Set(products.map((product) => product.quality)),
  ];

  const sizes = [
    "Toutes",
    ...new Set(products.flatMap((product) => product.sizes)),
  ].sort((a, b) => {
    if (a === "Toutes") return -1;
    if (b === "Toutes") return 1;
    return Number(a) - Number(b);
  });

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "Tous" || product.category === category;

      const matchesQuality =
        quality === "Toutes" || product.quality === quality;

      const matchesSize =
        size === "Toutes" || product.sizes.includes(size);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesQuality &&
        matchesSize
      );
    });

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, category, quality, size, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("Tous");
    setQuality("Toutes");
    setSize("Toutes");
    setSort("default");
  };

  return (
    <main className="min-h-screen bg-white">

      {/* HEADER */}
      <section className="bg-[#1d1d1d] px-5 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl">

          <p className="mb-3 font-sans text-xs font-light uppercase tracking-[0.3em] text-white/60">
            Vente de Baskets Ici
          </p>

          <h1 className="font-['Wosker'] text-5xl leading-none md:text-7xl">
            LE CATALOGUE
          </h1>

          <p className="mt-5 max-w-xl font-sans text-sm font-extralight leading-7 text-white/60">
            Explorez notre sélection de baskets disponibles.
          </p>

        </div>
      </section>

      {/* CATALOGUE */}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

        {/* RECHERCHE + BOUTON FILTRE MOBILE */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div className="w-full sm:max-w-md">
            <label
              htmlFor="search"
              className="mb-3 block font-sans text-xs font-medium uppercase tracking-wider text-[#1d1d1d]"
            >
              Rechercher une paire
            </label>

            <input
              id="search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nom du modèle..."
              className="w-full border-b border-[#1d1d1d]/20 bg-transparent px-0 py-3 font-sans text-sm font-light outline-none transition placeholder:text-[#1d1d1d]/30 focus:border-[#990006]"
            />
          </div>

          {/* Bouton mobile */}
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="flex items-center justify-center gap-3 border border-[#1d1d1d]/15 px-5 py-3 font-sans text-xs font-medium uppercase tracking-wider text-[#1d1d1d] transition hover:border-[#990006] hover:text-[#990006] lg:hidden"
          >
            Filtrer
          </button>

        </div>

        {/* FILTRES DESKTOP */}
        <div className="mt-10 hidden border-y border-[#1d1d1d]/10 py-6 lg:block">

          <div className="grid gap-5 grid-cols-4">

            {/* Catégorie */}
            <FilterSelect
              label="Catégorie"
              value={category}
              onChange={setCategory}
              options={categories}
            />

            {/* Qualité */}
            <FilterSelect
              label="Qualité"
              value={quality}
              onChange={setQuality}
              options={qualities}
            />

            {/* Pointure */}
            <FilterSelect
              label="Pointure"
              value={size}
              onChange={setSize}
              options={sizes}
            />

            {/* Tri */}
            <FilterSelect
              label="Trier par"
              value={sort}
              onChange={setSort}
              options={[
                { value: "default", label: "Pertinence" },
                { value: "price-asc", label: "Prix : moins cher" },
                { value: "price-desc", label: "Prix : plus cher" },
                { value: "name", label: "Nom : A → Z" },
              ]}
            />

          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={resetFilters}
              className="font-sans text-xs font-light text-[#1d1d1d]/50 underline underline-offset-4 transition hover:text-[#990006]"
            >
              Réinitialiser les filtres
            </button>
          </div>

        </div>

        {/* PANNEAU MOBILE */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">

            {/* Fond sombre */}
            <button
              type="button"
              aria-label="Fermer les filtres"
              onClick={() => setFiltersOpen(false)}
              className="absolute inset-0 bg-black/40"
            />

            {/* Panneau */}
            <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-white px-5 pb-8 pt-6">

              <div className="mb-8 flex items-center justify-between">

                <h2 className="font-['Wosker'] text-3xl text-[#1d1d1d]">
                  FILTRES
                </h2>

                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="font-sans text-2xl font-light text-[#1d1d1d]"
                  aria-label="Fermer"
                >
                  ×
                </button>

              </div>

              <div className="space-y-6">

                <FilterSelect
                  label="Catégorie"
                  value={category}
                  onChange={setCategory}
                  options={categories}
                />

                <FilterSelect
                  label="Qualité"
                  value={quality}
                  onChange={setQuality}
                  options={qualities}
                />

                <FilterSelect
                  label="Pointure"
                  value={size}
                  onChange={setSize}
                  options={sizes}
                />

                <FilterSelect
                  label="Trier par"
                  value={sort}
                  onChange={setSort}
                  options={[
                    { value: "default", label: "Pertinence" },
                    { value: "price-asc", label: "Prix : moins cher" },
                    { value: "price-desc", label: "Prix : plus cher" },
                    { value: "name", label: "Nom : A → Z" },
                  ]}
                />

              </div>

              <div className="mt-8 flex gap-3">

                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex-1 border border-[#1d1d1d]/15 px-5 py-4 font-sans text-xs font-medium uppercase tracking-wider text-[#1d1d1d]"
                >
                  Réinitialiser
                </button>

                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="flex-1 bg-[#990006] px-5 py-4 font-sans text-xs font-medium uppercase tracking-wider text-white"
                >
                  Voir les résultats
                </button>

              </div>

            </div>
          </div>
        )}

        {/* RESULTATS */}
        <div className="mb-6 mt-10 flex items-center justify-between">

          <p className="font-sans text-xs font-light text-[#1d1d1d]/50">
            {filteredProducts.length}{" "}
            {filteredProducts.length > 1
              ? "produits"
              : "produit"}
          </p>

        </div>

        {/* PRODUITS */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>
        ) : (
          <div className="py-24 text-center">

            <p className="font-sans text-sm font-light text-[#1d1d1d]/50">
              Aucun produit ne correspond à vos critères.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 font-sans text-xs font-medium uppercase tracking-wider text-[#990006] underline underline-offset-4"
            >
              Réinitialiser
            </button>

          </div>
        )}

      </section>
    </main>
  );
}


/* --------------------------------------------------
   COMPOSANT SELECT
-------------------------------------------------- */

function FilterSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-2 block font-sans text-[10px] font-medium uppercase tracking-wider text-[#1d1d1d]/50">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#1d1d1d]/15 bg-white px-4 py-3 font-sans text-sm font-light outline-none focus:border-[#990006]"
      >
        {options.map((option) => {
          const isObject =
            typeof option === "object";

          const optionValue = isObject
            ? option.value
            : option;

          const optionLabel = isObject
            ? option.label
            : option;

          return (
            <option
              key={optionValue}
              value={optionValue}
            >
              {optionLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Shop;