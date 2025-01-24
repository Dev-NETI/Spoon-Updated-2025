import { MealTypeContext } from '@/stores/MealTypeContext';
import React, { useContext } from 'react';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import TextFieldComponent from '@/components/form/MUI/TextFieldComponent';
import { Box, Button } from '@mui/material';
import { toast } from '@/components/ui/use-toast';

function MealTypeFormComponent({ mode = 1, handleClose, selectedMealType }) {
    const { storeMealType, updateMealType, setMealTypeState } =
        useContext(MealTypeContext);

    const onSubmit = async data => {
        try {
            let response;
            if (mode === 1) {
                response = await storeMealType(data);
            } else {
                response = await updateMealType(selectedMealType.slug, data);
            }

            if (response && response.data) {
                setMealTypeState(prevState => ({
                    ...prevState,
                    responseStore: true,
                }));
                toast({
                    title:
                        mode === 1
                            ? 'Meal type submitted successfully!'
                            : 'Meal type updated successfully!',
                    variant: 'success',
                });
                handleClose();
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            // console.error('Error submitting meal type:', error);
            toast({
                title:
                    mode === 1
                        ? 'Failed to submit meal type'
                        : 'Failed to update meal type',
                description: error.message || 'An unexpected error occurred',
                variant: 'destructive',
            });
        }
    };

    const formSchema = z.object({
        name: z.string().min(2, {
            message: 'Meal type name must be at least 2 characters.',
        }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: selectedMealType?.name || '',
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <TextFieldComponent
                    form={form}
                    name='name'
                    label='Meal Type Name'
                    variant='outlined'
                    fullWidth
                />
                <Box
                    sx={{
                        mt: 3,
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
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
                        {mode === 1 ? 'Add Meal Type' : 'Update Meal Type'}
                    </Button>
                </Box>
            </form>
        </Form>
    );
}

export default MealTypeFormComponent;
