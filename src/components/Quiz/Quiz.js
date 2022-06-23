import React, { useEffect, useState } from 'react';
import '../../global.css';
import { loadJSON } from '../../utils';
import QuizIntro from '../QuizIntro/QuizIntro';
import QuizSummary from '../QuizSummary/QuizSummary';
import TestByTest from '../TestByTest/TestByTest';
import TestsList from '../TestsList/TestsList';

const Quiz = (props) => {
    const { id, mode, title } = props;
    const [tests, setTests] = useState(undefined);
    const [showSummary, setShowSummary] = useState(false);
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        loadJSON('testsSample.json', id)
        .then(sample => setTests(sample));
    }, [id]);

    if (!tests) return (<p>Loading...</p>);

    const onConfirmHandler = (tests) => {
        setTests(tests);
        setShowSummary(true);
    };

    const onSaveAndSendHandler = () => {
        props.onSaveAndSend(id);
    };

    const onBackHandler = () => {
        setShowSummary(false);
    };

    const onStartQuizHandler = () => {
        setShowIntro(false);
    };

    if (showSummary) return (<QuizSummary tests={tests} onSaveAndSend={onSaveAndSendHandler} onBack={onBackHandler} />);

    return (
        <>
            {showIntro ? 
                <QuizIntro title={title} onStartQuiz={onStartQuizHandler} /> :   
                    mode === "onebyone" ? 
                        <TestByTest tests={tests} onConfirm={onConfirmHandler} /> :
                        <TestsList tests={tests} onConfirm={onConfirmHandler} />
            }
        </>
    );
};

export default Quiz;