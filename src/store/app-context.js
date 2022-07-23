import React, { useEffect, useState } from 'react';
import { useTimer } from '../hooks/useTimer';
import { setToken, uploadUserTestImage } from '../lib/api';

const AppContext = React.createContext({
    isLoggedIn: false,
    userDetails: undefined,
    token: undefined,
    companyId: undefined,
    jobOfferId: undefined,
    timer: undefined,
    startFancyTimer: () => {},
    stopTimer: () => {},
    onLogout: () => {},
    setCompany: () => {},
    setJobOffer: () => {},
    onLogin: (email, token, userId) => {},
    uploadImage: () => {},
    takePhoto: () => {},
    stopCamera: () => {},
    resetTimer: () => {},
    startCamera: () => {}
});

export const AppContextProvider = (props) => {
    const { fancyTime, startTimer, stopTimer, resetTimer } = useTimer(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(undefined);
    const [userToken, setUserToken] = useState(undefined);
    const [companyId, setCompanyId] = useState(undefined);
    const [jobOfferId, setJobOfferId] = useState(undefined);
    const [intervalId, setIntervalId] = useState(undefined);

    useEffect(() => {
        const userSaved = localStorage.getItem('userDetails');
        const userToken = localStorage.getItem('userToken');
        const cSaved = localStorage.getItem('companyId');
        const jSaved = localStorage.getItem('jobOfferId');
        if (userSaved && userToken) {
            setUserDetails(JSON.parse(userSaved));
            setIsLoggedIn(true);
            setToken(userToken);
            setUserToken(userToken);
        }
        if (cSaved) setCompanyId(+cSaved);
        if (jSaved) setJobOfferId(+jSaved);
      }, []); // this runs only after the component and only if the dependencies are changed, but by passing an empty array of deps, deps will never change so this will run just when the component is called the first time

    const logoutHandler = () => {
        localStorage.removeItem('userDetails');
        localStorage.removeItem('userToken');
        localStorage.removeItem('companyId');
        localStorage.removeItem('jobOfferId');
        setIsLoggedIn(false);
    };

    const loginHandler = (userDetails) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        delete userDetails.password;
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        localStorage.setItem('userToken', userDetails.token);
        setUserDetails(userDetails);
        setIsLoggedIn(true);
        setToken(userDetails.token);
        setUserToken(userDetails.token);
    };

    const setCompany = (id) => { localStorage.setItem('companyId',id); setCompanyId(id)};
    const setJobOffer = (id) => { localStorage.setItem('jobOfferId',id); setJobOfferId(id)};

    const uploadImage = (blob) => {
        const file = new File([blob], "name.jpeg", {type: "image/jpeg"});
        blob && file && uploadUserTestImage({ job_offer_id: jobOfferId }, file)
        .catch(err => {
            console.log(err.message);
        });
    };

    const takePhoto = () => {
        const btn = document.getElementById('takePhoto');
        btn && btn.click();
    }

    const stopCamera = () => {
        clearInterval(intervalId);
        const btn = document.getElementById('stopCamera');
        btn.click();
    }

    const startCamera = () => {
        const btn = document.getElementById('startCamera');
        console.log(btn);
        if (btn) {
            btn.click();
            startTakingPhotos();
        }
    }

    const startTakingPhotos = () => {
        var intervalID = setInterval(() => takePhoto(), (60 * 1000)); 
        setIntervalId(intervalID)
    }

    const startFancyTimer = (time) => startTimer(time);

    return (
        <AppContext.Provider value={{ 
                isLoggedIn: isLoggedIn, 
                userDetails: userDetails,
                token: userToken,
                companyId,
                jobOfferId,
                timer: fancyTime,
                setCompany,
                setJobOffer,
                startFancyTimer,
                stopTimer,
                resetTimer,
                onLogout: logoutHandler,
                onLogin: loginHandler,
                startCamera, stopCamera, takePhoto, uploadImage

            }}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContext;