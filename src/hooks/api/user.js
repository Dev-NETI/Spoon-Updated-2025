'use client';

import { useResource } from '../resource';

const useUserHook = (customRoute = null) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route = customRoute ? `/api/${customRoute}` : '/api/user';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { useUserHook };
