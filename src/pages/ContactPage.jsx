import React, { useState } from "react";
import { MessageSquare, Phone, MapPin, Send, CheckCircle2, Clock } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";

function InstagramIcon({ className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function ContactPage() {
  const { language } = usePreferences();
  const isEn = language === "EN";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const defaultSubject = isEn ? "Inquiry" : "Renseignement";
    const headerTitle = isEn ? "*New Message from VDBI Website*" : "*Nouveau Message depuis le Site VDBI*";
    const labelName = isEn ? "👤 Name" : "👤 Nom";
    const labelContact = isEn ? "📞 Contact" : "📞 Contact";
    const labelSubject = isEn ? "📌 Subject" : "📌 Sujet";
    const labelMessage = isEn ? "💬 Message" : "💬 Message";

    const whatsappText = `
${headerTitle}
${labelName} : ${formData.name}
${labelContact} : ${formData.phone}
${labelSubject} : ${formData.subject || defaultSubject}
${labelMessage} :
${formData.message}
    `.trim();

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.open(`https://wa.me/2290151930994?text=${encodeURIComponent(whatsappText)}`, "_blank");
    }, 600);
  };

  const contactCards = [
    {
      icon: MessageSquare,
      title: isEn ? "Official WhatsApp" : "WhatsApp Officiel",
      value: "+229 01 51 93 09 94",
      desc: isEn ? "Fast response in minutes 7/7" : "Réponse en quelques minutes 7j/7",
      link: "https://wa.me/2290151930994",
      action: isEn ? "Open WhatsApp" : "Ouvrir WhatsApp",
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      icon: InstagramIcon,
      title: "Instagram",
      value: "@vente_de_baskets_ici_",
      desc: isEn ? "Discover our stories and real videos" : "Découvrez nos stories et vidéos réelles",
      link: "https://www.instagram.com/vente_de_baskets_ici_/",
      action: isEn ? "Follow on Insta" : "Suivre sur Insta",
      color: "text-pink-600 bg-pink-50",
    },
    {
      icon: MapPin,
      title: isEn ? "Pickup Points & Delivery" : "Points de Retrait & Livraison",
      value: isEn ? "Cotonou & Calavi, Benin" : "Cotonou & Calavi, Bénin",
      desc: isEn ? "Home delivery or direct hand-to-hand pickup" : "Livraison à domicile ou retrait en main propre",
      link: "https://wa.me/2290151930994",
      action: isEn ? "Check my zone" : "Vérifier ma zone",
      color: "text-[#990006] bg-[#990006]/10",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50/50 pb-24 max-w-full overflow-x-hidden">
      {/* Bannière En-tête */}
      <section className="bg-[#1d1d1d] py-16 px-4 sm:px-6 lg:px-8 text-white text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mt-2 font-['Wosker'] text-4xl sm:text-5xl lg:text-6xl text-white">
            {isEn ? "CONTACT OUR TEAM" : "CONTACTEZ NOTRE ÉQUIPE"}
          </h1>
          <p className="mt-3 text-sm text-white/70 font-light max-w-xl mx-auto">
            {isEn
              ? "Need information about a pair of sneakers, delivery times, or payment methods? Our team is at your service."
              : "Besoin d'un renseignement sur une paire de baskets, un délai de livraison ou un moyen de paiement ? Nous sommes à votre entière disposition."}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* Cartes de contact rapide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactCards.map((card, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}>
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-[#1d1d1d]">{card.title}</h3>
                <p className="mt-1 text-sm font-semibold text-[#990006]">{card.value}</p>
                <p className="mt-1 text-xs text-gray-500 font-light">{card.desc}</p>
              </div>

              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#990006] hover:underline"
              >
                <span>{card.action}</span>
                <span className="ml-1">→</span>
              </a>
            </div>
          ))}
        </div>

        {/* Formulaire & Horaires */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Formulaire */}
          <div className="lg:col-span-7 rounded-3xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="font-['Wosker'] text-2xl text-[#1d1d1d] mb-2">
              {isEn ? "SEND US A MESSAGE" : "ENVOYEZ-NOUS UN MESSAGE"}
            </h2>
            <p className="text-xs text-gray-500 font-light mb-6">
              {isEn
                ? "Fill out this form and your message will be forwarded directly to our team on WhatsApp."
                : "Remplissez ce formulaire et votre message sera directement acheminé à notre équipe."}
            </p>

            {isSuccess && (
              <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3 text-emerald-800 text-xs">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>
                  {isEn
                    ? "Message sent successfully! You can continue the discussion on WhatsApp."
                    : "Message transmis avec succès ! Vous pouvez continuer la discussion sur WhatsApp."}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {isEn ? "Your name *" : "Votre nom *"}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={isEn ? "Ex: John Doe" : "Ex: Patrick Dossou"}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs text-gray-900 focus:bg-white focus:border-[#990006] focus:outline-none focus:ring-1 focus:ring-[#990006]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {isEn ? "Phone / WhatsApp number *" : "Numéro de téléphone / WhatsApp *"}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Ex: +229 01 51 93 09"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs text-gray-900 focus:bg-white focus:border-[#990006] focus:outline-none focus:ring-1 focus:ring-[#990006]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {isEn ? "Subject of your request" : "Sujet de votre demande"}
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder={
                    isEn
                      ? "Ex: Size 43 availability for Nike Air Force 1"
                      : "Ex: Disponibilité pointure 43 Nike Air Force 1"
                  }
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs text-gray-900 focus:bg-white focus:border-[#990006] focus:outline-none focus:ring-1 focus:ring-[#990006]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {isEn ? "Your message *" : "Votre message *"}
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={isEn ? "Write your message here..." : "Écrivez votre message ici..."}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs text-gray-900 focus:bg-white focus:border-[#990006] focus:outline-none focus:ring-1 focus:ring-[#990006]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#990006] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#7d0005] transition cursor-pointer"
              >
                {isSubmitting ? (
                  <span>{isEn ? "Sending..." : "Transmission..."}</span>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>{isEn ? "Send my message" : "Envoyer mon message"}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FAQ & Infos Horaires */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#990006] mb-3">
                <Clock className="h-4 w-4" />
                <span>{isEn ? "Opening Hours & Support" : "Horaires d'Ouverture & Service"}</span>
              </div>
              
              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-900">
                    {isEn ? "Monday to Saturday" : "Lundi au Samedi"}
                  </span>
                  <span>08:00 - 20:00</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-900">
                    {isEn ? "Sunday" : "Dimanche"}
                  </span>
                  <span>10:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">
                    {isEn ? "WhatsApp Orders" : "Commandes WhatsApp"}
                  </span>
                  <span className="text-emerald-600 font-bold">
                    {isEn ? "24/7" : "24h/24 7j/7"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm">
              <h3 className="text-sm font-bold text-[#1d1d1d] mb-3">
                {isEn ? "Frequent Delivery Areas" : "Zones de livraison fréquentes"}
              </h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed mb-4">
                {isEn
                  ? "We deliver daily across all districts of Cotonou (Haie Vive, Cadjehoun, Akpakpa, Menontin, Fidjrosse...) as well as Abomey-Calavi (Arconville, Bidossessi, Zogbadje...)."
                  : "Nous livrons quotidiennement sur l'ensemble des arrondissements de Cotonou (Haie Vive, Cadjehoun, Akpakpa, Menontin, Fidjrosse...) ainsi qu'à Abomey-Calavi (Arconville, Bidossessi, Zogbadje...)."}
              </p>
              <a
                href="https://wa.me/2290151930994"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#990006] hover:underline"
              >
                <span>{isEn ? "Request delivery quote for my city" : "Demander un tarif de livraison pour ma ville"}</span>
                <span>→</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
