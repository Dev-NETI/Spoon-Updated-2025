import React, { useState } from 'react';
import InputGroupV2 from '@/components/InputGroupV2';
import Button from '@/components/Button';
import * as Yup from 'yup';
import { useContext } from 'react';
import { BloodPressureContext } from '@/stores/BloodPressureContext';
import { computeBloodPressure } from '@/lib/utils';
import { useAuth } from '@/hooks/auth';
import { useBloodPressure } from '@/hooks/api/blood-pressure';
import { useToast } from '@/components/ui/use-toast';

function BloodPressureTrackerForm() {
    const [error, setError] = useState({});
    const { setBloodPressureCategory } = useContext(BloodPressureContext);
    const { user } = useAuth();
    const { store } = useBloodPressure();
    const { toast } = useToast();
    const rules = Yup.object().shape({
        systolic: Yup.number()
            .typeError('Systolic must be a number')
            .integer('Systolic must be an integer')
            .required('Systolic is required!'),
        diastolic: Yup.number()
            .typeError('Diastolic must be a number')
            .integer('Diastolic must be an integer')
            .required('Diastolic is required!'),
    });

    const handleSubmit = async event => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const object = Object.fromEntries(formData.entries());
        object.userId = user.id;

        try {
            await rules.validate(object, { abortEarly: false });

            setBloodPressureCategory(
                computeBloodPressure(object.systolic, object.diastolic)
            );
            const { data: storeResponse } = await store(object);

            storeResponse
                ? toast({
                      title: 'Sucess',
                      description: 'Blood Pressure saved!',
                      position: 'top-right',
                  })
                : toast({
                      title: 'Oops!',
                      description: 'Something went wrong!',
                      variant: 'destructive',
                      position: 'top-right',
                  });
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
            flex flex-col gap-4 p-4 md:px-36 md:py-4 lg:px-36 lg:py-4'
        >
            <form onSubmit={handleSubmit}>
                <InputGroupV2
                    label='Systolic'
                    type='text'
                    name='systolic'
                    id='systolic'
                    errorMessage={error.systolic}
                />
                <InputGroupV2
                    label='Diastolic'
                    type='text'
                    name='diastolic'
                    id='diastolic'
                    errorMessage={error.diastolic}
                />
                <div className='flex justify-end py-2'>
                    <Button>Compute</Button>
                </div>
            </form>
        </div>
    );
}

export default BloodPressureTrackerForm;
