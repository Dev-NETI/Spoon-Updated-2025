import React from 'react';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import CalorieCalculatorForm from '../calculator/CalorieCalculatorForm';

function BodyMetrics() {
    const label = 'Please input your age, height and weight';

    return (
        <div
            className='flex flex-col 
            shadow-2xl border-2'
        >
            <div className='flex items-center justify-center py-2'>
                <AccessibilityIcon
                    color='primary'
                    fontSize='inherit'
                    sx={{ fontSize: '120px' }}
                />
            </div>
            <div className='flex items-center justify-center py-2 px-3'>
                <h1 className='text-lg  font-bold text-blue-700 text-center'>
                    {label}
                </h1>
            </div>
            <div className='flex items-center justify-center py-2'>
                <CalorieCalculatorForm isFirstLogin={true} />
            </div>
        </div>
    );
}

export default BodyMetrics;
