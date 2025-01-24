import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/hooks/auth';
import SaveRecipeComponent from '@/components/app/recipe-view/SaveRecipeComponent';
import { useSavedRecipe } from '@/hooks/api/saved-recipe';

function FavoriteCardComponent({
    recipeId = null,
    recipe = null,
    src = null,
    url = null,
    alt = null,
    originname = null,
    originflag = null,
    setSnackBarState,
}) {
    const { user } = useAuth({ middleware: 'auth' });
    const { destroy2Parameter: unSaveRecipe } = useSavedRecipe('destroy');

    const handleUnsaveRecipe = async () => {
        const { data: deleteResponse } = await unSaveRecipe(recipeId, user.id);
        if (!deleteResponse) {
            return setSnackBarState(prevState => ({
                ...prevState,
                severity: 'error',
                open: true,
                message: 'Oops! Something went wrong!',
            }));
        }

        return setSnackBarState(prevState => ({
            ...prevState,
            severity: 'success',
            open: true,
            message: 'Recipe disliked!',
        }));
    };

    let ui;
    if (recipe == null || src == null || alt == null || url == null) {
        ui = (
            <a href='/recipe' className='flex justify-center items-center'>
                {/* <Image
                    className='hover:scale-110 w-28 duration-200 ease-in-out shadow-lg rounded-full'
                    src={addCard}
                    alt='ff'
                /> */}
                Add Card
            </a>
        );
    } else {
        ui = (
            <div className='bg-slate-50 rounded-lg md:rounded-3xl shadow-md shadow-slate-200 hover:-translate-y-1 duration-300 ease-in-out'>
                <div className='flex justify-end px-4 py-2'>
                    <SaveRecipeComponent
                        isSaved={true}
                        onClick={handleUnsaveRecipe}
                    />
                </div>
                <a href={url}>
                    <Image
                        src={src}
                        width={1000}
                        height={100}
                        alt={alt}
                        className='object-cover h-24 rounded-t-lg md:rounded-t-3xl sm:h-56 pb-1'
                    />
                    <div className='grid grid-cols-2 p-2 shadow-sm'>
                        <p className='ms-2 font-semibold text-sm sm:text-md text-stone-800'>
                            {recipe}
                        </p>
                    </div>
                    <div className='grid grid-cols-1 my-2 md:my-2 lg:grid-cols-2 sm:mb-3 px-2'>
                        <div className='flex items-center'>
                            <Image
                                className='w-5 sm:w-8 rounded-full ms-2 border'
                                width={100}
                                height={100}
                                src={originflag}
                                alt={originflag}
                            />
                            <p className='ms-2 text-sm '>{originname}</p>
                        </div>
                        <div className='bg-blue-950 m-2 md:m-1 rounded-md sm:rounded-2xl me-2'>
                            <p className='text-white text-sm text-center mt-1'>
                                Main Course
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        );
    }

    return ui;
}

export default FavoriteCardComponent;
