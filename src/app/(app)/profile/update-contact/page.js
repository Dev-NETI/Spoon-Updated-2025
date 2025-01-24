'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/hooks/auth';
import CustomizedSnackbar from '@/components/CustomSnackBar';
import VerificationCodeForm from '@/components/auth/register/VerificationCodeForm';
import { useEmailHook } from '@/hooks/api/email-hook';
import UpdateContactForm from '@/components/app/profile/update-contact/page';
import { useUserHook } from '@/hooks/api/user';
import { useRouter } from 'next/navigation';

function page() {
    const { user } = useAuth({ middleware: 'auth' });
    const [snackBarState, setSnackBarState] = useState({
        open: false,
        message: '',
        severity: '',
    });
    const [updateContactState, setUpdateContactState] = useState({
        activeView: 1,
        timer: null,
        verificationCode: null,
    });
    const [newContactData, setNewContactData] = useState();
    const { showWith3Parameter: sendVerificationCode } = useEmailHook(
        'send-verification-code'
    );
    const { patch: updateContactInformation } = useUserHook(
        'user/update-contact-information'
    );
    const router = useRouter();

    useEffect(() => {
        generateVerificationCode();
    }, []);

    useEffect(() => {
        if (
            user?.email &&
            updateContactState.verificationCode &&
            updateContactState.timer === null
        ) {
            const sendEmail = async () => {
                if (updateContactState.activeView === 1) {
                    await handleSendVerificationCode(
                        updateContactState.verificationCode,
                        user.email,
                        user.dialing_code?.dialing_code + user.contact_number
                    );
                } else if (updateContactState.activeView === 3) {
                    await handleSendVerificationCode(
                        updateContactState.verificationCode,
                        newContactData.email,
                        newContactData.dialing_code +
                            newContactData.contactNumber
                    );
                }
            };

            sendEmail();
        }
    }, [user, updateContactState.verificationCode, updateContactState.timer]);

    useEffect(() => {
        let timer;
        if (updateContactState.timer > 0) {
            timer = setInterval(() => {
                setUpdateContactState(prevState => ({
                    ...prevState,
                    timer: prevState.timer - 1,
                }));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [updateContactState.timer]);

    function generateVerificationCode() {
        setUpdateContactState(prevState => ({
            ...prevState,
            verificationCode: Math.floor(100000 + Math.random() * 900000),
        }));
    }

    function handleSubmit(data = null) {
        const verified =
            parseInt(data.pin) === updateContactState.verificationCode;
        if (verified) {
            setSnackBarState(() => ({
                open: true,
                message: 'Successfully Verified',
                severity: 'success',
            }));

            setUpdateContactState(prevState => ({
                ...prevState,
                activeView: 2,
                timer: null,
            }));
        } else {
            setSnackBarState(() => ({
                open: true,
                message: 'Authentication failed',
                severity: 'warning',
            }));
        }
    }

    const handleSendVerificationCode = async (
        verificationCode,
        email,
        mobileNumber
    ) => {
        const { data: responseData } = await sendVerificationCode(
            verificationCode,
            email,
            mobileNumber
        );
        return responseData;
    };

    const handleResendVerificationCode = async (
        verificationCode,
        email,
        mobileNumber
    ) => {
        const sendResponse = await handleSendVerificationCode(
            verificationCode,
            email,
            mobileNumber
        );
        if (sendResponse) {
            setUpdateContactState(prevState => ({
                ...prevState,
                timer: 60,
            }));
            setSnackBarState(() => ({
                open: true,
                message: 'Verification Code resent successfully!',
                severity: 'success',
            }));
        }
    };

    async function update() {
        const { data: updateResponse } = await updateContactInformation(
            user.slug,
            newContactData
        );
        if (updateResponse) {
            setSnackBarState({
                open: true,
                message: 'Contact information updated successfully!',
                severity: 'success',
            });
            router.push('/profile');
        } else {
            setSnackBarState({
                open: true,
                message: 'Something went wrong!',
                severity: 'warning',
            });
        }
    }

    let ui, viewDescription;
    switch (updateContactState.activeView) {
        case 1:
            viewDescription =
                'A verification code has been sent to both your email address and mobile number. Please enter the code to proceed with updating your contact information.';
            ui = (
                <VerificationCodeForm
                    handleSubmit={handleSubmit}
                    handleResendVerificationCode={() =>
                        handleResendVerificationCode(
                            updateContactState.verificationCode,
                            user.email,
                            user.dialing_code?.dialing_code +
                                user.contact_number
                        )
                    }
                    timerState={updateContactState.timer}
                />
            );
            break;
        case 2:
            viewDescription =
                'Kindly provide your updated email address and mobile number.';
            ui = (
                <UpdateContactForm
                    setNewContactData={setNewContactData}
                    setUpdateContactState={setUpdateContactState}
                    generateVerificationCode={generateVerificationCode}
                />
            );
            break;
        default:
            viewDescription =
                'A verification code has been sent to your updated email address and mobile number. Please enter the code to complete the update of your contact information.';
            ui = (
                <VerificationCodeForm
                    handleSubmit={update}
                    handleResendVerificationCode={() =>
                        handleResendVerificationCode(
                            updateContactState.verificationCode,
                            newContactData.email,
                            newContactData.dialing_code +
                                newContactData.contactNumber
                        )
                    }
                    timerState={updateContactState.timer}
                />
            );
            break;
    }
    return (
        <div
            className='px-5 py-5
                       md:px-72 md:py-10 
                       lg:px-72 lg:py-10'
        >
            <CustomizedSnackbar
                open={snackBarState.open}
                message={snackBarState.message}
                severity={snackBarState.severity}
                onClose={() =>
                    setSnackBarState(prevState => ({
                        ...prevState,
                        open: false,
                    }))
                }
            />
            <Card className='flex flex-col gap-2'>
                <CardHeader>Update Contact Information</CardHeader>
                <div className='px-5'>
                    <p className='text-sm text-stone-800 italic'>
                        {viewDescription}
                    </p>
                </div>
                <div className='flex flex-row justify-center items-center gap-4 px-4'>
                    {ui}
                </div>
            </Card>
        </div>
    );
}

export default page;
