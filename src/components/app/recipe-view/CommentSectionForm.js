import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Button from '@/components/Button';
import ErrorBadge from '@/components/ErrorBadge';
import * as Yup from 'yup';
import { useAuth } from '@/hooks/auth';
import { useRecipeReview } from '@/hooks/api/recipe-review';

function CommentSectionForm({ recipeData, setSnackBarState }) {
    const [rating, setRating] = useState(4);
    const [review, setReview] = useState('');
    const [error, setError] = useState({});
    const { user } = useAuth({ middleware: 'auth' });
    const rules = Yup.object().shape({
        review: Yup.string().required('Review is required!'),
    });
    const { store: storeRecipeReview } = useRecipeReview();

    const handleStoreReview = async () => {
        const object = {
            review,
            rating,
            recipeId: recipeData.id,
            userId: user.id,
        };

        try {
            await rules.validate(object, { abortEarly: false });

            const { data: storeResponse } = await storeRecipeReview(object);

            if (storeResponse) {
                setSnackBarState(() => ({
                    severity: 'success',
                    open: true,
                    message: 'Review posted successfully!',
                }));
                setReview(''); // Clear the text area after successful submission
            } else {
                setSnackBarState(() => ({
                    severity: 'error',
                    open: true,
                    message: 'Oops! Something went wrong!',
                }));
            }
            setError({});
        } catch (error) {
            const errors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {});
            setError(errors);
        }
    };

    return (
        <Card>
            <CardHeader title='Post a review' />
            <CardContent>
                <div className='flex flex-col gap-2'>
                    <Rating
                        name='simple-controlled'
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                    <textarea
                        value={review}
                        onChange={e => setReview(e.target.value)}
                        className='bg-gray-200 rounded-md w-full'
                    />
                    {error.review && <ErrorBadge message={error.review} />}
                </div>
                <div className='flex justify-end py-2'>
                    <Button type='button' onClick={handleStoreReview}>
                        Post
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default CommentSectionForm;
