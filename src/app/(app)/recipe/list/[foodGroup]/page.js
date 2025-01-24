'use client';
import React, { useEffect, useState } from 'react';
import InputWithIcon from '@/components/InputWithIcon';
import { useRecipe } from '@/hooks/api/recipe';
import RecipeListComponent from '@/components/app/recipe/RecipeListComponent';

function page({ params }) {
    const [recipeListState, setRecipeListState] = useState({
        recipeData: [],
        filteredData: null,
    });
    const { show: getRecipeData } = useRecipe('food-group');

    useEffect(() => {
        const fetchRecipeData = async () => {
            const { data } = await getRecipeData(params.foodGroup);
            setRecipeListState(prevState => ({
                ...prevState,
                recipeData: data,
            }));
        };

        fetchRecipeData();
    }, []);

    const handleSearch = searchValue => {
        const result = recipeListState.recipeData.filter(data =>
            data.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        if (result.length < 1) {
            setRecipeListState(prevState => ({
                ...prevState,
                filteredData: null,
            }));
        }
        setRecipeListState(prevState => ({
            ...prevState,
            filteredData: result,
        }));
    };

    return (
        <>
            <div className='flex flex-row md:justify-end'>
                <div className='basis-full md:basis-1/2 lg:basis-1/4'>
                    <InputWithIcon
                        icon='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                        label={'Search'}
                        onChange={e => handleSearch(e.target.value)}
                    />
                </div>
            </div>

            <RecipeListComponent
                data={
                    recipeListState.filteredData
                        ? recipeListState.filteredData
                        : recipeListState.recipeData
                }
            />
        </>
    );
}

export default page;
