'use client';

import { useResource } from '../resource';

const useMealLogItem = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route = '/api/meal-log-item';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { useMealLogItem };
