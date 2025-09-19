import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Palette, Zap, User, Briefcase, MessageSquare } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsVisible(prev => ({
          ...prev,
          [entry.target.id]: entry.isIntersecting
        }));
        
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  const skills = [
    { name: 'React', level: 90, color: 'from-blue-400 to-cyan-400' },
    { name: 'JavaScript', level: 85, color: 'from-yellow-400 to-orange-400' },
    { name: 'Node.js', level: 80, color: 'from-green-400 to-emerald-400' },
    { name: 'Python', level: 75, color: 'from-purple-400 to-pink-400' },
    { name: 'UI/UX Design', level: 70, color: 'from-indigo-400 to-purple-400' }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
      image: '/api/placeholder/400/250',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      demo: '#',
      github: '#'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates',
      image: '/api/placeholder/400/250',
      tech: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      demo: '#',
      github: '#'
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather app with location-based forecasts',
      image: '/api/placeholder/400/250',
      tech: ['React', 'API Integration', 'Charts.js'],
      demo: '#',
      github: '#'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white min-h-screen relative overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Mouse follower */}
      <div
        className="fixed w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full pointer-events-none mix-blend-screen z-50 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          opacity: 0.6
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black bg-opacity-20 backdrop-blur-md border-b border-white border-opacity-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Portfolio
            </div>
            <div className="hidden md:flex space-x-8">
              {['hero', 'about', 'skills', 'projects', 'contact'].map((section) => (
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
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative">
        <div className="text-center z-10">
          <div className={`transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              John Doe
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Full Stack Developer & UI/UX Designer
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
            <button
              onClick={() => scrollToSection('about')}
              className="animate-bounce"
            >
              <ChevronDown className="w-8 h-8 text-cyan-400" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
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

      {/* Skills Section */}
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

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className={`transition-all duration-1000 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="h-48 bg-gradient-to-r from-cyan-500 to-blue-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <Briefcase className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <a
                        href={project.demo}
                        className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Demo</span>
                      </a>
                      <a
                        href={project.github}
                        className="flex items-center space-x-2 text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-black bg-opacity-20">
        <div className="container mx-auto max-w-4xl">
          <div className={`transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                I'm always open to discussing new opportunities and interesting projects. 
                Let's create something amazing together!
              </p>
              <a
                href="mailto:john@example.com"
                className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
              >
                Say Hello
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white border-opacity-10">
        <p className="text-gray-400">
          © 2024 John Doe. Made with ❤️ and React
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;