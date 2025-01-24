import React, { useEffect, useState } from 'react';
import InputGroupV2 from '@/components/InputGroupV2';
import Button from '@/components/Button';
import { useContext } from 'react';
import { RegisterContext } from '@/stores/RegisterContext';
import { computeAge } from '@/lib/utils';
import { useNationality } from '@/hooks/api/nationality';
import DropdownGroup from '@/components/DropdownGroup';

function PersonalInfoForm() {
    const { nextForm, Yup, setUserData } = useContext(RegisterContext);
    const [error, setError] = useState({});
    const [age, setAge] = useState(0);
    const [dropdownData, setDropdownData] = useState({});
    const { index: getAllNationality } = useNationality();

    const rules = Yup.object().shape({
        lastname: Yup.string().required('Lastname is required!'),
        firstname: Yup.string().required('Firstname is required!'),
        dateOfBirth: Yup.string().required('Date of birth is required!'),
        age: Yup.string().required('Age is required!'),
        nationality: Yup.string().required('Nationality is required!'),
    });

    useEffect(() => {
        fetchData('nationalityData', getAllNationality);
    }, []);

    const fetchData = async (key, hook) => {
        const { data } = await hook();
        setDropdownData(prevState => ({
            ...prevState,
            [key]: data,
        }));
    };

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

    const calculateAge = dateOfBirth => {
        setAge(computeAge(dateOfBirth));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <InputGroupV2
                    label='Firstname'
                    id='firstname'
                    name='firstname'
                    type='text'
                    errorMessage={error.firstname}
                />
            </div>
            <div>
                <InputGroupV2
                    label='Middlename'
                    id='middlename'
                    name='middlename'
                    type='text'
                />
            </div>
            <div>
                <InputGroupV2
                    label='Lastname'
                    id='lastname'
                    name='lastname'
                    type='text'
                    errorMessage={error.lastname}
                />
            </div>
            <div>
                <InputGroupV2
                    label='Suffix'
                    id='suffix'
                    name='suffix'
                    type='text'
                />
            </div>
            <div>
                <InputGroupV2
                    label='Date of Birth'
                    id='dateOfBirth'
                    name='dateOfBirth'
                    type='date'
                    errorMessage={error.dateOfBirth}
                    onChange={event => calculateAge(event.target.value)}
                />
            </div>
            <div>
                <InputGroupV2
                    label='Age'
                    id='age'
                    name='age'
                    type='text'
                    errorMessage={error.age}
                    value={age}
                    readOnly
                />
            </div>
            <div>
                <DropdownGroup
                    label='Nationality'
                    id='nationality'
                    name='nationality'
                    data={dropdownData.nationalityData}
                    errorMessage={error.nationality}
                />
            </div>
            <div className='flex justify-end py-4'>
                <Button type='submit'>Next</Button>
            </div>
        </form>
    );
}

export default PersonalInfoForm;
