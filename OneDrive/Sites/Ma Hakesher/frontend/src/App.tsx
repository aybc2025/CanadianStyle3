import React, { useState, useEffect } from 'react';
import { GamePage } from './pages/GamePage';
import { AdminLogin, AdminDashboard, PuzzleEditor } from './pages/AdminPages';
import { useAdminStore } from './store/adminStore';
import { onAuthChange } from './services/adminApi';
import { Puzzle, CreatePuzzleRequest } from '../shared/types';

type View = 'game' | 'admin-login' | 'admin-dashboard' | 'admin-editor';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('game');
  const [editingPuzzle, setEditingPuzzle] = useState<Puzzle | undefined>();
  const { user, setUser, createPuzzle } = useAdminStore();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange((authUser) => {
      setUser(authUser);
      if (!authUser && (currentView === 'admin-dashboard' || currentView === 'admin-editor')) {
        setCurrentView('admin-login');
      }
    });
    return unsubscribe;
  }, [setUser, currentView]);

  // Check URL for admin route
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/admin')) {
      setCurrentView(user ? 'admin-dashboard' : 'admin-login');
    }
  }, [user]);

  const handleAdminLoginSuccess = () => {
    setCurrentView('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setCurrentView('game');
    window.history.pushState({}, '', '/');
  };

  const handleEditPuzzle = (puzzle: Puzzle) => {
    setEditingPuzzle(puzzle);
    setCurrentView('admin-editor');
  };

  const handleNewPuzzle = () => {
    setEditingPuzzle(undefined);
    setCurrentView('admin-editor');
  };

  const handleSavePuzzle = async (puzzleData: CreatePuzzleRequest) => {
    await createPuzzle(puzzleData);
  };

  const handleBackFromEditor = () => {
    setEditingPuzzle(undefined);
    setCurrentView('admin-dashboard');
  };

  switch (currentView) {
    case 'admin-login':
      return <AdminLogin onSuccess={handleAdminLoginSuccess} />;
    
    case 'admin-dashboard':
      return (
        <AdminDashboard
          onLogout={handleAdminLogout}
          onEditPuzzle={handleEditPuzzle}
          onNewPuzzle={handleNewPuzzle}
        />
      );
    
    case 'admin-editor':
      return (
        <PuzzleEditor
          puzzle={editingPuzzle}
          onBack={handleBackFromEditor}
          onSave={handleSavePuzzle}
        />
      );
    
    case 'game':
    default:
      return (
        <div>
          <GamePage />
          <button
            onClick={() => setCurrentView('admin-login')}
            className="fixed bottom-2 left-2 text-xs text-stone-300 hover:text-stone-500"
          >
            Admin
          </button>
        </div>
      );
  }
};

export default App;
