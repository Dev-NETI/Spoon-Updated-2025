'use client';

import { useResource } from '../resource';

const useRecipe = (customRoute = null) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route = customRoute ? `/api/recipe/${customRoute}` : '/api/recipe';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { useRecipe };
