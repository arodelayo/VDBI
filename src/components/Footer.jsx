function Footer() {
  return (
    <footer className="bg-[#1d1d1d] text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Logo / présentation */}
          <div className="md:col-span-2">
            <h2 className="font-['Wosker'] text-4xl text-white">
              VDBI
            </h2>

            <p className="mt-4 max-w-sm font-sans text-sm font-extralight leading-7 text-white/60">
              Vente de baskets en ligne. Découvrez nos modèles disponibles
              et trouvez votre prochaine paire.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#990006]">
              Navigation
            </h3>

            <nav className="mt-5 flex flex-col gap-3">
              <a
                href="/"
                className="font-sans text-sm font-extralight text-white/70 transition hover:text-white"
              >
                Accueil
              </a>

              <a
                href="/shop"
                className="font-sans text-sm font-extralight text-white/70 transition hover:text-white"
              >
                Baskets
              </a>

              <a
                href="/#nouveautes"
                className="font-sans text-sm font-extralight text-white/70 transition hover:text-white"
              >
                Nouveautés
              </a>

              <a
                href="/about"
                className="font-sans text-sm font-extralight text-white/70 transition hover:text-white"
              >
                À propos
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#990006]">
              Contact
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href="https://wa.me/2290151930994"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm font-extralight text-white/70 transition hover:text-white"
              >
                WhatsApp
              </a>

              <a
                href="https://www.instagram.com/vente_de_baskets_ici_/"
                className="font-sans text-sm font-extralight text-white/70 transition hover:text-white"
              >
                Instagram
              </a>

              <a
                href="https://www.tiktok.com/@vente_de_baskets_ici?_r=1&_t=ZS-99dc4TLA073"
                className="font-sans text-sm font-extralight text-white/70 transition hover:text-white"
              >
                TikTok
              </a>
            </div>
          </div>

        </div>

        {/* Ligne du bas */}
        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <p className="font-sans text-xs font-extralight text-white/40">
              © {new Date().getFullYear()} Vente de Baskets Ici. Tous droits réservés.
            </p>

            <p className="font-sans text-xs font-extralight text-white/40">
              VDBI
            </p>

          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;