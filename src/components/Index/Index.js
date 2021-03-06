import React from 'react';
import '../../global.css';
import classes from './Index.module.css';

const Index = (props) => {
    return (
        <div className="flex fRow gap5 fWrap maxH100 oYAuto">
            {props.elements.map((elem, idx) => 
                <div 
                    key={elem.id}
                    className={`br5 ${classes.idx} 
                        ${(idx === props.currentIdx && classes.idxSelected)} 
                        ${elem.answer ? classes.indexDone : ''}
                    `} 
                    onClick={() => props.onClick(idx)}
                >
                    {idx + 1}
                </div>
            )}
        </div>
    );
};

export default Index;