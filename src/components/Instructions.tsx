import React from 'react';

const Instructions: React.FC = () => {
  return (
    <div className="card max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">How to Play</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-yellow-50 p-6 rounded-xl shadow-md text-center">
          <div className="text-4xl mb-4">🎲</div>
          <h3 className="text-xl font-bold mb-2">1. Roll the Dice</h3>
          <p className="text-slate-600">Click the 'Roll Dice' button to get a random number between 1 and 6.</p>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-xl shadow-md text-center">
          <div className="text-4xl mb-4">➡️</div>
          <h3 className="text-xl font-bold mb-2">2. Move Across the Board</h3>
          <p className="text-slate-600">Your token will move automatically based on your dice roll.</p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-xl shadow-md text-center">
          <div className="text-4xl mb-4">🧠</div>
          <h3 className="text-xl font-bold mb-2">3. Answer Questions to Win!</h3>
          <p className="text-slate-600">Each square has an English question. Answer correctly to progress!</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-rose-50 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Teaching Tips:</h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          <li>Use the pre-made game for quick classroom activities</li>
          <li>Create custom games for specific vocabulary or grammar points</li>
          <li>Have students create their own games to test classmates</li>
          <li>Play in pairs or small groups for collaborative learning</li>
        </ul>
      </div>
    </div>
  );
};

export default Instructions;