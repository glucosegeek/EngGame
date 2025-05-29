import React from 'react';
import GameSquare from './GameSquare';
import { useGameContext } from '../../contexts/GameContext';

interface GameBoardProps {
  answeredQuestions: Set<number>;
}

const GameBoard: React.FC<GameBoardProps> = ({ answeredQuestions }) => {
  const { position, boardSize } = useGameContext();
  
  // Create board squares based on boardSize (default 10)
  const renderSquares = () => {
    const squares = [];
    
    // Add start square
    squares.push(
      <div key="start-row\" className="flex justify-center gap-4 mb-4">
        <div className={`game-square w-16 h-16 md:w-20 md:h-20 flex items-center justify-center relative
                      ${position === -1 ? 'active' : 'bg-green-100 border-green-400'}`}>
          <span className="text-xl font-bold">Start</span>
          {position === -1 && (
            <div className="token absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2">
              👨‍🎓
            </div>
          )}
        </div>
      </div>
    );
    
    const rows = Math.ceil(boardSize / 5);
    const squaresPerRow = Math.ceil(boardSize / rows);
    
    for (let row = 0; row < rows; row++) {
      const rowSquares = [];
      for (let col = 0; col < squaresPerRow; col++) {
        const index = row * squaresPerRow + col;
        if (index < boardSize) {
          rowSquares.push(
            <GameSquare 
              key={index} 
              index={index} 
              isActive={position === index}
              isAnswered={answeredQuestions.has(index)}
            />
          );
        }
      }
      squares.push(
        <div key={`row-${row}`} className="flex justify-center gap-4 mb-4">
          {rowSquares}
        </div>
      );
    }
    
    return squares;
  };

  return (
    <div className="mb-8">
      {renderSquares()}
      <div className="mt-4 text-center text-slate-600">
        <p>You're on {position === -1 ? 'Start' : `square ${position + 1}`}/{boardSize}</p>
      </div>
    </div>
  );
};

export default GameBoard;