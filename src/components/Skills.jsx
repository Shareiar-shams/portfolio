import React from 'react';

const Skills = ({ isVisible, skills }) => (
  <section id="skills" className="py-20 px-6 bg-black bg-opacity-20">
    <div className="container mx-auto max-w-4xl">
      <div className={`transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Skills
        </h2>
        <div className="space-y-8">
          {skills.map((skill, index) => (
            <div key={skill.name} className="group">
              <div className="flex justify-between mb-2">
                <span className="text-lg font-medium">{skill.name}</span>
                <span className="text-cyan-400">{skill.level}%</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out group-hover:scale-105`}
                  style={{
                    width: isVisible.skills ? `${skill.level}%` : '0%',
                    transitionDelay: `${index * 200}ms`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Skills;
