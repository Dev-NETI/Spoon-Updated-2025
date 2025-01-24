'use client';

import { useResource } from '../resource';

const useRecipeReview = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route = '/api/recipe-review';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { useRecipeReview };
