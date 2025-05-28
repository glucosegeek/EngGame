import { useState } from 'react';
import Hero from './components/Hero';
import GameBuilder from './components/GameBuilder/GameBuilder';
import Instructions from './components/Instructions';
import Footer from './components/Footer';
import { GameProvider } from './contexts/GameContext';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToBuilder = () => {
    setActiveSection('builder');
    document.getElementById('builder-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-blue-100 font-comic">
        <Hero scrollToGame={scrollToBuilder} />
        
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