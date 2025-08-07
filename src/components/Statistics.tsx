import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    projects: 0,
    experience: 0,
    clients: 0,
    support: 0
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      number: 250,
      suffix: "+",
      label: "Befejezett Projekt",
      description: "Sikeresen leszállított minden szektorban"
    },
    {
      number: 14,
      suffix: "+",
      label: "Év Tapasztalat",
      description: "Kombinált csapat szakértelem mérnöki területen"
    },
    {
      number: 23850,
      suffix: "+",
      label: "m² Tervezett Otthon",
      description: "Energiatakarékos lakóépületek"
    },
    {
      number: 350000,
      suffix: "+",
      label: "m² Gyártócsarnok",
      description: "Ipari és raktárépületek tervezése"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.number / steps;

      const timer = setInterval(() => {
        currentStep++;
        const value = Math.min(Math.floor(increment * currentStep), stat.number);
        
        setCounts(prev => ({
          ...prev,
          [Object.keys(prev)[index]]: value
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-secondary to-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Bizonyított <span className="text-gradient">Kiválóság</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Számok, amelyek igazolják elkötelezettségünket a minőség és megbízhatóság iránt
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card p-8 text-center hover:shadow-primary transition-all duration-300 group">
              <div className="mb-4">
                <div className={`text-5xl md:text-6xl font-bold text-primary mb-2 transition-all duration-500 ${isVisible ? 'counter-up' : ''}`}>
                  {Object.values(counts)[index]}{stat.suffix}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {stat.label}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
              
              {/* Animated indicator */}
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-primary transition-all duration-2000 ease-out ${
                    isVisible ? 'w-full' : 'w-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                ></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Miért válassza a GÉTEK Mérnöki Szolgáltatót?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Minőség Garantálva</h4>
                <p className="text-sm">Minden projekt megfelel az európai szabványoknak és előírásoknak</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Fenntartható Megoldások</h4>
                <p className="text-sm">Energiatakarékos és környezetbarát gépészeti rendszerek</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Szakmai Elismerés</h4>
                <p className="text-sm">14+ év tapasztalat</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;