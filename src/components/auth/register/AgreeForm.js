import React, { useState } from 'react';
import Button from '@/components/Button';
import { useContext } from 'react';
import { RegisterContext } from '@/stores/RegisterContext';
import { useUserHook } from '@/hooks/api/user';

function AgreeForm() {
    const description =
        'Your sign in with email address wil be used to forward critical account and security updates to your personal email. ' +
        'Please ensure this connection remains activated in order to receive these messages.';
    const agreeDescription =
        "I agree to Spoon's Terms and Conditions and Privacy Policy.";
    const { nextForm, userData, setRegistrationState } =
        useContext(RegisterContext);
    const [disabled, setDisabled] = useState(true);
    const { store: storeUser } = useUserHook();

    const store = async () => {
        const { data } = await storeUser(userData);
        setRegistrationState(prevState => ({
            ...prevState,
            storeResponse: data,
        }));
        nextForm();
    };

    return (
        <>
            <div className='flex items-center justify-center p-3'>
                <p className='text-lg font-semibold text-stone-800 text-justify'>
                    {description}
                </p>
            </div>
            <div className='flex items-center justify-center p-3'>
                <input
                    type='checkbox'
                    className='mr-2'
                    onChange={() => setDisabled(!disabled)}
                />
                <p className='text-sm italic text-stone-500 text-center'>
                    {agreeDescription}
                </p>
            </div>
            <div className='flex justify-end py-4'>
                <Button
                    type='button'
                    onClick={() => store()}
                    disabled={disabled}
                >
                    Register
                </Button>
            </div>
        </>
    );
}

export default AgreeForm;
