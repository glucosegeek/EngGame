import React from 'react';
import { BookOpen } from 'lucide-react';

interface HeroProps {
  scrollToGame: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToGame }) => {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-300 rounded-full opacity-40"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-rose-300 rounded-full opacity-30"></div>
        <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-green-300 rounded-full opacity-30"></div>
        
        {/* Background illustrations */}
        <div className="hidden md:block absolute top-1/4 left-10 transform -rotate-12">
          <div className="w-16 h-16 bg-blue-200 rounded p-2 flex items-center justify-center shadow-md">
            <span className="text-3xl font-bubblegum">A</span>
          </div>
        </div>
        <div className="hidden md:block absolute bottom-1/4 right-20 transform rotate-12">
          <div className="w-16 h-16 bg-yellow-200 rounded p-2 flex items-center justify-center shadow-md">
            <span className="text-3xl font-bubblegum">B</span>
          </div>
        </div>
        <div className="hidden md:block absolute top-2/3 left-1/3 transform -rotate-6">
          <div className="w-16 h-16 bg-rose-200 rounded p-2 flex items-center justify-center shadow-md">
            <span className="text-3xl font-bubblegum">C</span>
          </div>
        </div>
      </div>
      
      {/* Hero content */}
      <div className="relative z-10 text-center px-6 py-12 md:py-24 max-w-4xl">
        <div className="inline-block mb-4">
          <BookOpen size={64} className="text-rose-500 mx-auto" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800">
          Learn English Through Play!
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-slate-600">
          Play a fun board game or build your own!
        </p>
        <button 
          onClick={scrollToGame}
          className="btn btn-primary animate-bounce"
        >
          Play Now
        </button>
      </div>
    </div>
  );
};

export default Hero;