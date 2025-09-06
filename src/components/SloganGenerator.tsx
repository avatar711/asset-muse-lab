import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Copy, Star, RotateCcw } from 'lucide-react';
import { Generation } from '@/types/project';
import { RatingStars } from './RatingStars';
import { useToast } from '@/hooks/use-toast';

interface SloganGeneratorProps {
  generations: Generation[];
  onGenerate: () => Generation;
  onRate: (id: string, rating: number) => void;
  onStar: (id: string, starred: boolean) => void;
}

export const SloganGenerator: React.FC<SloganGeneratorProps> = ({
  generations,
  onGenerate,
  onRate,
  onStar,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API delay
    setTimeout(() => {
      onGenerate();
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Slogan copied successfully",
    });
  };

  const latestGeneration = generations[0];

  return (
    <div className="space-y-6">
      <Card className="shadow-soft border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Generate Slogans</span>
            </div>
            <Button
              variant="outline"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <RotateCcw className="h-4 w-4 animate-spin" />
              ) : (
                <MessageSquare className="h-4 w-4" />
              )}
              {isGenerating ? 'Generating...' : 'Generate 7 Slogans'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {latestGeneration ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {latestGeneration.outputs.slogans.map((slogan: string, index: number) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <p className="font-medium text-lg flex-1">{slogan}</p>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(slogan)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onStar(latestGeneration.id, !latestGeneration.starred)}
                      >
                        <Star
                          className={`h-4 w-4 ${
                            latestGeneration.starred
                              ? 'fill-primary text-primary'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                  <RatingStars
                    rating={latestGeneration.rating || 0}
                    onChange={(rating) => onRate(latestGeneration.id, rating)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No slogans generated yet</p>
              <p>Click "Generate 7 Slogans" to create your first batch</p>
            </div>
          )}
        </CardContent>
      </Card>

      {generations.length > 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Previous Generations</h3>
          {generations.slice(1).map((generation) => (
            <Card key={generation.id} className="shadow-soft border-0 bg-card/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">
                    Generated {generation.createdAt.toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-2">
                    <RatingStars
                      rating={generation.rating || 0}
                      onChange={(rating) => onRate(generation.id, rating)}
                      size="sm"
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
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  {generation.outputs.slogans.slice(0, 6).map((slogan: string, index: number) => (
                    <span key={index} className="truncate text-muted-foreground">
                      {slogan}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};