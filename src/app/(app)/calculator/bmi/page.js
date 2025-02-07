'use client';
import React, { useState } from 'react';
import AnthropometryCard from '@/components/app/calculator/AnthropometryCard';
import BmiResultComponent from '@/components/app/calculator/BmiResultComponent';
import { Toaster } from 'sonner';

function Bmi() {
    const [bmi, setBmi] = useState();

    return (
        <>
            <div
                className='basis-full  gap-2 p-10 md:p-5 lg:p-5
        flex flex-col md:flex-row lg:flex-row '
            >
                <AnthropometryCard bmi={bmi} setBmi={setBmi} />
                <BmiResultComponent bmi={bmi} />
            </div>
            <Toaster position='top-right' />
        </>
    );
}

export default Bmi;
