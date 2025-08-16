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
import { useState } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import CookiePolicy from "./CookiePolicy";
import TermsOfService from "./TermsOfService";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);

  if (showPrivacyPolicy) {
    return <PrivacyPolicy onBack={() => setShowPrivacyPolicy(false)} />;
  }

  if (showCookiePolicy) {
    return <CookiePolicy onBack={() => setShowCookiePolicy(false)} />;
  }

  if (showTermsOfService) {
    return <TermsOfService onBack={() => setShowTermsOfService(false)} />;
  }

  const services = [
    "Épületgépészeti tervezés",
    "Épületenergetikai auditálás", 
    "Közműhálózat tervezése",
    "Épületautomatika tervezés",
    "Napelemes rendszerek",
    "Speciális épületek"
  ];

  const impressum = [
    { label: "Cégnév", value: "GÉTEK Mérnöki Szolgáltató Kft." },
    { label: "Székhely", value: "H-1183 Budapest, Szil utca 5." },
    { label: "Adószám", value: "32408342-2-43" },
    { label: "Cégjegyzékszám", value: "01 09 422575" },

    { label: "KSH szám", value: "32408342 7112 113 01" },
    { label: "Bankszámlaszám", value: "HU97 1040 1024 5052 7089 7552 1008" },
    { label: "Főtevékenység", value: "7112'25 - Mérnöki tevékenység, műszaki tanácsadás" }
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

          {/* Impresszum */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Impresszum</h4>
            <ul className="space-y-3">
              {impressum.map((item, index) => (
                <li key={index}>
                  <div className="text-sm">
                    <span className="text-gray-400 font-medium">{item.label}:</span>
                    <span className="text-gray-300 ml-2">{item.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Kövessen minket</h4>

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

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              <p>&copy; {currentYear} GÉTEK Mérnöki Szolgáltató Kft. Minden jog fenntartva.</p>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <button 
                onClick={() => setShowPrivacyPolicy(true)}
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                Adatvédelmi szabályzat
              </button>
              <button 
                onClick={() => setShowTermsOfService(true)}
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                Általános szerződési feltételek
              </button>
              <button 
                onClick={() => setShowCookiePolicy(true)}
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                Cookie szabályzat
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;