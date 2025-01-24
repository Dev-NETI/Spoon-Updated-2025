import React from 'react';
import Button from '../Button';
import Link from 'next/link';

function ResponseView({
    response,
    successMessage = 'Success!',
    errorMessage = 'Oops! Something went wrong...',
}) {
    const message = response ? successMessage : errorMessage;
    return (
        <>
            <div className='flex text-center p-5'>
                <p className='font-bold text-xl text-blue-700 '>{message}</p>
            </div>
            <div className='flex justify-end py-4'>
                <Link href='/login'>
                    <Button type='button'>Login</Button>
                </Link>
            </div>
        </>
    );
}

export default ResponseView;
