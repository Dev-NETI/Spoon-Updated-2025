'use client';

import { useResource } from '../resource';

const useDashboard = (customRoute = null) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route =
        customRoute !== null
            ? `/api/dashboard/${customRoute}`
            : '/api/dashboard';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { useDashboard };
