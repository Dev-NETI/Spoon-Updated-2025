import { BsCheckCircleFill } from 'react-icons/bs';

export default function Procedures({ recipeData }) {
    return (
        <div className='w-7/12 h-full rounded-sm flex flex-col p-1'>
            <div className='text-lg font-semibold'>How to Cook</div>
            <div className='grid text-slate-600 p-1'>
                {recipeData.length > 0 ? (
                    recipeData.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col border ${index == 0 ? '' : 'border-t-0'}`}
                        >
                            <span className='ps-2 text-[10px] text-rose-700 flex items-center gap-1'>
                                <BsCheckCircleFill />
                                <span>Step {item.number}</span>
                            </span>
                            <span className='text-xs p-1.5 ps-3'>
                                {item.description}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className='flex flex-col border'>
                        <span className='text-xs p-1.5 ps-3'>
                            No procedures yet.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
