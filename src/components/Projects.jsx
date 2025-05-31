import React from 'react';
import useAnimateOnScroll from '../hooks/useAnimateOnScroll'; // Import the custom hook

const Projects = () => {
  // Apply the animation hook to the section for overall animation
  const [refSection, isVisibleSection] = useAnimateOnScroll(0.1);

  return (
    // Projects Section: Highlighting your key projects
    <section id="projects" className="py-20 px-6 bg-gray-800 text-gray-200" ref={refSection}>
      <div className="container mx-auto max-w-6xl">
        <h2 className={`text-4xl font-bold text-center text-teal-400 mb-12 ${isVisibleSection ? 'animate-fade-in' : ''}`}>
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* EduMate AI Project Card */}
          <div className={`bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 group ${isVisibleSection ? 'animate-slide-in-left' : ''}`}>
            {/* Project Image: Path relative to the public folder */}
            <img src="/images/edumate_ai.jpg" alt="EduMate AI Project" className="w-full h-64 object-cover object-top transition-transform duration-300 group-hover:scale-110" />
            <div className="p-8">
              <h3 className="text-3xl font-bold text-teal-300 mb-4">EduMate AI: Academic Assistant</h3>
              <p className="text-lg leading-relaxed mb-6">
                A Streamlit-based academic assistant utilizing Large Language Models (LLM) and Retrieval-Augmented Generation (RAG) for enhanced productivity and support.
              </p>
              {/* Technologies Used Tags */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-teal-600 text-white text-sm px-3 py-1 rounded-full">Streamlit</span>
                <span className="bg-teal-600 text-white text-sm px-3 py-1 rounded-full">LLM</span>
                <span className="bg-teal-600 text-white text-sm px-3 py-1 rounded-full">RAG</span>
                <span className="bg-teal-600 text-white text-sm px-3 py-1 rounded-full">Python</span>
              </div>
              {/* Link to GitHub Repository for the project */}
              <a href="https://github.com/vicky8275/EduMate-AI" target="_blank" rel="noopener noreferrer" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
                View on GitHub <i className="fab fa-github ml-2"></i>
              </a>
            </div>
          </div>

          {/* Customer Churn Prediction Project Card */}
          <div className={`bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 group ${isVisibleSection ? 'animate-slide-in-right' : ''}`}>
            {/* Project Image: Path relative to the public folder */}
            <img src="/images/customer_churn_1.jpg" alt="Customer Churn Prediction Project" className="w-full h-64 object-cover object-top transition-transform duration-300 group-hover:scale-110" />
            <div className="p-8">
              <h3 className="text-3xl font-bold text-teal-300 mb-4">Customer Churn Prediction Using ML</h3>
              <p className="text-lg leading-relaxed mb-6">
                Applied SMOTE (Synthetic Minority Over-sampling Technique) and various Machine Learning models to effectively reduce telecom customer churn.
              </p>
              {/* Technologies Used Tags */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-teal-600 text-white text-sm px-3 py-1 rounded-full">Machine Learning</span>
                <span className="bg-teal-600 text-white text-sm px-3 py-1 rounded-full">SMOTE</span>
                <span className="bg-teal-600 text-white text-sm px-3 py-1 rounded-full">Python</span>
                <span className="bg-teal-600 text-white text-sm px-3 py-1 rounded-full">Data Science</span>
              </div>
              {/* Link to your general GitHub profile if no specific repo for this project */}
              <a href="https://github.com/vicky8275/retention-ranger" target="_blank" rel="noopener noreferrer" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
                View on GitHub <i className="fab fa-github ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
