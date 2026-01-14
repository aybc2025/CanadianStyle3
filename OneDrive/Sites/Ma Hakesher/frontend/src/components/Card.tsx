import React from 'react';
import { Difficulty, DIFFICULTY_COLORS } from '../../shared/types';

interface CardProps {
  text: string;
  isSelected: boolean;
  isHinted: boolean;
  onClick: () => void;
}

export const Card: React.FC<CardProps> = ({ text, isSelected, isHinted, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative w-full aspect-[1.6] rounded-xl border-2 
        font-medium text-base md:text-lg
        transition-all duration-200 ease-out
        flex items-center justify-center p-2
        select-none cursor-pointer
        ${isSelected 
          ? 'bg-slate-800 text-white border-slate-600 scale-[0.97] shadow-inner'
          : 'bg-stone-100 text-slate-900 border-stone-200 hover:bg-stone-200 hover:border-stone-300 active:scale-[0.97]'
        }
        ${isHinted ? 'ring-2 ring-amber-400 ring-offset-2 animate-pulse' : ''}
      `}
    >
      <span className="leading-tight text-center">{text}</span>
    </button>
  );
};

interface SolvedGroupProps {
  name: string;
  words: { id: string; text: string }[];
  difficulty: Difficulty;
  animationDelay?: number;
}

export const SolvedGroup: React.FC<SolvedGroupProps> = ({ 
  name, 
  words, 
  difficulty, 
  animationDelay = 0 
}) => {
  return (
    <div
      className="w-full rounded-xl p-4 animate-[slideIn_0.4s_ease-out_forwards] opacity-0"
      style={{ 
        backgroundColor: DIFFICULTY_COLORS[difficulty],
        animationDelay: `${animationDelay}ms`,
      }}
    >
      <h3 className="text-lg font-bold text-slate-900 mb-2 text-center">{name}</h3>
      <p className="text-sm text-slate-800 text-center">
        {words.map(w => w.text).join(' • ')}
      </p>
    </div>
  );
};
