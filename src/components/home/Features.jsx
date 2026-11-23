import React from "react";
import { Truck, ShieldCheck, CheckCircle2, MessageSquare, RefreshCw } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: ShieldCheck,
      number: "01",
      title: "Finitions & Qualité Premium",
      desc: "Chaque paire est rigoureusement sélectionnée et vérifiée pour vous garantir un produit impeccable.",
    },
    {
      icon: CheckCircle2,
      number: "02",
      title: "Pointures Vérifiées en Direct",
      desc: "Consultez en temps réel les pointures disponibles du 36 au 47 pour trouver le chaussant parfait.",
    },
    {
      icon: Truck,
      number: "03",
      title: "Livraison Rapide & Retrait",
      desc: "Livraison à domicile ou au bureau sur Cotonou, Calavi, et expédition sécurisée dans tout le Bénin.",
    },
    {
      icon: MessageSquare,
      number: "04",
      title: "Assistance WhatsApp 7j/7",
      desc: "Une équipe réactive disponible pour répondre à vos questions, envoyer des vidéos et valider votre commande.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50/70 border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#990006]">
            L'Engagement VDBI
          </span>
          <h2 className="mt-3 font-['Wosker'] text-3xl sm:text-4xl text-[#1d1d1d]">
            POURQUOI CHOISIR VDBI ?
          </h2>
          <p className="mt-3 text-sm text-gray-600 font-light">
            Une expérience d'achat de sneakers transparente, rapide et sans compromis sur la qualité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#990006]/10 text-[#990006]">
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="font-mono text-xs font-bold text-gray-300">
                  {item.number}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#1d1d1d] mb-2">
                {item.title}
              </h3>
              
              <p className="text-xs font-light text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
