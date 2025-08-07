import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Building,
  FileText,
  CheckCircle
} from "lucide-react";

const Contact = () => {

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      value: "+36 20 4857309",
      description: "Hétköznap 8:00-18:00"
    },
    {
      icon: Mail,
      title: "Email",
      value: "iroda@getek.hu",
      description: "Válasz 24 órán belül"
    },
    {
      icon: MapPin,
      title: "Cím",
      value: "H-1183 Budapest, Szil utca 5.",
      description: "Magyarország"
    }

  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-secondary to-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            <span className="text-gradient">Kapcsolat</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Készen áll a projektjére? Vegye fel velünk a kapcsolatot ingyenes tanácsadásért 
            és részletes árajánlatért, amely az Ön egyedi igényeihez van szabva.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="grid md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="glass-card p-6 hover:shadow-primary transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-primary rounded-lg">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                      <p className="text-primary font-medium mb-1">{info.value}</p>
                      <p className="text-muted-foreground text-sm">{info.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Company Information */}
            <Card className="glass-card p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="p-3 bg-gradient-primary rounded-lg">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Cég Adatok</h3>
                  <p className="text-muted-foreground text-sm">
                    GÉTEK Mérnöki Szolgáltató Kft.
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Cégjegyzék: 01 09 422575</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Adószám: 32408342-2-43</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;