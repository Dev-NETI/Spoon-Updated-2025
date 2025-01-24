import React from 'react';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import CalorieGoalResultComponent from '../calculator/CalorieGoalResultComponent';

function ChooseGoal() {
    const label = 'Choose your goal!';
    return (
        <div
            className='flex flex-col 
            shadow-2xl border-2'
        >
            <div className='flex items-center justify-center py-2'>
                <MonitorWeightIcon
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
            <div className='flex items-center justify-center p-2 md:px-96 lg:px-96'>
                <CalorieGoalResultComponent isFirstLogin={true} />
            </div>
        </div>
    );
}

export default ChooseGoal;
