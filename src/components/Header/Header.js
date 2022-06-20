import React from 'react';
import '../../global.css';
import classes from './Header.module.css';

const Header = () => {
    const logoUrl = 'companylogo.webp';
    return (
        <div className={`flex fRow aCenter jBet pad15 ${classes.header}`}>
            <div className={`flex fRow aCenter gap5 ${classes.logo}`}>
                <div className="brandLogo" style={{backgroundImage: `url(${logoUrl})`}}></div>
                <div className="brandName">Together Price</div>
            </div>
            <div className="timer">03:00</div>
        </div>
    );
};

export default Header;