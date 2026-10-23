import { Link } from "react-router-dom";
import {
ArrowRight,
ArrowUpRight,
CheckCircle2,
MessageCircle,
ShoppingBag,
Truck,
MapPin,
} from "lucide-react";

function About() {
const advantages = [
{
number: "01",
title: "Un choix varié",
description:
"Explorez notre catalogue et découvrez des modèles de baskets aux styles variés.",
},
{
number: "02",
title: "Un accompagnement personnalisé",
description:
"Nous vous accompagnons pour vérifier la disponibilité du modèle et de votre pointure avant de confirmer votre commande.",
},
{
number: "03",
title: "Une commande simplifiée",
description:
"Contactez-nous directement pour discuter de votre commande et organiser la livraison ou le retrait selon les possibilités.",
},
];

const steps = [
{
number: "01",
title: "Choisissez votre paire",
description:
"Parcourez notre catalogue et sélectionnez le modèle qui vous plaît.",
icon: ShoppingBag,
},
{
number: "02",
title: "Contactez notre équipe",
description:
"Précisez votre pointure et votre localisation pour que nous puissions vérifier les disponibilités.",
icon: MessageCircle,
},
{
number: "03",
title: "Confirmez votre commande",
description:
"Après vérification, convenez avec nous des modalités de livraison ou de retrait.",
icon: Truck,
},
];

return ( <main className="bg-white text-[#1d1d1d]">

```
  {/* HERO */}
  <section className="relative overflow-hidden bg-[#1d1d1d] text-white">
    <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#990006]/20 blur-3xl" />

    <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28 lg:px-8">
      <div>
        <p className="mb-6 font-sans text-xs font-medium uppercase tracking-[0.3em] text-[#c51b24]">
          L'univers VDBI
        </p>

        <h1 className="font-['Wosker'] text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
          PLUS QU'UNE
          <br />
          PAIRE DE
          <br />
          <span className="text-[#c51b24]">BASKETS.</span>
        </h1>

        <p className="mt-7 max-w-lg font-sans text-sm font-extralight leading-7 text-white/65 sm:text-base">
          Bienvenue chez Vente de Baskets Ici. Découvrez notre univers,
          explorez nos modèles et bénéficiez d'un accompagnement pour
          commander la paire qui vous correspond.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 bg-[#990006] px-6 py-4 font-sans text-xs font-medium uppercase tracking-wider text-white transition hover:bg-[#bd0008]"
          >
            Explorer le catalogue
            <ArrowRight size={16} />
          </Link>

          <a
            href="https://wa.me/2290151930994"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-white/20 px-6 py-4 font-sans text-xs font-medium uppercase tracking-wider text-white transition hover:border-white/60"
          >
            Nous contacter
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <div className="relative flex min-h-64 items-center justify-center border border-white/10 bg-white/[0.03] p-8 sm:min-h-80">
        <div className="absolute left-5 top-5 h-8 w-8 border-l border-t border-[#990006]" />
        <div className="absolute bottom-5 right-5 h-8 w-8 border-b border-r border-[#990006]" />

        <div className="text-center">
          <p className="font-['Wosker'] text-7xl text-white/10 sm:text-8xl">
            VDBI
          </p>
          <p className="mt-3 font-sans text-xs uppercase tracking-[0.3em] text-white/60">
            Vente de Baskets Ici
          </p>
          <div className="mx-auto mt-5 h-1 w-14 bg-[#990006]" />
        </div>
      </div>
    </div>
  </section>

  {/* PRÉSENTATION */}
  <section className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8">
    <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:gap-16">
      <div>
        <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-[#990006]">
          Qui sommes-nous ?
        </p>

        <h2 className="mt-5 font-['Wosker'] text-4xl leading-tight sm:text-5xl">
          DÉCOUVREZ
          <br />
          <span className="text-[#990006]">VDBI.</span>
        </h2>
      </div>

      <div className="max-w-2xl">
        <p className="font-sans text-base font-light leading-8 text-[#1d1d1d]/75">
          Vente de Baskets Ici est une boutique spécialisée dans la vente
          de baskets. Notre objectif est de vous permettre de découvrir
          différents modèles, de consulter leurs informations et de
          commander plus simplement.
        </p>

        <p className="mt-5 font-sans text-base font-light leading-8 text-[#1d1d1d]/75">
          Nous privilégions le contact avec nos clients afin de vérifier
          les disponibilités, les pointures et les modalités de livraison
          ou de retrait avant la confirmation d'une commande.
        </p>

        <div className="mt-8 flex items-start gap-3 border-l-2 border-[#990006] pl-5">
          <CheckCircle2
            size={20}
            className="mt-1 shrink-0 text-[#990006]"
          />
          <p className="font-sans text-sm font-light leading-7 text-[#1d1d1d]/70">
            Notre priorité : vous renseigner clairement et vous accompagner
            tout au long de votre commande.
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* NOS ENGAGEMENTS */}
  <section className="bg-[#f7f7f7] py-20 sm:py-24">
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="max-w-2xl">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-[#990006]">
          Notre engagement
        </p>

        <h2 className="mt-4 font-['Wosker'] text-4xl leading-tight sm:text-5xl">
          UNE EXPÉRIENCE
          <br />
          <span className="text-[#990006]">PLUS SIMPLE.</span>
        </h2>

        <p className="mt-5 max-w-xl font-sans text-sm font-light leading-7 text-[#1d1d1d]/60">
          Du choix du modèle à la confirmation de votre commande, nous
          souhaitons rendre votre expérience aussi claire et pratique
          que possible.
        </p>
      </div>

      <div className="mt-12 grid gap-px border border-black/5 bg-black/5 md:grid-cols-3">
        {advantages.map((advantage) => (
          <article
            key={advantage.number}
            className="bg-white p-7 transition hover:bg-[#1d1d1d] hover:text-white sm:p-9"
          >
            <span className="font-['Wosker'] text-4xl text-[#990006]">
              {advantage.number}
            </span>

            <h3 className="mt-7 font-sans text-base font-medium">
              {advantage.title}
            </h3>

            <p className="mt-4 font-sans text-sm font-light leading-7 text-[#1d1d1d]/60 transition group-hover:text-white/60">
              {advantage.description}
            </p>

            <div className="mt-8 h-px w-12 bg-[#990006]" />
          </article>
        ))}
      </div>
    </div>
  </section>

  {/* COMMENT COMMANDER */}
  <section className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8">
    <div className="text-center">
      <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-[#990006]">
        Comment ça marche ?
      </p>

      <h2 className="mt-4 font-['Wosker'] text-4xl sm:text-5xl">
        3 ÉTAPES POUR COMMANDER
      </h2>

      <p className="mx-auto mt-5 max-w-xl font-sans text-sm font-light leading-7 text-[#1d1d1d]/60">
        Choisissez votre modèle, contactez-nous et vérifiez les modalités
        avant de confirmer votre commande.
      </p>
    </div>

    <div className="mt-14 grid gap-10 md:grid-cols-3">
      {steps.map((step) => {
        const Icon = step.icon;

        return (
          <article key={step.number} className="relative">
            <div className="flex h-14 w-14 items-center justify-center border border-[#990006]/20 bg-[#990006]/5">
              <Icon size={23} strokeWidth={1.5} className="text-[#990006]" />
            </div>

            <p className="mt-6 font-sans text-xs font-medium tracking-[0.2em] text-[#990006]">
              ÉTAPE {step.number}
            </p>

            <h3 className="mt-3 font-sans text-lg font-medium">
              {step.title}
            </h3>

            <p className="mt-3 font-sans text-sm font-light leading-7 text-[#1d1d1d]/60">
              {step.description}
            </p>
          </article>
        );
      })}
    </div>
  </section>

  {/* PARTENAIRES ET RETRAIT */}
  <section className="bg-[#1d1d1d] py-16 text-white sm:py-20">
    <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
      <div>
        <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-[#c51b24]">
          Proximité et disponibilité
        </p>

        <h2 className="mt-4 max-w-2xl font-['Wosker'] text-4xl leading-tight sm:text-5xl">
          BESOIN D'UN POINT DE VENTE OU DE RETRAIT ?
        </h2>

        <p className="mt-5 max-w-2xl font-sans text-sm font-extralight leading-7 text-white/60">
          Selon votre localisation et les disponibilités, des possibilités
          de retrait ou de prise en charge peuvent être proposées avec
          nos partenaires. Contactez-nous avant de vous déplacer afin
          de connaître les options disponibles.
        </p>
      </div>

      <a
        href="https://wa.me/2290151930994"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center gap-3 border border-white/20 px-6 py-4 font-sans text-xs font-medium uppercase tracking-wider transition hover:border-[#990006] hover:bg-[#990006]"
      >
        <MapPin size={16} />
        Se renseigner
        <ArrowUpRight size={15} />
      </a>
    </div>
  </section>

  {/* CTA FINAL */}
  <section className="px-5 py-20 text-center sm:py-24">
    <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-[#990006]">
      À vous de choisir
    </p>

    <h2 className="mt-4 font-['Wosker'] text-4xl leading-tight sm:text-5xl">
      TROUVEZ VOTRE
      <br />
      <span className="text-[#990006]">PROCHAINE PAIRE.</span>
    </h2>

    <p className="mx-auto mt-5 max-w-xl font-sans text-sm font-light leading-7 text-[#1d1d1d]/60">
      Parcourez notre sélection et contactez-nous pour vérifier la
      disponibilité de votre modèle préféré.
    </p>

    <Link
      to="/shop"
      className="mt-8 inline-flex items-center gap-3 bg-[#990006] px-7 py-4 font-sans text-xs font-medium uppercase tracking-wider text-white transition hover:bg-[#bd0008]"
    >
      Voir le catalogue
      <ArrowRight size={16} />
    </Link>
  </section>
</main>

);
}

export default About;
