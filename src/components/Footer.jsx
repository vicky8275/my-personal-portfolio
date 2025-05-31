// src/components/Footer.jsx
import React from 'react';
import useAnimateOnScroll from '../hooks/useAnimateOnScroll'; // Import the custom hook

const Footer = () => {
  const [refFooter, isVisibleFooter] = useAnimateOnScroll(0.1); // Hook for footer animation

  return (
    // Footer Section: Simple copyright and build information
    <footer id="footer" className="bg-gray-950 text-gray-400 py-8 text-center" ref={refFooter}>
      <div className="container mx-auto px-6">
        {/* Apply animation to the copyright text */}
        <p className={`${isVisibleFooter ? 'animate-fade-in-up' : ''}`}>
          &copy; 2025 VICKY. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;