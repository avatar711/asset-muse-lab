import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Sparkles, MessageSquare, Image, Type } from 'lucide-react';
import { SloganGenerator } from './SloganGenerator';
import { LogoGenerator } from './LogoGenerator';
import { ImageGenerator } from './ImageGenerator';
import { Generation } from '@/types/project';

interface StudioProps {
  generations: Generation[];
  onGenerateSlogans: () => Generation;
  onGenerateLogo: (text: string) => Generation;
  onRateGeneration: (id: string, rating: number) => void;
  onStarGeneration: (id: string, starred: boolean) => void;
}

export const Studio: React.FC<StudioProps> = ({
  generations,
  onGenerateSlogans,
  onGenerateLogo,
  onRateGeneration,
  onStarGeneration,
}) => {
  const [activeTab, setActiveTab] = useState('slogans');

  const starredGenerations = generations.filter(g => g.starred);

  const exportAssets = () => {
    // Mock export functionality
    console.log('Exporting selected assets...');
    // In a real app, this would create and download a ZIP file
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Logan Studio</h1>
          <p className="text-muted-foreground text-lg">
            Generate and curate your brand assets
          </p>
        </div>
        
        <Button
          variant="hero"
          onClick={exportAssets}
          disabled={starredGenerations.length === 0}
        >
          <Download className="h-4 w-4" />
          Export Selected ({starredGenerations.length})
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50">
              <TabsTrigger value="slogans" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Slogans</span>
              </TabsTrigger>
              <TabsTrigger value="logos" className="flex items-center space-x-2">
                <Type className="h-4 w-4" />
                <span>Logos</span>
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center space-x-2">
                <Image className="h-4 w-4" />
                <span>Images</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="slogans" className="space-y-4">
                <SloganGenerator
                  generations={generations.filter(g => g.kind === 'slogan')}
                  onGenerate={onGenerateSlogans}
                  onRate={onRateGeneration}
                  onStar={onStarGeneration}
                />
              </TabsContent>

              <TabsContent value="logos" className="space-y-4">
                <LogoGenerator
                  generations={generations.filter(g => g.kind === 'logo')}
                  onGenerate={onGenerateLogo}
                  onRate={onRateGeneration}
                  onStar={onStarGeneration}
                />
              </TabsContent>

              <TabsContent value="images" className="space-y-4">
                <ImageGenerator
                  generations={generations.filter(g => g.kind === 'image')}
                  onRate={onRateGeneration}
                  onStar={onStarGeneration}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="shadow-soft border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Generation Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Generated</span>
                <span className="font-medium">{generations.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Starred</span>
                <span className="font-medium text-primary">{starredGenerations.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Slogans</span>
                <span className="font-medium">{generations.filter(g => g.kind === 'slogan').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Logos</span>
                <span className="font-medium">{generations.filter(g => g.kind === 'logo').length}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Export Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {starredGenerations.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-3">
                    Your export will include:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• /logos/ folder with SVG and PNG files</li>
                    <li>• /images/ folder with generated images</li>
                    <li>• slogans.txt with selected slogans</li>
                    <li>• style.json with brand guidelines</li>
                  </ul>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Star assets to include in export</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};