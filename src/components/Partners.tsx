import { Card } from "@/components/ui/card";
import { 
  Building2, 
  Cpu, 
  Leaf, 
  Factory, 
  Thermometer,
  Handshake
} from "lucide-react";

const Partners = () => {
  const partners = [
    {
      name: "Danu építésziroda",
      url: "https://www.danu.eu",
      logo: "/partners/danu-logo.png",
      specialty: "Építészeti tervezés",
      description: "Professzionális építészeti tervezés és tanácsadás lakóépületek és irodaházak területén.",
      icon: Building2,
      established: "2010",
      projects: "180+"
    },
    {
      name: "Tervaz kft",
      url: "https://www.tervaz.hu",
      logo: "/partners/tervaz-logo.png", 
      specialty: "Statikai tervezés",
      description: "Szakmai statikai tervezés és szerkezeti mérnöki szolgáltatások minden épülettípushoz.",
      icon: Factory,
      established: "2008",
      projects: "250+"
    },
    {
      name: "ESLAR Kft",
      url: "https://www.eslar.hu",
      logo: "/partners/eslar-logo.png",
      specialty: "Villamos tervezés",
      description: "Villamos rendszerek tervezése és elektromos infrastruktúra megoldások.",
      icon: Cpu,
      established: "2012",
      projects: "200+"
    },
    {
      name: "Dénes architects",
      url: "https://denesarchitects.hu/",
      logo: "/partners/denes-logo.png",
      specialty: "Építészeti studio",
      description: "Innovatív építészeti megoldások és modern design projektek megvalósítása.",
      icon: Building2,
      established: "2015",
      projects: "120+"
    },
    {
      name: "Portico investments",
      url: "https://www.porticoinv.com/",
      logo: "/partners/portico-logo.png",
      specialty: "Ingatlanfejlesztés",
      description: "Professzionális ingatlanfejlesztési és befektetési tanácsadási szolgáltatások.",
      icon: Handshake,
      established: "2005",
      projects: "150+"
    },
    {
      name: "Ganz Transzformátor- és Villamos Forgógépgyártó kft.",
      url: "https://www.ganzelectric.com/",
      logo: "/partners/ganz-logo.png",
      specialty: "Villamos berendezések",
      description: "Transzformátorok és villamos forgógépek gyártása ipari alkalmazásokhoz.",
      icon: Thermometer,
      established: "1990",
      projects: "500+"
    },
    {
      name: "KöBE Közép-európai Kölcsönös Biztosító Egyesület",
      url: "https://www.kobe.hu/kobewww/",
      logo: "/partners/kobe-logo.png",
      specialty: "Biztosítási szolgáltatások",
      description: "Szakmai biztosítási megoldások építőipari és mérnöki projektekhez.",
      icon: Leaf,
      established: "1995",
      projects: "1000+"
    },
    {
      name: "Bubbles",
      url: "https://bubbles.hu/",
      logo: "/partners/bubbles-logo.png",
      specialty: "Fürdőszoba design",
      description: "Prémium fürdőszoba berendezések és modern szaniter megoldások.",
      icon: Thermometer,
      established: "2018",
      projects: "300+"
    },
    {
      name: "Báthory nagykereskedés",
      url: "https://bathorynagyker.hu/",
      logo: "/partners/bathory-logo.png",
      specialty: "Építőanyag nagykereskedés",
      description: "Komplett építőanyag kínálat és gépészeti alkatrészek nagykereskedelme.",
      icon: Factory,
      established: "2000",
      projects: "800+"
    }
  ];

  return (
    <section id="partners" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Kiemelt <span className="text-gradient">Partnereink</span>
          </h2>
        </div>

        {/* Partnership Benefits */}
        <div className="mb-16">
          <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Handshake className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-2xl font-bold text-foreground">Partnerség Előnyei</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Átfogó Megoldások</h4>
                <p className="text-sm text-muted-foreground">
                  Teljes projektmegvalósítás a koncepciótól a karbantartásig partnereink hálózatán keresztül
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Minőségbiztosítás</h4>
                <p className="text-sm text-muted-foreground">
                  Minden partnerünk tanúsított és osztozik elkötelezettségünkben a kiválóság iránt
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Költséghatékonyság</h4>
                <p className="text-sm text-muted-foreground">
                  Hatékony folyamatok és nagykereskedelmi vásárlási előnyök, amelyeket az ügyfeleknek biztosítunk
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <Card key={index} className="glass-card p-6 hover:shadow-primary transition-all duration-300 group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-blue-200 dark:border-blue-800">
              <div className="text-center">
                {/* Partner Logo */}
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        // Fallback to icon if logo fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden p-4 bg-gradient-primary rounded-lg">
                      <partner.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Partner Info */}
                <a 
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-primary transition-colors duration-300"
                >
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary">
                    {partner.name}
                  </h3>
                </a>
                <p className="text-primary font-semibold mb-3">
                  {partner.specialty}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {partner.description}
                </p>

                {/* Partner Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <div className="text-lg font-bold text-primary">{partner.established}</div>
                    <div className="text-xs text-muted-foreground">Alapítva</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary">{partner.projects}</div>
                    <div className="text-xs text-muted-foreground">Projektek</div>
                  </div>
                </div>

                {/* Visit Website Link */}
                <div className="mt-4">
                  <a 
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:text-primary-dark transition-colors duration-300 text-sm"
                  >
                    Weboldal megtekintése →
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Partnership Stats */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">9+</div>
              <div className="text-sm text-muted-foreground">Stratégiai Partner</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">250+</div>
              <div className="text-sm text-muted-foreground">Közös Projekt</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">14+</div>
              <div className="text-sm text-muted-foreground">Év Partnerség</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Ügyfél Elégedettség</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;