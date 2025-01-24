import React, { useState } from 'react';
import { Button, Form } from 'antd';
import InputComponent from '@/components/form/antd/InputComponent';
import { UpdatePasswordContext } from '@/stores/UpdatePasswordContext';
import { useContext } from 'react';
import { useUserHook } from '@/hooks/api/user';
import { useRouter } from 'next/navigation';

function ChangePasswordComponent({ redirectUrl = '/profile' }) {
    const { user, setSnackBarState } = useContext(UpdatePasswordContext);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const { patch: updatePassword } = useUserHook('user/update-password');
    const router = useRouter();

    const onFinish = async values => {
        const { data: updateResponse } = await updatePassword(
            user.slug,
            values
        );
        updateResponse
            ? setSnackBarState(
                  () => ({
                      open: true,
                      message: 'Password Updated Successfully!',
                      severity: 'success',
                  }),
                  router.push(redirectUrl)
              )
            : setSnackBarState(() => ({
                  open: true,
                  message: 'Oops, something went wrong!',
                  severity: 'warning',
              }));
    };

    const validatePasswordStrength = (_, value) => {
        if (!value) {
            setDisableSubmit(true);
            return Promise.reject(new Error('Password is required!'));
        }

        const strongPasswordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!strongPasswordRegex.test(value)) {
            setDisableSubmit(true);
            return Promise.reject(
                new Error(
                    'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character!'
                )
            );
        }
        setDisableSubmit(false);
        return Promise.resolve();
    };

    const validateConfirmPassword = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                setDisableSubmit(false);
                return Promise.resolve();
            }
            setDisableSubmit(true);
            return Promise.reject(new Error('Passwords do not match!'));
        },
    });

    return (
        <Form
            name='updatePassword'
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 1000,
            }}
            initialValues={{
                remember: false,
            }}
            onFinish={onFinish}
            autoComplete='off'
        >
            <InputComponent
                label='Password'
                name='password'
                type='password'
                rules={[
                    {
                        required: true,
                        message: 'Password is required!',
                    },
                    {
                        validator: validatePasswordStrength,
                    },
                ]}
            />
            <InputComponent
                label='Confirm Password'
                name='confirmPassword'
                type='password'
                rules={[
                    {
                        required: true,
                        message: 'Confirm Password is required!',
                    },
                    validateConfirmPassword,
                ]}
            />
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button
                    type='primary'
                    htmlType='submit'
                    disabled={disableSubmit}
                >
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
}

export default ChangePasswordComponent;
