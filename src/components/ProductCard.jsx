import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="group">

      <Link
        to={`/product/${product.id}`}
        className="block"
      >

        {/* IMAGE */}
        <div className="relative aspect-square overflow-hidden bg-[#f5f5f5]">

          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105"
          />

          {product.isNew && (
            <span className="absolute left-3 top-3 bg-[#990006] px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-wider text-white">
              Nouveau
            </span>
          )}

          {!product.available && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="font-sans text-xs font-medium uppercase tracking-wider text-white">
                Indisponible
              </span>
            </div>
          )}

        </div>

        {/* INFORMATIONS */}
        <div className="pt-4">

          <div className="flex items-start justify-between gap-3">

            <div>
              <p className="mb-1 font-sans text-[10px] font-light uppercase tracking-wider text-[#1d1d1d]/40">
                {product.brand}
              </p>

              <h3 className="font-sans text-sm font-medium text-[#1d1d1d]">
                {product.name}
              </h3>
            </div>

            <p className="shrink-0 font-sans text-sm font-medium text-[#990006]">
              {product.price.toLocaleString("fr-FR")} FCFA
            </p>

          </div>

          <p className="mt-2 font-sans text-xs font-extralight text-[#1d1d1d]/50">
            Pointures : {product.sizes.join(" · ")}
          </p>

        </div>

      </Link>

    </article>
  );
}

export default ProductCard;