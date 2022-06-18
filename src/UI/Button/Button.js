import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
    const { type, disabled, className, onClick, outline } = props;
    return (
        <button
            type={type || 'button'}
            className={`br5 ${classes.button} ${className} ${disabled ? classes.disabled : ''} ${outline ? classes.outline : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;