'use client';
import React, { useEffect, useState } from 'react';
import FavoriteCardComponent from '@/components/app/favorite/FavoriteCardComponent';
import { useSavedRecipe } from '@/hooks/api/saved-recipe';
import { useAuth } from '@/hooks/auth';
// import { miyagi } from 'ldrs';
import CustomizedSnackbar from '@/components/CustomSnackBar';
import Loading from '../Loading';

const FavoriteRecipe = () => {
    // miyagi.register();
    const { user } = useAuth({ middleware: 'auth' });
    const { show: showSavedRecipe } = useSavedRecipe();

    const [favoriteRecipeState, setFavoriteRecipeState] = useState({
        loading: true,
        savedRecipeData: [],
    });
    const [snackBarState, setSnackBarState] = useState({
        severity: 'success',
        open: false,
        message: 'This is a success Alert inside a Snackbar!',
    });

    useEffect(() => {
        const fetchSavedRecipe = async () => {
            const { data } = await showSavedRecipe(user.id);
            setFavoriteRecipeState({
                savedRecipeData: data,
                loading: false,
            });
        };

        fetchSavedRecipe();
    }, [user.id, snackBarState.open]); // Only run the effect when the user id changes

    return favoriteRecipeState.loading ? (
        // Default values shown
        <div className='container flex justify-center items-center h-screen'>
            {/* <l-miyagi
                className='mx-auto'
                size='150'
                stroke='10'
                speed='0.9'
                color='#00023d'
            /> */}
            <Loading />
        </div>
    ) : (
        <>
            <CustomizedSnackbar
                open={snackBarState.open}
                message={snackBarState.message}
                severity={snackBarState.severity}
                onClose={() =>
                    setSnackBarState(prevState => ({
                        ...prevState,
                        open: false,
                    }))
                }
            />
            <div className='gap-4 animate-fade-up animate-once animate-duration-1000'>
                <div className='flex justify-center mt-4 shadow-sm h-10'>
                    <p className='font-bold text-stone-800 text-xl'>
                        Favorites
                    </p>
                </div>

                <div className='grid grid-cols-1 pb-20 md:grid-cols-4 xl:grid-cols-5 gap-3 px-5 mt-3 text-center'>
                    {favoriteRecipeState.savedRecipeData.length > 0 ? (
                        favoriteRecipeState.savedRecipeData.map(
                            (recipe, index) => (
                                <FavoriteCardComponent
                                    url={'/recipe-view/' + recipe.slug}
                                    key={index}
                                    recipeId={recipe.id}
                                    recipe={recipe.name || 'Recipe'}
                                    originflag={
                                        recipe.image_path ||
                                        '/assets/app/icons/armenia flag.png'
                                    }
                                    originname={
                                        recipe.origin_name || 'Origin Name'
                                    }
                                    src={'/' + recipe.recipe_img} // Replace with dynamic image source if available
                                    alt={`${recipe.name || 'Recipe'} image`}
                                    snackBarState={snackBarState}
                                    setSnackBarState={setSnackBarState}
                                />
                            )
                        )
                    ) : (
                        <p>No favorite recipes found.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default FavoriteRecipe;
