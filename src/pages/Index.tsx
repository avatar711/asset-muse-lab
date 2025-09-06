import React from 'react';
import { Layout } from '@/components/Layout';
import { ProjectSetup } from '@/components/ProjectSetup';
import { FileUpload } from '@/components/FileUpload';
import { TrainingProgress } from '@/components/TrainingProgress';
import { Studio } from '@/components/Studio';
import { useProject } from '@/hooks/useProject';

const Index = () => {
  const {
    project,
    generations,
    trainingJob,
    updateProjectStatus,
    startTraining,
    generateSlogans,
    generateLogo,
    rateGeneration,
    starGeneration,
  } = useProject();

  const handleProjectSetup = (data: any) => {
    // Update project with setup data
    updateProjectStatus('uploaded');
  };

  const handleUploadComplete = (files: File[], palette: string[]) => {
    // Handle file upload completion
    updateProjectStatus('training');
  };

  const handleTrainingComplete = () => {
    updateProjectStatus('ready');
  };

  const renderCurrentStep = () => {
    switch (project.status) {
      case 'setup':
        return <ProjectSetup onComplete={handleProjectSetup} />;
      case 'uploaded':
        return (
          <FileUpload
            onComplete={handleUploadComplete}
            palette={project.palette}
          />
        );
      case 'training':
        return (
          <TrainingProgress
            trainingJob={trainingJob}
            onStartTraining={startTraining}
            onComplete={handleTrainingComplete}
          />
        );
      case 'ready':
        return (
          <Studio
            generations={generations}
            onGenerateSlogans={generateSlogans}
            onGenerateLogo={generateLogo}
            onRateGeneration={rateGeneration}
            onStarGeneration={starGeneration}
          />
        );
      default:
        return <ProjectSetup onComplete={handleProjectSetup} />;
    }
  };

  return (
    <Layout>
      {renderCurrentStep()}
    </Layout>
  );
};

export default Index;
