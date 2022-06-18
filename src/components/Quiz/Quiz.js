import React from 'react';
import '../../global.css';
import TestByTest from '../TestByTest/TestByTest';
import TestsList from '../TestsList/TestsList';

const Quiz = (props) => {
    const { mode, tests } = props;
    return (
        <>
            {mode === "list" && <TestsList tests={tests} />}
            {mode === "onebyone" && <TestByTest tests={tests} />}
        </>
    );
};

export default Quiz;