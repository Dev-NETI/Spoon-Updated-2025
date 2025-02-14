export default function IdealPlato() {
    return (
        <div className='w-full flex flex-col gap-6 p-6 bg-gray-50 h-full'>
            <div className='flex flex-col gap-2 shadow-sm'>
                <div className='bg-slate-500 w-full p-2 font-bold text-white rounded-t-md'>
                    My Ideal Plato
                </div>
                <div className='flex justify-between w-full px-2 border-x text-[.8rem] items-center'>
                    <span>Showing 2 from 2 results</span>
                    <div className='flex gap-2 items-center'>
                        <span>Search:</span>
                        <input className='w-full bg-white ring-1 ring-gray-500 p-1 rounded-md' />
                    </div>
                </div>
                <table className='table-auto'>
                    <thead className='bg-blue-950 text-white'>
                        <tr>
                            <th className='border-collapse border'>Images</th>
                            <th className='border-collapse border'>
                                Recipe Name
                            </th>
                            <th className='border-collapse border'>Origin</th>
                            <th className='border-collapse border'>Mealtype</th>
                            <th className='border-collapse border'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='bg-slate-100 h-20'>
                            <td className='border-collapse border border-gray p-4'>
                                Bistek
                            </td>
                            <td className='border-collapse border border-gray p-4'>
                                Bistek
                            </td>
                            <td className='border-collapse border border-gray p-4'>
                                Bistek
                            </td>
                            <td className='border-collapse border border-gray p-4'>
                                Bistek
                            </td>
                            <td className='border-collapse border border-gray p-4'>
                                Bistek
                            </td>
                        </tr>
                        <tr className='bg-slate-50 h-20'>
                            <td className='border-collapse border border-gray p-4'>
                                Bistek
                            </td>
                            <td className='border-collapse border border-gray p-4'>
                                Bistek
                            </td>
                            <td className='border-collapse border border-gray p-4'>
                                Bistek
                            </td>
                            <td className='border-collapse border border-gray p-4'>
                                Bistek
                            </td>
                            <td className='border-collapse border border-gray p-4'>
                                Bistek
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='flex justify-center bg-slate-300 gap-2 p-2 rounded-b-md text-sm font-semibold'>
                    <button className='bg-white px-2 py-0.5 rounded-sm hover:bg-slate-100 active:scale-105 duration-400 ease-in-out'>
                        Prev
                    </button>
                    <button className='bg-white px-2 py-0.5 rounded-sm hover:bg-slate-100 active:scale-105 duration-400 ease-in-out'>
                        1
                    </button>
                    <button
                        className='bg-slate-200 px-2 py-0.5 rounded-sm duration-400 ease-in-out'
                        disabled
                    >
                        ...
                    </button>
                    <button className='bg-white px-2 py-0.5 rounded-sm hover:bg-slate-100 active:scale-105 duration-400 ease-in-out'>
                        3
                    </button>
                    <button className='bg-white px-2 py-0.5 rounded-sm hover:bg-slate-100 active:scale-105 duration-400 ease-in-out'>
                        4
                    </button>
                    <button className='bg-white px-2 py-0.5 rounded-sm hover:bg-slate-100 active:scale-105 duration-400 ease-in-out'>
                        4
                    </button>
                    <button
                        className='bg-slate-200 px-2 py-0.5 rounded-sm duration-400 ease-in-out'
                        disabled
                    >
                        ...
                    </button>
                    <button className='bg-white px-2 py-0.5 rounded-sm hover:bg-slate-100 active:scale-105 duration-400 ease-in-out'>
                        5
                    </button>
                    <button className='bg-white px-2 py-0.5 rounded-sm hover:bg-slate-100 active:scale-105 duration-400 ease-in-out'>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
