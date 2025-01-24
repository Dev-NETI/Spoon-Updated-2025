'use client';
import React, { useEffect, useState } from 'react';
import { useUserHook } from '@/hooks/api/user';
import Loading from '@/app/(app)/Loading';
import UserForm from '@/components/admin/user/UserForm';
import Button from '@/components/Button';
function page({ params }) {
    const { show: getUser } = useUserHook();
    const [editUserState, setEditUserState] = useState({
        userData: null,
        loading: true,
        editMode: false,
    });
    let buttonStyle =
        editUserState.editMode === true ? 'bg-red-700' : 'bg-gray-800';

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getUser(params.slug);
            setEditUserState(prevState => ({
                ...prevState,
                userData: data,
                loading: false,
            }));
        };

        fetchData();
    }, []);

    let ui = editUserState.loading ? (
        <Loading />
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
                Edit for {editUserState.userData.firstname}{' '}
                {editUserState.userData.lastname}
            </h1>

            <div
                className='flex flex-col gap-4 
            px-8 md:px-96 lg:px-96'
            >
                <div className='flex justify-end'>
                    <Button
                        onClick={() =>
                            setEditUserState(prevState => ({
                                ...prevState,
                                editMode: !editUserState.editMode,
                            }))
                        }
                        className={buttonStyle}
                    >
                        {editUserState.editMode ? 'Cancel' : 'Edit'}
                    </Button>
                </div>
                <UserForm
                    data={editUserState.userData}
                    editMode={editUserState.editMode}
                    userSlug={params.slug}
                    setEditMode={setEditUserState}
                />
            </div>
        </div>
    );

    return ui;
}

export default page;
