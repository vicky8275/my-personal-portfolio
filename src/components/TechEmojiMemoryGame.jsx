// src/components/TechEmojiMemoryGame.jsx
import React, { useState, useEffect } from 'react';

// Define the card content using tech-themed emojis with descriptions
const techEmojiCards = [
  { emoji: '🐍', description: 'Python' },
  { emoji: '☕', description: 'Java' },
  { emoji: '🧠', description: 'Machine Learning' },
  { emoji: '☁️', description: 'AWS Cloud' },
  { emoji: '💻', description: 'Web Dev' },
  { emoji: '🎓', description: 'EduMate AI' },
  { emoji: '📊', description: 'Data Analysis' },
  { emoji: '📉', description: 'Customer Churn' },
  { emoji: '🔍', description: 'Research' },
  { emoji: '🔧', description: 'Debugging' },
  { emoji: '🔗', description: 'REST API' },
  { emoji: '🤖', description: 'LLM' },
];

// Helper function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

const TechEmojiMemoryGame = () => {
  // Select 8 random emojis from the techEmojiCards
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [awaitingEndOfTurn, setAwaitingEndOfTurn] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [difficulty, setDifficulty] = useState('medium'); // 'easy', 'medium', 'hard'
  const [showInfo, setShowInfo] = useState(null);

  // Get difficulty settings
  const getDifficultySettings = () => {
    const settings = {
      easy: { pairs: 6, flipDelay: 1200 },
      medium: { pairs: 8, flipDelay: 1000 },
      hard: { pairs: 12, flipDelay: 800 }
    };
    return settings[difficulty] || settings.medium;
  };

  const initializeGame = () => {
    const settings = getDifficultySettings();
    
    // Shuffle and pick a subset of emojis based on difficulty
    const shuffledEmojis = shuffleArray([...techEmojiCards]);
    const gameEmojis = shuffledEmojis.slice(0, settings.pairs);
    setSelectedEmojis(gameEmojis);
    
    // Create pairs of cards
    const cardPairs = gameEmojis.flatMap(item => [
      { ...item, id: Math.random().toString() },
      { ...item, id: Math.random().toString() }
    ]);

    // Shuffle the cards
    const shuffledCards = shuffleArray(cardPairs.map((card, index) => ({
      id: card.id,
      emoji: card.emoji,
      description: card.description,
      isFlipped: false,
      isMatched: false,
      pairId: card.description // Using description as the pair identifier
    })));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setAwaitingEndOfTurn(false);
    setGameStarted(true);
    setMoves(0);
    setGameWon(false);
    setShowInfo(null);
  };

  useEffect(() => {
    // Initialize game when component mounts
    initializeGame();
  }, [difficulty]);

  const handleCardClick = (clickedCardId) => {
    if (!gameStarted || awaitingEndOfTurn || flippedCards.includes(clickedCardId) || cards.find(card => card.id === clickedCardId)?.isMatched) {
      return;
    }

    setMoves(prevMoves => prevMoves + 1);

    const newFlippedCards = [...flippedCards, clickedCardId];
    setFlippedCards(newFlippedCards);

    // Flip the clicked card
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === clickedCardId ? { ...card, isFlipped: true } : card
      )
    );

    if (newFlippedCards.length === 2) {
      setAwaitingEndOfTurn(true);

      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);

      if (firstCard.pairId === secondCard.pairId) {
        // Match found
        setMatchedCards(prevMatched => [...prevMatched, firstCard.pairId]);
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, isMatched: true, isFlipped: true }
              : card
          )
        );
        setFlippedCards([]);
        setAwaitingEndOfTurn(false);
      } else {
        // No match
        const settings = getDifficultySettings();
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCardId || card.id === secondCardId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setAwaitingEndOfTurn(false);
        }, settings.flipDelay);
      }
    }
  };

  const handleInfoClick = (cardId) => {
    if (showInfo === cardId) {
      setShowInfo(null);
    } else {
      setShowInfo(cardId);
    }
  };

  useEffect(() => {
    const settings = getDifficultySettings();
    if (gameStarted && matchedCards.length > 0 && matchedCards.length === settings.pairs) {
      setGameWon(true);
      setGameStarted(false);
    }
  }, [matchedCards, gameStarted, difficulty]);

  const handleChangeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
    // Restart game with new difficulty
    setGameWon(false);
    setGameStarted(false);
    setTimeout(() => {
      initializeGame();
    }, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-xl text-white w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-3 text-teal-400">Tech Emoji Memory Match</h2>
      
      {/* Difficulty selector */}
      <div className="flex space-x-4 mb-4">
        <button 
          onClick={() => handleChangeDifficulty('easy')}
          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
            difficulty === 'easy' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
          }`}>
          Easy
        </button>
        <button 
          onClick={() => handleChangeDifficulty('medium')}
          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
            difficulty === 'medium' 
              ? 'bg-yellow-500 text-gray-900' 
              : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
          }`}>
          Medium
        </button>
        <button 
          onClick={() => handleChangeDifficulty('hard')}
          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
            difficulty === 'hard' 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
          }`}>
          Hard
        </button>
      </div>
      
      <p className="text-xl mb-4">Moves: {moves}</p>

      {gameWon && (
        <div className="text-center mb-6">
          <h3 className="text-4xl text-teal-400 font-extrabold mb-2 animate-bounce">
            You Won!
          </h3>
          <p className="text-2xl">Completed in {moves} moves!</p>
          <button
            onClick={initializeGame}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md"
          >
            Play Again
          </button>
        </div>
      )}

      {/* Game grid - responsive sizing based on difficulty */}
      <div className={`grid gap-3 mb-6 w-full ${
        difficulty === 'easy' ? 'grid-cols-3 md:grid-cols-4' : 
        difficulty === 'medium' ? 'grid-cols-3 md:grid-cols-4' : 
        'grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
      }`}>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`
              relative w-full aspect-square bg-gray-700 rounded-lg flex items-center justify-center
              transition-all duration-300 transform ${card.isMatched ? 'opacity-70' : 'hover:shadow-lg hover:shadow-teal-900/50'}
              ${card.isFlipped ? '' : 'cursor-pointer hover:scale-105'}
            `}
            onClick={() => !card.isMatched && !card.isFlipped ? handleCardClick(card.id) : null}
          >
            {/* Front of card (emoji + tech name) */}
            <div className={`
              absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg 
              flex flex-col items-center justify-center p-2
              transform transition-opacity duration-300 ${card.isFlipped ? 'opacity-100' : 'opacity-0'}
            `}>
              <span className="text-4xl md:text-5xl mb-1">{card.emoji}</span>
              <span className="text-xs md:text-sm text-center font-medium text-teal-300">
                {card.description}
              </span>
              {card.isMatched && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInfoClick(card.id);
                  }}
                  className="absolute bottom-1 right-1 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center text-xs"
                >
                  ?
                </button>
              )}
            </div>
            
            {/* Back of card */}
            <div className={`
              absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg 
              flex items-center justify-center
              transform transition-opacity duration-300 ${card.isFlipped ? 'opacity-0' : 'opacity-100'}
            `}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {!gameStarted && !gameWon && (
        <button
          onClick={initializeGame}
          className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md"
        >
          Start Game
        </button>
      )}

      {/* Tech info modal */}
      {showInfo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-teal-400">
                {cards.find(card => card.id === showInfo)?.emoji} {cards.find(card => card.id === showInfo)?.description}
              </h3>
              <button 
                onClick={() => setShowInfo(null)}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="text-gray-300">
              {getTechDescription(cards.find(card => card.id === showInfo)?.description)}
            </div>
            <button
              onClick={() => setShowInfo(null)}
              className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get tech descriptions
const getTechDescription = (tech) => {
  const descriptions = {
    'Python': 'A versatile programming language commonly used for web development, data science, ML and AI applications. Core language in your portfolio.',
    'Java': 'Object-oriented programming language used for enterprise applications and Android development.',
    'Machine Learning': 'Creating algorithms and statistical models that enable computers to learn from data and make predictions.',
    'AWS Cloud': 'Amazon Web Services - a cloud computing platform that provides on-demand computing resources.',
    'Web Dev': 'Building websites and web applications using technologies like HTML, CSS, and JavaScript.',
    'EduMate AI': 'Your Streamlit-based academic assistant using LLM and RAG technologies for enhanced educational support.',
    'Data Analysis': 'Process of inspecting, cleansing, transforming and modeling data to discover useful information.',
    'Customer Churn': 'Your project predicting customer attrition using SMOTE and ML models to help businesses retain customers.',
    'Research': 'Systematic investigation to establish facts, solve problems or develop new knowledge.',
    'Debugging': 'Process of finding and resolving defects or problems in code.',
    'REST API': 'Representational State Transfer - architectural style for designing networked applications.',
    'LLM': 'Large Language Models - advanced AI models that can understand and generate human-like text.'
  };
  
  return descriptions[tech] || 'Technology related to your skills and projects.';
};

export default TechEmojiMemoryGame;
