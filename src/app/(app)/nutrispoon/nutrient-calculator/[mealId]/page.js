'use client';
import React, { useEffect, useState } from 'react';
import { useRecipe } from '@/hooks/api/recipe';
import LogFoodList from '@/components/app/calculator/LogFoodList';
import Input from '@/components/Input';
import { NutrientCalculatorContext } from '@/stores/NutrientCalculatorContext';
import { Skeleton } from '@/components/ui/skeleton';

function LogFood({ params }) {
    const { index: getAllRecipe } = useRecipe();
    const [searchValue, setSearchValue] = useState(null);
    const [recipeData, setRecipeData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState();
    const itemsPerPage = 7;

    useEffect(() => {
        if (searchValue) {
            const data = recipeData.filter(item =>
                item.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredData(data);
            setLoading(false);
        } else {
            const fetchRecipe = async () => {
                setLoading(true);
                const { data } = await getAllRecipe();
                setRecipeData(data);
                setLoading(false);
            };

            fetchRecipe();
        }
    }, [searchValue]);

    const handlePageChange = newPage => {
        setCurrentPage(newPage);
    };

    let ui = loading ? (
        <div
            className='border rounded-xl shadow-lg 
                p-10 md:px-60 lg:px-60 md:pt-10 lg:pt-10 mt-4'
        >
            <Skeleton className='h-10 w-full rounded-full' />
            <Skeleton className='h-14 w-full rounded-full mt-10' />
            <Skeleton className='h-14 w-full rounded-full mt-4' />
            <Skeleton className='h-14 w-full rounded-full mt-4' />
            <Skeleton className='h-14 w-full rounded-full mt-4' />
            <Skeleton className='h-14 w-full rounded-full mt-4' />
            <Skeleton className='h-14 w-full rounded-full mt-4' />
            <Skeleton className='h-14 w-full rounded-full mt-4' />
            <Skeleton className='h-14 w-full rounded-full mt-4' />
        </div>
    ) : (
        <div
            className='bg-white border rounded-xl shadow-lg 
p-10 md:px-60 lg:px-60 md:pt-10 lg:pt-10 mt-4'
        >
            <div>
                <Input
                    type='text'
                    className='rounded-full mb-4'
                    placeholder='Search recipe...'
                    onChange={event => setSearchValue(event.target.value)}
                />
            </div>
            <LogFoodList />
            <div className='flex justify-center mt-4'>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='px-4 py-2 mr-2 bg-gray-800 text-white rounded disabled:opacity-50'
                >
                    Previous
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage * itemsPerPage >= recipeData.length}
                    className='px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50'
                >
                    Next
                </button>
            </div>
        </div>
    );

    return (
        <NutrientCalculatorContext.Provider
            value={{
                params,
                currentPage,
                itemsPerPage,
                searchValue,
                filteredData,
                recipeData,
            }}
        >
            {ui}
        </NutrientCalculatorContext.Provider>
    );
}

export default LogFood;
