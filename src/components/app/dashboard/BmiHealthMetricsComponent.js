import React from 'react';
import BmiHealthMetricsCardComponent from './BmiHealthMetricsCardComponent';

function BmiHealthMetricsComponent() {
    return (
        <>
            <div className='flex flex-row z-50 mt-5'>
                <div className='basis-8/12'>
                    <p className='text-xl font-semibold'>BMI Health Metrics</p>
                </div>
                <div className='basis-6/12 text-end justify-between'>
                    <a
                        href='#'
                        className='text-blue-800 text-base text-balance '
                    >
                        View all &gt;
                    </a>
                </div>
            </div>
            <div className='grid grid-cols-12 gap-4 p-4'>
                <div className='col-span-12 md:col-span-4 lg:col-span-4'>
                    <BmiHealthMetricsCardComponent
                        title='Top 20 Underweight'
                        bmiCategory={1}
                    />
                </div>
                <div className='col-span-12 md:col-span-4 lg:col-span-4'>
                    <BmiHealthMetricsCardComponent
                        title='Top 20 Overweight'
                        bmiCategory={2}
                    />
                </div>
                <div className='col-span-12 md:col-span-4 lg:col-span-4'>
                    <BmiHealthMetricsCardComponent
                        title='Top 20 Obese'
                        bmiCategory={3}
                    />
                </div>
            </div>
        </>
    );
}

export default BmiHealthMetricsComponent;
