import React, { useEffect, useState } from 'react';
import '../../global.css';
import { loadJSON } from '../../utils';
import QuizSummary from '../QuizSummary/QuizSummary';
import TestByTest from '../TestByTest/TestByTest';
import TestsList from '../TestsList/TestsList';

const Quiz = (props) => {
    const { id, mode } = props;
    const [tests, setTests] = useState(undefined);
    const [showSummary, setShowSummary] = useState(false);

    useEffect(() => {
        console.log('ciao');
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

    if (showSummary) return (<QuizSummary tests={tests} onSaveAndSend={onSaveAndSendHandler} onBack={onBackHandler} />);

    return (
        <>
            {mode === "list" && <TestsList tests={tests} onConfirm={onConfirmHandler} />}
            {mode === "onebyone" && <TestByTest tests={tests} onConfirm={onConfirmHandler} />}
        </>
    );
};

export default Quiz;