'use client';

import { useResource } from '../resource';

const useBmiLog = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route = '/api/bmi-log';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { useBmiLog };
