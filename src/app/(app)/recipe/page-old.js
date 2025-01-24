'use client';
import { useFoodGroup } from '@/hooks/api/food-group';
import { useEffect, useState } from 'react';
import RecipeCardComponent from '@/components/app/recipe/RecipeCardComponent';

const Profile = () => {
    const { index: getAllFoodGroup } = useFoodGroup();
    const [foodGroupData, setFoodGroupData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getAllFoodGroup();
            if (data) {
                setFoodGroupData(data);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {/* <div className='flex flex-row md:justify-end'>
                <div className='basis-full md:basis-1/2 lg:basis-1/4'>
                    <InputWithIcon
                        icon='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                        label={'Search'}
                    />
                </div>
            </div> */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4 py-8'>
                {foodGroupData.map(data => (
                    <RecipeCardComponent
                        key={data.id}
                        label={data.name}
                        imagePath={data.image_path}
                        href={`/recipe/list/${data.id}`}
                    />
                ))}
            </div>
        </>
    );
};

export default Profile;
