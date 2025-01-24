import React from 'react';
import { Card, CardTitle } from '@/components/ui/card';

function CardListItemComponent({ title, name, created_at }) {
    return (
        <Card className='flex flex-row justify-between gap-4 p-4 md:p-2 lg:p-2'>
            <CardTitle className='font-bold text-base md:text-lg lg:text-lg text-stone-800'>
                {title}
            </CardTitle>
            <div className='flex flex-col gap-2 justify-end items-end'>
                <p className='font-semibold text-sm md:text-lg lg:text-lg text-stone-800'>
                    {name}
                </p>
                <p className='text-xs md:text-lg lg:text-lg text-stone-600 italic'>
                    {created_at}
                </p>
            </div>
        </Card>
    );
}

export default CardListItemComponent;
