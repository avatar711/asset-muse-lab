import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Image, Palette, ArrowRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onComplete: (files: File[], palette: string[]) => void;
  palette: string[];
}

export const FileUpload: React.FC<FileUploadProps> = ({ onComplete, palette }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [extractedPalette, setExtractedPalette] = useState<string[]>(palette);
  const [isExtracting, setIsExtracting] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const extractColorsFromImage = useCallback(async (file: File): Promise<string[]> => {
    return new Promise<string[]>((resolve) => {
      const img = document.createElement('img') as HTMLImageElement;
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            resolve(['#8B5CF6', '#A78BFA', '#C4B5FD', '#E0E7FF', '#F3F4F6']);
            return;
          }
          
          // Resize image for faster processing
          const maxSize = 150;
          const ratio = Math.min(maxSize / img.width, maxSize / img.height);
          canvas.width = img.width * ratio;
          canvas.height = img.height * ratio;
          
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Extract dominant colors using a simple sampling approach
          const colorCounts = new Map<string, number>();
          
          // Sample every 8th pixel for performance
          for (let i = 0; i < data.length; i += 32) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            
            // Skip transparent pixels
            if (a < 128) continue;
            
            // Group similar colors (reduce precision)
            const rBucket = Math.floor(r / 32) * 32;
            const gBucket = Math.floor(g / 32) * 32;
            const bBucket = Math.floor(b / 32) * 32;
            
            const color = `${rBucket},${gBucket},${bBucket}`;
            colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
          }
          
          // Get the most frequent colors
          const sortedColors = Array.from(colorCounts.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(([color]) => {
              const [r, g, b] = color.split(',').map(Number);
              return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
            });
          
          if (sortedColors.length > 0) {
            resolve(sortedColors);
          } else {
            resolve(['#8B5CF6', '#A78BFA', '#C4B5FD', '#E0E7FF', '#F3F4F6']);
          }
        } catch (error) {
          console.error('Error extracting colors:', error);
          resolve(['#8B5CF6', '#A78BFA', '#C4B5FD', '#E0E7FF', '#F3F4F6']);
        }
      };
      
      img.onerror = () => {
        console.error('Error loading image for color extraction');
        resolve(['#8B5CF6', '#A78BFA', '#C4B5FD', '#E0E7FF', '#F3F4F6']);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }, []);

  const processFiles = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    
    setIsExtracting(true);
    setUploadedFiles(prev => [...prev, ...files]);
    
    try {
      // Extract colors from the first image (representative of the batch)
      const colors = await extractColorsFromImage(files[0]);
      setExtractedPalette(colors);
    } catch (error) {
      console.error('Error processing files:', error);
    } finally {
      setIsExtracting(false);
    }
  }, [extractColorsFromImage]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    processFiles(files);
  }, [processFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const canProceed = uploadedFiles.length >= 3;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Upload Reference Images</h2>
        <p className="text-muted-foreground text-lg">
          Upload 10-40 images that represent your brand style and aesthetic
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-elegant border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Drop your images here</span>
              </CardTitle>
              <CardDescription>
                JPG, PNG, WebP files up to 10MB each
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                  dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Image className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Drag & drop images here</p>
                    <p className="text-muted-foreground">or click to browse</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Uploaded Images ({uploadedFiles.length})</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg bg-muted overflow-hidden">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-soft border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Color Palette</span>
              </CardTitle>
              <CardDescription>
                Extracted from your images
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isExtracting ? (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="animate-pulse">Extracting colors...</div>
                </div>
              ) : extractedPalette.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {extractedPalette.slice(0, 6).map((color, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div
                        className="w-8 h-8 rounded-lg border-2 border-border"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm font-mono">{color.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Upload images to extract colors
                </div>
              )}
            </CardContent>
          </Card>

          <Button
            variant="hero"
            size="lg"
            className="w-full"
            disabled={!canProceed}
            onClick={() => onComplete(uploadedFiles, extractedPalette)}
          >
            Continue to Training
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};