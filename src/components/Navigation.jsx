import React from 'react';
import { ChevronDown } from 'lucide-react';

const Navigation = ({ activeSection, scrollToSection }) => (
  <nav className="fixed top-0 left-0 right-0 z-40 bg-black bg-opacity-20 backdrop-blur-md border-b border-white border-opacity-10">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
        Portfolio
      </div>
      <div className="hidden md:flex space-x-8">
        {['hero', 'about', 'skills', 'projects', 'contact'].map(section => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`capitalize transition-all duration-300 hover:text-cyan-400 ${
              activeSection === section ? 'text-cyan-400' : 'text-white'
            }`}
          >
            {section}
          </button>
        ))}
      </div>
    </div>
  </nav>
);

export default Navigation;
