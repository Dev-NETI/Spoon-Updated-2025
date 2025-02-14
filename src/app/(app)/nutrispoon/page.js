'use client';
import BloodPressure from '@/components/app/calculator/BloodPressure';
import BMICalculator from '@/components/app/calculator/BMICalculator';
import CalorieCalculator from '@/components/app/calculator/CalorieCalculator';
import Disclaimer from '@/components/app/calculator/disclaimer';
import IdealPlato from '@/components/app/calculator/IdealPlato';
import NutrientCalculator from '@/components/app/calculator/NutrientCalculator';
import BMIApplicationTab from '@/components/app/calculator/TabApplication';
import { useState } from 'react';

export default function Bmi() {
    const [activeTab, setActiveTab] = useState('bmi');

    const content = activeTab => {
        switch (activeTab) {
            case 'nutrient':
                return <NutrientCalculator />;
            case 'calorie':
                return <CalorieCalculator />;
            case 'blood':
                return <BloodPressure />;
            case 'idealplato':
                return <IdealPlato />;
            default:
                return <BMICalculator />;
        }
    };

    return (
        <>
            <div className='p-4'>
                <Disclaimer />
                <BMIApplicationTab
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <div
                    className='flex flex-col shadow-md
                     bg-white rounded-b-lg rounded-tr-lg gap-2 transition-all duration-500 ease-in-out delay-150'
                >
                    {content(activeTab)}
                </div>
            </div>
        </>
    );
}
