import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image, Star, Zap } from 'lucide-react';
import { Generation } from '@/types/project';
import { RatingStars } from './RatingStars';

interface ImageGeneratorProps {
  generations: Generation[];
  onRate: (id: string, rating: number) => void;
  onStar: (id: string, starred: boolean) => void;
}

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  generations,
  onRate,
  onStar,
}) => {
  return (
    <div className="space-y-6">
      <Card className="shadow-soft border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image className="h-5 w-5" />
              <span>AI Image Generation</span>
            </div>
            <Badge variant="secondary" className="bg-warning/20 text-warning-foreground border-warning/30">
              Coming Soon
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <div className="relative">
              <Image className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <div className="absolute -top-2 -right-2">
                <Zap className="h-6 w-6 text-warning animate-pulse" />
              </div>
            </div>
            <p className="text-lg font-medium mb-2">AI Image Generation</p>
            <p className="max-w-md mx-auto">
              Custom brand-aligned image generation will be available soon. 
              Train your model to generate images that match your brand aesthetic.
            </p>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/30 border border-dashed">
            <h4 className="font-medium mb-2">Coming in the next release:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Generate images using your trained brand model</li>
              <li>• Product photography with your brand style</li>
              <li>• Social media visuals and marketing materials</li>
              <li>• Consistent color palette and aesthetic</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder for future image generations */}
      {generations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {generations.map((generation) => (
            <Card key={generation.id} className="shadow-soft border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="aspect-square bg-gradient-subtle rounded-lg mb-4 flex items-center justify-center">
                  <Image className="h-8 w-8 text-muted-foreground opacity-50" />
                </div>
                <div className="flex items-center justify-between">
                  <RatingStars
                    rating={generation.rating || 0}
                    onChange={(rating) => onRate(generation.id, rating)}
                    size="sm"
                  />
                  <Star
                    className={`h-4 w-4 cursor-pointer ${
                      generation.starred
                        ? 'fill-primary text-primary'
                        : 'text-muted-foreground'
                    }`}
                    onClick={() => onStar(generation.id, !generation.starred)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};