import React from 'react';
import FileSelector from '../../UI/FileSelector/FileSelector';
import FreeTextOption from '../../UI/FreeTextOption/FreeTextOption';
import OptionsList from '../OptionsList/OptionsList';
import Question from '../Question/Question';
import classes from './Test.module.css';

const Test = (props) => {
    const { id, question, options, texts, type, mode, images, answer } = props.test;
    return (
        <div className={classes.box} key={id}>
            <Question question={question} texts={texts} images={images} />
            {(type === "MULTIPLE") && 
                <OptionsList 
                    testId={id} 
                    mode={mode} 
                    selected={answer ? answer.id : undefined}
                    options={options} 
                    onOptionClick={props.onOptionClick} 
                />
            }
            {type === "FREE_TEXT" && <FreeTextOption text={answer} onSave={props.onFreeTextSave} />}
            {type === "FILE" && <FileSelector file={answer} onFileSelectSuccess={props.onFileSelectSuccess} />}
        </div>
    );
};

export default Test;