'use client';
import React, { useState } from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';

function LogFoodCardComponent({
    title,
    cardClassName,
    consumedCalories,
    data,
    mealId,
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.div
                className={`${cardClassName} px-4 py-2 rounded-xl shadow-lg flex flex-col gap-1`}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ backgroundColor: '#f3f4f6' }}
                whileTap={{ scale: 0.98 }}
            >
                <motion.div
                    className='flex flex-row justify-between items-center'
                    animate={{ rotate: isOpen ? 360 : 0 }}
                    transition={{ duration: 1 }}
                >
                    <CardTitle className='font-bold text-slate-100 text-lg'>
                        {title}
                    </CardTitle>
                    <CardDescription className='text-slate-100 font-semibold'>
                        {consumedCalories}
                    </CardDescription>
                </motion.div>
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                        isOpen
                            ? { height: 'auto', opacity: 1 }
                            : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.5 }}
                    className='overflow-hidden rounded-xl shadow-lg'
                >
                    <div className='px-4 py-2 bg-white'>
                        {data &&
                            data.map(item => (
                                <div
                                    key={item.id}
                                    className='flex flex-row justify-between items-center gap-4 mt-2'
                                >
                                    <div className='flex flex-col'>
                                        <h1 className='text-stone-800 text-sm font-semibold'>
                                            {item.recipe?.name}
                                        </h1>
                                        <p className='text-stone-700 text-xs italic'>
                                            {item.number_of_serving} serving/s
                                        </p>
                                    </div>
                                    <h1 className='text-stone-800 text-xs '>
                                        {item.recipe?.calories}
                                    </h1>
                                </div>
                            ))}
                    </div>
                </motion.div>
                <div className='flex justify-end'>
                    <Link
                        href={`/calculator/nutrient-calculator/${mealId}`}
                        className='p-1 border-2 rounded-lg border-slate-50 text-slate-50 text-center w-16 text-sm'
                    >
                        Add
                    </Link>
                </div>
            </motion.div>
        </>
    );
}

export default LogFoodCardComponent;
