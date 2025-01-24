import { useEffect, useState } from 'react';
import RecipeOriginCard from '@/components/app/dashboard/RecipeOriginCard';
import { useRecipeOrigin } from '@/hooks/api/recipe-origin';
import OriginCardLoadingComponent from './OriginCardLoadingComponent';

function RecipeOriginCardComponent() {
    const { index: getAllRecipeOrigin } = useRecipeOrigin();
    const [recipeOriginData, setRecipeOriginData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipeOriginData = async () => {
            const { data } = await getAllRecipeOrigin();
            setRecipeOriginData(data);
            setLoading(false);
        };
        fetchRecipeOriginData();
    }, []);

    return (
        <>
            <div className='flex flex-row z-50'>
                <div className='basis-6/12'>
                    <p className='text-xl font-semibold '>World Cousine</p>
                </div>
                <div className='basis-6/12 text-end justify-between'>
                    <a
                        href='#'
                        className='text-blue-800 text-base text-balance '
                    >
                        View all &gt;
                    </a>
                </div>
            </div>
            <div className='flex flex-row mt-2 overflow-x-auto space-x-2 py-3'>
                {loading ? (
                    <OriginCardLoadingComponent />
                ) : (
                    recipeOriginData.map(data => (
                        <RecipeOriginCard
                            key={data.id}
                            imagePath={data.image_path}
                            origin={data.name}
                            originId={data.id}
                        />
                    ))
                )}
            </div>
        </>
    );
}

export default RecipeOriginCardComponent;
