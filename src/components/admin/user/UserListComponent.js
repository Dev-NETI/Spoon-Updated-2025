import React, { useState } from 'react';
import List from '@mui/material/List';
import UserListItemComponent from './UserListItemComponent';
import { formatDate } from '@/lib/utils';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function UserListComponent({ userData }) {
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const totalPages = Math.ceil(userData.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const currentUsers = userData.slice(startIndex, endIndex);
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                }}
            >
                {currentUsers.map(data => (
                    <UserListItemComponent
                        key={data.id}
                        name={`${data.firstname} ${data.middlename} ${data.lastname} ${data.suffix === null ? '' : data.suffix}`}
                        slug={data.slug}
                        createdAt={formatDate(
                            data.created_at,
                            'yyyy-mm-dd hh:mm:ss'
                        )}
                    />
                ))}
            </List>

            <Stack spacing={2} alignItems='center' sx={{ marginTop: 2 }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color='primary'
                />
            </Stack>
        </>
    );
}

export default UserListComponent;
