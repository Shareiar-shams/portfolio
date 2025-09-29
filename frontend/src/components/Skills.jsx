import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Initialize FontAwesome library
library.add(fab, fas);

const Skills = ({ isVisible, skills }) => (
  <section id="skills" className="py-20 px-6 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/5 backdrop-blur-sm"></div>
    <div className="container mx-auto max-w-6xl relative">
      <div className={`transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of my technical expertise and professional capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={skill.name} 
              className="group bg-gradient-to-br from-gray-900/50 via-gray-900/30 to-gray-800/50 backdrop-blur-lg rounded-xl p-6 hover:bg-gray-800/50 border border-gray-700/30 hover:border-gray-700/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10"
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transform: isVisible.skills ? 'translateY(0)' : 'translateY(20px)',
                opacity: isVisible.skills ? 1 : 0
              }}
            >
              <div className="flex items-start gap-4">
                {skill.icon && (
                  <div className="text-3xl text-cyan-400 bg-gradient-to-br from-gray-900 to-gray-800 p-3 rounded-lg shadow-lg border border-gray-700/50 group-hover:border-cyan-500/50 transition-all duration-300">
                    <FontAwesomeIcon icon={skill.icon.includes('fa-') ? skill.icon : ['fab', skill.icon]} />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="relative h-2.5 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
                    
                    {/* Progress bar */}
                    <div
                      className="relative h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible.skills ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 200}ms`,
                        background: `linear-gradient(to right, 
                          rgba(56, 189, 248, 0.7), 
                          rgba(59, 130, 246, 0.7), 
                          rgba(99, 102, 241, 0.7)
                        )`
                      }}
                    >
                      {/* Shimmer effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      </div>
                      
                      {/* Inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-white/20"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Skill details or additional info can be added here */}
              <div className="mt-4 text-sm text-gray-400">
                {skill.details && (
                  <p>{skill.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Skills;
