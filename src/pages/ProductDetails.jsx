import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";
import OrderModal from "../components/OrderModal";

function ProductDetails() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [selectedImage, setSelectedImage] = useState(0);
  const [showOrderModal, setShowOrderModal] = useState(false);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-5">

        <div className="text-center">

          <h1 className="font-['Wosker'] text-5xl text-[#1d1d1d]">
            PRODUIT INTROUVABLE
          </h1>

          <Link
            to="/shop"
            className="mt-6 inline-block bg-[#990006] px-6 py-3 font-sans text-xs font-medium uppercase tracking-wider text-white"
          >
            Retour au catalogue
          </Link>

        </div>

      </main>
    );
  }

  const currentImage = product.images[selectedImage];

  return (
    <main className="min-h-screen bg-white">

      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

        {/* RETOUR */}
        <Link
          to="/shop"
          className="font-sans text-xs font-light uppercase tracking-wider text-[#1d1d1d]/50 transition hover:text-[#990006]"
        >
          ← Retour au catalogue
        </Link>

        {/* PRODUIT */}
        <div className="mt-10 grid gap-12 md:grid-cols-2">

          {/* GALERIE */}
          <div>

            {/* IMAGE PRINCIPALE */}
            <div className="aspect-square bg-[#f5f5f5]">

              <img
                src={currentImage}
                alt={product.name}
                className="h-full w-full object-contain p-8"
              />

            </div>

            {/* MINIATURES */}
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">

                {product.images.map((image, index) => (

                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden bg-[#f5f5f5] ${
                      selectedImage === index
                        ? "ring-2 ring-[#990006]"
                        : ""
                    }`}
                  >

                    <img
                      src={image}
                      alt={`${product.name} vue ${index + 1}`}
                      className="h-full w-full object-contain p-2"
                    />

                  </button>

                ))}

              </div>
            )}

          </div>

          {/* INFORMATIONS */}
          <div className="flex flex-col justify-center">

            <p className="font-sans text-xs font-light uppercase tracking-[0.3em] text-[#1d1d1d]/40">
              {product.brand}
            </p>

            <h1 className="mt-3 font-['Wosker'] text-5xl leading-none text-[#1d1d1d] md:text-6xl">
              {product.name}
            </h1>

            <p className="mt-6 font-sans text-2xl font-medium text-[#990006]">
              {product.price.toLocaleString("fr-FR")} FCFA
            </p>

            <div className="mt-8 border-y border-[#1d1d1d]/10 py-6">

              <p className="font-sans text-xs font-medium uppercase tracking-wider text-[#1d1d1d]/50">
                Qualité
              </p>

              <p className="mt-2 font-sans text-sm font-light text-[#1d1d1d]">
                {product.quality}
              </p>

            </div>

            {/* POINTURES */}
            <div className="mt-6">

              <p className="mb-4 font-sans text-xs font-medium uppercase tracking-wider text-[#1d1d1d]/50">
                Pointures disponibles
              </p>

              <div className="flex flex-wrap gap-2">

                {product.sizes.map((size) => (

                  <button
                    key={size}
                    type="button"
                    className="border border-[#1d1d1d]/15 px-5 py-3 font-sans text-sm font-light transition hover:border-[#990006] hover:text-[#990006]"
                  >
                    {size}
                  </button>

                ))}

              </div>

            </div>

            {/* WHATSAPP */}
           <button
              type="button"
              onClick={() => setShowOrderModal(true)}
              className="mt-10 flex w-full items-center justify-center bg-[#990006] px-7 py-4 font-sans text-xs font-medium uppercase tracking-wider text-white transition hover:bg-[#7d0005]"
            >
              Commander
            </button>

            {showOrderModal && (
              <OrderModal
              product={product}
              onClose={() => setShowOrderModal(false)}
              />
            )}

          </div>

        </div>

      </div>

    </main>
  );
}

export default ProductDetails;