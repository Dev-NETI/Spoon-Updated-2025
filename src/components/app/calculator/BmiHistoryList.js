import React from 'react';
import BmiHistoryListItem from './BmiHistoryListItem';

function BmiHistoryList({ bmiLogData, currentPage, itemsPerPage }) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = bmiLogData.slice(startIndex, endIndex);

    return (
        <>
            {currentItems.map(data => (
                <BmiHistoryListItem key={data.id} data={data} />
            ))}
        </>
    );
}

export default BmiHistoryList;
