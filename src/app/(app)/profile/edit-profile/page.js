'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/hooks/auth';
import { Button, Form } from 'antd';
import { useCompany } from '@/hooks/api/company';
import { useRank } from '@/hooks/api/rank';
import { useCategory } from '@/hooks/api/category';
import { useNationality } from '@/hooks/api/nationality';
import Loading from '../../Loading';
import SelectComponent from '@/components/form/antd/SelectComponent';
import InputComponent from '@/components/form/antd/InputComponent';
import { gender } from '@/data/static-data';
import { useUserHook } from '@/hooks/api/user';
import CustomizedSnackbar from '@/components/CustomSnackBar';
import AlertComponent from '@/components/form/antd/AlertComponent';

function page() {
    const { user } = useAuth({ middleware: 'auth' });
    const { index: getAllCompany } = useCompany();
    const { index: getAllRank } = useRank();
    const { index: getAllCategory } = useCategory();
    const { index: getAllNationality } = useNationality();
    const { patch: updateUser } = useUserHook(
        'user/update-personal-information'
    );
    const [snackBarState, setSnackBarState] = useState({
        open: false,
        message: '',
        severity: '',
    });
    const [editProfileState, setEditProfileState] = useState({
        loading: true,
        companyData: [],
        rankData: [],
        categoryData: [],
        nationalityData: [],
        error: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            const { data: companyData } = await getAllCompany();
            const { data: rankData } = await getAllRank();
            const { data: categoryData } = await getAllCategory();
            const { data: nationalityData } = await getAllNationality();
            setEditProfileState(prevState => ({
                ...prevState,
                loading: false,
                companyData: companyData,
                rankData: rankData,
                categoryData: categoryData,
                nationalityData: nationalityData,
            }));
        };
        fetchData();
    }, []);

    const onFinish = async values => {
        const { data: responseData } = await updateUser(user?.slug, values);
        responseData
            ? setSnackBarState(() => ({
                  open: true,
                  message: 'Profile updated successfully!',
                  severity: 'success',
              }))
            : setSnackBarState(() => ({
                  open: true,
                  message: 'Something went wrong!',
                  severity: 'error',
              }));
        setEditProfileState(prevState => ({
            ...prevState,
            error: [],
        }));
    };
    const onFinishFailed = errorInfo => {
        setEditProfileState(prevState => ({
            ...prevState,
            error: errorInfo.errorFields,
        }));
    };

    let ui = editProfileState.loading ? (
        <Loading />
    ) : (
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
                <CardHeader>Profile</CardHeader>
                {editProfileState.error.length > 0 && (
                    <div className='px-8 md:px-16 lg:px-16'>
                        <AlertComponent
                            message='Error'
                            description={editProfileState.error.map(data => (
                                <p key={data.errors}>{data.errors}</p>
                            ))}
                            type='error'
                            showIcon
                        />
                    </div>
                )}
                <div className='flex flex-row justify-center items-center gap-4 px-4'>
                    <Form
                        name='updateProfile'
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
                            firstname: user?.firstname,
                            middlename: user?.middlename,
                            lastname: user?.lastname,
                            suffix: user?.suffix,
                            email: user?.email,
                            company: user.company?.id,
                            rank: user.rank?.id,
                            category: user.category?.id,
                            nationality: user.nationality?.id,
                            gender: user?.gender_id,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete='off'
                    >
                        <InputComponent
                            label='Firstname'
                            name='firstname'
                            rules={[
                                {
                                    required: true,
                                    message: 'Firstname is required!',
                                },
                            ]}
                        />
                        <InputComponent
                            label='Middlename'
                            name='middlename'
                            rules={[
                                {
                                    required: false,
                                    message: 'Middlename is required!',
                                },
                            ]}
                        />
                        <InputComponent
                            label='Lastname'
                            name='lastname'
                            rules={[
                                {
                                    required: true,
                                    message: 'Lastname is required!',
                                },
                            ]}
                        />
                        <InputComponent
                            label='Suffix'
                            name='suffix'
                            rules={[
                                {
                                    required: false,
                                    message: 'Suffix is required!',
                                },
                            ]}
                        />
                        <SelectComponent
                            label='Company'
                            name='company'
                            rules={[
                                {
                                    required: true,
                                    message: 'Company is required!',
                                },
                            ]}
                            placeholder='Select Company'
                            dataArray={editProfileState.companyData}
                        />
                        <SelectComponent
                            label='Rank'
                            name='rank'
                            rules={[
                                {
                                    required: true,
                                    message: 'Rank is required!',
                                },
                            ]}
                            placeholder='Select Rank'
                            dataArray={editProfileState.rankData}
                        />
                        <SelectComponent
                            label='Category'
                            name='category'
                            rules={[
                                {
                                    required: true,
                                    message: 'Category is required!',
                                },
                            ]}
                            placeholder='Select Category'
                            dataArray={editProfileState.categoryData}
                        />
                        <SelectComponent
                            label='Nationality'
                            name='nationality'
                            rules={[
                                {
                                    required: true,
                                    message: 'Nationality is required!',
                                },
                            ]}
                            placeholder='Select Nationality'
                            dataArray={editProfileState.nationalityData}
                        />
                        <SelectComponent
                            label='Gender'
                            name='gender'
                            rules={[
                                {
                                    required: true,
                                    message: 'Gender is required!',
                                },
                            ]}
                            placeholder='Select Gender'
                            dataArray={gender}
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
                </div>
            </Card>
        </div>
    );

    return ui;
}

export default page;
