export type Gender = 'Male' | 'Female' | 'Neutral' | 'Custom';

export type Role = 
  | 'Coach' | 'Trainer' | 'Teacher' | 'Mentor' 
  | 'Partner' | 'Friend' | 'Lover' | 'Therapist' 
  | 'Strategist' | 'Accountability Partner';

export type Behavior = 
  | 'Formal' | 'Golden Tone' | 'Straightforward' | 'Brutally Honest'
  | 'Motivational' | 'Romantic' | 'Calm' | 'Focus-driven'
  | 'Disciplined' | 'Emotionally Expressive' | 'Emotionally Reserved';

export type Voice = 
  | 'Male' | 'Female' | 'Cute Male' | 'Cute Female' 
  | 'Calm' | 'Deep' | 'Robotic' | 'Whisper';

export type Theme = 
  | 'Prayer' | 'Ramadan' | 'Focus' | 'Dark' 
  | 'Cyber' | 'Calm' | 'Night' | 'Productivity'
  | 'Winter';

export interface UserProfile {
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  gender: Gender;
  aboutMe?: string;
  onboarded: boolean;
  weeklySchedule?: boolean[]; // Array of 7 bools (0=Sun, 6=Sat) - true = Active, false = Rest
  xp?: number; // Gamification
  level?: number;
}

export interface AIConfig {
  name: string;
  gender: Gender;
  voice: Voice;
  roles: Role[];
  behaviors: Behavior[];
  customBehavior?: string; // User-defined behavior instructions
}

// --- TRACKER PRIMITIVES ---

export interface Session {
  startTs: number;
  endTs?: number;
  durationMs: number;
}

export type TaskType = 'count' | 'duration';

export interface Task {
  id: string;
  title: string;
  category: string;
  type: TaskType; // New field
  target: number; // Reps or Minutes
  unit: string;
  current: number;
  sessions: Session[];
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export interface DayLog {
  date: string; // YYYY-MM-DD
  tasks: Task[]; // Snapshot of tasks at end of day
  stats: {
    completionRate: number;
    totalFocusTimeMs: number;
    mood?: string;
  };
}

export interface EvaluatorMetrics {
  completionRate: number;
  streak: number;
  avoidanceTasks: string[];
  topTasks: string[];
  status: 'avoidance' | 'regression' | 'improvement' | 'plateau' | 'burnout-risk' | 'neutral' | 'rest-day';
  summary: string;
}

export interface AppState {
  userProfile: UserProfile;
  aiConfig: AIConfig;
  theme: Theme;
  tasks: Task[];
  history: DayLog[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: number;
}