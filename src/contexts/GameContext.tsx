import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameQuestion } from '../types/gameTypes';

interface GameContextType {
  position: number;
  setPosition: (position: number) => void;
  diceValue: number | null;
  setDiceValue: (value: number | null) => void;
  isRolling: boolean;
  setIsRolling: (isRolling: boolean) => void;
  currentQuestion: GameQuestion | null;
  setCurrentQuestion: (question: GameQuestion | null) => void;
  boardSize: number;
  setBoardSize: (size: number) => void;
  numberPool: number[];
  setNumberPool: (pool: number[]) => void;
  resetNumberPool: () => void;
  drawNumber: () => number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [position, setPosition] = useState(-1); // Start at -1 for the "Start" position
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion | null>(null);
  const [boardSize, setBoardSize] = useState(10);
  const [numberPool, setNumberPool] = useState<number[]>([]);

  const resetNumberPool = () => {
    const numbers = Array.from({ length: boardSize }, (_, i) => i + 1);
    setNumberPool(numbers);
  };

  const drawNumber = () => {
    if (numberPool.length === 0) {
      resetNumberPool();
    }
    const randomIndex = Math.floor(Math.random() * numberPool.length);
    const number = numberPool[randomIndex];
    setNumberPool(numberPool.filter((_, index) => index !== randomIndex));
    return number;
  };

  return (
    <GameContext.Provider
      value={{
        position,
        setPosition,
        diceValue,
        setDiceValue,
        isRolling,
        setIsRolling,
        currentQuestion,
        setCurrentQuestion,
        boardSize,
        setBoardSize,
        numberPool,
        setNumberPool,
        resetNumberPool,
        drawNumber
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};