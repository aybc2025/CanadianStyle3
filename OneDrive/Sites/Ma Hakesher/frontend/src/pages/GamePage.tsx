import React, { useEffect, useState } from 'react';
import { HelpCircle, Loader2 } from 'lucide-react';
import { Board } from '../components/Board';
import { 
  AttemptsIndicator, 
  HintButton, 
  HowToPlayModal, 
  ResultModal, 
  Toast, 
  useToast 
} from '../components/UI';
import { useGameStore } from '../store/gameStore';

export const GamePage: React.FC = () => {
  const {
    gameStatus,
    attempts,
    maxAttempts,
    selectedWordIds,
    solvedGroups,
    hintUsed,
    isLoading,
    error,
    loadPuzzle,
    clearSelection,
    checkGroup,
    useHint,
  } = useGameStore();

  const [showHelp, setShowHelp] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  // Load puzzle on mount
  useEffect(() => {
    loadPuzzle();
  }, [loadPuzzle]);

  // Show result modal when game ends
  useEffect(() => {
    if (gameStatus === 'won' || gameStatus === 'lost') {
      const timer = setTimeout(() => setShowResult(true), 600);
      return () => clearTimeout(timer);
    }
  }, [gameStatus]);

  const handleCheck = async () => {
    if (selectedWordIds.length !== 4) {
      showToast('יש לבחור 4 מילים', 'info');
      return;
    }

    const result = await checkGroup();
    if (result) {
      if (result.correct) {
        showToast(
          result.gameStatus === 'won' 
            ? 'כל הכבוד! פתרת את החידה!' 
            : `מצאת את הקשר: ${result.groupName}`,
          'success'
        );
      } else {
        showToast(
          result.gameStatus === 'lost' 
            ? 'נגמרו הניסיונות!' 
            : 'לא נכון, נסה שוב',
          'error'
        );
      }
    }
  };

  const handleHint = async () => {
    await useHint();
    showToast('שתי מילים אלו שייכות לאותה קבוצה', 'info');
  };

  if (gameStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-slate-600" />
          <span className="text-stone-500">טוען חידה...</span>
        </div>
      </div>
    );
  }

  if (gameStatus === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'שגיאה בטעינת החידה'}</p>
          <button
            onClick={() => loadPuzzle()}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
          >
            נסה שוב
          </button>
        </div>
      </div>
    );
  }

  const isGameActive = gameStatus === 'playing';

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">מה הקשר?</h1>
          <button
            onClick={() => setShowHelp(true)}
            className="p-2 rounded-lg hover:bg-stone-100"
            aria-label="איך משחקים"
          >
            <HelpCircle className="w-6 h-6 text-stone-500" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <Board />

        {/* Game Controls */}
        {isGameActive && (
          <div className="space-y-4">
            <AttemptsIndicator current={attempts} max={maxAttempts} />

            <div className="flex justify-center">
              <HintButton
                disabled={!isGameActive || isLoading}
                used={hintUsed}
                onUseHint={handleHint}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={clearSelection}
                disabled={selectedWordIds.length === 0}
                className={`
                  flex-1 py-3 rounded-xl font-medium transition-all
                  ${selectedWordIds.length === 0
                    ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                    : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                  }
                `}
              >
                נקה בחירה
              </button>
              
              <button
                onClick={handleCheck}
                disabled={selectedWordIds.length !== 4 || isLoading}
                className={`
                  flex-1 py-3 rounded-xl font-bold transition-all
                  ${selectedWordIds.length !== 4 || isLoading
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-800 text-white hover:bg-slate-700 shadow-lg'
                  }
                `}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'בדיקה'}
              </button>
            </div>
          </div>
        )}

        {/* Game Over State */}
        {!isGameActive && !showResult && (
          <div className="text-center py-4">
            <button
              onClick={() => setShowResult(true)}
              className="text-slate-600 underline hover:text-slate-800"
            >
              הצג תוצאות
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-stone-200 py-3">
        <p className="text-center text-xs text-stone-400">
          חידה חדשה כל יום • נבנה עם ❤️
        </p>
      </footer>

      {/* Modals */}
      <HowToPlayModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
      
      <ResultModal
        isOpen={showResult}
        isWin={gameStatus === 'won'}
        solvedGroups={solvedGroups}
        attempts={attempts}
        maxAttempts={maxAttempts}
        onClose={() => setShowResult(false)}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onHide={hideToast}
      />
    </div>
  );
};
