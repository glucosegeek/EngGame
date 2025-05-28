import React from 'react';

const Instructions: React.FC = () => {
  return (
    <div className="card max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">How to Play</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-yellow-50 p-6 rounded-xl shadow-md text-center">
          <div className="text-4xl mb-4">➡️</div>
          <h3 className="text-xl font-bold mb-2">1. Move Forward</h3>
          <p className="text-slate-600">Click 'Next Field' to advance to the next square on the board.</p>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-xl shadow-md text-center">
          <div className="text-4xl mb-4">🤔</div>
          <h3 className="text-xl font-bold mb-2">2. Answer Questions</h3>
          <p className="text-slate-600">Each square has an English question. Try to answer before revealing!</p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-xl shadow-md text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-bold mb-2">3. Complete the Board</h3>
          <p className="text-slate-600">Reach the final square and answer all questions to win!</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-rose-50 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Teaching Tips:</h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          <li>Create custom games for specific vocabulary or grammar points</li>
          <li>Have students create their own games to test classmates</li>
          <li>Play in pairs or small groups for collaborative learning</li>
          <li>Use as a review activity before tests or quizzes</li>
        </ul>
      </div>
    </div>
  );
};

export default Instructions;