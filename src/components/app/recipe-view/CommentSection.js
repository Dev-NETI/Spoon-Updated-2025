import React, { useState } from 'react';
import CommentSectionItem from './CommentSectionItem';
import CommentSectionForm from './CommentSectionForm';

function CommentSection({ reviewData, recipeData, setSnackBarState }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = reviewData.slice(startIndex, endIndex);

    const handlePageChange = newPage => {
        setCurrentPage(newPage);
    };

    return (
        <div
            className='flex flex-col gap-4 shadow-xl 
      bg-white rounded-lg p-4'
        >
            <h1 className='font-bold text-2xl text-stone-800'>Reviews:</h1>
            {currentItems.map(data => (
                <CommentSectionItem
                    key={data.id}
                    user={`${data.user?.firstname} ${data.user?.lastname}`}
                    dateCreated={data.created_at}
                    review={data.comment}
                    rating={data.rating}
                />
            ))}
            {reviewData.length > 0 && (
                <div className='flex justify-center mt-4'>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className='px-4 py-2 mr-2 bg-gray-800 text-white rounded disabled:opacity-50'
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={
                            currentPage * itemsPerPage >= reviewData.length
                        }
                        className='px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50'
                    >
                        Next
                    </button>
                </div>
            )}

            <CommentSectionForm
                recipeData={recipeData}
                setSnackBarState={setSnackBarState}
            />
        </div>
    );
}

export default CommentSection;
