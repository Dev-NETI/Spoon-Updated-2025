import React from 'react';
import { Card, CardContent } from '@mui/material';
import Image from 'next/image';

function RecipeViewIconCardComponent({ src, label, value }) {
    return (
        <Card className='hover:shadow-lg transition-shadow duration-300 shadow-md'>
            <CardContent className='p-4 flex flex-col items-center justify-center h-full'>
                <div className='flex justify-center'>
                    <Image
                        src={src}
                        alt={label}
                        height={50}
                        width={50}
                        className='rounded-md contrast-50 filter grayscale-0'
                    />
                </div>
                <p className='text-center font-bold text-sm mt-2 text-blue-800'>
                    {label}
                </p>
                <p className='text-center text-sm text-gray-600 mt-1'>
                    {value}
                </p>
            </CardContent>
        </Card>
    );
}

export default RecipeViewIconCardComponent;
