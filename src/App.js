import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import { loadJSON } from './utils';
import Quiz from './components/Quiz/Quiz';
import './global.css';
import QuizList from './components/QuizList/QuizList';
import UserForm from './components/UserForm/UserForm';

function App() {
  const [quizs, setQuizs] = useState(undefined);
  const [currentQuiz, setCurrentQuiz] = useState(undefined);
  const [userHasInfo, setUserHasInfo] = useState(false);

  useEffect(() => {
    loadJSON('quizsSample.json')
    .then(sample => setQuizs(sample));
  }, [userHasInfo]);

  if (userHasInfo && !quizs) return (<p>Loading...</p>);

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

  const onSendUserInfoHandler = (userInfo) => {
    console.log(userInfo);
    setUserHasInfo(true);
  };

  return (
    <React.Fragment>
      <Header />
      <div className="mt80 oHidden pad15">
        {!userHasInfo && <UserForm onSendUserInfo={onSendUserInfoHandler} />}
        {userHasInfo && !!currentQuiz && <Quiz id={currentQuiz.id} mode={currentQuiz.mode} title={currentQuiz.title} onSaveAndSend={onSaveAndSendHandler} />}
        {userHasInfo && !currentQuiz && <QuizList quizs={quizs} onStartQuiz={onStartQuizHandler} />}
      </div>
    </React.Fragment>
  );
}

export default App;
