import React from 'react';
import '../../global.css';
import classes from './QuizSummary.module.css';
import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';

const QuizSummary = (props) => {
    return (
        <Card className={`flex fColumn w80 mAuto pad15 mB40 gap60`}>
            <p className={classes.title}>Riepilogo</p>
            <div className={`grid n2Col gap40`}>
                {props.tests.map((test, idx) => 
                    <Card key={test.id} className="pad15">
                        <p className={classes.question}>{((idx+1).toString()) + ' - ' + test.question}</p>
                        {test.type === 'MULTIPLE' && <p className={classes.answer}>{test.answer.option_text}</p>}
                        {test.type === 'FREE_TEXT' && <p className={classes.answer}>{test.answer}</p>}
                    </Card>
                )}
            </div>
            <div className={`flex fRow aCenter jBet w100`}>
                <Button 
                    outline={true}
                    onClick={props.onBack}
                    disabled={props.backDisabled}
                >
                    INDIETRO
                </Button>
                <p style={{fontSize: '21px'}}>Hai risposto a {props.tests.filter(t=>!!t.answer).length} su {props.tests.length}</p>
                <Button 
                    className="fBold"
                    onClick={props.onSaveAndSend}
                >
                    SALVA E INVIA
                </Button>
            </div>
        </Card>
    );
};

export default QuizSummary;