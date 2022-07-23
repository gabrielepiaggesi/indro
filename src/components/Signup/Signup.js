import React, { useState } from 'react';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
// import classes from './Component.module.css';
import '../../global.css';
import { signup } from '../../lib/api';
import Card from '../../UI/Card/Card';
import Form from '../../UI/Form/Form';
import { useNavigate } from 'react-router-dom';

const signupConfig = [
    {
        "label": "Email",
        "type": "email",
        "key": "email",
        "tag": "input",
        "placeholder": "Email"
    },
];

const Signup = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);

    if (isLoading) {
        return (<div className="flex fCenter"><LoadingSpinner /></div>);
    }

    const onSubmitHandler = (formValue) => {
        setIsLoading(true);
        signup(formValue)
        .then(data => props.onLogin({...formValue, ...data}))
        .catch(err => {
            setIsLoading(false); 
            setError(err.message);
        });
    };

    const goLogin = () => props.goLogin();

    return (
        <Card className="flex fColumn mAuto pad20 w30 gap20">
            <Form title="Signup" cta="AVANTI" config={signupConfig} onSave={onSubmitHandler} />
            {error && <p style={{color: 'red'}}>{error}</p>}
            <span onClick={goLogin} className="cP" style={{textDecoration: 'underline'}}>or login</span>
        </Card>
    );
};

export default Signup;