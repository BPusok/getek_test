import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import residentialImage from "@/assets/project-residential.jpg";
import industrialImage from "@/assets/project-industrial.jpg";
import healthcareImage from "@/assets/project-healthcare.jpg";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Modern Residential Park",
      category: "residential",
      image: residentialImage,
      description: "120-unit residential complex with complete HVAC installation, smart climate control, and energy-efficient systems.",
      features: ["Smart thermostats", "Energy recovery ventilation", "Radiant floor heating", "Central cooling"],
      location: "Budapest, District XIII",
      year: "2023"
    },
    {
      id: 2,
      title: "Automotive Manufacturing Facility",
      category: "industrial", 
      image: industrialImage,
      description: "Complete mechanical systems for automotive factory including production line infrastructure and specialized ventilation.",
      features: ["Industrial ventilation", "Process cooling", "Compressed air systems", "Paint booth ventilation"],
      location: "Kecskemét Industrial Park",
      year: "2023"
    },
    {
      id: 3,
      title: "Healthcare Center Renovation",
      category: "public",
      image: healthcareImage,
      description: "Hospital infrastructure upgrade with specialized medical gas systems and sterile environment controls.",
      features: ["Medical gas systems", "Operating room ventilation", "Infection control", "Emergency backup"],
      location: "Budapest Medical Center",
      year: "2022"
    },
    {
      id: 4,
      title: "Premium Family Houses",
      category: "residential",
      image: residentialImage,
      description: "Luxury residential properties with geothermal heating, smart home integration, and premium HVAC systems.",
      features: ["Geothermal systems", "Smart home integration", "Pool heating", "Wine cellar climate"],
      location: "Budakeszi Hills",
      year: "2022"
    },
    {
      id: 5,
      title: "Food Processing Plant",
      category: "industrial",
      image: industrialImage,
      description: "Specialized technology pipelines for food manufacturing with strict hygiene and temperature control requirements.",
      features: ["Sanitary piping", "Temperature control", "Clean room systems", "CIP systems"],
      location: "Győr Industrial Zone",
      year: "2023"
    },
    {
      id: 6,
      title: "University Campus Systems",
      category: "public",
      image: healthcareImage,
      description: "Comprehensive mechanical systems for educational campus including lecture halls, laboratories, and dormitories.",
      features: ["Laboratory ventilation", "Lecture hall climate", "Dormitory HVAC", "Energy management"],
      location: "Budapest Technical University",
      year: "2022"
    }
  ];

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "residential", label: "Residential" },
    { id: "industrial", label: "Industrial" },
    { id: "public", label: "Public" }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Reference <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Showcasing our expertise across residential, industrial, and public sector projects
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`${
                  activeCategory === category.id 
                    ? "bg-primary text-white shadow-primary" 
                    : "hover:bg-primary/10"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="glass-card overflow-hidden group hover:shadow-primary transition-all duration-300">
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-foreground">
                    {project.year}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button size="sm" className="bg-white text-foreground hover:bg-white/90">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                  <Badge 
                    variant="outline" 
                    className={`${
                      project.category === 'residential' ? 'border-blue-300 text-blue-600' :
                      project.category === 'industrial' ? 'border-orange-300 text-orange-600' :
                      'border-green-300 text-green-600'
                    }`}
                  >
                    {project.category}
                  </Badge>
                </div>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Location:</span> {project.location}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Ready to Start Your Project?
            </h3>
            <p className="text-muted-foreground mb-6">
              Get a free consultation and detailed quote for your building engineering needs
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary-dark shadow-primary">
              Request Free Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;