'use client';

import { useResource } from '../resource';

const useSeason = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route = '/api/season';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { useSeason };
