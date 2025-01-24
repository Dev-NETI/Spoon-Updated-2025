'use client';
import React from 'react';
// import PopularDishComponent from '@/components/app/dashboard/PopularDishComponent';
import RecipeOriginCardComponent from '@/components/app/dashboard/RecipeOriginCardComponent';
import BmiHealthMetricsComponent from '@/components/app/dashboard/BmiHealthMetricsComponent';
import TopTenRecipeComponent from '@/components/app/dashboard/TopTenRecipeComponent';

const Dashboard = () => {
    return (
        <>
            <RecipeOriginCardComponent />
            {/* <PopularDishComponent /> */}
            <BmiHealthMetricsComponent />
            <TopTenRecipeComponent />
        </>
    );
};

export default Dashboard;
