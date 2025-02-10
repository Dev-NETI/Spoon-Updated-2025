export default function Ingredients() {
    return (
        <div className='w-3/12 h-full rounded-sm flex flex-col p-1'>
            <div className='text-lg font-semibold'>Ingredients</div>
            <div className='grid text-slate-600 p-1'>
                <span className='text-xs border p-1.5'>
                    1.6kg Pork Chop, 150g per serving
                </span>
                <span className='text-xs border-s border-e border-b p-1.5'>
                    80g Garlic, peeled and minced
                </span>
                <span className='text-xs border-s border-e border-b p-1.5'>
                    200g White Onion, peeled and sliced into rings
                </span>
                <span className='text-xs border-s border-e border-b p-1.5'>
                    225ml Calamansi, juice, substitute to lemon
                </span>
                <span className='text-xs border-s border-e border-b p-1.5'>
                    5g Ground Black Pepper
                </span>
            </div>
        </div>
    );
}
