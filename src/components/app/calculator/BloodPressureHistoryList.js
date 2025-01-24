import React from 'react';
import BloodPressureHistoryListItem from './BloodPressureHistoryListItem';
import { computeBloodPressure } from '@/lib/utils';

function BloodPressureHistoryList({ bpData, currentPage, itemsPerPage }) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = bpData.slice(startIndex, endIndex).map(data => ({
        ...data,
        bpCategory: computeBloodPressure(data.systolic, data.diastolic),
    }));

    return (
        <>
            {currentItems.map(data => (
                <BloodPressureHistoryListItem key={data.id} data={data} />
            ))}
        </>
    );
}

export default BloodPressureHistoryList;
