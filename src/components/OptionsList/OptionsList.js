import React, { useState } from 'react';
import '../../global.css';
import Option from '../../UI/Option/Option';

const OptionsList = (props) => {
    const [selectedOptionIdx, setSelectedOptionIdx] = useState(props.selected);

    const onOptionClickHandler = (optionIdx) => {
        setSelectedOptionIdx(optionIdx);
        props.onOptionClick(optionIdx)
    };

    return (
        <div className="grid n2Col gap20">
            {props.options.map((opt, idx) => 
                <Option 
                    key={props.testId + '-' + idx} 
                    selected={idx === selectedOptionIdx} 
                    text={opt.text} 
                    onClick={() => onOptionClickHandler(idx)} 
                />
            )}
        </div>
    );
};

export default OptionsList;