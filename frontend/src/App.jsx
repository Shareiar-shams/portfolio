import { useState, useEffect } from 'react';
import axios from "axios";
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MouseFollower from './components/MouseFollower';
import BackgroundParticles from './components/BackgroundParticles';

const App = () => {
  const [visitors, setVisitors] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    axios.post("/api/visitors/visit")
      .then(res => setVisitors(res.data.total))
      .catch(err => console.error(err));
  }, []);
  
  useEffect(() => {
    const handleMouseMove = e => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsVisible(prev => ({ ...prev, [entry.target.id]: entry.isIntersecting }));
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { threshold: 0.1, rootMargin: '-50px' });

    document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white min-h-screen relative overflow-hidden">
      <BackgroundParticles />
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
      <Hero isVisible={isVisible} scrollToSection={scrollToSection} />
      <About isVisible={isVisible} />
      <Skills isVisible={isVisible} skills={skills} />
      <Projects isVisible={isVisible} projects={projects} />
      <Contact isVisible={isVisible} />
      <Footer />
      <MouseFollower position={mousePosition} />
    </div>
  );
};

export default App;
