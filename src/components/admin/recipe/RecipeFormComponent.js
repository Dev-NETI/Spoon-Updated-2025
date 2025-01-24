import CheckFieldComponent from '@/components/form/MUI/CheckFieldComponent';
import SelectFieldComponent from '@/components/form/MUI/SelectFieldComponent';
import TextFieldComponent from '@/components/form/MUI/TextFieldComponent';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Grid,
    Button,
    Fab,
    Typography,
    Paper,
    Box,
    Card,
    CardContent,
    IconButton,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from 'next/image';
import { toast } from '@/components/ui/use-toast';
import { RecipeContext } from '@/stores/RecipeContext';
import axios from '@/lib/axios'; // Make sure this import is at the top of your file

function RecipeFormComponent({
    mode = 1,
    DataState,
    handleClose,
    selectedRecipe,
}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const { storeRecipe, updateRecipe, setRecipeListState } =
        useContext(RecipeContext);

    const handleFileChange = async event => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
        }
    };

    useEffect(() => {
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);

            return () => {
                URL.revokeObjectURL(url);
            };
        } else if (selectedRecipe && selectedRecipe.image_path) {
            // If there's an existing image, set it as the preview
            setPreviewUrl(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${selectedRecipe.image_path}`
            );
        } else {
            setPreviewUrl('');
        }
    }, [selectedFile, selectedRecipe]);

    const uploadImage = async file => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await axios.post('/api/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data && response.data.path) {
                return response.data.path;
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            toast({
                title: 'Image upload failed',
                description: error.message,
                variant: 'destructive',
            });
            return null;
        }
    };

    const onSubmit = async data => {
        try {
            let imagePath = '';
            if (selectedFile) {
                imagePath = await uploadImage(selectedFile);
                if (!imagePath) {
                    return; // Stop submission if image upload failed
                }
            }

            const recipeData = {
                ...data,
                image_path: imagePath || data.image_path,
            };

            let response;
            if (mode === 1) {
                response = await storeRecipe(recipeData);
            } else {
                response = await updateRecipe(selectedRecipe.slug, recipeData);
            }

            if (response.status === 200) {
                setRecipeListState(prevState => ({
                    ...prevState,
                    responseStore: true,
                }));
                toast({
                    title:
                        mode === 1
                            ? 'Recipe submitted successfully!'
                            : 'Recipe updated successfully!',
                    variant: 'success',
                });
                handleClose();
            }
        } catch (error) {
            toast({
                title:
                    mode === 1
                        ? 'Failed to submit recipe'
                        : 'Failed to update recipe',
                description: error.message,
                variant: 'destructive',
            });
        }
    };

    const formSchema = z.object({
        name: z.string().min(2, {
            message: 'Recipe name must be at least 2 characters.',
        }),
        meal_type_id: z.number().min(1, { message: 'Meal type is required' }),
        number_of_serving: z
            .number()
            .min(1, { message: 'Number of serving is required' }),
        recipe_origin_id: z
            .number()
            .min(1, { message: 'Recipe Origin is required' }),
        breakfast: z.number(),
        lunch: z.number(),
        snack: z.number(),
        dinner: z.number(),
        ingredients: z.array(
            z.object({
                name: z.string(),
                instruction: z.string().nullable().optional(),
                unit_id: z.number().min(1, { message: 'Unit is required' }),
                quantity: z
                    .number()
                    .min(1, { message: 'Quantity is required' }),
                calories: z.number(),
                carbohydrate: z.number(),
                protein: z.number(),
                fat: z.number(),
                sodium: z.number(),
                fiber: z.number(),
            })
        ),
        instructions: z.array(
            z.object({
                number: z.number(),
                description: z.string(),
            })
        ),
        image_path: z.string().optional(),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: selectedRecipe?.name || '',
            meal_type_id: selectedRecipe?.meal_type_id || 0,
            recipe_origin_id: selectedRecipe?.recipe_origin_id || 0,
            number_of_serving: selectedRecipe?.number_of_serving || 0,
            breakfast: selectedRecipe?.breakfast || 0,
            lunch: selectedRecipe?.lunch || 0,
            snack: selectedRecipe?.snack || 0,
            dinner: selectedRecipe?.dinner || 0,
            ingredients: selectedRecipe?.ingredient || [
                {
                    name: '',
                    instruction: '',
                    quantity: 0,
                    unit_id: 0,
                    calories: 0,
                    carbohydrate: 0,
                    protein: 0,
                    fat: 0,
                    sodium: 0,
                    fiber: 0,
                },
            ],
            instructions: selectedRecipe?.procedure || [
                {
                    number: 1,
                    description: '',
                },
            ],
            image_path: selectedRecipe?.image_path || '',
        },
    });

    const {
        fields: ingredientFields,
        append: appendIngredient,
        remove: removeIngredient,
    } = useFieldArray({
        control: form.control,
        name: 'ingredients',
    });

    const {
        fields: instructionFields,
        append: appendInstruction,
        remove: removeInstruction,
    } = useFieldArray({
        control: form.control,
        name: 'instructions',
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                    <Typography variant='h4' gutterBottom color='primary'>
                        Recipe Information
                    </Typography>
                    <Typography
                        variant='subtitle1'
                        color='text.secondary'
                        paragraph
                    >
                        Fill in the basic details of your recipe.
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <TextFieldComponent
                                form={form}
                                name='name'
                                label='Recipe Name'
                                variant='outlined'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button
                                component='label'
                                variant='outlined'
                                startIcon={<CloudUploadIcon />}
                                fullWidth
                                sx={{ height: '56px' }}
                            >
                                {previewUrl
                                    ? 'Change Picture'
                                    : 'Upload Picture'}
                                <input
                                    type='file'
                                    hidden
                                    onChange={handleFileChange}
                                    accept='image/jpeg, image/png'
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <SelectFieldComponent
                                form={form}
                                name='meal_type_id'
                                DataState={DataState.meal_type_data}
                                label='Meal Type'
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <SelectFieldComponent
                                form={form}
                                name='recipe_origin_id'
                                DataState={DataState.recipe_origin_data}
                                label='Recipe Origin'
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextFieldComponent
                                form={form}
                                name='number_of_serving'
                                label='Number of Servings'
                                variant='outlined'
                                type='number'
                            />
                        </Grid>
                        {previewUrl && (
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        mt: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Image
                                        src={previewUrl}
                                        alt='Preview'
                                        width={100}
                                        height={100}
                                        style={{
                                            borderRadius: '8px',
                                            objectFit: 'cover',
                                            marginRight: '16px',
                                        }}
                                    />
                                    <Box>
                                        <Typography variant='body1'>
                                            {selectedFile
                                                ? selectedFile.name
                                                : 'Current Image'}
                                        </Typography>
                                        {selectedFile && (
                                            <Typography
                                                variant='body2'
                                                color='text.secondary'
                                            >
                                                {`${(selectedFile.size / 1024).toFixed(2)} KB`}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Paper>

                <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                    <Typography variant='h4' gutterBottom color='primary'>
                        Meal Details
                    </Typography>
                    <Typography
                        variant='subtitle1'
                        color='text.secondary'
                        paragraph
                    >
                        Select which meals this recipe is suitable for.
                    </Typography>
                    <Grid container spacing={2}>
                        {['breakfast', 'lunch', 'snack', 'dinner'].map(meal => (
                            <Grid item xs={6} sm={3} key={meal}>
                                <CheckFieldComponent
                                    label={
                                        meal.charAt(0).toUpperCase() +
                                        meal.slice(1)
                                    }
                                    name={meal}
                                    form={form}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Paper>

                <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                    <Typography variant='h4' gutterBottom color='primary'>
                        Ingredients and Nutrients
                    </Typography>
                    <Typography
                        variant='subtitle1'
                        color='text.secondary'
                        paragraph
                    >
                        Add ingredients and their nutritional information.
                    </Typography>
                    {ingredientFields.map((item, index) => (
                        <Card
                            key={item.id}
                            sx={{ mb: 3, position: 'relative' }}
                        >
                            <CardContent>
                                <IconButton
                                    aria-label='delete'
                                    onClick={() => removeIngredient(index)}
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <Typography variant='h6' gutterBottom>
                                    Ingredient {index + 1}
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextFieldComponent
                                            form={form}
                                            name={`ingredients[${index}].name`}
                                            label='Ingredient Name'
                                            variant='outlined'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextFieldComponent
                                            form={form}
                                            name={`ingredients[${index}].instruction`}
                                            label='Preparation Instructions'
                                            variant='outlined'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <TextFieldComponent
                                            form={form}
                                            name={`ingredients[${index}].quantity`}
                                            label='Quantity'
                                            variant='outlined'
                                            type='number'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <SelectFieldComponent
                                            form={form}
                                            name={`ingredients[${index}].unit_id`}
                                            DataState={DataState.unit_data}
                                            label='Unit'
                                            fullWidth
                                        />
                                    </Grid>
                                    {[
                                        'calories',
                                        'carbohydrate',
                                        'protein',
                                        'fat',
                                        'sodium',
                                        'fiber',
                                    ].map(nutrient => (
                                        <Grid item xs={6} sm={2} key={nutrient}>
                                            <TextFieldComponent
                                                form={form}
                                                name={`ingredients[${index}].${nutrient}`}
                                                label={
                                                    nutrient
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    nutrient.slice(1)
                                                }
                                                variant='outlined'
                                                type='number'
                                                fullWidth
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 2,
                        }}
                    >
                        <Fab
                            color='primary'
                            aria-label='add ingredient'
                            onClick={() =>
                                appendIngredient({
                                    name: '',
                                    instruction: '',
                                    quantity: 0,
                                    unit_id: 0,
                                    calories: 0,
                                    carbohydrate: 0,
                                    protein: 0,
                                    fat: 0,
                                    sodium: 0,
                                    fiber: 0,
                                })
                            }
                        >
                            <AddIcon />
                        </Fab>
                    </Box>
                </Paper>

                <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                    <Typography variant='h4' gutterBottom color='primary'>
                        Cooking Instructions
                    </Typography>
                    <Typography
                        variant='subtitle1'
                        color='text.secondary'
                        paragraph
                    >
                        Add step-by-step instructions for preparing the recipe.
                    </Typography>
                    {instructionFields.map((item, index) => (
                        <Card
                            key={item.id}
                            sx={{ mb: 3, position: 'relative' }}
                        >
                            <CardContent>
                                <IconButton
                                    aria-label='delete'
                                    onClick={() => removeInstruction(index)}
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <Typography variant='h6' gutterBottom>
                                    Step {index + 1}
                                </Typography>
                                <TextFieldComponent
                                    form={form}
                                    name={`instructions[${index}].description`}
                                    label={`Instruction ${index + 1}`}
                                    variant='outlined'
                                    multiline
                                    rows={3}
                                    fullWidth
                                />
                            </CardContent>
                        </Card>
                    ))}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 2,
                        }}
                    >
                        <Fab
                            color='primary'
                            aria-label='add instruction'
                            onClick={() =>
                                appendInstruction({
                                    number: instructionFields.length + 1,
                                    description: '',
                                })
                            }
                        >
                            <AddIcon />
                        </Fab>
                    </Box>
                </Paper>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        size='large'
                        sx={{
                            padding: '12px 24px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        }}
                    >
                        {mode === 1 ? 'Submit Recipe' : 'Update Recipe'}
                    </Button>
                </Box>
            </form>
        </Form>
    );
}

export default RecipeFormComponent;
