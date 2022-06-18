import React from 'react';
import OptionsList from '../OptionsList/OptionsList';
import Question from '../Question/Question';
import classes from './Test.module.css';

const Test = (props) => {
    const { id, question, options, answer } = props.test;
    return (
        <div className={classes.box}>
            <Question text={(id.toString()) + ' - ' + question.text} img={question.img} />
            <OptionsList selected={+answer} testId={id} options={options} onOptionClick={props.onOptionClick} />
        </div>
    );
};

export default Test;