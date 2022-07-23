import React, { useContext, useState } from 'react';
import '../../global.css';
import { useTimer } from '../../hooks/useTimer';
import AppContext from '../../store/app-context';
import { CameraFeed } from '../../UI/CameraFeed/CameraFeed';
import classes from './Header.module.css';

const Header = () => {
    const logoUrl = 'companylogo.webp';
    const ctx = useContext(AppContext);
    const [intervalId, setIntervalId] = useState(undefined);

    return (
        <div className={`flex fRow aCenter jBet pad15 boxSha ${classes.header}`}>
            <div className={`flex fRow aCenter gap5`}>
                <div className={classes.logo} style={{backgroundImage: `url(${logoUrl})`}}></div>
                <div className="brandName">Together Price</div>
            </div>
            <div className='flex fRow aCenter gap10'>
                {/* <button onClick={ctx.startFancyTimer}>start</button> */}
                {/* <button onClick={ctx.takePhoto}>take photo</button>
                <button onClick={ctx.stopCamera}>stopCamera</button>
                <button onClick={ctx.startCamera}>startCamera</button> */}
                <CameraFeed sendFile={ctx.uploadImage}/>
                {ctx.timer && <div className="timer">{ctx.timer}</div>}
            </div>
        </div>
    );
};

export default Header;