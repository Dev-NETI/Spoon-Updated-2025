export default function TableUser({ icon, title, children, color }) {
    return (
        <div className='bg-slate-50 gap-x-2 rounded-md w-4/12 h-full flex flex-col'>
            <div
                className={`flex items-center gap-2 text-[1.4rem] font-semibold border-b p-2 ${color}`}
            >
                {icon}
                <span>{title}</span>
            </div>
            <div className='p-2'>
                <table className='table-auto w-full'>
                    <thead>
                        <tr className='bg-slate-300 font-semibold text-[.9rem]'>
                            <td>Name</td>
                            <td>Weight</td>
                            <td>BMI</td>
                        </tr>
                    </thead>
                    {children}
                </table>
            </div>
        </div>
    );
}
