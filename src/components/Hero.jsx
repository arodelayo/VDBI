





import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";

function ShoeCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const next = useCallback(() => {
    setIndex((current) => (current + 1) % products.length);
  }, []);

  useEffect(() => {
    if (paused || products.length <= 1) return;

    timerRef.current = setInterval(next, 3500);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [paused, next]);

  if (!products.length) return null;

  const current = products[index];

  const goTo = (newIndex) => {
    setIndex(newIndex);
    setPaused(true);

    // Reprend le défilement après 6 secondes
    setTimeout(() => {
      setPaused(false);
    }, 6000);
  };

  return (
    <div className="vdbi-rise vdbi-rise-3 flex flex-col items-center">

      {/* Produit cliquable */}
      <Link
        to={`/product/${current.id}`}
        className="group block w-full max-w-[550px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >

        <div className="relative flex h-[380px] w-full items-center justify-center overflow-hidden">

          {products.map((product, i) => (
            <img
              key={product.id}
              src={product.images[0]}
              alt={product.name}
              className={`absolute h-auto w-full max-w-[500px] object-contain transition-all duration-700 ease-out ${
                i === index
                  ? "translate-x-0 scale-100 opacity-100"
                  : i < index
                  ? "-translate-x-12 scale-95 opacity-0"
                  : "translate-x-12 scale-95 opacity-0"
              }`}
            />
          ))}

          {/* Petit indicateur */}
          <span className="absolute bottom-4 rounded-full bg-[#1d1d1d]/70 px-4 py-2 font-sans text-[10px] uppercase tracking-wider text-white opacity-0 transition group-hover:opacity-100">
            Voir le produit
          </span>

        </div>

        {/* Informations */}
        <div className="mt-6 text-center">

          <p className="font-sans text-base font-medium">
            {current.name}
          </p>

          <p className="mt-1 font-sans text-lg font-semibold text-text-white/70">
            {current.price.toLocaleString("fr-FR")} FCFA
          </p>

        </div>

      </Link>

      {/* Points de navigation */}
      <div className="mt-5 flex items-center gap-2">

        {products.map((product, i) => (
          <button
            key={product.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Voir ${product.name}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index
                ? "w-7 bg-[#990006]"
                : "w-1.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}

      </div>

    </div>
  );
}


function Hero() {
  return (
    <section className="bg-[#1d1d1d] text-white">
      <style>{`
        @keyframes vdbi-rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .vdbi-rise {
          opacity: 0;
          animation: vdbi-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .vdbi-rise-1 { animation-delay: 0.05s; }
        .vdbi-rise-2 { animation-delay: 0.18s; }
        .vdbi-rise-3 { animation-delay: 0.30s; }
        .vdbi-rise-4 { animation-delay: 0.42s; }
        .vdbi-rise-5 { animation-delay: 0.54s; }

        @media (prefers-reduced-motion: reduce) {
          .vdbi-rise { opacity: 1; animation: none; transform: none; }
        }
      `}</style>

      <div className="mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 lg:px-8">

        {/* Texte */}
        <div className="max-w-3xl">
          <p className="vdbi-rise vdbi-rise-1 mb-5 font-sans text-sm font-light uppercase tracking-[0.3em] text-white/70">
            Vente de Baskets Ici
          </p>

          <h1 className="font-['Wosker'] text-6xl leading-[0.9] md:text-7xl lg:text-7xl">
            <span className="vdbi-rise vdbi-rise-2 block">DES BASKETS</span>
            <span className="vdbi-rise vdbi-rise-3 block">QUI FONT</span>
            <span className="vdbi-rise vdbi-rise-4 block text-[#990006]">
              LA DIFFÉRENCE.
            </span>
          </h1>

          <p className="vdbi-rise vdbi-rise-4 mt-8 max-w-md font-sans text-base font-extralight leading-7 text-gray-300">
            Découvrez notre sélection de baskets disponibles
            et trouvez votre prochaine paire.
          </p>

          <a
            href="/shop"
            className="vdbi-rise vdbi-rise-5 mt-8 inline-flex items-center border-3 border-[#990006] bg-transparent px-7 py-4 font-sans text-sm font-medium uppercase tracking-wider transition hover:bg-[#7d0005]"
          >
            Voir le catalogue
          </a>
        </div>

        {/* Carrousel de baskets avec prix */}
        <ShoeCarousel />

      </div>
    </section>
  );
}

export default Hero;
