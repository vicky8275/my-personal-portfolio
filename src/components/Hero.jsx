// src/components/Hero.jsx
import React from 'react';
import useAnimateOnScroll from '../hooks/useAnimateOnScroll';

const Hero = () => {
  const [refHero, isVisibleHero] = useAnimateOnScroll(0.1);
  const [refName, isVisibleName] = useAnimateOnScroll(0.1);
  const [refTitle, isVisibleTitle] = useAnimateOnScroll(0.1);
  const [refSocial, isVisibleSocial] = useAnimateOnScroll(0.1);
  // refButton and isVisibleButton are removed as the buttons are removed

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-center p-6 overflow-hidden" ref={refHero}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 opacity-70 animate-gradient-shift"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <>
          <img
            src="/images/SAI_Profile.jpg"
            alt="VICKY"
            className={`w-48 h-48 rounded-full mx-auto mb-6 border-4 border-teal-400 shadow-xl transform transition-transform duration-500 hover:scale-105 ${
              isVisibleHero ? 'animate-bounce-in' : ''
            }`}
          />
          <h1
            ref={refName}
            className={`text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 ${
              isVisibleName ? 'animate-fade-in-up' : ''
            }`}
          >
            SAI VIGNESHWARAN A
          </h1>
          <p
            ref={refTitle}
            className={`text-2xl md:text-3xl text-teal-300 mb-8 ${
              isVisibleTitle ? 'animate-fade-in-up delay-200' : ''
            }`}
          >
            Aspiring Software Engineer | AI Enthusiast
          </p>
          <div
            ref={refSocial}
            className={`flex justify-center space-x-6 ${
              isVisibleSocial ? 'animate-fade-in-up delay-400' : ''
            }`}
          >
            <a href="https://www.linkedin.com/in/saivicky8275/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400 transition duration-300 text-4xl" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href="https://github.com/vicky8275" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400 transition duration-300 text-4xl" aria-label="GitHub"><i className="fab fa-github"></i></a>
            <a href="https://leetcode.com/u/SaiVigneshwaran/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400 transition duration-300 text-4xl" aria-label="LeetCode"><i className="fas fa-code"></i></a>
            <a href="https://www.hackerrank.com/profile/saivicky8274" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400 transition duration-300 text-4xl" aria-label="HackerRank"><i className="fab fa-hackerrank"></i></a>
          </div>

          {/* Buttons removed from here */}
        </>
      </div>
    </section>
  );
};

export default Hero;