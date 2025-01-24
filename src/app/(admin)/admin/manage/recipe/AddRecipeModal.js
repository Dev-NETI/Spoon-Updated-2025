'use client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Container, Grid } from '@mui/material';
import { useMealType } from '@/hooks/api/meal-type';
import RecipeFormComponent from '@/components/admin/recipe/RecipeFormComponent';
import { useRecipeOrigin } from '@/hooks/api/recipe-origin';
import { useUnit } from '@/hooks/api/unit';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function AddRecipeModal() {
    const [DataState, setDataState] = useState({
        meal_type_data: [],
        recipe_origin_data: [],
        unit_data: [],
    });

    const { index: getMealTypeData } = useMealType();
    const { index: getRecipeOriginData } = useRecipeOrigin();
    const { index: getUnitData } = useUnit();

    React.useEffect(() => {
        const fetchMealData = async () => {
            const { data } = await getMealTypeData();
            setDataState(prevState => ({
                ...prevState,
                meal_type_data: data,
            }));
        };

        const fetchRecipeOrignData = async () => {
            const { data } = await getRecipeOriginData();
            setDataState(prevState => ({
                ...prevState,
                recipe_origin_data: data,
            }));
        };

        const fetchUnitData = async () => {
            const { data } = await getUnitData();
            setDataState(prevState => ({
                ...prevState,
                unit_data: data,
            }));
        };

        fetchRecipeOrignData();
        fetchMealData();
        fetchUnitData();
    }, []);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const darkBlueTheme = createTheme({
        palette: {
            primary: {
                main: '#1a237e', // Dark blue color
            },
        },
    });

    return (
        <React.Fragment>
            <Button
                variant='contained'
                color='success'
                onClick={handleClickOpen}
            >
                ADD RECIPE
            </Button>
            <ThemeProvider theme={darkBlueTheme}>
                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar
                        sx={{ position: 'relative', bgcolor: 'primary.main' }}
                    >
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
                                Add Recipe
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
                                <RecipeFormComponent
                                    mode={1}
                                    DataState={DataState}
                                    handleClose={handleClose}
                                />
                            </Container>
                        </Grid>
                    </Grid>
                </Dialog>
            </ThemeProvider>
        </React.Fragment>
    );
}
