export interface GameQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface GameData {
  title: string;
  squares: number;
  questions: GameQuestion[];
}