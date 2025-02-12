'use client';
import React, { useEffect, useState } from 'react';
import { useRecipeOrigin } from '@/hooks/api/recipe-origin';
import { useMeal } from '@/hooks/api/meal';
import { useMealType } from '@/hooks/api/meal-type';
import { useFoodGroup } from '@/hooks/api/food-group';
import { useSeason } from '@/hooks/api/season';
import { FaStar } from 'react-icons/fa';
import { FiFilter, FiMinus, FiMoreVertical, FiPlus } from 'react-icons/fi';
import Image from 'next/image';
import { useTopRecipe } from '@/hooks/api/top-recipes';
import RecipeCarousel from '@/components/app/recipe/ImageCarousel';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Page() {
    const router = useRouter();

    const { index: getAllOrigin } = useRecipeOrigin();
    const { index: getAllMeal } = useMeal();
    const { index: getAllMealType } = useMealType();
    const { index: getAllFoodGroup } = useFoodGroup();
    const { index: getAllSeason } = useSeason();
    const { index: getAllTopRecipe } = useTopRecipe();

    const [searchValue, setSearchValue] = useState(null);
    const [filters, setFilters] = useState([]);
    const [openAccordions, setOpenAccordions] = useState([]);
    const [selectedOrigins, setSelectedOrigins] = useState([]);
    const [selectServed, setSelectServed] = useState([]);
    const [category, setCategory] = useState([]);
    const [weather, setWeather] = useState([]);
    const [foodGroup, setFoodGroup] = useState([]);

    const filterConcepts = [
        'Cuisine',
        'Best Served',
        'Category',
        'Weather',
        'Food Group',
    ];

    const [recipeDataState, setRecipeDataState] = useState({
        originData: [],
        mealHourData: [],
        mealTypeData: [],
        foodGroupData: [],
        seasonData: [],
        filteredRecipeData: [],
        topRecipe: [],
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
            const { data: topRecipe } = await getAllTopRecipe();
            setRecipeDataState(prevState => ({
                ...prevState,
                originData: originData,
                mealHourData: mealHourData,
                mealTypeData: mealTypeData,
                foodGroupData: foodGroupData,
                seasonData: seasonData,
                topRecipe: topRecipe,
            }));
            setRecipeState(prevState => ({
                ...prevState,
                loading: false,
            }));
        };

        fetchFilterData();
    }, []);

    const toggleAccordion = index => {
        if (openAccordions.includes(index)) {
            setOpenAccordions(openAccordions.filter(i => i !== index));
        } else {
            setOpenAccordions([...openAccordions, index]);
        }
    };

    const handleCheckboxChangeOrigin = event => {
        const { checked, value } = event.target;
        setSelectedOrigins(prevSelected =>
            checked
                ? [...prevSelected, value]
                : prevSelected.filter(origin => origin !== value)
        );
    };

    const handleCheckboxChangeBS = event => {
        const { checked, value } = event.target;
        setSelectServed(prevSelected =>
            checked
                ? [...prevSelected, value]
                : prevSelected.filter(origin => origin !== value)
        );
    };

    const handleCheckboxChangeCategory = event => {
        const { checked, value } = event.target;
        setCategory(prevSelected =>
            checked
                ? [...prevSelected, value]
                : prevSelected.filter(origin => origin !== value)
        );
    };

    const handleCheckBoxChangeWeather = event => {
        const { checked, value } = event.target;
        setWeather(prevSelected =>
            checked
                ? [...prevSelected, value]
                : prevSelected.filter(origin => origin !== value)
        );
    };

    const handleCheckBoxChangeFG = event => {
        const { checked, value } = event.target;
        setFoodGroup(prevSelected =>
            checked
                ? [...prevSelected, value]
                : prevSelected.filter(origin => origin !== value)
        );
    };

    const handleDataFromCarousel = (value, name) => {
        setSelectedOrigins([value + '.' + name]);
        setFilters(prevFilters => {
            const updatedFilters = {
                ...prevFilters,
                selectedOrigins: [value + '.' + name],
            };
            const serializedFilters = encodeURIComponent(
                JSON.stringify(updatedFilters)
            );
            router.push(`/recipe/filtered-recipe?filters=${serializedFilters}`);
        });
    };

    useEffect(() => {
        setFilters({
            selectServed,
            selectedOrigins,
            category,
            weather,
            foodGroup,
        });
    }, [selectServed, selectedOrigins, category, weather, foodGroup]);

    const handleSubmit = () => {
        const serializedFilters = encodeURIComponent(JSON.stringify(filters));
        router.push(`/recipe/filtered-recipe?filters=${serializedFilters}`);
    };

    const handleSearch = () => {
        const serializedFilters = encodeURIComponent(
            JSON.stringify(searchValue)
        );
        router.push(
            `/recipe/filtered-recipe?searchfilter=${serializedFilters}`
        );
    };

    const ui = recipeState.loading ? (
        <div className='flex xl:flex-row flex-col gap-5 max-w-screen'>
            <div className='flex flex-col xl:w-3/12 bg-slate-300 rounded-md shadow-sm h-80 animate-pulse'></div>
            <div className='flex flex-col h-full rounded-lg xl:w-6/12 gap-5'>
                <div className='w-full h-20 flex bg-slate-300 rounded-lg p-5 shadow-sm animate-pulse'></div>
                <div className='w-full h-36 xl:flex hidden bg-slate-300 rounded-lg p-5 shadow-sm animate-pulse mt-2'></div>
            </div>
            <div className='flex flex-col xl:w-3/12 bg-slate-300 rounded-md shadow-sm animate-pulse h-96'></div>
        </div>
    ) : (
        <div className='flex flex-col xl:flex-row gap-y-5 xl:gap-5 max-w-screen'>
            <div className='flex flex-col xl:w-3/12 bg-slate-100 rounded-md shadow-sm h-full'>
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
                                    className={`grid ps-5 bg-slate-200 rounded-b-xl overflow-hidden transition-all duration-500 ease-in-out ${
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
                                                        name={`originC-${origin.id}`}
                                                        value={
                                                            origin.id +
                                                            '.' +
                                                            origin.name
                                                        }
                                                        onChange={
                                                            handleCheckboxChangeOrigin
                                                        }
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
                                                        id={`checkbox-bsorigin-${index}`}
                                                        name={`originBS-${origin.id}`}
                                                        value={
                                                            origin.id +
                                                            '.' +
                                                            origin.name
                                                        }
                                                        onChange={
                                                            handleCheckboxChangeBS
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`checkbox-bsorigin-${index}`}
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
                                                        id={`checkbox-corigin-${index}`}
                                                        name={
                                                            'originC' +
                                                            origin.id
                                                        }
                                                        onChange={
                                                            handleCheckboxChangeCategory
                                                        }
                                                        value={
                                                            origin.id +
                                                            '.' +
                                                            origin.name
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`checkbox-corigin-${index}`}
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
                                                        id={`checkbox-worigin-${index}`}
                                                        name={
                                                            'originW' +
                                                            origin.id
                                                        }
                                                        value={
                                                            origin.id +
                                                            '.' +
                                                            origin.name
                                                        }
                                                        onChange={
                                                            handleCheckBoxChangeWeather
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`checkbox-worigin-${index}`}
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
                                                        id={`checkbox-fgorigin-${index}`}
                                                        name={
                                                            'originFG' +
                                                            origin.id
                                                        }
                                                        value={
                                                            origin.id +
                                                            '.' +
                                                            origin.name
                                                        }
                                                        onChange={
                                                            handleCheckBoxChangeFG
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`checkbox-fgorigin-${index}`}
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

                    <div className='flex justify-center mt-5'>
                        <button
                            onClick={handleSubmit}
                            className='bg-spoonblue w-full h-10 text-white rounded-full hover:bg-blue-950 justify-center items-center flex'
                        >
                            Show Results
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col h-full xl:w-6/12 gap-5'>
                <div className='w-full h-22 flex bg-slate-50 rounded-lg p-5 shadow-sm'>
                    <input
                        onChange={e => setSearchValue(e.target.value)}
                        className='px-4 py-2 w-full border border-slate-300 rounded-s-xl focus:ring-1 shadow-sm focus:ring-blue-300 outline-none'
                        placeholder='Search here..'
                    />
                    <button
                        onClick={handleSearch}
                        className='w-18 h-full bg-spoonblue text-white p-2 rounded-e-xl'
                    >
                        Search
                    </button>
                </div>
                <div className='xl:flex hidden flex-col max-w-screen xl:w-full h-full bg-slate-50 rounded-lg shadow-sm'>
                    <div className='flex items-center bg-spoonblue text-white rounded-t-md px-4 py-2 font-semibold'>
                        World Cuisine
                    </div>
                    <RecipeCarousel
                        recipeDataState={recipeDataState}
                        setOriginClick={handleDataFromCarousel}
                    />
                </div>
            </div>
            <div className='flex flex-col xl:w-3/12 bg-slate-100 rounded-md shadow-sm xl:max-h-[80vh]'>
                <div className='flex items-center bg-spoonblue text-white rounded-t-md px-4 py-2 font-semibold'>
                    Top 5 Most Popular Dishes
                </div>
                <div className='flex flex-col p-5 my-2 xl:overflow-y-auto xl:max-h-screen'>
                    {recipeDataState['topRecipe'] &&
                        recipeDataState['topRecipe'].map((recipe, index) => (
                            <Link
                                href={`recipe/${recipe.slug}`}
                                key={index}
                                className='flex flex-col bg-slate-200'
                            >
                                <div
                                    className={`flex p-3 gap-2 border-b border-slate-300 cursor-pointer hover:bg-slate-300 items-center`}
                                >
                                    <Image
                                        width={80}
                                        height={80}
                                        alt={'recipe' + index}
                                        src={
                                            process.env.NEXT_PUBLIC_STORAGE +
                                            '/assets/app/' +
                                            recipe.imagePath
                                        }
                                        className='rounded-md border border-gray-300 shadow-md w-20 h-20'
                                    />
                                    <div className='flex flex-col w-full'>
                                        <span className='text-[.8rem] font-bold'>
                                            {recipe.name}
                                        </span>
                                        <span className='px-2 py-1 text-[.7rem] bg-blue-950 text-white text-center rounded-md font-bold'>
                                            {recipe.mealType.toUpperCase()}
                                        </span>
                                        <div className='flex flex-col justify-start text-sm pt-2 font-semibold'>
                                            <div className='flex gap-1'>
                                                <Image
                                                    src={
                                                        process.env
                                                            .NEXT_PUBLIC_STORAGE +
                                                        recipe.flag
                                                    }
                                                    width={10}
                                                    height={10}
                                                    className='rounded-full w-4 h-4'
                                                    alt={'flag' + index}
                                                />
                                                <span className='text-[.8rem]'>
                                                    {recipe.origin}
                                                </span>
                                            </div>
                                            <div className='flex only:text-slate-700 gap-1 text-wrap items-center'>
                                                <FaStar className='text-yellow-400' />
                                                <span className='text-[.8rem]'>
                                                    #{recipe.reviews.length}{' '}
                                                    reviews
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
    return ui;
}

export default Page;
