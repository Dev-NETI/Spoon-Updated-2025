import React from 'react';
import ViewIndicatorItem from './ViewIndicatorItem';

function ViewIndicator({ activeView }) {
    return (
        <div className='grid grid-cols-4 gap-4'>
            <ViewIndicatorItem active={activeView === 1} />
            <ViewIndicatorItem active={activeView === 2} />
            <ViewIndicatorItem active={activeView === 3} />
            <ViewIndicatorItem active={activeView === 4} />
        </div>
    );
}

export default ViewIndicator;
