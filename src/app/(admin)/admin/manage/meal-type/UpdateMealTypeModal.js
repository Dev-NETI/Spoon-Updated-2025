'use client';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MealTypeFormComponent from '@/components/admin/meal-type/MealTypeFormComponent';
import { MealTypeContext } from '@/stores/MealTypeContext';

function UpdateMealTypeModal({ open, onClose, slug }) {
    const { showMealType } = useContext(MealTypeContext);
    const [selectedMealType, setSelectedMealType] = useState(null);
    const handleClose = () => {
        onClose();
        setSelectedMealType(null);
    };
    const fetchMealTypeDetails = useCallback(async () => {
        if (slug) {
            try {
                const { data } = await showMealType(slug);
                setSelectedMealType(data);
            } catch (error) {
                // console.error('Error fetching meal type details:', error);
            }
        }
    }, [slug, showMealType]);

    useEffect(() => {
        if (open && slug) {
            fetchMealTypeDetails();
        }
    }, [open, slug, fetchMealTypeDetails]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='add-meal-type-modal'
            aria-describedby='modal-to-add-new-meal-type'
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
            }}
        >
            <Slide direction='left' in={open} mountOnEnter unmountOnExit>
                <Box
                    sx={{
                        width: '400px',
                        height: '100%',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        overflowY: 'auto',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 3,
                        }}
                    >
                        <Typography variant='h6' component='h2'>
                            Edit Meal Type
                        </Typography>
                        <Button
                            onClick={handleClose}
                            sx={{ minWidth: 'auto', p: 0.5 }}
                        >
                            <CloseIcon />
                        </Button>
                    </Box>
                    {selectedMealType && (
                        <MealTypeFormComponent
                            mode={2}
                            handleClose={handleClose}
                            onClose={handleClose}
                            selectedMealType={selectedMealType}
                        />
                    )}
                </Box>
            </Slide>
        </Modal>
    );
}

export default UpdateMealTypeModal;
