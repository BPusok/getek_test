import { useState, useEffect } from "react";

export interface Project {
  id: number;
  title: string;
  category: "office" | "apartment" | "residential" | "hotel" | "industrial" | "other";
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
    category: "apartment",
    image: residentialImage,
    description: "120 lakásos lakótelep teljes HVAC rendszerrel, intelligens klímaszabályozással és energiahatékony megoldásokkal.",
    features: ["Smart termosztátok", "Energiavisszanyerő szellőztetés", "Padlófűtés", "Központi hűtés"],
    location: "Budapest, XIII. kerület",
    year: "2023"
  },
  {
    id: 2,
    title: "Autógyár Épületgépészeti Rendszerei",
    category: "industrial", 
    image: industrialImage,
    description: "Komplex gépészeti rendszerek autógyár számára, beleértve a gyártósor infrastruktúráját és speciális szellőztetést.",
    features: ["Ipari szellőztetés", "Folyamatszabályozó hűtés", "Sűrített levegő rendszer", "Festőkamra szellőztetés"],
    location: "Kecskeméti Ipari Park",
    year: "2023"
  },
  {
    id: 3,
    title: "Egészségügyi Központ Felújítása",
    category: "other",
    image: healthcareImage,
    description: "Kórház infrastruktúra korszerűsítése speciális orvosi gázrendszerekkel és steril környezet szabályozással.",
    features: ["Orvosi gázrendszer", "Műtő szellőztetés", "Fertőzésvédelem", "Vészhelyzeti tartalék"],
    location: "Budapesti Egészségügyi Központ",
    year: "2022"
  },
  {
    id: 4,
    title: "Prémium Családi Házak",
    category: "residential",
    image: residentialImage,
    description: "Luxus családi házak geotermikus fűtéssel, smart home integrációval és prémium HVAC rendszerekkel.",
    features: ["Geotermikus rendszer", "Smart home integráció", "Medence fűtés", "Borospince klíma"],
    location: "Budakeszi dombok",
    year: "2022"
  },
  {
    id: 5,
    title: "Élelmiszeripari Üzem",
    category: "industrial",
    image: industrialImage,
    description: "Speciális technológiai vezetékek élelmiszergyártáshoz, szigorú higiéniai és hőmérséklet-szabályozási követelményekkel.",
    features: ["Higiénikus vezetékek", "Hőmérséklet-szabályozás", "Tisztatér rendszer", "CIP rendszer"],
    location: "Győri Ipari Zóna",
    year: "2023"
  },
  {
    id: 6,
    title: "Egyetemi Campus Rendszerei",
    category: "other",
    image: healthcareImage,
    description: "Komplex gépészeti rendszerek oktatási campushoz, beleértve előadótermeket, laboratóriumokat és kollégiumi épületeket.",
    features: ["Laboratóriumi szellőztetés", "Előadótermi klíma", "Kollégiumi HVAC", "Energiamenedzsment"],
    location: "Budapesti Műszaki Egyetem",
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
