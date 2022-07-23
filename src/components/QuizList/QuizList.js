import React, { useContext, useEffect, useState } from 'react';
import Button from '../../UI/Button/Button';
import classes from './QuizList.module.css';
import '../../global.css';
import Card from '../../UI/Card/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { getJobOffer, getJobOfferQuizs, getJobOfferUserApplication } from '../../lib/api';
import AppContext from '../../store/app-context';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import { CameraFeed } from '../../UI/CameraFeed/CameraFeed';

const checkIfAllQuizAreDone = (arr) => {
    return arr.every(e => !!e.done);
};

const QuizList = (props) => {
    // const allQuizDone = checkIfAllQuizAreDone(props.quizs);
    const [quizs, setQuizs] = useState(undefined);
    const ctx = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    
    useEffect(() => getJob(), []);

    const getJob = () => {
        const jobOfferId = ctx.jobOfferId;
        setIsLoading(true);
        getJobOffer(jobOfferId)
        .then((data) => {
            console.log(data);
            ctx.setCompany(data.jOffer.company_id);
            getUserApplication();
        })
        .catch(err => {
            setIsLoading(false); 
            alert(err.message)
        });
    }

    const getUserApplication = () => {
        setIsLoading(true);
        getJobOfferUserApplication(ctx.jobOfferId, ctx.userDetails.user.id)
        .then(data => {userDataHandler(data);})
        .catch(err => {
            setIsLoading(false); 
            alert(err.message);
        });
    }

    const getQuizs = () => {
        getJobOfferQuizs(ctx.jobOfferId)
        .then(data => {
            data.quizs = data.quizs.map(q => {
                return {
                    ...q,
                    done: data.uQuizs.length && data.uQuizs.find(uQ => uQ.quiz_id === q.id)
                }
            })
            setQuizs(data.quizs);
        })
        .catch(err => {
            setIsLoading(false); 
            alert(err.message);
        });
        setIsLoading(false); 
    }

    const userDataHandler = (data) => {
        if (!data.uApp || !data.userData.length) {
            navigate(`/jobForm`, {replace: true});
        } else {
            getQuizs();
        }
    }

    const goQuiz = (quizId) => navigate(`/quiz/${quizId}`);

    const uploadImage = (blob) => {
        const file = new File([blob], "name");
        console.log(file);
    };

    if (isLoading || !quizs) return (<div className="flex fCenter"><LoadingSpinner /></div>);

    return (
        <div className="flex fColumn gap40 w80 mAuto pad20">
            <p className={classes.title}>{checkIfAllQuizAreDone(quizs) ? "Hai completato tutti i Test, ora aspetta un feedback dall'azienda" : "Completa tutti i Test qui sotto per procedere con la tua candidatura"}</p>
            <div className="flex fRow fWrap gap20">
                {quizs.map(quiz => 
                    <Card key={quiz.id} className={`flex fColumn gap40 ${classes.quizCard}`}>
                        <p className={classes.quizTopic}>{quiz.topic}</p>
                        {!quiz.done && 
                            <Button className="fBold" onClick={() => goQuiz(quiz.quiz_id || quiz.q_id)}>INIZIA TEST</Button>
                        }
                        {!!quiz.done && 
                            <Button disabled={true} outline={true}>TEST FATTO</Button>
                        }
                    </Card>
                )}
            </div>
        </div>
    );
};

export default QuizList;