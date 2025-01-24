'use client';
import React, { useEffect, useState } from 'react';
import { useRecipeOrigin } from '@/hooks/api/recipe-origin';
import { useMeal } from '@/hooks/api/meal';
import { useMealType } from '@/hooks/api/meal-type';
import { useFoodGroup } from '@/hooks/api/food-group';
import { useSeason } from '@/hooks/api/season';
import { useRecipe } from '@/hooks/api/recipe';
import { FaStar } from 'react-icons/fa';
import {
    FiChevronLeft,
    FiChevronRight,
    FiFilter,
    FiMinus,
    FiMoreVertical,
    FiPlus,
} from 'react-icons/fi';
import Image from 'next/image';

function Page({ params = null }) {
    const { index: getAllOrigin } = useRecipeOrigin();
    const { index: getAllMeal } = useMeal();
    const { index: getAllMealType } = useMealType();
    const { index: getAllFoodGroup } = useFoodGroup();
    const { index: getAllSeason } = useSeason();
    const { index: getAllRecipe } = useRecipe();

    const [recipeDataState, setRecipeDataState] = useState({
        originData: [],
        mealHourData: [],
        mealTypeData: [],
        foodGroupData: [],
        seasonData: [],
        allRecipeData: [],
        filteredRecipeData: [],
    });

    const [recipeState, setRecipeState] = useState({
        loading: true,
        searchField: '',
        selectedOriginData: [],
        selectedMealHourData: [],
        selectedMealTypeData: [],
        selectedFoodGroupData: [],
        selectedSeasonData: [],
    });

    useEffect(() => {
        const fetchFilterData = async () => {
            const { data: originData } = await getAllOrigin();
            const { data: mealHourData } = await getAllMeal();
            const { data: mealTypeData } = await getAllMealType();
            const { data: foodGroupData } = await getAllFoodGroup();
            const { data: seasonData } = await getAllSeason();
            const { data: allRecipeData } = await getAllRecipe();
            setRecipeDataState(prevState => ({
                ...prevState,
                originData: originData,
                mealHourData: mealHourData,
                mealTypeData: mealTypeData,
                foodGroupData: foodGroupData,
                seasonData: seasonData,
                allRecipeData: allRecipeData,
            }));
            setRecipeState(prevState => ({
                ...prevState,
                loading: false,
            }));
        };

        fetchFilterData();
    }, [
        getAllOrigin,
        getAllMeal,
        getAllMealType,
        getAllFoodGroup,
        getAllSeason,
        getAllRecipe,
    ]);

    useEffect(() => {
        if (params?.originId?.[0] && recipeDataState.allRecipeData.length > 0) {
            const filteredRecipes = recipeDataState.allRecipeData.filter(
                recipe =>
                    recipe.recipe_origin?.id === parseInt(params.originId[0])
            );

            if (filteredRecipes.length > 0) {
                setRecipeDataState(prevState => ({
                    ...prevState,
                    filteredRecipeData: filteredRecipes,
                }));
            }
        }
    }, [recipeDataState.allRecipeData, params?.originId?.[0]]);

    const filterConcepts = [
        'Cuisine',
        'Best Served',
        'Category',
        'Weather',
        'Food Group',
    ];

    const [openAccordions, setOpenAccordions] = useState([]);

    const toggleAccordion = index => {
        if (openAccordions.includes(index)) {
            // Close the accordion by removing its index
            setOpenAccordions(openAccordions.filter(i => i !== index));
        } else {
            // Open the accordion by adding its index
            setOpenAccordions([...openAccordions, index]);
        }
    };

    const [accordionData, setAccordionData] = useState([]);

    const ui = recipeState.loading ? (
        <div className='flex gap-5 min-w-screen'>
            <div className='flex flex-col w-3/12 bg-slate-300 rounded-md shadow-sm h-80 animate-pulse'></div>
            <div className='flex flex-col h-full rounded-lg w-6/12 gap-5'>
                <div className='w-full h-20 flex bg-slate-300 rounded-lg p-5 shadow-sm animate-pulse'></div>
                <div className='w-full h-36 flex bg-slate-300 rounded-lg p-5 shadow-sm animate-pulse mt-2'></div>
            </div>
            <div className='flex flex-col w-3/12 bg-slate-300 rounded-md shadow-sm animate-pulse h-96'></div>
        </div>
    ) : (
        <div className='flex gap-5 min-w-screen'>
            <div className='flex flex-col w-3/12 bg-slate-100 rounded-md shadow-sm h-full'>
                <div className='flex items-center bg-spoonblue text-white rounded-t-md px-4 py-2 font-semibold'>
                    <FiFilter />
                    <span className='ps-1'>Filter</span>
                </div>
                <div className='flex flex-col p-5'>
                    {filterConcepts.map((concept, index) => {
                        const isOpen = openAccordions.includes(index);

                        return (
                            <div key={index} className='mb-2'>
                                {/* Accordion Header */}
                                <div
                                    onClick={() => toggleAccordion(index)}
                                    className={`flex items-center border-2 p-2 justify-between cursor-pointer hover:border-indigo-700/50 transition duration-500 ease-in-out ${
                                        isOpen ? 'rounded-t-xl' : 'rounded-xl'
                                    }`}
                                >
                                    <span className='flex items-center gap-2'>
                                        <FiMoreVertical />
                                        {concept}
                                    </span>
                                    <div
                                        className={`transition duration-300 ease-in-out ${
                                            isOpen ? 'rotate-0' : 'rotate-180'
                                        }`}
                                    >
                                        {isOpen ? <FiMinus /> : <FiPlus />}
                                    </div>
                                </div>

                                {/* Accordion Content */}
                                <div
                                    className={`grid ps-5 bg-slate-200 rounded-b-xl overflow-hidden transition-all duration-700 ease-in-out ${
                                        isOpen
                                            ? 'max-h-[1000px] opacity-100'
                                            : 'opacity-0 max-h-0'
                                    }`}
                                >
                                    {recipeDataState['originData'] &&
                                        concept === 'Cuisine' &&
                                        recipeDataState['originData'].map(
                                            (origin, index) => (
                                                <div
                                                    key={index}
                                                    className='flex gap-2 mt-1 pb-1 overflow-hidden'
                                                >
                                                    <input
                                                        type='checkbox'
                                                        id={`checkbox-origin-${index}`}
                                                    />
                                                    <label
                                                        htmlFor={`checkbox-origin-${index}`}
                                                        className='text-xs text-slate-500'
                                                    >
                                                        {origin.name}
                                                    </label>
                                                </div>
                                            )
                                        )}

                                    {recipeDataState['mealHourData'] &&
                                        concept === 'Best Served' &&
                                        recipeDataState['mealHourData'].map(
                                            (origin, index) => (
                                                <div
                                                    key={index}
                                                    className='flex gap-2 mt-1 pb-1 overflow-hidden'
                                                >
                                                    <input
                                                        type='checkbox'
                                                        id={`checkbox-origin-${index}`}
                                                    />
                                                    <label
                                                        htmlFor={`checkbox-origin-${index}`}
                                                        className='text-xs text-slate-500'
                                                    >
                                                        {origin.name.toUpperCase()}
                                                    </label>
                                                </div>
                                            )
                                        )}

                                    {recipeDataState['mealTypeData'] &&
                                        concept === 'Category' &&
                                        recipeDataState['mealTypeData'].map(
                                            (origin, index) => (
                                                <div
                                                    key={index}
                                                    className='flex gap-2 mt-1 pb-1 overflow-hidden'
                                                >
                                                    <input
                                                        type='checkbox'
                                                        id={`checkbox-origin-${index}`}
                                                    />
                                                    <label
                                                        htmlFor={`checkbox-origin-${index}`}
                                                        className='text-xs text-slate-500'
                                                    >
                                                        {origin.name.toUpperCase()}
                                                    </label>
                                                </div>
                                            )
                                        )}

                                    {recipeDataState['seasonData'] &&
                                        concept === 'Weather' &&
                                        recipeDataState['seasonData'].map(
                                            (origin, index) => (
                                                <div
                                                    key={index}
                                                    className='flex gap-2 mt-1 pb-1 overflow-hidden'
                                                >
                                                    <input
                                                        type='checkbox'
                                                        id={`checkbox-origin-${index}`}
                                                    />
                                                    <label
                                                        htmlFor={`checkbox-origin-${index}`}
                                                        className='text-xs text-slate-500'
                                                    >
                                                        {origin.name.toUpperCase()}
                                                    </label>
                                                </div>
                                            )
                                        )}

                                    {recipeDataState['foodGroupData'] &&
                                        concept === 'Food Group' &&
                                        recipeDataState['foodGroupData'].map(
                                            (origin, index) => (
                                                <div
                                                    key={index}
                                                    className='flex gap-2 mt-1 pb-1 overflow-hidden'
                                                >
                                                    <input
                                                        type='checkbox'
                                                        id={`checkbox-origin-${index}`}
                                                    />
                                                    <label
                                                        htmlFor={`checkbox-origin-${index}`}
                                                        className='text-xs text-slate-500'
                                                    >
                                                        {origin.name.toUpperCase()}
                                                    </label>
                                                </div>
                                            )
                                        )}
                                </div>
                            </div>
                        );
                    })}

                    <div className='flex items-center'>
                        <button className='bg-spoonblue w-full h-10 text-white rounded-full hover:bg-blue-950'>
                            Show Results
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col h-full w-6/12 gap-5'>
                <div className='w-full h-22 flex bg-slate-50 rounded-lg p-5 shadow-sm'>
                    <input
                        className='px-4 py-2 w-full border border-slate-300 rounded-s-xl focus:ring-1 shadow-sm focus:ring-blue-300 outline-none'
                        placeholder='Search here..'
                    />
                    <button className='w-18 h-full bg-spoonblue text-white p-2 rounded-e-xl'>
                        Search
                    </button>
                </div>
                <div className='flex flex-col w-full h-full bg-slate-50 rounded-lg shadow-sm'>
                    <div className='flex items-center bg-spoonblue text-white rounded-t-md px-4 py-2 font-semibold'>
                        World Cuisine For You
                    </div>
                    <div className='flex w-full gap-5 p-5 items-center justify-between'>
                        <div className='text-4xl text-spoonblue'>
                            <FiChevronLeft />
                        </div>
                        <div className='flex gap-5 w-full justify-between bg-slate-200 py-2 px-5 rounded-lg'>
                            <div className='flex cursor-pointer hover:-translate-y-0.5 duration-300 ease-in-out'>
                                <div className='flex flex-col items-center'>
                                    <Image
                                        width={100}
                                        height={100}
                                        src='/assets/app/icons/armenia flag.png'
                                        alt='Armenian'
                                        className='w-28 h-28 rounded-full border border-gray-300 shadow-md'
                                    />
                                    <span className='text-sm text-gray-700 mt-2'>
                                        Armenian
                                    </span>
                                </div>
                            </div>
                            <div className='flex cursor-pointer hover:-translate-y-0.5 duration-300 ease-in-out'>
                                <div className='flex flex-col items-center'>
                                    <Image
                                        width={100}
                                        height={100}
                                        src='/assets/app/icons/armenia flag.png'
                                        alt='Jpn'
                                        className='w-28 h-28 rounded-full border border-gray-300 shadow-md'
                                    />
                                    <span className='text-sm text-gray-700 mt-2'>
                                        Japanese
                                    </span>
                                </div>
                            </div>
                            <div className='flex cursor-pointer hover:-translate-y-0.5 duration-300 ease-in-out'>
                                <div className='flex flex-col items-center'>
                                    <Image
                                        width={100}
                                        height={100}
                                        src='/assets/app/icons/armenia flag.png'
                                        alt='Jpn'
                                        className='w-28 h-28 rounded-full border border-gray-300 shadow-md'
                                    />
                                    <span className='text-sm text-gray-700 mt-2'>
                                        Japanese
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='text-4xl text-spoonblue'>
                            <FiChevronRight />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-3/12 h-full bg-slate-100 rounded-md shadow-sm'>
                <div className='flex items-center bg-spoonblue text-white rounded-t-md px-4 py-2 font-semibold'>
                    Top 5 Most Popular Dishes
                </div>
                <div className='flex flex-col p-5 my-2'>
                    <div className='flex-col bg-slate-200'>
                        <div className='flex p-3 gap-2 border-b border-slate-300 cursor-pointer hover:bg-slate-300'>
                            <Image
                                width={80}
                                height={80}
                                alt='flag'
                                src='/assets/app/recipes/pork bistek.jpg'
                                className='rounded-md border border-gray-300 shadow-md'
                            />
                            <div className='flex flex-col w-full'>
                                <span className='font-bold'>Pork Bistek</span>
                                <span className='px-2 py-1 text-xs w-32 bg-blue-950 text-white text-center rounded-md'>
                                    MAIN COURSE
                                </span>
                                <div className='flex flex-col justify-start text-sm pt-2 font-semibold'>
                                    <div className='flex gap-1'>
                                        <Image
                                            src='/assets/app/icons/armenia flag.png'
                                            width={10}
                                            height={10}
                                            className='rounded-full w-4 h-4'
                                            alt='flag'
                                        />
                                        <span>Filipino</span>
                                    </div>
                                    <div className='flex only:text-slate-700 gap-1 text-wrap'>
                                        <FaStar className='text-yellow-400' />
                                        <span className='text-sm'>
                                            #5 Reviews
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex-col bg-slate-200'>
                        <div className='flex p-3 gap-2 border-b border-slate-300 cursor-pointer hover:bg-slate-300'>
                            <Image
                                width={80}
                                height={80}
                                alt='flag'
                                src='/assets/app/recipes/pork bistek.jpg'
                                className='rounded-md border border-gray-300 shadow-md'
                            />
                            <div className='flex flex-col w-full'>
                                <span className='font-bold'>Pork Bistek</span>
                                <span className='px-2 py-1 text-xs w-32 bg-blue-950 text-white text-center rounded-md'>
                                    MAIN COURSE
                                </span>
                                <div className='flex flex-col justify-start text-sm pt-2 font-semibold'>
                                    <div className='flex gap-1'>
                                        <Image
                                            src='/assets/app/icons/armenia flag.png'
                                            width={10}
                                            height={10}
                                            className='rounded-full w-4 h-4'
                                            alt='flag'
                                        />
                                        <span>Filipino</span>
                                    </div>
                                    <div className='flex only:text-slate-700 gap-1 text-wrap'>
                                        <FaStar className='text-yellow-400' />
                                        <span className='text-sm'>
                                            #5 Reviews
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex-col bg-slate-200'>
                        <div className='flex p-3 gap-2 border-b border-slate-300 cursor-pointer hover:bg-slate-300'>
                            <Image
                                width={80}
                                height={80}
                                alt='flag'
                                src='/assets/app/recipes/pork bistek.jpg'
                                className='rounded-md border border-gray-300 shadow-md'
                            />
                            <div className='flex flex-col w-full'>
                                <span className='font-bold'>Pork Bistek</span>
                                <span className='px-2 py-1 text-xs w-32 bg-blue-950 text-white text-center rounded-md'>
                                    MAIN COURSE
                                </span>
                                <div className='flex flex-col justify-start text-sm pt-2 font-semibold'>
                                    <div className='flex gap-1'>
                                        <Image
                                            src='/assets/app/icons/armenia flag.png'
                                            width={10}
                                            height={10}
                                            className='rounded-full w-4 h-4'
                                            alt='flag'
                                        />
                                        <span>Filipino</span>
                                    </div>
                                    <div className='flex only:text-slate-700 gap-1 text-wrap'>
                                        <FaStar className='text-yellow-400' />
                                        <span className='text-sm'>
                                            #5 Reviews
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex-col bg-slate-200'>
                        <div className='flex p-3 gap-2 border-b border-slate-300 cursor-pointer hover:bg-slate-300'>
                            <Image
                                width={80}
                                height={80}
                                alt='flag'
                                src='/assets/app/recipes/pork bistek.jpg'
                                className='rounded-md border border-gray-300 shadow-md'
                            />
                            <div className='flex flex-col w-full'>
                                <span className='font-bold'>Pork Bistek</span>
                                <span className='px-2 py-1 text-xs w-32 bg-blue-950 text-white text-center rounded-md'>
                                    MAIN COURSE
                                </span>
                                <div className='flex flex-col justify-start text-sm pt-2 font-semibold'>
                                    <div className='flex gap-1'>
                                        <Image
                                            src='/assets/app/icons/armenia flag.png'
                                            width={10}
                                            height={10}
                                            className='rounded-full w-4 h-4'
                                            alt='flag'
                                        />
                                        <span>Filipino</span>
                                    </div>
                                    <div className='flex only:text-slate-700 gap-1 text-wrap'>
                                        <FaStar className='text-yellow-400' />
                                        <span className='text-sm'>
                                            #5 Reviews
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex-col bg-slate-200'>
                        <div className='flex p-3 gap-2 border-b border-slate-300 cursor-pointer hover:bg-slate-300'>
                            <Image
                                width={80}
                                height={80}
                                alt='flag'
                                src='/assets/app/recipes/pork bistek.jpg'
                                className='rounded-md border border-gray-300 shadow-md'
                            />
                            <div className='flex flex-col w-full'>
                                <span className='font-bold'>Pork Bistek</span>
                                <span className='px-2 py-1 text-xs w-32 bg-blue-950 text-white text-center rounded-md'>
                                    MAIN COURSE
                                </span>
                                <div className='flex flex-col justify-start text-sm pt-2 font-semibold'>
                                    <div className='flex gap-1'>
                                        <Image
                                            src='/assets/app/icons/armenia flag.png'
                                            width={10}
                                            height={10}
                                            className='rounded-full w-4 h-4'
                                            alt='flag'
                                        />
                                        <span>Filipino</span>
                                    </div>
                                    <div className='flex only:text-slate-700 gap-1 text-wrap'>
                                        <FaStar className='text-yellow-400' />
                                        <span className='text-sm'>
                                            #5 Reviews
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <RecipeContext.Provider
        //     value={{
        //         recipeDataState,
        //         setRecipeDataState,
        //         isDrawerOpen,
        //         setIsDrawerOpen,
        //         recipeState,
        //         setRecipeState,
        //         resetFilterStates,
        //     }}
        // >
        //     <div>
        //         <InputWithIcon
        //             icon='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
        //             label={'Search'}
        //             type='text'
        //             value={recipeState.searchField}
        //             onChange={event => handleSearch(event.target.value)}
        //         />
        //     </div>
        //     <div className='flex flex-row gap-1'>
        //         {recipeDataState.filteredRecipeData.length > 0 ? (
        //             <>
        //                 <Chip
        //                     label={`Showing ${recipeDataState.filteredRecipeData.length} result${recipeDataState.filteredRecipeData.length > 1 ? 's' : ''}.`}
        //                 />
        //                 <div className='flex items-center justify-center py-1'>
        //                     <h1
        //                         className='font-semibold text-blue-700'
        //                         onClick={() => {
        //                             setRecipeDataState(prevState => ({
        //                                 ...prevState,
        //                                 filteredRecipeData: [],
        //                             }));
        //                             resetFilterStates();
        //                         }}
        //                     >
        //                         Reset
        //                     </h1>
        //                 </div>
        //             </>
        //         ) : (
        //             <button
        //                 onClick={() => setIsDrawerOpen(true)}
        //                 className='py-2 px-5 bg-gray-300 rounded-md'
        //             >
        //                 <TuneIcon color='disabled' />
        //             </button>
        //         )}
        //     </div>
        //     <DrawerComponent />
        //     <div className='py-5'>
        //         <RecipeListComponent
        //             data={
        //                 recipeDataState.filteredRecipeData.length > 0
        //                     ? recipeDataState.filteredRecipeData
        //                     : recipeDataState.allRecipeData
        //             }
        //         />
        //     </div>
        // </RecipeContext.Provider>
    );
    return ui;
}

export default Page;
