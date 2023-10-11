import { useState } from 'react';
import { Sidebar } from '../components';
import fondo from '../assets/img/fondoTrivia.png'

export const Trivia = () => {
  const questions = [
    {
      question: 'Which region of Peru has experienced the most recent forest fires?',
      options: ['Lima', 'Cusco', 'Apurimac', 'Madre de Dios'],
      correctAnswer: 'Cusco',
    },
    {
      question: 'What organization is responsible for coordinating the response to forest fires in Peru?',
      options: ['SERNANP', 'INDECI', 'Ministry of Agriculture'],
      correctAnswer: 'INDECI',
    },
    {
      question: 'During which season of the year are forest fires most common in Peru?',
      options: ['Summer', 'Winter', 'Spring'],
      correctAnswer: 'Summer',
    },
    {
      question: 'What is one of the main causes of forest fires in Peru?',
      options: ['Lightning', 'Human activity', 'Volcanic eruptions'],
      correctAnswer: 'Human activity',
    },
    {
      question: 'Which region in Peru is known for having the most forested areas?',
      options: ['Loreto', 'Arequipa', 'Tacna', 'Puno'],
      correctAnswer: 'Loreto',
    },
    {
      question: 'What is the primary tool used to combat forest fires?',
      options: ['Hoses', 'Shovels', 'Water bombers', 'Firebreaks'],
      correctAnswer: 'Water bombers',
    },
    {
      question: 'What percentage of forest fires in Peru are caused by human activity?',
      options: ['10%', '50%', '75%', '90%'],
      correctAnswer: '90%',
    },
    {
      question: 'Which month in Peru typically sees the highest number of forest fires?',
      options: ['January', 'March', 'July', 'November'],
      correctAnswer: 'July',
    },
    {
      question: 'What type of weather conditions can contribute to the spread of forest fires?',
      options: ['Rainy weather', 'Strong winds', 'Snowfall', 'Fog'],
      correctAnswer: 'Strong winds',
    },
    {
      question: 'What is the recommended distance for creating a firebreak to prevent forest fires from spreading?',
      options: ['10 feet', '50 feet', '100 feet', '500 feet'],
      correctAnswer: '100 feet',
    },
    // Add more questions here
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [triviaCompleted, setTriviaCompleted] = useState(false);

  const handleAnswerClick = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setTriviaCompleted(true);
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row h-screen"
    >
      <Sidebar />
      <div className="flex items-center flex-col justify-center w-full h-screen p-4 text-white text-center"
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}>
        <div>
          <h2 className="text-4xl font-bold mb-4">
            Question {currentQuestionIndex + 1}:
          </h2>
          <p className='text-2xl'>{questions[currentQuestionIndex].question}</p>
          <ul className="mt-4 text-xl">
            {questions[currentQuestionIndex].options.map((option) => (
              <li
                key={option}
                className="cursor-pointer hover:underline px-10 py-3 mt-4 rounded-lg bg-white text-black"
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
        {triviaCompleted && (
          <div className="text-white mt-20">
            <h2 className="text-4xl font-bold">Trivia completed</h2>
            <p className='text-xl'>Final score: {score} points</p>
          </div>
        )}
      </div>
    </div>
  );
};