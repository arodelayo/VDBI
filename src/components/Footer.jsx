import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";

function Footer() {
return ( <footer className="bg-[#1d1d1d] text-white"> <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8"> <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

      {/* Logo et présentation */}
      <div className="sm:col-span-2">
        <Link to="/" className="inline-block">
          <h2 className="font-['Wosker'] text-4xl text-white">
            VDBI<span className="text-[#990006]">.</span>
          </h2>
        </Link>

        <p className="mt-4 max-w-sm font-sans text-sm font-extralight leading-7 text-white/60">
          Vente de Baskets Ici vous accompagne dans la découverte de
          modèles de baskets variés. Explorez notre catalogue et
          contactez-nous pour vérifier les disponibilités et commander
          votre prochaine paire.
        </p>

        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 border border-white/20 px-5 py-3 font-sans text-xs uppercase tracking-wider transition hover:border-[#990006] hover:bg-[#990006]"
        >
          Découvrir le catalogue
          <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* Navigation */}
      <div>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#990006]">
          Navigation
        </h3>

        <nav className="mt-5 flex flex-col items-start gap-4">
          <Link
            to="/"
            className="font-sans text-sm font-extralight text-white/70 transition hover:text-white"
          >
            Accueil
          </Link>

          <Link
            to="/shop"
            className="font-sans text-sm font-extralight text-white/70 transition hover:text-white"
          >
            Toutes les baskets
          </Link>

          <Link
            to="/shop?filter=new"
            className="font-sans text-sm font-extralight text-white/70 transition hover:text-white"
          >
            Nouveautés
          </Link>

          <Link
            to="/about"
            className="font-sans text-sm font-extralight text-white/70 transition hover:text-white"
          >
            À propos
          </Link>
        </nav>
      </div>

      {/* Contact et points de vente */}
      <div>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#990006]">
          Nous contacter
        </h3>

        <div className="mt-5 flex flex-col items-start gap-4">
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
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-extralight text-white/70 transition hover:text-white"
          >
            Instagram
          </a>

          <a
            href="https://www.tiktok.com/@vente_de_baskets_ici?_r=1&_t=ZS-99dc4TLA073"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-extralight text-white/70 transition hover:text-white"
          >
            TikTok
          </a>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5">
          <h3 className="flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.15em] text-white/80">
            <MapPin size={15} className="text-[#990006]" />
            Points de vente
          </h3>

          <p className="mt-3 font-sans text-xs font-extralight leading-6 text-white/50">
            Vous souhaitez acheter ou récupérer une commande en personne ?
            Contactez-nous pour connaître les possibilités selon votre
            localisation.
          </p>

          <a
            href="https://wa.me/2290151930994"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 font-sans text-xs text-white/70 transition hover:text-white"
          >
            Vérifier les possibilités
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </div>

    {/* Ligne du bas */}
    <div className="mt-14 border-t border-white/10 pt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-xs font-extralight text-white/40">
          © {new Date().getFullYear()} Vente de Baskets Ici. Tous droits
          réservés.
        </p>

        <p className="font-sans text-xs font-extralight tracking-widest text-white/40">
          VDBI
        </p>
      </div>
    </div>
  </div>
</footer>

);
}

export default Footer;
