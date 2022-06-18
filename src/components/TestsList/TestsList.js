import React from 'react';
import Test from '../Test/Test';
import '../../global.css';
import classes from './TestsList.module.css';
import Button from '../../UI/Button/Button';

const TestsList = (props) => {
    return (
        <div className={`flex fColumn fCenter ${classes.box}`}>
            {props.tests.map((test, idx) => 
                <>
                    <Test 
                        key={test.id} 
                        test={test}
                    />
                    <hr className="w100"></hr>
                </>
            )}
            <div className="flex fRow jBet w100">
                <Button 
                    outline={true}
                >
                    INDIETRO
                </Button>
                <Button 
                    className="fBold"
                >
                    CONFERMA
                </Button>
            </div>
        </div>
    );
};

export default TestsList;