'use client';

import { useResource } from '../resource';

const useMealType = (customRoute = null) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route = customRoute
        ? `/api/meal-type/${customRoute}`
        : '/api/meal-type';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { useMealType };
