'use client';

import { useResource } from '../resource';

const useUnit = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route = '/api/unit';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { useUnit };
