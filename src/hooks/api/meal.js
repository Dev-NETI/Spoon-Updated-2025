'use client';

import { useResource } from '../resource';

const useMeal = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route = '/api/meal';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { useMeal };
