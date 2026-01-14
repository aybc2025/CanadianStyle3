// Admin API service
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { Puzzle, CreatePuzzleRequest } from '../../shared/types';

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const API_BASE = '/.netlify/functions';

// Auth functions
export async function loginAdmin(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function logoutAdmin(): Promise<void> {
  await signOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}

export async function getAuthToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  return user.getIdToken();
}

// Admin API functions
async function adminFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const token = await getAuthToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  return fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });
}

export async function fetchAllPuzzles(): Promise<Puzzle[]> {
  const response = await adminFetch('/adminPuzzles');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch puzzles');
  }
  const data = await response.json();
  return data.puzzles;
}

export async function fetchPuzzle(puzzleId: string): Promise<Puzzle> {
  const response = await adminFetch(`/adminPuzzles?id=${puzzleId}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch puzzle');
  }
  const data = await response.json();
  return data.puzzle;
}

export async function createPuzzle(puzzle: CreatePuzzleRequest): Promise<string> {
  const response = await adminFetch('/adminPuzzles', {
    method: 'POST',
    body: JSON.stringify(puzzle),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create puzzle');
  }
  const data = await response.json();
  return data.puzzleId;
}

export async function updatePuzzleStatus(puzzleId: string, status: 'draft' | 'active' | 'archived'): Promise<void> {
  const response = await adminFetch(`/adminPuzzles?id=${puzzleId}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update puzzle');
  }
}

export async function updatePuzzle(puzzleId: string, updates: { title?: string; publishDate?: string }): Promise<void> {
  const response = await adminFetch(`/adminPuzzles?id=${puzzleId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update puzzle');
  }
}

export async function deletePuzzle(puzzleId: string): Promise<void> {
  const response = await adminFetch(`/adminPuzzles?id=${puzzleId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete puzzle');
  }
}
