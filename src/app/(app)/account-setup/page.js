'use client';

export default function AccountSetUp() {
    return (
        <div className='max-w-full max-h-screen flex flex-col p-4'>
            <div className='w-full bg-slate-100 p-2 rounded-t-md border-b'>
                <div className='flex justify-between pt-3 gap-5'>
                    <div className='w-4/12 flex gap-2 items-baseline'>
                        <label htmlFor='' className='font-bold text-[.9rem]'>
                            Category:
                        </label>
                        <select className='border focus:ring-1 focus:ring-spoonblue focus:border-blue-800 rounded-md w-full'>
                            <option value='' disabled defaultValue hidden>
                                Select Status
                            </option>
                            <option value='active'>Active</option>
                            <option value='inactive'>Inactive</option>
                            <option value='pending'>Pending</option>
                        </select>
                    </div>
                    <div className='w-4/12 flex gap-2 items-baseline'>
                        <label
                            htmlFor=''
                            className='font-bold text-[.9rem] w-4/12'
                        >
                            BMI Status:
                        </label>
                        <select className='ring-1 ring-spoonblue rounded-md w-8/12'>
                            <option>Status</option>
                            <option>Status</option>
                            <option>Status</option>
                        </select>
                    </div>
                    <div className='w-4/12 font-bold text-[.9rem]'>
                        Total: 112122
                    </div>
                    <div className='w-4/12 flex items-baseline justify-end gap-2'>
                        <label className='font-bold text-[.9rem]' htmlFor=''>
                            Search:{' '}
                        </label>
                        <input className='px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-sm text-gray-700' />
                    </div>
                </div>
            </div>
            <div className='w-full bg-slate-50 p-2 rounded-t-md border-b'>
                <div className='flex justify-between pt-3 transition duration-300 ease-in-out'>
                    <div className='w-full flex gap-2 items-center justify-center text-sm'>
                        <button className='bg-blue-950 shadow-md text-white rounded-md text-md p-2 cursor-pointer hover:bg-blue-900 select-none transition duration-300 ease-in-out'>
                            Prev
                        </button>
                        <button className='border shadow-md rounded-md text-md p-2 cursor-pointer hover:bg-slate-200 transition duration-300 ease-in-out'>
                            1
                        </button>
                        <button className='bg-slate-300 shadow-md border rounded-md text-md p-2'>
                            ...
                        </button>
                        <button className='border shadow-md rounded-md text-md p-2 cursor-pointer hover:bg-slate-200 transition duration-300 ease-in-out'>
                            1
                        </button>
                        <button className='border shadow-md rounded-md text-md p-2 cursor-pointer hover:bg-slate-200 transition duration-300 ease-in-out'>
                            1
                        </button>
                        <button className='border shadow-md rounded-md text-md p-2 cursor-pointer hover:bg-slate-200 transition duration-300 ease-in-out'>
                            1
                        </button>
                        <button className='bg-slate-300 shadow-md border rounded-md text-md p-2'>
                            ...
                        </button>
                        <button className='border shadow-md rounded-md text-md p-2 cursor-pointer hover:bg-slate-200 transition duration-300 ease-in-out'>
                            1
                        </button>
                        <button className='bg-blue-950 shadow-md text-white rounded-md text-md p-2 cursor-pointer hover:bg-blue-900 select-none transition duration-300 ease-in-out'>
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <div className='p-2 bg-white rounded-b-md pt-4'>
                <table className='table-auto w-full border border-collapse'>
                    <thead className='bg-spoonblue text-white'>
                        <tr className='font-semibold text-[.8rem]'>
                            <th>Action</th>
                            <th>Recent Login</th>
                            <th>Name</th>
                            <th>Rank</th>
                            <th>Company</th>
                            <th>Date of Birth</th>
                            <th>Age</th>
                            <th>BMI</th>
                            <th>Results</th>
                            <th>Height (cm)</th>
                            <th>Weight (kg)</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-xs hover:bg-slate-300'>
                            <td className='border border-collapsed flex flex-col gap-1 p-1 justify-center font-bold max-w-22'>
                                <button className='bg-spoonblue text-white py-1 px-2 rounded-full'>
                                    Edit
                                </button>
                                <button className='bg-green-700 text-white py-1 px-2 rounded-full'>
                                    BMI History
                                </button>
                            </td>
                            <td className='border border-collapsed'>
                                2024, January 01 8:00 am
                            </td>
                            <td className='border border-collapsed'>
                                Bitana, Jones Vincent Garibay
                            </td>
                            <td className='border border-collapsed'>None</td>
                            <td className='border border-collapsed'>
                                NYK-Fil Ship Management Inc.
                            </td>
                            <td className='border border-collapsed'>
                                1996-10-10
                            </td>
                            <td className='border border-collapsed'>27</td>
                            <td className='border border-collapsed'>29.9</td>
                            <td className='border border-collapsed'>
                                <span>Overweight</span>
                            </td>
                            <td className='border border-collapsed'>167</td>
                            <td className='border border-collapsed'>84</td>
                            <td className='border border-collapsed'>
                                Seafarer (Officer)
                            </td>
                        </tr>
                        <tr className='text-xs bg-slate-50 hover:bg-slate-300 max-w-22'>
                            <td className='border border-collapsed flex flex-col gap-1 p-1 justify-center font-bold'>
                                <button className='bg-spoonblue text-white py-1 px-2 rounded-full'>
                                    Edit
                                </button>
                                <button className='bg-green-700 text-white py-1 px-2 rounded-full'>
                                    BMI History
                                </button>
                            </td>
                            <td className='border border-collapsed'>
                                2024, January 01 8:00 am
                            </td>
                            <td className='border border-collapsed'>
                                Bitana, Jones Vincent Garibay
                            </td>
                            <td className='border border-collapsed'>None</td>
                            <td className='border border-collapsed'>
                                NYK-Fil Ship Management Inc.
                            </td>
                            <td className='border border-collapsed'>
                                1996-10-10
                            </td>
                            <td className='border border-collapsed'>27</td>
                            <td className='border border-collapsed'>29.9</td>
                            <td className='border border-collapsed'>
                                <span>Overweight</span>
                            </td>
                            <td className='border border-collapsed'>167</td>
                            <td className='border border-collapsed'>84</td>
                            <td className='border border-collapsed'>
                                Seafarer (Officer)
                            </td>
                        </tr>
                        <tr className='text-xs hover:bg-slate-300 max-w-22'>
                            <td className='border border-collapsed flex flex-col gap-1 p-1 justify-center font-bold'>
                                <button className='bg-spoonblue text-white py-1 px-2 rounded-full'>
                                    Edit
                                </button>
                                <button className='bg-green-700 text-white py-1 px-2 rounded-full'>
                                    BMI History
                                </button>
                            </td>
                            <td className='border border-collapsed'>
                                2024, January 01 8:00 am
                            </td>
                            <td className='border border-collapsed'>
                                Bitana, Jones Vincent Garibay
                            </td>
                            <td className='border border-collapsed'>None</td>
                            <td className='border border-collapsed'>
                                NYK-Fil Ship Management Inc.
                            </td>
                            <td className='border border-collapsed'>
                                1996-10-10
                            </td>
                            <td className='border border-collapsed'>27</td>
                            <td className='border border-collapsed'>29.9</td>
                            <td className='border border-collapsed'>
                                <span>Overweight</span>
                            </td>
                            <td className='border border-collapsed'>167</td>
                            <td className='border border-collapsed'>84</td>
                            <td className='border border-collapsed'>
                                Seafarer (Officer)
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
