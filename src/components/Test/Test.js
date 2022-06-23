import React from 'react';
import FileSelector from '../../UI/FileSelector/FileSelector';
import FreeTextOption from '../../UI/FreeTextOption/FreeTextOption';
import OptionsList from '../OptionsList/OptionsList';
import Question from '../Question/Question';
import classes from './Test.module.css';

const Test = (props) => {
    const { id, question, options, answer, type, mode } = props.test;
    return (
        <div className={classes.box} key={id}>
            <Question showBio={true} text={(id.toString()) + ' - ' + question.text} img={question.img} />
            {(type === "options" || (options && options.length)) && <OptionsList selected={+answer} testId={id} mode={mode} options={options} onOptionClick={props.onOptionClick} />}
            {type === "text" && <FreeTextOption text={answer} onSave={props.onFreeTextSave} />}
            {type === "file" && <FileSelector file={answer} onFileSelectSuccess={props.onFileSelectSuccess} />}
        </div>
    );
};

export default Test;