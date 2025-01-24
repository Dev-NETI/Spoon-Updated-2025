'use client';

import { useResource } from '../resource';

const useRecipeOrigin = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route = '/api/recipe-origin';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { useRecipeOrigin };
