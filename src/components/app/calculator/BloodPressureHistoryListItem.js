import React from 'react';
import CardListItemComponent from './CardListItemComponent';
import { formatDate } from '@/lib/utils';

function BloodPressureHistoryListItem({ data }) {
    return (
        <CardListItemComponent
            title={data.bpCategory}
            name={`${data.systolic} / ${data.diastolic}`}
            created_at={formatDate(data.created_at, 'dd-mm-yyyy hh:mm:ss')}
        />
    );
}

export default BloodPressureHistoryListItem;
