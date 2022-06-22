import React from 'react';
import '../../global.css';
import classes from './QuizSummary.module.css';
import Button from '../../UI/Button/Button';

const QuizSummary = (props) => {
    return (
        <div className={`flex fColumn fCenter ${classes.box}`}>
            <p className={classes.title}>Riepilogo</p>
            {props.tests.map((test, idx) => 
                <div key={test.id}>
                    <p className={classes.question}>{((idx+1).toString()) + ' - ' + test.question.text}</p>
                    <p className={classes.answer}>{test.answer}</p>
                </div>
            )}
            <div className={`flex fRow aCenter jBet w100 ${classes.summary}`}>
                <Button 
                    outline={true}
                    onClick={props.onBack}
                >
                    INDIETRO
                </Button>
                <p>Hai risposto a {props.tests.filter(t=>!!t.answer).length} su {props.tests.length}</p>
                <Button 
                    className="fBold"
                    onClick={props.onSaveAndSend}
                >
                    SALVA E INVIA
                </Button>
            </div>
        </div>
    );
};

export default QuizSummary;