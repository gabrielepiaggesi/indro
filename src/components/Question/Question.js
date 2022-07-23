import React from 'react';
import classes from './Question.module.css';

const Question = (props) => {
    return (
        <>
            <p className={classes.title}>{props.question}</p>
            {props.texts.map(text => <p key={text.id} className={classes.bio}>{text.text}</p>)}
            {props.images.map(img => <img key={img.id} src={img.image_url} alt="questionImage" />)}
        </>
    );
};  

export default Question;