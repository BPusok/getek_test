// src/utils/imageStorage.ts
// Külön képkezelési megoldások

export interface ProjectWithImageRef {
  id: number;
  title: string;
  category: string;
  description: string;
  features: string[];
  location: string;
  year: string;
  imageUrl?: string;          // URL alapú kép (szerver/assets)
  imageFileName?: string;     // Feltöltött kép fájlneve
  hasCustomImage?: boolean;   // Van-e egyedi kép
}

export interface ImageData {
  id: number;
  fileName: string;
  data: string;              // Base64 kép adat
  size: number;              // KB-ban
  uploadDate: string;
}

// Képek külön tárolása
const IMAGES_STORAGE_KEY = 'getek_images';
const PROJECTS_STORAGE_KEY = 'getek_projects_data';

// ===== KÉP TÁROLÁS =====

export const saveImageSeparately = (projectId: number, base64Data: string): string => {
  const images = getStoredImages();
  const fileName = `project_${projectId}_${Date.now()}.webp`;
  
  const imageData: ImageData = {
    id: projectId,
    fileName,
    data: base64Data,
    size: Math.round((base64Data.length * 3/4) / 1024),
    uploadDate: new Date().toISOString()
  };
  
  // Eltávolítjuk a régi képet ha van
  const filteredImages = images.filter(img => img.id !== projectId);
  filteredImages.push(imageData);
  
  localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(filteredImages));
  return fileName;
};

export const getStoredImages = (): ImageData[] => {
  try {
    const stored = localStorage.getItem(IMAGES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading images:', error);
    return [];
  }
};

export const getImageByProjectId = (projectId: number): string | null => {
  const images = getStoredImages();
  const imageData = images.find(img => img.id === projectId);
  return imageData ? imageData.data : null;
};

export const removeImageByProjectId = (projectId: number): void => {
  const images = getStoredImages();
  const filteredImages = images.filter(img => img.id !== projectId);
  localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(filteredImages));
};

// ===== PROJEKT ADATOK (Képek nélkül) =====

export const saveProjectsWithoutImages = (projects: any[]): void => {
  const projectsData = projects.map(project => ({
    ...project,
    image: undefined, // Képek kivétele
    imageFileName: project.image?.startsWith('data:') ? `project_${project.id}.webp` : undefined,
    hasCustomImage: project.image?.startsWith('data:') || false
  }));
  
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projectsData));
};

export const getProjectsWithoutImages = (): ProjectWithImageRef[] => {
  try {
    const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading projects data:', error);
    return [];
  }
};

// ===== EXPORT/IMPORT =====

export const exportProjectsAndImages = () => {
  const projects = getProjectsWithoutImages();
  const images = getStoredImages();
  
  // JSON export - csak szöveges adatok
  const projectsJson = JSON.stringify(projects, null, 2);
  const projectsBlob = new Blob([projectsJson], { type: 'application/json' });
  
  // Letöltés - projektek
  const projectsLink = document.createElement('a');
  projectsLink.href = URL.createObjectURL(projectsBlob);
  projectsLink.download = `getek_projects_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(projectsLink);
  projectsLink.click();
  document.body.removeChild(projectsLink);
  
  // Képek külön export - csak ha vannak képek
  if (images.length > 0) {
    const imagesData = {
      images: images.map(img => ({
        id: img.id,
        fileName: img.fileName,
        data: img.data,
        size: img.size,
        uploadDate: img.uploadDate
      }))
    };
    
    const imagesJson = JSON.stringify(imagesData, null, 2);
    const imagesBlob = new Blob([imagesJson], { type: 'application/json' });
    
    // Kis késleltetéssel letöltjük a képeket is
    setTimeout(() => {
      const imagesLink = document.createElement('a');
      imagesLink.href = URL.createObjectURL(imagesBlob);
      imagesLink.download = `getek_images_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(imagesLink);
      imagesLink.click();
      document.body.removeChild(imagesLink);
    }, 500);
  }
  
  return {
    projectsSize: Math.round(projectsBlob.size / 1024),
    imagesSize: images.length > 0 ? Math.round(JSON.stringify(images).length / 1024) : 0,
    imagesCount: images.length
  };
};

// Importálás - rugalmas fájltípus kezelés
export const importProjectsAndImages = async (
  projectsFile: File, 
  imagesFile?: File
): Promise<{ projectsCount: number; imagesCount: number }> => {
  
  // Projektek betöltése
  const projectsText = await projectsFile.text();
  const projects = JSON.parse(projectsText);
  
  // Képek betöltése (opcionális és rugalmas)
  let imagesCount = 0;
  if (imagesFile) {
    if (imagesFile.type === 'application/json') {
      // JSON formátumú képek import
      const imagesText = await imagesFile.text();
      const imagesData = JSON.parse(imagesText);
      
      if (imagesData.images && Array.isArray(imagesData.images)) {
        localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(imagesData.images));
        imagesCount = imagesData.images.length;
      }
    } else if (imagesFile.type.startsWith('image/')) {
      // Egyetlen képfájl importálása
      // Ezt később implementáljuk ha szükséges
      console.log('Single image import not yet implemented');
    }
  }
  
  // Projektek mentése
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  
  return {
    projectsCount: projects.length,
    imagesCount
  };
};

// Új funkció: Csak képek importálása JSON-ből
export const importImagesOnly = async (imagesFile: File): Promise<number> => {
  if (imagesFile.type !== 'application/json') {
    throw new Error('Képek importálásához JSON fájl szükséges');
  }
  
  const imagesText = await imagesFile.text();
  const imagesData = JSON.parse(imagesText);
  
  if (imagesData.images && Array.isArray(imagesData.images)) {
    localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(imagesData.images));
    return imagesData.images.length;
  }
  
  return 0;
};

// ===== STORAGE INFO =====

export const getStorageInfo = () => {
  const projects = getProjectsWithoutImages();
  const images = getStoredImages();
  
  const projectsSize = JSON.stringify(projects).length;
  const imagesSize = JSON.stringify(images).length;
  const totalSize = projectsSize + imagesSize;
  
  return {
    projects: {
      count: projects.length,
      sizeKB: Math.round(projectsSize / 1024)
    },
    images: {
      count: images.length,
      sizeKB: Math.round(imagesSize / 1024),
      avgSizeKB: images.length > 0 ? Math.round(images.reduce((sum, img) => sum + img.size, 0) / images.length) : 0
    },
    total: {
      sizeKB: Math.round(totalSize / 1024)
    },
    localStorage: {
      usedPercentage: Math.round((totalSize / (5 * 1024 * 1024)) * 100) // Assuming 5MB limit
    }
  };
};
