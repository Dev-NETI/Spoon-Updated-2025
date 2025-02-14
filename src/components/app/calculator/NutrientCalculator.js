export default function NutrientCalculator() {
    return (
        <div className='w-full flex flex-col gap-4'>
            <div className='flex justify-center border-b pb-2 p-4 bg-slate-50 rounded-tr-md'>
                <div className='flex items-center gap-5'>
                    <label>Date: </label>
                    <input
                        type='date'
                        className='bg-white w-full p-2 rounded-md border-2 border-slate-600'
                    />
                    <button className='bg-spoonblue text-white p-2 rounded-md'>
                        Search
                    </button>
                </div>
            </div>
            <div className='flex gap-5 p-5'>
                <div className='flex flex-col w-3/12'>
                    <div className='bg-cyan-500 text-white rounded-t-md p-5 flex flex-col gap-3'>
                        <span className='font-bold'>Breakfast</span>
                        <span className='font-semibold text-[.8rem]'>
                            Calories:{' '}
                        </span>
                    </div>
                    <div className='bg-cyan-600 text-white text-[.8rem] font-bold flex justify-between items-center p-3'>
                        <div className='font-normal'>Bistek</div>
                        <div className='text-rose-600 text-[1rem] cursor-pointer'>
                            x
                        </div>
                    </div>
                    <div className='bg-cyan-700 text-white text-[.8rem] font-bold rounded-b-md flex justify-between items-center p-3 cursor-pointer'>
                        <div>Add Food</div>
                        <div>+</div>
                    </div>
                </div>
                <div className='flex flex-col w-3/12'>
                    <div className='bg-amber-500 text-white rounded-t-md p-5 flex flex-col gap-3'>
                        <span className='font-bold'>Lunch</span>
                        <span className='font-semibold text-[.8rem]'>
                            Calories:{' '}
                        </span>
                    </div>
                    <div className='bg-amber-600 text-white text-[.8rem] font-bold rounded-b-md flex justify-between items-center p-3 cursor-pointer'>
                        <div>Add Food</div>
                        <div>+</div>
                    </div>
                </div>
                <div className='flex flex-col w-3/12'>
                    <div className='bg-slate-700 text-white rounded-t-md p-5 flex flex-col gap-3'>
                        <span className='font-bold'>Dinner</span>
                        <span className='font-semibold text-[.8rem]'>
                            Calories:{' '}
                        </span>
                    </div>
                    <div className='bg-slate-900 text-white text-[.8rem] font-bold rounded-b-md flex justify-between items-center p-3 cursor-pointer'>
                        <div>Add Food</div>
                        <div>+</div>
                    </div>
                </div>
                <div className='flex flex-col w-3/12'>
                    <div className='bg-rose-700 text-white rounded-t-md p-5 flex flex-col gap-3'>
                        <span className='font-bold'>Snack</span>
                        <span className='font-semibold text-[.8rem]'>
                            Calories:{' '}
                        </span>
                    </div>
                    <div className='bg-rose-900 text-white text-[.8rem] font-bold rounded-b-md flex iberjustify-between items-center p-3 cursor-pointer'>
                        <div>Add Food</div>
                        <div>+</div>
                    </div>
                </div>
            </div>
            <div className='p-5 py-0 font-bold text-[1.3rem] flex justify-between items-center'>
                <span className='text-spoonblue'>Overall Calories:</span>
                <button className='bg-spoonblue rounded-lg p-2 text-white text-[1rem] me-10 outline-none focus:outline-1 active:outline active:outline-spoonblue active:outline-offset-2'>
                    Nutrition
                </button>
            </div>
            <div className='p-5 pt-0 flex min-w-full'>
                <table className='table-auto border-collapse border border-gray-300 w-full'>
                    <thead className='bg-gray-100 font-semibold border-b border-gray-300'>
                        <tr>
                            <th className='p-2 text-center'>Calories</th>
                            <th className='p-2 text-center'>Carbohydrate</th>
                            <th className='p-2 text-center'>Protein</th>
                            <th className='p-2 text-center'>Fat</th>
                            <th className='p-2 text-center'>Sodium</th>
                            <th className='p-2 text-center'>Fiber</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 text-center'>
                        <tr>
                            <td className='p-2'>123</td>
                            <td className='p-2'>123</td>
                            <td className='p-2'>123</td>
                            <td className='p-2'>123</td>
                            <td className='p-2'>123</td>
                            <td className='p-2'>123</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
