import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Linkedin, 
  Twitter,
  Clock,
  Shield,
  Award
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    "Épületgépészeti tervezés",
    "Épületenergetikai auditálás", 
    "Közműhálózat tervezése",
    "Épületautomatika tervezés",
    "Napelemes rendszerek",
    "Speciális épületek"
  ];

  const quickLinks = [
    { label: "Rólunk", href: "#about" },
    { label: "Szolgáltatások", href: "#services" },
    { label: "Projektek", href: "#projects" },
    { label: "Partnerek", href: "#partners" },
    { label: "Kapcsolat", href: "#contact" },
    { label: "Tanácsadás", href: "#contact" }
  ];

  return (
    <footer className="bg-gradient-hero text-white">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold font-heading mb-2">
                <span className="text-gradient">GÉTEK</span> Mérnöki Szolgáltató
              </h3>
              <div className="w-16 h-1 bg-gradient-primary rounded-full"></div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Szakmai épületgépészeti tervezés és tanácsadás Budapesten. 
              14+ év tapasztalat 250+ befejezett projekttel.
            </p>
            
            {/* Certifications */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-gray-300">Licencelt & Biztosított</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-gray-300">Szakmai Mérnöki Kamara tag</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-gray-300">Szakmai Tanácsadás</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Szolgáltatások</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#services" 
                    className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Gyors linkek</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Elérhetőségek</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-white font-medium">+36 20 4857309</p>
                  <p className="text-gray-300 text-sm">Kovács Árpád</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-white font-medium">iroda@getek.hu</p>
                  <p className="text-gray-300 text-sm">Válasz 24 órán belül</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-white font-medium">H-1183 Budapest</p>
                  <p className="text-gray-300 text-sm">Szil utca 5., Magyarország</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3 text-white">Kövessen minket</h5>
              <div className="flex space-x-3">
                <a 
                  href="#" 
                  className="p-2 bg-white/10 rounded-lg hover:bg-primary transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="p-2 bg-white/10 rounded-lg hover:bg-primary transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="p-2 bg-white/10 rounded-lg hover:bg-primary transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              <p>&copy; {currentYear} GÉTEK Mérnöki Szolgáltató Kft. Minden jog fenntartva.</p>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                Adatvédelmi szabályzat
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                Általános szerződési feltételek
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                Cookie szabályzat
              </a>
            </div>
            
            <div className="text-gray-300 text-sm">
              <p>Cégjegyzék: 01 09 422575</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;