import React, { useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import { useMediaQuery, useTheme } from '@mui/material';
import DrawerFilterList from '@/components/app/recipe/DrawerFilterList';
import { RecipeContext } from '@/stores/RecipeContext';
import { Button } from '@/components/ui/button';

function DrawerComponent() {
    const {
        recipeDataState,
        isDrawerOpen,
        setIsDrawerOpen,
        recipeState,
        setRecipeDataState,
        resetFilterStates,
    } = useContext(RecipeContext);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const drawerAnchor = isMobile ? 'bottom' : 'left';

    function applyFilters() {
        const {
            selectedOriginData,
            selectedMealTypeData,
            selectedSeasonData,
            selectedFoodGroupData,
            selectedMealHourData,
        } = recipeState;

        const filteredData = recipeDataState.allRecipeData.filter(recipe => {
            const originMatch =
                selectedOriginData.length === 0 ||
                selectedOriginData.includes(recipe.recipe_origin?.id);

            const mealTypeMatch =
                selectedMealTypeData.length === 0 ||
                selectedMealTypeData.includes(recipe.meal_type?.id);

            const foodGroupMatch =
                selectedFoodGroupData.length === 0 ||
                recipe.food_group_list_item.some(item =>
                    selectedFoodGroupData.includes(item.food_group_id)
                );

            const seasonMatch =
                selectedSeasonData.length === 0 ||
                recipe.season_list_item.some(item =>
                    selectedSeasonData.includes(item.season_id)
                );

            const mealHourMatch =
                selectedMealHourData.length === 0 ||
                getRecipesByMealHours([recipe], selectedMealHourData).length >
                    0;

            return (
                originMatch &&
                mealTypeMatch &&
                foodGroupMatch &&
                seasonMatch &&
                mealHourMatch
            );
        });

        filteredData.length > 0
            ? setRecipeDataState(prevState => ({
                  ...prevState,
                  filteredRecipeData: filteredData,
              }))
            : resetFilterStates();

        setIsDrawerOpen(false);
    }

    function getRecipesByMealHours(recipes, selectedMealHours) {
        const mealHourMap = {
            1: 'breakfast',
            2: 'lunch',
            3: 'dinner',
            4: 'snack',
        };

        return recipes.filter(recipe => {
            return selectedMealHours.some(
                mealHour => recipe[mealHourMap[mealHour]] === 1
            );
        });
    }

    return (
        <Drawer
            anchor={drawerAnchor}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
        >
            <div className='flex flex-col px-8 p-4'>
                <DrawerFilterList
                    label='Origin'
                    data={recipeDataState.originData}
                    identifier='selectedOriginData'
                />
                <DrawerFilterList
                    label='Best Served'
                    data={recipeDataState.mealHourData}
                    identifier='selectedMealHourData'
                />
                <DrawerFilterList
                    label='Category'
                    data={recipeDataState.mealTypeData}
                    identifier='selectedMealTypeData'
                />
                <DrawerFilterList
                    label='Weather'
                    data={recipeDataState.seasonData}
                    identifier='selectedSeasonData'
                />
                <DrawerFilterList
                    label='Food Group'
                    data={recipeDataState.foodGroupData}
                    identifier='selectedFoodGroupData'
                />
                <div className='flex items-center justify-center py-1'>
                    <Button
                        className='w-full rounded-lg'
                        onClick={() => applyFilters()}
                    >
                        Apply Filters
                    </Button>
                </div>
            </div>
        </Drawer>
    );
}

export default DrawerComponent;
