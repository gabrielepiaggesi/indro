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
        <div className={`grid gap20 ${props.mode === 'grid' ? 'n2Col' : 'n1Col'} hFitCont`}>
            {props.options.map((opt, idx) => 
                <Option 
                    key={opt.id} 
                    selected={opt.id === selectedOptionIdx} 
                    text={opt.option_text} 
                    onClick={() => onOptionClickHandler(opt.id)} 
                />
            )}
        </div>
    );
};

export default OptionsList;