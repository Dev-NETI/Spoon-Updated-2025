import React, { useEffect, useState } from 'react';
import DropdownGroup from '@/components/DropdownGroup';
import Button from '@/components/Button';
import { useContext } from 'react';
import { RegisterContext } from '@/stores/RegisterContext';
import { useCompany } from '@/hooks/api/company';
import { useCategory } from '@/hooks/api/category';
import { useRank } from '@/hooks/api/rank';

function EmploymentDetailForm() {
    const { nextForm, Yup, setUserData } = useContext(RegisterContext);
    const [error, setError] = useState({});
    const [dropdownData, setDropdownData] = useState({});
    const { index: getAllCompany } = useCompany();
    const { index: getAllCategory } = useCategory();
    const { index: getAllRank } = useRank();
    const rules = Yup.object().shape({
        company: Yup.string().required('Company is required!'),
        category: Yup.string().required('Category is required!'),
        rank: Yup.string().required('Rank is required!'),
    });

    useEffect(() => {
        fetchData('companyData', getAllCompany);
        fetchData('categoryData', getAllCategory);
        fetchData('rankData', getAllRank);
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

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <DropdownGroup
                    label='Company'
                    id='company'
                    name='company'
                    type='text'
                    data={dropdownData.companyData}
                    errorMessage={error.company}
                />
            </div>
            <div>
                <DropdownGroup
                    label='Category'
                    id='category'
                    name='category'
                    type='text'
                    data={dropdownData.categoryData}
                    errorMessage={error.category}
                />
            </div>
            <div>
                <DropdownGroup
                    label='Rank'
                    id='rank'
                    name='rank'
                    type='text'
                    data={dropdownData.rankData}
                    errorMessage={error.rank}
                />
            </div>
            <div className='flex justify-end py-4'>
                <Button type='submit'>Next</Button>
            </div>
        </form>
    );
}

export default EmploymentDetailForm;
