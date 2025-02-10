import Image from 'next/image';

export default function Comments() {
    return (
        <div className='w-6/12 h-full flex flex-col'>
            <span className='text-lg font-semibold mb-2'>Comments</span>

            {/* Scrollable Container */}
            <div className='h-48 overflow-y-auto border border-gray-300 rounded-md p-1 bg-slate-50'>
                {[
                    // Simulated Comments Array
                    {
                        name: 'Brian Griffin',
                        img: '/images/Brian_Griffin.png',
                        time: '2s ago',
                        text: 'This is delicious.',
                    },
                    {
                        name: 'Stewie Griffin',
                        img: '/images/stewie.jpg',
                        time: '2d ago',
                        text: 'Brian Griffin . Check this out.',
                    },
                    {
                        name: 'Stewie Griffin',
                        img: '/images/stewie.jpg',
                        time: '2d ago',
                        text: 'Brian Griffin . Check this out.',
                    },
                    {
                        name: 'Stewie Griffin',
                        img: '/images/stewie.jpg',
                        time: '2d ago',
                        text: 'Brian Griffin . Check this out.',
                    },
                    {
                        name: 'Stewie Griffin',
                        img: '/images/stewie.jpg',
                        time: '2d ago',
                        text: 'Brian Griffin . Check this out.',
                    },
                    {
                        name: 'Stewie Griffin',
                        img: '/images/stewie.jpg',
                        time: '2d ago',
                        text: 'Brian Griffin . Check this out.',
                    },
                    {
                        name: 'Stewie Griffin',
                        img: '/images/stewie.jpg',
                        time: '2d ago',
                        text: 'Brian Griffin . Check this out.',
                    },
                ].map((comment, index) => (
                    <div
                        key={index}
                        className={`flex flex-col p-1 gap-0.5 bg-slate-100 ${
                            index !== 0 ? 'border-t' : ''
                        }`}
                    >
                        <div className='text-xs font-bold flex gap-1 items-center'>
                            <Image
                                src={comment.img}
                                width={20}
                                height={20}
                                alt='commentor'
                                className='h-5 w-5 rounded-full object-contain ring-1 ring-slate-300 p-0.5'
                            />
                            <span>{comment.name}</span>
                            <span className='text-[7px] text-slate-500'>
                                {comment.time}
                            </span>
                        </div>
                        <div className='text-[12px] text-slate-800 ms-5'>
                            <span className='text-blue-800 font-semibold'>
                                {comment.text.includes('Brian Griffin')
                                    ? 'Brian Griffin .'
                                    : ''}
                            </span>{' '}
                            {comment.text.replace('Brian Griffin .', '')}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
