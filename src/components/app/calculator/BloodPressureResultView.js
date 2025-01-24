import React from 'react';
import HeartAnimation from './HeartAnimation';
import BloodPressureHistoryModal from './BloodPressureHistoryModal';

function BloodPressureResultView({ bloodPressureCategory }) {
    return (
        <div
            className='basis-full md:basis-6/12 lg:basis-6/12 
            border-0 rounded-lg bg-gray-50 shadow-lg
            flex flex-col gap-4 p-2 '
        >
            <div className='flex justify-end items-center'>
                <BloodPressureHistoryModal />
            </div>
            {bloodPressureCategory && (
                <div className='flex justify-center items-center'>
                    <h1 className='font-bold text-2xl text-stone-800'>
                        {bloodPressureCategory}
                    </h1>
                </div>
            )}

            <div className='flex justify-center items-center'>
                <HeartAnimation
                    key={bloodPressureCategory}
                    bloodPressureLevel={bloodPressureCategory}
                />
            </div>
        </div>
    );
}

export default BloodPressureResultView;
