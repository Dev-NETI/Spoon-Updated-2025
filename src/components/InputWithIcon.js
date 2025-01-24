const InputWithIcon = ({ className, icon, ...props }) => (
    <div className='basis-full'>
        <div className='relative'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                <svg
                    className='w-4 h-4 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 20'
                >
                    <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d={icon}
                    />
                </svg>
            </div>
            <input
                id='default-search'
                className={`${className}block w-full p-4 ps-10 rounded-md border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                placeholder='Search for recipes...'
                {...props}
            />
        </div>
    </div>
);

export default InputWithIcon;
