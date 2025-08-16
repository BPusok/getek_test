import { useState, useEffect } from "react";

export interface Project {
  id: number;
  title: string;
  category: "residential" | "industrial" | "public";
  image: string;
  description: string;
  features: string[];
  location: string;
  year: string;
}

import residentialImage from "@/assets/project-residential.jpg";
import industrialImage from "@/assets/project-industrial.jpg";
import healthcareImage from "@/assets/project-healthcare.jpg";

const defaultProjects: Project[] = [
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

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  // Load projects from localStorage on hook initialization
  useEffect(() => {
    const savedProjects = localStorage.getItem('getek_projects');
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects);
        setProjects(parsed);
      } catch (error) {
        console.error('Error parsing saved projects:', error);
        setProjects(defaultProjects);
        localStorage.setItem('getek_projects', JSON.stringify(defaultProjects));
      }
    } else {
      setProjects(defaultProjects);
      localStorage.setItem('getek_projects', JSON.stringify(defaultProjects));
    }
  }, []);

  // Save projects to localStorage whenever projects change
  const saveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem('getek_projects', JSON.stringify(updatedProjects));
  };

  return {
    projects,
    saveProjects
  };
};
