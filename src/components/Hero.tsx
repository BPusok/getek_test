import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import heroImage from "@/assets/hero-pipes.webp";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Company Logo/Name */}
          <div className="mb-8">
            {/* Large Company Logo */}
            <div className="mb-8 flex justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-white/10 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-sm border border-white/20">
                <img 
                  src="/logo/getek-logo.png" 
                  alt="GÉTEK Mérnöki Szolgáltató Kft. logo"
                  className="max-w-full max-h-full object-contain p-4"
                  onError={(e) => {
                    // Fallback to text logo if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-4xl md:text-5xl lg:text-6xl">GÉTEK</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4">
              <span className="text-gradient">GÉTEK</span> Mérnöki Szolgáltató
            </h1>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          </div>
          
          {/* Tagline */}
          <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
            Innovatív gépészet, fenntartható jövő
          </p>
          
          {/* Description */}
          <p className="text-base md:text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            14 éves tapasztalattal segítünk családi házak és ipari létesítmények épületgépészeti rendszereinek tervezésében.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 text-base font-semibold shadow-primary">
              Lépjen velünk kapcsolatba
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-6 py-3 text-base">
              <Phone className="mr-2 w-5 h-5" />
              +36 20 4857309
            </Button>
          </div>
          
          {/* Stats Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 max-w-3xl mx-auto">
            <div className="glass-effect rounded-xl p-4">
              <div className="text-2xl font-bold text-primary-glow">250+</div>
              <div className="text-sm text-gray-300">Projekt</div>
            </div>
            <div className="glass-effect rounded-xl p-4">
              <div className="text-2xl font-bold text-primary-glow">14+</div>
              <div className="text-sm text-gray-300">Év</div>
            </div>
            <div className="glass-effect rounded-xl p-4">
              <div className="text-2xl font-bold text-primary-glow">23,850+</div>
              <div className="text-sm text-gray-300">m² Otthon</div>
            </div>
            <div className="glass-effect rounded-xl p-4">
              <div className="text-2xl font-bold text-primary-glow">350k+</div>
              <div className="text-sm text-gray-300">m² Csarnok</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;