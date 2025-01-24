'use client';

import { useResource } from '../resource';

const uesDialingCode = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route = '/api/dialing-code';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { uesDialingCode };
