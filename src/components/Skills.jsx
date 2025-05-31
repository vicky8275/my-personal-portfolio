import React from 'react';
import useAnimateOnScroll from '../hooks/useAnimateOnScroll'; // Import the custom hook

const Skills = () => {
  // Apply the animation hook to the section for overall animation
  const [refSection, isVisibleSection] = useAnimateOnScroll(0.1);

  return (
    // Skills Section: Showcasing your technical and soft skills
    <section id="skills" className="py-20 px-6 bg-gray-900 text-gray-100" ref={refSection}>
      <div className="container mx-auto max-w-5xl">
        <h2 className={`text-4xl font-bold text-center text-teal-400 mb-12 ${isVisibleSection ? 'animate-fade-in' : ''}`}>
          My Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Languages Skill Card */}
          <div className={`bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 group ${isVisibleSection ? 'animate-slide-in-bottom delay-100' : ''}`}>
            <h3 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center"><i className="fas fa-code mr-3"></i>Languages</h3>
            <ul className="space-y-2 text-lg">
              <li><i className="fas fa-check-circle text-green-400 mr-2"></i>Python</li>
              <li><i className="fas fa-check-circle text-green-400 mr-2"></i>Java</li>
            </ul>
          </div>
          {/* Web Development Skill Card */}
          <div className={`bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 group ${isVisibleSection ? 'animate-slide-in-bottom delay-200' : ''}`}>
            <h3 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center"><i className="fas fa-globe mr-3"></i>Web Development</h3>
            <ul className="space-y-2 text-lg">
              <li><i className="fas fa-check-circle text-green-400 mr-2"></i>HTML</li>
              <li><i className="fas fa-check-circle text-green-400 mr-2"></i>CSS</li>
              <li><i className="fas fa-check-circle text-green-400 mr-2"></i>JavaScript</li>
            </ul>
          </div>
          {/* Soft Skills Card */}
          <div className={`bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 group ${isVisibleSection ? 'animate-slide-in-bottom delay-300' : ''}`}>
            <h3 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center"><i className="fas fa-users mr-3"></i>Soft Skills</h3>
            <ul className="space-y-2 text-lg">
              <li><i className="fas fa-check-circle text-green-400 mr-2"></i>Communication</li>
              <li><i className="fas fa-check-circle text-green-400 mr-2"></i>Problem Solving</li>
              <li><i className="fas fa-check-circle text-green-400 mr-2"></i>Error Debugging</li>
            </ul>
          </div>
          {/* Courses Card */}
          <div className={`bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 group ${isVisibleSection ? 'animate-slide-in-bottom delay-400' : ''}`}>
            <h3 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center"><i className="fas fa-book-open mr-3"></i>Courses</h3>
            <ul className="space-y-2 text-lg">
              <li><i className="fas fa-certificate text-yellow-400 mr-2"></i>AWS Certified Cloud Practitioner</li>
              <li><i className="fas fa-certificate text-yellow-400 mr-2"></i>JavaScript Under The Hood</li>
            </ul>
          </div>
          {/* Hobbies Card */}
          <div className={`bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 group ${isVisibleSection ? 'animate-slide-in-bottom delay-500' : ''}`}>
            <h3 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center"><i className="fas fa-heart mr-3"></i>Hobbies</h3>
            <ul className="space-y-2 text-lg">
              <li><i className="fas fa-laptop-code text-blue-400 mr-2"></i>Coding</li>
              <li><i className="fas fa-volleyball-ball text-blue-400 mr-2"></i>Badminton</li>
              <li><i className="fas fa-robot text-blue-400 mr-2"></i>Surfing AI Tools</li>
              <li><i className="fas fa-gamepad text-blue-400 mr-2"></i>Gaming</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
