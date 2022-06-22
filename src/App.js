import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import { loadJSON } from './utils';
import Quiz from './components/Quiz/Quiz';
import './global.css';
import QuizList from './components/QuizList/QuizList';

function App() {
  const [quizs, setQuizs] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(undefined);

  useEffect(() => {
    loadJSON('quizsSample.json')
    .then(sample => setQuizs(sample));
  }, []);

  const onSaveAndSendHandler = (quizId) => {
    setQuizs((prevState) => {
      return prevState.map(quiz => ({...quiz, done: quiz.id === quizId ? true : quiz.done}))
    });
    setCurrentQuiz(undefined);
  };

  const onStartQuizHandler = (quizId) => {
    const quiz = quizs.find(q => q.id === quizId);
    console.log(quiz);
    setCurrentQuiz(quiz);
  };

  return (
    <React.Fragment>
      <Header />
      <div className="mt80 oHidden">
        {!!currentQuiz && <Quiz id={currentQuiz.id} mode={currentQuiz.mode} onSaveAndSend={onSaveAndSendHandler} />}
        {!currentQuiz && <QuizList quizs={quizs} onStartQuiz={onStartQuizHandler} />}
      </div>
    </React.Fragment>
  );
}

export default App;
