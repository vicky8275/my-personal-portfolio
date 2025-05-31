import React from 'react';
import useAnimateOnScroll from '../hooks/useAnimateOnScroll'; // Import the custom hook

const About = () => {
  // Apply the animation hook to elements for scroll-triggered effects
  const [refSection, isVisibleSection] = useAnimateOnScroll(0.1);
  const [refSummary, isVisibleSummary] = useAnimateOnScroll(0.1);
  const [refEducation, isVisibleEducation] = useAnimateOnScroll(0.1);

  return (
    // About Section: Details about your profile and education
    <section id="about" className="py-20 px-6 bg-gray-800 text-gray-200" ref={refSection}>
      <div className="container mx-auto max-w-5xl">
        <h2 className={`text-4xl font-bold text-center text-teal-400 mb-12 ${isVisibleSection ? 'animate-fade-in' : ''}`}>
          About Me
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Profile Summary */}
          <div className={`space-y-6 ${isVisibleSummary ? 'animate-slide-in-left' : ''}`} ref={refSummary}>
            <p className="text-lg leading-relaxed">
              Highly motivated individual with a strong foundation in Artificial Intelligence, Machine Learning, and Web Development. Seeking to apply and expand technical expertise in dynamic environments.
            </p>
            <p className="text-lg leading-relaxed">
              Proficient in Python and Java; experienced in building intelligent systems and web applications. Committed to continuous learning and growth. Eager to contribute innovative solutions and enhance user experiences through effective problem-solving.
            </p>
            {/* Resume Download Button */}
            {/* IMPORTANT: Ensure 'SAI RESUME 1.pdf' is in your public folder */}
            <a
              href="/SAI RESUME 1.pdf"
              download="SAI_VIGNESHWARAN_Resume.pdf"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
            >
              Download Resume <i className="fas fa-download ml-2"></i>
            </a>
          </div>
          {/* Education Details */}
          <div className={`bg-gray-700 p-8 rounded-xl shadow-lg ${isVisibleEducation ? 'animate-slide-in-right' : ''}`} ref={refEducation}>
            <h3 className="text-2xl font-semibold text-teal-300 mb-6">Education</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-graduation-cap text-teal-400 text-xl mr-4 mt-1"></i>
                <div>
                  <p className="font-semibold text-xl">B.E-CSE</p>
                  <p className="text-gray-300">Kongunadu College of Engineering and Technology, Trichy</p>
                  <p className="text-sm text-gray-400">2022-2026 | CGPA: 7.22</p>
                </div>
              </li>
              <li className="flex items-start">
                <i className="fas fa-school text-teal-400 text-xl mr-4 mt-1"></i>
                <div>
                  <p className="font-semibold text-xl">HSC - 78.3%</p>
                  <p className="text-gray-300">Mount Zion Matric Hr. Sec. School</p>
                  <p className="text-sm text-gray-400">2022</p>
                </div>
              </li>
              <li className="flex items-start">
                <i className="fas fa-school text-teal-400 text-xl mr-4 mt-1"></i>
                <div>
                  <p className="font-semibold text-xl">SSLC - 69.2%</p>
                  <p className="text-gray-300">Mount Zion Matric Hr. Sec. School</p>
                  <p className="text-sm text-gray-400">2020</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
