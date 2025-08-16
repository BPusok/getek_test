import React, { useState, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Save, X, Plus, Upload, Download, RotateCcw, FileUp } from 'lucide-react';
import { toast } from 'sonner';
import { useProjectsPersistent } from '@/hooks/use-projects-persistent';

const AdminProjectsWithBackup = () => {
  const { key } = useParams<{ key: string }>();
  
  // Check if the key matches our admin key
  if (key !== 'getek2025admin') {
    return <Navigate to="/" replace />;
  }

  const { projects, saveProjects, exportProjects, importProjects, resetToDefaults } = useProjectsPersistent();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    category: 'office' as const,
    description: '',
    features: [''],
    location: '',
    year: '',
    image: ''
  });

  const categoryLabels = {
    'office': 'Irodaház',
    'apartment': 'Lakóépület', 
    'residential': 'Családi ház',
    'hotel': 'Szálloda',
    'industrial': 'Ipari épület',
    'other': 'Egyéb'
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'office',
      description: '',
      features: [''],
      location: '',
      year: '',
      image: ''
    });
    setEditingId(null);
    setIsAddingNew(false);
  };

  const startEdit = (project: any) => {
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      features: project.features,
      location: project.location,
      year: project.year,
      image: project.image
    });
    setEditingId(project.id);
    setIsAddingNew(false);
  };

  const startAdd = () => {
    resetForm();
    setIsAddingNew(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('A kép mérete maximum 5MB lehet');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        
        // Create image to get dimensions and resize if needed
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Calculate new dimensions (max 800px width)
          const maxWidth = 800;
          let { width, height } = img;
          
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress image
          ctx?.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          
          setFormData(prev => ({ ...prev, image: compressedDataUrl }));
          toast.success('Kép sikeresen feltöltve és optimalizálva');
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.location || !formData.year) {
      toast.error('Kérjük töltse ki az összes kötelező mezőt');
      return;
    }

    const filteredFeatures = formData.features.filter(f => f.trim() !== '');
    
    if (isAddingNew) {
      const newId = Math.max(...projects.map(p => p.id), 0) + 1;
      const newProject = {
        id: newId,
        ...formData,
        features: filteredFeatures
      };
      saveProjects([...projects, newProject]);
      toast.success('Új projekt sikeresen hozzáadva');
    } else if (editingId) {
      const updatedProjects = projects.map(p => 
        p.id === editingId 
          ? { ...p, ...formData, features: filteredFeatures }
          : p
      );
      saveProjects(updatedProjects);
      toast.success('Projekt sikeresen frissítve');
    }
    
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm('Biztosan törli ezt a projektet?')) {
      const updatedProjects = projects.filter(p => p.id !== id);
      saveProjects(updatedProjects);
      toast.success('Projekt törölve');
    }
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await importProjects(file);
        toast.success('Projektek sikeresen importálva!');
      } catch (error) {
        toast.error('Importálási hiba: ' + (error as Error).message);
      }
    }
  };

  const handleExport = () => {
    try {
      exportProjects();
      toast.success('Projektek exportálva!');
    } catch (error) {
      toast.error('Exportálási hiba');
    }
  };

  const handleReset = () => {
    if (confirm('Biztosan visszaállítja az eredeti projekteket? Minden változtatás elvész!')) {
      resetToDefaults();
      resetForm();
      toast.success('Projektek visszaállítva az alapértelmezettre');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">GÉTEK Admin Felület</h1>
          <p className="text-gray-600">Projektek kezelése és szerkesztése</p>
        </div>

        {/* Backup/Import Controls */}
        <Card className="mb-8 border-2 border-dashed border-blue-300">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <FileUp className="w-5 h-5 mr-2" />
              Adatkezelés és Backup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button 
                onClick={handleExport}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
              
              <Button 
                onClick={handleImportClick}
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import JSON
              </Button>
              
              <Button 
                onClick={handleReset}
                variant="outline"
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Alapértelmezett
              </Button>

              <div className="text-sm text-gray-500 flex items-center">
                Projektek száma: <strong className="ml-1">{projects.length}</strong>
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileImport}
              style={{ display: 'none' }}
            />
            
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Tipp:</strong> Rendszeresen exportáld a projekteket mentés céljából. 
                Az export fájlt új build előtt importálhatod vissza.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Add New Project Button */}
        <div className="mb-8">
          <Button 
            onClick={startAdd} 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isAddingNew || editingId !== null}
          >
            <Plus className="w-4 h-4 mr-2" />
            Új Projekt Hozzáadása
          </Button>
        </div>

        {/* Form for adding/editing */}
        {(isAddingNew || editingId) && (
          <Card className="mb-8 border-2 border-blue-200">
            <CardHeader>
              <CardTitle>
                {isAddingNew ? 'Új Projekt Hozzáadása' : 'Projekt Szerkesztése'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Projekt címe *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="pl. Modern Irodaház"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Kategória *</label>
                  <Select value={formData.category} onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categoryLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Leírás *</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Projekt részletes leírása..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Helyszín *</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="pl. Budapest, V. kerület"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Év *</label>
                  <Input
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                    placeholder="pl. 2023"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Jellemzők</label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="pl. Smart termosztátok"
                    />
                    {formData.features.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFeature}
                  className="mt-2"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Új jellemző
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Projekt kép</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mb-2"
                />
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-32 h-20 object-cover rounded border"
                    />
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Maximális fájlméret: 5MB. A kép automatikusan optimalizálva lesz.
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Mentés
                </Button>
                <Button onClick={resetForm} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Mégse
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Projects List */}
        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="lg:w-48 flex-shrink-0">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    )}
                  </div>
                  
                  <div className="flex-grow space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
                        <Badge variant="secondary" className="mt-1">
                          {categoryLabels[project.category]}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(project)}
                          disabled={editingId !== null || isAddingNew}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(project.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>📍 {project.location}</span>
                      <span>📅 {project.year}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {projects.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">Még nincsenek projektek. Adjon hozzá egy újat!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminProjectsWithBackup;
