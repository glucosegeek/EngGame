import React, { useState } from 'react';
import GameForm from './GameForm';
import CustomGameBoard from './CustomGameBoard';
import { GameQuestion } from '../../types/gameTypes';
import { GameProvider } from '../../contexts/GameContext';

const GameBuilder: React.FC = () => {
  const [customGame, setCustomGame] = useState<{
    title: string;
    squares: number;
    questions: GameQuestion[];
  } | null>(null);

  const handleGameGenerated = (gameData: {
    title: string;
    squares: number;
    questions: GameQuestion[];
  }) => {
    setCustomGame(gameData);
    setTimeout(() => {
      document.getElementById('custom-game')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">Create Your Own Board Game</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <GameForm onGameGenerated={handleGameGenerated} />
        </div>
        
        {customGame && (
          <GameProvider>
            <div id="custom-game" className="card">
              <h3 className="text-2xl font-bold mb-4 text-center">{customGame.title}</h3>
              <CustomGameBoard 
                squares={customGame.squares} 
                questions={customGame.questions} 
              />
            </div>
          </GameProvider>
        )}
      </div>
    </div>
  );
};

export default GameBuilder;