export default function UnauthorizedPage() {
    return (
        <div className='flex min-h-screen flex-col items-center justify-center text-center bg-blue-700'>
            <h1 className='text-4xl font-bold mb-4 text-stone-200'>401</h1>
            <p className='text-lg text-stone-200'>
                You are unauthorized to access this page.
            </p>
        </div>
    );
}
