import Image from 'next/image';

const SpoonLoading = () => {
    return (
        <div className='flex min-h-screen w-full items-center justify-center'>
            <Image
                src='/images/spoon_logo.png'
                alt='Spoon Logo'
                className='animate-pulse animate-infinite w-auto h-auto'
                priority
                width={200}
                height={200}
                style={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '200px',
                    maxHeight: '200px',
                    filter: 'brightness(0) saturate(100%) invert(13%) sepia(70%) saturate(3173%) hue-rotate(214deg) brightness(95%) contrast(101%)',
                }}
            />
        </div>
    );
};

export default SpoonLoading;
