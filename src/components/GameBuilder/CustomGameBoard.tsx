import React, { useState, useEffect } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { GameQuestion } from '../../types/gameTypes';
import { useGameContext } from '../../contexts/GameContext';

interface CustomGameBoardProps {
  squares: number;
  questions: GameQuestion[];
}

const CustomGameBoard: React.FC<CustomGameBoardProps> = ({ squares, questions }) => {
  const { 
    position,
    setPosition,
    isRolling,
    setIsRolling,
    currentQuestion,
    setCurrentQuestion,
    drawNumber,
    resetNumberPool
  } = useGameContext();

  const [gameComplete, setGameComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string>('');

  useEffect(() => {
    handleRestart();
  }, [squares]);

  const handleRestart = () => {
    setPosition(-1);
    setGameComplete(false);
    setCurrentQuestion(null);
    setRevealedAnswers(new Set());
    setAnsweredQuestions(new Set());
    resetNumberPool();
    setError('');
  };

  const handleAnswerReveal = (index: number) => {
    if (!revealedAnswers.has(index)) {
      setAnsweredQuestions(prev => new Set([...prev, position]));
      setRevealedAnswers(prev => new Set([...prev, index]));
    }
  };

  const checkGameProgress = () => {
    if (position === -1) return;
    
    const allAnswered = Array.from({ length: position + 1 }, (_, i) => i)
      .every(pos => answeredQuestions.has(pos));
    
    if (position === squares - 1 && allAnswered) {
      setGameComplete(true);
    }
  };

  useEffect(() => {
    checkGameProgress();
  }, [answeredQuestions, position]);

  const handleNextField = () => {
    if (isRolling) return;

    if (position >= 0 && currentQuestion && !answeredQuestions.has(position)) {
      setError('Please reveal the current answer before continuing!');
      return;
    }
    
    setIsRolling(true);
    setCurrentQuestion(null);
    setError('');
    
    const newPosition = position === -1 ? 0 : Math.min(position + 1, squares - 1);
    
    setTimeout(() => {
      setPosition(newPosition);
      setIsRolling(false);
      
      if (newPosition < squares) {
        setCurrentQuestion(questions[newPosition]);
      }
    }, 500);
  };

  const renderSquares = () => {
    const squaresArray = [];
    
    squaresArray.push(
      <div key="start-row\" className="flex justify-center gap-2 mb-2">
        <div className={`game-square w-12 h-12 md:w-16 md:h-16 flex items-center justify-center relative
                      ${position === -1 ? 'active' : 'bg-green-100 border-green-400'}`}>
          <span className="text-lg font-bold">Start</span>
          {position === -1 && (
            <div className="token absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2">
              👨‍🎓
            </div>
          )}
        </div>
      </div>
    );
    
    const rows = Math.ceil(squares / 5);
    const squaresPerRow = Math.ceil(squares / rows);
    
    for (let row = 0; row < rows; row++) {
      const rowSquares = [];
      for (let col = 0; col < squaresPerRow; col++) {
        const index = row * squaresPerRow + col;
        if (index < squares) {
          rowSquares.push(
            <div 
              key={index} 
              className={`game-square w-12 h-12 md:w-16 md:h-16 flex items-center justify-center relative
                       ${position === index ? 'active' : getSquareColor(index)}
                       ${answeredQuestions.has(index) ? 'border-green-500' : ''}`}
            >
              <span className="text-lg font-bold">{index + 1}</span>
              
              {position === index && (
                <div className="token absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2">
                  👨‍🎓
                </div>
              )}
            </div>
          );
        }
      }
      squaresArray.push(
        <div key={`row-${row}`} className="flex justify-center gap-2 mb-2">
          {rowSquares}
        </div>
      );
    }
    
    return squaresArray;
  };
  
  const getSquareColor = (index: number) => {
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
    <div>
      <div className="mb-6">
        {renderSquares()}
        <div className="mt-2 text-center text-slate-600 text-sm">
          <p>You're on {position === -1 ? 'Start' : `square ${position + 1}`}/{squares}</p>
        </div>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="flex gap-4 mb-4">
          <button 
            className={`btn btn-primary flex items-center gap-2 py-2 px-4 text-sm
                      ${isRolling || gameComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleNextField}
            disabled={isRolling || gameComplete}
          >
            <ArrowRight size={16} />
            Next Field
          </button>
          
          <button 
            className="btn btn-secondary flex items-center gap-2 py-2 px-4 text-sm"
            onClick={handleRestart}
          >
            <RotateCcw size={16} />
            Restart
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}
        
        {currentQuestion && (
          <div className="mt-2 w-full p-4 bg-white rounded-lg shadow-md">
            <p className="font-bold mb-2">{currentQuestion.question}</p>
            <button 
              className={`w-full py-2 rounded-lg mt-2 transition-colors ${
                revealedAnswers.has(position) ? 'bg-green-100 hover:bg-green-200' : 'bg-blue-100 hover:bg-blue-200'
              }`}
              onClick={() => handleAnswerReveal(position)}
            >
              {revealedAnswers.has(position) ? currentQuestion.answer : 'Reveal Answer'}
            </button>
          </div>
        )}
        
        {gameComplete && (
          <div className="mt-4 p-3 bg-green-100 rounded-lg text-center animate-pulse">
            <h3 className="text-lg font-bold text-green-700">Congratulations!</h3>
            <p className="text-green-600">You've completed all questions and finished the game!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomGameBoard;