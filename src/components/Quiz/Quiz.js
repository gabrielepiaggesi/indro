import React from 'react';
import OneByOneQuiz from '../OneByOneQuiz/OneByOneQuiz';
import '../../global.css';
import AllInOneQuiz from '../AllInOneQuiz/AllInOneQuiz';

const Quiz = (props) => {
    const { mode, tests } = props;
    return (
        <>
            {mode === "single" && <AllInOneQuiz tests={tests} />}
            {mode === "multiple" && <OneByOneQuiz tests={tests} />}
        </>
    );
};

export default Quiz;