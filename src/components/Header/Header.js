import React from 'react';
import '../../global.css';
import classes from './Header.module.css';

const Header = () => {
    return (
        <div className={`flex fRow jBet pad15 ${classes.header}`}>
            <div className="brandName">Azienda</div>
            <div className="timer">03:00</div>
        </div>
    );
};

export default Header;