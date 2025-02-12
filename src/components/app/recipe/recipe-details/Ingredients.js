export default function Ingredients({ recipeData }) {
    return (
        <div className='w-3/12 h-full rounded-sm flex flex-col p-1'>
            <div className='text-lg font-semibold'>Ingredients</div>
            <div className='grid text-slate-600 p-1'>
                {recipeData.map((item, index) => {
                    return (
                        <span
                            key={index}
                            className={`text-xs border p-1.5 ${index == 0 ? 'broder-b-0' : 'border-t-0'}`}
                        >
                            {item.quantity} {item.unit.name} {item.name}
                            {item.instruction ? ', ' + item.instruction : ''}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
