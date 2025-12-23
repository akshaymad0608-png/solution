
export enum SolverMode {
  GENERAL = 'GENERAL',
  YOUTUBE = 'YOUTUBE',
  MONEY = 'MONEY',
  STUDENT = 'STUDENT',
  AI_TOOLS = 'AI_TOOLS',
  INSTAGRAM = 'INSTAGRAM',
  LIFE = 'LIFE'
}

export interface Solution {
  analysis: string;
  steps: string[];
  resources: { name: string; link: string; description: string }[];
  indianExamples: string[];
  growthHacks: string[];
  nextActions: string[];
  estimatedTime: string;
}

export interface HistoryItem {
  id: string;
  problem: string;
  mode: SolverMode;
  solution: Solution;
  timestamp: number;
}

export interface UserPlan {
  type: 'FREE' | 'PRO';
  queriesRemaining: number;
}
