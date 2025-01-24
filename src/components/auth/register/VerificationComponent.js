import React, { useEffect, useState } from 'react';
import { useEmailHook } from '@/hooks/api/email-hook';
import VerificationCodeForm from './VerificationCodeForm';
import { useContext } from 'react';
import { RegisterContext } from '@/stores/RegisterContext';
import { toast } from '@/components/ui/use-toast';

function VerificationComponent({ email, contactData = null }) {
    //contactData is object {contactNum,dialingCodeId,dialingCode}
    const { nextForm } = useContext(RegisterContext);
    const [tempt_otp, setTempt_otp] = useState();
    const [timerState, setTimerState] = useState(null);
    const { showWith3Parameter: sendVerificationCode } = useEmailHook(
        'send-verification-code'
    );

    useEffect(() => {
        setTempt_otp(Math.floor(100000 + Math.random() * 900000));
    }, []);

    useEffect(() => {
        const sendEmail = async () => {
            if (email !== '' && tempt_otp && timerState === null) {
                await handleSendVerificationCode();
            }
        };

        sendEmail();
    }, [email, tempt_otp, sendVerificationCode, timerState]);

    useEffect(() => {
        let timer;
        if (timerState > 0) {
            timer = setInterval(() => {
                setTimerState(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [timerState]);

    const handleSendVerificationCode = async () => {
        const { data: responseData } = await sendVerificationCode(
            tempt_otp,
            email,
            contactData.dialingCode + contactData.contactNum
        );
        return responseData;
    };

    const handleResendVerificationCode = async () => {
        const sendResponse = await handleSendVerificationCode();
        // console.log(sendResponse);
        if (sendResponse) {
            setTimerState(60);
            toast({
                title: 'Verification Code',
                description: 'Verification Code resent successfully!',
            });
        }
    };

    const onCheckVerificationCode = async data => {
        const match = parseInt(data.pin) === tempt_otp;

        if (match) {
            toast({
                title: 'Successfully Verified',
                description: 'You have successfully verified your account!',
            });
            document.cookie = `35de80170cda0d14e2cdd82e9e89d375 = 6f7d41b92d3e4519c9f12b765a83ab4f; path=/; max-age=600`;
            nextForm();
        } else {
            toast({
                title: 'Authentication failed',
                variant: 'destructive',
                description: 'Invalid OTP. Please try again.!',
            });
        }
    };

    return (
        <VerificationCodeForm
            mode='register'
            handleSubmit={onCheckVerificationCode}
            timerState={timerState}
            verificationCode={tempt_otp}
            handleResendVerificationCode={handleResendVerificationCode}
        />
    );
}

export default VerificationComponent;
