'use client';
import React, { useEffect, useState } from 'react';
import { useUserHook } from '@/hooks/api/user';
import Loading from '@/app/(app)/Loading';
import UserListComponent from '@/components/admin/user/UserListComponent';
import Input from '@/components/Input';
import { useAuth } from '@/hooks/auth';

function page() {
    const { showWith2Parameter: getAllUser } =
        useUserHook('users/get-all-user');
    const [userModuleState, setUserModuleState] = useState({
        userData: null,
        loading: true,
        filteredData: null,
    });
    const { user } = useAuth({ middleware: 'auth' });

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                const { data } = await getAllUser(
                    user?.user_type_id,
                    user?.company?.id
                );
                setUserModuleState(prevState => ({
                    ...prevState,
                    userData: data,
                    loading: false,
                }));
            };
            fetchData();
        }
    }, [user]);

    // user && console.log(user?.company?.id);
    const handleSearch = searchValue => {
        const searchOutput = userModuleState.userData.filter(
            item =>
                item.firstname
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                item.middlename
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                item.lastname.toLowerCase().includes(searchValue.toLowerCase())
        );
        searchOutput.length > 0
            ? setUserModuleState(prevState => ({
                  ...prevState,
                  filteredData: searchOutput,
              }))
            : setUserModuleState(prevState => ({
                  ...prevState,
                  filteredData: null,
              }));
    };

    let ui = userModuleState.loading ? (
        <div className='p-4'>
            <Loading />
        </div>
    ) : (
        <div
            className='flex flex-col 
                    py-8 px-1 md:p-10 lg:p-10 
                    gap-4'
        >
            <h1
                className='text-3xl md:text-5xl lg:md:text-5xl 
                           font-bold text-stone-800'
            >
                User Management
            </h1>

            <div className='grid grid-cols-2 md:px-28 lg:px-28'>
                <Input
                    type='text'
                    className='col-start-2'
                    placeholder='Search user...'
                    onChange={event => handleSearch(event.target.value)}
                />
            </div>
            <div className='md:px-28 lg:px-28'>
                <UserListComponent
                    userData={
                        userModuleState.filteredData
                            ? userModuleState.filteredData
                            : userModuleState.userData
                    }
                />
                <p className='text-gray-600 italic text-md'>
                    Total: {userModuleState.userData.length}
                </p>
            </div>
        </div>
    );
    return ui;
}

export default page;
