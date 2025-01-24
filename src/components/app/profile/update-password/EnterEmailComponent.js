import React from 'react';
import { Button, Form } from 'antd';
import InputComponent from '@/components/form/antd/InputComponent';
import { UpdatePasswordContext } from '@/stores/UpdatePasswordContext';
import { useContext } from 'react';

function EnterEmailComponent() {
    const {
        user,
        setSnackBarState,
        updatePasswordState,
        setUpdatePasswordState,
    } = useContext(UpdatePasswordContext);

    const onFinish = values => {
        if (user.email !== values.email) {
            return setSnackBarState(() => ({
                open: true,
                message: 'Please enter your registered email!',
                severity: 'warning',
            }));
        }

        setUpdatePasswordState(prevState => ({
            ...prevState,
            activeView: updatePasswordState.activeView + 1,
        }));
    };

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
                label='Email'
                name='email'
                rules={[
                    {
                        required: true,
                        message: 'Email is required!',
                    },
                ]}
            />
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type='primary' htmlType='submit'>
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
}

export default EnterEmailComponent;
