import React from 'react';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: 'Your one-time password must be 6 characters.',
    }),
});

function VerificationCodeForm({
    mode = 'login',
    handleSubmit,
    timerState,
    handleResendVerificationCode,
}) {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: '',
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='space-y-6'
            >
                <FormField
                    control={form.control}
                    name='pin'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {mode === 'login'
                                    ? 'One-Time Password'
                                    : 'Verification'}
                            </FormLabel>
                            <FormControl className='flex'>
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup className='flex mx-auto'>
                                        <InputOTPSlot type='number' index={0} />
                                        <InputOTPSlot type='number' index={1} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot type='number' index={2} />
                                        <InputOTPSlot type='number' index={3} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot type='number' index={4} />
                                        <InputOTPSlot type='number' index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormDescription>
                                Please enter the{' '}
                                {mode === 'login'
                                    ? 'one-time password'
                                    : 'verification code'}{' '}
                                sent to your phone.
                                {/* ({verificationCode}) */}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className='w-full' type='submit'>
                    {mode === 'login' ? 'Submit' : 'Next'}
                </Button>
                <div className='flex justify-center items-center'>
                    {timerState > 0 ? (
                        <p className='text-sm text-gray-500'>
                            Resend in {timerState}/s
                        </p>
                    ) : (
                        <p
                            className='text-sm text-blue-700'
                            onClick={() => handleResendVerificationCode()}
                        >
                            Click here to resend!
                        </p>
                    )}
                </div>
            </form>
        </Form>
    );
}

export default VerificationCodeForm;
