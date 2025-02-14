export default function BMICalculator() {
    return (
        <div className='bg-slate flex gap-2 justify-between p-6'>
            <div className='flex flex-col w-3/12'>
                <div className='flex bg-blue-950 font-semibold text-white items-center justify-start p-1 rounded-t-md text-[.9rem]'>
                    Compute BMI <small className="text-[.6rem] ms-1">(Metric)</small>
                </div>
                <div className='bg-slate-100 shadow-md min-h-20 flex gap-3 p-3 items-center'>
                    <div className='flex flex-col'>
                        <label
                            htmlFor='weight'
                            className='text-slate-500 text-xs'
                        >
                            Weight (kg)
                        </label>
                        <input
                            id='weight'
                            className='bg-slate-50 w-full h-8 px-2 py-3 ring-1 ring-slate-400 rounded-md'
                        />
                    </div>
                    <span className='mt-5'>/</span>
                    <div className='flex flex-col'>
                        <label
                            htmlFor='weight'
                            className='text-slate-500 text-xs'
                        >
                            Height (cm)
                        </label>
                        <input
                            id='weight'
                            className='bg-slate-50 w-full h-8 px-2 py-3 ring-1 ring-slate-400 rounded-md'
                        />
                    </div>
                </div>
                <button className='flex bg-blue-950 font-bold rounded-b-md min-h-8 text-white justify-center items-center active:bg-blue-900'>
                    Compute
                </button>
            </div>
            <div className='w-9/12 flex flex-col h-full'>
                <table className='table-auto border w-full'>
                    <thead className=''>
                        <tr className='bg-slate-300'>
                            <th colSpan={5}>BMI History</th>
                        </tr>
                        <tr className='bg-slate-200'>
                            <th className='border font-semibold text-start px-1'>
                                Date
                            </th>
                            <th className='border font-semibold text-start px-1'>
                                Weight
                            </th>
                            <th className='border font-semibold text-start px-1'>
                                Height
                            </th>
                            <th className='border font-semibold text-start px-1'>
                                BMI
                            </th>
                            <th className='border font-semibold text-start px-1'>
                                Results
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-[.8rem]'>
                            <td className='border text-start px-1'>
                                02 Feb. 2025
                            </td>
                            <td className='border text-start px-1'>65 kg</td>
                            <td className='border text-start px-1'>172 cm</td>
                            <td className='border text-start px-1'>23.1</td>
                            <td className='border text-start px-1 justify-center'>
                                <span className='bg-green-400 px-1 rounded-full justify-center flex text-[.8rem]'>
                                    Normal
                                </span>
                            </td>
                        </tr>
                        <tr className='text-[.8rem] bg-slate-100'>
                            <td className='border text-start px-1'>
                                02 Feb. 2025
                            </td>
                            <td className='border text-start px-1'>65 kg</td>
                            <td className='border text-start px-1'>172 cm</td>
                            <td className='border text-start px-1'>23.1</td>
                            <td className='border text-start px-1 justify-center'>
                                <span className='bg-yellow-300 px-1 rounded-full justify-center flex text-[.8rem]'>
                                    Underweight
                                </span>
                            </td>
                        </tr>
                        <tr className='text-[.8rem]'>
                            <td className='border text-start px-1'>
                                02 Feb. 2025
                            </td>
                            <td className='border text-start px-1'>65 kg</td>
                            <td className='border text-start px-1'>172 cm</td>
                            <td className='border text-start px-1'>23.1</td>
                            <td className='border text-start px-1 justify-center'>
                                <span className='bg-purple-300 px-1 rounded-full justify-center flex text-[.8rem]'>
                                    Overweight
                                </span>
                            </td>
                        </tr>
                        <tr className='text-[.8rem] bg-slate-100'>
                            <td className='border text-start px-1'>
                                02 Feb. 2025
                            </td>
                            <td className='border text-start px-1'>65 kg</td>
                            <td className='border text-start px-1'>172 cm</td>
                            <td className='border text-start px-1'>23.1</td>
                            <td className='border text-start px-1 justify-center'>
                                <span className='bg-red-300 px-1 rounded-full justify-center flex text-[.8rem]'>
                                    Obese
                                </span>
                            </td>
                        </tr>
                        <tr className='text-[.8rem]'>
                            <td className='border text-start px-1'>
                                02 Feb. 2025
                            </td>
                            <td className='border text-start px-1'>65 kg</td>
                            <td className='border text-start px-1'>172 cm</td>
                            <td className='border text-start px-1'>23.1</td>
                            <td className='border text-start px-1 justify-center'>
                                <span className='bg-red-300 px-1 rounded-full justify-center flex text-[.8rem]'>
                                    Obese
                                </span>
                            </td>
                        </tr>
                        <tr className='text-[.8rem] bg-slate-100'>
                            <td className='border text-start px-1'>
                                02 Feb. 2025
                            </td>
                            <td className='border text-start px-1'>65 kg</td>
                            <td className='border text-start px-1'>172 cm</td>
                            <td className='border text-start px-1'>23.1</td>
                            <td className='border text-start px-1 justify-center'>
                                <span className='bg-red-300 px-1 rounded-full justify-center flex text-[.8rem]'>
                                    Obese
                                </span>
                            </td>
                        </tr>
                        <tr className='text-[.8rem]'>
                            <td className='border text-start px-1'>
                                02 Feb. 2025
                            </td>
                            <td className='border text-start px-1'>65 kg</td>
                            <td className='border text-start px-1'>172 cm</td>
                            <td className='border text-start px-1'>23.1</td>
                            <td className='border text-start px-1 justify-center'>
                                <span className='bg-red-300 px-1 rounded-full justify-center flex text-[.8rem]'>
                                    Obese
                                </span>
                            </td>
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
