import { useState } from 'react';

export default function BMIApplicationTab() {
    const [activeTab, setActiveTab] = useState('bmi');

    return (
        <div className='flex mt-2 gap-1 text-[.8rem] font-semibold ms-[0.156vw]'>
            <div
                onClick={() => setActiveTab('bmi')}
                className={`rounded-t-md p-2 cursor-pointer duration-300 ease-in-out ${activeTab === 'bmi' ? 'bg-white scale-105 me-2' : 'bg-slate-200'}`}
            >
                BMI Calculator
            </div>
            <div
                onClick={() => setActiveTab('calorie')}
                className={`rounded-t-md p-2 cursor-pointer duration-300 ease-in-out ${activeTab === 'calorie' ? 'bg-white scale-105 mx-2' : 'bg-slate-200'}`}
            >
                Calorie Calculator
            </div>
            <div
                onClick={() => setActiveTab('nutrient')}
                className={`rounded-t-md p-2 cursor-pointer duration-300 ease-in-out ${activeTab === 'nutrient' ? 'bg-white scale-105 mx-2' : 'bg-slate-200'}`}
            >
                Nutrient Calculator
            </div>
            <div
                onClick={() => setActiveTab('blood')}
                className={`rounded-t-md p-2 cursor-pointer duration-300 ease-in-out ${activeTab === 'blood' ? 'bg-white scale-105 mx-2' : 'bg-slate-200'}`}
            >
                Blood Pressure Tracker
            </div>
            <div
                onClick={() => setActiveTab('idealplato')}
                className={`rounded-t-md p-2 cursor-pointer duration-300 ease-in-out ${activeTab === 'idealplato' ? 'bg-white scale-105 ms-2' : 'bg-slate-200'}`}
            >
                My Ideal Plato
            </div>
        </div>
    );
}
