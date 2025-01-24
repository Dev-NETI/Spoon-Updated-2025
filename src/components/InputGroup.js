import React from 'react';
import ErrorBadge from './ErrorBadge';

function InputGroup({
    editMode = false,
    title,
    initialValue,
    className,
    error = null,
    errorMessage = 'error',
    ...props
}) {
    let inputErrorStyle = error && 'border border-red-500';
    let titleErrorStyle = error ? ' text-red-500 ' : ' text-gray-700 ';
    return (
        <div className={`${className} bg-gray-200 p-2`}>
            <p className={`${titleErrorStyle} text-sm `}>{title}</p>
            {!editMode && (
                <p className=' text-lg text-slate-800'>{initialValue}</p>
            )}
            {editMode && (
                <input
                    value={initialValue}
                    className={`${inputErrorStyle} w-32 bg-gray-200 text-lg `}
                    {...props}
                />
            )}
            {error && (
                <>
                    <br />
                    <ErrorBadge message={errorMessage} />
                </>
            )}
        </div>
    );
}

export default InputGroup;
