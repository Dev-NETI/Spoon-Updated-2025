import React from 'react';
import LogFoodListItem from './LogFoodListItem';
import { NutrientCalculatorContext } from '@/stores/NutrientCalculatorContext';
import { useContext } from 'react';

function LogFoodList() {
    const { currentPage, itemsPerPage, searchValue, filteredData, recipeData } =
        useContext(NutrientCalculatorContext);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = searchValue
        ? filteredData
        : recipeData.slice(startIndex, endIndex);

    return (
        <>
            {currentItems.map(data => (
                <LogFoodListItem key={data.id} data={data} />
            ))}
        </>
    );
}

export default LogFoodList;
