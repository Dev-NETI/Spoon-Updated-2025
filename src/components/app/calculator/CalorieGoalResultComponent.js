import React, { useState } from 'react';
import CalorieIntakeItem from '@/components/app/calculator/CalorieIntakeItem';
import { motion } from 'framer-motion';
import { calculateTDEE } from '@/lib/utils';
import { CalorieCalculatorContext } from '@/stores/CalorieCalculatorContext';
import { useContext } from 'react';
import Button from '@/components/Button';
import ErrorBadge from '@/components/ErrorBadge';
import * as Yup from 'yup';
import { useUserHook } from '@/hooks/api/user';
import { useToast } from '@/components/ui/use-toast';
import { AccountSetupContext } from '@/stores/AccountSetupContext';

function CalorieGoalResultComponent({ isFirstLogin = false }) {
    const { patch: updateCalorieIntake } = useUserHook(
        'user/update-calorie-intake'
    );
    const { toast } = useToast();
    let formDataState,
        user,
        setShowGoalComponent,
        setFormDataState,
        handleNextView;
    if (isFirstLogin) {
        ({ user, formDataState, setFormDataState, handleNextView } =
            useContext(AccountSetupContext));
    } else {
        ({ formDataState, user, setShowGoalComponent, setFormDataState } =
            useContext(CalorieCalculatorContext));
    }

    const [error, setError] = useState({});
    const rules = Yup.object().shape({
        radioCalorieGoal: Yup.string().required(
            'Please select a calorie intake goal!'
        ),
    });

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const object = Object.fromEntries(formData.entries());

        try {
            await rules.validate(object, { abortEarly: false });

            const { data: updateResponse } = await updateCalorieIntake(
                user.slug,
                object
            );

            if (!isFirstLogin) {
                if (!updateResponse) {
                    setShowGoalComponent(false);
                    return toast({
                        title: 'Oops!',
                        description: 'Something went wrong!',
                        variant: 'destructive',
                        position: 'top-right',
                    });
                }

                setShowGoalComponent(false);
                setFormDataState(prevState => ({
                    ...prevState,
                    calorieIntake: object.radioCalorieGoal,
                }));
                toast({
                    title: 'Success',
                    description: 'Calorie Intake updated successfully!',
                    position: 'top-right',
                });
            } else {
                if (updateResponse) {
                    setFormDataState(prevState => ({
                        ...prevState,
                        calorieIntake: object.radioCalorieGoal,
                    }));
                    handleNextView();
                }
            }
        } catch (error) {
            const errors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {});
            setError(errors);
        }
    }
    return (
        <motion.div
            className='basis-full border-0 rounded-lg bg-gray-50 shadow-lg
                   flex flex-col gap-4 p-5'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: 'easeIn', duration: 1 }}
        >
            {!isFirstLogin && (
                <div className='flex items-center justify-center'>
                    <h1 className='text-stone-800 font-semibold text-xl'>
                        Please select your goal
                    </h1>
                </div>
            )}

            {error.radioCalorieGoal && (
                <ErrorBadge message={error.radioCalorieGoal} />
            )}
            <CalorieIntakeItem
                description={`Maintain weight: ${
                    calculateTDEE(
                        formDataState.age,
                        formDataState.gender,
                        formDataState.heightMetric,
                        formDataState.weightMetric,
                        formDataState.activityLevelMultiplier
                    ).maintainWeight
                } Calories/Day`}
                className='bg-green-900'
                form='formCalories'
                name='radioCalorieGoal'
                value={calculateTDEE(
                    formDataState.age,
                    formDataState.gender,
                    formDataState.heightMetric,
                    formDataState.weightMetric,
                    formDataState.activityLevelMultiplier
                ).maintainWeight.toFixed(2)}
            />
            <CalorieIntakeItem
                description={`Mild weight loss: ${
                    calculateTDEE(
                        formDataState.age,
                        formDataState.gender,
                        formDataState.heightMetric,
                        formDataState.weightMetric,
                        formDataState.activityLevelMultiplier
                    ).mildWeightLoss
                } Calories/Day`}
                className='bg-yellow-600'
                form='formCalories'
                name='radioCalorieGoal'
                value={calculateTDEE(
                    formDataState.age,
                    formDataState.gender,
                    formDataState.heightMetric,
                    formDataState.weightMetric,
                    formDataState.activityLevelMultiplier
                ).mildWeightLoss.toFixed(2)}
            />
            <CalorieIntakeItem
                description={`Weight loss: ${
                    calculateTDEE(
                        formDataState.age,
                        formDataState.gender,
                        formDataState.heightMetric,
                        formDataState.weightMetric,
                        formDataState.activityLevelMultiplier
                    ).weightLoss
                } Calories/Day`}
                className='bg-green-700'
                form='formCalories'
                name='radioCalorieGoal'
                value={calculateTDEE(
                    formDataState.age,
                    formDataState.gender,
                    formDataState.heightMetric,
                    formDataState.weightMetric,
                    formDataState.activityLevelMultiplier
                ).weightLoss.toFixed(2)}
            />
            <CalorieIntakeItem
                description={`Aggressive weight loss: ${
                    calculateTDEE(
                        formDataState.age,
                        formDataState.gender,
                        formDataState.heightMetric,
                        formDataState.weightMetric,
                        formDataState.activityLevelMultiplier
                    ).aggressiveWeightLoss
                } Calories/Day`}
                className='bg-red-800'
                form='formCalories'
                name='radioCalorieGoal'
                value={calculateTDEE(
                    formDataState.age,
                    formDataState.gender,
                    formDataState.heightMetric,
                    formDataState.weightMetric,
                    formDataState.activityLevelMultiplier
                ).aggressiveWeightLoss.toFixed(2)}
            />
            <CalorieIntakeItem
                description={`Mild weight gain: ${
                    calculateTDEE(
                        formDataState.age,
                        formDataState.gender,
                        formDataState.heightMetric,
                        formDataState.weightMetric,
                        formDataState.activityLevelMultiplier
                    ).mildWeightGain
                } Calories/Day`}
                className='bg-yellow-600'
                form='formCalories'
                name='radioCalorieGoal'
                value={calculateTDEE(
                    formDataState.age,
                    formDataState.gender,
                    formDataState.heightMetric,
                    formDataState.weightMetric,
                    formDataState.activityLevelMultiplier
                ).mildWeightGain.toFixed(2)}
            />
            <CalorieIntakeItem
                description={`Weight gain: ${
                    calculateTDEE(
                        formDataState.age,
                        formDataState.gender,
                        formDataState.heightMetric,
                        formDataState.weightMetric,
                        formDataState.activityLevelMultiplier
                    ).weightGain
                } Calories/Day`}
                className='bg-green-700'
                form='formCalories'
                name='radioCalorieGoal'
                value={calculateTDEE(
                    formDataState.age,
                    formDataState.gender,
                    formDataState.heightMetric,
                    formDataState.weightMetric,
                    formDataState.activityLevelMultiplier
                ).weightGain.toFixed(2)}
            />
            <CalorieIntakeItem
                description={`Aggresive weight gain: ${
                    calculateTDEE(
                        formDataState.age,
                        formDataState.gender,
                        formDataState.heightMetric,
                        formDataState.weightMetric,
                        formDataState.activityLevelMultiplier
                    ).aggressiveWeightGain
                } Calories/Day`}
                className='bg-red-800'
                form='formCalories'
                name='radioCalorieGoal'
                value={calculateTDEE(
                    formDataState.age,
                    formDataState.gender,
                    formDataState.heightMetric,
                    formDataState.weightMetric,
                    formDataState.activityLevelMultiplier
                ).aggressiveWeightGain.toFixed(2)}
            />
            <form
                id='formCalories'
                onSubmit={handleSubmit}
                className='flex justify-end items-center'
            >
                <Button form='formCalories'>
                    {isFirstLogin ? 'Next' : 'Save'}
                </Button>
            </form>
        </motion.div>
    );
}

export default CalorieGoalResultComponent;
