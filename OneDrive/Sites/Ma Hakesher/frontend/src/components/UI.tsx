import React, { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  HelpCircle, 
  X, 
  Trophy, 
  Share2, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import { Difficulty, DIFFICULTY_COLORS, DIFFICULTY_LABELS } from '../../shared/types';

// Attempts Indicator
interface AttemptsIndicatorProps {
  current: number;
  max: number;
}

export const AttemptsIndicator: React.FC<AttemptsIndicatorProps> = ({ current, max }) => {
  const remaining = max - current;
  return (
    <div className="flex items-center gap-2 justify-center">
      <span className="text-sm text-stone-500 font-medium">ניסיונות נותרו:</span>
      <div className="flex gap-1.5">
        {Array.from({ length: max }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index < remaining ? 'bg-slate-800' : 'bg-stone-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Hint Button
interface HintButtonProps {
  disabled: boolean;
  used: boolean;
  onUseHint: () => void;
}

export const HintButton: React.FC<HintButtonProps> = ({ disabled, used, onUseHint }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="flex flex-col items-center gap-2 p-4 bg-amber-50 rounded-xl border border-amber-200">
        <p className="text-sm text-amber-900 text-center font-medium">
          ניתן להשתמש ברמז פעם אחת בלבד לכל חידה.<br />להמשיך?
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => { setShowConfirm(false); onUseHint(); }}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600"
          >
            כן, תן רמז
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="px-4 py-2 bg-stone-200 text-stone-700 rounded-lg font-medium hover:bg-stone-300"
          >
            ביטול
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => !used && !disabled && setShowConfirm(true)}
      disabled={disabled || used}
      className={`
        flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200
        ${used 
          ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
          : disabled
            ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
            : 'bg-amber-100 text-amber-800 hover:bg-amber-200 active:scale-[0.97]'
        }
      `}
    >
      <Lightbulb className="w-5 h-5" />
      <span>{used ? 'הרמז נוצל' : 'רמז (חד־פעמי)'}</span>
    </button>
  );
};

// Toast
type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onHide: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onHide }) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      const timer = setTimeout(() => {
        setIsShowing(false);
        setTimeout(onHide, 300);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!isVisible && !isShowing) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <X className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />,
  };

  const colors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-slate-700',
  };

  return (
    <div className={`
      fixed bottom-24 left-1/2 -translate-x-1/2 z-50
      flex items-center gap-2 px-4 py-3 rounded-xl
      text-white font-medium shadow-lg transition-all duration-300
      ${colors[type]}
      ${isShowing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
    `}>
      {icons[type]}
      <span>{message}</span>
    </div>
  );
};

export const useToast = () => {
  const [toast, setToast] = useState({ message: '', type: 'info' as ToastType, isVisible: false });
  const showToast = (message: string, type: ToastType = 'info') => setToast({ message, type, isVisible: true });
  const hideToast = () => setToast(prev => ({ ...prev, isVisible: false }));
  return { toast, showToast, hideToast };
};

// How To Play Modal
interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-auto shadow-2xl">
        <div className="sticky top-0 bg-white p-4 border-b border-stone-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-500" />
            <span>איך משחקים?</span>
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-stone-100">
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>
        <div className="p-4 space-y-4 text-stone-700">
          <p>מצאו קבוצות של 4 מילים שיש ביניהן קשר משותף.</p>
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900">כללי המשחק:</h3>
            <ul className="space-y-2 pr-4">
              <li>• בחרו 4 מילים שיש ביניהן קשר</li>
              <li>• לחצו "בדיקה" כדי לבדוק את הניחוש</li>
              <li>• יש לכם 4 ניסיונות שגויים</li>
              <li>• ניתן להשתמש ברמז פעם אחת</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900">רמות קושי:</h3>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(DIFFICULTY_COLORS) as Difficulty[]).map((d) => (
                <div key={d} className="px-3 py-2 rounded-lg text-center text-sm font-medium text-slate-900" style={{ backgroundColor: DIFFICULTY_COLORS[d] }}>
                  {DIFFICULTY_LABELS[d]}
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-stone-500 text-center pt-2">חידה חדשה כל יום! 🎯</p>
        </div>
      </div>
    </div>
  );
};

// Result Modal
interface ResultModalProps {
  isOpen: boolean;
  isWin: boolean;
  solvedGroups: {
    id: string;
    name: string;
    difficulty: Difficulty;
    words: { id: string; text: string }[];
  }[];
  attempts: number;
  maxAttempts: number;
  onClose: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  isWin,
  solvedGroups,
  attempts,
  maxAttempts,
  onClose,
}) => {
  if (!isOpen) return null;

  const sortedGroups = [...solvedGroups].sort((a, b) => {
    const order = { easy: 0, medium: 1, hard: 2, expert: 3 };
    return order[a.difficulty] - order[b.difficulty];
  });

  const handleShare = () => {
    const text = `🔗 מה הקשר?\n${new Date().toLocaleDateString('he-IL')}\n${isWin ? '✅' : '❌'} ניסיונות: ${attempts}/${maxAttempts}`;
    navigator.clipboard.writeText(text);
    alert('הועתק ללוח!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-auto shadow-2xl">
        <div className="sticky top-0 bg-white p-4 border-b border-stone-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            {isWin ? (
              <><Trophy className="w-6 h-6 text-amber-500" /><span>כל הכבוד!</span></>
            ) : (
              <span>לא הצלחת הפעם</span>
            )}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-stone-100">
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="text-center text-stone-600">
            <p>ניסיונות: {attempts}/{maxAttempts}</p>
            <p>קבוצות שפותרו: {solvedGroups.length}/4</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-stone-700 text-center mb-3">הקשרים:</h3>
            {sortedGroups.map((group) => (
              <div
                key={group.id}
                className="p-3 rounded-xl"
                style={{ backgroundColor: DIFFICULTY_COLORS[group.difficulty] }}
              >
                <h4 className="font-bold text-slate-900 text-center">{group.name}</h4>
                <p className="text-sm text-slate-800 text-center mt-1">
                  {group.words.map(w => w.text).join(' • ')}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700"
          >
            <Share2 className="w-5 h-5" /><span>שתף תוצאה</span>
          </button>
        </div>
      </div>
    </div>
  );
};
