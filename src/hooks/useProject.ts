import { useState, useEffect } from 'react';
import { Project, Generation, TrainingJob } from '@/types/project';

// Mock data store for prototype
const mockProject: Project = {
  id: 'demo-project',
  name: 'Logan Demo',
  tone: 'minimal',
  audience: 'fashion-forward shoppers',
  keywords: ['sleek', 'geometric', 'modern'],
  palette: ['#8B5CF6', '#A78BFA', '#C4B5FD', '#E0E7FF'],
  status: 'setup',
  createdAt: new Date(),
};

export const useProject = () => {
  const [project, setProject] = useState<Project>(mockProject);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [trainingJob, setTrainingJob] = useState<TrainingJob | null>(null);

  const updateProjectStatus = (status: Project['status']) => {
    setProject(prev => ({ ...prev, status }));
  };

  const startTraining = () => {
    const job: TrainingJob = {
      id: 'training-' + Date.now(),
      projectId: project.id,
      status: 'queued',
      progress: 0,
      createdAt: new Date(),
    };
    setTrainingJob(job);

    // Mock training progress
    setTimeout(() => {
      setTrainingJob(prev => prev ? { ...prev, status: 'training', progress: 25 } : null);
      setTimeout(() => {
        setTrainingJob(prev => prev ? { ...prev, progress: 75 } : null);
        setTimeout(() => {
          setTrainingJob(prev => prev ? { ...prev, status: 'ready', progress: 100 } : null);
          updateProjectStatus('ready');
        }, 1500);
      }, 1500);
    }, 1000);
  };

  const generateSlogans = () => {
    const slogans = [
      "Sleek. Simple. You.",
      "Modern meets minimal.",
      "Geometric perfection.",
      "Style simplified.",
      "Clean lines, bold choices.",
      "Minimalism redefined.",
      "Fashion. Forward. Always."
    ];

    const generation: Generation = {
      id: 'gen-' + Date.now(),
      projectId: project.id,
      kind: 'slogan',
      outputs: { slogans },
      createdAt: new Date(),
    };

    setGenerations(prev => [generation, ...prev]);
    return generation;
  };

  const generateLogo = (text: string) => {
    const generation: Generation = {
      id: 'gen-' + Date.now(),
      projectId: project.id,
      kind: 'logo',
      outputs: { 
        text,
        pngUrl: '/placeholder-logo.png',
        svgUrl: '/placeholder-logo.svg'
      },
      createdAt: new Date(),
    };

    setGenerations(prev => [generation, ...prev]);
    return generation;
  };

  const rateGeneration = (id: string, rating: number) => {
    setGenerations(prev => 
      prev.map(gen => 
        gen.id === id ? { ...gen, rating } : gen
      )
    );
  };

  const starGeneration = (id: string, starred: boolean) => {
    setGenerations(prev => 
      prev.map(gen => 
        gen.id === id ? { ...gen, starred } : gen
      )
    );
  };

  return {
    project,
    generations,
    trainingJob,
    updateProjectStatus,
    startTraining,
    generateSlogans,
    generateLogo,
    rateGeneration,
    starGeneration,
  };
};