import React, { useEffect, useState } from 'react';
import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import '../../global.css';
import classes from './UserForm.module.css';
import { loadJSON } from '../../utils';

const UserForm = (props) => {
    const [userInfos, setUserInfos] = useState(undefined);

    useEffect(() => {
        loadJSON('userInfosSample.json')
        .then(sample => {
            setUserInfos(sample);
        });
    }, []);

    if (!userInfos) return (<p>Loading...</p>);

    const onSubmitHandler = (event) => {
        const infoKeys = userInfos.map(info => info.key);
        let formValue = {};
        infoKeys.forEach(key => {
            formValue[key] = event.target.elements[key].value;
        });
        props.onSendUserInfo(formValue);
    };

    return (
        <Card className="pad15 w50 mAuto">
            <p className={classes.title}>Completa le tue informazioni</p>
            <form className="flex fColumn gap20" onSubmit={onSubmitHandler}>
                {userInfos.map((info) => 
                    <div key={info.key} className="flex fColumn gap10">
                        <label>{info.label}</label>
                        <input className="pad15 br5 boxSha" type={info.type} name={info.key} />
                    </div>
                )}
                <Button type="submit" className="fBold">INVIA</Button>
            </form>
        </Card>
    );
};

export default UserForm;