'use client';

import { useResource } from '../resource';

const useDietaryReferenceValue = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const route = '/api/dietary-reference-value';

    return {
        ...useResource({ baseURL, route }),
    };
};

export { useDietaryReferenceValue };
