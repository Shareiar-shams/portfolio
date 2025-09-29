import React from 'react';
import dayjs from "dayjs";

const Experience = ({ isVisible, experiences }) => (
  <section id="experience" className="py-20 px-6 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 backdrop-blur-sm"></div>
    <div className="container mx-auto max-w-6xl relative">
      <div className={`transition-all duration-1000 ${isVisible.experience ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My journey and professional experience in the tech industry
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-500/50 via-blue-500/50 to-purple-500/50"></div>

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp._id}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full bg-cyan-400 transform -translate-x-1/2 border-4 border-gray-900"></div>

                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                  <div className="bg-gradient-to-br from-gray-900/50 via-gray-900/30 to-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/30 hover:border-gray-700/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-cyan-400">
                        {dayjs(exp.startDate).format("MMM YYYY")} - 
                        {exp.current ? "Present" : dayjs(exp.endDate).format("MMM YYYY")}
                      </span>
                      <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
                      <h4 className="text-lg text-gray-300">{exp.company}</h4>
                      <p className="text-gray-400 mt-2">{exp.description}</p>
                      
                      {/* Technologies/Skills used */}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 text-sm bg-gray-800/80 text-gray-300 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Achievements or highlights */}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <h5 className="text-sm font-medium text-gray-300">Key Achievements:</h5>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
                            {exp.achievements.map((achievement, idx) => (
                              <li key={idx}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Experience;