import React from 'react';
import useAnimateOnScroll from '../hooks/useAnimateOnScroll'; // Import the custom hook

const Contact = () => {
  // Apply the animation hook to the section for overall animation
  const [refSection, isVisibleSection] = useAnimateOnScroll(0.1);

  return (
    // Contact Section: Ways for visitors to get in touch
    <section id="contact" className="py-20 px-6 bg-gray-900 text-gray-100" ref={refSection}>
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className={`text-4xl font-bold text-teal-400 mb-12 ${isVisibleSection ? 'animate-fade-in' : ''}`}>
          Get in Touch
        </h2>
        <p className={`text-lg leading-relaxed mb-8 ${isVisibleSection ? 'animate-fade-in delay-200' : ''}`}>
          I'm always open to new opportunities, collaborations, and discussions. Feel free to reach out!
        </p>
        {/* Contact Information Cards */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
          {/* Email Card */}
          <div className={`bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 ${isVisibleSection ? 'animate-slide-in-bottom delay-300' : ''} w-full md:w-auto`}>
            <i className="fas fa-envelope text-teal-400 text-4xl mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <a href="mailto:saivicky8274@gmail.com" className="text-blue-400 hover:underline">saivicky8274@gmail.com</a>
          </div>
          {/* Phone Card */}
          <div className={`bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 ${isVisibleSection ? 'animate-slide-in-bottom delay-400' : ''} w-full md:w-auto`}>
            <i className="fas fa-phone text-teal-400 text-4xl mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p>+916383444703</p>
          </div>
          {/* Address Card */}
          <div className={`bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 ${isVisibleSection ? 'animate-slide-in-bottom delay-500' : ''} w-full md:w-auto`}>
            <i className="fas fa-map-marker-alt text-teal-400 text-4xl mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p>No.19, Kattiyavayal, RG Puram (PO), Pudukkottai - 622003</p>
          </div>
        </div>
        {/* Social Media Links (repeated for convenience in contact section) */}
        <div className={`flex justify-center space-x-6 ${isVisibleSection ? 'animate-fade-in delay-600' : ''}`}>
          <a href="https://www.linkedin.com/in/saivicky8275/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400 transition duration-300 text-5xl" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
          <a href="https://github.com/vicky8275" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400 transition duration-300 text-5xl" aria-label="GitHub"><i className="fab fa-github"></i></a>
          <a href="https://leetcode.com/u/SaiVigneshwaran/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400 transition duration-300 text-5xl" aria-label="LeetCode"><i className="fas fa-code"></i></a>
          <a href="https://www.hackerrank.com/profile/saivicky8274" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400 transition duration-300 text-5xl" aria-label="HackerRank"><i className="fab fa-hackerrank"></i></a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
