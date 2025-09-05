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

// Helper function for computer move
const getComputerMove = (board) => {
  // Check if computer can win
  const winningMove = findWinningMove(board, 'O');
  if (winningMove !== -1) return winningMove;
  
  // Block player from winning
  const blockingMove = findWinningMove(board, 'X');
  if (blockingMove !== -1) return blockingMove;
  
  // Try to take center
  if (board[4] === null) return 4;
  
  // Take any corner
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => board[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }
  
  // Take any side
  const sides = [1, 3, 5, 7];
  const availableSides = sides.filter(i => board[i] === null);
  if (availableSides.length > 0) {
    return availableSides[Math.floor(Math.random() * availableSides.length)];
  }
  
  // Take any available spot
  const availableSpots = board.map((square, index) => square === null ? index : -1).filter(i => i !== -1);
  if (availableSpots.length > 0) {
    return availableSpots[Math.floor(Math.random() * availableSpots.length)];
  }
  
  return -1; // No move available
};

// Helper function to find winning move
const findWinningMove = (board, player) => {
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
    // Check if we can win in this line
    if (board[a] === player && board[b] === player && board[c] === null) return c;
    if (board[a] === player && board[c] === player && board[b] === null) return b;
    if (board[b] === player && board[c] === player && board[a] === null) return a;
  }
  
  return -1; // No winning move found
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
  const [singlePlayerMode, setSinglePlayerMode] = useState(true); // Default to single player mode
  const [difficulty, setDifficulty] = useState('medium'); // 'easy', 'medium', 'hard'
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  useEffect(() => {
    const currentWinner = calculateWinner(board);
    if (currentWinner) {
      setWinner(currentWinner);
      setStatus(`Winner: ${currentWinner}`);
    } else if (board.every(square => square !== null)) {
      setStatus('Draw!');
    } else {
      setStatus(`Next player: ${xIsNext ? 'X' : 'O'}`);
      
      // Computer's turn in single player mode
      if (singlePlayerMode && !xIsNext && !currentWinner) {
        setIsComputerThinking(true);
        // Add a small delay to make it feel like the computer is "thinking"
        setTimeout(() => {
          makeComputerMove();
          setIsComputerThinking(false);
        }, 500);
      }
    }
  }, [board, xIsNext]);

  const makeComputerMove = () => {
    if (winner || board.every(square => square !== null)) {
      return; // Game over, no move needed
    }
    
    const computerMove = getComputerMove(board);
    
    if (computerMove !== -1) {
      const newBoard = board.slice();
      newBoard[computerMove] = 'O';
      setBoard(newBoard);
      setXIsNext(true);
    }
  };

  const handleClick = (i) => {
    if (winner || board[i] || (singlePlayerMode && !xIsNext && isComputerThinking)) {
      return; // If game is over, square is filled, or it's computer's turn - do nothing
    }

    const newBoard = board.slice(); // Create a copy of the board
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => (
    <Square 
      value={board[i]} 
      onClick={() => handleClick(i)}
    />
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setStatus('Next player: X');
  };
  
  const toggleGameMode = () => {
    setSinglePlayerMode(!singlePlayerMode);
    resetGame();
  };

  return (
    <div className="bg-gray-700 p-8 rounded-lg shadow-xl max-w-lg w-full text-center flex flex-col items-center">
      <h3 className="text-3xl font-bold mb-4 text-teal-400">Tic-Tac-Toe</h3>
      
      <div className="flex justify-center items-center mb-4 space-x-2">
        <span className="text-white">Mode:</span>
        <button
          onClick={toggleGameMode}
          className={`px-3 py-1 rounded-full text-sm font-medium transition duration-300 ${
            singlePlayerMode 
              ? 'bg-teal-500 text-white' 
              : 'bg-gray-500 text-gray-200 hover:bg-gray-400'
          }`}
        >
          Single Player
        </button>
        <button
          onClick={toggleGameMode}
          className={`px-3 py-1 rounded-full text-sm font-medium transition duration-300 ${
            !singlePlayerMode 
              ? 'bg-teal-500 text-white' 
              : 'bg-gray-500 text-gray-200 hover:bg-gray-400'
          }`}
        >
          Two Players
        </button>
      </div>
      
      <div className="text-xl mb-4 font-semibold">
        {status}
        {singlePlayerMode && isComputerThinking && !winner && <div className="text-yellow-400 mt-1">Computer is thinking...</div>}
      </div>

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
      
      <div className="flex space-x-4">
        <button
          onClick={resetGame}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 shadow-md"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToeGame;