'use client';

import { useResource } from '../resource';

const useSavedRecipe = (customUrl = null) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route = customUrl
        ? `/api/saved-recipe/${customUrl}`
        : '/api/saved-recipe';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { useSavedRecipe };
