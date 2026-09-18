function WhatsAppCTA() {
  const whatsappNumber = "2290151930994"; // Remplace par ton numéro WhatsApp

  const message = encodeURIComponent(
    "Bonjour VDBI, je souhaite avoir des informations sur une paire de baskets."
  );

  return (
    <section className="bg-[#990006] px-5 py-20 text-white md:py-24">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">

          {/* Texte */}
          <div className="max-w-2xl">

            <p className="mb-4 font-sans text-xs font-light uppercase tracking-[0.3em] text-white/70">
              Une paire vous plaît ?
            </p>

            <h2 className="font-['Wosker'] text-5xl leading-[0.95] md:text-7xl">
              PARLONS-EN.
            </h2>

            <p className="mt-6 max-w-lg font-sans text-sm font-extralight leading-7 text-white/80">
              Vous avez trouvé votre paire ? Contactez-nous directement
              sur WhatsApp pour vérifier la disponibilité et passer votre
              commande.
            </p>

          </div>

          {/* Bouton */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center border border-white px-7 py-4 font-sans text-xs font-medium uppercase tracking-wider text-white transition hover:bg-white hover:text-[#990006]"
          >
            Commander sur WhatsApp
          </a>

        </div>

      </div>
    </section>
  );
}

export default WhatsAppCTA;