// src/components/RockPaperScissorsGame.jsx
import React, { useState } from 'react';

const choices = [
  { name: 'rock', emoji: '✊' },
  { name: 'paper', emoji: '✋' },
  { name: 'scissors', emoji: '✌️' },
];

const RockPaperScissorsGame = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const determineWinner = (player, computer) => {
    if (player.name === computer.name) return 'draw';
    if (
      (player.name === 'rock' && computer.name === 'scissors') ||
      (player.name === 'paper' && computer.name === 'rock') ||
      (player.name === 'scissors' && computer.name === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const playGame = (choiceName) => {
    const player = choices.find(c => c.name === choiceName);
    const computer = getComputerChoice();

    setPlayerChoice(player);
    setComputerChoice(computer);

    const winner = determineWinner(player, computer);
    if (winner === 'win') {
      setResult('You Win!');
      setScore(prev => ({ ...prev, wins: prev.wins + 1 }));
    } else if (winner === 'lose') {
      setResult('You Lose!');
      setScore(prev => ({ ...prev, losses: prev.losses + 1 }));
    } else {
      setResult('It\'s a Draw!');
      setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setScore({ wins: 0, losses: 0, draws: 0 });
  };

  return (
    <div className="bg-gray-700 p-8 rounded-lg shadow-xl max-w-lg w-full text-center flex flex-col items-center">
      <h3 className="text-3xl font-bold mb-6 text-teal-400">Rock, Paper, Scissors!</h3>

      <div className="flex justify-center space-x-6 mb-8 text-5xl">
        {choices.map((choice) => (
          <button
            key={choice.name}
            onClick={() => playGame(choice.name)}
            className="p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label={choice.name}
          >
            {choice.emoji}
          </button>
        ))}
      </div>

      {playerChoice && computerChoice && (
        <div className="text-xl mb-6">
          <p>You chose: {playerChoice.emoji} ({playerChoice.name})</p>
          <p>Computer chose: {computerChoice.emoji} ({computerChoice.name})</p>
          <p className={`font-bold mt-2 ${result.includes('Win') ? 'text-green-400' : result.includes('Lose') ? 'text-red-400' : 'text-blue-400'}`}>
            {result}
          </p>
        </div>
      )}

      <div className="text-lg mb-6">
        <p>Wins: <span className="font-bold text-green-400">{score.wins}</span></p>
        <p>Losses: <span className="font-bold text-red-400">{score.losses}</span></p>
        <p>Draws: <span className="font-bold text-blue-400">{score.draws}</span></p>
      </div>

      <button
        onClick={resetGame}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 shadow-md"
      >
        Reset Game
      </button>
    </div>
  );
};

export default RockPaperScissorsGame;