import React from 'react';
import { cn } from '@/lib/utils';
import logoImage from '@/assets/logan-logo.png';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={logoImage} alt="Logan.ai" className="h-8 w-auto" />
              <span className="text-lg font-semibold bg-gradient-brand bg-clip-text text-transparent">
                Logan.ai
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              AI Branding Studio
            </div>
          </div>
        </div>
      </header>
      <main className={cn("container mx-auto px-6 py-8", className)}>
        {children}
      </main>
    </div>
  );
};