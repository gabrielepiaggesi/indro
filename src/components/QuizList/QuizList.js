import React from 'react';
import Button from '../../UI/Button/Button';
import classes from './QuizList.module.css';
import '../../global.css';
import Card from '../../UI/Card/Card';

const checkIfAllQuizAreDone = (arr) => {
    return arr.every(e => !!e.done);
};

const QuizList = (props) => {
    const allQuizDone = checkIfAllQuizAreDone(props.quizs);
    return (
        <div className="flex fColumn gap40 w80 mAuto pad20">
            <p className={classes.title}>{allQuizDone ? "Hai completato tutti i Test, ora aspetta un feedback dall'azienda" : "Completa tutti i Test qui sotto per procedere con la tua candidatura"}</p>
            <div className="flex fRow fWrap gap20">
                {props.quizs.map(quiz => 
                    <Card key={quiz.id} className={`flex fColumn gap40 ${classes.quizCard}`}>
                        <p className={classes.quizTopic}>{quiz.title}</p>
                        {!quiz.done && 
                            <Button className="fBold" onClick={() => props.onStartQuiz(quiz.id)}>INIZIA TEST</Button>
                        }
                        {quiz.done && 
                            <Button disabled={true} outline={true}>TEST FATTO</Button>
                        }
                    </Card>
                )}
            </div>
        </div>
    );
};

export default QuizList;