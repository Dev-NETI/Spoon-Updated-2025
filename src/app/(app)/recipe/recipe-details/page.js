'use client';
import { useState } from 'react';
import {
    BsBookmarkHeart,
    BsBookmarkHeartFill,
    BsFillStarFill,
    BsFilterSquareFill,
    BsPeopleFill,
    BsGlobeAsiaAustralia,
} from 'react-icons/bs';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { motion } from 'framer-motion';
import Comments from '@/components/app/recipe/recipe-details/Comments';
import ReviewForm from '@/components/app/recipe/recipe-details/ReviewForm';
import Ingredients from '@/components/app/recipe/recipe-details/Ingredients';
import Procedures from '@/components/app/recipe/recipe-details/Procedures';
import NutritionTable from '@/components/app/recipe/recipe-details/NutritionTable';
import Image from 'next/image';

const ShowRecipe = () => {
    const [loading, setLoading] = useState(true);

    const [clickBookmark, setClickBookmark] = useState(false);

    return loading ? (
        <div className='flex flex-col'>
            <div className='flex w-full bg-slate-50 p-5 pb-0 gap-5 shadow-md rounded-t-md'>
                <div className='w-3/12 flex items-center justify-center'>
                    <Image
                        src='/assets/app/recipes/pork bistek.JPG'
                        width={240}
                        height={240}
                        alt='recipe_img'
                        className='rounded-md object-contain w-auto h-auto'
                    />
                </div>
                <div className='w-9/12 flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <div className='text-2xl text-slate-950 pt-2 pb-0 font-bold w-52 h-10 flex items-center'>
                            <span>PORK BISTEK</span>
                        </div>
                        <div
                            className='text-2xl text-slate-950 py-2 font-bold w-8 h-full flex items-center justify-center cursor-pointer'
                            onClick={() => setClickBookmark(prev => !prev)}
                        >
                            {clickBookmark ? (
                                <motion.div
                                    key='filled'
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1.2, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 10,
                                    }}
                                >
                                    <BsBookmarkHeartFill className='text-red-600' />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key='empty'
                                    initial={{
                                        scale: 0,
                                        opacity: 0,
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    animate={{
                                        scale: 1.2,
                                        rotate: 0,
                                        opacity: 1,
                                    }}
                                    exit={{
                                        scale: 0,
                                        opacity: 0,
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 10,
                                    }}
                                >
                                    <BsBookmarkHeart className='' />
                                </motion.div>
                            )}
                        </div>
                    </div>
                    <div className='flex gap-1 w-28 h-5 items-center'>
                        <div className='flex text-yellow-500'>
                            <BsFillStarFill />
                            <BsFillStarFill />
                            <BsFillStarFill />
                            <BsFillStarFill />
                            <BsFillStarFill />
                        </div>
                    </div>
                    <div className='flex gap-3 items-center justify-evenly w-full select-none'>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{
                                scale: 0,
                                opacity: 0,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 800,
                                damping: 20,
                            }}
                            className='w-4/12 p-3 shadow-md rounded-sm border items-center justify-center flex flex-col gap-2'
                        >
                            <div className='flex gap-2 items-center'>
                                <BsGlobeAsiaAustralia className='text-2xl text-green-800' />
                                <div className='text-sm font-bold'>Origin</div>
                            </div>
                            <div className='flex gap-1 items-center'>
                                <Image
                                    src='/assets/app/icons/ph.jpg'
                                    width={10}
                                    height={10}
                                    alt='origin_flag'
                                    className='w-auto h-auto rounded-full'
                                />
                                <div className='text-sm'>FILIPINO</div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{
                                scale: 0,
                                opacity: 0,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 800,
                                damping: 20,
                            }}
                            className='w-4/12 p-3 shadow-md rounded-sm border items-center justify-center flex flex-col gap-2'
                        >
                            <div className='flex gap-2 items-center'>
                                <BsFilterSquareFill className='text-2xl text-blue-950' />
                                <div className='text-sm font-bold'>
                                    Category
                                </div>
                            </div>
                            <div className='text-sm'>MAIN COURSE</div>
                        </motion.div>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{
                                scale: 0,
                                opacity: 0,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 800,
                                damping: 20,
                            }}
                            className='w-4/12 p-3 shadow-md rounded-sm border items-center justify-center flex flex-col gap-2'
                        >
                            <div className='flex gap-2 items-center'>
                                <GiForkKnifeSpoon className='text-2xl text-slate-500' />
                                <div className='text-sm font-bold'>
                                    Best Served
                                </div>
                            </div>
                            <div className='text-sm'>LUNCH, DINNER</div>
                        </motion.div>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{
                                scale: 0,
                                opacity: 0,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 800,
                                damping: 20,
                            }}
                            className='w-4/12 p-3 shadow-md rounded-sm border items-center justify-center flex flex-col gap-2'
                        >
                            <div className='flex gap-2 items-center'>
                                <BsPeopleFill className='text-2xl text-orange-300' />
                                <div className='text-sm font-bold'>
                                    Category
                                </div>
                            </div>
                            <div className='text-sm'>10</div>
                        </motion.div>
                    </div>
                    <div className='flex gap-3 pb-2 border-b'>
                        <div className='rounded-full px-1.5 py-0.5 text-xs bg-spoonblue text-white font-semibold'>
                            PORK
                        </div>
                        <div className='rounded-full px-1.5 py-0.5 text-xs bg-spoonblue text-white font-semibold'>
                            HEAVY LABOR
                        </div>
                        <div className='rounded-full px-1.5 py-0.5 text-xs bg-spoonblue text-white font-semibold'>
                            HOT WEATHER
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex w-full bg-slate-50 p-5 gap-5 shadow-md rounded-b-md select-none'>
                <Ingredients />
                <Procedures />
                <NutritionTable />
            </div>
            <div className='flex flex-col mt-2 bg-slate-50 shadow-md w-full rounded-md justify-evenly gap-2 p-3'>
                <div className='flex h-full gap-5 ms-2'>
                    <ReviewForm />
                    <Comments />
                </div>
            </div>
        </div>
    ) : (
        //MARK: LOADING
        <div className='flex flex-col'>
            <div className='flex w-full bg-slate-50 p-5 pb-0 gap-5 shadow-md rounded-t-md'>
                <div className='w-3/12 bg-slate-300 animate-pulse rounded-md'></div>
                <div className='w-9/12 flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <div className='text-2xl text-slate-950 px-4 py-2 font-bold animate-pulse w-52 h-10 bg-slate-300 flex items-center'></div>
                        <div className='text-2xl text-slate-950 px-4 py-2 font-bold animate-pulse w-8 h-full bg-slate-300 flex items-center'></div>
                    </div>
                    <div className='text-2xl text-slate-950 px-4 py-2 font-bold animate-pulse w-28 h-5 bg-slate-300'></div>
                    <div className='flex gap-3 items-center justify-evenly w-full'>
                        <div className='w-3/12 h-20 bg-slate-300 rounded-md animate-pulse'></div>
                        <div className='w-3/12 h-20 bg-slate-300 rounded-md animate-pulse'></div>
                        <div className='w-3/12 h-20 bg-slate-300 rounded-md animate-pulse'></div>
                        <div className='w-3/12 h-20 bg-slate-300 rounded-md animate-pulse'></div>
                    </div>
                    <div className='flex gap-3 pb-2 border-b'>
                        <div className='rounded-full w-20 h-8 bg-slate-300 animate-pulse'></div>
                        <div className='rounded-full w-20 h-8 bg-slate-300 animate-pulse'></div>
                        <div className='rounded-full w-20 h-8 bg-slate-300 animate-pulse'></div>
                    </div>
                </div>
            </div>
            <div className='flex w-full h-56 bg-slate-50 p-5 gap-5 shadow-md rounded-b-md'>
                <div className='w-3/12 bg-slate-300 animate-pulse h-full rounded-sm'></div>
                <div className='w-7/12 bg-slate-300 animate-pulse h-full rounded-sm'></div>
                <div className='w-2/12 bg-slate-300 animate-pulse h-full rounded-sm'></div>
            </div>
            <div className='flex flex-col mt-2 bg-slate-50 shadow-md w-full h-20 rounded-md justify-evenly gap-4 p-5'>
                <div className='bg-slate-300 animate-pulse h-full w-32'></div>
                <div className='flex h-full gap-5'>
                    <div className='w-6/12 bg-slate-300 animate-pulse h-full'></div>
                    <div className='w-6/12 bg-slate-300 animate-pulse h-full'></div>
                </div>
            </div>
        </div>
    );
};

export default ShowRecipe;
