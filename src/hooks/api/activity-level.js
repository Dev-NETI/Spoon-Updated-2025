'use client';

import { useResource } from '../resource';

const useActivityLevel = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route = '/api/activity-level';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { useActivityLevel };
