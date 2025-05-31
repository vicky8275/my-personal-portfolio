// src/components/Navbar.jsx
import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Function for smooth scroll to any section
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu(); // Close mobile menu if open
  };

  return (
    <header className="fixed w-full z-50 bg-gray-900 bg-opacity-90 shadow-lg backdrop-blur-sm">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="#home" // Keep href for accessibility/fallback
          onClick={(e) => scrollToSection(e, 'home')} // Use the new scroll function
          className="text-2xl font-extrabold bg-gradient-to-r from-teal-400 to-purple-400 text-transparent bg-clip-text
                     hover:from-teal-300 hover:to-purple-300 transition duration-300
                     drop-shadow-[0_0px_10px_rgba(45,212,191,0.5)] hover:drop-shadow-[0_0px_15px_rgba(167,139,250,0.7)]"
        >
          VICKY
        </a>

        <div className="hidden md:flex space-x-8">
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-lg hover:text-teal-400 transition duration-300">Home</a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-lg hover:text-teal-400 transition duration-300">About</a>
          <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="text-lg hover:text-teal-400 transition duration-300">Skills</a>
          <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="text-lg hover:text-teal-400 transition duration-300">Projects</a>
          <a href="#games-section" onClick={(e) => scrollToSection(e, 'games-section')} className="text-lg hover:text-teal-400 transition duration-300">Games</a> {/* NEW LINK */}
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-lg hover:text-teal-400 transition duration-300">Contact</a>
        </div>

        <button
          id="mobile-menu-button"
          className="md:hidden text-gray-100 text-2xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars"></i>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-gray-900 bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 text-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ display: isOpen ? 'flex' : 'none' }}
      >
        <button
          id="close-mobile-menu"
          className="absolute top-6 right-6 text-gray-100 text-3xl focus:outline-none"
          onClick={closeMenu}
          aria-label="Close mobile menu"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Updated mobile menu links */}
        <a href="#home" className="hover:text-teal-400 transition duration-300" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
        <a href="#about" className="hover:text-teal-400 transition duration-300" onClick={(e) => scrollToSection(e, 'about')}>About</a>
        <a href="#skills" className="hover:text-teal-400 transition duration-300" onClick={(e) => scrollToSection(e, 'skills')}>Skills</a>
        <a href="#projects" className="hover:text-teal-400 transition duration-300" onClick={(e) => scrollToSection(e, 'projects')}>Projects</a>
        <a href="#games-section" className="hover:text-teal-400 transition duration-300" onClick={(e) => scrollToSection(e, 'games-section')}>Games</a> {/* NEW LINK */}
        <a href="#contact" className="hover:text-teal-400 transition duration-300" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
      </div>
    </header>
  );
};

export default Navbar;