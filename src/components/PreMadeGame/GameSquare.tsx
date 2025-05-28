import React from 'react';
import { useGameContext } from '../../contexts/GameContext';

interface GameSquareProps {
  index: number;
  isActive: boolean;
  isAnswered: boolean;
}

const GameSquare: React.FC<GameSquareProps> = ({ index, isActive, isAnswered }) => {
  const { currentQuestion } = useGameContext();
  
  // Different colors for squares
  const getSquareColor = () => {
    const colors = [
      'bg-yellow-100',
      'bg-blue-100',
      'bg-green-100',
      'bg-rose-100',
      'bg-purple-100'
    ];
    return colors[index % colors.length];
  };

  return (
    <div 
      className={`game-square w-16 h-16 md:w-20 md:h-20 flex items-center justify-center relative
                 ${isActive ? 'active' : getSquareColor()}
                 ${isAnswered ? 'border-green-500' : ''}`}
    >
      <span className="text-xl font-bold">{index + 1}</span>
      
      {/* Token */}
      {isActive && (
        <div className="token absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2">
          👨‍🎓
        </div>
      )}
      
      {/* Question display */}
      {isActive && currentQuestion && (
        <div className="absolute w-64 bg-white p-4 rounded-lg shadow-lg border-2 border-blue-300 
                      left-1/2 -translate-x-1/2 top-full mt-2 z-20">
          <p className="font-bold text-center mb-2">{currentQuestion.question}</p>
          <p className="text-center text-xs text-slate-500">(Click to reveal answer)</p>
        </div>
      )}
    </div>
  );
};

export default GameSquare;