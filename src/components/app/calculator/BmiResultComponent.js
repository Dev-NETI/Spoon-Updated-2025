import React from 'react';
import BmiGauge from './BmiGauge';
import BmiHistoryModal from './BmiHistoryModal';

function BmiResultComponent({ bmi }) {
    return (
        <>
            <div
                className='basis-full md:basis-6/12 lg:basis-6/12 
            border-0 rounded-lg bg-gray-50 shadow-lg
            flex flex-col gap-4 '
            >
                <div className='flex items-end justify-end p-4'>
                    <BmiHistoryModal />
                </div>
                <div className='flex justify-center items-center '>
                    <h1 className='font-bold text-xl text-stone-800'>
                        Your BMI: {bmi}
                    </h1>
                </div>
                <div className='flex justify-center items-center '>
                    <BmiGauge value={bmi} />
                </div>
            </div>
        </>
    );
}

export default BmiResultComponent;
