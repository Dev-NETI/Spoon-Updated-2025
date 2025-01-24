'use client';

import { useResource } from '../resource';

const useEmailHook = (customRoute = null) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route = customRoute ? `/api/email/${customRoute}` : '/api/email';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { useEmailHook };
