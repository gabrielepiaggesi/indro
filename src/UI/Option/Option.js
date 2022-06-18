import React from 'react';
import classes from './Option.module.css';

const Option = (props) => {
    const { text, selected, onClick } = props;
    return (
        <div onClick={onClick} className={`br5 ${classes.box} ${selected ? classes.selected : ''}`}>
            <div className="radioBtn"></div>
            <div>{text}</div>
        </div>
    );
};

export default Option;