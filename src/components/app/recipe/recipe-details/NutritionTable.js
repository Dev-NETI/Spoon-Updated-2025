export default function NutritionTable({ recipeData }) {
    return (
        <div className='w-2/12 h-full rounded-sm flex flex-col p-1'>
            <div className='text-lg font-semibold'>Nutrition</div>
            <div className='bg-slate-950 h-2 w-full'></div>
            <div className='text-[10px] border-b border-slate-950'>
                Amount per Serving
            </div>
            <div className='flex items-center justify-end text-xs font-semibold border-b border-slate-950'>
                Value
            </div>
            <div className='flex justify-between border-b-2 border-slate-950'>
                <span className='flex'>
                    <span className='font-bold text-xs'>Calories</span>
                    <span className='text-xs'>(kcal)</span>
                </span>
                <span className='font-bold text-xs'>{recipeData.calories}</span>
            </div>
            <div className='flex justify-between border-b-2 border-slate-950'>
                <span className='flex'>
                    <span className='font-bold text-xs'>Carbohydrate</span>
                    <span className='text-xs'>(g)</span>
                </span>
                <span className='font-bold text-xs'>
                    {recipeData.carbohydrate}
                </span>
            </div>
            <div className='flex justify-between border-b-2 border-slate-950'>
                <span className='flex'>
                    <span className='font-bold text-xs'>Protein </span>
                    <span className='text-xs'>(g)</span>
                </span>
                <span className='font-bold text-xs'>{recipeData.protein}</span>
            </div>
            <div className='flex justify-between border-b-2 border-slate-950'>
                <span className='flex'>
                    <span className='font-bold text-xs'>Fat</span>
                    <span className='text-xs'>(g)</span>
                </span>
                <span className='font-bold text-xs'>{recipeData.fat}</span>
            </div>
            <div className='flex justify-between border-b-2 border-slate-950'>
                <span className='flex'>
                    <span className='font-bold text-xs'>Sodium</span>
                    <span className='text-xs'>(g)</span>
                </span>
                <span className='font-bold text-xs'>{recipeData.sodium}</span>
            </div>
            <div className='flex justify-between border-b-2 border-slate-950'>
                <span className='flex'>
                    <span className='font-bold text-xs'>Fiber</span>
                    <span className='text-xs'>(g)</span>
                </span>
                <span className='font-bold text-xs'>{recipeData.fiber}</span>
            </div>
        </div>
    );
}
