import { Card } from "@/components/ui/card";
import { 
  Thermometer, 
  Wind, 
  Droplets, 
  Zap, 
  Factory, 
  Cog,
  Shield,
  Wrench,
  Home,
  Building,
  Sun,
  Settings
} from "lucide-react";

const Services = () => {
  const mainServices = [
    {
      icon: Thermometer,
      title: "Épületgépészeti tervezés",
      description: "Teljeskörű épületgépészeti tervezés és tanácsadás modern, energiatakarékos megoldásokkal."
    },
    {
      icon: Shield,
      title: "Épületenergetikai auditálás",
      description: "Professzionális energetikai auditálás és tanúsítás az épületek energiahatékonyságának növelésére."
    },
    {
      icon: Droplets,
      title: "Közműhálózat tervezése",
      description: "Belső közműhálózat tervezése és közműbekötés tervezés minden épülettípushoz."
    },
    {
      icon: Settings,
      title: "Épületautomatika tervezés",
      description: "Modern épületautomatikai rendszerek tervezése az intelligens épületirányítás érdekében."
    },
    {
      icon: Sun,
      title: "Napelemes rendszerek",
      description: "Napelemes rendszerek tervezése és energetikai optimalizálás megújuló energiaforrásokkal."
    }
  ];

  const buildingTypes = [
    {
      icon: Factory,
      title: "Irodaházak",
      description: "WELL, BREEAM, LEED minősítésű épületek gépészeti rendszerei."
    },
    {
      icon: Building,
      title: "Társasházak",
      description: "Több lakásos épületek komplett gépészeti tervezése és kivitelezési terv."
    },
    {
      icon: Home,
      title: "Családi házak",
      description: "Energiatakarékos otthonok gépészeti rendszerei modern technológiával."
    },
    {
      icon: Cog,
      title: "Hotelek",
      description: "Wellness megoldásokkal kiegészített gépészeti rendszerek szállodákhoz."
    },
    {
      icon: Wrench,
      title: "Ipari csarnokok",
      description: "Nagy alapterületű létesítmények és raktárak gépészeti tervezése."
    },
    {
      icon: Zap,
      title: "Speciális épületek",
      description: "Mosók, nyomdák, laborok és egyéb speciális építmények gépészeti megoldásai."
    }
  ];

  const ServiceCard = ({ icon: Icon, title, description }: any) => (
    <Card className="glass-card p-6 hover:shadow-primary transition-all duration-300 group">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-gradient-primary rounded-lg group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            <span className="text-gradient">Szolgáltatásaink</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Teljes körű épületgépészeti tervezést biztosítunk minden projekthez
          </p>
        </div>

        {/* Main Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            Fő Szakterületek
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>

        {/* Building Types */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            Épülettípusok
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buildingTypes.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;