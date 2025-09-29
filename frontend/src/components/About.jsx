import React from 'react';
import { Code, Palette, Zap, User } from 'lucide-react';

const getFileUrl = (path) => {
  if (!path) return null;
  // If it's already a full URL (e.g., from cloudinary), return as is
  if (path.startsWith('http')) return path;
  // Otherwise, prepend the backend URL
  return `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${path}`;
};

const About = ({ isVisible, data }) => (
  <section id="about" className="py-20 px-6">
    <div className="container mx-auto max-w-4xl">
      <div className={`transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="prose prose-invert max-w-none">
              {data?.description ? (
                <p className="whitespace-pre-line text-gray-300 text-lg leading-relaxed">
                  {data.description}
                </p>
              ) : (
                <p className="text-lg text-gray-300 leading-relaxed">Loading...</p>
              )}
            </div>
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
            {data?.profileImage ? (
              <div className="w-64 h-64 mx-auto overflow-hidden rounded-full p-1 bg-gradient-to-r from-cyan-400 to-blue-400">
                <img 
                  src={getFileUrl(data.profileImage)} 
                  alt={data?.name || "Profile"} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ) : (
              <div className="w-64 h-64 mx-auto bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full p-1">
                <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center">
                  <User className="w-32 h-32 text-cyan-400" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
