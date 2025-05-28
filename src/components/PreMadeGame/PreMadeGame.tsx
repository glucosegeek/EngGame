import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import { useGameContext } from '../../contexts/GameContext';
import { defaultQuestions } from '../../data/gameData';

const PreMadeGame: React.FC = () => {
  const { 
    position, 
    setPosition, 
    isRolling,
    setIsRolling,
    currentQuestion,
    setCurrentQuestion
  } = useGameContext();

  const [gameComplete, setGameComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string>('');

  // Reset the game
  const handleRestart = () => {
    setPosition(-1); // Reset to Start position
    setGameComplete(false);
    setCurrentQuestion(null);
    setAnsweredQuestions(new Set());
    setError('');
  };

  // Handle answer reveal
  const handleAnswerReveal = () => {
    if (currentQuestion && position >= 0) {
      setAnsweredQuestions(prev => new Set([...prev, position]));
    }
  };

  // Check if all questions up to current position have been revealed
  const checkGameProgress = () => {
    if (position === -1) return; // Don't check if on Start
    
    const allAnswered = Array.from({ length: position + 1 }, (_, i) => i)
      .every(pos => answeredQuestions.has(pos));
    
    if (position === 9 && allAnswered) {
      setGameComplete(true);
    }
  };

  // Effect to check game progress when answers are revealed
  useEffect(() => {
    checkGameProgress();
  }, [answeredQuestions, position]);

  // Move to next field
  const handleNextField = () => {
    if (isRolling) return;
    
    // Check if current question is answered before allowing movement
    if (position >= 0 && currentQuestion && !answeredQuestions.has(position)) {
      setError('Please reveal the current answer before continuing!');
      return;
    }
    
    setIsRolling(true);
    setCurrentQuestion(null);
    setError('');
    
    // Calculate new position
    const newPosition = position === -1 ? 0 : Math.min(position + 1, 9);
    
    // Move token after a short delay
    setTimeout(() => {
      setPosition(newPosition);
      setIsRolling(false);
      
      // Show question after landing
      if (newPosition < 10) {
        setCurrentQuestion(defaultQuestions[newPosition]);
      }
    }, 500);
  };

  return (
    <div className="card mb-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">Pre-made Board Game</h2>
      
      <GameBoard answeredQuestions={answeredQuestions} />
      
      <GameControls 
        onRollDice={handleNextField}
        onRestart={handleRestart} 
        onAnswerReveal={handleAnswerReveal}
        isRolling={isRolling}
        gameComplete={gameComplete}
        error={error}
      />
      
      {gameComplete && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg text-center animate-pulse">
          <h3 className="text-xl font-bold text-green-700">Congratulations!</h3>
          <p className="text-green-600">You've completed all questions and finished the game!</p>
        </div>
      )}
    </div>
  );
};

export default PreMadeGame;