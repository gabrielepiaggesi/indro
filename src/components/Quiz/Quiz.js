import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../global.css';
import { createUserQuiz, createUserTests, getJobOfferQuiz } from '../../lib/api';
import AppContext from '../../store/app-context';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import { loadJSON } from '../../utils';
import QuizIntro from '../QuizIntro/QuizIntro';
import QuizSummary from '../QuizSummary/QuizSummary';
import TestByTest from '../TestByTest/TestByTest';
import TestsList from '../TestsList/TestsList';

const Quiz = (props) => {
    const { id, mode, title } = props;
    const [quiz, setQuiz] = useState(undefined);
    const [tests, setTests] = useState(undefined);
    const [showSummary, setShowSummary] = useState(false);
    const [showIntro, setShowIntro] = useState(true);

    const ctx = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => getQuiz(), []);

    const getQuiz = () => {
        const quizId = params.quizId;
        setIsLoading(true);
        getJobOfferQuiz(quizId)
        .then((data) => {
            if (data.uQuiz) {
                alert('Quiz gia fatto');
                navigate(`/quizList`, {replace: true});
            }
            setQuiz(data.quiz);
            setTests(data.tests);
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false); 
            alert(err.message)
        });
    }

    if (isLoading || !tests || !quiz) return (<div className="flex fCenter"><LoadingSpinner /></div>);

    const onConfirmHandler = (tests) => {
        console.log(tests);
        setTests(tests);
        setShowSummary(true);
    };

    const onSaveAndSendHandler = () => {
        ctx.stopCamera();
        ctx.resetTimer();
        clearInterval();
        let testsDone = tests.filter(test => !!test.answer);
        console.log(testsDone);
        testsDone = testsDone.map(test => {
            let newTest = {test_id: test.id};
            if (test.type === 'MULTIPLE') newTest['option_id'] = test.answer.id;
            if (test.type === 'FREE_TEXT') newTest['answer'] = test.answer;
            return newTest;
        });
        const dto = {
            tests: testsDone,
            quizId: quiz.id,
            jobOfferId: +ctx.jobOfferId
        }
        setIsLoading(true);
        createUserTests(dto)
        .then(() => {
            setIsLoading(false);
            navigate(-1);
        })
        .catch(err => {
            setIsLoading(false); 
            alert(err.message)
        });
    };

    const onBackHandler = () => {
       if (ctx.timer !== '0:00') setShowSummary(false);
    };

    const onStartQuizHandler = () => {
        const quizId = quiz.id;
        setIsLoading(true);
        createUserQuiz({ quiz_id: quizId, job_offer_id: +ctx.jobOfferId })
        .then(() => {
            if (quiz.check_camera && quiz.check_camera > 0) {
                ctx.startCamera();
            }
            ctx.startFancyTimer((+quiz.minutes) * 60);
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false); 
            alert(err.message)
        });
        setShowIntro(false);
    };

    if (showSummary) return (<QuizSummary backDisabled={ctx.timer === '0:00'} tests={tests} onSaveAndSend={onSaveAndSendHandler} onBack={onBackHandler} />);

    return (
        <>
            {showIntro ? 
                <QuizIntro title={quiz.topic} checkMic={quiz.check_mic} checkCam={quiz.check_camera} onStartQuiz={onStartQuizHandler} /> :   
                    // mode === "onebyone" ? 
                    //     <TestByTest tests={tests} onConfirm={onConfirmHandler} /> :
                    //     <TestsList tests={tests} onConfirm={onConfirmHandler} />

                        mode === "onebyone" ? 
                        <TestsList tests={tests} onConfirm={onConfirmHandler} /> :
                        <TestByTest tests={tests} onConfirm={onConfirmHandler} />
            }
        </>
    );
};

export default Quiz;