// src/utils/imageOptimizer.ts
export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'auto';
}

export const optimizeImage = (
  file: File, 
  options: ImageOptimizationOptions = {}
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const {
      maxWidth = 600,
      maxHeight = 400, 
      quality = 0.7,
      format = 'auto'
    } = options;

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // Képméret számítása - arányok megtartása
        let { width, height } = img;
        
        // Méretezés ha szükséges
        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;
          
          if (width > height) {
            width = Math.min(width, maxWidth);
            height = width / aspectRatio;
          } else {
            height = Math.min(height, maxHeight);
            width = height * aspectRatio;
          }
        }
        
        canvas.width = Math.round(width);
        canvas.height = Math.round(height);
        
        // Képminőség javítás
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Fehér háttér JPEG-hez
        if (format === 'jpeg' || (format === 'auto' && !supportsWebP())) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        // Kép rajzolása
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Formátum választás
        let outputFormat: string;
        let outputQuality: number;
        
        if (format === 'auto') {
          if (supportsWebP()) {
            outputFormat = 'image/webp';
            outputQuality = quality;
          } else {
            outputFormat = 'image/jpeg';
            outputQuality = quality * 0.9; // JPEG-nél kicsit alacsonyabb
          }
        } else if (format === 'webp') {
          outputFormat = 'image/webp';
          outputQuality = quality;
        } else {
          outputFormat = 'image/jpeg';
          outputQuality = quality * 0.9;
        }
        
        const optimizedDataUrl = canvas.toDataURL(outputFormat, outputQuality);
        
        // Ellenőrizzük a méretet
        const sizeKB = Math.round((optimizedDataUrl.length * 3/4) / 1024);
        console.log(`Image optimized: ${canvas.width}x${canvas.height}, ${sizeKB}KB, ${outputFormat}`);
        
        // Ha még mindig túl nagy, csökkentsük a minőséget
        if (sizeKB > 500 && outputQuality > 0.3) {
          const reducedQuality = Math.max(0.3, outputQuality - 0.2);
          const reducedDataUrl = canvas.toDataURL(outputFormat, reducedQuality);
          const reducedSizeKB = Math.round((reducedDataUrl.length * 3/4) / 1024);
          
          console.log(`Further reduced: ${reducedSizeKB}KB at ${reducedQuality} quality`);
          resolve(reducedDataUrl);
        } else {
          resolve(optimizedDataUrl);
        }
      };
      
      img.onerror = () => reject(new Error('Image loading failed'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('File reading failed'));
    reader.readAsDataURL(file);
  });
};

// WebP támogatás ellenőrzése
const supportsWebP = (): boolean => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').startsWith('data:image/webp');
};

// Thumbnail generálás
export const generateThumbnail = (
  file: File,
  size: { width: number; height: number } = { width: 150, height: 100 }
): Promise<string> => {
  return optimizeImage(file, {
    maxWidth: size.width,
    maxHeight: size.height,
    quality: 0.6,
    format: 'jpeg' // Thumbnail-hoz JPEG a biztos
  });
};

// Fájlméret becslés Base64-ből
export const getBase64SizeKB = (base64: string): number => {
  return Math.round((base64.length * 3/4) / 1024);
};

// Képadat tisztítás az exporthoz
export const cleanImageForExport = (base64: string): string => {
  // Remove data URL prefix for smaller export
  return base64.replace(/^data:image\/[^;]+;base64,/, '');
};

// Képadat visszaállítás importnál
export const restoreImageFromExport = (cleanData: string, format: string = 'jpeg'): string => {
  return `data:image/${format};base64,${cleanData}`;
};
