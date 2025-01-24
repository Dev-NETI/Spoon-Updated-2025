import React, { useEffect, useState } from 'react';
import LogFoodCardComponent from './LogFoodCardComponent';
import { useMealLogItem } from '@/hooks/api/meal-log-item';
import { useAuth } from '@/hooks/auth';

function LogFoodContainer({ setParentState, currentDate }) {
    const { showWith2Parameter: showMealLog } = useMealLogItem();
    const { user } = useAuth({ middleware: 'auth' });
    const [foodLogData, setFoodLogData] = useState({
        allData: [],
        breakfastData: [],
        lunchData: [],
        dinnerData: [],
        snackData: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await showMealLog(user.id, currentDate);
            setFoodLogData(prevState => ({ ...prevState, allData: data }));
        };

        fetchData();
    }, [currentDate]);

    useEffect(() => {
        if (foodLogData.allData) {
            //set parent state
            setParentState(prevState => ({
                ...prevState,
                totalCalories: foodLogData.allData.reduce((acc, data) => {
                    return acc + data.recipe?.calories * data.number_of_serving;
                }, 0),
                totalCarbs: foodLogData.allData.reduce((acc, data) => {
                    return (
                        acc + data.recipe?.carbohydrate * data.number_of_serving
                    );
                }, 0),
                totalProtein: foodLogData.allData.reduce((acc, data) => {
                    return acc + data.recipe?.protein * data.number_of_serving;
                }, 0),
                totalFat: foodLogData.allData.reduce((acc, data) => {
                    return acc + data.recipe?.fat * data.number_of_serving;
                }, 0),
                totalSodium: foodLogData.allData.reduce((acc, data) => {
                    return acc + data.recipe?.sodium * data.number_of_serving;
                }, 0),
                totalFiber: foodLogData.allData.reduce((acc, data) => {
                    return acc + data.recipe?.fiber * data.number_of_serving;
                }, 0),
            }));
            //set parent state end

            setFoodLogData(prevState => ({
                ...prevState,
                breakfastData: foodLogData.allData.filter(
                    data => data.meal_id === 1
                ),
            }));
            setFoodLogData(prevState => ({
                ...prevState,
                lunchData: foodLogData.allData.filter(
                    data => data.meal_id === 2
                ),
            }));
            setFoodLogData(prevState => ({
                ...prevState,
                dinnerData: foodLogData.allData.filter(
                    data => data.meal_id === 3
                ),
            }));
            setFoodLogData(prevState => ({
                ...prevState,
                snackData: foodLogData.allData.filter(
                    data => data.meal_id === 4
                ),
            }));
        }
    }, [foodLogData.allData]);

    let breakfastCalories = 0,
        lunchCalories = 0,
        snackCalories = 0,
        dinnerCalories = 0;
    if (foodLogData.breakfastData) {
        breakfastCalories = foodLogData.breakfastData.reduce((acc, data) => {
            return acc + data.recipe?.calories * data.number_of_serving;
        }, 0);
    }
    if (foodLogData.lunchData) {
        lunchCalories = foodLogData.lunchData.reduce((acc, data) => {
            return acc + data.recipe?.calories * data.number_of_serving;
        }, 0);
    }
    if (foodLogData.snackData) {
        snackCalories = foodLogData.snackData.reduce((acc, data) => {
            return acc + data.recipe?.calories * data.number_of_serving;
        }, 0);
    }
    if (foodLogData.dinnerData) {
        dinnerCalories = foodLogData.dinnerData.reduce((acc, data) => {
            return acc + data.recipe?.calories * data.number_of_serving;
        }, 0);
    }

    return (
        <div
            className='basis-full md:basis-6/12 lg:basis-6/12 
                       border-0 rounded-lg flex flex-col gap-4'
        >
            <LogFoodCardComponent
                title='Breakfast'
                cardClassName='bg-green-500'
                consumedCalories={breakfastCalories}
                mealId={1}
                data={foodLogData.breakfastData}
            />
            <LogFoodCardComponent
                title='Lunch'
                cardClassName='bg-orange-500'
                consumedCalories={lunchCalories}
                mealId={2}
                data={foodLogData.lunchData}
            />
            <LogFoodCardComponent
                title='Snacks'
                cardClassName='bg-sky-600'
                consumedCalories={snackCalories}
                mealId={4}
                data={foodLogData.snackData}
            />
            <LogFoodCardComponent
                title='Dinner'
                cardClassName='bg-indigo-700'
                consumedCalories={dinnerCalories}
                mealId={3}
                data={foodLogData.dinnerData}
            />
        </div>
    );
}

export default LogFoodContainer;
