'use client';

import { useResource } from '../resource';

const useTopRecipe = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route = '/api/recipe/top';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { useTopRecipe };
