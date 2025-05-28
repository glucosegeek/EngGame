import React from 'react';
import { BookOpen } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-500 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <BookOpen size={24} className="mr-2" />
            <span className="text-xl font-bubblegum">English Board Game</span>
          </div>
        </div>
        
        <div className="mt-6 text-center text-blue-100">
          <p>Made with ❤️ for Inez</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
