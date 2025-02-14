export default function CalorieCalculator() {
    return (
        <div className='bg-slate flex flex-col gap-8 p-6'>
            <div className='flex gap-10 justify-center'>
                <div className='flex flex-col w-3/12'>
                    <div className='flex bg-blue-950 font-semibold text-white items-center justify-start p-1 rounded-t-md text-[.9rem]'>
                        Calorie Calculator{' '}
                        <small className='text-[.6rem] ms-1'>(Metric)</small>
                    </div>
                    <div className='bg-slate-100 shadow-md min-h-20 flex flex-col gap-3 p-3 items-center'>
                        <div className='flex flex-col w-full'>
                            <label
                                htmlFor='age'
                                className='text-slate-500 text-xs'
                            >
                                Age
                            </label>
                            <input
                                id='age'
                                className='bg-slate-50 h-8 px-2 py-3 ring-1 ring-slate-400 rounded-md'
                            />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label
                                htmlFor='gender'
                                className='text-slate-500 text-xs'
                            >
                                Gender
                            </label>
                            <select
                                id='gender'
                                name='gender'
                                className='bg-slate-50 h-8 px-2 py-1 text-sm ring-1 ring-slate-400 rounded-md'
                            >
                                <option value='male' className='text-sm'>
                                    Male
                                </option>
                                <option value='female' className='text-sm'>
                                    Female
                                </option>
                            </select>
                        </div>

                        <div className='flex flex-col w-full'>
                            <label
                                htmlFor='weight'
                                className='text-slate-500 text-xs'
                            >
                                Weight (kg)
                            </label>
                            <input
                                id='weight'
                                className='bg-slate-50 h-8 px-2 py-3 ring-1 ring-slate-400 rounded-md'
                            />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label
                                htmlFor='height'
                                className='text-slate-500 text-xs'
                            >
                                Height (cm)
                            </label>
                            <input
                                id='height'
                                className='bg-slate-50 h-8 px-2 py-3 ring-1 ring-slate-400 rounded-md'
                            />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label
                                htmlFor='activity'
                                className='text-slate-500 text-xs'
                            >
                                Activity{' '}
                                <span className='text-red-500 text-[.6rem]'>
                                    (Required)
                                </span>
                            </label>
                            <select
                                id='activity'
                                className='bg-slate-50 h-8 px-2 py-1 text-sm ring-1 ring-slate-400 rounded-md'
                            >
                                <option>Testing</option>
                                <option>Testing</option>
                            </select>
                        </div>
                    </div>
                    <button className='flex bg-blue-950 font-bold rounded-b-md min-h-8 text-white justify-center items-center active:bg-blue-900'>
                        Compute
                    </button>
                </div>
                <div className='w-4/12'>
                    <div className='flex flex-col w-full'>
                        <div className='flex bg-slate-300 text-slate-800 font-semibold items-center justify-center p-1 rounded-t-md text-[.9rem]'>
                            Results
                        </div>
                        <div className='bg-slate-50 shadow-md min-h-20 flex flex-col gap-3 p-5 items-center'>
                            <p className='bg-indigo-100 text-[.8rem] p-2 rounded-full text-indigo-700'>
                                Your maintenance calories is: 1926 calories/day
                            </p>
                            <p className='bg-purple-100 text-[.8rem] p-2 rounded-full text-purple-700'>
                                Your maintenance calories is: 1926 calories/day
                            </p>
                            <p className='bg-yellow-100 text-[.8rem] p-2 rounded-full text-yellow-700'>
                                Your maintenance calories is: 1926 calories/day
                            </p>
                            <p className='bg-rose-100 text-[.8rem] p-2 rounded-full text-rose-700'>
                                Your maintenance calories is: 1926 calories/day
                            </p>
                            <p className='bg-blue-100 text-[.8rem] p-2 rounded-full text-blue-700'>
                                Your maintenance calories is: 1926 calories/day
                            </p>
                            <p className='bg-green-100 text-[.8rem] p-2 rounded-full text-green-700'>
                                Your maintenance calories is: 1926 calories/day
                            </p>
                            <p className='bg-cyan-100 text-[.8rem] p-2 rounded-full text-cyan-700'>
                                Your maintenance calories is: 1926 calories/day
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-12/12 flex flex-col h-full'>
                <table className='table-auto border w-full'>
                    <thead className=''>
                        <tr className='bg-slate-300'>
                            <th colSpan={9}>Calorie History Logs</th>
                        </tr>
                        <tr className='bg-slate-200 text-[.8rem]'>
                            <th className='border font-semibold text-start px-1'>
                                Date
                            </th>
                            <th className='border font-semibold text-start px-1'>
                                Time
                            </th>
                            <th className='border font-semibold text-start px-1'>
                                Maintenance Calories
                            </th>
                            <th className='border font-semibold text-start px-1'>
                                Weight Loss
                            </th>
                            <th className='border font-semibold text-start px-1'>
                                Mild Weight Loss
                            </th>
                            <th className='border font-semibold text-start px-1'>
                                Extreme Weight Loss
                            </th>
                            <th className='border font-semibold text-start px-1'>
                                Weight Gain
                            </th>
                            <th className='border font-semibold text-start px-1'>
                                Mild Weight Gain
                            </th>
                            <th className='border font-semibold text-start px-1'>
                                Extreme Weight Gain
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-[.7rem]'>
                            <td className='border text-start px-1'>
                                02 Feb. 2025
                            </td>
                            <td className='border text-start px-1'>08:31:18</td>
                            <td className='border text-start px-1'>1926</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                        </tr>
                        <tr className='text-[.7rem]'>
                            <td className='border text-start px-1'>
                                02 Feb. 2025
                            </td>
                            <td className='border text-start px-1'>08:31:18</td>
                            <td className='border text-start px-1'>1926</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                        </tr>
                        <tr className='text-[.7rem]'>
                            <td className='border text-start px-1'>
                                02 Feb. 2025
                            </td>
                            <td className='border text-start px-1'>08:31:18</td>
                            <td className='border text-start px-1'>1926</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                        </tr>
                        <tr className='text-[.7rem]'>
                            <td className='border text-start px-1'>
                                02 Feb. 2025
                            </td>
                            <td className='border text-start px-1'>08:31:18</td>
                            <td className='border text-start px-1'>1926</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                        </tr>
                        <tr className='text-[.7rem]'>
                            <td className='border text-start px-1'>
                                02 Feb. 2025
                            </td>
                            <td className='border text-start px-1'>08:31:18</td>
                            <td className='border text-start px-1'>1926</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                        </tr>
                        <tr className='text-[.7rem]'>
                            <td className='border text-start px-1'>
                                02 Feb. 2025
                            </td>
                            <td className='border text-start px-1'>08:31:18</td>
                            <td className='border text-start px-1'>1926</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                        </tr>
                        <tr className='text-[.7rem]'>
                            <td className='border text-start px-1'>
                                02 Feb. 2025
                            </td>
                            <td className='border text-start px-1'>08:31:18</td>
                            <td className='border text-start px-1'>1926</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                        </tr>
                        <tr className='text-[.7rem]'>
                            <td className='border text-start px-1'>
                                02 Feb. 2025
                            </td>
                            <td className='border text-start px-1'>08:31:18</td>
                            <td className='border text-start px-1'>1926</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                        </tr>
                        <tr className='text-[.7rem]'>
                            <td className='border text-start px-1'>
                                02 Feb. 2025
                            </td>
                            <td className='border text-start px-1'>08:31:18</td>
                            <td className='border text-start px-1'>1926</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                            <td className='border text-start px-1'>1733</td>
                        </tr>
                    </tbody>
                </table>
                <div className='flex text-xs bg-slate-300 px-2 py-1 justify-between h-10 items-center'>
                    <div>Showing 2 from 2 entries</div>
                    <div className='flex gap-1 h-5'>
                        <button className='bg-slate-50 px-1 rounded-sm'>
                            Prev
                        </button>
                        <button className='bg-slate-50 px-1 rounded-sm'>
                            1
                        </button>
                        <button className='bg-slate-50 px-1 rounded-sm'>
                            ...
                        </button>
                        <button className='bg-slate-50 px-1 rounded-sm'>
                            2
                        </button>
                        <button className='bg-blue-500 text-white px-1 rounded-sm'>
                            2
                        </button>
                        <button className='bg-slate-50 px-1 rounded-sm'>
                            2
                        </button>
                        <button className='bg-slate-50 px-1 rounded-sm'>
                            ...
                        </button>
                        <button className='bg-slate-50 px-1 rounded-sm'>
                            2
                        </button>
                        <button className='bg-slate-50 px-1 rounded-sm'>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
