'use client';

export default function Error() {
    return (
        <div className='flex min-h-screen flex-col items-center justify-center text-center bg-blue-700'>
            <h1 className='text-4xl font-bold mb-4 text-stone-200'>404</h1>
            <p className='text-lg text-stone-200'>
                Ooops! Something went wrong, please try again later!
            </p>
        </div>
    );
}
