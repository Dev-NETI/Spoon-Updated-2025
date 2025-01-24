'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/hooks/auth';
import CustomizedSnackbar from '@/components/CustomSnackBar';
import { UpdatePasswordContext } from '@/stores/UpdatePasswordContext';
import EnterEmailComponent from '@/components/app/profile/update-password/EnterEmailComponent';
import { useEmailHook } from '@/hooks/api/email-hook';
import VerificationCodeForm from '@/components/auth/register/VerificationCodeForm';
import axios from '@/lib/axios';
import ChangePasswordComponent from '@/components/app/profile/update-password/ChangePasswordComponent';

function page() {
    const { user } = useAuth({ middleware: 'auth' });
    const [snackBarState, setSnackBarState] = useState({
        open: false,
        message: '',
        severity: '',
    });
    const [updatePasswordState, setUpdatePasswordState] = useState({
        activeView: 1,
    });
    const { showWith2Parameter: sendVerificationCode } = useEmailHook(
        'send-verification-code'
    );
    const [tempt_otp, setTempt_otp] = useState();
    const [timerState, setTimerState] = useState(null);

    useEffect(() => {
        if (updatePasswordState.activeView === 2) {
            setTempt_otp(Math.floor(100000 + Math.random() * 900000));
        }
    }, [updatePasswordState.activeView]);

    useEffect(() => {
        if (updatePasswordState.activeView === 2) {
            const sendEmail = async () => {
                if (user?.email && tempt_otp && timerState === null) {
                    await handleSendVerificationCode();
                }
            };

            sendEmail();
        }
    }, [
        user,
        tempt_otp,
        sendVerificationCode,
        timerState,
        updatePasswordState.activeView,
    ]);

    useEffect(() => {
        if (updatePasswordState.activeView === 2) {
            let timer;
            if (timerState > 0) {
                timer = setInterval(() => {
                    setTimerState(prev => prev - 1);
                }, 1000);
            }
            return () => clearInterval(timer);
        }
    }, [timerState, updatePasswordState.activeView]);

    const handleVerifyOTP = async data => {
        const match = parseInt(data.pin) === tempt_otp;

        if (match) {
            setUpdatePasswordState(prevState => ({
                ...prevState,
                activeView: updatePasswordState.activeView + 1,
            }));
        } else {
            setSnackBarState(() => ({
                open: true,
                message: 'Invalid verification code!',
                severity: 'warning',
            }));
        }
    };

    async function generateOtp() {
        await axios
            .post('/api/authenticating', { temp_otp: tempt_otp })
            .then(() => {
                // console.log(response.data.status);
            })
            .catch(() => {
                // console.error('Error authenticating:', error);
            });
    }

    useEffect(() => {
        if (updatePasswordState.activeView === 2) {
            axios.get('/api/checking-status-otp').then(response => {
                if (response.data.status === true) {
                    // console.log('Verified');
                } else {
                    generateOtp();
                }
            });
        }
    }, [updatePasswordState.activeView]);

    const handleSendVerificationCode = async () => {
        const { data: responseData } = await sendVerificationCode(
            tempt_otp,
            user.email
        );
        return responseData;
    };

    const handleResendVerificationCode = async () => {
        const sendResponse = await handleSendVerificationCode();
        // console.log(sendResponse);
        if (sendResponse) {
            setTimerState(60);
            setSnackBarState(() => ({
                open: true,
                message: 'Verification code sent successfully!',
                severity: 'success',
            }));
        }
    };

    let ui;
    switch (updatePasswordState.activeView) {
        case 1:
            ui = <EnterEmailComponent />;
            break;
        case 2:
            ui = (
                <VerificationCodeForm
                    mode='login'
                    handleSubmit={handleVerifyOTP}
                    timerState={timerState}
                    verificationCode={tempt_otp}
                    handleResendVerificationCode={handleResendVerificationCode}
                />
            );
            break;
        default:
            ui = <ChangePasswordComponent />;
            break;
    }
    return (
        <UpdatePasswordContext.Provider
            value={{
                user,
                snackBarState,
                setSnackBarState,
                updatePasswordState,
                setUpdatePasswordState,
            }}
        >
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
                    <CardHeader>Update Password</CardHeader>
                    <div className='flex flex-row justify-center items-center gap-4 px-4'>
                        {ui}
                    </div>
                </Card>
            </div>
        </UpdatePasswordContext.Provider>
    );
}

export default page;
