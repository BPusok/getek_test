import { useState, useEffect, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Plus, Save, X, Upload, Image, Download, FileUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { optimizeImage, generateThumbnail, getBase64SizeKB } from "@/utils/imageOptimizer";
import { 
  saveImageSeparately, 
  getImageByProjectId, 
  removeImageByProjectId,
  saveProjectsWithoutImages,
  getProjectsWithoutImages,
  exportProjectsAndImages,
  importProjectsAndImages,
  importImagesOnly,
  getStorageInfo
} from "@/utils/imageStorage";
import residentialImage from "@/assets/project-residential.jpg";
import industrialImage from "@/assets/project-industrial.jpg";
import healthcareImage from "@/assets/project-healthcare.jpg";

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

const AdminProjects = () => {
  const { key } = useParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const projectsImportRef = useRef<HTMLInputElement>(null);
  const imagesImportRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Check if the access key is correct
  const ADMIN_KEY = "getek2025admin"; // Change this to your desired admin key
  
  if (key !== ADMIN_KEY) {
    return <Navigate to="/" replace />;
  }

  // Load projects with separate image handling
  useEffect(() => {
    // Próbáljuk betölteni az új formátumot
    const projectsWithoutImages = getProjectsWithoutImages();
    
    if (projectsWithoutImages.length > 0) {
      // Új formátum: képek külön tárolva
      const projectsWithImages = projectsWithoutImages.map(project => {
        const customImage = getImageByProjectId(project.id);
        
        return {
          id: project.id,
          title: project.title,
          category: project.category as "office" | "apartment" | "residential" | "hotel" | "industrial" | "other",
          description: project.description,
          features: project.features,
          location: project.location,
          year: project.year,
          image: customImage || getImageForCategory(project.category)
        } as Project;
      });
      
      setProjects(projectsWithImages);
    } else {
      // Régi formátum: migráljuk az új rendszerre
      const oldSavedProjects = localStorage.getItem('getek_projects');
      if (oldSavedProjects) {
        try {
          const oldProjects = JSON.parse(oldSavedProjects);
          
          // Migráljuk a képeket külön tárolásra
          oldProjects.forEach((project: Project) => {
            if (project.image && project.image.startsWith('data:')) {
              saveImageSeparately(project.id, project.image);
            }
          });
          
          // Mentjük az új formátumban
          saveProjectsWithoutImages(oldProjects);
          
          // Betöltjük az új formátumot
          const migratedProjects = oldProjects.map((project: Project) => ({
            ...project,
            image: project.image && project.image.startsWith('data:') 
              ? getImageByProjectId(project.id) || project.image
              : project.image
          }));
          
          setProjects(migratedProjects);
          
          // Töröljük a régi formátumot
          localStorage.removeItem('getek_projects');
          
          toast({
            title: "Adatmigráció",
            description: "Projektadatok frissítve az új képkezelési rendszerre",
          });
          
        } catch (error) {
          console.error('Error migrating projects:', error);
          setProjects(defaultProjects);
        }
      } else {
        setProjects(defaultProjects);
      }
    }
  }, []);

  // Save projects with separate image handling
  useEffect(() => {
    if (projects.length > 0) {
      // Külön mentjük a szöveges adatokat és képeket
      saveProjectsWithoutImages(projects);
      
      // Trigger event to update other components
      window.dispatchEvent(new Event('projects_updated'));
    }
  }, [projects]);

  const getImageForCategory = (category: string) => {
    switch (category) {
      case 'office':
      case 'apartment':
        return residentialImage;
      case 'residential':
        return residentialImage;
      case 'hotel':
        return residentialImage;
      case 'industrial':
        return industrialImage;
      case 'other':
        return healthcareImage;
      default:
        return residentialImage;
    }
  };



  // Handle image upload with advanced optimization
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editingProject) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Hiba",
        description: "Kérjük válasszon érvényes képfájlt",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB for original, will be compressed)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Hiba",
        description: "A kép mérete maximum 10MB lehet",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      
      toast({
        title: "Kép optimalizálása...",
        description: "Kérjük várjon, amíg a kép feldolgozásra kerül"
      });

      // Optimize with advanced settings
      const optimizedImage = await optimizeImage(file, {
        maxWidth: 800,
        maxHeight: 600,
        quality: 0.75,
        format: 'auto' // WebP if supported, JPEG fallback
      });

      const sizeKB = getBase64SizeKB(optimizedImage);
      
      // If still too large, create a smaller version
      if (sizeKB > 800) {
        const smallerImage = await optimizeImage(file, {
          maxWidth: 600,
          maxHeight: 400,
          quality: 0.6,
          format: 'jpeg'
        });
        
        const smallerSizeKB = getBase64SizeKB(smallerImage);
        
        if (smallerSizeKB < sizeKB) {
          // Mentjük a képet külön
          saveImageSeparately(editingProject.id, smallerImage);
          
          setEditingProject({
            ...editingProject,
            image: smallerImage
          });
          setImagePreview(smallerImage);
          
          toast({
            title: "Kép sikeresen optimalizálva",
            description: `Méret: ${smallerSizeKB}KB (nagyobb tömörítéssel) - Külön tárolva`
          });
        } else {
          // Mentjük a képet külön
          saveImageSeparately(editingProject.id, optimizedImage);
          
          setEditingProject({
            ...editingProject,
            image: optimizedImage
          });
          setImagePreview(optimizedImage);
          
          toast({
            title: "Kép sikeresen feltöltve",
            description: `Méret: ${sizeKB}KB - Külön tárolva`
          });
        }
      } else {
        // Mentjük a képet külön
        saveImageSeparately(editingProject.id, optimizedImage);
        
        setEditingProject({
          ...editingProject,
          image: optimizedImage
        });
        setImagePreview(optimizedImage);
        
        toast({
          title: "Kép sikeresen optimalizálva",
          description: `Méret: ${sizeKB}KB - Külön tárolva`
        });
      }
      
    } catch (error) {
      console.error('Image optimization failed:', error);
      toast({
        title: "Kép optimalizálási hiba",
        description: "A kép feldolgozása nem sikerült. Próbálja másik képpel.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Remove uploaded image and use default
  const handleRemoveImage = () => {
    if (!editingProject) return;
    
    // Eltávolítjuk a képet a külön tárolásból
    removeImageByProjectId(editingProject.id);
    
    const defaultImage = getImageForCategory(editingProject.category);
    setEditingProject({
      ...editingProject,
      image: defaultImage
    });
    setImagePreview("");
    
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    toast({
      title: "Kép eltávolítva",
      description: "Alapértelmezett kép visszaállítva"
    });
  };

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now(), // Simple ID generation
      title: "",
      category: "residential",
      image: residentialImage,
      description: "",
      features: [],
      location: "",
      year: new Date().getFullYear().toString()
    };
    setEditingProject(newProject);
    setImagePreview("");
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    // Betöltjük a projekt adatait
    setEditingProject({ ...project });
    
    // Külön tárolásból betöltjük a képet ha van
    const customImage = getImageByProjectId(project.id);
    
    if (customImage) {
      // Van egyedi kép - használjuk azt
      setEditingProject({ ...project, image: customImage });
      setImagePreview(customImage);
    } else if (project.image.startsWith('data:')) {
      // Régi formátumú base64 kép
      setImagePreview(project.image);
    } else {
      // Nincs egyedi kép
      setImagePreview("");
    }
    
    setIsDialogOpen(true);
  };

  const handleSaveProject = () => {
    if (!editingProject) return;

    // Validation
    if (!editingProject.title.trim()) {
      toast({
        title: "Hiba",
        description: "A projekt címe kötelező",
        variant: "destructive",
      });
      return;
    }

    if (!editingProject.description.trim()) {
      toast({
        title: "Hiba", 
        description: "A projekt leírása kötelező",
        variant: "destructive",
      });
      return;
    }

    // A kép már elmentve a handleImageUpload-ban, itt csak a projektet frissítjük
    const finalProject = {
      ...editingProject,
      // A kép már a külön tárolásban van, ezt megtartjuk
      image: editingProject.image || getImageForCategory(editingProject.category)
    };

    // Check if it's a new project or editing existing
    const existingIndex = projects.findIndex(p => p.id === finalProject.id);
    
    if (existingIndex >= 0) {
      // Update existing project
      const updatedProjects = [...projects];
      updatedProjects[existingIndex] = finalProject;
      setProjects(updatedProjects);
      toast({
        title: "Sikeres frissítés",
        description: "Projekt sikeresen frissítve",
      });
    } else {
      // Add new project
      setProjects([...projects, finalProject]);
      toast({
        title: "Sikeres hozzáadás",
        description: "Új projekt sikeresen hozzáadva",
      });
    }

    setIsDialogOpen(false);
    setEditingProject(null);
    setImagePreview("");
  };

  const handleDeleteProject = (id: number) => {
    // Töröljük a projektet
    setProjects(projects.filter(p => p.id !== id));
    
    // Töröljük a hozzá tartozó képet is a külön tárolásból
    removeImageByProjectId(id);
    
    toast({
      title: "Sikeres törlés",
      description: "Projekt és kapcsolódó kép törölve",
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (!editingProject) return;
    const newFeatures = [...editingProject.features];
    newFeatures[index] = value;
    setEditingProject({
      ...editingProject,
      features: newFeatures
    });
  };

  const addFeature = () => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      features: [...editingProject.features, ""]
    });
  };

  const removeFeature = (index: number) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      features: editingProject.features.filter((_, i) => i !== index)
    });
  };

  // Storage information
  const storageInfo = getStorageInfo();
  
  // Export function
  const handleExportProjects = () => {
    try {
      const exportInfo = exportProjectsAndImages();
      toast({
        title: "Export sikeres",
        description: `Projektek: ${exportInfo.projectsSize}KB, Képek: ${exportInfo.imagesSize}KB (${exportInfo.imagesCount} kép)`,
      });
    } catch (error) {
      toast({
        title: "Export hiba",
        description: "Nem sikerült exportálni a projekteket",
        variant: "destructive",
      });
    }
  };

  // Import function
  const handleImportProjects = async (projectsFile: File, imagesFile?: File) => {
    try {
      const importInfo = await importProjectsAndImages(projectsFile, imagesFile);
      
      // Refresh the component by reloading projects
      window.location.reload();
      
      toast({
        title: "Import sikeres",
        description: `${importInfo.projectsCount} projekt és ${importInfo.imagesCount} kép importálva`,
      });
    } catch (error) {
      toast({
        title: "Import hiba",
        description: "Nem sikerült importálni a projekteket",
        variant: "destructive",
      });
    }
  };

  // Import button handlers
  const handleProjectsFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      if (file.type === 'application/json') {
        await handleImportProjects(file);
        toast({
          title: "Projektek importálva",
          description: "Projektek sikeresen importálva JSON fájlból",
        });
      } else {
        toast({
          title: "Nem támogatott fájltípus",
          description: "Csak JSON formátumú projektfájlokat lehet importálni",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Projects import error:', error);
      toast({
        title: "Import hiba",
        description: "Nem sikerült importálni a projekteket. Ellenőrizze a fájl formátumát.",
        variant: "destructive",
      });
    }
    
    // Clear the file input
    e.target.value = '';
  };

  const handleImagesFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      if (file.type === 'application/json') {
        // JSON képfájl importálása
        const imagesCount = await importImagesOnly(file);
        
        // Refresh the component by reloading projects
        window.location.reload();
        
        toast({
          title: "Képek importálva",
          description: `${imagesCount} kép sikeresen importálva JSON fájlból`,
        });
      } else {
        // Más fájltípusok esetén hiba
        toast({
          title: "Nem támogatott fájltípus",
          description: "Csak JSON formátumú képfájlokat lehet importálni",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Images import error:', error);
      toast({
        title: "Import hiba",
        description: "Nem sikerült importálni a képeket. Ellenőrizze a fájl formátumát.",
        variant: "destructive",
      });
    }
    
    // Clear the file input
    e.target.value = '';
  };

  const resetToDefaults = () => {
    setProjects(defaultProjects);
    // Töröljük a külön tárolt adatokat is
    localStorage.removeItem('getek_projects_data');
    localStorage.removeItem('getek_images');
    
    toast({
      title: "Visszaállítás",
      description: "Projektek visszaállítva az alapértelmezettre",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-10">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold font-heading mb-2">
              Admin: <span className="text-gradient">Projektek Kezelése</span>
            </h1>
            <p className="text-muted-foreground">
              Referencia projektek hozzáadása, szerkesztése és törlése
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{storageInfo.projects.count}</div>
                <div className="text-xs text-muted-foreground">Projektek</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{storageInfo.images.count}</div>
                <div className="text-xs text-muted-foreground">Egyedi Képek</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{storageInfo.projects.sizeKB}KB</div>
                <div className="text-xs text-muted-foreground">Szöveges Adatok</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{storageInfo.images.sizeKB}KB</div>
                <div className="text-xs text-muted-foreground">Képek Mérete</div>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${
                        storageInfo.localStorage.usedPercentage > 80 ? 'bg-red-500' :
                        storageInfo.localStorage.usedPercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(storageInfo.localStorage.usedPercentage, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-muted-foreground">
                    LocalStorage: {storageInfo.localStorage.usedPercentage}% használt
                  </span>
                </div>
                {storageInfo.images.count > 0 && (
                  <span className="text-muted-foreground">
                    | Átlag képméret: {storageInfo.images.avgSizeKB}KB
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                <FileUp className="w-4 h-4 mr-2" />
                Export/Import Útmutató
              </h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p><strong>Export:</strong> 2 fájl letöltődik - projektek JSON és képek JSON</p>
                <p><strong>Import Projektek:</strong> getek_projects_YYYY-MM-DD.json fájl</p>
                <p><strong>Import Képek:</strong> getek_images_YYYY-MM-DD.json fájl</p>
                <p><em>Mindkét fájltípus JSON formátum!</em></p>
              </div>
            </div>
          </div>
          <div className="space-x-2">
            <Button onClick={handleAddProject} className="bg-primary hover:bg-primary-dark">
              <Plus className="w-4 h-4 mr-2" />
              Új Projekt
            </Button>
            <Button onClick={handleExportProjects} variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button 
              onClick={() => projectsImportRef.current?.click()} 
              variant="outline" 
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <FileUp className="w-4 h-4 mr-2" />
              Import Projektek
            </Button>
            <Button 
              onClick={() => imagesImportRef.current?.click()} 
              variant="outline" 
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              <Image className="w-4 h-4 mr-2" />
              Import Képek
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                  Alapértelmezett
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset to Defaults?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will delete all custom projects and restore the original ones. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={resetToDefaults}>
                    Reset
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="glass-card overflow-hidden">
              {/* Project Image */}
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-40 object-cover"
                />
                {project.image.startsWith('data:') && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      Custom Image
                    </Badge>
                  </div>
                )}
                <div className="absolute top-2 right-2 space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEditProject(project)}
                    className="bg-white/90 hover:bg-white"
                  >
                    <Pencil className="w-3 h-3" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="bg-red-500/90 hover:bg-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Project?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{project.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteProject(project.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                </div>

                <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                  {project.description}
                </p>

                <div className="space-y-2">
                  <div>
                    <h4 className="font-medium text-foreground text-sm mb-1">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {project.features.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Location:</span> {project.location}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Year:</span> {project.year}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Edit/Add Project Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject?.id && projects.find(p => p.id === editingProject.id) ? "Edit Project" : "Add New Project"}
              </DialogTitle>
            </DialogHeader>
            
            {editingProject && (
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      title: e.target.value
                    })}
                    placeholder="Enter project title"
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={editingProject.category} 
                    onValueChange={(value: "office" | "apartment" | "residential" | "hotel" | "industrial" | "other") => {
                      const updatedProject = {
                        ...editingProject,
                        category: value
                      };
                      
                      // Only update image to default if no custom image is uploaded
                      if (!editingProject.image.startsWith('data:')) {
                        updatedProject.image = getImageForCategory(value);
                      }
                      
                      setEditingProject(updatedProject);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Irodaházak</SelectItem>
                      <SelectItem value="apartment">Társasházak</SelectItem>
                      <SelectItem value="residential">Családi házak</SelectItem>
                      <SelectItem value="hotel">Hotelek</SelectItem>
                      <SelectItem value="industrial">Ipari Csarnokok és Raktárak</SelectItem>
                      <SelectItem value="other">Egyéb különleges építmények</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Image Upload */}
                <div>
                  <Label>Project Image</Label>
                  <div className="space-y-4">
                    {/* Current Image Preview */}
                    <div className="relative w-full h-40 border-2 border-dashed border-border rounded-lg overflow-hidden">
                      {editingProject.image && (
                        <img 
                          src={editingProject.image} 
                          alt="Project preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                      {!editingProject.image && (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          <Image className="w-8 h-8 mr-2" />
                          No image selected
                        </div>
                      )}
                    </div>

                    {/* Upload Controls */}
                    <div className="flex flex-wrap gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={isUploading}
                          asChild
                        >
                          <span className="cursor-pointer">
                            <Upload className="w-4 h-4 mr-2" />
                            {isUploading ? "Uploading..." : "Upload Image"}
                          </span>
                        </Button>
                      </label>
                      
                      {editingProject.image.startsWith('data:') && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleRemoveImage}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Use Default
                        </Button>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Upload a custom image or use the default category image. 
                      Images will be automatically optimized and compressed.
                      Maximum file size: 10MB. Supported formats: JPG, PNG, GIF, WebP
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      description: e.target.value
                    })}
                    placeholder="Enter project description"
                    rows={3}
                  />
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={editingProject.location}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      location: e.target.value
                    })}
                    placeholder="Enter project location"
                  />
                </div>

                {/* Year */}
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      year: e.target.value
                    })}
                    placeholder="Enter project year"
                  />
                </div>

                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Features</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addFeature}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Feature
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {editingProject.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          placeholder="Enter feature"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeFeature(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsDialogOpen(false);
                setImagePreview("");
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}>
                Mégsem
              </Button>
              <Button onClick={handleSaveProject} disabled={isUploading}>
                <Save className="w-4 h-4 mr-2" />
                Projekt Mentése
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Hidden import file inputs */}
        <input
          ref={projectsImportRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleProjectsFileImport}
        />
        <input
          ref={imagesImportRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleImagesFileImport}
        />
      </div>
    </div>
  );
};

export default AdminProjects;
