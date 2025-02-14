import Image from 'next/image';

export default function BloodPressure() {
    return (
        <div className='w-full h-full flex flex-col gap-6 p-6 bg-gray-50 min-h-screen'>
            <div className='flex flex-col gap-10'>
                <div className='flex gap-5'>
                    {/* Input Form Section */}
                    <div className='flex flex-col h-full md:w-3/12 border border-gray-300 rounded-md shadow-md overflow-hidden'>
                        <div className='flex bg-blue-950 font-semibold text-white items-center justify-start p-3 rounded-t-md text-sm'>
                            Blood Pressure Tracker
                        </div>
                        <div className='bg-slate-100 p-4 flex flex-col gap-4'>
                            <div className='flex flex-col w-full'>
                                <label
                                    htmlFor='systolic'
                                    className='text-slate-600 text-sm font-medium'
                                >
                                    Systolic
                                </label>
                                <input
                                    id='systolic'
                                    className='bg-white border border-gray-300 h-10 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
                                    placeholder='Enter systolic value'
                                />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label
                                    htmlFor='diastolic'
                                    className='text-slate-600 text-sm font-medium'
                                >
                                    Diastolic
                                </label>
                                <input
                                    id='diastolic'
                                    className='bg-white border border-gray-300 h-10 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
                                    placeholder='Enter diastolic value'
                                />
                            </div>
                        </div>
                        <button className='bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 rounded-b-md'>
                            Save
                        </button>
                    </div>

                    {/* Image Section */}
                    <div className='flex gap-6 w-full md:w-9/12 justify-evenly'>
                        <Image
                            src='/images/bloodPressurereadingChart.png'
                            width={300}
                            height={300}
                            className='w-full h-auto rounded-md shadow-md'
                            alt='Blood Pressure Reading Chart'
                            priority
                        />
                        <Image
                            src='/images/blood-pressure-readings-chart2.png'
                            width={300}
                            height={300}
                            className='w-full h-auto rounded-md shadow-md'
                            alt='Blood Pressure Reading Chart 2'
                            priority
                        />
                    </div>
                </div>

                {/* Table Section */}
                <div className='flex flex-col w-full border border-gray-300 rounded-md shadow-md overflow-hidden'>
                    <div className='bg-slate-500 p-3 rounded-t-md text-white font-semibold'>
                        Blood Pressure Tracker
                    </div>
                    <div className='flex justify-between items-center border-b border-gray-300 p-3 bg-gray-100 text-sm'>
                        <div>Showing all results</div>
                        <div className='flex items-center gap-2'>
                            <div>Search: </div>
                            <input className='w-32 bg-slate-100 ring-1 rounded-md ring-gray-500 p-1'/>
                        </div>
                    </div>
                    <table className='table-auto w-full border-collapse'>
                        <thead>
                            <tr className='bg-gray-200 text-left font-semibold'>
                                <th className='p-3 border-b border-gray-300'>
                                    Systolic
                                </th>
                                <th className='p-3 border-b border-gray-300'>
                                    Diastolic
                                </th>
                                <th className='p-3 border-b border-gray-300'>
                                    Status
                                </th>
                                <th className='p-3 border-b border-gray-300'>
                                    Date
                                </th>
                                <th className='p-3 border-b border-gray-300'>
                                    Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='hover:bg-gray-50'>
                                <td className='p-3 border-b border-gray-300'>
                                    120
                                </td>
                                <td className='p-3 border-b border-gray-300'>
                                    80
                                </td>
                                <td className='p-3 border-b border-gray-300'>
                                    Normal
                                </td>
                                <td className='p-3 border-b border-gray-300'>
                                    2025-02-14
                                </td>
                                <td className='p-3 border-b border-gray-300'>
                                    12:30 PM
                                </td>
                            </tr>
                            <tr className='hover:bg-gray-50'>
                                <td className='p-3 border-b border-gray-300'>
                                    140
                                </td>
                                <td className='p-3 border-b border-gray-300'>
                                    90
                                </td>
                                <td className='p-3 border-b border-gray-300'>
                                    High
                                </td>
                                <td className='p-3 border-b border-gray-300'>
                                    2025-02-13
                                </td>
                                <td className='p-3 border-b border-gray-300'>
                                    10:00 AM
                                </td>
                            </tr>
                            <tr className='hover:bg-gray-50'>
                                <td className='p-3 border-b border-gray-300'>
                                    130
                                </td>
                                <td className='p-3 border-b border-gray-300'>
                                    85
                                </td>
                                <td className='p-3 border-b border-gray-300'>
                                    Elevated
                                </td>
                                <td className='p-3 border-b border-gray-300'>
                                    2025-02-12
                                </td>
                                <td className='p-3 border-b border-gray-300'>
                                    8:15 AM
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
