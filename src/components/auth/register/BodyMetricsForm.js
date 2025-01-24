import React, { useState } from 'react';
import InputGroupV2 from '@/components/InputGroupV2';
import Button from '@/components/Button';
import { useContext } from 'react';
import { RegisterContext } from '@/stores/RegisterContext';
import {
    convertToCm,
    convertToFeet,
    convertToKg,
    convertToLbs,
} from '@/lib/utils';

function BodyMetricsForm() {
    const { nextForm, Yup, setUserData } = useContext(RegisterContext);
    const [error, setError] = useState({});
    const [bodyMetricFormValue, setBodyMetricFormValue] = useState({
        heightImperial: '',
        heightMetric: '',
        weightImperial: '',
        weightMetric: '',
    });
    const rules = Yup.object().shape({
        heightImperial: Yup.string()
            .matches(/^[0-9]*\.?[0-9]+$/, 'Height must be a number!')
            .required('Height is required!'),
        heightMetric: Yup.string()
            .matches(/^[0-9]*\.?[0-9]+$/, 'Height must be a number!')
            .required('Height is required!'),
        weightImperial: Yup.string()
            .matches(/^[0-9]*\.?[0-9]+$/, 'Weight must be a number!')
            .required('Weight is required!'),
        weightMetric: Yup.string()
            .matches(/^[0-9]*\.?[0-9]+$/, 'Weight must be a number!')
            .required('Weight is required!'),
    });

    const handleSubmit = async event => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const object = Object.fromEntries(formData.entries());

        try {
            await rules.validate(object, { abortEarly: false });
            setUserData(prevState => ({ ...prevState, ...object }));
            nextForm();
        } catch (error) {
            const errors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {});
            setError(errors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-2'>
                <div className='col-span-1'>
                    <InputGroupV2
                        label='Height(ft)'
                        type='text'
                        id='heightImperial'
                        name='heightImperial'
                        errorMessage={error.heightImperial}
                        value={bodyMetricFormValue.heightImperial}
                        onChange={event =>
                            setBodyMetricFormValue(prevState => ({
                                ...prevState,
                                heightImperial: event.target.value,
                                heightMetric: convertToCm(event.target.value),
                            }))
                        }
                    />
                </div>
                <div className='col-start-2 col-span-1'>
                    <InputGroupV2
                        label='Height(cm)'
                        type='text'
                        id='heightMetric'
                        name='heightMetric'
                        errorMessage={error.heightMetric}
                        value={bodyMetricFormValue.heightMetric}
                        onChange={event =>
                            setBodyMetricFormValue(prevState => ({
                                ...prevState,
                                heightMetric: event.target.value,
                                heightImperial: convertToFeet(
                                    event.target.value
                                ),
                            }))
                        }
                    />
                </div>
                <div className='col-span-1'>
                    <InputGroupV2
                        label='Weight(lbs)'
                        type='text'
                        id='weightImperial'
                        name='weightImperial'
                        errorMessage={error.weightImperial}
                        value={bodyMetricFormValue.weightImperial}
                        onChange={event =>
                            setBodyMetricFormValue(prevState => ({
                                ...prevState,
                                weightImperial: event.target.value,
                                weightMetric: convertToKg(event.target.value),
                            }))
                        }
                    />
                </div>
                <div className='col-start-2 col-span-1'>
                    <InputGroupV2
                        label='Weight(kg)'
                        type='text'
                        id='weightMetric'
                        name='weightMetric'
                        errorMessage={error.weightMetric}
                        value={bodyMetricFormValue.weightMetric}
                        onChange={event =>
                            setBodyMetricFormValue(prevState => ({
                                ...prevState,
                                weightMetric: event.target.value,
                                weightImperial: convertToLbs(
                                    event.target.value
                                ),
                            }))
                        }
                    />
                </div>
                <div className='col-span-2 flex justify-end py-2'>
                    <Button type='submit'>Next</Button>
                </div>
            </div>
        </form>
    );
}

export default BodyMetricsForm;
