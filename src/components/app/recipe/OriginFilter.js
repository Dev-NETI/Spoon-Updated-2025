import React from 'react';
import { useRecipeOrigin } from '@/hooks/api/recipe-origin';
import { FiMoreVertical, FiPlus } from 'react-icons/fi';

const OriginFilter = () => {
    const { index: getAllOrigin } = useRecipeOrigin();

    console.log(getAllOrigin);

    return (
        <div className='flex items-center border-2 p-2 rounded-xl justify-between'>
            <span className='flex items-center gap-2'>
                <FiMoreVertical />
                Cuisine
            </span>
            <FiPlus />
        </div>
    );
};

export default OriginFilter;
