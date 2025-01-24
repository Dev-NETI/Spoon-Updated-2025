'use client';

import React, { useContext, useState, useEffect, useCallback } from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Container, Grid } from '@mui/material';
import RecipeFormComponent from '@/components/admin/recipe/RecipeFormComponent';
import { RecipeContext } from '@/stores/RecipeContext';
import { useMealType } from '@/hooks/api/meal-type';
import { useRecipeOrigin } from '@/hooks/api/recipe-origin';
import { useUnit } from '@/hooks/api/unit';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function UpdateRecipeModal({ isOpen, onClose, slug }) {
    const [DataState, setDataState] = useState({
        meal_type_data: [],
        recipe_origin_data: [],
        unit_data: [],
    });

    const { showRecipe } = useContext(RecipeContext);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const { index: getMealTypeData } = useMealType();
    const { index: getRecipeOriginData } = useRecipeOrigin();
    const { index: getUnitData } = useUnit();

    const fetchRecipeDetails = useCallback(async () => {
        if (slug) {
            const { data } = await showRecipe(slug);
            setSelectedRecipe(data);
        }
    }, [slug, showRecipe]);

    useEffect(() => {
        const fetchData = async () => {
            const [mealTypeData, recipeOriginData, unitData] =
                await Promise.all([
                    getMealTypeData(),
                    getRecipeOriginData(),
                    getUnitData(),
                ]);

            setDataState({
                meal_type_data: mealTypeData.data,
                recipe_origin_data: recipeOriginData.data,
                unit_data: unitData.data,
            });
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (isOpen && slug) {
            fetchRecipeDetails();
        }
    }, [isOpen, slug, fetchRecipeDetails]);

    const handleClose = () => {
        onClose();
        setSelectedRecipe(null);
    };

    const darkBlueTheme = createTheme({
        palette: {
            primary: {
                main: '#1a237e', // Dark blue color
            },
        },
    });

    return (
        <ThemeProvider theme={darkBlueTheme}>
            <Dialog
                fullScreen
                open={isOpen}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge='start'
                            color='inherit'
                            onClick={handleClose}
                            aria-label='close'
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant='h6'
                            component='div'
                        >
                            Edit Recipe
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid
                    container
                    spacing={2}
                    justifyContent='center'
                    alignItems='center'
                >
                    <Grid item xs={12} md={8}>
                        <Container maxWidth={false} sx={{ mb: 4, mt: 4 }}>
                            {selectedRecipe && (
                                <RecipeFormComponent
                                    mode={2}
                                    DataState={DataState}
                                    handleClose={handleClose}
                                    selectedRecipe={selectedRecipe}
                                />
                            )}
                        </Container>
                    </Grid>
                </Grid>
            </Dialog>
        </ThemeProvider>
    );
}
