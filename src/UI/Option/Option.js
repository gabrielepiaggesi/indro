import React from 'react';
import classes from './Option.module.css';

const Option = (props) => {
    const { text, selected, onClick } = props;
    return (
        <div onClick={onClick} className={`flex fRow aCenter gap15 br5 ${classes.box} ${selected ? classes.selected : ''}`}>
            <div className={classes.radioBtn}></div>
            <div>{text}</div>
        </div>
    );
};

export default Option;