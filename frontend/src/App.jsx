import { useState, useEffect } from 'react';
import api from './utils/api';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MouseFollower from './components/MouseFollower';
import BackgroundParticles from './components/BackgroundParticles';

const App = () => {
  const [visitors, setVisitors] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Data states
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Starting data fetch...');
        setLoading(true);
        
        const skillsRes = await api.get('/api/skills');
        console.log('Skills data:', skillsRes.data);
        setSkills(skillsRes.data);

        const projectsRes = await api.get('/api/projects');
        console.log('Projects data:', projectsRes.data);
        setProjects(projectsRes.data);

        const experiencesRes = await api.get('/api/experience');
        console.log('Experience data:', experiencesRes.data);
        setExperiences(experiencesRes.data);

        const aboutRes = await api.get('/api/about');
        console.log('About data:', aboutRes.data);
        setAbout(aboutRes.data);

        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        console.log('Fetch complete, setting loading to false');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const res = await api.post("/api/visitors/visit");
        setVisitors(res.data.total);
      } catch (err) {
        // Set a default value if the visitor count fails
        setVisitors(0);
        console.error('Failed to track visitor:', err.message);
      }
    };

    trackVisitor();
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const updatePosition = () => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        setIsVisible(prev => ({ ...prev, [entry.target.id]: entry.isIntersecting }));
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '-50px'
    });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);
  
  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white min-h-screen relative overflow-hidden">
      <BackgroundParticles />
      <MouseFollower position={mousePosition} />
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
      
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50">
          <div className="text-white flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-cyan-400/30 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 animate-spin"></div>
            </div>
            <p className="text-cyan-400">Loading your portfolio...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 p-6 rounded-lg max-w-md text-center">
            <h3 className="text-lg font-semibold mb-2">Error</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <main className={`transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
        <Hero isVisible={isVisible} scrollToSection={scrollToSection} about={about} />
        <About isVisible={isVisible} data={about} />
        <Experience isVisible={isVisible} experiences={experiences} />
        <Skills isVisible={isVisible} skills={skills} />
        <Projects isVisible={isVisible} projects={projects} />
        <Contact isVisible={isVisible} />
        <Footer visitorCount={visitors} />
      </main>
    </div>
  );
};

export default App;
