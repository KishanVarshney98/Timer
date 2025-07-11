export interface Timer {
  id: string;
  name: string;
  duration: number;
  remaining: number;
  category: string;
  status: 'Running' | 'Paused' | 'Completed';
  halfwayAlert?: boolean;
  completedAt?: string | null;
}