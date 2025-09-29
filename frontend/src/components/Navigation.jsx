import { useState } from "react";
import { Menu, X } from "lucide-react";

const SECTIONS = ["hero", "about", "skills", "projects", "contact"];

const Navigation = ({ activeSection, scrollToSection, isVisible = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (section) => {
    scrollToSection(section);
    setIsOpen(false);
  };

  const NavButton = ({ section, isMobile = false }) => (
    <button
      onClick={() => handleClick(section)}
      className={`capitalize transition-all duration-300 hover:text-cyan-400 ${
        activeSection === section ? "text-cyan-400" : "text-white"
      } ${isMobile ? "block w-full text-center" : ""}`}
    >
      {section}
    </button>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 bg-black bg-opacity-20 backdrop-blur-md border-b border-white border-opacity-10 transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          style={{ fontFamily: "Rugislaw, sans-serif" }}
        >
          Shareiar
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {SECTIONS.map((section) => (
            <NavButton key={section} section={section} />
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-opacity-95 px-6 py-4 space-y-4">
          {SECTIONS.map((section) => (
            <NavButton key={section} section={section} isMobile />
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
