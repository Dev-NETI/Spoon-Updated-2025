import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import CardListItem from '@/components/app/calculator/CardListItem';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import BoltIcon from '@mui/icons-material/Bolt';

function Calculator() {
    return (
        <div>
            <Card className=' m-4 md:mx-20 md:mt-10 lg:mx-20 lg:mt-10'>
                <CardHeader>
                    <h1 className='font-bold text-xl text-center md:text-start lg:text-start'>
                        Calculator
                    </h1>
                </CardHeader>
                <CardContent className='p-4 grid grid-cols-4 gap-4'>
                    <CardListItem
                        title='BMI Calculator'
                        className='col-span-2'
                        href='/calculator/bmi'
                        icon={
                            <MonitorHeartIcon
                                color='warning'
                                fontSize='large'
                            />
                        }
                    />
                    <CardListItem
                        title='Calorie Calculator'
                        className='col-start-3 col-span-2'
                        href='/calculator/calorie'
                        icon={<BoltIcon color='info' fontSize='large' />}
                    />
                    <CardListItem
                        title='Blood Pressure Tracker'
                        className='col-span-2'
                        href='/calculator/blood-pressure-tracker'
                        icon={<BloodtypeIcon color='error' fontSize='large' />}
                    />
                    <CardListItem
                        title='Nutrient Calculator'
                        className='col-start-3 col-span-2'
                        href='/calculator/nutrient-calculator'
                        icon={
                            <DinnerDiningIcon
                                color='primary'
                                fontSize='large'
                            />
                        }
                    />
                </CardContent>
            </Card>
        </div>
    );
}

export default Calculator;
