import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { NutrientCalculatorContext } from '@/stores/NutrientCalculatorContext';
import { useContext } from 'react';
import LogFoodDialogMacros from './LogFoodDialogMacros';
import Button from '@/components/Button';
import * as Yup from 'yup';
import ErrorBadge from '@/components/ErrorBadge';
import { useAuth } from '@/hooks/auth';
import { useMealLogItem } from '@/hooks/api/meal-log-item';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

function LogFoodDialog({ data }) {
    const { params } = useContext(NutrientCalculatorContext);
    const { user } = useAuth({ middleware: 'auth' });
    const [error, setError] = useState({});
    const { store } = useMealLogItem();
    const { toast } = useToast();
    const router = useRouter();
    const rules = Yup.object().shape({
        numberOfServings: Yup.number()
            .typeError('Must be a number')
            .min(0, 'Must be at least 0')
            .required('Number of servings is required'),
    });

    let meal;
    if (params.mealId === '1') {
        meal = 'Breakfast';
    } else if (params.mealId === '2') {
        meal = 'Lunch';
    } else if (params.mealId === '3') {
        meal = 'Dinner';
    } else {
        meal = 'Snack';
    }

    const handleSubmit = async event => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const object = Object.fromEntries(formData.entries());
        object.mealId = params.mealId;
        object.userId = user.id;
        object.recipeId = data.id;

        try {
            await rules.validate(object, { abortEarly: false });

            const { data: storeResponse } = await store(object);
            if (!storeResponse) {
                return toast({
                    title: 'Oops!',
                    description: 'Something went wrong!',
                    variant: 'destructive',
                    position: 'top-right',
                });
            }

            toast({
                title: 'Success',
                description: 'Measurements saved successfully!',
                position: 'top-right',
            });
            router.push('/calculator/nutrient-calculator');
        } catch (error) {
            const errors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {});
            setError(errors);
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                <svg
                    className='w-6 h-6 text-gray-800 dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                >
                    <path
                        fillRule='evenodd'
                        d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z'
                        clipRule='evenodd'
                    />
                </svg>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <div className='flex justify-start'>
                        <DialogTitle>{data.name}</DialogTitle>
                    </div>
                </DialogHeader>
                <hr />
                <div className='flex flex-row justify-between items-center gap-4'>
                    <p className='font-semibold'>Number of serving/s</p>
                    <div className='flex flex-col gap-1 items-end'>
                        <input
                            type='number'
                            className='flex h-10 w-20 rounded-md border border-input bg-background px-3 py-2 ring-offset-background 
                    file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                            defaultValue={1}
                            id='numberOfServings'
                            name='numberOfServings'
                            form='formMealLog'
                        />
                        {error.numberOfServings && (
                            <ErrorBadge message={error.numberOfServings} />
                        )}
                    </div>
                </div>
                <div className='flex flex-row justify-between items-center gap-4'>
                    <p className='font-semibold'>Meal</p>
                    <input
                        type='text'
                        className='flex h-10 w-20 rounded-md border border-input bg-background px-3 py-2 ring-offset-background 
                    file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                        value={meal}
                        readOnly
                    />
                </div>
                <hr />
                <div className='flex flex-col justify-center items-center  '>
                    <LogFoodDialogMacros
                        value={data.calories}
                        title='Calories'
                    />
                </div>
                <div className='flex flex-row justify-between gap-2'>
                    <LogFoodDialogMacros
                        value={data.carbohydrate}
                        title='Carbs'
                    />
                    <LogFoodDialogMacros value={data.protein} title='Protein' />
                    <LogFoodDialogMacros value={data.fat} title='Fat' />
                    <LogFoodDialogMacros value={data.sodium} title='Sodium' />
                    <LogFoodDialogMacros value={data.fiber} title='Fiber' />
                </div>
                <form id='formMealLog' onSubmit={handleSubmit}>
                    <Button className='float-end mt-4'>Add</Button>
                </form>
                <DialogDescription />
            </DialogContent>
        </Dialog>
    );
}

export default LogFoodDialog;
