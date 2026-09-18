import { products } from "../data/products";
import ProductCard from "./ProductCard";

function NewArrivals() {
  const newProducts = products
    .filter((product) => product.isNew && product.available)
    .slice(0, 4);

  return (
    <section  id="nouveautes"
     className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* En-tête */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 font-sans text-xs font-light uppercase tracking-[0.3em] text-[#990006]">
              Les dernières arrivées
            </p>

            <h2 className="font-['Wosker'] text-5xl leading-none text-[#1d1d1d] md:text-6xl">
              NOUVEAUTÉS
            </h2>
          </div>

          <a
            href="/shop"
            className="hidden border-b border-[#990006] pb-1 font-sans text-xs font-medium uppercase tracking-wider text-[#1d1d1d] transition hover:text-[#990006] sm:block"
          >
            Voir tout
          </a>
        </div>

        {/* Produits */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-6">
          {newProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* Bouton mobile */}
        <div className="mt-12 text-center sm:hidden">
          <a
            href="/shop"
            className="inline-flex border border-[#1d1d1d] px-7 py-3 font-sans text-xs font-medium uppercase tracking-wider text-[#1d1d1d] transition hover:bg-[#1d1d1d] hover:text-white"
          >
            Voir tout
          </a>
        </div>

      </div>
    </section>
  );
}

export default NewArrivals;