function WhyVDBI() {
  const advantages = [
    {
      number: "01",
      title: "SÉLECTION SOIGNÉE",
      text: "Des modèles sélectionnés pour vous proposer une collection variée.",
    },
    {
      number: "02",
      title: "PLUSIEURS POINTURES",
      text: "Consultez directement les pointures disponibles pour chaque modèle.",
    },
    {
      number: "03",
      title: "COMMANDE SIMPLE",
      text: "Une paire vous plaît ? Contactez-nous directement pour passer votre commande.",
    },
  ];

  return (
    <section className="bg-[#f5f5f5] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Introduction */}
        <div className="max-w-2xl">
          <p className="mb-3 font-sans text-xs font-light uppercase tracking-[0.3em] text-[#990006]">
            Pourquoi nous ?
          </p>

          <h2 className="font-['Wosker'] text-5xl leading-none text-[#1d1d1d] md:text-6xl">
            POURQUOI VDBI ?
          </h2>

          <p className="mt-6 font-sans text-sm font-extralight leading-7 text-[#1d1d1d]/70">
            Chez Vente de Baskets Ici, nous voulons rendre la recherche
            et la commande de votre prochaine paire aussi simples que possible.
          </p>
        </div>

        {/* Avantages */}
        <div className="mt-14 grid gap-px bg-[#1d1d1d]/10 md:grid-cols-3">

          {advantages.map((item) => (
            <article
              key={item.number}
              className="bg-[#f5f5f5] p-8 md:p-10"
            >
              <span className="font-sans text-xs font-light text-[#990006]">
                {item.number}
              </span>

              <h3 className="mt-8 font-['Wosker'] text-2xl text-[#1d1d1d]">
                {item.title}
              </h3>

              <p className="mt-4 font-sans text-sm font-extralight leading-7 text-[#1d1d1d]/60">
                {item.text}
              </p>
            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyVDBI;