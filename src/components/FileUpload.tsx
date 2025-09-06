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

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files]);
      // Mock palette extraction
      const mockColors = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#E0E7FF', '#F3F4F6'];
      setExtractedPalette(mockColors);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files]);
      // Mock palette extraction
      const mockColors = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#E0E7FF', '#F3F4F6'];
      setExtractedPalette(mockColors);
    }
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
              {extractedPalette.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {extractedPalette.map((color, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div
                        className="w-8 h-8 rounded-lg border-2 border-border"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm font-mono">{color}</span>
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