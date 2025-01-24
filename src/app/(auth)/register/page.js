'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { RegisterContext } from '@/stores/RegisterContext';
import PersonalInfoForm from '@/components/auth/register/PersonalInfoForm';
import RegisterLink from '@/components/auth/RegisterLink';
import BodyMetricsForm from '@/components/auth/register/BodyMetricsForm';
import EmploymentDetailForm from '@/components/auth/register/EmploymentDetailForm';
import CredentialForm from '@/components/auth/register/CredentialForm';
import ResponseView from '@/components/form/ResponseView';
import AgreeForm from '@/components/auth/register/AgreeForm';
import VerificationComponent from '@/components/auth/register/VerificationComponent';
import * as Yup from 'yup';

const Page = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [contactState, setContactState] = useState({
        contactNum: null,
        dialingCodeId: null,
        dialingCode: null,
    });
    const [registrationState, setRegistrationState] = useState({
        activeForm: 1,
        progressBarValue: 14.2857,
        formIndicator: 1,
        storeResponse: null,
    });
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        axios.get('/api/check-status-email').then(response => {
            if (response.data.isEmailValid) {
                setEmail(response.data.authEmail);
                setContactState({
                    contactNum: response.data.contactNum,
                    dialingCodeId: response.data.dialingCodeId,
                    dialingCode: response.data.dialingCode,
                });
                setUserData(prevState => ({
                    ...prevState,
                    contactNum: response.data.contactNum,
                    dialingCodeId: response.data.dialingCodeId,
                    dialingCode: response.data.dialingCode,
                }));
            } else {
                router.push('/login');
            }
        });
    }, []);

    const nextForm = () => {
        setRegistrationState(prevState => ({
            ...prevState,
            activeForm: registrationState.activeForm + 1,
            progressBarValue: registrationState.progressBarValue + 14.2857,
            formIndicator: registrationState.formIndicator + 1,
        }));
    };

    let activeUi;
    switch (registrationState.activeForm) {
        case 1:
            activeUi = (
                <VerificationComponent
                    email={email}
                    contactData={contactState}
                />
            );
            break;
        case 2:
            activeUi = <PersonalInfoForm />;
            break;
        case 3:
            activeUi = <BodyMetricsForm />;
            break;
        case 4:
            activeUi = <EmploymentDetailForm />;
            break;
        case 5:
            activeUi = <CredentialForm />;
            break;
        case 6:
            activeUi = <AgreeForm />;
            break;
        default:
            activeUi = (
                <ResponseView response={registrationState.storeResponse} />
            );
            break;
    }

    return (
        <RegisterContext.Provider
            value={{
                nextForm,
                Yup,
                userData,
                setUserData,
                email,
                setRegistrationState,
            }}
        >
            <div className='w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-2'>
                <div
                    className='bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full'
                    style={{ width: `${registrationState.progressBarValue}%` }}
                >
                    {' '}
                    {registrationState.formIndicator}/7{' '}
                </div>
            </div>

            {activeUi}

            <div className='flex items-center justify-end mt-4'>
                <RegisterLink />
            </div>
        </RegisterContext.Provider>
    );
};

export default Page;
