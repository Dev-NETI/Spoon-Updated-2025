import { BsCheckCircleFill } from 'react-icons/bs';

export default function Procedures() {
    return (
        <div className='w-7/12 h-full rounded-sm flex flex-col p-1'>
            <div className='text-lg font-semibold'>How to Cook</div>
            <div className='grid text-slate-600 p-1'>
                <div className='flex flex-col border'>
                    <span className='ps-2 text-[10px] text-rose-500 flex items-center gap-1'>
                        <BsCheckCircleFill />
                        <span>Step 1</span>
                    </span>
                    <span className='text-xs p-1.5 ps-3'>
                        In a bowl, combine pork, calamansi or lemon juice, soy
                        sauce, garlic, and pepper.
                    </span>
                </div>
                <div className='flex flex-col border-s border-e border-b'>
                    <span className='ps-2 text-[10px] text-rose-500 flex items-center gap-1'>
                        <BsCheckCircleFill />
                        <span>Step 2</span>
                    </span>
                    <span className='text-xs p-1.5 ps-3'>
                        Massage the marinade into the meat and marinate for
                        about 30 minutes
                    </span>
                </div>
                <div className='flex flex-col border-s border-e border-b'>
                    <span className='ps-2 text-[10px] text-rose-500 flex items-center gap-1'>
                        <BsCheckCircleFill />
                        <span>Step 3</span>
                    </span>
                    <span className='text-xs p-1.5 ps-3'>
                        Drain the meat, onion, and garlic from marinade. Squeeze
                        and reserve excess liquid and set aside.
                    </span>
                </div>
                <div className='flex flex-col border-s border-e border-b'>
                    <span className='ps-2 text-[10px] text-rose-500 flex items-center gap-1'>
                        <BsCheckCircleFill />
                        <span>Step 4</span>
                    </span>
                    <span className='text-xs p-1.5 ps-3'>
                        Heat 2 tablespoons of the oil. Pan fry pork chop and
                        cook for about 4 minutes per side or until browned.
                    </span>
                </div>
            </div>
        </div>
    );
}
