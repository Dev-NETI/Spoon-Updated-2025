'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Chip, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IngridientsTab from './IngridientsTab';
import InstructionTab from './InstructionTab';
import NutritionTab from './NutritionTab';
import { useRecipe } from '@/hooks/api/recipe';
import RecipeViewIconCardComponent from '@/components/app/recipe-view/RecipeViewIconCardComponent';
import SaveRecipeComponent from '@/components/app/recipe-view/SaveRecipeComponent';
import { useSavedRecipe } from '@/hooks/api/saved-recipe';
import { useAuth } from '@/hooks/auth';
import CustomizedSnackbar from '@/components/CustomSnackBar';
import CommentSection from '@/components/app/recipe-view/CommentSection';
import { useRecipeReview } from '@/hooks/api/recipe-review';
import SpoonLoading from '../../SpoonLoading';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function page({ params }) {
    const { user } = useAuth({ middleware: 'auth' });
    const { show: showRecipe } = useRecipe();
    const [recipeData, setRecipeData] = useState();
    const [isRecipeSaved, setIsRecipeSaved] = useState();
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(2);
    const [snackBarState, setSnackBarState] = useState({
        severity: 'success',
        open: false,
        message: 'This is a success Alert inside a Snackbar!',
    });
    const [tab, setTab] = useState(0);
    const handleChange = (event, newTab) => {
        setTab(newTab);
    };
    const { showWith2Parameter: getIsSaved } = useSavedRecipe('show');
    const { store: saveToFavorite } = useSavedRecipe();
    const { destroy2Parameter: unSaveRecipe } = useSavedRecipe('destroy');
    const { show: showRecipeReview } = useRecipeReview();
    const [recipeReviewData, setRecipeReviewData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await showRecipe(params.slug);
            setRecipeData(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (recipeData) {
            const fetchData = async () => {
                const { data: isSavedData } = await getIsSaved(
                    recipeData.id,
                    user.id
                );
                // const { data: isSavedData } = await getIsSaved(1025, 4);
                setIsRecipeSaved(isSavedData);
                const { data: reviewData } = await showRecipeReview(
                    recipeData.id
                );
                setRecipeReviewData(reviewData);
                setLoading(false);
            };
            fetchData();
        }
    }, [recipeData, snackBarState]);

    async function handleSaveRecipe() {
        const object = {
            recipeId: recipeData.id,
            userId: user.id,
        };
        if (isRecipeSaved) {
            //unsave
            const { data: destroyResponse } = await unSaveRecipe(
                recipeData.id,
                user.id
            );
            destroyResponse
                ? setSnackBarState(() => ({
                      severity: 'warning',
                      open: true,
                      message: 'Recipe removed from favorites!',
                  }))
                : setSnackBarState(() => ({
                      severity: 'error',
                      open: true,
                      message: 'Oops! Something went wrong!',
                  }));
        } else {
            //save
            const { data: storeResponse } = await saveToFavorite(object);
            storeResponse
                ? setSnackBarState(() => ({
                      severity: 'success',
                      open: true,
                      message: 'Recipe added to favorites!',
                  }))
                : setSnackBarState(() => ({
                      severity: 'error',
                      open: true,
                      message: 'Oops! Something went wrong!',
                  }));
        }
    }

    function closeSnackBar() {
        setSnackBarState(prevState => ({
            ...prevState,
            open: false,
        }));
    }

    const ui = loading ? (
        <SpoonLoading />
    ) : (
        <div className='flex flex-col space-y-8'>
            <Paper elevation={3} className='p-6 rounded-lg shadow-lg'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4'>
                    <h1 className='text-3xl sm:text-4xl font-bold text-gray-800'>
                        {recipeData?.name}
                    </h1>
                    <SaveRecipeComponent
                        isSaved={isRecipeSaved}
                        onClick={handleSaveRecipe}
                    />
                </div>
                <div className='flex items-center space-x-2 mb-6'>
                    <Rating
                        name='recipe-rating'
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        precision={0.5}
                    />
                    <p className='text-sm text-gray-600'>
                        {value}/5 (163 reviews)
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <div className='relative w-full h-0 pb-[75%] rounded-xl overflow-hidden shadow-lg'>
                        <Image
                            src={
                                `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
                                '/storage/' +
                                recipeData?.image_path
                            }
                            alt={recipeData?.name}
                            layout='fill'
                            objectFit='cover'
                            className='absolute top-0 left-0 w-full h-full'
                        />
                    </div>

                    <div className='grid grid-cols-3 sm:grid-cols-3 gap-4'>
                        <RecipeViewIconCardComponent
                            src='/images/cooking.png'
                            label='Category'
                            value='Main Course'
                        />
                        <RecipeViewIconCardComponent
                            src='/images/spoon.png'
                            label='Best Served'
                            value='Lunch'
                        />
                        <RecipeViewIconCardComponent
                            src='/images/group.png'
                            label='No. of Servings'
                            value='2 pax'
                        />
                    </div>
                </div>
            </Paper>

            <Paper elevation={3} className='p-6 rounded-lg shadow-lg'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                    Best served with
                </h2>
                <div className='flex flex-wrap gap-2'>
                    {recipeData?.food_group_list_item?.map(data => (
                        <Chip
                            key={data.id}
                            label={data?.food_group.name}
                            color='primary'
                            variant='outlined'
                        />
                    )) || <p>No food group items available.</p>}
                    {recipeData?.season_list_item?.map(data => (
                        <Chip
                            key={data.id}
                            label={data?.season.name}
                            color='secondary'
                            variant='outlined'
                        />
                    )) || <p>No season name available.</p>}
                </div>
            </Paper>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <Paper elevation={3} className='p-6 rounded-lg shadow-lg'>
                    <Tabs
                        value={tab}
                        onChange={handleChange}
                        variant='fullWidth'
                        aria-label='recipe tabs'
                        className='mb-4'
                    >
                        <Tab label='Ingredients' {...a11yProps(0)} />
                        <Tab label='Instructions' {...a11yProps(1)} />
                        <Tab label='Nutrition' {...a11yProps(2)} />
                    </Tabs>
                    <CustomTabPanel value={tab} index={0}>
                        <IngridientsTab Item={recipeData} />
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={1}>
                        <InstructionTab Item={recipeData} />
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={2}>
                        <NutritionTab data={recipeData} />
                    </CustomTabPanel>
                </Paper>
                <Paper elevation={3} className='p-6 rounded-lg shadow-lg'>
                    <CommentSection
                        recipeData={recipeData}
                        setSnackBarState={setSnackBarState}
                        reviewData={recipeReviewData}
                    />
                </Paper>
            </div>
        </div>
    );

    return (
        <>
            {ui}
            <CustomizedSnackbar
                open={snackBarState.open}
                severity={snackBarState.severity}
                message={snackBarState.message}
                onClose={closeSnackBar}
            />
        </>
    );
}

export default page;
