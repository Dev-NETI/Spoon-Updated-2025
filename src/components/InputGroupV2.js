import React from 'react';
import Label from './Label';
import Input from './Input';
import RedBadge from './RedBadge';

function InputGroupV2({ label, errorMessage = null, ...props }) {
    let labelStyle = errorMessage && ' text-red-800 ';
    let inputStyle = errorMessage && ' border-red-800 ';

    return (
        <>
            <Label htmlFor='name' className={`${labelStyle} `}>
                {label}
            </Label>

            <Input className={`${inputStyle} block mt-1 w-full`} {...props} />

            {errorMessage && <RedBadge message={errorMessage} />}
        </>
    );
}

export default InputGroupV2;
