import React from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero = ({ isVisible, scrollToSection }) => (
  <section id="hero" className="min-h-screen flex items-center justify-center relative">
    <div className="text-center z-10">
      <div className={`transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
          Shareiar Islam
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          Full Stack Developer & Devops engineer
        </p>
        <div className="flex justify-center space-x-6 mb-12">
          <a href="#" className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full hover:scale-110 transition-transform duration-300">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:scale-110 transition-transform duration-300">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:scale-110 transition-transform duration-300">
            <Mail className="w-6 h-6" />
          </a>
        </div>
        <button onClick={() => scrollToSection('about')} className="animate-bounce">
          <ChevronDown className="w-8 h-8 text-cyan-400" />
        </button>
      </div>
    </div>
  </section>
);

export default Hero;
