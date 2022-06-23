import React, { useState } from 'react';
import Test from '../Test/Test';
import '../../global.css';
import classes from './TestsList.module.css';
import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';

const TestsList = (props) => {
    const [testsDone, setTestsDone] = useState(0);

    const onOptionClickHandler = (optionIdx, idx) => {
        props.tests[idx].answer = optionIdx+'';
        calcTestsDone();
    };

    const onFileSelectSuccessHandler = (file, idx) => {
        props.tests[idx].answer = file.name;
        calcTestsDone();
    };

    const onFreeTextSaveHandler = (text, idx) => {
        props.tests[idx].answer = text;
        console.log(props.tests[idx]);
        calcTestsDone();
    };

    const calcTestsDone = () => {
        const testsDone = props.tests.filter(t => !!t.answer).length;
        setTestsDone(testsDone);
    };

    const onConfirmHandler = () => {
        props.onConfirm(props.tests);
    };

    return (
        <div className={`flex fColumn fCenter gap60 ${classes.box}`}>
            {props.tests.map((test, idx) => 
                <Card key={'div'+test.id} className="pad15">
                    <Test 
                        key={'test'+test.id} 
                        test={test}
                        onOptionClick={(e) => onOptionClickHandler(e, idx)} 
                        onFileSelectSuccess={(e) => onFileSelectSuccessHandler(e, idx)} 
                        onFreeTextSave={(e) => onFreeTextSaveHandler(e, idx)}
                    />
                </Card>
            )}
            <Card className={`flex fRow aCenter jBet w100 ${classes.summary}`}>
                <Button 
                    outline={true}
                >
                    INDIETRO
                </Button>
                <p>Hai risposto a {testsDone} su {props.tests.length}</p>
                <Button 
                    className="fBold"
                    onClick={onConfirmHandler}
                >
                    CONFERMA
                </Button>
            </Card>
        </div>
    );
};

export default TestsList;