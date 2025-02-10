import StarRating from '@/components/app/recipe/recipe-details/StarRating';
import { BsPaperclip } from 'react-icons/bs';

export default function ReviewForm() {
    return (
        <div className='w-6/12 h-full flex flex-col gap-1 border-e pe-2'>
            <span className='text-lg font-semibold border-b'>
                Share your review
            </span>
            <div className='py-1'>
                <StarRating />
            </div>
            <textarea
                className='bg-slate-100 w-full border rounded-sm focus:ring-1 focus:ring-blue-400 p-2 outline-none text-xs'
                rows={4}
            ></textarea>
            <div className='flex justify-between items-center'>
                <BsPaperclip className='border p-0.5 text-xl cursor-pointer active:bg-slate-300 text-slate-600 duration-100 ease-in' title='Attach Image'/>
                <div className='bg-blue-800 min-w-16 text-white font-bold p-1.5 cursor-pointer mt-2 rounded-sm shadow-sm text-xs flex justify-center items-center hover:scale-105 active:bg-blue-600 duration-100 ease-linear outline outline-offset-2 active:outline-blue-600'>
                    Post
                </div>
            </div>
        </div>
    );
}
