'use client';
import React, { useState } from 'react';
import NutrientCalculatorResultComponent from '@/components/app/calculator/NutrientCalculatorResultComponent';
import LogFoodContainer from '@/components/app/calculator/LogFoodContainer';
import { DatePicker } from '@/components/ui/date-picker';
import { getCurrentDate } from '@/lib/utils';

function page() {
    const [foodData, setFoodData] = useState({
        totalCalories: 0,
        totalCarbs: 0,
        totalProtein: 0,
        totalFat: 0,
        totalSodium: 0,
        totalFiber: 0,
    });
    const [date, setDate] = useState(getCurrentDate());

    return (
        <>
            <div className='basis-full flex justify-center items-center p-4 -mb-8'>
                <DatePicker date={date} setDate={setDate} />
            </div>
            <div
                className='basis-full  gap-2 md:gap-16 lg:gap-16 p-10 md:p-5 lg:p-5  
                       flex flex-col md:flex-row lg:flex-row '
            >
                <NutrientCalculatorResultComponent data={foodData} />
                <LogFoodContainer
                    setParentState={setFoodData}
                    currentDate={date}
                />
            </div>
        </>
    );
}

export default page;
