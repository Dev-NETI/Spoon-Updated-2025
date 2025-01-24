import React from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import LogFoodDialog from './LogFoodDialog';

function LogFoodListItem({ data }) {
    return (
        <Card className='flex flex-row justify-between  p-4 items-center shadow-md mt-4'>
            <CardTitle className='text-lg'>{data.name}</CardTitle>
            <div>
                <LogFoodDialog data={data} />
            </div>
        </Card>
    );
}

export default LogFoodListItem;
