// src/components/MemoryGame.jsx
import React, { useState, useEffect } from 'react';

// Define the card content using emojis
const initialCardContent = [
  '🧠', // Machine Learning / AI
  '🐍', // Python Language
  '☕', // Java Language
  '💻', // Web Development / Code
  '❤️', // Heart Disease Prediction
  '📉', // Customer Churn / Retention
  '🎓', // EduMate AI / Education
  '☁️', // Cloud / AWS
  // Duplicates for pairs
  '🧠',
  '🐍',
  '☕',
  '💻',
  '❤️',
  '📉',
  '🎓',
  '☁️',
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

const MemoryGame = ({ onGameEnd }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [awaitingEndOfTurn, setAwaitingEndOfTurn] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const initializeGame = () => {
    const shuffledCards = shuffleArray(
      initialCardContent.map((content, index) => ({
        id: index,
        content,
        isFlipped: false,
        isMatched: false,
      })
    ));

    const cardsWithPairIds = {};
    let pairCounter = 0;
    const finalCards = shuffledCards.map(card => {
      if (!cardsWithPairIds[card.content]) {
        cardsWithPairIds[card.content] = pairCounter++;
      }
      return { ...card, pairId: cardsWithPairIds[card.content] };
    });

    setCards(finalCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setAwaitingEndOfTurn(false);
    setGameStarted(true);
    setMoves(0);
    setGameWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (clickedCardId) => {
    if (!gameStarted || awaitingEndOfTurn || flippedCards.includes(clickedCardId) || cards.find(card => card.id === clickedCardId)?.isMatched) {
      return;
    }

    setMoves(prevMoves => prevMoves + 1);

    const newFlippedCards = [...flippedCards, clickedCardId];
    setFlippedCards(newFlippedCards);

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
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (gameStarted && matchedCards.length > 0 && matchedCards.length === initialCardContent.length / 2) {
      setGameWon(true);
      setGameStarted(false);
      if (onGameEnd) {
          onGameEnd(moves);
      }
    }
  }, [matchedCards, gameStarted, initialCardContent.length, moves, onGameEnd]);


  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg shadow-xl text-white">
      <h2 className="text-3xl font-bold mb-4">Memory Match</h2>
      <p className="text-xl mb-4">Moves: {moves}</p>

      {gameWon && (
        <div className="text-center mb-4">
          <h3 className="text-4xl text-teal-400 font-extrabold mb-2 animate-bounce">You Won!</h3>
          <p className="text-2xl">It took you {moves} moves!</p>
          <button
            onClick={initializeGame}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md"
          >
            Play Again
          </button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`
              relative w-20 h-20 md:w-24 md:h-24 bg-gray-700 rounded-lg flex items-center justify-center
              transition-transform duration-300 transform perspective-1000 cursor-pointer
              ${card.isFlipped ? 'rotate-y-180' : ''}
              ${card.isMatched ? 'opacity-50 pointer-events-none' : 'hover:scale-105'}
            `}
            onClick={() => handleCardClick(card.id)}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Front of the card (content - now emoji text) */}
            <div className={`
              absolute inset-0 bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden
              transform rotate-y-180 backface-hidden ${card.isFlipped ? 'opacity-100' : 'opacity-0'}
            `}>
              {/* Display emoji directly */}
              <span className="text-5xl md:text-6xl select-none">
                {card.content}
              </span>
            </div>
            {/* Back of the card (question mark icon) */}
            <div className={`
              absolute inset-0 bg-teal-500 rounded-lg flex items-center justify-center text-4xl
              transform ${card.isFlipped ? 'rotate-y-0' : 'rotate-y-0'} backface-hidden
            `}>
              {!card.isFlipped && <i className="fas fa-question text-gray-900"></i>}
            </div>
          </div>
        ))}
      </div>
      {!gameStarted && !gameWon && (
        <button
          onClick={initializeGame}
          className="mt-6 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md"
        >
          Start Game
        </button>
      )}
    </div>
  );
};

export default MemoryGame;