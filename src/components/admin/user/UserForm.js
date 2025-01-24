import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import * as Yup from 'yup';
import Button from '@/components/Button';
import CustomizedSnackbar from '@/components/CustomSnackBar';
import { useUserHook } from '@/hooks/api/user';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import ResetPasswordForm from './ResetPasswordForm';
import DefaultDropdownComponent from '@/components/form/MUI/DefaultDropdownComponent';
import { userType } from '@/data/static-data';

function UserForm({ data, editMode, userSlug = null, setEditMode }) {
    const [error, setError] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
    });
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    const [confirmDialogState, setConfirmDialogState] = useState(false);
    const [resetPasswordDialogState, setResetPasswordDialogState] =
        useState(false);
    const [userTypeState, setUserTypeState] = useState();
    const { patch: updateUser } = useUserHook('user/update-basic-information');

    const rules = Yup.object().shape({
        firstname: Yup.string()
            .min(2, 'First name must be at least 2 characters')
            .max(50, 'First name cannot exceed 50 characters')
            .required('First name is required!'),
        middlename: Yup.string()
            .max(50, 'Middle name cannot exceed 50 characters')
            .required('Middle name is required!'),
        lastname: Yup.string()
            .min(2, 'Last name must be at least 2 characters')
            .max(50, 'Last name cannot exceed 50 characters')
            .required('Last name is required!'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required!'),
    });

    useEffect(() => {
        setUserTypeState(data.user_type_id);
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const object = Object.fromEntries(formData.entries());
        object.userTypeId = userTypeState;

        try {
            await rules.validate(object, { abortEarly: false });
            const { data: updateResponse } = await updateUser(userSlug, object);

            if (!updateResponse) {
                return setSnackbarState(prevState => ({
                    ...prevState,
                    open: true,
                    message: 'Oops! Something went wrong!',
                    severity: 'error',
                }));
            }

            setSnackbarState(prevState => ({
                ...prevState,
                open: true,
                message: 'User updated successfully!',
                severity: 'success',
            }));
            setEditMode(prevState => ({ ...prevState, editMode: false }));
            setConfirmDialogState(false);
            setError({});
        } catch (error) {
            const errors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {});
            setError(errors);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarState(prevState => ({ ...prevState, open: false }));
    };

    const handleResetState = () => {
        setResetPasswordDialogState(false);
        setEditMode(prevState => ({ ...prevState, editMode: false }));
    };

    return (
        <>
            <CustomizedSnackbar
                open={snackbarState.open}
                message={snackbarState.message}
                severity={snackbarState.severity}
                onClose={handleCloseSnackbar}
            />
            <ConfirmationDialog
                open={confirmDialogState}
                submitButtonSlot={
                    <Button form='formUser' type='submit'>
                        Update
                    </Button>
                }
                closeDialog={() => setConfirmDialogState(false)}
            >
                Are you sure you want to update?
            </ConfirmationDialog>
            <ConfirmationDialog
                title='Reset Password'
                open={resetPasswordDialogState}
                closeDialog={() => setResetPasswordDialogState(false)}
            >
                <ResetPasswordForm
                    userSlug={userSlug}
                    resetStateMethod={handleResetState}
                    setSnackBarMethod={setSnackbarState}
                />
            </ConfirmationDialog>
            <form id='formUser' onSubmit={handleSubmit}>
                <TextField
                    error={!!error.firstname}
                    id='firstname'
                    name='firstname'
                    label='Firstname'
                    defaultValue={data.firstname}
                    helperText={error.firstname || ''}
                    disabled={!editMode}
                    fullWidth
                    margin='normal'
                />
                <TextField
                    error={!!error.middlename}
                    id='middlename'
                    name='middlename'
                    label='Middlename'
                    defaultValue={data.middlename}
                    helperText={error.middlename || ''}
                    disabled={!editMode}
                    fullWidth
                    margin='normal'
                />
                <TextField
                    error={!!error.lastname}
                    id='lastname'
                    name='lastname'
                    label='Lastname'
                    defaultValue={data.lastname}
                    helperText={error.lastname || ''}
                    disabled={!editMode}
                    fullWidth
                    margin='normal'
                />
                <TextField
                    id='suffix'
                    name='suffix'
                    label='Suffix'
                    defaultValue={data.suffix}
                    disabled={!editMode}
                    fullWidth
                    margin='normal'
                />
                <TextField
                    error={!!error.email}
                    id='email'
                    name='email'
                    label='Email'
                    defaultValue={data.email}
                    helperText={error.email || ''}
                    disabled={!editMode}
                    fullWidth
                    margin='normal'
                />
                <DefaultDropdownComponent
                    label='User Type'
                    data={userType}
                    value={userTypeState}
                    setState={setUserTypeState}
                    disabled={!editMode}
                />

                {editMode && (
                    <div className='flex justify-end gap-2 mt-4'>
                        <Button
                            type='button'
                            onClick={() => setResetPasswordDialogState(true)}
                        >
                            Reset Password
                        </Button>
                        <Button
                            type='button'
                            onClick={() => setConfirmDialogState(true)}
                        >
                            Update
                        </Button>
                    </div>
                )}
            </form>
        </>
    );
}

export default UserForm;
