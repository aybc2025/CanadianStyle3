// Shared types for "Ma HaKesher" game
// Used by both frontend and Netlify functions

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface Word {
  id: string;
  text: string;
  groupId: string;
}

export interface Group {
  id: string;
  puzzleId: string;
  name: string;
  difficulty: Difficulty;
  words: Word[];
}

export interface Puzzle {
  id: string;
  title: string;
  publishDate: string;
  status: 'draft' | 'active' | 'archived';
  groups: Group[];
  createdAt: string;
  updatedAt: string;
}

export interface GameSession {
  id: string;
  puzzleId: string;
  visitorId: string;
  attempts: number;
  maxAttempts: number;
  solvedGroupIds: string[];
  hintUsed: boolean;
  gameStatus: 'playing' | 'won' | 'lost';
  createdAt: string;
  updatedAt: string;
}

export interface HintResult {
  type: 'pair' | 'single' | 'difficulty';
  wordIds?: string[];
  difficulty?: Difficulty;
}

// API Request/Response types
export interface GetTodayPuzzleResponse {
  puzzleId: string;
  words: { id: string; text: string }[];
  maxAttempts: number;
  session: {
    id: string;
    attempts: number;
    solvedGroupIds: string[];
    hintUsed: boolean;
    gameStatus: 'playing' | 'won' | 'lost';
  };
  solvedGroups: {
    id: string;
    name: string;
    difficulty: Difficulty;
    words: { id: string; text: string }[];
  }[];
}

export interface CheckGroupRequest {
  sessionId: string;
  wordIds: string[];
}

export interface CheckGroupResponse {
  correct: boolean;
  groupName?: string;
  groupId?: string;
  difficulty?: Difficulty;
  words?: { id: string; text: string }[];
  attemptsRemaining: number;
  gameStatus: 'playing' | 'won' | 'lost';
  allGroups?: Group[]; // Sent when game is lost
}

export interface GetHintRequest {
  sessionId: string;
}

export interface GetHintResponse {
  success: boolean;
  hintType?: 'pair';
  wordIds?: string[];
  error?: string;
}

// Admin types
export interface AdminUser {
  uid: string;
  email: string;
}

export interface CreatePuzzleRequest {
  title: string;
  publishDate: string;
  groups: {
    name: string;
    difficulty: Difficulty;
    words: string[];
  }[];
}

// Difficulty color mapping
export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: '#4ade80',      // green
  medium: '#facc15',    // yellow
  hard: '#3b82f6',      // blue
  expert: '#a855f7'     // purple
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'קל',
  medium: 'בינוני',
  hard: 'קשה',
  expert: 'קשה מאוד'
};
