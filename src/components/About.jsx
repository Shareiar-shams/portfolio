import React from 'react';
import { Code, Palette, Zap, User } from 'lucide-react';

const About = ({ isVisible }) => (
  <section id="about" className="py-20 px-6">
    <div className="container mx-auto max-w-4xl">
      <div className={`transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate full-stack developer with 5+ years of experience creating digital experiences 
              that are not only functional but also beautiful and user-friendly.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              I specialize in React, Node.js, and modern web technologies. When I'm not coding, 
              you'll find me exploring new design trends or contributing to open-source projects.
            </p>
            <div className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-cyan-400" />
                <span>Clean Code</span>
              </div>
              <div className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-blue-400" />
                <span>Creative Design</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-purple-400" />
                <span>Fast Performance</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="w-64 h-64 mx-auto bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full p-1">
              <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center">
                <User className="w-32 h-32 text-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
