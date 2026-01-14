import { create } from 'zustand';
import { User } from 'firebase/auth';
import { Puzzle, CreatePuzzleRequest, Difficulty } from '../../shared/types';
import * as adminApi from '../services/adminApi';

interface AdminState {
  user: User | null;
  isLoading: boolean;
  puzzles: Puzzle[];
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loadPuzzles: () => Promise<void>;
  createPuzzle: (puzzle: CreatePuzzleRequest) => Promise<string | null>;
  activatePuzzle: (puzzleId: string) => Promise<boolean>;
  deletePuzzle: (puzzleId: string) => Promise<boolean>;
  updatePuzzle: (puzzleId: string, updates: { title?: string; publishDate?: string }) => Promise<boolean>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  user: null,
  isLoading: false,
  puzzles: [],
  error: null,

  setUser: (user) => {
    set({ user });
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const user = await adminApi.loginAdmin(email, password);
      set({ user, isLoading: false });
      return true;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Login failed',
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await adminApi.logoutAdmin();
      set({ user: null, puzzles: [] });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  loadPuzzles: async () => {
    set({ isLoading: true, error: null });
    try {
      const puzzles = await adminApi.fetchAllPuzzles();
      set({ puzzles, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to load puzzles',
      });
    }
  },

  createPuzzle: async (puzzle) => {
    set({ isLoading: true, error: null });
    try {
      const puzzleId = await adminApi.createPuzzle(puzzle);
      await get().loadPuzzles(); // Reload list
      set({ isLoading: false });
      return puzzleId;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to create puzzle',
      });
      return null;
    }
  },

  activatePuzzle: async (puzzleId) => {
    set({ isLoading: true, error: null });
    try {
      await adminApi.updatePuzzleStatus(puzzleId, 'active');
      await get().loadPuzzles(); // Reload to get updated statuses
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to activate puzzle',
      });
      return false;
    }
  },

  deletePuzzle: async (puzzleId) => {
    set({ isLoading: true, error: null });
    try {
      await adminApi.deletePuzzle(puzzleId);
      await get().loadPuzzles();
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to delete puzzle',
      });
      return false;
    }
  },

  updatePuzzle: async (puzzleId, updates) => {
    set({ isLoading: true, error: null });
    try {
      await adminApi.updatePuzzle(puzzleId, updates);
      await get().loadPuzzles();
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to update puzzle',
      });
      return false;
    }
  },
}));
