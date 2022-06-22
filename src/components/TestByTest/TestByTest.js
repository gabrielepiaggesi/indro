import React, { useState } from 'react';
import Test from '../Test/Test';
import '../../global.css';
import classes from './TestByTest.module.css';
import Index from '../Index/Index';
import Button from '../../UI/Button/Button';

const TestByTest = (props) => {
    const [currentTest, setCurrentTest] = useState(props.tests[0]);
    const [currentIdx, setCurrentIdx] = useState(0);

    const onIndexClickHandler = (idx) => {
        setCurrentIdx(idx);
        setCurrentTest(props.tests[idx]);
    };

    const onOptionClickHandler = (optionIdx) => {
        props.tests[currentIdx].answer = optionIdx+'';
        setCurrentTest((prevState) => ({ ...prevState, answer: optionIdx+'' }));
    };

    const onFileSelectSuccessHandler = (file) => {
        props.tests[currentIdx].answer = file.name;
        setCurrentTest((prevState) => ({ ...prevState, answer: file.name }));
    };

    const onFreeTextSaveHandler = (text) => {
        props.tests[currentIdx].answer = text;
        setCurrentTest((prevState) => ({ ...prevState, answer: text }));
    };

    const onConfirmHandler = () => {
        props.onConfirm(props.tests);
    };

    return (
        <div className={`${classes.box}`}>
            <Index elements={props.tests} currentIdx={currentIdx} onClick={onIndexClickHandler} />
            <Test 
                key={currentTest.id} // needs a key to trigger React change based on props change, currentTest doesnt trigger rerender because is an object and react doenst see any difference.
                test={currentTest}
                onOptionClick={onOptionClickHandler} 
                onFileSelectSuccess={onFileSelectSuccessHandler} 
                onFreeTextSave={onFreeTextSaveHandler}
            />
            <div className="flex fRow jBet">
                <Button 
                    disabled={currentIdx === 0} 
                    onClick={() => onIndexClickHandler(currentIdx - 1)}
                    outline={true}
                >
                    INDIETRO
                </Button>
                {currentIdx < props.tests.length-1 && <Button 
                    disabled={!currentTest.answer || currentIdx === props.tests.length-1} 
                    onClick={() => onIndexClickHandler(currentIdx + 1)}
                    className="fBold"
                >
                    AVANTI
                </Button>}
                {currentIdx === props.tests.length-1 && <Button 
                    disabled={!currentTest.answer} 
                    onClick={onConfirmHandler}
                    className="fBold"
                >
                    CONFERMA
                </Button>}
            </div>
        </div>
    );
};

export default TestByTest;