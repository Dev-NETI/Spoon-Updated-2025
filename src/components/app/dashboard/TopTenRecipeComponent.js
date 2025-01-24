import React from 'react';
import TopTenRecipeCardComponent from './TopTenRecipeCardComponent';

function TopTenRecipeComponent() {
    return (
        <>
            <div className='flex flex-row z-50 mt-5'>
                <div className='basis-8/12'>
                    <p className='text-xl font-semibold'>Top Rated Recipes</p>
                </div>
                <div className='basis-6/12 text-end justify-between'>
                    <a
                        href='#'
                        className='text-blue-800 text-base text-balance '
                    >
                        View all &gt;
                    </a>
                </div>
            </div>
            <div className='grid grid-cols-12 gap-4 p-4'>
                <div className='col-span-12 md:col-span-4 lg:col-span-4'>
                    <TopTenRecipeCardComponent title='Top Rated Recipe' />
                </div>
            </div>
        </>
    );
}

export default TopTenRecipeComponent;
