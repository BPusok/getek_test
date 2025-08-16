import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Főoldal", href: "#home" },
    { label: "Szolgáltatások", href: "#services" },
    { label: "Projektek", href: "#projects" },
    { label: "Partnerek", href: "#partners" },
    { label: "Kapcsolat", href: "#contact" }
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "glass-effect backdrop-blur-xl shadow-glass" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold font-heading">
              <span className="text-gradient">GÉTEK</span>
              <span className={isScrolled ? "text-foreground" : "text-white"}>
                {" "}Kft
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className={`${
                isScrolled 
                  ? "border-border text-foreground hover:bg-primary hover:text-white" 
                  : "border-white/30 text-white hover:bg-white hover:text-foreground"
              }`}
            >
              <Phone className="w-4 h-4 mr-2" />
              +36 20 4857309
            </Button>
            <Button 
              size="sm"
              className="bg-primary hover:bg-primary-dark text-white shadow-primary"
              onClick={() => handleNavClick("#contact")}
            >
              Ajánlatkérés
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`md:hidden ${isScrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="glass-effect border-t border-white/10 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile CTA */}
              <div className="px-4 pt-4 space-y-3 border-t border-white/10">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-border text-foreground hover:bg-primary hover:text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  +36 20 4857309
                </Button>
                <Button 
                  size="sm"
                  className="w-full bg-primary hover:bg-primary-dark text-white"
                  onClick={() => handleNavClick("#contact")}
                >
                  Ajánlatkérés
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;