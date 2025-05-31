// src/components/QuizGame.jsx
import React, { useState, useEffect, useCallback } from 'react';

// Database of 25 questions
const allQuizQuestions = [
  {
    question: "What is the primary goal of Artificial Intelligence (AI)?",
    options: ["To create highly interactive user interfaces", "To enable machines to perform tasks typically requiring human intelligence", "To optimize database queries", "To manage network traffic efficiently"],
    answer: "To enable machines to perform tasks typically requiring human intelligence"
  },
  {
    question: "Which type of Machine Learning involves training a model on labeled data?",
    options: ["Unsupervised Learning", "Reinforcement Learning", "Supervised Learning", "Semi-supervised Learning"],
    answer: "Supervised Learning"
  },
  {
    question: "What is overfitting in Machine Learning?",
    options: ["When a model performs well on training data but poorly on new data", "When a model is too simple to capture the underlying pattern of the data", "When the training data is too small for the model", "When the model converges too slowly during training"],
    answer: "When a model performs well on training data but poorly on new data"
  },
  {
    question: "Which of these is a popular Python library for Machine Learning?",
    options: ["Django", "Flask", "NumPy", "TensorFlow"],
    answer: "TensorFlow"
  },
  {
    question: "What is a 'neural network' fundamentally inspired by?",
    options: ["The human digestive system", "The human brain structure", "The internet's architecture", "A tree's branching structure"],
    answer: "The human brain structure"
  },
  {
    question: "What is the purpose of a 'loss function' in Machine Learning?",
    options: ["To accelerate model training", "To measure the inaccuracy of predictions", "To prevent overfitting", "To select optimal features"],
    answer: "To measure the inaccuracy of predictions"
  },
  {
    question: "Which of the following is an example of Unsupervised Learning?",
    options: ["Regression", "Classification", "Clustering", "Reinforcement Learning"],
    answer: "Clustering"
  },
  {
    question: "What does 'NLP' stand for in the context of AI?",
    options: ["Natural Language Processing", "Neural Logic Programming", "Network Layer Protocol", "New Linguistic Paradigm"],
    answer: "Natural Language Processing"
  },
  {
    question: "What is the main advantage of using Python for data science?",
    options: ["Its strict syntax rules", "Its high performance for CPU-bound tasks", "Its vast ecosystem of libraries and frameworks", "Its compiled nature"],
    answer: "Its vast ecosystem of libraries and frameworks"
  },
  {
    question: "In Machine Learning, what is a 'feature'?",
    options: ["An output variable", "A characteristic or attribute of the data", "A type of algorithm", "A training parameter"],
    answer: "A characteristic or attribute of the data"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High-level Text Management Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which CSS property is used to change the text color of an element?",
    options: ["background-color", "font-color", "text-color", "color"],
    answer: "color"
  },
  {
    question: "What is JavaScript primarily used for in web development?",
    options: ["Structuring content", "Styling web pages", "Adding interactivity and dynamic behavior", "Managing databases"],
    answer: "Adding interactivity and dynamic behavior"
  },
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Model", "Dynamic Order Module", "Design Object Markup"],
    answer: "Document Object Model"
  },
  {
    question: "In React, what is the 'useState' hook used for?",
    options: ["Performing side effects", "Managing component lifecycle", "Adding state to functional components", "Handling routing"],
    answer: "Adding state to functional components"
  },
  {
    question: "What is JSX in React?",
    options: ["A JavaScript library for animations", "A syntax extension for JavaScript that looks like HTML", "A type of CSS preprocessor", "A state management pattern"],
    answer: "A syntax extension for JavaScript that looks like HTML"
  },
  {
    question: "How do you include an external JavaScript file in an HTML document?",
    options: ["<script href='script.js'></script>", "<js src='script.js'></js>", "<script src='script.js'></script>", "<link rel='javascript' href='script.js'>"],
    answer: "<script src='script.js'></script>"
  },
  {
    question: "What is NPM primarily used for in web development?",
    options: ["Creating new React apps", "Running a local server", "Managing JavaScript packages and dependencies", "Deploying web applications"],
    answer: "Managing JavaScript packages and dependencies"
  },
  {
    question: "What is a 'component' in React?",
    options: ["A standalone HTML file", "A reusable, independent piece of UI", "A global state management tool", "A database connection"],
    answer: "A reusable, independent piece of UI"
  },
  {
    question: "What does 'CSS' stand for?",
    options: ["Cascading Style Sheets", "Creative Style Solutions", "Computer Style Syntax", "Custom Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What is AWS EC2 primarily used for?",
    options: ["Object storage", "Serverless functions", "Virtual servers in the cloud", "Content delivery network"],
    answer: "Virtual servers in the cloud"
  },
  {
    question: "Which AWS service is commonly used for storing large amounts of static data like images and videos?",
    options: ["AWS Lambda", "Amazon S3", "Amazon RDS", "Amazon DynamoDB"],
    answer: "Amazon S3"
  },
  {
    question: "What is AWS Lambda?",
    options: ["A virtual machine service", "A container orchestration service", "A serverless compute service", "A database service"],
    answer: "A serverless compute service"
  },
  {
    question: "Which keyword is used to declare a constant variable in JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: "const"
  },
  {
    question: "What is 'responsive design' in web development?",
    options: ["Designing websites only for desktop computers", "Designing websites that respond quickly to user input", "Designing websites that adapt to different screen sizes and devices", "Designing websites using only CSS frameworks"],
    answer: "Designing websites that adapt to different screen sizes and devices"
  }
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

const QuizGame = () => {
  const [quizQuestions, setQuizQuestions] = useState([]); // Questions for the current game
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  // Use useCallback to memoize initializeGame to prevent unnecessary re-creations
  const initializeGame = useCallback(() => {
    // Shuffle all questions and pick the first 5
    const shuffledAllQuestions = shuffleArray([...allQuizQuestions]);
    setQuizQuestions(shuffledAllQuestions.slice(0, 5)); // Select 5 random questions

    setCurrentQuestionIndex(0);
    setScore(0);
    setShowFeedback(false);
    setIsCorrect(false);
    setSelectedOption(null);
    setQuizFinished(false);
  }, []); // Dependencies are empty because allQuizQuestions is constant

  useEffect(() => {
    initializeGame();
  }, [initializeGame]); // Call initializeGame when component mounts

  // Guard against empty quizQuestions if useEffect hasn't run yet
  if (quizQuestions.length === 0) {
    return <div className="text-white text-center text-xl">Loading Quiz...</div>;
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    if (showFeedback) return; // Prevent multiple clicks

    setSelectedOption(option);
    const correct = option === currentQuestion.answer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    initializeGame(); // Re-initialize to get 5 new random questions
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-xl text-white max-w-xl mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 text-teal-400">AI/ML & Web Dev Quiz</h2>

      {!quizFinished ? (
        <>
          <div className="text-xl mb-4 text-center">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </div>
          <p className="text-2xl font-semibold mb-6 text-center">{currentQuestion.question}</p>
          <div className="w-full grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`
                  p-4 rounded-lg text-lg font-medium transition duration-300
                  ${showFeedback
                    ? (option === currentQuestion.answer
                      ? 'bg-green-600 text-white' // Correct answer
                      : (selectedOption === option && !isCorrect
                        ? 'bg-red-600 text-white' // User's incorrect answer
                        : 'bg-gray-700 text-gray-300 cursor-not-allowed') // Other options
                    )
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800' // Default state
                  }
                  ${showFeedback ? 'cursor-not-allowed' : ''}
                `}
                disabled={showFeedback}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className={`mt-6 p-4 rounded-lg text-xl font-bold ${isCorrect ? 'bg-green-700' : 'bg-red-700'} text-center w-full`}>
              {isCorrect ? "Correct!" : "Incorrect."}
            </div>
          )}

          <button
            onClick={handleNextQuestion}
            className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg"
            disabled={!showFeedback} // Disable until feedback is shown
          >
            {currentQuestionIndex < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
          </button>
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-4xl font-extrabold text-teal-400 mb-4 animate-bounce">Quiz Finished!</h3>
          <p className="text-2xl mb-4">You scored {score} out of {quizQuestions.length}</p>
          <button
            onClick={restartQuiz}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizGame;