const Partners = () => {
  const partners = [
    {
      name: "Danu építésziroda",
      url: "https://www.danu.eu",
      logo: "/partners/danu-logo.png"
    },
    {
      name: "Tervaz kft",
      url: "https://www.tervaz.hu",
      logo: "/partners/tervaz-logo.png"
    },
    {
      name: "ESLAR Kft",
      url: "https://www.eslar.hu",
      logo: "/partners/eslar-logo.png"
    },
    {
      name: "Dénes architects",
      url: "https://denesarchitects.hu/",
      logo: "/partners/denes-logo.png"
    },
    {
      name: "Portico investments",
      url: "https://www.porticoinv.com/",
      logo: "/partners/portico-logo.png"
    },
    {
      name: "Ganz Transzformátor- és Villamos Forgógépgyártó kft.",
      url: "https://www.ganzelectric.com/",
      logo: "/partners/ganz-logo.png"
    },
    {
      name: "KöBE Közép-európai Kölcsönös Biztosító Egyesület",
      url: "https://www.kobe.hu/kobewww/",
      logo: "/partners/kobe-logo.png"
    },
    {
      name: "Bubbles",
      url: "https://bubbles.hu/",
      logo: "/partners/bubbles-logo.png"
    },
    {
      name: "Báthory nagykereskedés",
      url: "https://bathorynagyker.hu/",
      logo: "/partners/bathory-logo.png"
    }
  ];

  // Duplázzuk a partnereket a seamless loop-hoz
  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners, ...partners];

  return (
    <section id="partners" className="py-20 bg-secondary overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
            Kiemelt <span className="text-gradient">Partnereink</span>
          </h2>
        </div>
        
        {/* Végtelen scrolling partnerek */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8"
              >
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-all duration-300 hover:scale-110"
                  title={partner.name}
                >
                  <div className="w-32 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center p-4 hover:bg-white/20 transition-all duration-300">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS animáció */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `
      }} />
    </section>
  );
};

export default Partners;
