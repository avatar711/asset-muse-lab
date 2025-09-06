import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, ArrowRight, Clock } from 'lucide-react';
import { TrainingJob } from '@/types/project';

interface TrainingProgressProps {
  trainingJob: TrainingJob | null;
  onStartTraining: () => void;
  onComplete: () => void;
}

export const TrainingProgress: React.FC<TrainingProgressProps> = ({
  trainingJob,
  onStartTraining,
  onComplete,
}) => {
  if (!trainingJob) {
    return (
      <div className="max-w-2xl mx-auto text-center animate-fade-in">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Train Your AI Model</h2>
          <p className="text-muted-foreground text-lg">
            Logan will analyze your images to understand your brand style
          </p>
        </div>

        <Card className="shadow-elegant border-0 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-6">
              <div className="p-6 rounded-full bg-gradient-primary text-white">
                <Brain className="h-12 w-12" />
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">Ready to Train</h3>
                <p className="text-muted-foreground">
                  This process will take about 5-10 minutes to complete
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-center">
                <div className="p-4 rounded-lg bg-muted/50">
                  <Zap className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Analyze Style</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <Brain className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Train Model</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <ArrowRight className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Generate Assets</p>
                </div>
              </div>

              <Button
                variant="hero"
                size="lg"
                onClick={onStartTraining}
                className="w-full animate-glow"
              >
                <Brain className="h-4 w-4" />
                Start Training Logan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusText = () => {
    switch (trainingJob.status) {
      case 'queued':
        return 'Preparing to train...';
      case 'training':
        return 'Training in progress...';
      case 'ready':
        return 'Training complete!';
      case 'failed':
        return 'Training failed';
      default:
        return 'Unknown status';
    }
  };

  const getStatusIcon = () => {
    switch (trainingJob.status) {
      case 'queued':
        return <Clock className="h-6 w-6 text-warning animate-pulse" />;
      case 'training':
        return <Brain className="h-6 w-6 text-primary animate-pulse" />;
      case 'ready':
        return <Zap className="h-6 w-6 text-success" />;
      case 'failed':
        return <Brain className="h-6 w-6 text-destructive" />;
      default:
        return <Brain className="h-6 w-6 text-muted-foreground" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Training Your Model</h2>
        <p className="text-muted-foreground text-lg">
          Logan is learning your brand style from the uploaded images
        </p>
      </div>

      <Card className="shadow-elegant border-0 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-3">
              {getStatusIcon()}
              <span className="text-lg font-medium">{getStatusText()}</span>
            </div>

            <div className="w-full space-y-2">
              <Progress value={trainingJob.progress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                {trainingJob.progress}% complete
              </p>
            </div>

            {trainingJob.status === 'ready' && (
              <Button
                variant="success"
                size="lg"
                onClick={onComplete}
                className="w-full animate-fade-in"
              >
                Open Studio
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}

            {trainingJob.status === 'training' && (
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Training typically takes 5-10 minutes
                </p>
                <p className="text-xs text-muted-foreground">
                  You can leave this page and come back later
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};