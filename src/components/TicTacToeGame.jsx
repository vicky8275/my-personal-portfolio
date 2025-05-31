// src/components/TicTacToeGame.jsx
import React, { useState, useEffect } from 'react';

// Helper function to check for a winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Returns 'X' or 'O'
    }
  }
  return null; // No winner
};

// Square component for Tic-Tac-Toe board
const Square = ({ value, onClick }) => (
  <button
    className="w-20 h-20 bg-gray-600 border border-gray-500 text-5xl font-bold flex items-center justify-center
               hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-150 ease-in-out"
    onClick={onClick}
  >
    {value}
  </button>
);

const TicTacToeGame = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); // true for X, false for O
  const [status, setStatus] = useState('');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const currentWinner = calculateWinner(board);
    if (currentWinner) {
      setWinner(currentWinner);
      setStatus(`Winner: ${currentWinner}`);
    } else if (board.every(square => square !== null)) {
      setStatus('Draw!');
    } else {
      setStatus(`Next player: ${xIsNext ? 'X' : 'O'}`);
    }
  }, [board, xIsNext]);

  const handleClick = (i) => {
    if (winner || board[i]) {
      return; // If game is over or square is already filled, do nothing
    }

    const newBoard = board.slice(); // Create a copy of the board
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => (
    <Square value={board[i]} onClick={() => handleClick(i)} />
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setStatus('Next player: X');
  };

  return (
    <div className="bg-gray-700 p-8 rounded-lg shadow-xl max-w-lg w-full text-center flex flex-col items-center">
      <h3 className="text-3xl font-bold mb-6 text-teal-400">Tic-Tac-Toe</h3>
      
      <div className="text-xl mb-4 font-semibold">{status}</div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
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

export default TicTacToeGame;