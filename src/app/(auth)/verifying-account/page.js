'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { toast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DropdownGroup from '@/components/DropdownGroup';
import { uesDialingCode } from '@/hooks/api/dialing-code';
import { useUserHook } from '@/hooks/api/user';

const Page = () => {
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [selectedDialingCode, setSelectedDialingCode] = useState();
    const [dialingCodeData, setDialingCodeData] = useState([]);
    const { index: getDialingCodeData } = uesDialingCode();
    const { showWith2Parameter: checkContactNumber } = useUserHook(
        'user/check-contact-number'
    );
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getDialingCodeData();
            const updatedDialingCodeData = data.map(item => ({
                ...item,
                name: item.country_code + ' (+' + item.dialing_code + ')',
            }));

            setDialingCodeData(updatedDialingCodeData);
        };
        fetchData();
    }, []);

    // selectedDialingCode && console.log(selectedDialingCode);

    const submitForm = async event => {
        const isEmailValid = await verifyEmail(email);
        const isContactValid = await verifyContact(
            contactNumber,
            selectedDialingCode
        ); //if method returns true = invalid, false = valid
        event.preventDefault();

        if (isEmailValid && !isContactValid) {
            router.push('/register');
        } else {
            toast({
                title: 'Authentication failed',
                variant: 'destructive',
                description:
                    'Email or Contact Number already exists try to forget password.',
            });
        }
    };

    const verifyEmail = async email => {
        event.preventDefault();

        return axios
            .post('/api/check-register-email', { email })
            .then(response => response.data.isEmailValid);
    };

    async function verifyContact(contactNum, dialingCode) {
        const { data } = await checkContactNumber(contactNum, dialingCode);
        return data;
    }

    return (
        <>
            <p className='text-sm text-slate-500 mb-3 '>
                Please enter your email address to verify your account.
            </p>
            <form onSubmit={submitForm}>
                {/* Email Address */}
                <div className='base-full'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        id='email'
                        type='email'
                        value={email}
                        className='block mt-1 w-full'
                        onChange={event => setEmail(event.target.value)}
                        required
                    />
                </div>
                <div className='base-full'>
                    <DropdownGroup
                        label='Contact Number'
                        data={dialingCodeData}
                        inputField={
                            <Input
                                id='contactNumber'
                                type='text'
                                value={contactNumber}
                                className='block mt-1 w-full'
                                onChange={event =>
                                    setContactNumber(event.target.value)
                                }
                                required
                            />
                        }
                        onChange={event =>
                            setSelectedDialingCode(event.target.value)
                        }
                        required
                    />
                </div>
                <div className='flex items-center justify-center mt-4'>
                    <Button type='submit' className='w-full justify-center'>
                        VERIFY
                    </Button>
                </div>
                <div className='flex items-center justify-center mt-4 underline'>
                    <a
                        href='/login'
                        className=' text-blue-600 hover:text-blue-800 font-semibold text-sm'
                    >
                        Already have an account?
                    </a>
                </div>
            </form>
        </>
    );
};

export default Page;
