import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import Header from './components/Header/Header';
import './global.css';
import QuizList from './components/QuizList/QuizList';
import UserForm from './components/UserForm/UserForm';
import { Route, Routes, useParams, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import AppContext from './store/app-context';
import { getJobOfferFromLink } from './lib/api';
import LoadingSpinner from './UI/LoadingSpinner/LoadingSpinner';
import Signup from './components/Signup/Signup';
import Test from './components/Test/Test';
import Quiz from './components/Quiz/Quiz';

export const Layout = (props) => {
  return (
    <React.Fragment>
      <Header onLogout={props.onLogout} />
      <main className="mt80 oHidden pad15">{props.children}</main>
    </React.Fragment>
  )
};

export const Router = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/quizList" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/quiz/:quizId" element={<Quiz />} />
      <Route path="/test/:testId" element={<Test />} />
      <Route path="/quizList" element={<QuizList />} />
      <Route path="/jobForm" element={<UserForm />} />
    </Routes>
  )
};

function App() {
  const ctx = useContext(AppContext);
  const params = useParams();
  const [goLogin, setGoLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    console.log(ctx.jobOfferId, query.get('jobOffer'));
    if (query.get('jobOffer')) getJobOffer(query.get('jobOffer'));
  }, []);

  const getJobOffer = (jobOfferUUID) => {
    setIsLoading(true);
    getJobOfferFromLink(jobOfferUUID)
    .then(data => {
        ctx.setCompany(data.company_id);
        ctx.setJobOffer(data.id);
        setIsLoading(false); 
    })
    .catch(err => {
        setIsLoading(false); 
        alert(err.message);
    });
  }

  if (isLoading) return (<div className="flex fCenter"><LoadingSpinner /></div>);

  if (!ctx.isLoggedIn && !goLogin) return (<Signup onLogin={(data) => ctx.onLogin(data)} goLogin={() => setGoLogin(true)}/>);

  if (!ctx.isLoggedIn && goLogin) return (<Login onLogin={(data) => ctx.onLogin(data)} goSignup={() => setGoLogin(false)}/>);

  return (
    <Layout onLogout={ctx.onLogout}>
      <Router>
        {/* <QuizList /> */}
      </Router>
    </Layout>
  );
}

export default App;