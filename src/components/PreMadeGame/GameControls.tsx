import React, { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { useGameContext } from '../../contexts/GameContext';

interface GameControlsProps {
  onRollDice: () => void;
  onRestart: () => void;
  onAnswerReveal: () => void;
  isRolling: boolean;
  gameComplete: boolean;
  error: string;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  onRollDice, 
  onRestart, 
  onAnswerReveal,
  isRolling,
  gameComplete,
  error
}) => {
  const { currentQuestion } = useGameContext();
  const [showAnswer, setShowAnswer] = useState(false);
  
  const handleAnswerClick = () => {
    if (!showAnswer) {
      onAnswerReveal();
    }
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4 mb-6">
        <button 
          className={`btn btn-primary flex items-center gap-2 ${isRolling || gameComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={onRollDice}
          disabled={isRolling || gameComplete}
        >
          <ArrowRight size={20} />
          Next Field
        </button>
        
        <button 
          className="btn btn-secondary flex items-center gap-2"
          onClick={onRestart}
        >
          <RotateCcw size={20} />
          Restart Game
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}
      
      {currentQuestion && (
        <div className="mt-2 w-full max-w-md p-4 bg-white rounded-lg shadow-md">
          <p className="font-bold mb-2">{currentQuestion.question}</p>
          <button 
            className={`w-full py-2 rounded-lg mt-2 transition-colors ${
              showAnswer ? 'bg-green-100 hover:bg-green-200' : 'bg-blue-100 hover:bg-blue-200'
            }`}
            onClick={handleAnswerClick}
          >
            {showAnswer ? currentQuestion.answer : 'Reveal Answer'}
          </button>
        </div>
      )}
    </div>
  );
};

export default GameControls;