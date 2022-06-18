import React from 'react';
import Test from '../Test/Test';
import '../../global.css';
import Button from '../../UI/Button/Button';

const AllInOneQuiz = (props) => {
    return (
        <div className="flex fColumn fCenter">
            {props.tests.map((test, idx) => <Test key={idx} question={test.question} options={test.options} />)}
            <Button>avanti</Button>
        </div>
    );
};

export default AllInOneQuiz;