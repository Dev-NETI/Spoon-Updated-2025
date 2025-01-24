import React, { useState } from 'react';
import InputGroupV2 from '@/components/InputGroupV2';
import Button from '@/components/Button';
import { useContext } from 'react';
import { RegisterContext } from '@/stores/RegisterContext';
import { passwordRules } from '@/lib/utils';

function PersonalInfoForm() {
    const { nextForm, Yup, setUserData, email } = useContext(RegisterContext);
    const [error, setError] = useState({});

    const rules = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .matches(passwordRules, {
                message:
                    'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            })
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const handleSubmit = async event => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const object = Object.fromEntries(formData.entries());

        try {
            await rules.validate(object, { abortEarly: false });

            setUserData(prevState => ({ ...prevState, ...object }));
            nextForm();
        } catch (error) {
            const errors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {});
            setError(errors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <InputGroupV2
                    label='Email'
                    id='email'
                    name='email'
                    type='text'
                    defaultValue={email}
                    errorMessage={error.email}
                    readOnly
                />
            </div>
            <div>
                <InputGroupV2
                    label='Password'
                    id='password'
                    name='password'
                    type='password'
                    errorMessage={error.password}
                />
            </div>
            <div>
                <InputGroupV2
                    label='Confirm Password'
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    errorMessage={error.confirmPassword}
                />
            </div>
            <div className='flex justify-end py-4'>
                <Button type='submit'>Next</Button>
            </div>
        </form>
    );
}

export default PersonalInfoForm;
