import { useState } from "react";

function OrderModal({ product, onClose }) {
  const [form, setForm] = useState({
    firstName: "",
    sizes: [],
    color: product.color || "",
    quantity: 1,
    city: "",
    area: "",
    locationDetails: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSizeChange = (size) => {
  setForm((prev) => {
    const currentSizes = prev.sizes ?? [];

      const updatedSizes = currentSizes.includes(size)

      ? currentSizes.filter((selectedSize) => selectedSize !== size)
      : [...currentSizes, size];

    return {
      ...prev,
      sizes: updatedSizes,
      quantity: updatedSizes.length,
    };
  });
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.sizes.length === 0) {
  alert("Veuillez sélectionner au moins une pointure.");
  return;
}

    const message = `
Bonjour, je souhaite commander :

Pointure(s) : ${(form.sizes ?? []).join(", ")}

Marque : ${product.brand}
Couleur : ${form.color}
Pointure : ${form.size}
Quantité : ${form.quantity}

Lieu de livraison :
Ville / commune : ${form.city}
Quartier / zone : ${form.area}
Repère : ${form.locationDetails || "Non précisé"}

Nom : ${form.firstName}

Demande particulière :
${form.note || "Aucune"}

Merci de me confirmer la disponibilité ainsi que les frais de livraison.
    `.trim();

    const whatsappNumber = "2290151930994";

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto bg-white p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >

        {/* EN-TÊTE */}
        <div className="mb-7 flex items-start justify-between gap-4">

          <div>
            <p className="font-sans text-[10px] font-light uppercase tracking-[0.25em] text-[#1d1d1d]/40">
              Demande de commande
            </p>

            <h2 className="mt-2 font-['Wosker'] text-3xl text-[#1d1d1d]">
              {product.name}
            </h2>

            <p className="mt-1 font-sans text-sm font-medium text-[#990006]">
              {product.price.toLocaleString("fr-FR")} FCFA
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#1d1d1d]/10 font-sans text-xl font-light text-[#1d1d1d] transition hover:border-[#990006] hover:text-[#990006]"
            aria-label="Fermer"
          >
            ×
          </button>

        </div>

        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* PRÉNOM */}
          <div>
            <label
              htmlFor="firstName"
              className="mb-2 block font-sans text-xs font-medium uppercase tracking-wider text-[#1d1d1d]/60"
            >
              Prénom *
            </label>

            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={form.firstName}
              onChange={handleChange}
              placeholder="Votre prénom"
              className="w-full border border-[#1d1d1d]/10 bg-[#f8f8f8] px-4 py-3 font-sans text-sm font-light outline-none transition focus:border-[#990006]"
            />
          </div>

          {/* POINTURES */}

<div>
  <p className="mb-3 font-sans text-xs font-medium uppercase tracking-wider text-[#1d1d1d]/60">
    Pointures * — Sélectionnez une ou plusieurs pointures
  </p>

  <div className="flex flex-wrap gap-2">
    {product.sizes.map((size) => {
      const selected = (form.sizes ?? []).includes(size);


  return (
    <button
      key={size}
      type="button"
      onClick={() => handleSizeChange(size)}
      aria-pressed={selected}
      className={`flex h-12 min-w-12 items-center justify-center border px-4 font-sans text-sm transition-colors ${
        selected
          ? "border-[#990006] bg-[#990006] text-white"
          : "border-[#1d1d1d]/15 bg-white text-[#1d1d1d] hover:border-[#990006]"
      }`}
    >
      {size}
    </button>
  );
})}

  </div>

{form.sizes.length === 0 && ( <p className="mt-2 font-sans text-xs text-[#990006]">
Veuillez sélectionner au moins une pointure. </p>
)}

</div>


          {/* COULEUR */}
          <div>
            <label
              htmlFor="color"
              className="mb-2 block font-sans text-xs font-medium uppercase tracking-wider text-[#1d1d1d]/60"
            >
              Couleur
            </label>

            <input
              id="color"
              name="color"
              type="text"
              value={form.color}
              onChange={handleChange}
              placeholder="Ex : White"
              className="w-full border border-[#1d1d1d]/10 bg-[#f8f8f8] px-4 py-3 font-sans text-sm font-light outline-none transition focus:border-[#990006]"
            />
          </div>

          {/* QUANTITÉ */}
          <div>
            <label
              htmlFor="quantity"
              className="mb-2 block font-sans text-xs font-medium uppercase tracking-wider text-[#1d1d1d]/60"
            >
              Quantité
            </label>

            <div className="flex w-fit items-center border border-[#1d1d1d]/10">

             <div>
  <p className="mb-2 font-sans text-xs font-medium uppercase tracking-wider text-[#1d1d1d]/60">
    Quantité totale
  </p>

  <p className="font-sans text-lg font-semibold text-[#1d1d1d]">
    {form.quantity} paire{form.quantity > 1 ? "s" : ""}
  </p>
</div>

            </div>
          </div>

          {/* VILLE */}
          <div>
            <label
              htmlFor="city"
              className="mb-2 block font-sans text-xs font-medium uppercase tracking-wider text-[#1d1d1d]/60"
            >
              Ville / commune *
            </label>

            <input
              id="city"
              name="city"
              type="text"
              required
              value={form.city}
              onChange={handleChange}
              placeholder="Ex : Cotonou"
              className="w-full border border-[#1d1d1d]/10 bg-[#f8f8f8] px-4 py-3 font-sans text-sm font-light outline-none transition focus:border-[#990006]"
            />
          </div>

          {/* QUARTIER */}
          <div>
            <label
              htmlFor="area"
              className="mb-2 block font-sans text-xs font-medium uppercase tracking-wider text-[#1d1d1d]/60"
            >
              Quartier / zone *
            </label>

            <input
              id="area"
              name="area"
              type="text"
              required
              value={form.area}
              onChange={handleChange}
              placeholder="Ex : Akpakpa"
              className="w-full border border-[#1d1d1d]/10 bg-[#f8f8f8] px-4 py-3 font-sans text-sm font-light outline-none transition focus:border-[#990006]"
            />
          </div>

          {/* REPÈRE */}
          <div>
            <label
              htmlFor="locationDetails"
              className="mb-2 block font-sans text-xs font-medium uppercase tracking-wider text-[#1d1d1d]/60"
            >
              Repère ou précision
            </label>

            <textarea
              id="locationDetails"
              name="locationDetails"
              value={form.locationDetails}
              onChange={handleChange}
              rows="2"
              placeholder="Ex : près de..."
              className="w-full resize-none border border-[#1d1d1d]/10 bg-[#f8f8f8] px-4 py-3 font-sans text-sm font-light outline-none transition focus:border-[#990006]"
            />
          </div>

          {/* NOTE */}
          <div>
            <label
              htmlFor="note"
              className="mb-2 block font-sans text-xs font-medium uppercase tracking-wider text-[#1d1d1d]/60"
            >
              Demande particulière
            </label>

            <textarea
              id="note"
              name="note"
              value={form.note}
              onChange={handleChange}
              rows="2"
              placeholder="Une précision concernant votre commande..."
              className="w-full resize-none border border-[#1d1d1d]/10 bg-[#f8f8f8] px-4 py-3 font-sans text-sm font-light outline-none transition focus:border-[#990006]"
            />
          </div>

          {/* INFO */}
          <div className="bg-[#f8f8f8] p-4">
            <p className="font-sans text-xs font-light leading-5 text-[#1d1d1d]/60">
              La disponibilité de l'article et les frais de livraison
              seront confirmés avant toute validation de la commande.
            </p>
          </div>

          {/* BOUTON */}
          <button
            type="submit"
            className="w-full bg-[#990006] px-6 py-4 font-sans text-xs font-medium uppercase tracking-wider text-white transition hover:bg-[#7d0005]"
          >
            Continuer sur WhatsApp
          </button>

        </form>
      </div>
    </div>
  );
}

export default OrderModal;