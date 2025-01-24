import React, { useState } from 'react';
import RecipeListItemComponent from './RecipeListItemComponent';
import { Pagination, Stack } from '@mui/material';

function RecipeListComponent({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    const handlePageChange = newPage => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 py-8'>
                {currentItems.map((item, index) => (
                    <RecipeListItemComponent
                        key={item.id}
                        data={item}
                        index={index}
                    />
                ))}
            </div>

            <Stack
                spacing={2}
                sx={{ justifyContent: 'center', alignItems: 'center' }}
            >
                <Pagination
                    count={Math.ceil(data.length / itemsPerPage)}
                    page={currentPage}
                    onChange={(event, page) => handlePageChange(page)}
                    variant='outlined'
                    shape='rounded'
                />
            </Stack>
        </>
    );
}

export default RecipeListComponent;
