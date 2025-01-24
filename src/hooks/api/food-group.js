'use client';

import { useResource } from '../resource';

const useFoodGroup = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route = '/api/food-group';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { useFoodGroup };
