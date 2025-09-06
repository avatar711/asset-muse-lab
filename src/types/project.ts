export interface Project {
  id: string;
  name: string;
  tone: string;
  audience: string;
  keywords: string[];
  palette: string[];
  status: 'setup' | 'uploaded' | 'training' | 'ready';
  createdAt: Date;
}

export interface Generation {
  id: string;
  projectId: string;
  kind: 'slogan' | 'logo' | 'image';
  outputs: any;
  rating?: number;
  starred?: boolean;
  createdAt: Date;
}

export interface TrainingJob {
  id: string;
  projectId: string;
  status: 'queued' | 'training' | 'ready' | 'failed';
  progress: number;
  createdAt: Date;
}