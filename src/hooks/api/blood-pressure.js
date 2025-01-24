'use client';

import { useResource } from '../resource';

const useBloodPressure = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route = '/api/blood-pressure';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { useBloodPressure };
