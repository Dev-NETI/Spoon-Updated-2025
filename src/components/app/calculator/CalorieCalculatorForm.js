import React, { useEffect, useState } from 'react';
import InputGroup from '@/components/InputGroup';
import Button from '@/components/Button';
import SelectGroup from '@/components/SelectGroup';
import * as Yup from 'yup';
import { useContext } from 'react';
import { CalorieCalculatorContext } from '@/stores/CalorieCalculatorContext';
import { gender } from '@/data/static-data';
import { useActivityLevel } from '@/hooks/api/activity-level';
import { Skeleton } from '@mui/material';
import {
    computeAge,
    convertToCm,
    convertToFeet,
    convertToKg,
    convertToLbs,
} from '@/lib/utils';
import { useUserHook } from '@/hooks/api/user';
import { motion } from 'framer-motion';
import { AccountSetupContext } from '@/stores/AccountSetupContext';

function CalorieCalculatorForm({ isFirstLogin = false }) {
    const { index: getAllActivityLevel } = useActivityLevel();
    const [error, setError] = useState({});
    const [activityLevelData, setActivityLevelData] = useState([]);
    const [loading, setLoading] = useState(true);
    let user,
        formDataState,
        setFormDataState,
        setShowGoalComponent,
        isEdit = true,
        setIsEdit,
        handleNextView;
    if (isFirstLogin) {
        ({ user, formDataState, setFormDataState, handleNextView } =
            useContext(AccountSetupContext));
    } else {
        ({
            isEdit,
            setIsEdit,
            user,
            formDataState,
            setFormDataState,
            setShowGoalComponent,
        } = useContext(CalorieCalculatorContext));
    }

    const { patch: updateUserData } = useUserHook('user/update-data');
    const rules = Yup.object().shape({
        age: Yup.number()
            .required('Age is required!')
            .min(18, 'Age must be at least 18!'),
        gender: Yup.string().required('Gender is required!'),
        heightStandard: Yup.string().required('Height is required!'),
        heightMetric: Yup.string().required('Height is required!'),
        weightStandard: Yup.string().required('Weight is required!'),
        weightMetric: Yup.string().required('Weight is required!'),
        activityLevel: Yup.string().required('Activity Level is required!'),
        dateOfBirth: Yup.string().required('Date of Birth is required!'),
    });

    useEffect(() => {
        const fetchActivityLevelData = async () => {
            const { data } = await getAllActivityLevel();
            setActivityLevelData(data);
            setLoading(false);
        };

        fetchActivityLevelData();
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const object = Object.fromEntries(formData.entries());

        try {
            await rules.validate(object, { abortEarly: false });

            const { data: updateResponse } = await updateUserData(
                user.slug,
                object
            );

            if (!isFirstLogin) {
                if (updateResponse) {
                    setShowGoalComponent(true);
                    setFormDataState(prevState => ({
                        ...prevState,
                        updateResponse: updateResponse,
                    }));
                }
                setIsEdit(false);
            } else {
                if (updateResponse) {
                    setFormDataState(prevState => ({
                        ...prevState,
                        age: object.age,
                        gender: object.gender,
                        heightImperial: object.heightStandard,
                        heightMetric: object.heightMetric,
                        weightImperial: object.weightStandard,
                        weightMetric: object.weightMetric,
                        activityLevelId: object.activityLevel,
                        dateOfBirth: object.dateOfBirth,
                    }));
                    handleNextView();
                    // console.log(updateResponse);
                }
            }
        } catch (error) {
            const errors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {});
            setError(errors);
        }
    };

    let ui = loading ? (
        <div className='basis-full border-0 rounded-lg bg-gray-50 shadow-lg p-5 flex flex-col gap-6'>
            <div className='flex justify-end'>
                <Skeleton className='h-10 w-10  rounded-full' />
            </div>
            <Skeleton className='w-full h-10 rounded-full' />
            <Skeleton className='w-full h-10 rounded-full' />
            <Skeleton className='w-full h-10 rounded-full' />
            <div className='flex flex-row gap-2'>
                <Skeleton className='w-full h-10 rounded-full' />
                <Skeleton className='w-full h-10 rounded-full' />
            </div>
            <div className='flex flex-row gap-2'>
                <Skeleton className='w-full h-10 rounded-full' />
                <Skeleton className='w-full h-10 rounded-full' />
            </div>
            <Skeleton className='w-full h-10 rounded-full' />
        </div>
    ) : (
        <form onSubmit={handleSubmit}>
            <motion.div
                className='basis-full border-0 rounded-lg bg-gray-50 shadow-lg
        grid grid-cols-2 gap-4 p-5'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: 'easeIn', duration: 1 }}
            >
                {!isFirstLogin && (
                    <>
                        <div className='col-span-2 flex justify-end '>
                            <Button
                                type='button'
                                onClick={() => {
                                    setIsEdit(!isEdit);
                                    setError({});
                                }}
                            >
                                {isEdit ? 'Cancel' : 'Edit'}
                            </Button>
                        </div>
                        <InputGroup
                            editMode={false}
                            name='calorieIntake'
                            type='text'
                            title='Current Calorie Intake'
                            initialValue={formDataState.calorieIntake}
                            className='col-span-2'
                        />
                    </>
                )}
                <InputGroup
                    editMode={isEdit}
                    name='dateOfBirth'
                    type='date'
                    title='Date of Birth'
                    initialValue={formDataState.dateOfBirth}
                    className='col-span-1'
                    error={error.dateOfBirth}
                    errorMessage={error.dateOfBirth}
                    onChange={event =>
                        setFormDataState(prevState => ({
                            ...prevState,
                            age: computeAge(event.target.value),
                            dateOfBirth: event.target.value,
                        }))
                    }
                    autoFocus
                />
                <InputGroup
                    editMode={isEdit}
                    name='age'
                    type='text'
                    title='Age'
                    initialValue={formDataState.age}
                    className='col-span-1'
                    error={error.age}
                    errorMessage={error.age}
                    readOnly
                />
                <SelectGroup
                    data={gender}
                    editMode={isEdit}
                    name='gender'
                    title='Gender'
                    initialValue={
                        formDataState.gender === 1 ? 'Male' : 'Female'
                    }
                    className='col-span-2'
                    error={error.gender}
                    errorMessage={error.gender}
                    onChange={event =>
                        setFormDataState(prevState => ({
                            ...prevState,
                            gender: event.target.value,
                        }))
                    }
                />
                <InputGroup
                    editMode={isEdit}
                    name='heightStandard'
                    type='text'
                    title='Height(ft)'
                    initialValue={formDataState.heightImperial}
                    className='col-span-1'
                    error={error.heightStandard}
                    errorMessage={error.heightStandard}
                    onChange={event =>
                        setFormDataState(prevState => ({
                            ...prevState,
                            heightMetric: convertToCm(event.target.value),
                            heightImperial: event.target.value,
                        }))
                    }
                />
                <InputGroup
                    editMode={isEdit}
                    name='heightMetric'
                    type='text'
                    title='Height(cm)'
                    initialValue={formDataState.heightMetric}
                    className='col-span-1'
                    error={error.heightMetric}
                    errorMessage={error.heightMetric}
                    onChange={event =>
                        setFormDataState(prevState => ({
                            ...prevState,
                            heightImperial: convertToFeet(event.target.value),
                            heightMetric: event.target.value,
                        }))
                    }
                />
                <InputGroup
                    editMode={isEdit}
                    name='weightStandard'
                    type='text'
                    title='Weight(lbs)'
                    initialValue={formDataState.weightImperial}
                    className='col-span-1'
                    error={error.weightStandard}
                    errorMessage={error.weightStandard}
                    onChange={event =>
                        setFormDataState(prevState => ({
                            ...prevState,
                            weightMetric: convertToKg(event.target.value),
                            weightImperial: event.target.value,
                        }))
                    }
                />
                <InputGroup
                    editMode={isEdit}
                    name='weightMetric'
                    type='text'
                    title='Weight(kg)'
                    initialValue={formDataState.weightMetric}
                    className='col-span-1'
                    error={error.weightMetric}
                    errorMessage={error.weightMetric}
                    onChange={event =>
                        setFormDataState(prevState => ({
                            ...prevState,
                            weightImperial: convertToLbs(event.target.value),
                            weightMetric: event.target.value,
                        }))
                    }
                />
                <SelectGroup
                    data={activityLevelData}
                    editMode={isEdit}
                    name='activityLevel'
                    type='text'
                    title='Activity Level'
                    initialValue={formDataState.activityLevel}
                    className='col-span-2'
                    error={error.activityLevel}
                    errorMessage={error.activityLevel}
                    onChange={event =>
                        setFormDataState(prevState => ({
                            ...prevState,
                            activityLevelId: event.target.value,
                            activityLevel: activityLevelData.find(
                                data => data.id === parseInt(event.target.value)
                            ).name,
                            activityLevelMultiplier: activityLevelData.find(
                                data => data.id === parseInt(event.target.value)
                            ).multiplier,
                        }))
                    }
                />
                <div className='col-span-2 '>
                    {isEdit && (
                        <Button
                            type='submit'
                            className='w-full rounded-full flex items-center justify-center'
                        >
                            {isFirstLogin ? 'Next' : 'Compute Energy Intake'}
                        </Button>
                    )}
                </div>
            </motion.div>
        </form>
    );

    return ui;
}

export default CalorieCalculatorForm;
