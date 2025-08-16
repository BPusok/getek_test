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
    },
    {
      number: 14,
      suffix: "+",
      label: "Év Tapasztalat",
    },
    {
      number: 23850,
      suffix: "+",
      label: "m² Tervezett Otthon",
    },
    {
      number: 350000,
      suffix: "+",
      label: "m² Gyártócsarnok",
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
            Rólunk
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Számok, amelyek igazolják elkötelezettségünket a minőség és megbízhatóság iránt
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
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

        {/* Owner Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card overflow-hidden hover:shadow-primary transition-all duration-500 group">
            <div className="md:flex">
              {/* Owner Photo */}
              <div className="md:w-1/3 lg:w-1/4">
                <div className="relative h-64 md:h-full">
                  <img 
                    src="/owner-photo.jpg" 
                    alt="Kovács Árpád - Tulajdonos, Vezető tervező"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.currentTarget.src = "data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M50 15c15.15 0 27.5 12.35 27.5 27.5S65.15 70 50 70s-27.5-12.35-27.5-27.5S34.85 15 50 15z' fill='%23DD3F28'/%3e%3cpath d='M50 75c-13.807 0-25 7.463-25 16.667v8.333h50v-8.333C75 82.463 63.807 75 50 75z' fill='%23DD3F28'/%3e%3c/svg%3e";
                    }}
                  />
                  {/* Gradient overlay for better text readability on mobile */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden"></div>
                </div>
              </div>
              
              {/* Owner Info */}
              <div className="md:w-2/3 lg:w-3/4 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    Kovács Árpád
                  </h3>
                  <p className="text-primary font-semibold text-lg mb-1">
                    Tulajdonos, Vezető tervező
                  </p>
                  <div className="w-16 h-1 bg-gradient-primary rounded-full transition-all duration-300 group-hover:w-24"></div>
                </div>
                
                {/* Quote */}
                <div className="relative">
                  {/* Quote icon */}
                  <div className="absolute -top-2 -left-2 text-6xl text-primary/20 font-serif leading-none">
                    "
                  </div>
                  
                  <blockquote className="text-muted-foreground text-base md:text-lg leading-relaxed italic pl-8 pr-4">
                    Azért dolgozunk, hogy a jelen problémáira valódi, működő megoldásokat nyújtsunk. 
                    Hiszünk abban, hogy a jól megtervezett rendszerek nemcsak kényelmet és hatékonyságot biztosítanak, 
                    hanem közelebb hoznak minket egy fenntarthatóbb jövőhöz is. Minden projektünket maximális 
                    odafigyeléssel és szakértelemmel kezeljük, mert tudjuk, hogy a legapróbb részletek is számítanak.
                  </blockquote>
                  
                  {/* Closing quote */}
                  <div className="absolute -bottom-4 right-0 text-6xl text-primary/20 font-serif leading-none">
                    "
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="flex items-center mt-8 space-x-4">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div 
                        key={star} 
                        className="w-2 h-2 bg-primary rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ animationDelay: `${star * 100}ms` }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    14+ ÉV SZAKÉRTELEM
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Statistics;