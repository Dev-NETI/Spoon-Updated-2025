import { useEffect } from 'react';
import { useAuth } from './auth';
import { useRouter } from 'next/navigation';

const useFirstLoginHook = () => {
    const { user } = useAuth({ middleware: 'auth' });
    const router = useRouter();

    useEffect(() => {
        if (user?.is_first_login === 1) {
            router.push('/account-setup');
        }
    }, [user, router, user?.is_first_login]);
};

export { useFirstLoginHook };
