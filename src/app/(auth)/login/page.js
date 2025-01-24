'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import Label from '@/components/Label';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus';

const Login = () => {
    const router = useRouter();

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/login-otp',
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shouldRemember] = useState(false);
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset));
        } else {
            setStatus(null);
        }
    });

    const submitForm = async event => {
        event.preventDefault();

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        });
    };

    return (
        <>
            <AuthSessionStatus className='mb-4' status={status} />

            <form onSubmit={submitForm}>
                {/* Email Address */}
                <div className='mb-4 w-full'>
                    <p className='text-xl text-blue-800 font-bold antialiased'>
                        Welcome!
                    </p>
                    <p className='text-sm text-gray-600'>
                        Sign in to continue to your account
                    </p>
                </div>
                <div>
                    <Label htmlFor='email'>Email</Label>

                    <Input
                        id='email'
                        type='email'
                        value={email}
                        className='block mt-1 w-full'
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoFocus
                    />

                    <InputError messages={errors.email} className='mt-2' />
                </div>

                {/* Password */}
                <div className='mt-4'>
                    <Label htmlFor='password'>Password</Label>

                    <Input
                        id='password'
                        type='password'
                        value={password}
                        className='block mt-1 w-full'
                        onChange={event => setPassword(event.target.value)}
                        required
                        autoComplete='current-password'
                    />

                    <InputError messages={errors.password} className='mt-2' />
                </div>

                {/* Remember Me */}
                <div className='block mt-4'>
                    <div className='flex flex-row justify-end items-center'>
                        <Link
                            href='/forgot-password'
                            className='text-sm font-semibold text-blue-600 hover:text-blue-800'
                        >
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                <div className='flex items-center justify-center mt-4'>
                    <Button className='w-full justify-center'>Login</Button>
                </div>

                <div className='flex items-right justify-right mt-4'>
                    <p className='text-sm font-semibold text-gray-500'>
                        Dont have an account?{' '}
                        <a
                            href='/verifying-account'
                            className=' text-blue-600 hover:text-blue-800'
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </form>
        </>
    );
};

export default Login;
