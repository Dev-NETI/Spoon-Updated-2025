'use client';
import React, { useState } from 'react';
import { CalorieCalculatorContext } from '@/stores/CalorieCalculatorContext';
import CalorieCalculatorForm from '@/components/app/calculator/CalorieCalculatorForm';
import { useAuth } from '@/hooks/auth';
import CalorieGoalResultComponent from '@/components/app/calculator/CalorieGoalResultComponent';

function Calorie() {
    const { user } = useAuth({ middleware: 'auth' });
    const [isEdit, setIsEdit] = useState(false);
    const [showGoalComponent, setShowGoalComponent] = useState(false);
    const [formDataState, setFormDataState] = useState({
        calorieIntake: user.calorie_intake,
        age: user.age,
        gender: user.gender_id,
        heightImperial: user.height_imperial,
        heightMetric: user.height_metric,
        weightImperial: user.weight_imperial,
        weightMetric: user.weight_metric,
        activityLevelId: user.activity_level_id,
        activityLevel: user.activity_level?.name,
        activityLevelMultiplier: user.activity_level?.multiplier,
        dateOfBirth: user.date_of_birth,
        updateResponse: null,
    });

    return (
        <CalorieCalculatorContext.Provider
            value={{
                isEdit,
                setIsEdit,
                user,
                formDataState,
                setFormDataState,
                setShowGoalComponent,
            }}
        >
            <div className='gap-2 p-5 flex flex-col md:flex-row lg:flex-row'>
                {showGoalComponent && <CalorieGoalResultComponent />}
                {!showGoalComponent && <CalorieCalculatorForm />}
            </div>
        </CalorieCalculatorContext.Provider>
    );
}

export default Calorie;
