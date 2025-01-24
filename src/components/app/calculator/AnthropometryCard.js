import React, { useEffect, useState } from 'react';
import AnthropometryInputComponent from './AnthropometryInputComponent';
import Button from '@/components/Button';
import { useAuth } from '@/hooks/auth';
import { calculateBMI } from '@/lib/utils';
import * as Yup from 'yup';
import { useUserHook } from '@/hooks/api/user';
import { useBmiLog } from '@/hooks/api/bmi-log';
import { useToast } from '@/components/ui/use-toast';

function AnthropometryCard({ bmi, setBmi }) {
    const [editMode, setEditMode] = useState(false);
    const { user } = useAuth();
    const [measurements, setMeasurements] = useState({
        heightImperial: user.height_imperial,
        heightMetric: user.height_metric,
        weightImperial: user.weight_imperial,
        weightMetric: user.weight_metric,
    });
    const [error, setError] = useState({});
    const { patch } = useUserHook('user/update-measurement');
    const { toast } = useToast();
    const { store } = useBmiLog();
    const buttonLabel = editMode ? 'Cancel' : 'Edit';
    const buttonStyle = editMode && 'bg-red-700';
    const rules = Yup.object().shape({
        heightImperial: Yup.string().required('Height is required!'),
        weightImperial: Yup.string().required('Weight is required!'),
        heightMetric: Yup.string().required('Height is required!'),
        weightMetric: Yup.string().required('Weight is required!'),
    });

    useEffect(() => {
        setBmi(
            calculateBMI(
                measurements.heightImperial,
                measurements.heightMetric,
                measurements.weightMetric,
                measurements.weightImperial
            )
        );
    }, [measurements]);

    const handleSubmit = async event => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const object = Object.fromEntries(formData.entries());
        object.bmi = bmi;
        object.userId = user.id;

        try {
            await rules.validate(object, { abortEarly: false });
            const { data: updateResponse } = await patch(user.slug, object);

            if (!updateResponse) {
                return toast({
                    title: 'Oops!',
                    description: 'Something went wrong!',
                    variant: 'destructive',
                    position: 'top-right',
                });
            }

            const { data: storeResponse } = await store(object);

            if (!storeResponse) {
                return toast({
                    title: 'Oops!',
                    description: 'Something went wrong!',
                    variant: 'destructive',
                    position: 'top-right',
                });
            }

            toast({
                title: 'Success',
                description: 'Measurements saved successfully!',
                position: 'top-right',
            });
            setEditMode(false);
        } catch (error) {
            const errors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {});
            setError(errors);
        }
    };

    return (
        <div
            className='basis-full md:basis-6/12 lg:basis-6/12 
            border-0 rounded-lg bg-gray-50 shadow-lg 
            flex flex-col'
        >
            <div className='basis-full p-4'>
                <Button
                    type='button'
                    className={`${buttonStyle} float-end`}
                    onClick={() => setEditMode(!editMode)}
                >
                    {buttonLabel}
                </Button>
            </div>

            <div className='basis-full flex flex-row gap-4'>
                <AnthropometryInputComponent
                    title='Standard'
                    heightLabel='Height(ft)'
                    height={measurements.heightImperial}
                    weightLabel='Weight(lbs)'
                    weight={measurements.weightImperial}
                    editMode={editMode}
                    form='editForm'
                    heightInputName='heightImperial'
                    weightInputName='weightImperial'
                    onChangeMethod={setMeasurements}
                    heightErrorMessage={error.heightImperial}
                    weightErrorMessage={error.weightImperial}
                />
                <AnthropometryInputComponent
                    title='Metric'
                    heightLabel='Height(cm)'
                    height={measurements.heightMetric}
                    weightLabel='Weight(kg)'
                    weight={measurements.weightMetric}
                    editMode={editMode}
                    form='editForm'
                    heightInputName='heightMetric'
                    weightInputName='weightMetric'
                    onChangeMethod={setMeasurements}
                    heightErrorMessage={error.heightMetric}
                    weightErrorMessage={error.weightMetric}
                />
            </div>

            {editMode && (
                <div className='flex justify-end p-2'>
                    <form id='editForm' onSubmit={handleSubmit}>
                        <Button>Save</Button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AnthropometryCard;
