import React from 'react';
import { Card, SolvedGroup } from './Card';
import { useGameStore } from '../store/gameStore';

export const Board: React.FC = () => {
  const { 
    words, 
    solvedGroups, 
    selectedWordIds, 
    hintedWordIds,
    selectWord, 
    deselectWord 
  } = useGameStore();

  const handleCardClick = (wordId: string) => {
    if (selectedWordIds.includes(wordId)) {
      deselectWord(wordId);
    } else {
      selectWord(wordId);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-3">
      {/* Solved groups at the top */}
      {solvedGroups.map((group, index) => (
        <SolvedGroup 
          key={group.id}
          name={group.name}
          words={group.words}
          difficulty={group.difficulty}
          animationDelay={index * 100}
        />
      ))}
      
      {/* Active word grid */}
      {words.length > 0 && (
        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {words.map((word) => (
            <Card
              key={word.id}
              text={word.text}
              isSelected={selectedWordIds.includes(word.id)}
              isHinted={hintedWordIds.includes(word.id)}
              onClick={() => handleCardClick(word.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
