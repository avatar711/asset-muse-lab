import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Type, Download, Star, RotateCcw } from 'lucide-react';
import { Generation } from '@/types/project';
import { RatingStars } from './RatingStars';

interface LogoGeneratorProps {
  generations: Generation[];
  onGenerate: (text: string) => Generation;
  onRate: (id: string, rating: number) => void;
  onStar: (id: string, starred: boolean) => void;
}

export const LogoGenerator: React.FC<LogoGeneratorProps> = ({
  generations,
  onGenerate,
  onRate,
  onStar,
}) => {
  const [logoText, setLogoText] = useState('Logan');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!logoText.trim()) return;
    
    setIsGenerating(true);
    // Simulate API delay
    setTimeout(() => {
      onGenerate(logoText);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-soft border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Type className="h-5 w-5" />
            <span>Generate Logo Wordmark</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="logoText">Logo Text</Label>
              <Input
                id="logoText"
                value={logoText}
                onChange={(e) => setLogoText(e.target.value)}
                placeholder="Enter your brand name"
                className="bg-background/50"
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={handleGenerate}
                disabled={isGenerating || !logoText.trim()}
              >
                {isGenerating ? (
                  <RotateCcw className="h-4 w-4 animate-spin" />
                ) : (
                  <Type className="h-4 w-4" />
                )}
                {isGenerating ? 'Creating...' : 'Create Wordmark'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {generations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {generations.map((generation) => (
            <Card key={generation.id} className="shadow-soft border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="aspect-video bg-gradient-subtle rounded-lg flex items-center justify-center border">
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-brand bg-clip-text text-transparent mb-2">
                        {generation.outputs.text}
                      </div>
                      <p className="text-xs text-muted-foreground">PNG + SVG Preview</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <RatingStars
                        rating={generation.rating || 0}
                        onChange={(rating) => onRate(generation.id, rating)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onStar(generation.id, !generation.starred)}
                      >
                        <Star
                          className={`h-4 w-4 ${
                            generation.starred
                              ? 'fill-primary text-primary'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                        PNG
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                        SVG
                      </Button>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Generated {generation.createdAt.toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <Type className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">No logos generated yet</p>
          <p>Enter your brand name and click "Create Wordmark" to get started</p>
        </div>
      )}
    </div>
  );
};