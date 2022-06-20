import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import { loadJSON } from './utils';
import Quiz from './components/Quiz/Quiz';

function App() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    loadJSON('testsSample.json')
    .then(sample => setTests(sample));
  }, []);

  return (
    <React.Fragment>
      <Header />
      {tests.length && <Quiz mode="onebyone" tests={tests} />}
    </React.Fragment>
  );
}

export default App;
