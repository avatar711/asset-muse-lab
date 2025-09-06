import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ProjectSetupProps {
  onComplete: (data: {
    name: string;
    tone: string;
    audience: string;
    keywords: string[];
  }) => void;
}

export const ProjectSetup: React.FC<ProjectSetupProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: 'Logan Demo',
    tone: 'minimal',
    audience: 'fashion-forward shoppers',
    keywords: 'sleek, geometric, modern',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      ...formData,
      keywords: formData.keywords.split(',').map(k => k.trim()).filter(Boolean),
    });
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 mb-4">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-brand bg-clip-text text-transparent">
            Create Your Brand Identity
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Tell us about your brand and we'll help you create stunning assets
        </p>
      </div>

      <Card className="shadow-elegant border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            Set up your brand parameters to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="My Brand"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Brand Tone</Label>
              <Input
                id="tone"
                value={formData.tone}
                onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value }))}
                placeholder="e.g., minimal, bold, playful"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Input
                id="audience"
                value={formData.audience}
                onChange={(e) => setFormData(prev => ({ ...prev, audience: e.target.value }))}
                placeholder="e.g., young professionals, luxury shoppers"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Brand Keywords</Label>
              <Textarea
                id="keywords"
                value={formData.keywords}
                onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                placeholder="Enter keywords separated by commas"
                rows={3}
                className="bg-background/50"
              />
              <p className="text-sm text-muted-foreground">
                Separate keywords with commas (e.g., modern, elegant, innovative)
              </p>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full">
              Continue to Upload
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};