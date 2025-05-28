import { useState } from 'react';
import Hero from './components/Hero';
import PreMadeGame from './components/PreMadeGame/PreMadeGame';
import GameBuilder from './components/GameBuilder/GameBuilder';
import Instructions from './components/Instructions';
import Footer from './components/Footer';
import { GameProvider } from './contexts/GameContext';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToGame = () => {
    setActiveSection('game');
    document.getElementById('game-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-blue-100 font-comic">
        <Hero scrollToGame={scrollToGame} />
        
        <div id="game-section" className="container mx-auto px-4 py-12">
          <PreMadeGame />
        </div>
        
        <div id="builder-section" className="container mx-auto px-4 py-12 bg-white/50 rounded-lg shadow-md my-12">
          <GameBuilder />
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <Instructions />
        </div>
        
        <Footer />
      </div>
    </GameProvider>
  );
}

export default App;