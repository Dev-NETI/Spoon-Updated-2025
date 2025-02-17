export default function BMIApplicationTab({ activeTab, setActiveTab }) {
    return (
        <div className='flex mt-2 gap-1 text-[.8rem] font-semibold ms-[0.156vw] select-none'>
            <div
                onClick={() => setActiveTab('bmi')}
                className={`rounded-t-md p-2 cursor-pointer duration-300 ease-in-out ${activeTab === 'bmi' ? 'bg-white scale-105 me-2' : 'bg-slate-300'}`}
            >
                BMI Calculator
            </div>
            <div
                onClick={() => setActiveTab('calorie')}
                className={`rounded-t-md p-2 cursor-pointer duration-300 ease-in-out ${activeTab === 'calorie' ? 'bg-white scale-105 mx-2' : 'bg-slate-300'}`}
            >
                Calorie Calculator
            </div>
            <div
                onClick={() => setActiveTab('nutrient')}
                className={`rounded-t-md p-2 cursor-pointer duration-300 ease-in-out ${activeTab === 'nutrient' ? 'bg-white scale-105 mx-2' : 'bg-slate-300'}`}
            >
                Nutrient Calculator
            </div>
            <div
                onClick={() => setActiveTab('blood')}
                className={`rounded-t-md p-2 cursor-pointer duration-300 ease-in-out ${activeTab === 'blood' ? 'bg-white scale-105 mx-2' : 'bg-slate-300'}`}
            >
                Blood Pressure Tracker
            </div>
            <div
                onClick={() => setActiveTab('idealplato')}
                className={`rounded-t-md p-2 cursor-pointer duration-300 ease-in-out ${activeTab === 'idealplato' ? 'bg-white scale-105 ms-2' : 'bg-slate-300'}`}
            >
                My Ideal Plato
            </div>
        </div>
    );
}
