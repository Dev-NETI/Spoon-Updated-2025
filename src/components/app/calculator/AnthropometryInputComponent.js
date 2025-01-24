import React from 'react';
import {
    convertToCm,
    convertToFeet,
    convertToKg,
    convertToLbs,
} from '@/lib/utils';
import ErrorBadge from '@/components/ErrorBadge';

function AnthropometryInputComponent({
    title,
    heightLabel,
    height,
    weightLabel,
    weight,
    editMode,
    form,
    heightInputName,
    weightInputName,
    onChangeMethod,
    heightErrorMessage = null,
    weightErrorMessage = null,
}) {
    return (
        <div className='basis-6/12 flex flex-col gap-4 p-2'>
            <p className='basis-full font-semibold text-gray-700'>{title}</p>
            <div className='basis-full bg-gray-200 p-4'>
                <p className=' text-sm text-gray-700'>{heightLabel}</p>
                {!editMode && (
                    <p className=' text-xl text-slate-800'>{height}</p>
                )}
                {editMode && (
                    <div className='flex flex-col gap-1'>
                        <input
                            type='text'
                            className='bg-gray-200 w-12'
                            form={form}
                            value={height}
                            id={heightInputName}
                            name={heightInputName}
                            onChange={event =>
                                onChangeMethod(prevState => ({
                                    ...prevState,
                                    [heightInputName]: event.target.value,
                                    [heightInputName === 'heightImperial'
                                        ? 'heightMetric'
                                        : 'heightImperial']:
                                        heightInputName === 'heightImperial'
                                            ? convertToCm(event.target.value)
                                            : convertToFeet(event.target.value),
                                }))
                            }
                        />
                        {heightErrorMessage && (
                            <ErrorBadge message={heightErrorMessage} />
                        )}
                    </div>
                )}
            </div>
            <div className='basis-full bg-gray-200 p-4'>
                <p className=' text-sm text-gray-700'>{weightLabel}</p>
                {!editMode && (
                    <p className=' text-xl text-slate-800'>{weight}</p>
                )}
                {editMode && (
                    <div className='flex flex-col gap-1'>
                        <input
                            type='text'
                            className='bg-gray-200 w-12'
                            form={form}
                            value={weight}
                            id={weightInputName}
                            name={weightInputName}
                            onChange={event =>
                                onChangeMethod(prevState => ({
                                    ...prevState,
                                    [weightInputName]: event.target.value,
                                    [weightInputName === 'weightImperial'
                                        ? 'weightMetric'
                                        : 'weightImperial']:
                                        weightInputName === 'weightImperial'
                                            ? convertToKg(event.target.value)
                                            : convertToLbs(event.target.value),
                                }))
                            }
                        />
                        {weightErrorMessage && (
                            <ErrorBadge message={weightErrorMessage} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AnthropometryInputComponent;
