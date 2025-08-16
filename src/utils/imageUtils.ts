// Utility functions for image handling in admin panel

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
};

export const estimateBase64Size = (base64String: string): number => {
  // Base64 encoding increases size by ~33%
  // Remove data URL prefix to get actual base64 data
  const base64Data = base64String.split(',')[1] || base64String;
  return Math.round((base64Data.length * 3) / 4);
};

export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'Please select a valid image file' };
  }
  
  // Check file size (10MB limit)
  if (file.size > 10 * 1024 * 1024) {
    return { valid: false, error: 'Image file must be smaller than 10MB' };
  }
  
  // Check file name
  if (file.name.length > 255) {
    return { valid: false, error: 'File name is too long' };
  }
  
  return { valid: true };
};
