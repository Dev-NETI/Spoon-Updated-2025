'use client';
import React, { useState } from 'react';
import AnthropometryCard from '@/components/app/calculator/AnthropometryCard';
import BmiResultComponent from '@/components/app/calculator/BmiResultComponent';

function Bmi() {
    const [bmi, setBmi] = useState();

    return (
        <div
            className='basis-full  gap-2 p-10 md:p-5 lg:p-5  
        flex flex-col md:flex-row lg:flex-row '
        >
            <BmiResultComponent bmi={bmi} />
            <AnthropometryCard bmi={bmi} setBmi={setBmi} />
        </div>
    );
}

export default Bmi;
