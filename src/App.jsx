import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import './index.css';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

import QuizGame from './components/QuizGame';
import RockPaperScissorsGame from './components/RockPaperScissorsGame'; // Keep this one
import TicTacToeGame from './components/TicTacToeGame'; // Tic-Tac-Toe Game
import TechEmojiMemoryGame from './components/TechEmojiMemoryGame'; // NEW: Import Tech Emoji Memory Game

function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameSelect = (gameType) => {
    setSelectedGame(gameType);
  };

  const handleBackToSelection = () => {
    setSelectedGame(null);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />

        <section id="games-section" className="py-20 bg-gray-800 text-white flex flex-col items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12">Interactive Challenges</h2>

            {selectedGame === null && (
              <div className="flex flex-col md:flex-row flex-wrap gap-6 justify-center"> {/* Added flex-wrap for better layout on smaller screens */}
                <button
                  onClick={() => handleGameSelect('quiz')}
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-full text-xl transition duration-300 shadow-lg"
                >
                  Start Quiz Game
                </button>
                <button
                  onClick={() => handleGameSelect('rockPaperScissors')}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full text-xl transition duration-300 shadow-lg"
                >
                  Start Rock, Paper, Scissors!
                </button>
                <button
                  onClick={() => handleGameSelect('ticTacToe')}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-xl transition duration-300 shadow-lg"
                >
                  Start Tic-Tac-Toe
                </button>
                {/* NEW: Button for Tech Emoji Memory Game */}
                <button
                  onClick={() => handleGameSelect('techEmojiMemory')}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl transition duration-300 shadow-lg"
                >
                  Tech Emoji Memory Game
                </button>
              </div>
            )}

            {selectedGame === 'quiz' && (
              <div className="flex flex-col items-center">
                <button
                  onClick={handleBackToSelection}
                  className="mb-8 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-full transition duration-300"
                >
                  &larr; Back to Game Selection
                </button>
                <QuizGame />
              </div>
            )}

            {selectedGame === 'rockPaperScissors' && (
              <div className="flex flex-col items-center">
                <button
                  onClick={handleBackToSelection}
                  className="mb-8 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-full transition duration-300"
                >
                  &larr; Back to Game Selection
                </button>
                <RockPaperScissorsGame />
              </div>
            )}

            {/* Render TicTacToeGame when selected */}
            {selectedGame === 'ticTacToe' && (
              <div className="flex flex-col items-center">
                <button
                  onClick={handleBackToSelection}
                  className="mb-8 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-full transition duration-300"
                >
                  &larr; Back to Game Selection
                </button>
                <TicTacToeGame />
              </div>
            )}

            {/* NEW: Render TechEmojiMemoryGame when selected */}
            {selectedGame === 'techEmojiMemory' && (
              <div className="flex flex-col items-center w-full">
                <button
                  onClick={handleBackToSelection}
                  className="mb-8 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-full transition duration-300"
                >
                  &larr; Back to Game Selection
                </button>
                <TechEmojiMemoryGame />
              </div>
            )}
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;