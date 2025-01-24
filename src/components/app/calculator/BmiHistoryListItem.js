import React from 'react';
import CardListItemComponent from './CardListItemComponent';
import { formatDate } from 'date-fns';

function BmiHistoryListItem({ data }) {
    const createdAt = formatDate(data.created_at, 'dd-mm-yyyy hh:mm:ss');
    return (
        <CardListItemComponent
            title={data.bmi}
            name={data.bmi_category?.name}
            created_at={createdAt}
        />
    );
}

export default BmiHistoryListItem;
