import { create } from 'zustand';
import { 
  GetTodayPuzzleResponse, 
  CheckGroupResponse, 
  Difficulty 
} from '../../shared/types';
import * as api from '../services/api';

interface SolvedGroup {
  id: string;
  name: string;
  difficulty: Difficulty;
  words: { id: string; text: string }[];
}

interface GameState {
  // Data from server
  puzzleId: string | null;
  sessionId: string | null;
  words: { id: string; text: string }[];
  maxAttempts: number;
  attempts: number;
  solvedGroups: SolvedGroup[];
  hintUsed: boolean;
  gameStatus: 'loading' | 'playing' | 'won' | 'lost' | 'error';
  
  // Local UI state
  selectedWordIds: string[];
  hintedWordIds: string[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadPuzzle: () => Promise<void>;
  selectWord: (wordId: string) => void;
  deselectWord: (wordId: string) => void;
  clearSelection: () => void;
  checkGroup: () => Promise<CheckGroupResponse | null>;
  useHint: () => Promise<void>;
  reset: () => void;
}

const initialState = {
  puzzleId: null,
  sessionId: null,
  words: [],
  maxAttempts: 4,
  attempts: 0,
  solvedGroups: [],
  hintUsed: false,
  gameStatus: 'loading' as const,
  selectedWordIds: [],
  hintedWordIds: [],
  isLoading: false,
  error: null,
};

export const useGameStore = create<GameState>((set, get) => ({
  ...initialState,

  loadPuzzle: async () => {
    set({ isLoading: true, error: null, gameStatus: 'loading' });
    
    try {
      const data: GetTodayPuzzleResponse = await api.fetchTodayPuzzle();
      
      set({
        puzzleId: data.puzzleId,
        sessionId: data.session.id,
        words: data.words,
        maxAttempts: data.maxAttempts,
        attempts: data.session.attempts,
        solvedGroups: data.solvedGroups,
        hintUsed: data.session.hintUsed,
        gameStatus: data.session.gameStatus === 'playing' ? 'playing' : data.session.gameStatus,
        isLoading: false,
        selectedWordIds: [],
        hintedWordIds: [],
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to load puzzle',
        gameStatus: 'error',
      });
    }
  },

  selectWord: (wordId: string) => {
    const { selectedWordIds, gameStatus } = get();
    if (gameStatus !== 'playing') return;
    if (selectedWordIds.length >= 4) return;
    if (selectedWordIds.includes(wordId)) return;
    
    set({ selectedWordIds: [...selectedWordIds, wordId] });
  },

  deselectWord: (wordId: string) => {
    const { selectedWordIds } = get();
    set({ selectedWordIds: selectedWordIds.filter(id => id !== wordId) });
  },

  clearSelection: () => {
    set({ selectedWordIds: [] });
  },

  checkGroup: async () => {
    const { sessionId, selectedWordIds, words, solvedGroups } = get();
    
    if (!sessionId || selectedWordIds.length !== 4) return null;
    
    set({ isLoading: true });
    
    try {
      const result = await api.checkGroup(sessionId, selectedWordIds);
      
      if (result.correct && result.groupId) {
        // Remove solved words from the board
        const newWords = words.filter(w => !selectedWordIds.includes(w.id));
        
        // Add to solved groups
        const newSolvedGroup: SolvedGroup = {
          id: result.groupId,
          name: result.groupName!,
          difficulty: result.difficulty!,
          words: result.words!,
        };
        
        set({
          words: newWords,
          solvedGroups: [...solvedGroups, newSolvedGroup],
          selectedWordIds: [],
          gameStatus: result.gameStatus,
          isLoading: false,
        });
      } else {
        set({
          attempts: get().maxAttempts - result.attemptsRemaining,
          selectedWordIds: [],
          gameStatus: result.gameStatus,
          isLoading: false,
        });

        // If game is lost, store all groups for display
        if (result.gameStatus === 'lost' && result.allGroups) {
          const allSolvedGroups: SolvedGroup[] = result.allGroups.map(g => ({
            id: g.id,
            name: g.name,
            difficulty: g.difficulty,
            words: g.words.map(w => ({ id: w.id, text: w.text })),
          }));
          set({ solvedGroups: allSolvedGroups, words: [] });
        }
      }
      
      return result;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to check group',
      });
      return null;
    }
  },

  useHint: async () => {
    const { sessionId, hintUsed, gameStatus } = get();
    
    if (!sessionId || hintUsed || gameStatus !== 'playing') return;
    
    set({ isLoading: true });
    
    try {
      const result = await api.getHint(sessionId);
      
      if (result.success && result.wordIds) {
        set({ 
          hintedWordIds: result.wordIds,
          hintUsed: true,
          isLoading: false,
        });
        
        // Clear hint highlight after 5 seconds
        setTimeout(() => {
          set({ hintedWordIds: [] });
        }, 5000);
      } else {
        set({ 
          isLoading: false,
          error: result.error || 'Failed to get hint',
        });
      }
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to get hint',
      });
    }
  },

  reset: () => {
    set(initialState);
  },
}));
