'use client';
import { useState, useEffect } from 'react';
import { useRecipe } from '@/hooks/api/recipe';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Oops from '/public/assets/app/bad_request/Oops.png';
import { FiSearch, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const FilteredRecipePage = () => {
    const searchParams = useSearchParams();
    const filters = searchParams.get('filters');
    const searchfilters = searchParams.get('searchfilter');
    const parsedFilters = filters
        ? JSON.parse(decodeURIComponent(filters))
        : null;

    const parsedSearchFilters = searchfilters
        ? JSON.parse(decodeURIComponent(searchfilters))
        : null;

    const { index: getAllRecipe } = useRecipe();
    const [recipeDataState, setRecipeDataState] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState([]);
    const numPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState([]);
    const [weather, setWeather] = useState([]);
    const [origin, setOrigin] = useState([]);
    const [bestServed, setBestServed] = useState([]);
    const [foodGroup, setFoodGroup] = useState([]);
    const [filteredRecipeData, setFilteredRecipeData] = useState([]);
    const [inputSearchValue, setInputValue] = useState('');

    // MARK: RECIPE
    useEffect(() => {
        Object.entries(parsedFilters ?? {}).map(([key, value]) => {
            if (key === 'selectServed') {
                setBestServed(value);
            } else if (key === 'selectedOrigins') {
                setOrigin(value);
            } else if (key === 'category') {
                setCategory(value);
            } else if (key === 'weather') {
                setWeather(value);
            } else if (key === 'foodGroup') {
                setFoodGroup(value);
            }
        });

        searchfilters && setInputValue(parsedSearchFilters);

        const fetchRecipes = async () => {
            const { data: allRecipeData } = await getAllRecipe();
            setRecipeDataState(allRecipeData);
        };

        fetchRecipes();
    }, []);

    const handleClearSearchInput = () => {
        setInputValue('');
    };

    // MARK: PAGINATION
    useEffect(() => {
        const originIds = origin?.map((value, index) => {
            const part = value.split('.');
            return part[0];
        });

        const seasonIds = weather?.map((value, index) => {
            const part = value.split('.');
            return part[0];
        });

        const mealCategoryIds = category?.map((value, index) => {
            const part = value.split('.');
            return part[0];
        });

        const foodGroupIds = foodGroup?.map((value, index) => {
            const part = value.split('.');
            return part[0];
        });

        const mealTypeIds = bestServed?.map((value, index) => {
            const part = value.split('.');
            const meal = [part[1].toLowerCase(), 1];
            return meal;
        });

        if (Object.keys(recipeDataState).length > 0) {
            var filteredData = recipeDataState;

            if (originIds.length > 0) {
                filteredData = Object.fromEntries(
                    Object.entries(filteredData).filter(([_, value]) => {
                        const hasMatchingOrigin =
                            value.recipe_origin &&
                            originIds.includes(String(value.recipe_origin?.id));
                        // Include entry if it matches either condition
                        return hasMatchingOrigin;
                    })
                );
            }

            if (seasonIds.length > 0) {
                filteredData = Object.fromEntries(
                    Object.entries(filteredData).filter(([_, value]) => {
                        const hasMatchingSeason =
                            value.season_list_item &&
                            value.season_list_item.some(item =>
                                seasonIds.includes(String(item.season?.id))
                            );

                        // Include entry if it matches either condition
                        return hasMatchingSeason;
                    })
                );
            }

            if (mealCategoryIds.length > 0) {
                filteredData = Object.fromEntries(
                    Object.entries(filteredData).filter(([_, value]) => {
                        const hasMatchingCategory =
                            value.meal_type &&
                            mealCategoryIds.includes(
                                String(value.meal_type?.id)
                            );

                        // Include entry if it matches either condition
                        return hasMatchingCategory;
                    })
                );
            }

            if (foodGroupIds.length > 0) {
                filteredData = Object.fromEntries(
                    Object.entries(filteredData).filter(([_, value]) => {
                        const hasMatchingFoodGroup =
                            value.food_group_list_item &&
                            value.food_group_list_item.some(item =>
                                foodGroupIds.includes(
                                    String(item.food_group?.id)
                                )
                            );

                        // Include entry if it matches either condition
                        return hasMatchingFoodGroup;
                    })
                );
            }

            if (mealTypeIds.length > 0) {
                let filterConditions = Object.fromEntries(
                    mealTypeIds.map(([key, value]) => [key, Number(value)])
                );

                filteredData = filteredData.filter(entry =>
                    Object.entries(filterConditions).every(
                        ([key, value]) => entry[key] === value
                    )
                );
            }

            if (inputSearchValue) {
                filteredData = Object.fromEntries(
                    Object.entries(filteredData).filter(([_, value]) => {
                        // Case-insensitive match for recipe_origin?.id
                        const hasMatchingName = String(value?.name)
                            .toLowerCase()
                            .includes(inputSearchValue.toLowerCase());

                        // Include entry if it matches the search value
                        return hasMatchingName;
                    })
                );
            }

            const filteredArray = Object.values(filteredData);
            setFilteredRecipeData(filteredArray);

            const startIndex = (currentPage - 1) * numPerPage;
            const endIndex = startIndex + numPerPage;

            setPages(filteredArray.slice(startIndex, endIndex));
            setLoading(false);
        }
    }, [currentPage, recipeDataState, inputSearchValue]);

    const totalPages = Math.ceil(filteredRecipeData.length / numPerPage);

    const handlePageChange = pageNumber => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);
            if (currentPage > 3) {
                pageNumbers.push('...');
            }
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
            if (currentPage < totalPages - 2) {
                pageNumbers.push('...');
            }
            pageNumbers.push(totalPages);
        }

        return pageNumbers.map((page, index) => (
            <button
                key={index}
                className={`rounded-md shadow-md px-3 hover:scale-105 duration-150 ease-in-out ${
                    page === currentPage
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-100'
                }`}
                onClick={() =>
                    typeof page === 'number' && handlePageChange(page)
                }
            >
                {page}
            </button>
        ));
    };

    return (
        <div className='flex flex-col gap-2'>
            {loading ? (
                <div className='flex bg-slate-300 w-full h-20 animate-pulse p-4 rounded-md justify-center items-center shadow-md'></div>
            ) : (
                <div>
                    <div className='flex justify-between text-gray-900 font-semibold text-sm'>
                        <div className='flex flex-col gap-2'>
                            <span>Filtered results for:</span>
                            <div className='flex gap-2'>
                                {Object.entries(parsedFilters ?? {}).map(
                                    ([key, value]) =>
                                        value.length ? (
                                            <span
                                                key={key}
                                                className='bg-slate-50 p-1 rounded-md shadow-sm text-xs'
                                            >
                                                {(() => {
                                                    switch (key) {
                                                        case 'selectServed':
                                                            return 'Best Served';
                                                        case 'category':
                                                            return 'Category';
                                                        case 'weather':
                                                            return 'Weather';
                                                        case 'selectedOrigins':
                                                            return 'Cuisine';
                                                        case 'foodGroup':
                                                            return 'Food Group';
                                                        default:
                                                            return 'Search for';
                                                    }
                                                })()}
                                                : (
                                                {Array.isArray(value) ? (
                                                    value.map((data, index) => {
                                                        const part =
                                                            data.split('.');
                                                        return (
                                                            <span key={data}>
                                                                <span className=''>
                                                                    {index + 1}.{' '}
                                                                </span>
                                                                <span className='text-blue-500'>
                                                                    {part[1]?.toUpperCase() +
                                                                        ' '}
                                                                </span>
                                                            </span>
                                                        );
                                                    })
                                                ) : (
                                                    <span className='text-red-500'>
                                                        Invalid Value
                                                    </span>
                                                )}
                                                )
                                            </span>
                                        ) : null
                                )}
                            </div>
                        </div>
                        <div className='flex justify-center items-center'>
                            <Link
                                href='/recipe'
                                className='flex item-center justify-center p-2 bg-red-600 text-white rounded-md shadow-sm cursor-pointer hover:bg-red-700 active:scale-105 duration-150 ease-in-out'
                            >
                                Reset filter
                            </Link>
                        </div>
                    </div>
                    <div className='flex gap-2 h-18 items-center'>
                        <div className='flex bg-slate-100 w-6/12 p-4 rounded-md justify-center items-center shadow-md mt-4'>
                            <input
                                type='text'
                                onChange={e => {
                                    setCurrentPage(1);
                                    setInputValue(e.target.value);
                                }}
                                value={inputSearchValue}
                                className='bg-slate-200 rounded-s-md w-11/12 ring-1 ring-slate-300 focus:ring-1 shadow-sm focus:ring-blue-300 outline-none p-2'
                                placeholder='Search for a recipe'
                            />
                            <div className='bg-slate-100 ring-1 text-2xl flex items-center justify-center ring-slate-300 text-slate-500 h-full rounded-e-md p-2'>
                                <FiSearch
                                    className={`ease-in-out duration-500 ${
                                        inputSearchValue
                                            ? 'opacity-0 w-0'
                                            : 'opacity-100'
                                    }`}
                                />
                                <FiX
                                    onClick={handleClearSearchInput}
                                    className={`text-red-700 cursor-pointer hover:scale-125 ease-in-out duration-500 ${
                                        inputSearchValue
                                            ? 'transform opacity-100 scale-110'
                                            : 'opacity-0 w-0'
                                    }`}
                                />
                            </div>
                        </div>
                        {totalPages > 1 && (
                            <div className='flex gap-2 mt-5 text-gray-700 text-xs font-semibold justify-center w-6/12 h-10 px-5'>
                                <button
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    className={`w-2/12 bg-indigo-900 font-bold text-md text-white rounded-md shadow-md p-3 hover:scale-105 duration-300 ease-in-out ${
                                        currentPage === 1 ? 'opacity-50' : ''
                                    }`}
                                >
                                    Prev
                                </button>
                                <div className='w-8/12 flex justify-center gap-3'>
                                    {renderPageNumbers()}
                                </div>
                                <button
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    className={`w-2/12 bg-indigo-900 text-md  text-white font-bold rounded-md shadow-md p-3 hover:scale-105 duration-300 ease-in-out  ${
                                        currentPage === totalPages
                                            ? 'opacity-50'
                                            : ''
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Recipe Cards */}
                    <div className='flex flex-shrink-0 flex-wrap gap-x-5 gap-y-2 justify-center mt-4 w-full'>
                        {pages.length > 0 ? (
                            <>
                                {pages.map((recipe, index) => (
                                    <Link
                                        key={recipe.id || index} // Ensure each recipe has a unique key
                                        href={'/recipe/' + recipe.slug}
                                        className='flex'
                                    >
                                        <motion.div
                                            className='bg-blue-950 flex flex-col w-52 py-1 px-2 rounded-lg shadow-md transition-all hover:scale-105 duration-300 ease-in-out cursor-pointer ring-2 active:ring-spoonblue active:bg-blue-900'
                                            key={recipe.id || index} // Ensure each recipe has a unique key
                                            initial={{
                                                opacity: 0,
                                                scale: 0.97,
                                            }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0 }}
                                            transition={{
                                                duration: 0.1,
                                                scale: {
                                                    type: 'spring',
                                                    visualDuration: 0.1,
                                                    bounce: 0.2,
                                                },
                                            }}
                                        >
                                            <div className='relative z-10 p-0'>
                                                <Image
                                                    src={
                                                        process.env
                                                            .NEXT_PUBLIC_STORAGE +
                                                        recipe.recipe_origin
                                                            .image_path
                                                    }
                                                    width={10}
                                                    height={10}
                                                    alt='flag'
                                                    className='shadow-md absolute w-auto h-auto rounded-full right-0'
                                                />
                                            </div>
                                            <div className='flex items-center p-1 z-0'>
                                                <Image
                                                    width={30}
                                                    height={30}
                                                    src={
                                                        process.env
                                                            .NEXT_PUBLIC_STORAGE +
                                                        '/assets/app/' +
                                                        recipe.image_path
                                                    }
                                                    alt='recipe_img'
                                                    className='w-20 h-20 rounded-s-md bg-slate-100 p-1'
                                                />
                                                <span className='bg-slate-900 h-full w-full rounded-e-md font-bold text-[9px] flex p-1 justify-center items-center text-white'>
                                                    {recipe.name}
                                                </span>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </>
                        ) : (
                            <div className='flex flex-col justify-center items-center h-full min-h-96 p-2 rounded-md w-full bg-slate-400 bg-opacity-50 shadow-md'>
                                <div className='flex'>
                                    <Image
                                        src={Oops}
                                        alt='errorpic'
                                        width={200}
                                        height={200}
                                        className='w-auto h-auto'
                                        priority
                                    />
                                </div>
                                <div className='flex font-bold text-4xl text-spoonblue'>
                                    No Result Found. :(
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilteredRecipePage;
