import React from 'react';
import Button from '@/components/Button';
import { AccountSetupContext } from '@/stores/AccountSetupContext';
import { useContext } from 'react';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { useUserHook } from '@/hooks/api/user';

function Result() {
    const { user, handleNextView, formDataState } =
        useContext(AccountSetupContext);
    const label = `Your goal is ${formDataState.calorieIntake} calories daily!`;
    const { patchNoPayload: updateFirstLogin } = useUserHook(
        'user/update-first-login'
    );

    const handleUpdateFirstLogin = async () => {
        const { data: updateResponse } = await updateFirstLogin(user.slug);
        if (updateResponse) {
            handleNextView();
        }
    };

    return (
        <div
            className='flex flex-col  
        px-3 gap-4 
        md:py-64 lg:py-64 md:gap-8 lg:gap-8 
        shadow-2xl border-2'
        >
            <div className='flex items-center justify-center mt-52'>
                <FastfoodIcon
                    color='primary'
                    fontSize='inherit'
                    sx={{ fontSize: '120px' }}
                />
            </div>
            <div className='flex items-center justify-center'>
                <h1 className='text-2xl md:text-4xl lg:text-4xl font-bold text-blue-700 text-center'>
                    {label}
                </h1>
            </div>
            <div className='flex justify-end mt-32 mb-4 md:mx-72 lg:mx-72'>
                <Button onClick={handleUpdateFirstLogin}>Go to recipe</Button>
            </div>
        </div>
    );
}

export default Result;
