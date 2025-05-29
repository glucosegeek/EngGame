import React, { useState, useEffect } from 'react';
import { PlusCircle, Wand2 } from 'lucide-react';
import { GameQuestion } from '../../types/gameTypes';

interface GameFormProps {
  onGameGenerated: (gameData: {
    title: string;
    squares: number;
    questions: GameQuestion[];
  }) => void;
}

const GameForm: React.FC<GameFormProps> = ({ onGameGenerated }) => {
  const [title, setTitle] = useState('My English Game');
  const [squares, setSquares] = useState(10);
  const [questions, setQuestions] = useState<Array<{question: string; answer: string}>>([
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' }
  ]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (questions.length !== squares) {
      if (questions.length < squares) {
        const additionalQuestions = Array(squares - questions.length)
          .fill(null)
          .map(() => ({ question: '', answer: '' }));
        setQuestions([...questions, ...additionalQuestions]);
      } else {
        setQuestions(questions.slice(0, squares));
      }
    }
  }, [squares]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  const handleQuestionChange = (index: number, field: 'question' | 'answer', value: string) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleSquaresChange = (value: number) => {
    const newValue = Math.max(3, Math.min(30, value));
    setSquares(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Please enter a game title');
      return;
    }
    
    const emptyFields = questions.some(q => !q.question.trim() || !q.answer.trim());
    if (emptyFields) {
      setError('Please fill in all question and answer fields');
      return;
    }
    
    if (questions.length !== squares) {
      setError(`You need exactly ${squares} questions for ${squares} squares`);
      return;
    }
    
    onGameGenerated({
      title,
      squares,
      questions: questions.map((q, index) => ({
        id: index.toString(),
        question: q.question,
        answer: q.answer
      }))
    });
    
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-slate-700 mb-1">
            Game Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder="My Fun English Game"
          />
        </div>
        
        <div>
          <label htmlFor="squares" className="block text-lg font-medium text-slate-700 mb-1">
            Number of Squares
          </label>
          <input
            type="number"
            id="squares"
            min="3"
            max="30"
            value={squares}
            onChange={(e) => handleSquaresChange(Number(e.target.value))}
            className="input-field"
            placeholder="Enter number of squares (3-30)"
          />
          <p className="mt-1 text-sm text-slate-500">
            Min: 3, Max: 30 squares
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-lg font-medium text-slate-700">
            Questions and Answers
          </label>
          <p className="text-sm text-slate-500">
            Questions: {questions.length}/{squares} (required)
          </p>
        </div>
        
        <div className="grid gap-4">
          {questions.map((q, index) => (
            <div key={index} className="p-4 bg-blue-50 rounded-lg relative transform transition-all duration-200 hover:scale-[1.01] hover:shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`question-${index}`} className="block font-medium text-slate-700 mb-1">
                    Question {index + 1}
                  </label>
                  <input
                    type="text"
                    id={`question-${index}`}
                    value={q.question}
                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                    className="input-field"
                    placeholder="Translate 'dog' to Polish"
                  />
                </div>
                
                <div>
                  <label htmlFor={`answer-${index}`} className="block font-medium text-slate-700 mb-1">
                    Answer
                  </label>
                  <input
                    type="text"
                    id={`answer-${index}`}
                    value={q.answer}
                    onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                    className="input-field"
                    placeholder="pies"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={handleAddQuestion}
          className="btn btn-secondary flex items-center gap-2"
        >
          <PlusCircle size={20} /> Add Question
        </button>
        
        <button
          type="submit"
          className="btn btn-primary flex items-center gap-2"
        >
          <Wand2 size={20} />
          Generate My Game
        </button>
      </div>
    </form>
  );
};

export default GameForm;