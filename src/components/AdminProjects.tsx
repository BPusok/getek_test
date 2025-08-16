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
import { Pencil, Trash2, Plus, Save, X, Upload, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  // Check if the access key is correct
  const ADMIN_KEY = "getek2025admin"; // Change this to your desired admin key
  
  if (key !== ADMIN_KEY) {
    return <Navigate to="/" replace />;
  }

  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('getek_projects');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (error) {
        console.error('Error parsing saved projects:', error);
        setProjects(defaultProjects);
      }
    } else {
      setProjects(defaultProjects);
    }
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('getek_projects', JSON.stringify(projects));
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

  // Convert file to base64 for storage
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Optimize image by resizing and compressing
  const optimizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = document.createElement('img');
      
      img.onload = () => {
        // Set max dimensions
        const maxWidth = 800;
        const maxHeight = 600;
        
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }
        
        // Set canvas size
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with compression
        const compressedImage = canvas.toDataURL('image/jpeg', 0.8);
        resolve(compressedImage);
        
        // Clean up
        URL.revokeObjectURL(img.src);
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editingProject) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select a valid image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB for original, will be compressed)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image file must be smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // Optimize and compress the image
      const optimizedImage = await optimizeImage(file);
      
      setEditingProject({
        ...editingProject,
        image: optimizedImage
      });
      
      setImagePreview(optimizedImage);
      
      toast({
        title: "Success",
        description: "Image uploaded and optimized successfully",
      });
    } catch (error) {
      console.error('Image upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload and process image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Remove uploaded image and use default
  const handleRemoveImage = () => {
    if (!editingProject) return;
    
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
    setEditingProject({ ...project });
    // Set preview if it's a custom uploaded image (base64)
    setImagePreview(project.image.startsWith('data:') ? project.image : "");
    setIsDialogOpen(true);
  };

  const handleSaveProject = () => {
    if (!editingProject) return;

    // Validation
    if (!editingProject.title.trim()) {
      toast({
        title: "Error",
        description: "Project title is required",
        variant: "destructive",
      });
      return;
    }

    if (!editingProject.description.trim()) {
      toast({
        title: "Error", 
        description: "Project description is required",
        variant: "destructive",
      });
      return;
    }

    // Update image - use uploaded image if available, otherwise use default
    const finalProject = {
      ...editingProject,
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
        title: "Success",
        description: "Project updated successfully",
      });
    } else {
      // Add new project
      setProjects([...projects, finalProject]);
      toast({
        title: "Success",
        description: "Project added successfully",
      });
    }

    setIsDialogOpen(false);
    setEditingProject(null);
    setImagePreview("");
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
    toast({
      title: "Success",
      description: "Project deleted successfully",
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

  const resetToDefaults = () => {
    setProjects(defaultProjects);
    localStorage.setItem('getek_projects', JSON.stringify(defaultProjects));
    toast({
      title: "Success",
      description: "Projects reset to defaults",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-10">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold font-heading mb-2">
              Admin: <span className="text-gradient">Projects Management</span>
            </h1>
            <p className="text-muted-foreground">
              Add, edit, or delete reference projects
            </p>
            <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
              <span>Total Projects: {projects.length}</span>
              <span>Custom Images: {projects.filter(p => p.image.startsWith('data:')).length}</span>
            </div>
          </div>
          <div className="space-x-4">
            <Button onClick={handleAddProject} className="bg-primary hover:bg-primary-dark">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  Reset to Defaults
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
                Cancel
              </Button>
              <Button onClick={handleSaveProject} disabled={isUploading}>
                <Save className="w-4 h-4 mr-2" />
                Save Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminProjects;
