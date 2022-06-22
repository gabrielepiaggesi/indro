import React from 'react';
import classes from './Question.module.css';

const Question = (props) => {
    return (
        <>
            <p className={classes.title}>{props.text}</p>
            {props.showBio && <p className={classes.bio}>{props.text}</p>}
            {props.img && <img src={props.img} alt="questionImage" />}
        </>
    );
};  

export default Question;