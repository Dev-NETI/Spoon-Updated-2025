import React, { useEffect, useState } from 'react';
import ProgressBarWLabel from '@/components/ProgressBarWLabel';
import { useDietaryReferenceValue } from '@/hooks/api/dietary-reference-value';
import { counter } from '@/lib/utils';
import { useAuth } from '@/hooks/auth';

function NutrientCalculatorResultComponent({ data }) {
    const { index } = useDietaryReferenceValue();
    const [driData, setDriData] = useState();
    const { user } = useAuth({ middleware: 'auth' });
    const [counterState, setCounterState] = useState({
        totalCalorie: 0,
        totalCarbs: 0,
        totalProtein: 0,
        totalFat: 0,
        totalSodium: 0,
        totalFiber: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await index();
            setDriData(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const totalCalorieCounter = counter(
            setCounterState,
            'totalCalorie',
            data.totalCalories,
            0.000001
        );
        const totalCarbsCounter = counter(
            setCounterState,
            'totalCarbs',
            data.totalCarbs,
            0.000001
        );
        const totalProteinCounter = counter(
            setCounterState,
            'totalProtein',
            data.totalProtein,
            0.000001
        );
        const totalFatCounter = counter(
            setCounterState,
            'totalFat',
            data.totalFat,
            0.000001
        );
        const totalSodiumCounter = counter(
            setCounterState,
            'totalSodium',
            data.totalSodium,
            0.000001
        );
        const totalFiberCounter = counter(
            setCounterState,
            'totalFiber',
            data.totalFiber,
            0.000001
        );

        return () => {
            clearInterval(totalCalorieCounter);
            clearInterval(totalCarbsCounter);
            clearInterval(totalProteinCounter);
            clearInterval(totalFatCounter);
            clearInterval(totalSodiumCounter);
            clearInterval(totalFiberCounter);
        };
    }, [data]);

    let calorieIntake =
        data.totalCalories > 0 ? counterState.totalCalorie : data.totalCalories;

    return (
        <div
            className='basis-full md:basis-6/12 lg:basis-6/12
            border-0 rounded-lg bg-blue-700 shadow-lg
            flex flex-row gap-4 h-4/6'
        >
            <div className='basis-6/12 flex flex-col justify-center items-center px-5'>
                <p className='text-slate-100 font-bold text-3xl'>
                    {calorieIntake}
                </p>
                <ProgressBarWLabel
                    label='Calorie Intake'
                    labelClassName='text-amber-500'
                    progressClassName='bg-amber-500'
                    value={calorieIntake}
                    appropriateValue={user.calorie_intake}
                    defaultUnit='cal'
                />
            </div>
            <div className='basis-6/12 flex flex-col justify-center  px-5 py-4'>
                <ProgressBarWLabel
                    label='Carbs'
                    labelClassName='text-green-500'
                    progressClassName='bg-green-500'
                    value={
                        data.totalCarbs > 0
                            ? counterState.totalCarbs
                            : data.totalCarbs
                    }
                    appropriateValue={
                        data.totalCarbs !== 0 ? driData.carbohydrate : 0
                    }
                />
                <ProgressBarWLabel
                    label='Protein'
                    labelClassName='text-orange-500'
                    progressClassName='bg-orange-500'
                    value={
                        data.totalProtein > 0
                            ? counterState.totalProtein
                            : data.totalProtein
                    }
                    appropriateValue={
                        data.totalProtein !== 0 ? driData.protein : 0
                    }
                />
                <ProgressBarWLabel
                    label='Fat'
                    labelClassName='text-cyan-500'
                    progressClassName='bg-cyan-500'
                    value={
                        data.totalFat > 0
                            ? counterState.totalFat
                            : data.totalFat
                    }
                    appropriateValue={data.totalFat !== 0 ? driData.fat : 0}
                />
                <ProgressBarWLabel
                    label='Sodium'
                    labelClassName='text-violet-500'
                    progressClassName='bg-violet-500'
                    value={
                        data.totalSodium > 0
                            ? counterState.totalSodium
                            : data.totalSodium
                    }
                    appropriateValue={
                        data.totalSodium !== 0 ? driData.sodium : 0
                    }
                />
                <ProgressBarWLabel
                    label='Fiber'
                    labelClassName='text-fuchsia-700'
                    progressClassName='bg-fuchsia-600'
                    value={
                        data.totalFiber > 0
                            ? counterState.totalFiber
                            : data.totalFiber
                    }
                    appropriateValue={data.totalFiber !== 0 ? driData.fiber : 0}
                />
            </div>
        </div>
    );
}

export default NutrientCalculatorResultComponent;
