import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Button from '@/components/Button';
import { generateStrongPassword } from '@/lib/utils';
import * as Yup from 'yup';
import { useUserHook } from '@/hooks/api/user';

function ResetPasswordForm({
    userSlug,
    resetStateMethod = null,
    setSnackBarMethod = null,
}) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const { patch: updatePassword } = useUserHook('user/update-password');
    const rules = Yup.object().shape({
        password: Yup.string().required('Password is required!'),
    });

    const handleSubmit = async event => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const object = Object.fromEntries(formData.entries());

        try {
            await rules.validate(object, { abortEarly: false });
            const { data: updateResponse } = await updatePassword(
                userSlug,
                object
            );

            if (!updateResponse) {
                return setSnackBarMethod(prevState => ({
                    ...prevState,
                    open: true,
                    message: 'Oops! Something went wrong!',
                    severity: 'error',
                }));
            }

            setSnackBarMethod(prevState => ({
                ...prevState,
                open: true,
                message: 'User updated successfully!',
                severity: 'success',
            }));
            resetStateMethod();
            setError({});
        } catch (error) {
            const errors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {});
            setError(errors);
        }
    };

    return (
        <form
            id='formResetPassword'
            onSubmit={handleSubmit}
            className='flex flex-col gap-1'
        >
            <TextField
                error={!!error.password}
                id='password'
                name='password'
                defaultValue={password}
                helperText={error.password || ''}
                placeholder='Password...'
                fullWidth
                margin='normal'
                InputProps={{
                    readOnly: true,
                }}
            />
            <div className='flex justify-between'>
                <Button
                    type='button'
                    className='text-xs'
                    onClick={() => setPassword(generateStrongPassword)}
                >
                    Generate
                </Button>
                <Button type='submit' form='formResetPassword'>
                    Save
                </Button>
            </div>
        </form>
    );
}

export default ResetPasswordForm;
